---
source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/multi-cluster-ingress
---

# Multi Cluster Ingress

Multi Cluster Ingress (MCI) is a Google-hosted controller for GKE clusters that deploys shared external Application Load Balancer resources across clusters and regions. It uses a config cluster that hosts two custom resources, `MultiClusterIngress` and `MultiClusterService`, and programs the load balancer through NEGs.

## Signature / Usage

### MultiClusterService

A `MultiClusterService` selects Pods (like a Service) and can also select labels and clusters. It exists only in the config cluster and does not route traffic itself.

```yaml
apiVersion: networking.gke.io/v1
kind: MultiClusterService
metadata:
  name: foo
  namespace: blue
spec:
  template:
    spec:
      selector:
        app: foo
      ports:
      - name: web
        protocol: TCP
        port: 80
        targetPort: 80
```

### MultiClusterIngress

Behaves like core Ingress (same host, path, protocol termination and backend spec).

```yaml
apiVersion: networking.gke.io/v1
kind: MultiClusterIngress
metadata:
  name: foobar-ingress
  namespace: blue
spec:
  template:
    spec:
      backend:
        serviceName: default-backend
        servicePort: 80
      rules:
      - host: foo.example.com
        backend:
          serviceName: foo
          servicePort: 80
      - host: bar.example.com
        backend:
          serviceName: bar
          servicePort: 80
```

### Cluster selection

By default a derived Service is scheduled on every target cluster. Use `spec.clusters` to restrict it.

```yaml
apiVersion: networking.gke.io/v1
kind: MultiClusterService
metadata:
  name: foo
  namespace: blue
spec:
  template:
    spec:
      selector:
        app: foo
      ports:
      - name: web
        protocol: TCP
        port: 80
        targetPort: 80
  clusters:
  - link: "europe-west1-c/gke-eu"
  - link: "asia-northeast1-a/gke-asia-1"
```

## Options / Props

| Item | Value |
| --- | --- |
| Default quota | 100 `MultiClusterIngress` and 100 `MultiClusterService` resources per project (in a config cluster, for any number of backend clusters up to the per-project cluster maximum) |
| Fleet member limits | See fleet management quotas |
| Cluster fleet membership | A cluster can be a member of only a single fleet |
| Load balancer | External Application Load Balancer, Premium Tier, global anycast IPs |

### Components

| Component | Description |
| --- | --- |
| MCI controller | Globally distributed control plane running outside your clusters |
| Config cluster | Any GKE cluster where `MultiClusterIngress` / `MultiClusterService` are deployed; can be changed at any time |
| Fleet | Logical grouping of clusters |
| Member cluster | Cluster registered to the fleet; all members are backend candidates |
| Derived Service | Headless Service generated per target cluster; only `Selector` and `Ports` carry over; creates the NEG; managed by the controller, not by users |

## Notes

- Deployment workflow: register clusters to a fleet; pick a config cluster; deploy apps; deploy `MultiClusterService` resources in the config cluster (creates NEGs); deploy a `MultiClusterIngress` referencing them.
- Config cluster availability: if the config cluster API is unavailable, MCI / MCS resources cannot be created or updated; existing load balancers and traffic are not affected. Prefer regional clusters. The config cluster must have all Namespaces used by target-cluster backends.
- Migrating the config cluster: `MultiClusterIngress` and `MultiClusterService` resources must be identical in the old and new config clusters, otherwise the Compute Engine load balancers may be updated or destroyed.
- Namespace sameness: a namespace is treated as the same across all clusters in the fleet; Services with the same name in that namespace are one Service. Avoid `default` and generic names such as "prod" / "dev" for application deployments and tightly control namespace permissions.
- Member clusters within the same fleet and region must have unique names.
- Reasons to set `spec.clusters`: isolate the config cluster, control traffic during migration, route to a subset of clusters, use one HTTP(S) VIP for backends in different clusters.
- Kubernetes Gateway API resources on GKE, and Multi Cluster Ingress, are not an HTTP framework router (`hono`, `fastify`) and not Cloud Load Balancing configured directly (planned `gcp-networking`).
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/multi-cluster-ingress (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [choose-mc-lb-api.md](./choose-mc-lb-api.md)
- [multi-cluster-gateways.md](./multi-cluster-gateways.md)
- [multi-cluster-services-overview.md](./multi-cluster-services-overview.md)
