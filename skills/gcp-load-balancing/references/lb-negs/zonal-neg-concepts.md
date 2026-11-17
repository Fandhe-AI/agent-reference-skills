---
source: https://docs.cloud.google.com/load-balancing/docs/negs/zonal-neg-concepts
---

# Zonal network endpoint groups overview

A zonal NEG is a zonal collection of network endpoints, each pointing to a unique IP address of a VM network interface (or IP:port) within a single VPC subnet. A network endpoint belongs to exactly one NEG, a single IP address cannot be referenced by more than one endpoint in the same NEG, but the same IP address can be referenced by endpoints in different NEGs. Zonal NEGs can route to any network interface of a VM, including interfaces other than `nic0`.

## Signature / Usage

### Add an endpoint to a `GCE_VM_IP_PORT` zonal NEG

```bash
gcloud compute network-endpoint-groups update my-lb-neg \
    --zone=asia-southeast1-a \
    --add-endpoint 'instance=my-vm1,ip=10.1.1.1,port=80'
```

## Options / Props

### Endpoint types

| Type | Supported backends for | Endpoint contents |
|---|---|---|
| `GCE_VM_IP` | Global external passthrough NLB, regional external passthrough NLB, internal passthrough NLB | Primary internal IPv4 address of a VM NIC, or the first IPv6 address (`/128`) from a `/96` range assigned to the NIC. No port. Cannot point to an alias IPv4 range address. |
| `GCE_VM_IP_PORT` | External ALB, internal ALB, external proxy NLB, internal proxy NLB | Primary IPv4 + port; alias IPv4 + port; primary IPv4 + any IPv6 (`/128` from a `/96`) + port; alias IPv4 + any IPv6 + port; IPv6 + port |

### Endpoint / interface compatibility

| Network endpoint | Compatible VM network interface |
|---|---|
| `GCE_VM_IP` IPv4 (primary) | IPv4-only or dual-stack |
| `GCE_VM_IP` IPv6 (first in range) (Preview) | IPv6-only or dual-stack |
| `GCE_VM_IP_PORT` IPv4 (primary or alias) | IPv4-only or dual-stack |
| `GCE_VM_IP_PORT` IPv6 (any from a `/96` range) (Preview) | IPv6-only or dual-stack |
| `GCE_VM_IP_PORT` IPv4 (primary or alias) and IPv6 (dual-stack endpoint) | Dual-stack |

### Endpoint specification rules

| Rule | `GCE_VM_IP` | `GCE_VM_IP_PORT` |
|---|---|---|
| Set at creation (immutable) | zone, VPC network, subnet | zone, default port, VPC network, subnet |
| Subnet | Must be in the same region as the NEG's zone; may be omitted for an auto mode VPC network (the auto-created subnet of the zone's region is used) | Same |
| Instance name only | Instance in the NEG's zone with a load balancer target interface in the NEG's subnet; primary internal IPv4 (IPv4-only / dual-stack NIC) or first IPv6 `/128` (IPv6-only NIC) is selected | Same instance requirements; endpoint IP = primary internal IPv4, port = NEG default port |
| Instance + IP | IP must be the primary internal IPv4 or first IPv6 (`/128`) of the NIC | IPv4 must be primary or from an alias range of the NIC in the NEG's subnet; IPv6 must be a single `/128` from the NIC's `/96` range; port defaults to the NEG default port when omitted |
| Per-instance limit | One endpoint per zonal NEG (a VM has one NIC in the NEG's subnet) | Not limited this way |
| `default-port` | Not supported | Supported |

## Notes

- Endpoint / interface compatibility: A `GCE_VM_IP` endpoint cannot be simultaneously IPv4 and IPv6 (no dual-stack endpoint).
- Endpoint specification rules: Each NEG supports up to the maximum number of endpoints per NEG; see https://docs.cloud.google.com/load-balancing/docs/quotas#endpoints_per_neg.
- Using as backends: other backend groups on the same backend service must be zonal NEGs with the same endpoint type (all `GCE_VM_IP` or all `GCE_VM_IP_PORT`). Instance groups and zonal NEGs cannot be mixed on one backend service. The same endpoint may be in several NEGs, and the same NEG may back several backend services.
- Zonal NEGs with `GCE_VM_IP` endpoints work with passthrough Network Load Balancers (passthrough balancing modes); `GCE_VM_IP_PORT` with proxy-based load balancers (balancing modes for Application Load Balancers / Cloud Service Mesh and for proxy Network Load Balancers).
- Zonal NEGs distribute traffic to `nic0` vNICs, non-`nic0` vNICs and Dynamic NICs.
- GKE: creates a unique `GCE_VM_IP` NEG per zone per LoadBalancer Service (node VMs as endpoints, chosen by `externalTrafficPolicy` and node count). Gateway and Ingress use `GCE_VM_IP_PORT` NEGs (container-native load balancing); internal / external Gateway and internal Ingress create them automatically; external Ingress creates them for Services with the `cloud.google.com/neg: '{"ingress": true}'` annotation. Standalone NEGs can be managed by GKE for self-managed load balancers. GKE itself is covered in the `gcp-gke` skill.
- Limitations: zonal NEGs cannot be used with legacy networks; the `default-port` property is not supported for `GCE_VM_IP` zonal NEGs.
- Quotas (NEGs per project, NEGs per backend service, endpoints per NEG) are on https://docs.cloud.google.com/load-balancing/docs/quotas.
- Snippet taken from https://docs.cloud.google.com/load-balancing/docs/negs/setting-up-zonal-negs (the source page has no code block).
- Source inconsistency: the source says that when you use a zonal NEG as a backend group, "the backend service's other backend groups must be zonal NEGs with the same type of endpoints (either all `GCE_VM_IP` or `GCE_VM_IP_PORT`)", but the backend service page (https://docs.cloud.google.com/load-balancing/docs/backend-service, retrieved 2026-11-17) allows "A combination of zonal and hybrid NEGs: `GCE_VM_IP_PORT` and `NON_GCP_PRIVATE_IP_PORT` type NEGs" on one backend service.
- Source: https://docs.cloud.google.com/load-balancing/docs/negs/zonal-neg-concepts (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [setting-up-zonal-negs.md](./setting-up-zonal-negs.md)
- [negs.md](./negs.md)
- [hybrid-neg-concepts.md](./hybrid-neg-concepts.md)
