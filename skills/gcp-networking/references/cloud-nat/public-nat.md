---
source: https://docs.cloud.google.com/nat/docs/public-nat
---

# Public NAT

Public NAT lets Compute Engine VM instances communicate with the internet by allocating a set of shared external IPv4 addresses and source ports to each VM that uses the gateway. VMs without external IPv4 addresses can reach IPv4 internet destinations; VMs with external or internal IPv6 addresses can reach IPv4 destinations through NAT64.

## Signature / Usage

### Create a gateway and choose address and subnet options (gcloud help examples)

Snippets taken from the `gcloud compute routers nats create` help EXAMPLES (see Notes): manual NAT IP addresses (reserved static address resources in the same region), then automatic allocation restricted to named subnet ranges.

```bash
gcloud compute routers nats create nat1 --router=my-router \
    --nat-external-ip-pool=ip-address1,ip-address2
```

```bash
gcloud compute routers nats create nat1 --router=my-router \
    --auto-allocate-nat-external-ips \
    --nat-custom-subnet-ip-ranges=subnet-1,\
subnet-3:secondary-range-1
```

## Options / Props

### Translation types

| Type | Availability |
|---|---|
| NAT44 (IPv4 to IPv4) | Compute Engine VMs, GKE, serverless endpoints, regional internet NEGs |
| NAT64 (IPv6 to IPv4) | Compute Engine VM instances only; for GKE nodes, serverless endpoints and regional internet NEGs only IPv4 is translated |

### Sources translated (NAT44)

- The VM NIC primary internal IP, only if the NIC has no external IP (an external IP always takes precedence and performs one-to-one NAT without Public NAT).
- An alias IP range of the NIC, even if the NIC has an external IP (an external IP never does one-to-one NAT for alias IPs).
- IP addresses used for IP forwarding (configure with a source-based NAT rule).
- GKE clusters (in certain circumstances, see product interactions).

NAT64 sources: the internal `/96` and external `/96` address ranges of the VM's IPv6-only network interface.

### Subnet range options

| IP version | Option |
|---|---|
| IPv4 | Primary and secondary ranges of all subnets in the region |
| IPv4 | Primary ranges of all subnets in the region (alias ranges from primary ranges only; other gateways can serve secondary ranges) |
| IPv4 | Custom subnet list (primary IPs and all alias ranges) |
| IPv4 | Custom subnet IPv4 address ranges (as many gateways as needed, within quotas) |
| IPv6 | Internal and external ranges of all subnets in the region |
| IPv6 | Custom subnet list |

### Defaults and behavior

| Item | Value |
|---|---|
| Endpoint-independent mapping (EIM) | Disabled by default on creation; RFC 5128 EIM and endpoint-dependent filtering (always on); behaves as Port Restricted Cone NAT (RFC 3489) |
| NAT IP allocation | Automatic or manual; automatic tiers: Premium (default) or Standard |
| Port allocation | Static or dynamic per VM |
| NAT64 destination range | `64:ff9b::/96` (DNS64 can synthesize addresses) |

## Notes

- Each gateway is tied to one VPC network, region and Cloud Router; it does not use or depend on BGP.
- Public NAT does not allow unsolicited inbound requests, even if firewall rules permit them.
- Routes: requires local static routes whose next hop is the default internet gateway (the default route commonly satisfies this).
- Firewall: Cloud NGFW rules apply to VM NICs, not gateways. Egress rules are evaluated before NAT, ingress rules after NAT. No NAT-specific firewall rules are needed.
- With NAT64 and an egress deny rule for an IPv4 destination, also add an egress deny rule for the IPv4-embedded IPv6 address (for `1.2.3.4/32` in the `64:ff9b::/96` prefix this is `64:ff9b::102:304/128`) so NAT64 traffic cannot bypass the IPv4 rule.
- Multiple gateways in the same region of a VPC network are allowed if each serves a different source subnet, or a different range within one subnet.
- Multiple NICs: in the same VPC network, one gateway applies to all NICs; in different VPC networks, one gateway applies to a single NIC only. A NIC with an external IPv4 address is ineligible for Public NAT.
- Changing the network tier of automatically allocated addresses releases the addresses, retires port allocations, and immediately closes all existing connections on them.
- NAT traversal: with EIM enabled, compatible with STUN (RFC 5389) and TURN (RFC 5766) if you deploy your own servers.
- Bandwidth per VM is unchanged by Public NAT. Timeouts: see NAT timeouts at https://docs.cloud.google.com/nat/docs/tune-nat-configuration#nat-timeouts.
- NAT44 worked example in the source: gateway `nat-gw-us-east` with 64 minimum ports per VM and manual NAT IPs `192.0.2.50` and `192.0.2.60` reserves `192.0.2.50:34000`-`192.0.2.50:34063` for VM `10.240.0.4`, performs SNAT on egress and DNAT on the response.
- Snippets taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/routers/nats/create (gcloud 593.0.0 help); the page has no code. The full flag list is in the `gcp-compute` skill.
- A Public NAT gateway gives resources without external IPs outbound access to the internet; review egress firewall rules first. Changing the gateway (for example removing a NAT IP) can break established connections; try changes on a disposable gateway first.
- Corrected from the official docs: the source writes the IPv4-embedded address for `1.2.3.4` as `64:ff9b:0102:0304/128`, which has only four 16-bit groups and no `::`, so it is not a valid IPv6 address; the same page gives the NAT64 prefix as `64:ff9b::/96`, so `1.2.3.4` embedded in it is `64:ff9b::102:304`.
- Source: https://docs.cloud.google.com/nat/docs/public-nat (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [ports-and-addresses.md](./ports-and-addresses.md)
- [nat-rules-overview.md](./nat-rules-overview.md)
- [nat-product-interactions.md](./nat-product-interactions.md)
- [private-nat.md](./private-nat.md)
