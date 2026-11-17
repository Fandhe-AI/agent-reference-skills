---
source: https://docs.cloud.google.com/network-connectivity/docs/network-connectivity-center/concepts/dynamic-route-exchange-with-vpc-spokes
---

# Route exchange with VPC spokes

Route exchange with VPC spokes connects VPC spokes and hybrid spokes (VLAN attachments, HA VPN tunnels, Router appliance VMs) on the same hub, giving scalable any-to-any connectivity between multiple on-premises networks and Google Cloud VPC networks. Route exchange with VPC spokes supports IPv4 addressing only.

## Signature / Usage

```bash
gcloud network-connectivity hubs route-tables routes list \
    --hub=my-hub --route_table=my-route-table
```

## Options / Props

### Network roles

| Term | Definition |
|---|---|
| Workload VPC network | VPC network (standalone or Shared VPC) that a spoke administrator adds to a hub as a VPC spoke. Can be in the hub's project or another project in the same or another organization. |
| Routing VPC network | VPC network containing at least one hybrid spoke (VLAN attachments, HA VPN tunnels or Router appliance VMs). It, and those resources, must be in the same project as the hub. It can also be a VPC spoke on the same hub; this is required for Private Service Connect connection propagation to work with hybrid spokes. |

### Establishing connectivity between hybrid spokes and VPC spokes

1. Routing VPC network administrators review Cloud Router path selection and dynamic routing mode:
   - NCC hybrid spokes support only the Cloud Router legacy best path selection mode.
   - Both global and regional dynamic routing modes are supported. Regional: NCC dynamic routes from a hybrid spoke are programmed only in that spoke's region. Global: programmed in all regions. The VPC spoke uses the dynamic routing mode only when hybrid spokes reside in the same hub.
2. Hub administrators create the hub and give access so spoke administrators can propose VPC spokes from other projects.
3. Spoke administrators create VPC spoke proposals and hybrid spokes (Router appliance, VLAN attachment, VPN).
4. A hub administrator reviews proposed VPC spokes from other projects.
5. Spoke or network administrators configure advertisement of VPC spoke subnet routes, by any of:
   - API: set `includeImportRanges` to `["ALL_IPV4_RANGES"]` on the hybrid spoke (`LinkedRouterApplianceInstances`, `LinkedInterconnectAttachments`, `LinkedVpnTunnels`).
   - gcloud: `--include-import-ranges=[ALL_IPV4_RANGES]` on `network-connectivity spokes linked-router-appliances|linked-interconnect-attachments|linked-vpn-tunnels update`.
   - Advertise custom address ranges on the Cloud Routers of the hybrid spokes: either all VPC spoke subnet IPv4 ranges or larger CIDRs containing them.

### Route tables

- The hub route table lists learned dynamic routes from on-premises networks and subnet routes reachable from attached spokes. It is read-only and managed by NCC.
- It is updated on VPC spoke creation or deletion, subnet creation or deletion in attached VPC spokes, hybrid spoke creation or deletion, and BGP route advertisement or withdrawal from hybrid spokes.
- Each VPC spoke also has a VPC network route table of routes programmed in that network.

### Examples from the source

| Scenario | Result |
|---|---|
| Hybrid spokes `a-west` (receives `192.168.0.0/16`) and `b-west` (receives `192.168.44.0/24`), same region | VPC spoke imports four NCC dynamic routes. Packets within `192.168.44.0/24` go to `b-west` VLAN attachments; packets in `192.168.0.0/16` outside it go to `a-west`. |
| Routing VPC network with global dynamic routing and legacy best path selection; `west-hybrid-spoke` and `east-hybrid-spoke`; on-premises advertises `192.168.44.0/24` with MED `10` to `west-a` / `east-a` and MED `20` to `west-b` / `east-b` | Local dynamic routes in `us-west1`: priority 10 (`west-a`), 20 (`west-b`), 275 (`east-a`, inter-regional cost 265). In `us-central1`: 243 (`east-a`, cost 233) and 248 (`west-a`, cost 238). In `us-east1`: 10 (`east-a`), 20 (`east-b`), 275 (`west-a`, cost 265). The workload VPC network gets matching NCC dynamic routes per region; its own routing mode and path selection are not relevant. To steer paths, adjust the MED values advertised by on-premises. |

## Notes

- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/network-connectivity/hubs/route-tables/routes/list (gcloud 593.0.0 help).
- Detailed steps (create hub, propose spokes, view route tables) are in the official "Work with hubs and spokes", "Configure a hub" and "View the hub route table" guides.
- Corrected from the official docs: the source writes the prefix as `192.168.44.10/24` (host bits set, so it is not a valid network prefix); it is shown here as `192.168.44.0/24`, the /24 network that contains `192.168.44.10`. The MED and priority values in the examples are unchanged.
- Source inconsistency: this page says "Route exchange with VPC spokes supports IPv4 addressing only", but the NCC overview (https://docs.cloud.google.com/network-connectivity/docs/network-connectivity-center/concepts/overview, retrieved 2026-11-17) says VPC spokes provide connectivity among IPv4 and IPv6 subnet ranges and that hybrid spokes support exporting IPv4 and IPv6 (Preview) dynamic routes. Safe reading: the IPv4-only statement applies to route exchange between hybrid spokes and VPC spokes as described on this page.
- `--route_table` is spelled with an underscore in the gcloud 593.0.0 SYNOPSIS of `gcloud network-connectivity hubs route-tables routes list` (`[--hub=HUB --route_table=ROUTE_TABLE]`); it is not a typo for `--route-table`.
- Source: https://docs.cloud.google.com/network-connectivity/docs/network-connectivity-center/concepts/dynamic-route-exchange-with-vpc-spokes (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [vpc-spokes-overview.md](./vpc-spokes-overview.md)
- [spoke-filters-overview.md](./spoke-filters-overview.md)
- [connectivity-topologies.md](./connectivity-topologies.md)
