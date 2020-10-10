// const nginxNamespace = new k8s.core.v1.Namespace("nginx-ingress", undefined, { provider })
// const nginx = new k8s.helm.v3.Chart("nginx-ingress", {
//     chart: "ingress-nginx",
//     version: "3.4.0",
//     // namespace: nginxNamespace.metadata.namespace,
//     fetchOpts: {
//         repo: "https://kubernetes.github.io/ingress-nginx",
//     },
//     values: {
//         controller: {
//             service: {
//                 type: "LoadBalancer",
//                 externalTrafficPolicy: "Local",
//                 annotations: {
//                     "service.beta.kubernetes.io/do-loadbalancer-enable-proxy-protocol": "true"
//                 },
//             },
//             config: {
//                 "use-proxy-protocol": "true"
//             },
//         }
//     },
// }, { provider });
