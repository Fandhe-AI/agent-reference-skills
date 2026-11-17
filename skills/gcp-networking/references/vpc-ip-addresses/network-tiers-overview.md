---
source: https://docs.cloud.google.com/network-tiers/docs/overview
---

# Network Service Tiers overview

Network Service Tiers optimizes connectivity between internet systems and Google Cloud instances. Premium Tier carries traffic on Google's premium backbone (performance); Standard Tier uses regular ISP networks (cost).

## Signature / Usage

The source page has no code. The example below is from the gcloud 593.0.0 help EXAMPLES for reserving addresses; the source says a tier is set when creating the IP address and forwarding rule (see "Using Network Service Tiers" on the official site).

```bash
gcloud compute addresses create address-1 address-2 address-3 \
    --region=us-central1
```

## Options / Props

### Tiers compared

| | Premium Tier | Standard Tier |
|---|---|---|
| Routing | Within Google's network to reach users | Peering, ISP or transit networks |
| Networking features | All Google Cloud networking features | Foundational set including Cloud NAT, regional external Application Load Balancer, regional external passthrough Network Load Balancer |
| SLA (VMs) | 99.99% uptime | 99.9% uptime |
| Use case | Performance optimized, global network and services | Cost optimized, regional network and services |

### External IP type by tier

| Address type | Premium | Standard |
|---|---|---|
| Global external IPv4 and IPv6 | Supported | Supported (Preview) |
| Regional external IPv4 | Supported | Supported with eligible resources |
| Regional external IPv6 | Supported | Supported (Preview) |

### Resource support

| Resource | Premium | Standard |
|---|---|---|
| Global external Application Load Balancer, global external proxy Network Load Balancer | Yes, global external IP | No |
| Classic Application Load Balancer, classic proxy Network Load Balancer | Yes, global external IP | Yes, regional external IP |
| Regional external Application Load Balancer, regional external proxy Network Load Balancer, regional external passthrough Network Load Balancer | Yes, regional external IP | Yes, regional external IP |
| VM instances including GKE node VMs | Yes, regional external IP | Yes, regional external IP |
| Cloud VPN gateways | Yes, regional external IP | No |
| Cloud NAT gateways | Yes, regional external IP | Yes, regional external IP |
| Global external passthrough Network Load Balancer | Supported | Not available |
| Internal Application, internal proxy and internal passthrough Network Load Balancers | Supported | Not available |
| Cloud CDN | Always Premium | Not available |
| Cloud Storage | Default | Only as a backend bucket of an external Application Load Balancer, same region as the forwarding rule; multi-regional buckets require Premium |

### Choosing and changing a tier

| Rule |
|------|
| Tier can be set at project level (default Premium) and at resource level (forwarding rule, VM or instance template); resource level takes precedence. |
| All global external IP addresses must use Premium Tier. |
| Premium and Standard use separate IP pools: changing an instance's tier changes its ephemeral IP; an IP cannot move between pools; Standard IPs cannot move to another region. |
| Standard Tier for classic Application / proxy Network Load Balancers needs a Standard Tier regional IP and regional forwarding rule, and backends only in that region. Once a regional IP is Standard it cannot be updated to Premium; reserve a new Premium IP. |
| Changing a regional external passthrough Network Load Balancer tier means deleting its forwarding rule and creating a new one pointing at the existing target pool, with an IP of the matching tier. |
| Standard to Premium for a classic load balancer: create a new forwarding rule with a Premium IP, migrate traffic with DNS, then release the Standard IPs and regional load balancers. |
| Premium Tier cannot be used as a backup for Standard Tier during an outage. Moving more than 5 Gbps from Standard to Premium independent of an outage requires contacting your account manager. |

## Notes

- Standard Tier includes a Free Tier of 200 GB of Standard Tier usage per month per region across all projects, per SKU. Pricing is not copied here (https://cloud.google.com/network-tiers/pricing).
- Standard Tier traffic might be routed as Premium Tier in rare circumstances (for example no peering or transit networks in the closest PoPs). Premium has over 200 points of presence.
- A regional IP address is reachable from anywhere on the internet; the tier only affects the path.
- Internal VM-to-VM traffic always uses Premium infrastructure, with standard VM-VM egress pricing; Standard Tier applies to internet-facing external IPs only.
- Deleting a forwarding rule or IP to change tier interrupts traffic; try it on a disposable load balancer first. Load balancers themselves are covered by the `gcp-load-balancing` skill.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/addresses/create (gcloud 593.0.0 help). The example does not set a tier; `gcloud compute addresses create` and `gcloud compute forwarding-rules create` take `--network-tier=NETWORK_TIER` (see the help SYNOPSIS). The full flag list is in the `gcp-compute` skill.
- Source inconsistency: the IP address type table marks "Global external IPv4 and IPv6 addresses" as supported in Standard Tier (Preview), but the same page says "All global external IP addresses must use Premium Tier", and the VPC IP addresses page (https://docs.cloud.google.com/vpc/docs/ip-addresses, retrieved 2026-11-17) says global external IPv4 and IPv6 addresses "always use Premium Tier". The resource support table (global external Application Load Balancer not supported in Standard Tier) agrees with Premium Tier only.
- Source: https://docs.cloud.google.com/network-tiers/docs/overview (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [ip-addresses.md](./ip-addresses.md)
- [bring-your-own-ip.md](./bring-your-own-ip.md)
