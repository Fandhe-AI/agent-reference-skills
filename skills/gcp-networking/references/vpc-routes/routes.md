---
source: https://docs.cloud.google.com/vpc/docs/routes
---

# Routes

A VPC route consists of a single destination prefix in CIDR format and a single next hop. Google Cloud delivers a packet to the next hop of an applicable route when the packet's destination is within the route's destination range. Routing is a scalable, distributed virtual mechanism: there is no physical device, and the routing table is defined at the VPC network level. Each VM has a controller that is kept informed of all applicable routes; route additions and deletions propagate to the VM controllers with an eventually consistent design.

## Signature / Usage

### List subnet and static routes of a network

Snippet taken from https://docs.cloud.google.com/vpc/docs/using-routes (the gcloud commands show only subnet routes and static routes; use the console for the complete effective-route view).

```bash
gcloud compute routes list \
    --filter="network=NETWORK_NAME" \
    --project=PROJECT_ID
```

Replace `NETWORK_NAME` with the VPC network name and `PROJECT_ID` with the project ID.

## Options / Props

### Route types

| Category | Type | Next hop | Scope / notes |
|---|---|---|---|
| Policy-based | Policy-based route | Skip other policy-based routes, or an internal passthrough Network Load Balancer | Evaluated before any other route type. Matches on source IP, destination IP, protocol. Applies to all VMs, VMs selected by network tag, or traffic entering via VLAN attachments (one region or all regions). Never exchanged through VPC Network Peering. |
| Subnet | Local subnet route | VPC network | Created automatically per subnet IP range; applies to the whole network. |
| Subnet | Peering subnet route | Next hop in the peer VPC network | Created automatically; imported routes apply to the whole network. |
| Subnet | NCC subnet route | NCC hub | From VPC spokes of an NCC hub; spoke admins can exclude export of subnet routes. |
| Custom | Local static route | Static route next hop | Various destinations; see static route next hops. |
| Custom | Local dynamic route | Peer of a BGP session on a Cloud Router | Added or removed from Cloud Router learned routes; applies per the network's dynamic routing mode. |
| Custom | Peering static / dynamic route | Next hop in the peer network | Static routes apply to the whole network; dynamic routes apply to one or all regions per the dynamic routing mode of the exporting network. |
| Custom | NCC dynamic route | NCC hub | From NCC hybrid spokes in different VPC networks; one or all regions per the routing mode of the network containing the hybrid spoke. |
| System-generated | Default routes `0.0.0.0/0` (IPv4), `::/0` (IPv6) | `default-internet-gateway` | Whole network; can be removed or replaced. |

### Default routes

| Default routes |
|---|
| Creating a VPC network adds a system-generated IPv4 default route (`0.0.0.0/0`, local static route, default internet gateway next hop). Public Cloud NAT gateways (NAT44 and NAT64) always depend on such a local IPv4 static route. |
| Creating a subnet with an external IPv6 range adds an IPv6 default route (`::/0`) if the network has none. It serves VMs with `/96` external IPv6 ranges. |
| A Private Service Connect endpoint for global Google APIs needs no default route (its internal forwarding rule is the route). Default domains, `private.googleapis.com` and `restricted.googleapis.com` can use default routes or more specific static routes with default internet gateway next hops. |
| Without a default route the network is not necessarily isolated: special paths for external passthrough Network Load Balancers and external protocol forwarding do not depend on it. |

### Subnet and custom route interactions (unless the subnet uses hybrid subnet routing)

| Subnet and custom route interactions (unless the subnet uses hybrid subnet routing) |
|---|
| A new static route is rejected if its destination exactly matches or fits within an existing local, peering or NCC subnet route (for example, with `10.70.1.0/24` you cannot create `10.70.1.0/24`, `10.70.1.0/25` or `10.70.1.128/25`). |
| Subnet changes are rejected if they would create a range that exactly matches or contains an existing local or peering static route destination. |
| No dynamic route is created for a prefix that equals or fits within a subnet route destination. An existing dynamic route is removed when a new subnet route equals or contains its destination. |
| Destination ranges of all subnet route types must be unique. |

### Applicable routes

| Item | Details |
|---|---|
| Always apply to all VMs, VLAN attachments and Cloud VPN tunnels | special routing paths and subnet routes. |
| Policy-based routes | all, VMs by network tag, or VLAN attachments in one region. Static routes: all, or VMs by network tag. Dynamic routes: the region of the next hop or all regions, per dynamic routing mode. |

### Special routing paths (not shown in the route table; cannot be removed; allow or deny with firewall rules or policies)

