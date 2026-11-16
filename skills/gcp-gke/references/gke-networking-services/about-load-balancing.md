---
source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/about-load-balancing
---

# About GKE load balancing

How GKE creates and manages Cloud Load Balancing through the Gateway, Ingress and Service (LoadBalancer) APIs, or through standalone NEGs where you create the load balancer components yourself.

## Signature / Usage

GKE Gateway is the recommended choice. A LoadBalancer Service is the simplest L4 form:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-ap-service
spec:
  # Set your own IP address for internal traffic instead of letting Kubernetes
  # select one for you.
  clusterIP: 10.11.241.93
  externalTrafficPolicy: Cluster
  ports:
  - nodePort: 30641 # Set a port for external traffic that reaches the node IP address.
    port: 50000 # Set a port for internal traffic that reaches the clusterIP IP address.
    protocol: TCP
    targetPort: 8080
  selector:
    app: parts
    department: engineering
  sessionAffinity: None
  type: LoadBalancer
status:
  loadBalancer:
    ingress:
    - ip: 203.0.113.200
```

## Options / Props

### Kubernetes resource to load balancer type

| Kubernetes resource | Application Load Balancer | Proxy Network Load Balancer | Passthrough Network Load Balancer |
|---|---|---|---|
| Gateway | Yes | Yes | N/A |
| Ingress | Yes | N/A | N/A |
| LoadBalancer Service | N/A | N/A | Yes |

### Load balancer type to creation method

| Load balancer type | Gateway | Ingress | LoadBalancer Service | Standalone NEGs |
|---|---|---|---|---|
| Global external Application Load Balancer | Yes | N/A | N/A | Yes |
| Classic external Application Load Balancer | Yes | Yes | N/A | Yes |
| Regional external Application Load Balancer | Yes | N/A | N/A | Yes |
| Regional internal Application Load Balancer | Yes | Yes | N/A | Yes |
| Cross-region internal Application Load Balancer | Yes | N/A | N/A | Yes |
| Proxy Network Load Balancer (all types) | Yes (see note) | N/A | N/A | Yes |
| Passthrough Network Load Balancer (internal and external) | N/A | N/A | Yes | N/A |

Note: Gateway API supports proxy Network Load Balancers configured for TLS passthrough with SNI-based routing by using TLSRoute resources on supported GatewayClasses.

## Notes

- Gateway: Google's implementation of the Kubernetes Gateway API; configures Layer 7 Application Load Balancers (HTTP(S)) and Layer 4 proxy Network Load Balancers (TCP proxy) with TLS passthrough and SNI-based routing. Best practice: use Gateway API.
- Ingress: configures a Layer 7 Application Load Balancer. Gateway is recommended for new deployments needing advanced traffic management, multi-protocol support or better multi-tenancy; Ingress remains viable for simple HTTP/HTTPS routing and existing configurations.
- LoadBalancer Service: creates a Layer 4 (TCP/UDP) passthrough Network Load Balancer; source and destination IPs, protocol and ports are preserved and connections are not terminated by the load balancer. External LoadBalancer Services can enable weighted load balancing.
- Standalone NEGs: you create the load balancer components, GKE manages the NEGs. This is a proxy Network Load Balancer for TCP traffic only; traffic is terminated at the load balancing layer.
- Container-native load balancing uses `GCE_VM_IP_PORT` NEGs to send traffic directly to Pod IPs. It is used for all GKE-managed Layer 7 load balancers (Gateway, Ingress) and standalone NEGs. LoadBalancer Services do not use it, but weighted load balancing gives a similar capability.
- Choose a load balancer: https://docs.cloud.google.com/load-balancing/docs/choosing-load-balancer
- Kubernetes Gateway API / Ingress resources on GKE are not an HTTP framework router (`hono`, `fastify`) and not Cloud Load Balancing configured directly (`gcp-networking`, planned).
- Snippet taken from https://docs.cloud.google.com/kubernetes-engine/docs/concepts/service (the source page has no code block; this is a LoadBalancer Service example).
- Source inconsistency: the Standalone NEGs description says "This is a proxy Network Load Balancer for TCP traffic only", while the comparison table above lists Standalone NEGs as "Yes" for the global, classic and regional external, regional internal and cross-region internal Application Load Balancers. The source does not reconcile the two; the table is the more detailed statement.
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/service (snippet; retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Before copying the Service manifest: `clusterIP` must be an unused address inside the cluster's Service IP range (omit it to let Kubernetes choose one), `nodePort` values must be free ports in the node port range (omit them to have them allocated), and `status` is filled in by the cluster and is not part of what you apply.
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/about-load-balancing (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [service-load-balancer.md](./service-load-balancer.md)
- [ingress.md](./ingress.md)
- [service-networking.md](./service-networking.md)
