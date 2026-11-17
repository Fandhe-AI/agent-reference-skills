---
source: https://docs.cloud.google.com/vpc/docs/vpc
---

# VPC networks

A VPC network is a virtual version of a physical network implemented inside Google's production network by using Andromeda. It is a global resource made of regional subnets; projects can contain multiple VPC networks, and new projects start with an auto mode `default` network unless an organization policy prevents it.

## Signature / Usage

### Create and switch subnet creation mode

```bash
gcloud compute networks create network-name
```

```bash
gcloud compute networks create network-name \
    --bgp-routing-mode=global --subnet-mode=custom
```

```bash
gcloud compute networks update network-name \
    --switch-to-custom-subnet-mode
```

```bash
gcloud compute networks update network-name \
    --bgp-routing-mode=global
```

The first command creates a regional auto subnet mode network; the second a global custom subnet mode network; the third converts an auto mode network to custom mode; the fourth changes a regional network to global dynamic routing mode.

## Options / Props

### Specifications

| Property | Behavior |
|---|---|
| Scope | VPC networks, their routes and firewall rules are global resources (not tied to a region or zone). Subnets are regional resources. |
| Subnet ranges | IPv4-only and dual-stack subnets define IPv4 ranges (dual-stack also IPv6); IPv6-only subnets define IPv6 ranges. |
| Firewall | Rules are implemented on the VMs themselves, so traffic is controlled and logged only as it leaves or arrives at a VM. |
| Communication | Internal IPv4, internal IPv6 or external IPv6 addresses, subject to firewall rules. |
| Google APIs | Instances with internal IPv4/IPv6 addresses can reach Google APIs and services (see private access options). |
| GRE | Version 0 supported. Cloud NAT doesn't support GRE; Application Load Balancers and proxy Network Load Balancers don't; passthrough Network Load Balancers and protocol forwarding support GRE with the `L3_DEFAULT` forwarding rule protocol. Cloud Customer Care doesn't help with overlay networks. |
| Addressing | IPv4 and IPv6 unicast only. No broadcast or multicast within the network. |

### Subnet creation mode

| Mode | Behavior |
|---|---|
| Auto mode | One subnet per region is created automatically from predefined IPv4 ranges inside `10.128.0.0/9`; new regions get new subnets automatically. You can add manual subnets outside `10.128.0.0/9`. No IPv6 subnets. |
| Custom mode | No subnets created automatically; you choose regions and IP ranges. Recommended for production. |

| Subnet creation mode |
|---|
| Auto mode to custom mode is a one-way conversion; custom mode cannot be changed back. |
| The `default` network is an auto mode network with pre-populated IPv4 firewall rules (including `default-allow-internal` and ingress rules for protocols such as RDP and SSH) and no pre-populated IPv6 firewall rules. |
| Auto mode networks cannot be connected to each other by VPC Network Peering or Cloud VPN (all use the same predefined ranges), and `10.128.0.0/9` may overlap external networks. |

### Organization policy constraints

| Constraint | Effect |
|---|---|
| `compute.skipDefaultNetworkCreation` | Projects inheriting the policy get no default network. |
| `constraints/compute.disableVpcExternalIpv6` | If true, prevents subnets with external IPv6 ranges. |
| `constraints/compute.disableVpcInternalIpv6` | If true, prevents subnets with internal IPv6 ranges. |
| `constraints/compute.disableAllIpv6` | If true, disables creating or updating any subnets or other networking resources involved in IPv6 usage. |

### Supported protocols

| Traffic | Protocols |
|---|---|
| IPv4 between VMs | All IPv4 protocols |
| IPv4 between VMs and internet | ICMP, IPIP, TCP, UDP, GRE, ESP, AH, SCTP |
| IPv6 between VMs and between VMs and internet | AH, ESP, GRE, ICMP, ICMPv6, IPIP, SCTP, TCP, UDP; Destination Options and Fragments extension headers (Destination Options after Fragment header not supported) |
| Protocol forwarding | AH, ESP, GRE, ICMP, ICMPv6, SCTP, TCP, UDP |

### Other behavior

| Other behavior |
|---|
| Dynamic routing mode (per network) controls all Cloud Routers in the network (`regional` or `global`). |
| Advertised addresses: regional internal IPv4 (subnet ranges), regional internal/external IPv6, global internal IPv4 (Private Service Connect endpoints for Google APIs). With peering, private IPv4 subnet ranges are always exchanged; privately used public IPv4 ranges and IPv6 ranges are configurable; global internal IPv4 addresses are never exchanged. |
| App Engine standard environment: only App Engine firewall rules apply to ingress (instances don't run in your VPC). Flexible environment: both App Engine and VPC firewall rules apply to ingress; VPC rules apply to egress. |
| Traceroute: Google Cloud raises the TTL of packets through some next hops, so `traceroute` / `mtr` can hide hops inside Google's network (no workaround); missing hops don't mean dropped traffic. ICMP probe loss at intermediate hops is usually rate limiting; generally only the destination hop matters. |
| Latency (typical, c2-standard-4, same zone): round trip under 55 μs p50 and 80 μs p99; with a compact placement policy under 45 μs p50 and 60 μs p99. Cross-region packet loss target: global average under 0.01%. |

## Notes

- Internet access requirements: An instance has outgoing internet access only if all hold: a valid default internet gateway route or custom route with the most general destination (`0.0.0.0/0` for IPv4, `::/0` for IPv6); firewall rules allow egress (the implied allow-egress rule does unless overridden); and the instance has an external IP address, or can use Cloud NAT or an instance-based proxy that is the target of a static `0.0.0.0/0` or `::/0` route.
- Subnet and subnetwork are synonyms; a subnet is not the same resource as a VPC network.
- Legacy networks are different and can no longer be created; see [legacy.md](./legacy.md).
- Privately used public IP ranges need extra care when advertised to on-premises networks that may advertise them to the internet.
- `gcloud compute networks update --switch-to-custom-subnet-mode` is one-way; try it on a disposable network first.
- The source has no code; gcloud snippets are taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/networks/create and https://docs.cloud.google.com/sdk/gcloud/reference/compute/networks/update (gcloud 593.0.0 help). The full flag list is in the `gcp-compute` skill.
- Network profiles: see [network-profiles.md](./network-profiles.md).
- Source: https://docs.cloud.google.com/vpc/docs/vpc (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [subnets.md](./subnets.md)
- [mtu.md](./mtu.md)
- [ipv6-support.md](./ipv6-support.md)
- [quota.md](./quota.md)
- [network-profiles.md](./network-profiles.md)
- [legacy.md](./legacy.md)
