---
source: https://docs.cloud.google.com/network-connectivity/docs/how-to/choose-product
---

# Choosing a Network Connectivity product

Overview of Google's external connectivity options: connecting non-Google Cloud networks to Google Cloud (Cloud VPN, Cloud Interconnect, Cloud Router), connecting on-premises sites to each other (Cross-Site Interconnect, Network Connectivity Center hub, Router appliance), connecting only to Google Workspace and supported Google APIs (Verified Peering Provider, Direct Peering, Carrier Peering), and connecting to CDN providers (CDN Interconnect).

## Signature / Usage

The source page is a comparison guide and has no code. One of the options it compares is the Network Connectivity Center hub (see "Connecting sites"); the hub is the resource that spokes attach to. Creating a hub:

```bash
gcloud network-connectivity hubs create my-hub \
    --description="optional description"
```

## Options / Props

### Connecting to Google Cloud

| Product | Use when |
|---|---|
| Cloud VPN (HA VPN) | Lower cost, lower bandwidth, or experimenting with migrating workloads. IPsec connection to a VPC network. |
| Dedicated Interconnect | Enterprise-grade, higher throughput; direct connection to Google. |
| Partner Interconnect | Cannot physically meet Google in a colocation facility; connect through a service provider. |
| Cross-Cloud Interconnect | Connect to another cloud provider (AWS, Microsoft Azure, Oracle Cloud Infrastructure, Alibaba Cloud). |
| Cloud Router | BGP dynamic routing for Cloud Interconnect, Cloud VPN and Router appliances; also manages Cloud NAT gateways. |

Google recommends Cloud Interconnect instead of Direct Peering, Carrier Peering and Verified Peering Provider, which are used only in certain circumstances.

### HA VPN

| Item | Value |
|---|---|
| Availability SLA | 99.99% or 99.9%, depending on topology and configuration |
| Interfaces | Two external IP addresses chosen automatically, one per interface, each from a unique address pool |
| One active interface only | Supported, but does not provide an availability SLA |
| Forwarding rules | Not needed for HA VPN gateways |
| Internal IPs on interfaces | Only for HA VPN over Cloud Interconnect (gateways associated with VLAN attachments) |
| Peer description | External VPN gateway resource |

### Dedicated Interconnect vs Partner Interconnect

| Aspect | Dedicated Interconnect | Partner Interconnect |
|---|---|---|
| Circuits | 10-Gbps, 100-Gbps or 400-Gbps; max 8 circuits per connection | Via a supported service provider |
| VLAN attachment capacity | 50 Mbps to 50 Gbps | 50 Mbps to 50 Gbps |
| Setup | Routing equipment in a colocation facility | Any supported service provider |
| Routing | You configure BGP on on-premises routers and Cloud Routers | Layer 2: you configure BGP. Layer 3: Cloud Router configuration fully automated |
| Encryption | HA VPN over Cloud Interconnect | HA VPN over Cloud Interconnect (required for compliance with third-party providers) |
| SLA | End-to-end SLA for Google-defined topologies | SLA between Google and the provider; provider may offer end-to-end |

Cross-Cloud Interconnect: to satisfy the Cloud Interconnect SLA, buy two connections (primary and redundant) per provider; use a separate pair for each additional provider.

### Reaching Google Workspace and Google APIs only

| Option | Notes |
|---|---|
| Verified Peering Provider | Reach public Google resources through an ISP; badge tiers silver (PoP redundancy) and gold (metro redundancy). Does not require Google Cloud. Routes do not appear in any VPC network. |
| Direct Peering | Peering at a Google edge location; more than 100 locations in 33 countries. No SLA. Does not give direct access to VPC resources with only internal IPs. |
| Carrier Peering | Peering through a service provider. No Google SLA. Creates no custom routes in a VPC network. |

Cloud Interconnect does not provide access to Google Workspace; it provides access to all other Google Cloud products and to supported APIs via Private Google Access from on-premises hosts.

### Connecting sites

| Product | Notes |
|---|---|
| Cross-Site Interconnect (Preview) | Layer 2 connectivity between on-premises sites using a cross-site network with wire groups (single-wire, redundant or box-and-cross). Not visible to VPC networks. |
| Network Connectivity Center | Hub-and-spoke WAN over Google's network; on-premises networks connect through spokes. |
| Router appliance | Peer a third-party VM appliance with Cloud Router; attached to a hub through a Router appliance spoke. |

### CDN Interconnect

Direct peering links between selected third-party CDN providers and Google's edge network. No configuration or Cloud Load Balancing integration is required; if the provider is already in the program, traffic uses the direct connection automatically.

## Notes

- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/network-connectivity/hubs/create (gcloud 593.0.0 help).
- Pricing, quotas, SLA and release notes are on the Network Connectivity resources page; prices are not copied here.
- Cross-Site Interconnect is Preview. Classic VPN is not covered here; HA VPN is the current Cloud VPN gateway type (see "Moving to HA VPN from Classic VPN" in the official docs).
- Cloud VPN, Cloud Interconnect and Cloud Router are their own topics; the full `gcloud compute` flag lists are in the `gcp-compute` skill.
- Source inconsistency: this page gives VLAN attachment capacities of "50 Mbps to 50 Gbps" for Dedicated Interconnect and Partner Interconnect, but the Cloud Interconnect quotas page (https://docs.cloud.google.com/network-connectivity/docs/interconnect/quotas, retrieved 2026-11-17) says "Dedicated Interconnect, Cross-Cloud Interconnect: Capacities from 50 Mbps to 400 Gbps" and "Partner Interconnect, Cross-Site Interconnect: Capacities from 50 Mbps to 100 Gbps", while the Cloud Interconnect overview (https://docs.cloud.google.com/network-connectivity/docs/interconnect/concepts/overview, retrieved 2026-11-17) says "The maximum supported attachment size is 50 Gbps".
- Source: https://docs.cloud.google.com/network-connectivity/docs/how-to/choose-product (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [ra-overview.md](./ra-overview.md)
