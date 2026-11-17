---
source: https://docs.cloud.google.com/network-connectivity/docs/interconnect/concepts/cci-overview
---

# Cross-Cloud Interconnect overview

Cross-Cloud Interconnect gives high-bandwidth dedicated connectivity between Google Cloud and another cloud service provider (CSP): Google provisions a dedicated physical connection between the Google network and the other CSP's network, so you can peer your VPC network with your network in AWS, Azure, OCI or Alibaba Cloud.

## Signature / Usage

### Create a Cross-Cloud Interconnect connection

Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/interconnects/create (gcloud 593.0.0 help). The full flag list is in the `gcp-compute` skill.

```bash
gcloud compute interconnects create example-cc-interconnect \
    --interconnect-type=DEDICATED \
    --link-type=LINK_TYPE_ETHERNET_10G_LR \
    --location=example-zone1-1 --requested-link-count=1 \
    --remote-location=example-remote-location \
    --noc-contact-email=noc@example.com \
    --description="Example Cross-Cloud Interconnect"
```

## Options / Props

### Port capacity

| Provider | Size |
|---|---|
| AWS, OCI | 10 Gbps, 100 Gbps and 400 Gbps |
| Azure, Alibaba Cloud | 10 Gbps, 100 Gbps |

### Cross-Cloud Interconnect vs partner Cross-Cloud Interconnect for OCI

| Feature | Cross-Cloud Interconnect | Partner Cross-Cloud Interconnect for OCI |
|---|---|---|
| Tenancy | Fully owned by you; not shared across organizations | Google Cloud and OCI own ports; shared by multiple customers |
| Speeds | 10, 100, 400 Gbps | 1, 2, 5, 10, 20, 50 Gbps |
| Cost | Ports and attachments in both clouds plus data transfer out of Google Cloud | Google Cloud partner attachments and OCI virtual circuits; no data transfer fee |
| Support | Google supports up to the OCI demarcation | Google Cloud and OCI support end to end |

### Cross-Cloud Interconnect vs partner Cross-Cloud Interconnect for managed cloud partners

| Aspect | Cross-Cloud Interconnect | Partner Cross-Cloud Interconnect (managed cloud partners) |
|---|---|---|
| Providers | OCI, AWS, Azure, Alibaba | Providers like AWS |
| Physical provisioning, ports | Required | Not required |
| Increments | 10 Gbps or 100 Gbps | Pre-approved speeds from 1 Gbps to 100 Gbps |
| Provisioning time | 1-4 weeks | Minutes |
| Ordering | Must start from Google Cloud | Bidirectional |
| Resiliency | Configured manually | Built in |

### SLA topologies

| Level | Topology |
|---|---|
| Production critical, multi-region (99.99%) | Two pairs of connections, each pair in a different metro, using two different edge availability domains per metro |
| Production critical, single-region (99.99%) | Both Cloud Routers in the same region, connected to VLAN attachments in different edge availability domains |
| Production non-critical (99.9%) | Two connections (primary and redundant), each in a different edge availability domain of a metro |

## Notes

- Google supports the connection up to the point it reaches the other CSP's network and does not guarantee the other provider's uptime or open tickets on your behalf. With your permission Cloud Customer Care can talk to the other provider's support, but you must have a ticket open there.
- Setup: pick supported locations, buy primary and redundant Cross-Cloud Interconnect ports and matching ports at the remote provider, send the provider's authorization documentation to Google; Google then connects the ports and notifies you.
- Jumbo MTUs are configurable with any provider; check the remote cloud's own limits.
- Supports MACsec for Cloud Interconnect.
- Fixed port pricing (local vs remote connections) is available on request through your account team; regions offering it only for remote connections: `us-west1`, `us-east1`, `europe-west4`, `europe-north1`, `asia-east1`.
- Custom IP ranges: with AWS you must provide the IPv6 subnet allocated by AWS during attachment provisioning; with other providers you can use your own addresses or ones the provider configures.
- The SLA covers Google Cloud's infrastructure up to the handoff to the other provider and requires at least two edge availability domains.
- Site-to-site data transfer through Network Connectivity Center spokes is supported only in certain locations.
- Connections are available only in supported locations per provider (AWS, Azure, OCI, Alibaba Cloud pages).
- Source: https://docs.cloud.google.com/network-connectivity/docs/interconnect/concepts/cci-overview (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/interconnects/create (gcloud 593.0.0 help).

## Related

- [overview.md](./overview.md)
- [terminology.md](./terminology.md)
- [dedicated-overview.md](./dedicated-overview.md)
- [quotas.md](./quotas.md)
