import { CustomResource } from "@pulumi/kubernetes/apiextensions";
import { CustomResourceOptions } from "@pulumi/pulumi";
import { Secret } from "@pulumi/kubernetes/core/v1";


export interface ClusterIssuerArgs {
    server: string,
    email: string,
}
export function createClusterIssuer(name: string, params: ClusterIssuerArgs, opts?: CustomResourceOptions) {
    return new CustomResource(name, {
        apiVersion: "cert-manager.io/v1alpha2",
        kind: "ClusterIssuer",
        metadata: {
            name: name,
        },
        spec: {
            acme: {
                server: params.server,
                email: params.email,
                privateKeySecretRef: {
                    name: `${name}-pk`,
                },
                solvers: [
                    {
                        selector: {},
                        http01: {
                            ingress: {
                                class: "nginx",
                            }
                        }
                    }
                ]

            }
        }
    }, opts);
}

// apiVersion: v1
// data:
//   ca.crt: ''
//   tls.crt: ''
//   tls.key: ''
// kind: Secret
// metadata:
//   name: tekman-ci-cert
//   namespace: cert-manager
//   annotations:
//     kubed.appscode.com/sync: app=kubed
// type: kubernetes.io/tls

export interface CertificateArgs {
    issuerName: string;
    commonName: string;
    dnsNames: string[];
}
export function createCertificate(name: string, params: CertificateArgs, opts?: CustomResourceOptions) {
    // const secretOps = JSON.parse(JSON.stringify(opts));
    const secretOps = Object.assign({}, opts);
    secretOps.ignoreChanges = ["data"];
    const secret = new Secret(name, {
        type: "kubernetes.io/tls",
        apiVersion: "v1",
        data: {
            "ca.crt": "",
            "tls.crt": "",
            "tls.key": "",
        },
        kind: "Secret",
        metadata: {
            name: name,
            namespace: "cert-manager",
            annotations: {
                "kubed.appscode.com/sync": "kubed=kubed",
            }
        }
    }, secretOps);

    const certOpts = Object.assign({}, opts);
    certOpts.dependsOn = [secret];
    new CustomResource(name, {
        apiVersion: "cert-manager.io/v1alpha2",
        kind: "Certificate",
        metadata: {
            name: name,
            namespace: "cert-manager",
        },
        spec: {
            secretName: name,
            issuerRef: {
                name: params.issuerName,
                kind: "ClusterIssuer",
            },
            commonName: params.commonName,
            dnsNames: params.dnsNames,
        },
    }, certOpts);

    return secret.metadata.apply((meta) => meta.name);
}

// apiVersion: cert-manager.io/v1alpha2
// kind: Certificate
// metadata:
//   name: tekman-ci-cert
//   namespace: cert-manager
// spec:
//   secretName: tekman-ci-cert
//   issuerRef:
//     name: issuer-clouddns-teklity
//     kind: ClusterIssuer
//   commonName: '*.ci.tekman.teklity.com'
//   dnsNames:
//   - '*.ci.tekman.teklity.com'
//   acme:
//     config:
//     - dns01:
//         provider: clouddns
//       domains:
//         - '*.ci.tekman.teklity.com'
