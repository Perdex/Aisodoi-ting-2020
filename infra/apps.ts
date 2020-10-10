import { createCertificate } from "./certs";
import * as k8s from "@pulumi/kubernetes";
import { ProviderResource } from "@pulumi/pulumi";


export interface ContainerArgs {
    domain: string;
    image: string;
    port: number;
    release: string;
    replicas: number;
}
export function deployContainer(name: string, args: ContainerArgs, provider: ProviderResource ) {

    const certName = createCertificate(`${name}-cert`, {
        issuerName: "le-prod-cluster-issuer",
        commonName: args.domain,
        dnsNames: [args.domain],
    }, { provider });

    const labels = { app: name, release: args.release };
    const namespace = new k8s.core.v1.Namespace(name, {
        metadata: {
            labels: {
                "kubed": "kubed",
            }
        }
    }, { provider });

    namespace.metadata.apply((namespaceMeta) => {
        certName.apply((certName) => {
            const deployment = new k8s.apps.v1.Deployment(name, {
                metadata: {
                    name: name,
                    namespace: namespaceMeta.name
                },
                spec: {
                    selector: { matchLabels: labels },
                    replicas: args.replicas,
                    template: {
                        metadata: { labels: labels },
                        spec: {
                            containers: [
                                {
                                    name: name,
                                    image: args.image,
                                    ports: [
                                        { name: "http", containerPort: args.port },
                                    ],
                                }
                            ],
                        }
                    }
                }
            }, { provider, dependsOn: namespace });
            const service = new k8s.core.v1.Service(name, {
                metadata: {
                    name: name,
                    namespace: namespaceMeta.name,
                    labels: labels,
                },
                spec: { ports: [{ port: args.port, targetPort: "http" }], selector: labels },
            }, { provider, dependsOn: [namespace, deployment] });
            const ingress = new k8s.networking.v1beta1.Ingress(name, {
                metadata: {
                    name: name,
                    namespace: namespaceMeta.name,
                    labels: labels,
                    annotations: {
                        "kubernetes.io/ingress.class": "nginx",
                    }
                },
                spec: {
                    tls: [{
                        hosts: [args.domain],
                        secretName: certName,
                    }],
                    rules: [{
                        host: args.domain,
                        http: {
                            paths: [{
                                path: "/",
                                backend: {
                                    serviceName: name,
                                    servicePort: args.port
                                }
                            }],
                        }
                    }]
                }
            }, { provider, dependsOn: [namespace, deployment, service] });
        });
    });
}
