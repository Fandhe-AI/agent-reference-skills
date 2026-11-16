---
source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/ingress
---

# GKE Ingress for Application Load Balancers

How the GKE Ingress controller provisions external and internal Application Load Balancers from Ingress resources, how Ingress maps to Compute Engine resources, container-native load balancing vs instance groups, and the controller's limitations. GKE Ingress is in maintenance mode: no new functionality except bug fixes; use GKE Gateway API.

## Signature / Usage

An Ingress with two path rules; GKE creates a forwarding rule and IP, firewall rules, target proxies (HTTPS if TLS), a URL map with one host rule and one path matcher with two path rules (each mapped to its own backend service), and NEGs listing Pod IPs.

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: my-ingress
spec:
  rules:
  - http:
      paths:
      - path: /*
        pathType: ImplementationSpecific
        backend:
          service:
            name: my-products
            port:
              number: 60000
      - path: /discounted
        pathType: ImplementationSpecific
        backend:
          service:
            name: my-discounted-products
            port:
              number: 80
```

## Options / Props

### Controller behavior by class

| `kubernetes.io/ingress.class` | `ingressClassName` | Behavior |
|---|---|---|
| Not set | Not set | Creates an external Application Load Balancer |
| Not set | Any value | No action (a third-party controller may process it) |
| `gce` | Any (ignored) | Creates an external Application Load Balancer |
| `gce-internal` | Any (ignored) | Creates an internal Application Load Balancer |
| Other value | Any | No action |

### Container-native load balancing auto-enable conditions

All of: VPC-native cluster; no Shared VPC; no GKE Network Policy; `HttpLoadBalancing` add-on enabled (default, must not be disabled). GKE then annotates Services with `cloud.google.com/neg: '{"ingress": true}'`. Not supported with Windows Server node pools.

### Limitations

| Limitation |
|---|
| Not supported on single-stack IPv6 clusters (use Gateway API) |
| Certificates managed by Certificate Manager are not supported (use Gateway API) |
| Reconciliation can exceed 30 minutes, for example 20 Ingresses with 20 NEG backends each |
| Without NEGs, clusters are limited to 1,000 nodes; non-NEG Services do not work on larger clusters |
| Pods must exist at Ingress creation for `readinessProbes` to become health checks (scaled to 0 uses the default); later `readinessProbe` changes have no effect |
| Multiple Ingress resources cannot be combined into one load balancer |
| Mutual TLS must be turned off on the application |
| Frontend exposes only HTTP ports `80` and `443` |
| TLS terminates in globally distributed locations; for geographic control use a custom ingress controller behind a `LoadBalancer` Service |

## Notes

- Do not change the load balancer's forwarding rules, target proxies, URL maps, backend services or health checks outside GKE; changes are overwritten on updates, periodic syncs and cluster upgrades. For manual control use standalone NEGs.
- The controller creates one Google Cloud backend service per unique (`service.name`, `service.port`) pair.
- The external Application Load Balancer is the classic one using Google Front Ends; GKE creates firewall rules for `130.211.0.0/22` and `35.191.0.0/16`. The internal Application Load Balancer is Envoy-based, requires NEG backends and VPC-native clusters, and uses a proxy-only subnet.
- `kubernetes.io/ingress.class` is deprecated in Kubernetes but GKE still relies exclusively on it; the deprecation warning can be ignored.
- With instance groups there are two load-balancing hops; routes-based clusters with external Ingress use unmanaged instance groups containing all nodes, which can conflict with LoadBalancer Services (single load-balanced instance group limitation).
- Kubernetes Gateway API / Ingress resources on GKE are not an HTTP framework router (`hono`, `fastify`) and not Cloud Load Balancing configured directly (`gcp-networking`, planned).
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/ingress (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [load-balance-ingress.md](./load-balance-ingress.md)
- [about-load-balancing.md](./about-load-balancing.md)
- [service-load-balancer.md](./service-load-balancer.md)
- [service-networking.md](./service-networking.md)
