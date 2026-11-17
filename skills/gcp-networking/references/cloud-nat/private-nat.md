---
source: https://docs.cloud.google.com/nat/docs/private-nat
---

# Private NAT

Private NAT performs private-to-private network address translation: between VPC networks connected through a Network Connectivity Center (NCC) hub, between VPC and on-premises or other cloud provider networks (NCC hybrid spokes, Cloud Interconnect, Cloud VPN), and NAT64 for IPv6-only VMs.

## Signature / Usage

### Create a gateway (gcloud help example)

Snippet taken from the `gcloud compute routers nats create` help EXAMPLES (see Notes). This example creates a default gateway of type `PUBLIC` (the `--type` default); a Private NAT gateway is created with `--type=PRIVATE` ("private-to-private NAT translations" per the help) and uses Private NAT subnet ranges in rules instead of external IP addresses.

```bash
gcloud compute routers nats create nat1 --router=my-router \
    --auto-allocate-nat-external-ips --nat-all-subnet-ip-ranges
```

## Options / Props

### Translation types

| Type | Configuration options |
|---|---|
| NAT44 (IPv4 to IPv4) | Private NAT for NCC spokes (VPC spokes, and VPC spokes to hybrid spokes); Hybrid NAT (Cloud Interconnect or Cloud VPN) |
| NAT64 (IPv6 to IPv4) | Compute Engine VMs only (GKE nodes and serverless endpoints: IPv4 only). Destinations: same VPC network, VPC spokes of the same NCC hub, on-premises or other cloud networks via Cloud Interconnect, Cloud VPN or NCC hybrid spokes |

### Routes used

| Route | NAT type | Use |
|---|---|---|
| NCC subnet routes, NCC dynamic routes | NAT44 and NAT64 | Between VPC spokes the gateway uses subnet routes; for hubs with both VPC and hybrid spokes, subnet and dynamic routes |
| Local dynamic routes | NAT44 and NAT64 | Hybrid NAT: routes learned by Cloud Router through Cloud Interconnect or Cloud VPN |
| Local subnet routes, local static routes | NAT64 only | Traffic within the same VPC network |

### Limits and specifications

| Item | Value |
|---|---|
| Auto mode VPC networks | Not supported |
| Endpoint-independent mapping | Not supported |
| Simultaneous connections | Maximum 64,000 per endpoint |
| Protocols | TCP and UDP only (no ICMP or others) |
| VPC Network Peering destinations | Not supported |
| Subnet range granularity | NAT on all IPv4 ranges of a subnet or list of subnets, not a specific primary or secondary range |
| Private NAT subnet size | Cannot be changed after creation; multiple Private NAT subnet ranges per gateway allowed |
| NAT IP source | Subnet with purpose `PRIVATE_NAT`, same VPC network and region |
| Default port allocation | Dynamic |
| Destinations | Only non-overlapping subnets in the connected network |

NAT64 limitations: only IPv6-only Compute Engine VMs of all second-generation or earlier series and the M3 series; IPv4 Private Service Connect endpoints in the same VPC network as the gateway are not reachable through NAT64. NAT64 destinations must be in `64:ff9b::/96` (DNS64 can synthesize).

## Notes

- Each gateway belongs to one VPC network, region and Cloud Router (control plane only; no BGP dependence); outbound connections and their responses only, no unsolicited inbound requests.
- NAT64 does not use IPv4 or IPv6 policy-based routes; it is performed even if the packet matches an IPv6 policy-based route. If the embedded IPv4 destination matches an internet route, NAT64 is not performed (use NAT64 in Public NAT).
- Firewall: Cloud NGFW rules apply to VM NICs, not gateways; egress rules are evaluated before NAT, ingress after. No NAT-specific rules are needed.
- Subnet range options: IPv4 primary and secondary ranges of all subnets in the region, or a custom subnet list; IPv6 internal and external ranges of all subnets in the region, or a custom subnet list.
- To guard against IP address spoofing on idle TCP connections, set both the TCP keepalive inactivity period and keepalive interval shorter than the smaller of the TCP Transitory Connection Idle Timeout and the TCP TIME_WAIT Timeout.
- Private NAT is port restricted cone NAT (RFC 3489). Multiple NICs: one gateway applies to all NICs in the same VPC network; for NICs in different VPC networks one gateway applies to a single NIC only.
- Neither the source page nor the gcloud help has a Private NAT-specific example; the snippet is the generic gateway create example from https://docs.cloud.google.com/sdk/gcloud/reference/compute/routers/nats/create (gcloud 593.0.0 help). Private NAT setup is at https://docs.cloud.google.com/nat/docs/set-up-private-nat. The full flag list is in the `gcp-compute` skill.
- Changing a gateway or its rules can break existing connections; try it on a disposable gateway first.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/routers/nats/create (gcloud 593.0.0 help EXAMPLES).
- Source: https://docs.cloud.google.com/nat/docs/private-nat (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [public-nat.md](./public-nat.md)
- [ports-and-addresses.md](./ports-and-addresses.md)
- [nat-rules-overview.md](./nat-rules-overview.md)
- [nat-product-interactions.md](./nat-product-interactions.md)
