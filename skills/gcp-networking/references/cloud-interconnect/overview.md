---
source: https://docs.cloud.google.com/network-connectivity/docs/interconnect/concepts/overview
---

# Cloud Interconnect overview

Cloud Interconnect provides low-latency, high-availability connections that let you reliably transfer data between your networks. Traffic does not traverse the public internet. This page covers the connection types, resiliency / SLA options, MTU, custom IP address ranges, GRE, encryption and traffic differentiation.

## Signature / Usage

### List available Cloud Interconnect locations

Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/interconnects/locations/list (gcloud 593.0.0 help). The full flag list for `gcloud compute interconnects ...` is in the `gcp-compute` skill.

```bash
gcloud compute interconnects locations list
```

## Options / Props

### Connection types

| Cloud Interconnect type | Description |
|---|---|
| Dedicated Interconnect | Direct physical connection between your on-premises network and the Google network. |
| Partner Interconnect | Connectivity through a supported service provider. |
| Cross-Cloud Interconnect | Direct physical connection between the Google network and another cloud service provider's network. |
| Partner Cross-Cloud Interconnect | Connectivity between another cloud and VPC networks through a supported service provider (managed cloud partners, OCI). |
| Cross-Site Interconnect | Connectivity between your on-premises network sites through direct physical connections to the Google network. |

### Resiliency and SLA options

| Option | Use | SLA |
|---|---|---|
| Critical production | Critical production workloads that need maximum resiliency | 99.99% uptime |
| Non-critical production | Non-critical production and development workloads | 99.9% uptime |
| No SLA | Connection group without an intended reliability level; avoid where extended downtime is undesirable | None |

### MTU

| Scope | Supported MTU |
|---|---|
| VLAN attachments (VPC to other networks) | 1,440, 1,460, 1,500 or 8,896 bytes |
| Cross-site networks (on-premises to on-premises) | 9,000 bytes |

### Custom IP address ranges

| Item | Requirement |
|---|---|
| APIs / permissions | Enable the Network Connectivity API; permission `networkconnectivity.internalRanges.create` (recommended role Compute Network Admin, `roles/compute.networkAdmin`) |
| IPv4 prefix length | `--candidate-customer-router-ip-address` and `--candidate-cloud-router-ip-address` must be `/29` or `/30`, in the same subnet; link-local IPv4 only `/29` |
| IPv6 prefix length | `--candidate-customer-router-ipv6-address` and `--candidate-cloud-router-ipv6-address` must be `/125` or `/126`, in the same subnet; link-local and ULA IPv6 not allowed |
| Address rules | No overlap with other ranges in the customer VPC; first and last addresses of a range cannot be used; ranges with private IPv4 addresses cannot be used with the two IPv4 candidate flags |
| Flags | `--candidate-subnets` cannot be combined with the two IPv4 candidate flags (it can be used for link-local IPv4 attachments with the IPv6 candidate flags) |
| IPv6 mixing | Google-owned and custom IPv6 addresses can share a Cloud Router, but not one VLAN attachment |
| Reuse | Custom ranges cannot be reused in the same VPC or any VPC connected through VPC spokes or VPC Network Peering |
| Unsupported IPv4 ranges | `0.0.0.0/8`, `10.0.0.0/8`, `100.64.0.0/10`, `127.0.0.0/8`, `172.16.0.0/12`, `192.0.0.0/24`, `192.0.2.0/24`, `192.88.99.0/24`, `192.168.0.0/16`, `198.18.0.0/15`, `198.51.100.0/24`, `203.0.113.0/24`, `224.0.0.0/4`, `240.0.0.0/4` |
| Unsupported IPv6 ranges | `::ffff:0:0/96`, `64:ff9b::/96`, `64:ff9b:1::/48`, `100::/64`, `2001:/32`, `2001:20::/28`, `2001:db8::/32`, `fe80::/10`, `2002::/16`, `3fff::/20`, `5f00::/16`, `fc00::/7`, `ff00::/8` |

## Notes

- Capacity: Partner Interconnect VLAN attachments support 50 Mbps to 50 Gbps (the available sizes depend on the partner and location). 100-Gbps connections can be requested at the locations listed in "All colocation facilities".
- Treat any MACsec or BGP MD5 authentication keys you configure as secrets: do not commit, share or print them.
- Cloud Interconnect does not encrypt traffic by default. Use MACsec for Cloud Interconnect between your router and Google's edge routers on supported circuits, or HA VPN over Cloud Interconnect (Dedicated and Partner Interconnect) for IPsec.
- By default any VPC network can use Cloud Interconnect; an organization policy restricts which networks can ("Restrict Cloud Interconnect usage").
- The on-premises and VPC IP address spaces must not overlap. Cloud Router shares routes dynamically; custom advertised routes are required for Private Google Access for on-premises hosts, Cloud DNS forwarding zones and alternative name server networks over Cloud Interconnect.
- Cloud VPN alone encrypts traffic with IPsec but traverses the public internet. Dedicated / Partner Interconnect, Direct Peering and Carrier Peering can reduce egress costs; Cloud VPN alone does not.
- GRE: supported (tested only with GRE version 0); you must create a firewall rule to allow GRE. Google Cloud support does not cover troubleshooting your overlay network.
- Application awareness (DSCP-based traffic classes with bandwidth-percentage or strict-priority policies) is supported on Dedicated Interconnect and Cross-Cloud Interconnect; contact your account team to enable it. It is unrelated to App Hub applications.
- Custom IP ranges: the customer is responsible for consents and for the accuracy of IP addresses provided to Google. Public ranges of other cloud providers require a letter of authorization on the provider's letterhead. For Layer 3 Partner Interconnect, the service provider configures the custom ranges.
- Before using Cloud Interconnect as a data transfer network between your sites, review Section 2 of the Google Cloud General Service Terms; alternatives are Cross-Site Interconnect, Network Connectivity Center and Router appliance.
- Network Topology shows VLAN attachments aggregated under their Cloud Interconnect connection.
- Source inconsistency: this page says Partner Interconnect supports "50-Mbps to 50-Gbps VLAN attachments" and that "The maximum supported attachment size is 50 Gbps", but the Cloud Interconnect quotas page (https://docs.cloud.google.com/network-connectivity/docs/interconnect/quotas, retrieved 2026-11-17) gives "Partner Interconnect, Cross-Site Interconnect: Capacities from 50 Mbps to 100 Gbps" as the maximum bandwidth per VLAN attachment. Check the capacities your partner offers in the location before planning attachments above 50 Gbps.
- Source: https://docs.cloud.google.com/network-connectivity/docs/interconnect/concepts/overview (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/interconnects/locations/list (gcloud 593.0.0 help).

## Related

- [terminology.md](./terminology.md)
- [dedicated-overview.md](./dedicated-overview.md)
- [partner-overview.md](./partner-overview.md)
- [cci-overview.md](./cci-overview.md)
- [best-practices.md](./best-practices.md)
- [quotas.md](./quotas.md)
