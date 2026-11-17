---
source: https://docs.cloud.google.com/network-connectivity/docs/network-connectivity-center/concepts/connectivity-topologies
---

# Preset connectivity topologies

When you create an NCC hub you choose a preset topology: mesh (default), star, or hybrid inspection. After creation the topology can't be changed.

## Signature / Usage

```bash
gcloud network-connectivity hubs groups list --hub=my-hub
```

## Options / Props

### Spoke groups

| Spoke groups |
|---|
| Each spoke group is a routing domain with its own route table, updated automatically as spokes are added or removed. |
| Each spoke belongs to only one spoke group. |
| NCC automatically accepts spokes from the same project as the hub. For VPC spokes in other projects, NCC offers automatic acceptance or spoke proposal review. |

### Topologies

| Topology | Spoke groups | Groups returned by `hubs groups list --hub` |
|---|---|---|
| Mesh (default) | One group containing all spokes | Only the single default group |
| Star | `center` and `edge` | center and edge |
| Hybrid inspection | `prod`, `non-prod`, `services`, `gateways` | prod, non-prod, services, gateway |

### Star topology

| Star topology |
|---|
| The center group's route table permits communication with spokes of the center or edge group. |
| The edge group's route table permits communication only with center group spokes; NCC prohibits routes that connect different spokes in the edge group. |

| Spoke | Center group | Edge group |
|---|---|---|
| VPC spoke | Yes | Yes |
| Producer VPC spoke | Yes | Yes |
| Hybrid spoke, site-to-site data transfer disabled | Yes | Yes |
| Hybrid spoke, site-to-site data transfer enabled | Yes | No |
| NCC Gateway spoke | Yes | No |

### Hybrid inspection topology

| Group | Purpose and permitted reach |
|---|---|
| prod | Production workloads; reaches prod, services and gateways groups; not non-prod |
| non-prod | Non-production workloads; reaches non-prod, services and gateways groups; not prod |
| services | Services essential to prod and non-prod; reaches any group |
| gateways | NCC Gateway spokes as security checkpoints; reach any group |

| Spoke | prod | non-prod | services | gateways |
|---|---|---|---|---|
| VPC spoke | Yes | Yes | Yes | No |
| Producer VPC spoke | Yes | Yes | Yes | No |
| Hybrid spoke (data transfer disabled or enabled) | Yes | Yes | Yes | No |
| NCC Gateway spoke | No | No | No | Yes |

| Source \ Destination | prod | non-prod | services | gateways |
|---|---|---|---|---|
| prod | Yes / No | No / No | Yes / No | Yes / Yes |
| non-prod | No / No | Yes / No | Yes / No | Yes / Yes |
| services | Yes / No | Yes / No | Yes / No | Yes / Yes |
| gateways | Yes / Yes | Yes / Yes | Yes / Yes | Yes / Yes |

## Notes

- Topologies: Mesh supports VPC spokes, producer VPC spokes, hybrid spokes and NCC Gateway spokes, and supports high-scale connectivity between VPC spokes and hybrid spokes.
- Hybrid inspection topology: SSE packet inspection is available only for traffic between an NCC Gateway spoke in the gateways group and a spoke in the prod, non-prod or services group. It isn't available for traffic over VLAN attachments, HA VPN tunnels or Router appliances in a hybrid spoke, because those spokes must be in prod, non-prod or services. Routing between groups (source row to destination column; first value = routing permitted, second = SSE inspection available):
- Star topology: hybrid spokes with site-to-site data transfer enabled must be in the center group.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/network-connectivity/hubs/groups/list (gcloud 593.0.0 help).
- Clarified from the official docs: in the hybrid inspection topology the group is named `gateways`; the source lists the groups returned by `hubs groups list --hub` as "gateway groups", so the returned group is the `gateways` group.
- Source: https://docs.cloud.google.com/network-connectivity/docs/network-connectivity-center/concepts/connectivity-topologies (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [vpc-spokes-overview.md](./vpc-spokes-overview.md)
- [ncc-gateway-overview.md](./ncc-gateway-overview.md)
- [dynamic-route-exchange-with-vpc-spokes.md](./dynamic-route-exchange-with-vpc-spokes.md)
