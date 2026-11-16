---
source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/service-load-balancer
---

# LoadBalancer Service concepts

How GKE creates and manages Google Cloud passthrough Network Load Balancers when you apply a Kubernetes LoadBalancer Service manifest: internal vs external types, `externalTrafficPolicy`, weighted load balancing, zonal affinity, GKE subsetting, node grouping, health checks and packet processing.

## Signature / Usage

The source page describes behavior and has no code block. The following LoadBalancer manifest is borrowed (see Notes); the load balancer type depends on the `spec.loadBalancerClass` field or annotations listed in `## Options / Props`.

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

### How to select the load balancer type

| Goal | GKE version | Field or annotation |
|---|---|---|
| External, backend service-based, `GCE_VM_IP` NEGs (default) | 1.37 or later | none needed; `spec.loadBalancerClass: "networking.gke.io/l4-regional-external-legacy"` explicitly creates a legacy target pool-based load balancer |
| External, backend service-based, `GCE_VM_IP` NEGs (recommended) | 1.33.1-gke.1779000 to 1.36 | `spec.loadBalancerClass: "networking.gke.io/l4-regional-external"` (immutable after creation) |
| External, backend service-based | any supported version | annotation `cloud.google.com/l4-rbs: "enabled"`; `GCE_VM_IP` NEG backends on 1.32.2-gke.1652000 or later, otherwise instance group backends; evaluated only when the manifest is first applied |
| Internal, `GCE_VM_IP` NEGs (recommended) | 1.33.1-gke.1779000 or later with GKE subsetting enabled | `spec.loadBalancerClass: "networking.gke.io/l4-regional-internal"` (immutable) |
| Internal | any supported version | annotation `networking.gke.io/load-balancer-type: "Internal"`; NEG backends if GKE subsetting is enabled, otherwise instance group backends |

For versions earlier than 1.37, a manifest with none of these creates a target pool-based regional external passthrough Network Load Balancer (not recommended).

### `externalTrafficPolicy`

| Value | Behavior |
|---|---|
| `Local` | Packets only delivered to nodes with at least one serving, ready, non-terminating Pod; preserves client source IP; required for weighted load balancing. Source IP preservation does not work if `ip-masq-agent` runs and the Pod IP range is not excluded from masquerading |
| `Cluster` | Does not preserve client source IP; may add latency from node-to-node routing; incompatible with weighted load balancing |

### Feature requirements

| Feature | Requirements |
|---|---|
| Weighted load balancing | GKE 1.31.0-gke.1506000 or later; external backend service-based load balancer; annotation `networking.gke.io/weighted-load-balancing: pods-per-node`; `externalTrafficPolicy: Local` |
| Zonal affinity | Internal LoadBalancer Service; GKE subsetting enabled. Configured as `ZONAL_AFFINITY_SPILL_CROSS_ZONE` with spillover ratio `0.0` |
| GKE subsetting | GKE 1.18.19-gke.1400 or later; `HttpLoadBalancing` add-on enabled before 1.36; automatically enabled in 1.36 and later; cannot be disabled once enabled |
| `HttpLoadBalancing` add-on | Needed for backend service-based external and internal LoadBalancer Services before 1.36 (enabled by default); not needed in 1.36 and later |

### Node limits

| Load balancer | `externalTrafficPolicy` | Endpoint membership in `GCE_VM_IP` NEGs |
|---|---|---|
| Internal passthrough | `Cluster` | up to 25 nodes (all nodes if 1 to 25; random subset of 25 if more) |
| Internal passthrough | `Local` | only nodes with serving Pods; limited to 250 nodes with serving Pods |
| Regional external passthrough | `Cluster` | up to 250 nodes (random subset if more) |
| Regional external passthrough | `Local` | only nodes with serving Pods; limited to 3,000 nodes with serving Pods |

Without GKE subsetting, internal LoadBalancer Services can have problems if the cluster has more than 250 total nodes.

### Health checks

| `externalTrafficPolicy` | Which nodes pass | Port |
|---|---|---|
| `Cluster` | All nodes pass (kube-proxy / cilium-agent answers) | TCP 10256, cannot be customized |
| `Local` | Only nodes with at least one ready, non-terminating serving Pod | Assigned from the node port range unless a custom health check port is specified |

- NEG backends use zonal health checks that probe the Service port; instance group backends use global health checks that probe the `nodePort`.
- Health check source ranges to allow: `130.211.0.0/22` and `35.191.0.0/16`; IPv6: `2600:2d00:1:b029::/64` (internal passthrough) and `2600:1901:8001::/48` (regional external passthrough).

### Packet processing

| `externalTrafficPolicy` | SNAT behavior |
|---|---|
| `Cluster` | Without GKE Dataplane V2 the node always changes the source IP to the node IP; with Dataplane V2 only when routing to a Pod on a different node |
| `Local` | Routes only to a local Pod and does not change the source IP |

Responses use Direct Server Return. Proxy Terminating Endpoints is enabled on GKE 1.26 and later (Dataplane V2: 1.26.4-gke.500 and later).

## Notes

- Snippet taken from https://docs.cloud.google.com/kubernetes-engine/docs/concepts/service (the source page has no code block).
- IPv6: single- or dual-stack via `spec.ipFamilyPolicy` / `spec.ipFamilies`; IPv6 LoadBalancer Services always use `GCE_VM_IP` NEGs; external IPv6 requires a backend service-based load balancer. In GKE 1.37.1-gke.2097000 and later, single-stack external IPv6 Services support direct BYOIPv6 allocation (annotation `networking.gke.io/ip-collection-v6`).
- GKE does not automatically migrate instance-group-backed load balancers to `GCE_VM_IP` NEGs; see https://docs.cloud.google.com/kubernetes-engine/docs/how-to/backend-service-based-external-load-balancer#move-ig-neg-lb
- A VM can be in only one load-balanced instance group; if you use the cluster's instance groups outside GKE as load balancer backends, GKE cannot manage instance group based load balancers. Use `GCE_VM_IP` NEGs or container-native Ingress as a workaround.
- `GCE_VM_IP` NEGs differ from `GCE_VM_IP_PORT` NEGs used by Gateway and container-native Ingress.
- Troubleshooting `0/X healthy`: missing firewall rules, probe target port mismatch, or `externalTrafficPolicy: Local` with no ready Pods.
- Pricing and quotas: network pricing applies to packets processed; forwarding rule, backend service, health check and target pool quotas apply.
- Source inconsistency: the endpoint membership table limits internal passthrough to 250 nodes with serving Pods and regional external passthrough to 3,000 (`Local`) or 250 (`Cluster`) nodes, while planning-scalability.md says "Internal passthrough NLB: 250 nodes without backend subsetting, 2,000 with subsetting. Regional external passthrough NLB: 1,000 nodes per zone". This page is the one that describes GKE-managed LoadBalancer Services.
- Before copying the Service manifest: `clusterIP` must be an unused address inside the cluster's Service IP range (omit it to let Kubernetes choose one), `nodePort` values must be free ports in the node port range (omit them to have them allocated), and `status` is filled in by the cluster and is not part of what you apply.
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/service-load-balancer (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [service.md](./service.md)
- [about-load-balancing.md](./about-load-balancing.md)
- [ingress.md](./ingress.md)
