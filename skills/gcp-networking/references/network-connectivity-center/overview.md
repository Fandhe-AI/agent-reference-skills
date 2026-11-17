---
source: https://docs.cloud.google.com/network-connectivity/docs/network-connectivity-center/concepts/overview
---

# NCC overview

Network Connectivity Center (NCC) is an orchestration framework that simplifies connectivity among spoke resources attached to a central management resource called a hub. Spoke types: VPC spokes, producer VPC spokes, NCC Gateway spokes and hybrid spokes.

## Signature / Usage

```bash
gcloud network-connectivity hubs list-spokes HUB \
--spoke-locations=us-central1,global
```

## Options / Props

### Hubs and spokes

| Concept | Description |
|---|---|
| Hub | Global resource to which spokes are attached; a hub can contain spokes from multiple regions. If any spoke uses site-to-site data transfer, the resources of those spokes must all be in the same VPC network. |
| Spoke | One or more Google Cloud network resources (the backing resource) connected to a hub; must be associated with at least one supported backing resource. |
| VPC spoke | Connects VPC networks (same or different project, including another organization) so they exchange subnet routes. Exports subnet routes to the hub; imports subnet routes and dynamic routes from the hub. Can export IPv4 only, IPv4 and IPv6, or IPv6 only. |
| Producer VPC spoke | Makes a service consumed through VPC Network Peering from a producer network in another project reachable by other spokes of the hub. |
| NCC Gateway spoke | Regional spoke that enables security for Cross-Cloud Network traffic and third-party Security Service Edge (SSE) inspection. |
| Hybrid spoke | Router appliance VMs, HA VPN tunnels, or Cloud Interconnect VLAN attachments (Dedicated, Partner, Cross-Cloud Interconnect, Partner Cross-Cloud Interconnect for OCI / AWS). Must be in the same project as the hub. |

A single hybrid spoke can reference several resources of the same type (for example two or more HA VPN tunnels) but cannot mix Router appliance VMs, VPN tunnels and VLAN attachments.

### Use cases per hybrid spoke type

| Spoke | Use cases |
|---|---|
| Router appliance | IPv4 site-to-cloud; IPv4 site-to-site data transfer; IPv4 connectivity between VPC networks via a third-party network virtual appliance |
| HA VPN tunnel | IPv4 and IPv6 (Preview) site-to-cloud; IPv4 and IPv6 (Preview) site-to-site data transfer |
| Cloud Interconnect VLAN attachment | IPv4 and IPv6 (Preview) site-to-cloud; IPv4 and IPv6 (Preview) site-to-site data transfer |

All backing resources of site-to-site spokes connected to one hub must be in the same VPC network.

### Route exchange and spoke filters

- Export filters control which routes a spoke sends to the hub. VPC spokes export IPv4 and IPv6 subnet ranges; hybrid spokes export IPv4 and IPv6 (Preview) dynamic routes, except Router appliance spokes (IPv4 only).
- VPC spokes import all routes from their spoke group. Hybrid spokes control imports with import filters.

### Routing considerations

| Item | Behavior |
|---|---|
| Prioritization | All hybrid spoke resources use Cloud Routers; see Cloud Router "Learned routes". Routes installed by NCC hybrid spokes are treated as dynamic routes. |
| ASN | All non-Google peering routers associated with a single spoke must use the same ASN when advertising prefixes to the Cloud Router. Different spokes must have different ASNs. Site-to-site data transfer has additional ASN requirements. |
| BGP sessions | BGP communities aren't supported. |

### Support for other products

- VPC spokes can export local subnet routes, import subnet routes from other VPC spokes and import dynamic routes from hybrid spokes. They do not export policy-based routes, peering subnet routes, static routes or dynamic routes.
- Shared VPC networks can be VPC spokes; the hub can be in any project. Recommended role for service project administrators: Spoke Admin (`roles/networkconnectivity.spokeAdmin`). Private Service Connect global Google API endpoints in an attached Shared VPC host or service project are propagated (Preview).
- Spoke resources can't be part of a legacy network. Classic VPN tunnels aren't supported.

## Notes

- Adding a VLAN attachment or Cloud VPN tunnel to a hybrid spoke with site-to-site data transfer enabled makes NCC update its BGP session to re-advertise prefixes learned by the other such spokes of the hub.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/network-connectivity/hubs/list-spokes (gcloud 593.0.0 help).
- Pricing and SLA are on the NCC pricing and SLA pages (not copied).
- Corrected from the official docs: the source writes the role as `networkconnectivity.googleapis.com/spokeAdmin`, which is not an IAM role ID; the IAM roles reference (https://docs.cloud.google.com/iam/docs/roles-permissions/networkconnectivity, retrieved 2026-11-17) lists it as `roles/networkconnectivity.spokeAdmin`.
- Source: https://docs.cloud.google.com/network-connectivity/docs/network-connectivity-center/concepts/overview (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [vpc-spokes-overview.md](./vpc-spokes-overview.md)
- [connectivity-topologies.md](./connectivity-topologies.md)
- [dynamic-route-exchange-with-vpc-spokes.md](./dynamic-route-exchange-with-vpc-spokes.md)
- [spoke-filters-overview.md](./spoke-filters-overview.md)
- [ra-overview.md](./ra-overview.md)
- [ncc-gateway-overview.md](./ncc-gateway-overview.md)
- [quotas.md](./quotas.md)
- [choose-product.md](./choose-product.md)
