---
source: https://docs.cloud.google.com/network-connectivity/docs/interconnect/concepts/partner-overview
---

# Partner Interconnect overview

Partner Interconnect connects your on-premises network to your VPC network through a supported service provider. It is useful when your data center cannot reach a Dedicated Interconnect colocation facility or your needs do not warrant a full 10-Gbps connection.

## Signature / Usage

### Group VLAN attachments for an intended SLA level

Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/interconnects/attachments/groups/create (gcloud 593.0.0 help). The source page itself has no commands; the full flag list for attachments is in the `gcp-compute` skill.

```bash
gcloud compute interconnects attachments groups create \
    example-attachment-group \
    --intended-availability-sla=PRODUCTION_NON_CRITICAL \
    --attachments=region-1/attachment-1,region-2/attachment-2
```

## Options / Props

### Layer 2 vs Layer 3

| Aspect | Layer 2 | Layer 3 |
|---|---|---|
| BGP | You configure and establish a BGP session between each Cloud Router and your on-premises router per VLAN attachment (details come from the attachment after the provider configures it) | The service provider establishes the BGP session with your Cloud Router; no BGP on your router (the provider may ask for BGP or a static default route to its network) |
| Pre-activation | No benefit | Supported: attachment passes traffic as soon as the provider configures it |

### Capacity and availability

| Item | Value |
|---|---|
| Port capacity requested by the provider | 1 x 10 Gbps up to 8 x 10 Gbps (80 Gbps); 1 x 100 Gbps up to 8 x 100 Gbps (800 Gbps) |
| 99.99% topology | At least four VLAN attachments across two metros, one in each edge availability domain; two Cloud Routers (one per region of a VPC network), one per pair of attachments; global routing enabled for the VPC network. Layer 2: four virtual circuits and four BGP sessions on the on-premises router (two per Cloud Router). Layer 3: four connections; provider sets up two BGP sessions with each Cloud Router. |
| 99.9% topology | Prescribed by "Establish 99.9% availability for Partner Interconnect" |
| IPv6 | Dual-stack VLAN attachments for Layer 2 and Layer 3; separate IPv4 and IPv6 BGP sessions are required (MP-BGP on one session is not supported) |

## Notes

- Partner Interconnect requires services from a third-party provider; Google is not responsible for the provider's side or issues outside Google's network. The Google SLA covers only connectivity between the VPC network and the provider's network. An end-to-end SLA depends on the provider.
- Pre-activation: after the provider configures an attachment it cannot pass traffic until you activate it, which lets you verify the provider. Do not pre-activate if you want to verify who you connect to.
- Encrypted VLAN attachments do not support IPv6 dual-stack sessions.
- Limitation: over a Layer 3 connection MED values cannot be sent or learned, so route priorities cannot be set for routes advertised by Cloud Router or by your router.
- Multiple providers: build redundant connections for each provider in each metro.
- ECMP requires equal-cost announcements (same CIDR and MED); egress is balanced by attachment capacity.
- Custom IP ranges: Layer 2 requires them at VLAN creation (IPv6 can be added on upgrade from `IPV4_ONLY` to `IPV4_IPV6`); for Layer 3 the provider configures them.
- Use the same MTU for all VLAN attachments of a VPC network and set the VPC MTU to the same value.
- By default any VPC network can use Cloud Interconnect; an organization policy can restrict it.
- Source: https://docs.cloud.google.com/network-connectivity/docs/interconnect/concepts/partner-overview (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/interconnects/attachments/groups/create (gcloud 593.0.0 help).

## Related

- [overview.md](./overview.md)
- [terminology.md](./terminology.md)
- [dedicated-overview.md](./dedicated-overview.md)
- [best-practices.md](./best-practices.md)
