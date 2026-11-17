---
source: https://docs.cloud.google.com/dns/docs/server-policies-overview
---

# DNS server policies

A DNS server policy controls which DNS servers are used when resolving names for resources in a VPC network. A policy enables inbound DNS forwarding, outbound DNS forwarding, or both. An inbound policy permits inbound forwarding; an outbound policy is one way to implement outbound forwarding.

## Signature / Usage

### Create a policy with inbound forwarding and alternative name servers

Snippet taken from the `gcloud dns policies create` help EXAMPLES (see Notes). `--enable-inbound-forwarding` creates an inbound policy; `--alternative-name-servers` makes it an outbound policy.

```bash
gcloud dns policies create mypolicy \
    --description='My new policy test policy 5' \
    --networks=network1,network2 \
    --alternative-name-servers=192.168.1.1,192.168.1.2 \
    --enable-inbound-forwarding --enable-logging \
    --enable-dns64-all-queries
```

## Options / Props

### Inbound server policies

- When a VM uses its metadata server `169.254.169.254` as name server, resolution follows the VPC network name resolution order.
- Cloud DNS creates inbound server policy entry points: internal IPv4 addresses from the primary IPv4 range of every subnet in the VPC network, except subnets with specific `--purpose` (for example proxy-only subnets, Cloud NAT Private NAT subnets). Three subnets means three entry points.
- Not supported on legacy networks; IPv6-only subnets don't support inbound server policies (outbound is supported).
- The associated network of a query is the VPC network containing the Cloud VPN tunnel, VLAN attachment, or Router appliance interface that receives the packets; the associated region is always the region of that tunnel, attachment, or appliance, not the subnet region of the entry point. This matters for geolocation routing policies.
- Entry point IPs are not reachable across VPC Network Peering or Network Connectivity Center boundaries: create the inbound policy in the VPC network that receives the hybrid connection, and use a DNS peering zone to resolve records in a peered network.
- If on-premises queries arrive over VPC Network Peering, the network with the inbound policy must contain a VM, VLAN attachment, or Cloud VPN tunnel in the same region as the incoming queries.
- Cloud Routers advertise entry point IPs in default advertisement mode; in custom mode advertise subnet ranges or include the entry point IPs in custom prefixes.

### Outbound server policies

Alternative name servers replace the VPC name resolution order: all queries go to them unless matched by a GKE cluster-scoped response policy or private zone. Using them disables many Cloud DNS features (private zones, forwarding zones, peering zones, Compute Engine internal DNS) and can affect public queries.

| Type | Standard routing | Private routing | Query source |
|---|---|---|---|
| Type 1: internal IP of a VM in the same VPC network as the policy | RFC 1918 only, via VPC | Any internal IP except prohibited ranges, via VPC | `35.199.192.0/19` (or proxy-only subnet range with outbound endpoints, Preview) |
| Type 2: on-premises IP via Cloud VPN / Cloud Interconnect | RFC 1918 only, via VPC | Any internal IP except prohibited ranges, via VPC | `35.199.192.0/19` (or proxy-only subnet range with outbound endpoints, Preview) |
| Type 3: external IP reachable on the internet | Internet-routable external IPs | Not supported | Google Public DNS source ranges |

- Standard routing: RFC 1918 target is Type 1 or 2 (private); non-RFC 1918 is Type 3 (public). Private routing: always through an authorized VPC network (Type 1 or 2 only).
- A Type 1 name server cannot be in a VPC network connected to the policy's network (peering or VPN).
- Prohibited IPs: `169.254.0.0/16`, `192.0.0.0/24`, `192.0.2.0/24`, `192.88.99.0/24`, `198.51.100.0/24`, `203.0.113.0/24`, `224.0.0.0/4`, `240.0.0.0/4`, `::1/128`, `::/128`, `2001:db8::/32`, `fe80::/10`, `fec0::/10`, `ff00::/8`.

### Network requirements

| Type | Requirements |
|---|---|
| Type 1 | Ingress allow firewall rule (VPC firewall rule or firewall policy) targeting the name server VMs, source `35.199.192.0/19`, protocols TCP and UDP, port 53. No policy-based routes whose destinations include the name server IPs. Responses must come from the queried IP; Cloud DNS ignores responses from other source IPs. Replies use a special routing path. |
| Type 2 | Routes in the policy's VPC network: static routes (except network-tag-scoped) or dynamic routes. Allow TCP and UDP port 53 from `35.199.192.0/19`. On-premises must route `35.199.192.0/19` back via Cloud VPN / VLAN attachment / Cloud Router in the same VPC network and region as the query (custom advertisement mode prefix or static route); next hops on the internet, in another VPC network, or in another region don't work. |
| Type 3 | Public routing; firewall must permit the Google Public DNS source ranges. |

## Notes

- Inbound entry points depend on subnet ranges; read the VPC network name resolution order before enabling alternative name servers because they disable many Cloud DNS features.
- FQDN targets cannot be used as alternative name servers in server policies.
- Deleting or changing a policy can break DNS resolution for the VPC network; try it on a disposable network first.
- Google Cloud DNS, not Cloudflare DNS.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/dns/policies/create (gcloud 593.0.0 help); the `$` prompt is removed. Full flag list is in the generated gcloud reference.
- Source: https://docs.cloud.google.com/dns/docs/server-policies-overview (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [policies-overview.md](./policies-overview.md)
- [zones-overview.md](./zones-overview.md)
- [best-practices.md](./best-practices.md)
