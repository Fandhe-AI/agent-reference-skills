---
source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/service-networking
---

# About Service networking

Overview of how applications are exposed as Services in GKE: the three elements of a Service (frontend, routing and load balancing, backends), how the GKE Ingress and Service controllers automate Cloud Load Balancing, and how to choose an exposure method by client network, protocol and application regionality.

## Signature / Usage

### Elements of a Service

- **Frontend**: the network location that listens for traffic (network, region or subnet, IPs, ports, protocols, TLS certificates).
- **Routing and load balancing**: routes traffic to Services by protocol, HTTP headers and HTTP paths.
- **Backends**: defined by endpoint type, application platform and service discovery integration; GKE updates backends dynamically as endpoints come and go.

### GKE load balancing controllers

GKE provides a built-in GKE Ingress controller and GKE Service controller that deploy load balancers (plus IP addressing and firewall rules) from declarative manifests and keep managing them as traffic and environment change. They provide container-native Pod IP load balancing through the Ingress and Service API standards.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-xn-service
spec:
  type: ExternalName
  externalName: example.com
```

## Options / Props

### Choosing by client network

| Network type | Available solutions |
|---|---|
| Internal | ClusterIP Service, NodePort Service, Internal LoadBalancer Service, Internal Ingress |
| External | NodePort Service (see note 1), External LoadBalancer Service, External Ingress, Multi Cluster Ingress |

1. GKE clusters using the `--no-enable-private-nodes` flag can have nodes with public and private IP addresses, so NodePort Services can be accessible internally and externally.

### Choosing by protocol

| Layer | Protocols | Available solutions |
|---|---|---|
| L4 | TCP, UDP | ClusterIP Service, NodePort Service, Internal LoadBalancer Service, External LoadBalancer Service |
| L7 | HTTP, HTTPS, HTTP2 | Internal Ingress, External Ingress, Multi Cluster Ingress |

### Choosing by application regionality

| Backend scope (cluster scope) | Available solutions |
|---|---|
| Single-cluster | ClusterIP, NodePort, Internal LoadBalancer, External LoadBalancer, Internal Ingress, External Ingress |
| Multi-cluster | Multi Cluster Ingress (one virtual IP directing traffic to Pods across clusters and regions) |

| Frontend scope | Available solutions |
|---|---|
| Regional | ClusterIP Service, Internal Ingress |
| Global | ClusterIP, NodePort, Internal LoadBalancer, External LoadBalancer, External Ingress, Multi Cluster Ingress |

## Notes

- External Application Load Balancers listen on the public internet through Google points of presence; internal Application Load Balancers listen within the VPC network.
- Other exposure solutions: in-cluster Ingress (for example istio-ingressgateway, nginx-ingress; self-managed, hosted inside the cluster), standalone NEGs (manual load balancer frontend with GKE-managed Pod backends), and a service mesh (Cloud Service Mesh, client-side load balancing across clusters, regions, containers and VMs).
- Ingress configuration comparison: https://docs.cloud.google.com/kubernetes-engine/docs/how-to/ingress-configuration
- Kubernetes Gateway API / Ingress resources on GKE are not an HTTP framework router (`hono`, `fastify`) and not Cloud Load Balancing configured directly (`gcp-load-balancing`).
- Snippet taken from https://docs.cloud.google.com/kubernetes-engine/docs/concepts/service (the source page has no code block; this example is an ExternalName Service, shown only as a minimal Service manifest).
- Source inconsistency: the "Choosing by protocol" and "Choosing by application regionality" tables list Multi Cluster Ingress as the only multi-cluster solution and omit Gateway, while about-load-balancing.md says "GKE Gateway is the recommended choice for new deployments" and gateway-api.md lists multi-cluster GatewayClasses (for example `gke-l7-global-external-managed-mc`). The tables are kept as published.
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/service-networking (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [service.md](./service.md)
- [about-load-balancing.md](./about-load-balancing.md)
- [service-load-balancer.md](./service-load-balancer.md)
- [ingress.md](./ingress.md)
- [about-service-discovery.md](./about-service-discovery.md)
