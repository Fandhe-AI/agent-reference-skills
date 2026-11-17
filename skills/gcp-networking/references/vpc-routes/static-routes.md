---
source: https://docs.cloud.google.com/vpc/docs/static-routes
---

# Static routes

Overview of how static routes work in Google Cloud: route parameters, supported next hop types and their per-type considerations (VM instances, internal passthrough Network Load Balancers, Classic VPN tunnels, Network Connectivity Center).

## Signature / Usage

Snippet taken from https://docs.cloud.google.com/vpc/docs/using-routes (the static routes page itself has no code).

```bash
gcloud compute routes create ROUTE_NAME \
    --network=NETWORK \
    --destination-range=DESTINATION_RANGE \
    --priority=PRIORITY \
    NEXT_HOP_SPECIFICATION
```

Static routes are created with the console, `gcloud compute routes create` or the `routes.insert` API. With the console, creating a Classic VPN tunnel without dynamic routing might create static routes automatically.

## Options / Props

### Route parameters

| Parameter | Description |
|---|---|
| Name, Description | Name required (unique per project); description optional. |
| Network | Exactly one VPC network. |
| Next hop | Network resource that receives packets. All next hop types support IPv4 destinations; some support IPv6. |
| Destination range | A single IPv4 or IPv6 CIDR. Broadest: `0.0.0.0/0` (IPv4), `::/0` (IPv6). |
| Priority | Lower number = higher priority. Highest `0`, lowest `65,535`. |
| Network tags | Without a tag: applies to all resources (VMs, Cloud VPN tunnels, VLAN attachments, Router appliances, Envoy proxies in proxy-only subnets). With a tag: only VM instances that have the tag. Static routes with tags are never exchanged by VPC Network Peering. |

### Next hop types

| Next hop type | IPv4 | IPv6 | ECMP (1) |
|---|---|---|---|
| `next-hop-gateway` (default internet gateway) | Yes | Yes | No |
| `next-hop-instance` (name and zone, same project as the route) | Yes | Yes | Yes |
| `next-hop-address` (primary internal IPv4, or internal or external IPv6 address of a VM NIC) | Yes | Yes | Yes |
| `next-hop-ilb` by forwarding rule name and `next-hop-ilb-region` | Yes | Yes | No |
| `next-hop-ilb` by forwarding rule IP address | Yes | Yes (2) | No |
| `next-hop-vpn-tunnel` (Classic VPN) | Yes | No | Yes |

### Next hop project and network

| Next hop type | Peered VPC network | Different NCC hub VPC spoke | Shared VPC service project |
|---|---|---|---|
| `next-hop-gateway` | No | No | No |
| `next-hop-instance` | No | No | No |
| `next-hop-address` | No | No | Yes |
| `next-hop-ilb` by name and region | No | No | No |
| `next-hop-ilb` by forwarding rule resource link | No | No | Yes |
| `next-hop-ilb` by address | Yes | Yes (IPv4 only) | Yes |
| `next-hop-vpn-tunnel` | No | No | No |

### Instance and internal passthrough Network Load Balancer next hops

| Instance and internal passthrough Network Load Balancer next hops |
|---|
| Enable IP forwarding (`can-ip-forward`) per VM at creation (in the instance template for managed instance groups), in addition to guest OS configuration. |
| Software on the VM must be configured as a router, firewall or appliance per the manufacturer's instructions. |
| Ingress firewall rules must allow the routed packet sources (the implied deny ingress rule blocks them). Egress rules must include routed packet destinations (allowed by default unless an egress deny rule overrides). Account for NAT when writing rules. |
| The source region of packets sent by a next hop VM or backend is that VM's region. Resources reachable only in the same region include internal passthrough Network Load Balancers, internal Application Load Balancers and regional internal proxy Network Load Balancers with global access off, plus Cloud VPN tunnels, VLAN attachments and Router appliance VMs with regional dynamic routing. |

### Next hop instances

