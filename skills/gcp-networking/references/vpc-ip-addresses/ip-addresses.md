---
source: https://docs.cloud.google.com/vpc/docs/ip-addresses
---

# IP addresses

Categorization of IP addresses in Google Cloud: external vs. internal, private vs. public, regional vs. global, and ephemeral vs. static. Resources such as VM instances and load balancers use these addresses to talk to Google Cloud, on-premises and internet endpoints.

## Signature / Usage

### Reserve addresses (example)

The source page has no code. The example below is the first EXAMPLES block of the gcloud 593.0.0 help.

```bash
gcloud compute addresses create address-1 address-2 address-3 \
    --region=us-central1
```

## Options / Props

### Address labels

| Label | Meaning |
|-------|---------|
| External IP address | Publicly advertised, reachable by any internet host; must be publicly routable. IPv4 can be Google-provided or BYOIP; IPv6 can be Google-provided or BYOIP. IPv6 BYOIP addresses can only be used by forwarding rules for regional external passthrough Network Load Balancers or by subnets that can only host VMs. |
| Internal IP address | Not reachable from the internet, not publicly routable. Local to a VPC network, a VPC network connected by VPC Network Peering, or an on-premises network connected by Cloud VPN, Cloud Interconnect or a Router appliance. Internal IPv4 can be private IPv4 or privately used public IPv4; internal IPv6 addresses are unique within Google Cloud. |
| Private IP address | Cannot be routed on the internet. In Google Cloud only usable as internal addresses. ULAs (RFC 4193) are private IPv6 addresses used for internal IPv6 subnet ranges. |
| Public IP address | Internet routable. External IPv4 and IPv6 addresses are always public. Public IPv4 can also be used as internal addresses for a subnet primary or secondary range ("privately used public IP addresses"). |

### Internal addresses (always Premium Tier)

| Classification | Definition | Purpose |
|----------------|------------|---------|
| Regional internal IPv4 | Valid IPv4 range used as a subnet primary or secondary IPv4 range | Used as described in IPv4 subnet ranges |
| Regional internal IPv6 | Internal IPv6 range assigned to a subnet IPv6 range | Used as described in Internal IPv6 specifications |
| Global internal IPv4 | Private Service Connect endpoints for Google APIs; allocated ranges for private services access | See PSC endpoints for Google APIs and private services access |

### External addresses (some can be Standard Tier as well as Premium Tier)

| Classification | Definition | Used by |
|----------------|------------|---------|
| Regional external IPv4 (Premium and Standard Tier) | Each region has its own set of external IPs for zonal or regional resources; Google-provided or BYOIP | VM NICs (one-to-one NAT), external protocol forwarding, regional external passthrough Network Load Balancers, external proxy Network Load Balancers and external Application Load Balancers. Regional external IPv4 addresses are also used by Cloud NAT and Cloud VPN (Cloud VPN gateways are not supported in Standard Tier; see network-tiers-overview.md) |
| Regional external IPv6 (Premium and Standard Tier, Standard Tier is Preview) | External IPv6 range allocated to an IPv6 subnet range or a regional external passthrough Network Load Balancer; Google-provided or BYOIP | As described in External IPv6 specifications |
| Global external IPv4 (Premium Tier only) | Anycast external IPv4 for global load balancing; Google-provided or BYOIP | External proxy Network Load Balancers, external Application Load Balancers, global external passthrough Network Load Balancers |
| Global external IPv6 (Premium Tier only) | Anycast external IPv6 for global load balancing | Same as global external IPv4 |

## Notes

- Regional vs. global is a label that indicates how an address is used; associating an address with a regional resource such as a VM labels it regional.
- Ephemeral addresses do not persist beyond the life of the resource and are generally released when the resource is stopped or deleted. If you do not specify an address, an ephemeral one is assigned automatically. A static address stays assigned to your project until you release it.
- Custom ephemeral IP addresses can be specified for VM instances and forwarding rules; this is not supported for external IPv4 addresses or global IPv6 forwarding rules.
- HA VPN: you cannot assign a static IPv4 address manually to a gateway interface; Cloud VPN creates two regional external IPv4 addresses that stay assigned until the gateway is deleted.
- Cloud NAT: automatically allocated external IPv4 addresses appear as static, but are deleted if you delete the gateway or switch it to manual addresses.
- The list of Google Cloud external ranges is published at https://www.gstatic.com/ipranges/cloud.json.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/addresses/create (gcloud 593.0.0 help). The full flag list is in the `gcp-compute` skill.
- Corrected from the official docs: the source lists Cloud NAT and Cloud VPN in a separate sentence without a tier claim, and the Network Service Tiers page (https://docs.cloud.google.com/network-tiers/docs/overview, retrieved 2026-11-17) says Cloud VPN gateways are not supported in Standard Tier.
- Source inconsistency: global external IP addresses are Premium Tier only here, while the IP address type table of the Network Service Tiers page (https://docs.cloud.google.com/network-tiers/docs/overview, retrieved 2026-11-17) marks them as supported in Standard Tier (Preview); the same page also says "All global external IP addresses must use Premium Tier".
- Source: https://docs.cloud.google.com/vpc/docs/ip-addresses (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [reserve-static-internal-ip-address.md](./reserve-static-internal-ip-address.md)
- [bring-your-own-ip.md](./bring-your-own-ip.md)
- [network-tiers-overview.md](./network-tiers-overview.md)
- [alias-ip.md](./alias-ip.md)
