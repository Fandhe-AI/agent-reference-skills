---
source: https://docs.cloud.google.com/network-connectivity/docs/network-connectivity-center/concepts/ncc-gateway-overview
---

# NCC Gateway overview

NCC Gateway is a regional spoke type attached to an NCC hub that enables security for Cross-Cloud Network traffic, such as third-party Security Service Edge (SSE) inspection. NCC Gateway spokes connect directly to Cloud Interconnect VLAN attachments.

## Signature / Usage

```bash
gcloud network-connectivity spokes gateways create myspoke \
     --hub=my-hub --region us-central1 --group gateways \
     --capacity 10g --ip-range-reservations 10.1.0.0/23
```

## Options / Props

### Key terms

| Term | Meaning |
|---|---|
| Hybrid attachment | VLAN attachments associated with an NCC Gateway |
| Security service function | Service attached to the gateway (for user-to-application protection, an SSE service) |
| Workload VPC network | Regular or Shared VPC network configured as a spoke in the hub |
| Spoke groups | Group spokes into separate routing domains; a spoke belongs to one group |
| Hybrid inspection topology | Lets you add NCC Gateway spokes to a group to apply policies |
| Secure Access Connect | Connects third-party SSE products to NCC Gateway for security processing and secure internet egress |

### Use cases and traffic flows

| Item | Details |
|---|---|
| Google Cloud users | branch users to the internet, branch users to private applications, private applications to the internet. |
| Partner use cases | mobile users to the internet (traffic does not go through NCC Gateway), mobile users to private applications, branch users to partner applications, private applications to partner applications. |

### Processing capacity

| Example | Required processing capacity |
|---|---|
| Branch users to the internet, 1 Gbps full duplex | 2 Gbps |
| Branch users to private applications, 1 Gbps full duplex | 4 Gbps (each direction processed twice); two 1 Gbps VLAN attachments are needed to meet the Cloud Interconnect SLA |

### Limitations

| Limitations |
|---|
| Only Cloud Interconnect VLAN attachments; Cloud VPN tunnels and Router appliances aren't supported. |
| All regions' gateway spokes must be in the same `gateways` spoke group. Greenfield: the hub must use the preset hybrid inspection topology. Brownfield: existing star or full mesh topology can be used. |
| Only one service can be attached to a gateway at a time. |
| A Cloud Router must be linked to a gateway in the same region; only VLAN attachments created with such a Cloud Router are attached. |
| One NCC Gateway spoke per region per hub. Gateway spokes and hub must be in the same project. |
| Processing capacity must be specified at creation; it can be changed later. Assigned IP address ranges can't be changed (some ranges are reserved for SSE partners). |
| No traffic steering policy to bypass a subset of traffic. |
| A gateway advertised route needs an active SSE gateway to propagate to the hub route table. |
| If the same on-premises prefix is advertised to gateway spokes in more than one region, set one preferred region with a lower MED; equal MEDs can cause asymmetric routing and drop stateful sessions. |
| Gateway advertised routes use the standard best path selection mode; effective Andromeda priority is e.g. `65536` or `65537`. Static routes (priority 0-65535) take precedence for the same prefix, so to steer `0/0` through the gateway you may need to remove the system-generated default route; then create special routes for Google APIs and services or use Private Service Connect endpoints for global Google APIs. |
| Capacity: some partners might not support 100 Gbps; some regions support only 1 Gbps and 10 Gbps. |
| MTU: VLAN attachments associated with a gateway spoke can use an MTU of up to 1460 bytes. |

## Notes

- Key terms: Supported SSE products: Palo Alto Networks Prisma Access; Symantec Cloud SWG (Preview). Features: uptime SLA of 99.9%; regional deployment.
- Processing capacity: Capacity is the provisioned bandwidth of the gateway spoke; packets can pass through the gateway more than once per flow direction.
- Processing capacity: Gateway processing capacity is the sum of bandwidth required in each direction among all gateway NICs. VLAN attachment bandwidth is full-duplex; provision enough attachments even if those on one interconnect connection are down. If the SSE partner recommends more bandwidth, follow the partner.
- Health checks: Health status is a monitoring metric labeled healthy or unhealthy. When unhealthy, BGP sessions on the Cloud Router to the partner are shut down; the gateway re-establishes them on recovery. Alerts can be set on the metric.
- Route views: A hub route table view requires selecting a region (priorities include inter-region costs). Gateway spokes have their own route tables where you select a gateway interface and traffic direction.
- Removing the default route to send internet traffic through the gateway can break connectivity to Google APIs and services; try it on a disposable network first.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/network-connectivity/spokes/gateways/create (gcloud 593.0.0 help).
- Secure Access Connect realms are in the official Secure Access Connect docs.
- Source: https://docs.cloud.google.com/network-connectivity/docs/network-connectivity-center/concepts/ncc-gateway-overview (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [connectivity-topologies.md](./connectivity-topologies.md)
- [overview.md](./overview.md)
- [quotas.md](./quotas.md)
