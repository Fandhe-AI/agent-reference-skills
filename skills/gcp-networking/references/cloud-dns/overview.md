---
source: https://docs.cloud.google.com/dns/docs/overview
---

# Cloud DNS overview

Cloud DNS is a high-performance, resilient, global Domain Name System (DNS) service that publishes your domain names to the global DNS. It offers public zones (visible to the internet) and private managed zones (visible only from the VPC networks you specify), inbound and outbound DNS forwarding, managed DNSSEC, DNS Armor threat detection, and DNS64.

## Signature / Usage

### Create a managed zone

Snippet taken from the `gcloud dns managed-zones create` help EXAMPLES (see Notes). Add `--visibility=private` and network flags for a private zone; the full flag list is in the generated gcloud reference.

```bash
gcloud dns managed-zones create my-zone --dns-name=my.zone.com. \
    --description="My zone!"
```

## Options / Props

### DNS forwarding methods

| DNS forwarding | Cloud DNS methods |
|---|---|
| Inbound | Create an inbound server policy so an on-premises DNS client or server can send DNS requests to Cloud DNS. They resolve records according to the VPC network's name resolution order, including private zones, forwarding zones, and peering zones the VPC network is authorized for. On-premises clients connect through Cloud VPN or Cloud Interconnect. |
| Outbound | VMs can send requests to name servers of your choosing (in the same VPC network, on-premises, or on the internet), resolve records on forwarding targets of an authorized forwarding zone, or use an outbound server policy to send all DNS requests to an alternative name server. With an alternative name server, VMs can no longer resolve Cloud DNS private zones, forwarding zones, peering zones, or Compute Engine internal DNS zones. |

- Inbound and outbound forwarding can be configured simultaneously on one VPC network (bi-directional forwarding).
- Cloud DNS does not support DNS forwarding for public zones; public zones must be authoritative.
- Outbound forwarded queries can return `SERVFAIL` if forwarding targets are unreachable or respond too slowly.
- Outbound endpoints (Preview) forward DNS queries by using private IP addresses from your VPC network.

### Access control

| Role | Grants |
|---|---|
| DNS Administrator (`roles/dns.admin`) | Make changes to DNS records; manage or view managed zones across all projects the user can access |
| DNS Reader (`roles/dns.reader`) | Read-only access to Cloud DNS records |
| Project Owner / Editor (`roles/owner` / `roles/editor`) | Manage or view managed zones in the specific project |

- To configure an IAM policy on a DNS resource such as a managed zone, you must have Owner access to the project that owns the resource. The DNS Administrator role does not have the `setIamPolicy` permission.
- IAM permissions apply at the project level and at the individual DNS zone level.

### DNS64

- Lets IPv6-only Compute Engine VMs reach IPv4 destinations. Cloud DNS synthesizes an `AAAA` record by combining the Well-Known Prefix `64:ff9b::/96` (RFC 6052) with the 32 bits of the IPv4 address (for example `32.34.50.60` becomes `64:ff9b::2022:323c`).
- If an `AAAA` record exists it is returned; DNS64 synthesizes one only when no `AAAA` exists but an `A` record does.
- Pair DNS64 with Public NAT (NAT64) in a Cloud NAT gateway for internet IPv4 destinations. Synthesis also works for on-premises records when DNS forwarding is enabled.

### Propagation and caching

- Cloud DNS uses anycast to serve managed zones from multiple locations.
- TTL (seconds) controls resolver caching; some resolvers ignore or override it. Lower the TTL before a planned change, then restore it afterwards.
- Many stub and recursive resolvers cache negative responses for up to 15 minutes (for example Windows, Java JVM, dnsmasq); query the authoritative name servers directly while waiting for propagation.

## Notes

- Shared VPC: to use a managed private zone, forwarding zone, or peering zone with Shared VPC, create the zone in the host project and add the Shared VPC networks to its authorized networks, or create it in a service project by using cross-project binding.
- Advanced threat detection (DNS Armor, powered by Infoblox) analyzes internet-bound DNS query logs for malicious patterns.
- A public managed zone publishes its records to the internet; use `--visibility=private` for names that must stay inside your VPC networks. Creating or deleting zones changes DNS resolution, so try changes on a disposable zone first.
- Google Cloud DNS, not Cloudflare DNS.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/dns/managed-zones/create (gcloud 593.0.0 help); the `$` prompt is removed. The full flag list is in the generated gcloud reference.
- Source: https://docs.cloud.google.com/dns/docs/overview (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [zones-overview.md](./zones-overview.md)
- [records-overview.md](./records-overview.md)
- [policies-overview.md](./policies-overview.md)
- [dnssec.md](./dnssec.md)
- [best-practices.md](./best-practices.md)
- [quotas.md](./quotas.md)
