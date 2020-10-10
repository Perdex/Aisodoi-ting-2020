import * as digitalocean from "@pulumi/digitalocean";
import * as k8s from "@pulumi/kubernetes";
import { createClusterIssuer } from "./certs";

const domain = new digitalocean.Domain("aisodoi.com", {
    name: "aisodoi.com",
});

const cluster = new digitalocean.KubernetesCluster("default", {
    nodePool: {
        name: "worker-pool",
        nodeCount: 2,
        size: digitalocean.DropletSlugs.DropletS2VCPU4GB,
    },
    region: "fra1",
    version: "latest",
    autoUpgrade: true,
}, { ignoreChanges: ["version"] });

const kubeconfig = cluster.kubeConfigs[0].rawConfig;
const provider = new k8s.Provider("do-k8s", { kubeconfig });

const nginxIngress = new k8s.yaml.ConfigFile("nginx-ingress", {
    file: "./kubernetes/yamls/nginx-ingress-v0.40.1.yaml",
}, { provider });
const nginxLoadBalancer = nginxIngress.getResource(
    "v1/Service",
    "ingress-nginx",
    "ingress-nginx-controller"
);

const certManager = new k8s.yaml.ConfigFile("cert-manager", {
   file: "./kubernetes/yamls/cert-manager-v1.0.2.yaml",
}, { provider });


const kubed = new k8s.yaml.ConfigFile("kubed", {
   file: "./kubernetes/yamls/kubed-v0.12.0.yaml",
}, { provider });


const publicIngresses = nginxLoadBalancer.status.loadBalancer.ingress;
export const publicDomain = domain.name;
export const publicIpv4 = publicIngresses.apply(ingresses => {
    for (let ingress of ingresses) {
        if ("ip" in ingress) {
            return ingress.ip;
        }
    }
    return undefined;
});

publicIpv4.apply(ip => {
    if (ip) {
        new digitalocean.DnsRecord("domain-a", {
            domain: domain.name,
            type: "A",
            name: "@",
            value: ip,
        });
        new digitalocean.DnsRecord("domain-a-wildcard", {
            domain: domain.name,
            type: "A",
            name: "*",
            value: ip,
        });
        // new digitalocean.DnsRecord("domain-a-wildcard", {
        //     domain: domain.name,
        //     type: "A",
        //     name: "certman",
        //     value: ip,
        // });
        // new digitalocean.DnsRecord("domain-a-wildcard", {
        //     domain: domain.name,
        //     type: "CNAME",
        //     name: "www",
        //     value: "@",
        // });
    }
});

const issuer = createClusterIssuer("le-prod-cluster-issuer", {
    server: "https://acme-v02.api.letsencrypt.org/directory",
    email: "contact@aisodoi.com",
}, { provider });

export { provider };
