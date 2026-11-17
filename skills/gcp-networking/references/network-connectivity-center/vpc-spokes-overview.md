---
source: https://docs.cloud.google.com/network-connectivity/docs/network-connectivity-center/concepts/vpc-spokes-overview
---

# VPC spokes overview

VPC spokes provide inter-VPC connectivity at scale through an NCC hub, replacing individually managed pair-wise VPC Network Peering connections. They export and import subnet routes among all spoke VPC networks on a hub. Traffic stays inside Google Cloud's network.

## Signature / Usage

```bash
gcloud network-connectivity spokes linked-vpc-network update \
     myspoke --global --description="new spoke description"
```

## Options / Props

### VPC Network Peering vs VPC spokes

| Feature | VPC Network Peering | VPC spokes |
|---|---|---|
| Number of VPC networks | Peerings per VPC network quota | Active VPC spokes per hub quota |
| Subnet routes | Subnet ranges per peering group quota | Subnet routes per route table quota |
| Dynamic routes | Dynamic routes per region per peering group quota | Unique dynamic route prefixes per hub route table per region quota |
| Static routes | Static routes per peering group quota | Static route exchange isn't supported; you can configure static routes with next hop internal passthrough Network Load Balancers in a different VPC spoke |
| Export filters | Not supported | Include export ranges and exclude export ranges |
| Inter-VPC NAT | No | Yes |
| Private Service Connect endpoint propagation | No | Yes |
| Producer VPC spoke connectivity in other VPC networks | No | Yes |
| IP families | IPv4 only; IPv4 and IPv6 | IPv4 only; IPv4 and IPv6; IPv6 only |
| Performance | Lowest latency, highest throughput (VM-VM equivalent) | Lowest latency, highest throughput (VM-VM equivalent) |

### Different-project spokes

| Different-project spokes |
|---|
| A VPC spoke can be in the hub project or another project, in the same or a different organization. A VPC spoke can be connected to one hub at a time. |
| A hub administrator creates and manages the hub and accepts spoke proposals; a spoke administrator proposes a VPC network. |
| A spoke created in the hub's project is added immediately. A spoke in a different project creates a spoke proposal that a hub administrator must approve before it becomes active. |
| VPC Service Controls: for a spoke in a different project, after a perimeter is added you can't add new spokes that violate it; existing spokes keep working. |

### Limitations

| Limitations |
|---|
| No VPC Network Peering between two VPC spokes connected through the same hub. Exceptions: a producer VPC spoke requires a peering connection to a VPC spoke on the same hub (no NCC connectivity between them); an NCC-connected VPC spoke can peer with a VPC that is not part of NCC; two VPC spokes in the edge spoke group of a star-topology hub can be peered. |
| Static route exchange across VPC spokes isn't supported. |
| IPv6-based internal passthrough Network Load Balancers aren't reachable among VPC spokes. |
| Auto mode VPC networks aren't supported as VPC spokes. You can switch an auto mode network to custom mode; this can't be undone. |
| If a VPC spoke is peered with another VPC network (non-producer): that network can't be a VPC spoke on the hub, and the spoke cannot export imported peering subnet routes to the hub. |
| Routing VPC networks that are also VPC spokes: two or more routing VPC networks on the same hub are supported only if none is also a VPC spoke. A single routing VPC network may also be a VPC spoke, and must be if propagated Private Service Connect connections need to reach on-premises networks through hybrid spokes. |
| After deleting a VPC spoke, wait a cool-down of at least 10 minutes before attaching the same VPC network as a spoke on a different hub. Not needed when re-adding to the same hub. |

### Quotas and billing

| Quotas and billing |
|---|
| Monitor the number of dynamic routes per hub; usage is counted by destination (prefix) only. When exceeded, NCC drops routes by destination, and all dynamic routes with that destination are no longer sent to the hub. |
| Spoke hours are charged to the spoke's project, only while the spoke is `ACTIVE`. Outbound traffic is charged to the project of the originating spoke resource, regardless of project boundaries. |

## Notes

- Preset topologies: Mesh topology and star topology can be chosen for VPC spokes (see `connectivity-topologies.md`). VPC spokes support only export filters.
- Deleting a spoke can break connectivity between the attached VPC networks; try it on a disposable hub first.
- The borrowed example only changes the spoke description; it does not change routing or attachments.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/network-connectivity/spokes/linked-vpc-network/update (gcloud 593.0.0 help).
- Creating spokes and proposals is in the official "Work with hubs and spokes" guide; the full `gcloud network-connectivity` reference is generated separately.
- Clarified from the official docs: this page lists only mesh and star topologies for VPC spokes, while the connectivity topologies page (https://docs.cloud.google.com/network-connectivity/docs/network-connectivity-center/concepts/connectivity-topologies, retrieved 2026-11-17) also allows VPC spokes in the `prod`, `non-prod` and `services` groups of the hybrid inspection topology.
- Source: https://docs.cloud.google.com/network-connectivity/docs/network-connectivity-center/concepts/vpc-spokes-overview (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [connectivity-topologies.md](./connectivity-topologies.md)
- [spoke-filters-overview.md](./spoke-filters-overview.md)
- [dynamic-route-exchange-with-vpc-spokes.md](./dynamic-route-exchange-with-vpc-spokes.md)
- [quotas.md](./quotas.md)
