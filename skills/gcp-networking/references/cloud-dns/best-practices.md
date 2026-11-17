---
source: https://docs.cloud.google.com/dns/docs/best-practices
---

# Best practices for Cloud DNS

Best practices for Cloud DNS private zones, DNS forwarding zones and server policies, and reference architectures for hybrid DNS between on-premises networks and Google Cloud.

## Signature / Usage

### Create a DNS server policy

Snippet taken from the `gcloud dns policies create` help EXAMPLES (see Notes). Creates a server policy with minimal arguments; inbound forwarding (the recommended way to resolve Google Cloud names from on-premises) is enabled with the `--enable-inbound-forwarding` flag documented in the same help.

```bash
gcloud dns policies create mypolicy \
    --description='My new policy test policy 5' --networks=''
```

## Options / Props

### Recommendations

| Topic | Guidance |
|---|---|
| Where to resolve | Recommended: two authoritative systems (Cloud DNS for Google Cloud, existing on-premises servers for on-premises). Alternatives: keep all resolution on-premises (higher latency, depends on connectivity) or move everything to Cloud DNS (needs reliable connection to the VPC network). |
| Naming | Prefer separate domains per environment (for example `corp.example.com` on-premises, `gcp.example.com` in Google Cloud). Avoid the same domain in both. |
| Shared VPC | Host private zones in the host project (or use cross-project binding); automate record creation; a service account with DNS Administrator in the host project can deploy approved changes. |
| IAM | Least privilege; avoid basic roles; use `dns.networks.bindPrivateDNSZone` to separate private from public zone creation. |
| On-premises lookups | Use a forwarding zone for the on-premises domain rather than an alternative name server (keeps Compute Engine internal DNS names and avoids an extra hop). Use alternative name servers only if all DNS traffic must be monitored or filtered on-premises and private DNS logging can't meet that. |
| Inbound from on-premises | Use an inbound server policy; prefer conditional forwarding (least complex), or NS delegation of a Google Cloud subdomain. Cloud DNS doesn't support zone transfers. |
| Multiple VPC networks | Designate one VPC network for outbound forwarding and use DNS peering zones from the others. Forwarding independently from several networks, or through VPC Network Peering, is unsupported. |
| DNS peering vs VPC Network Peering | Different services: VPC Network Peering doesn't change name resolution. DNS peering is unidirectional; setup needs `dns.networks.targetWithPeeringZone` on the producer network's project. |
| Auto-generated names | Peer `projectname.internal` zones to a hub project to expose them on-premises. |

### Firewalls and routing

- Cloud DNS sends queries from `35.199.192.0/19` using UDP or TCP port 53; allow this range on on-premises firewalls and DNS servers.
- In Cloud Router, add a custom advertised route for `35.199.192.0/19` to the on-premises environment.
- DNS forwarding can't be used between Google Cloud environments; use DNS peering.
- Cloud DNS doesn't sync or cache on-premises records beyond 60 seconds or the TTL, so on-premises servers must stay reachable.

### Reference architectures

| Architecture | Key steps |
|---|---|
| Single Shared VPC network | On-premises authoritative for `corp.example.com`; private zone `gcp.example.com` in the host project; inbound server policy; forwarding zone `corp.example.com` to on-premises; on-premises forwards `gcp.example.com` to an inbound forwarder IP; advertise `35.199.192.0/19`. |
| Multiple separate VPC networks | Private zones per environment (`prod.gcp.example.com`, `dev.gcp.example.com`); inbound policy and `corp.example.com` forwarding in production; DNS peering zones in both directions; on-premises delegates `gcp.example.com` to the inbound forwarding VIPs; advertise `35.199.192.0/19` from production. |
| Hub VPC network with spokes (VPC Network Peering) | Private zone per spoke; inbound policy and `corp.example.com` forwarding zone in the hub; peering zones hub to spokes (`projectX.gcp.example.com`) and spokes to hub (`example.com`); optionally peer `.internal` zones. With Cloud VPN instead of VPC Network Peering, keep a VM or tunnel in the hub in every spoke region. |

## Notes

- Multi-provider public DNS: an open source octoDNS-based solution (https://github.com/GoogleCloudPlatform/multi-provider-dns-with-clouddns) syncs zones to Cloud DNS in an active-active (recommended) or active-passive setup; for active-active you must update NS records at your registrar to include Cloud DNS name servers.
- Hybrid connectivity (Cloud VPN, Cloud Interconnect, Cloud Router) is covered in the other categories of this skill.
- Google Cloud DNS, not Cloudflare DNS.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/dns/policies/create (gcloud 593.0.0 help); the `$` prompt is removed. The page itself has no code. The help's second example also sets alternative name servers, which the page advises against unless all DNS traffic must be filtered on-premises, so it is not used here.
- Source: https://docs.cloud.google.com/dns/docs/best-practices (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [server-policies-overview.md](./server-policies-overview.md)
- [zones-overview.md](./zones-overview.md)
- [overview.md](./overview.md)