| Path | Range | Notes |
|---|---|---|
| External passthrough Network Load Balancer / external protocol forwarding | Forwarding rule IP | Backend sources must match the forwarding rule IP; no default route or IP forwarding needed. |
| GFE to backends (external Application LB, external proxy Network LB) | `35.191.0.0/16`, `130.211.0.0/22` (IPv4); `2600:2d00:1:1::/64` (IPv6) | Return paths exist in every network. |
| Health checks (all load balancers, MIG autohealing) | Health check probe ranges | Return paths exist in every network. |
| IAP TCP forwarding | `35.235.240.0/20`, `2600:2d00:1:7::/64` | Non-removable routes; cannot be used as private subnet ranges. |
| Cloud DNS forwarding / alternative name servers with private routing, Service Directory private network access | `35.199.192.0/19` | Cannot be used as a subnet range. |
| Serverless VPC Access | `35.199.224.0/19` | Cannot be used as a subnet range. |
| Chrome Enterprise Premium | `136.124.16.0/20` | Cannot be used as a subnet range. |

## Notes

- Routing order: 1. Special routing paths (if applicable, all other routes are disregarded). 2. Policy-based routes, by priority only (no longest-prefix match). Ties among the highest priority are resolved by an internal algorithm, so use unique priorities. A single matching route with the skip option proceeds to step 5; otherwise the packet goes to the internal passthrough Network Load Balancer next hop. 3. Subnet routes: a matching regular subnet route is used exclusively (the packet is dropped if the destination has no resource or a stopped VM). A matching hybrid subnet route is used when the destination is a running VM or internal forwarding rule; otherwise see unmatched resources below. 4. Private Service Connect endpoints for global Google APIs: matched packets go to a Google Front End. 5. Most specific destination among applicable static and dynamic routes. 6. Most favorable custom route type: local (static or dynamic) over NCC dynamic over peering (static or dynamic). 7. Peering custom routes from a single VPC network (internal algorithm; the chosen peer can change when peers are added or removed). 8. Disregard unusable next hops: invalid `next-hop-address` (must be a primary internal IPv4, internal IPv6 or external IPv6 address of a VM NIC; an alias IP range does not qualify), stopped or deleted next hop VM, invalid load balancer IP (must match an internal passthrough Network Load Balancer forwarding rule in the route's or a peered network), Classic VPN tunnel without an active Phase 1 (IKE) SA, dynamic route whose next hop is nonfunctional. Guest OS processing is not validated. 9. Disregard lower-priority routes. 10. NCC dynamic routes from a single routing VPC network (use unique priorities per hybrid spoke to avoid ambiguity). 11. Most favorable preference category (no ECMP across categories): first, static routes with next hop instances or Classic VPN tunnels; second, dynamic routes of a single type; third, a single static route with an internal passthrough Network Load Balancer next hop; fourth, static routes to `default-internet-gateway`. 12. Send or drop: one route sends the packet (a next hop internal passthrough Network Load Balancer without global access is dropped from other regions); two or more routes use ECMP (five-tuple hash with ports, otherwise three-tuple; consistent selection is not guaranteed); an empty model drops the packet with ICMP type 3, code 0.
- Unmatched resources in hybrid subnet routes: For a destination in a hybrid subnet route that is a stopped VM or no resource: start from all routes of the network containing the hybrid subnet route, remove policy-based routes, subnet routes, tagged static routes and broader routes containing the hybrid route, then apply steps 5 to 11. A next hop in the same region as the hybrid subnet route receives the packet; an empty model or a next hop in another region drops it with ICMP type 3, code 0 (dynamic routes learned in other regions, and static routes with next hops in other regions including global-access internal passthrough Network Load Balancers, always drop).
- Source inconsistency: this page says policy-based routes can apply to traffic entering through VLAN attachments "in only one region, or in all regions", but the same page (and the policy-based routes page) says "Only VLAN attachments in a particular region" / "in a specific region".
- Source inconsistency: this page lists "Classic VPN configured to use dynamic routing" as a next hop of dynamic routes without a caveat, but the Classic VPN deprecation page (https://docs.cloud.google.com/network-connectivity/docs/vpn/deprecations/classic-vpn-deprecation, retrieved 2026-11-17) says "As of August 1, 2025, the creation of Classic VPN tunnels using dynamic routing (BGP) is no longer supported, regardless of the gateway the tunnel connects to." Treat Classic VPN with dynamic routing as deprecated; use HA VPN.
- Source: https://docs.cloud.google.com/vpc/docs/routes (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/vpc/docs/using-routes (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0).
- The source page has no code. The full `gcloud compute routes` flag list is in the `gcp-compute` skill; reference: https://docs.cloud.google.com/sdk/gcloud/reference/compute/routes
- Subnet route lifecycle: subnet routes are created and deleted when subnets are added or deleted, primary IPv4 ranges are expanded, secondary IPv4 ranges or IPv6 ranges are added or deleted, and when Google Cloud adds a region to auto mode networks.
- Dynamic route next hops: a VLAN attachment (Dedicated or Partner Interconnect), a Cloud VPN tunnel (HA VPN, or Classic VPN with dynamic routing) or a Router appliance VM. If the next hop becomes inaccessible, the Cloud Router instructs the network to remove the route.

## Related

- [static-routes.md](./static-routes.md)
- [policy-based-routes.md](./policy-based-routes.md)
- [using-routes.md](./using-routes.md)
