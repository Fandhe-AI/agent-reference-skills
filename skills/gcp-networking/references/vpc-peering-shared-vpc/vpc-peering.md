---
source: https://docs.cloud.google.com/vpc/docs/vpc-peering
---

# VPC Network Peering

VPC Network Peering connects two Virtual Private Cloud (VPC) networks so that resources in each network can communicate using internal IP addresses. Peered networks can be in the same project, in different projects of the same organization, or in different projects of different organizations. Peering exchanges routes only; networks stay administratively separate.

## Signature / Usage

### Create a peering configuration (each side creates one)

```bash
gcloud compute networks peerings create peering-a \
    --network=network-a \
    --peer-project=project-b \
    --peer-network=network-b \
    --import-custom-routes \
    --export-custom-routes
```

The peer administrator creates the matching configuration (`peering-b`, `--network=network-b`, `--peer-project=project-a`, `--peer-network=network-a`). The full workflow is in [using-vpc-peering.md](./using-vpc-peering.md).

## Options / Props

### Specifications and limitations

| Topic | Rule |
|---|---|
| Supported networks | VPC networks only, not legacy networks. Works with Compute Engine, GKE and App Engine flexible environment. |
| GKE | VPC-native clusters via subnet route exchange; routes-based clusters only when static routes are exchanged. |
| Connectivity | Internal IPv4 and IPv6 between pairs of VPC networks, same latency, throughput and availability as inside one network. |
| Transitivity | Not transitive: if `net-a`-`net-b` and `net-a`-`net-c` are peered, `net-b` and `net-c` can't communicate. |
| Auto mode networks | Two auto mode VPC networks can't be peered (each uses a range within `10.128.0.0/9`). A custom mode network can peer with an auto mode network only if none of its subnet ranges fit within `10.128.0.0/9`. |
| External IPv6 | Reachable via exchanged routes for dual-stack and IPv6-only VM interfaces, external protocol forwarding rules, and external passthrough Network Load Balancer forwarding rules. |
| Firewalls | VPC firewall rules and firewall policies are not exchanged. Network tags and service accounts in a rule resolve only to instances in the rule's own network (also for ingress sources). Secure Tags used as an ingress source in a network firewall policy rule can identify sources in the Tag's network and its peered networks; as a target they identify only targets in the Tag's network. |
| Implied rules | Implied deny ingress means each side must create ingress allow rules (sources may be the peer's IP ranges). Implied allow egress means no egress allow rule is needed unless egress deny rules exist. |
| DNS | Compute Engine internal DNS names of one network don't resolve in the peer (use the VM IP). Private zones authorized only for a local network aren't usable by the peer: use Cloud DNS peering zones or authorize the same private zone for all peered networks. |
| Internal load balancers | Clients can reach internal passthrough Network Load Balancers, internal proxy Network Load Balancers and internal Application Load Balancers in a peer network. Static routes with an internal passthrough Network Load Balancer next hop can be exchanged. |
| Quotas | Depend on the peering group (the network plus all networks peered to it). See the per-network quotas and effective limits for per-peering-group quotas on the VPC quota page. |
| Subnet overlap | No subnet IP range may exactly match, contain, or fit within another subnet range in a peered network. Checked at peering time and whenever a new subnet route would be created (new subnet, new secondary range, expanding primary range); peering creation fails on overlap. IPv6 subnet ranges are unique across all Google Cloud VPC networks. |
| Pricing | Regular network pricing applies. |

### Route exchange: subnet routes

| Route type | Export | Import |
|---|---|---|
| IPv4 subnet routes with private IPv4 ranges | Always; can't be disabled | Always; can't be disabled |
| IPv4 subnet routes with privately used public IPv4 ranges | Exported by default; `--export-subnet-routes-with-public-ip` | Not imported by default; `--import-subnet-routes-with-public-ip` |
| Internal IPv6 subnet ranges (`ipv6-access-type=INTERNAL`) | Not by default; enabled with `--stack-type=IPV4_IPV6` | Not by default; enabled with `--stack-type=IPV4_IPV6` |
| External IPv6 subnet ranges (`ipv6-access-type=EXTERNAL`) | Not by default; enabled with `--stack-type=IPV4_IPV6` | Not by default; enabled with `--stack-type=IPV4_IPV6` |

### Route exchange: static and dynamic routes

| Route type | Export | Import |
|---|---|---|
| Static routes with network tags (all next hop types) | Can't be exported | Can't be imported |
| Static routes using the default internet gateway next hop | Can't be exported | Can't be imported |
| IPv4 static routes without network tags, next hop other than default internet gateway | `--export-custom-routes` (off by default) | `--import-custom-routes` (off by default) |
| IPv6 static routes without network tags using a VM instance next hop | `--export-custom-routes` with `--stack-type=IPV4_IPV6` (off by default) | `--import-custom-routes` with `--stack-type=IPV4_IPV6` (off by default) |
| Dynamic IPv4 routes | `--export-custom-routes` (off by default) | `--import-custom-routes` (off by default) |
| Dynamic IPv6 routes | `--export-custom-routes` with `--stack-type=IPV4_IPV6` (off by default) | `--import-custom-routes` with `--stack-type=IPV4_IPV6` (off by default) |

## Notes

- Route exchange: static and dynamic routes: Peering does not provide granular control over which specific subnet, static or dynamic routes are exchanged, and does not exchange policy-based routes. Static and dynamic routes are exported and imported together by the same flags.
- Cloud Routers don't advertise received peering subnet routes in default advertisement mode. To give on-premises networks a path to peered subnets, use custom advertised mode on the Cloud Router and include the peered subnet ranges. On-premises reachability from the peer needs the exporting side `--export-custom-routes` and the importing side `--import-custom-routes`.
- Ignored routes: a local route with an identical or more specific destination always wins. If two or more peers contain the same most-specific destination, one peer's next hop is chosen by an internal algorithm before route priority is considered, and this can't be configured; avoid this setup.
- IPv6 with dual-stack peerings: if the importing network has no dual-stack or IPv6-only subnets, imported IPv6 routes are unusable. If org policy `constraints/compute.disableAllIpv6` is set, creating IPv6 subnets may not be possible.
- Subnet vs static route interactions: a local static route can't exactly match or fit within a peering subnet route (and the reverse); this blocks new peerings, peering updates that would import the conflicting route, and creating the conflicting route or subnet while peered. Examples in the source: local static `10.0.0.0/24` conflicts with a peer subnet `10.0.0.0/24` or `10.0.0.0/8`; IPv6 subnet ranges use /64 masks.
- Dynamic routing mode: the dynamic routing mode of the exporting network decides in which regions peering dynamic routes are programmed (regional: only the Cloud Router's region; global: all regions). The importing network's mode is irrelevant.
- Examples in the source: a peer network reaching on-premises through `network-b` (with `network-b` exporting and `network-a` importing custom routes, Cloud Router custom advertisement), and a transit network `network-b` peered with `network-a` and `network-c`; `network-a` and `network-c` still can't talk to each other without their own peering.
- Peering configuration can be updated before or while the connection is active.
- The code block above is taken from https://docs.cloud.google.com/vpc/docs/using-vpc-peering (example "Exchange custom routes in a peering connection"); the vpc-peering page itself has no code block. The source also shows diagrams.
- Source: https://docs.cloud.google.com/vpc/docs/vpc-peering (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [using-vpc-peering.md](./using-vpc-peering.md)
- [about-peering-connections.md](./about-peering-connections.md)
- [shared-vpc.md](./shared-vpc.md)
