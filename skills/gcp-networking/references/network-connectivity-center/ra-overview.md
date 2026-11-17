---
source: https://docs.cloud.google.com/network-connectivity/docs/network-connectivity-center/concepts/ra-overview
---

# Router appliance overview

Router appliance is an NCC feature that lets a third-party network virtual appliance on a Compute Engine VM exchange routes with Cloud Router over BGP. Router appliance requires NCC: instances must be attached as a Router appliance spoke to a hub.

## Signature / Usage

```bash
gcloud network-connectivity spokes linked-router-appliances \
    update my-spoke --region=us-central1 \
    --description="new spoke description"
```

## Options / Props

### How it works

- Install an image (from a supported NCC partner or a custom image) on a Compute Engine VM, then configure Cloud Router interfaces to establish BGP peering with it.
- Cloud Router uses interfaces with RFC 1918 internal IP addresses for the BGP peering.
- The instance can reach external sites by any VM mechanism: IPsec VPN tunnels (through a Cloud VPN gateway in the same VPC network) or Cloud Interconnect (Dedicated or Partner VLAN attachments to the VPC network).
- There are no separate APIs, resources or permissions for Router appliance; use Compute Engine and Cloud Router resources and permissions.

### Requirements

| Area | Requirement |
|---|---|
| Image | Must support BGP. |
| Attachment | Attach each router appliance instance as a spoke to an NCC hub. |
| Cloud Router | Create it in the same region as the subnet containing the instance's peering interface. |
| BGP | Manually create BGP interfaces (in the same subnet as the instance) and BGP sessions with Cloud Router on the appliance. |
| Multiple NICs | BGP sessions can be established with Cloud Routers in the same subnet as the VM interface. |
| Availability | Compute Engine VM SLA applies: 99.5% single VM, 99.99% VMs in multiple zones. For a pair of instances (one per on-premises location), run at least two VMs in different zones, each peering with a pair of redundant Cloud Router interfaces. |

### Data transfer use case

Two on-premises sites each connect to a router appliance instance in the nearest region, both in one VPC network. Both spokes enable site-to-site data transfer (only in supported locations). Each instance peers with the Cloud Router in its region, and the Cloud Routers exchange routes. The VPC network must use global dynamic routing mode for Cloud Routers in different regions to exchange routes.

### Considerations

- Shared VPC is supported only when the router appliance VM, hub, spoke and Cloud Router are all in the host project; not when the VM is in a service project.
- Multiple instances announcing the same prefixes with the same MED use ECMP across all of them.
- Do not advertise the same prefixes through a mix of spoke types (router appliance, Cloud VPN, VLAN attachments); ECMP across mixed types can unbalance traffic.
- If one Cloud Router learns a prefix with multiple next hops, it prefers the shortest AS path length, then MED.
- Cloud Router limits on the number of Cloud Routers per VPC network and region, and BGP peers per Cloud Router, also apply.

## Notes

- Router appliance spokes support IPv4 only (IPv4 site-to-cloud, site-to-site data transfer and VPC-to-VPC connectivity).
- The borrowed example only changes the spoke description; it does not change routing or attachments.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/network-connectivity/spokes/linked-router-appliances/update (gcloud 593.0.0 help).
- The full `gcloud compute` flag lists for the VMs and Cloud Routers are in the `gcp-compute` skill.
- Source: https://docs.cloud.google.com/network-connectivity/docs/network-connectivity-center/concepts/ra-overview (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [spoke-filters-overview.md](./spoke-filters-overview.md)
- [quotas.md](./quotas.md)
