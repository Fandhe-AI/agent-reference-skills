---
source: https://docs.cloud.google.com/dns/docs/zones/zones-overview
---

# DNS zones overview

Describes Cloud DNS zone types beyond plain public and private zones: forwarding zones, peering zones, managed reverse lookup zones, overlapping zones and split horizon DNS, cross-project binding, and zonal Cloud DNS zones.

## Signature / Usage

### Query a name through the VM's default name server

From a Compute Engine VM, `dig` queries the metadata server (`169.254.169.254`); a trailing dot is required for names outside your private zones.

```bash
dig myapp.example.com.
```

## Options / Props

### Forwarding targets

| Type | Target | Standard routing | Private routing | Request source |
|---|---|---|---|---|
| 1 | Internal IP of a VM or internal passthrough Network Load Balancer in the same authorized VPC network | RFC 1918 only, via VPC | Any internal IP except prohibited ranges, via VPC | `35.199.192.0/19` (or proxy-only subnet range with outbound endpoints, Preview) |
| 2 | On-premises IP via Cloud VPN / Cloud Interconnect | RFC 1918 only, via VPC | Any internal IP except prohibited ranges, via VPC | same as Type 1 |
| 3 | External IP of an internet-accessible DNS server or Google Cloud resource | Internet-routable external IPs | Not supported | Google Public DNS source ranges |
| 4 | FQDN resolving (IPv4 and IPv6) through the VPC resolution order | Routed per resolved address | Internal addresses only via VPC; not supported for external addresses | `35.199.192.0/19` and/or Google Public DNS ranges |

| Forwarding targets |
|---|
| Standard routing: RFC 1918 targets are Type 1 / 2 through the VPC network; others are Type 3 over the internet. Private routing always uses an authorized VPC network (Type 1 / 2 only). An FQDN that resolves to a public IP needs standard routing. |
| Type 1 uses subnet routes; Type 2 uses custom dynamic or static routes (not network-tag static routes). A Type 1 target cannot be a VM in another VPC network connected by VPC Network Peering or Cloud VPN; use a peering zone instead. |
| FQDN target: only one allowed, resolves to up to 50 IPs (extra truncated), no resolution through another forwarding zone, and not usable as an alternative name server in server policies. |
| Prohibited target IPs: `169.254.0.0/16`, `192.0.0.0/24`, `192.0.2.0/24`, `192.88.99.0/24`, `198.51.100.0/24`, `203.0.113.0/24`, `224.0.0.0/4`, `240.0.0.0/4`, `::1/128`, `::/128`, `2001:db8::/32`, `fe80::/10`, `fec0::/10`, `ff00::/8`. |
| Target selection ranks targets automatically (more successful responses, including `NXDOMAIN`, and lower round-trip time rank higher); with no reply Cloud DNS synthesizes `SERVFAIL`. |
| Forwarding zones need the VPC network authorized (same organization) and VMs using the metadata server `169.254.169.254`. Responses are cached for the shorter of 60 seconds or the TTL; if all targets are unreachable the cache is kept for each record's TTL. Transitive routing to targets is not supported. |

### Peering zones

| Peering zones |
|---|
| One-way: the DNS consumer network looks up the zone's namespace as if in the DNS producer network, following the producer's name resolution order (private zones, forwarding zones, internal DNS, alternative name server). |
| Both must be VPC networks; cross-organization peering is supported. DNS peering is separate from VPC Network Peering and does not need it. |
| Transitive DNS peering: a single transitive hop only (at most three VPC networks). |
| Peering to a forwarding zone with global dynamic routing disabled on the producer requires a VM, VLAN attachment, or Cloud VPN tunnel in the producer in the same region as the source VM. |

### Managed reverse lookup zones and overlapping zones

| Managed reverse lookup zones and overlapping zones |
|---|
| Custom PTR records for RFC 1918 addresses need a private zone at least as specific as `10.in-addr.arpa.`, `168.192.in-addr.arpa.`, or `16.172.in-addr.arpa.` through `31.172.in-addr.arpa.`; otherwise internal DNS PTR records override them. |
| Overlapping public zones are not allowed on the same name servers; a private zone can overlap any public zone; private zones for different VPC networks can overlap; two private zones authorized for the same VPC network cannot have identical origins. Longest suffix matching selects the zone, and `NXDOMAIN` is returned if the chosen private zone lacks the record even when a public zone has it. |
| Split horizon: a private and a public zone `gcp.example.com` give different answers inside the VPC network and from the internet (the private zone hides names that exist only in the public zone). |

### Zonal Cloud DNS support

| Resource or feature | Global | Zonal |
|---|---|---|
| Managed public zones | Yes | No |
| Managed private zones (VPC-scoped) | Yes | No |
| Managed private zones (GKE-scoped) | No | Yes |
| Forwarding zones (zonal: GKE cluster-scoped only) | Yes | Yes |
| Peering zones | Yes | No |
| Managed reverse lookup zones | Yes | No |
| Create changes or manage records (GKE controller overwrites changes on restart) | Yes | Yes |
| Service Directory zones | Yes | No |
| Policies | Yes | No |
| Response policies (network scoped / GKE cluster scoped) | Yes / No | No / Yes |
| Response policy rules | Yes | Yes |

## Notes

- Cross-project binding lets a service project own its zones while bound to the host project's Shared VPC network: no placeholder network, IAM at project level, any-to-any resolution, no transitive hop limit.
- Zonal Cloud DNS (GKE cluster scope) contains the failure domain to one Google Cloud zone; billing matches global zones.
- Google Cloud DNS, not Cloudflare DNS.
- Console and API steps are omitted; see the source page.
- Source: https://docs.cloud.google.com/dns/docs/zones/zones-overview (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [server-policies-overview.md](./server-policies-overview.md)
- [best-practices.md](./best-practices.md)
- [quotas.md](./quotas.md)
- [overview.md](./overview.md)
