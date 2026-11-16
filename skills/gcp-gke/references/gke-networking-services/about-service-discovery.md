---
source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/about-service-discovery
---

# About service discovery

How DNS-based service discovery works in GKE (kube-dns, Cloud DNS, NodeLocal DNSCache, custom kube-dns) and how to extend it beyond one cluster with Cloud DNS scopes, Multi-cluster Services (MCS) and Service Directory.

## Signature / Usage

### Service DNS names

Every Service gets `<service-name>.<namespace>.svc.cluster.local` (default cluster domain `cluster.local`, customizable at cluster creation). Example: `my-web-app.default.svc.cluster.local`.

Multi-cluster Services produce `<svc>.<ns>.svc.clusterset.local`.

Checking a headless Service's DNS records:

```bash
dig +short nginx.default.svc.cluster.local
```

## Options / Props

### Name server in a Pod's `/etc/resolv.conf`

| Cloud DNS for GKE | NodeLocal DNSCache | Name server value |
|---|---|---|
| Enabled | Enabled | `169.254.20.10` |
| Enabled | Disabled | `169.254.169.254` |
| Disabled | Enabled | `kube-dns` Service IP address |
| Disabled | Disabled | `kube-dns` Service IP address |

### Choosing a DNS provider

| Provider | Features | When to choose |
|---|---|---|
| `kube-dns` | In-cluster DNS resolution for Services and Pods | All clusters with standard networking needs; suitable for small and large clusters |
| Cloud DNS | Private zones, traffic steering, global load balancing, integration with other Google Cloud services | Exposing services externally, multi-cluster environments, high DNS QPS |
| Custom `kube-dns` Deployment | More control over configuration and resources; alternative DNS providers | Large clusters or specific needs requiring more aggressive scaling or fine-grained resource control |

### Cloud DNS scopes

| Scope | Behavior |
|---|---|
| Cluster scope (default) | Equivalent to `kube-dns`; records resolvable only inside the cluster, `<svc>.<ns>.svc.cluster.local` |
| Additive VPC scope | Optional; headless Services also resolvable from other resources in the same VPC (Compute Engine VMs, on-premises via Cloud VPN / Cloud Interconnect) |
| VPC scope | Cluster Service records resolvable across the whole VPC and connected networks |

## Notes

- `kube-dns` is the default in-cluster DNS provider for GKE Standard clusters and runs in `kube-system`. Cloud DNS is the default DNS provider for GKE Autopilot clusters.
- `NodeLocal DNSCache` runs a DNS cache on each node. For Autopilot clusters it is enabled by default and cannot be overridden.
- Internal Services are load balanced by the dataplane (`kube-proxy` or `Cilium`); external Services use Google Cloud load balancers and then the node dataplane.
- MCS routes requests to the nearest available endpoint in any participating cluster via `kube-proxy` (or `Cilium` in GKE Dataplane V2).
- Service Directory for GKE: a unified registry for GKE and non-GKE services, with per-Service access permissions and metadata; resolvable by DNS, HTTP and gRPC; integrated with Cloud DNS.
- Best practices: use Cloud DNS for high-QPS and multi-cluster setups; do not run `kube-dns` on Spot VMs or Preemptible VMs; scale `kube-dns` replicas with `kube-dns-autoscaler` if intermittent timeouts occur during high traffic; use clear Service names and namespaces; monitor DNS metrics and logs.
- How-to pages: Cloud DNS for GKE https://docs.cloud.google.com/kubernetes-engine/docs/how-to/cloud-dns, NodeLocal DNSCache https://docs.cloud.google.com/kubernetes-engine/docs/how-to/nodelocal-dns-cache, custom kube-dns https://docs.cloud.google.com/kubernetes-engine/docs/how-to/custom-kube-dns, Service Directory https://docs.cloud.google.com/service-directory/docs/configuring-sd-for-gke
- Snippet taken from https://docs.cloud.google.com/kubernetes-engine/docs/concepts/service (the source page itself has no code block).
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/about-service-discovery (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [service.md](./service.md)
- [service-networking.md](./service-networking.md)