| Next hop instances |
|---|
| By name and zone: the instance must exist in the route's project and have a NIC in the route's network (not a peered network). Programming updates automatically when its primary internal IPv4 address changes or when a same-name replacement (same zone, project, NIC network) is created. It does not update when the instance is deleted, the NIC's IPv6 range changes, or its IPv4 or IPv6 address is unassigned. |
| By IP address: valid addresses are the primary internal IPv4 address of a NIC, or any internal or external IPv6 address in its `/96` range. A route with an alias IP next hop is created but never programmed. Packets go to the NIC, not the address. A VM in a Shared VPC service project is allowed by address; by name and zone it must be in the route's project. |
| Google Cloud does not consider region distance (cross-region adds egress cost and latency), never health-checks the next hop and does not validate its configuration (disabling the NIC in the guest OS does not make Google Cloud skip it). |
| No symmetric hashing when two or more multi-NIC next hop VMs connect two VPC networks with equal-destination, equal-priority static routes; only internal passthrough Network Load Balancer next hops support symmetric hashing. |
| Stopped or deleted next hop VMs are not prevented. Example: `route-a` (`192.168.168.0/24`, priority `10`, `vm-a` stopped) and `route-b` (priority `20`, `vm-b` running) send traffic to `vm-b`. If both `/24` next hops are stopped, packets are dropped even if a running `192.168.0.0/16` route exists, because the most specific destination step precedes the unusable next hop step. |

### Internal passthrough Network Load Balancer next hops

| Internal passthrough Network Load Balancer next hops |
|---|
| Only internal passthrough Network Load Balancer forwarding rules are supported (not other load balancer types, protocol forwarding or Private Service Connect endpoints). The forwarding rule IP version must match the route's. |
| Specification methods: by name (`--next-hop-ilb`) and region (`--next-hop-ilb-region`), where the network must match the route's network and the rule must be in the project of that network; by resource link `/projects/PROJECT_ID/regions/REGION/forwardingRules/FORWARDING_RULE_NAME`, where the network must match and the rule may also be in a Shared VPC service project; by forwarding rule IPv4 or IPv6 address, where the rule's network may be the route's network or one connected through VPC Network Peering or NCC (subject to NCC static route requirements). |
| Routes are programmed in all regions. With global access enabled the next hop is usable in all regions; without it, packets from other regions are dropped. |
| If all backends fail health checks, the route stays in effect and packets still go to a backend. |
| Forwarding rules with a shared IP (`--purpose=SHARED_LOADBALANCER_VIP`) are not supported; traffic is silently dropped. |
| ECMP is never done across several next hop internal passthrough Network Load Balancers (one is chosen by an internal algorithm, not consistently). Avoid routes that differ only in load balancer. Without network tags you cannot create several routes with the same destination, priority and load balancer next hop; with tags you can. |

### Classic VPN tunnel next hops

| Classic VPN tunnel next hops |
|---|
| Region distance is not considered; use HA VPN with dynamic routing instead because it considers regional distance. |
| Static routes with Classic VPN next hops are not removed automatically when tunnels are down (see "When tunnels are down" in the Classic VPN docs). |

## Notes

- Next hop types: (1) Two or more static routes can share destination and priority. Several routes with the default internet gateway next hop, same destination and priority behave as one route. (2) IPv6 support depends on the next hop project and network.
- Next hop project and network: The next hop's VPC network must match the route's network, except where allowed below. The next hop must be in the project containing that network (standalone or Shared VPC host project), except where allowed below.
- NCC: Static routes can be created from VPC spokes to internal passthrough Network Load Balancers reachable through the NCC hub, with additional limitations (see the NCC static routes overview).
- Source: https://docs.cloud.google.com/vpc/docs/static-routes (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/vpc/docs/using-routes (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0).
- In auto mode VPC networks, do not create static routes with destinations inside `10.128.0.0/9`; they might be disabled unexpectedly when a new region adds a subnet route.
- Creating, updating or deleting routes can break connectivity; try changes on a disposable network first.
- Classic VPN next hops are limited to IPv4; HA VPN with dynamic routing is the source's recommended alternative.
- The full `gcloud compute routes` flag list is in the `gcp-compute` skill.

## Related

- [routes.md](./routes.md)
- [using-routes.md](./using-routes.md)
- [policy-based-routes.md](./policy-based-routes.md)
