---
source: https://docs.cloud.google.com/network-connectivity/docs/interconnect/quotas
---

# Quotas and limits (Cloud Interconnect)

Quotas have default values and usually can be adjusted; system limits are fixed. Quotas generally apply per Google Cloud project and are shared across all applications and IP addresses in it.

## Signature / Usage

### Check quota

Replace `PROJECT_ID` with your project ID.

```bash
gcloud compute project-info describe --project PROJECT_ID
```

Check used quota in a region (replace `example-region`).

```bash
gcloud compute regions describe example-region
```

## Options / Props

### Quotas (per project)

| Item | Notes |
|---|---|
| Cloud Interconnect connections (`compute.googleapis.com/interconnects`) | Dedicated Interconnect connections per project; not tied to regions or VPC networks |
| VLAN attachments (`interconnect_attachments_per_region`) | Per region per project, Dedicated and Partner combined; "VLAN attachments per Interconnect" also applies |
| VLAN attachments per Interconnect (`interconnect_attachments_per_interconnect`) | Attachments on one connection |
| VLAN attachments total Mbps (`interconnect_attachments_total_mbps`) | Maximum total bandwidth of all VLAN attachments in a region for a project, irrespective of connections; the Limits below also apply |
| Cross-site networks (`cross_site_networks`) | Per project |
| Wire groups (`wire_groups`) | Per project; "Wire groups per Interconnect" also applies |
| Wire groups per Interconnect (`wire_groups_per_interconnect`) | Per connection |
| Wire groups unmetered bandwidth per Interconnect metro pair (`wire_groups_gold_unmetered_bandwidth_gbps`) | Gbps between a metro pair, both directions; one quota per pair, dimension format `metro-a\|metro-b` |
| Cloud Routers (`routers`) | Per project across networks and regions; networks also have a per-region limit (see Cloud Router quotas and limits) |
| Transports (`networkconnectivity.googleapis.com/regional-per-project-transports`) | Partner Cross-Cloud Interconnect transports per project per region |
| Number of 500 Mbps transports (`regional-per-project-transports-500mbps`) | 500 Mbps transports per project per region |
| Transport bandwidth (`regional-per-project-transport-bandwidth`) | Bandwidth per transport per project per region |

### Limits (cannot be increased unless stated)

| Item | Limit |
|---|---|
| Physical circuits per connection | 8 x 10 Gbps (80 Gbps), 8 x 100 Gbps (800 Gbps) or 8 x 400 Gbps (3200 Gbps) |
| Bandwidth per VLAN attachment | Dedicated and Cross-Cloud: 50 Mbps to 400 Gbps; Partner and Cross-Site: 50 Mbps to 100 Gbps (partners may not offer all capacities) |
| Bandwidth per traffic flow on a VLAN attachment | 10 Gbps (identified by five-tuple hash for non-fragmented packets, three-tuple for fragmented packets and for Private Google Access for on-premises hosts); use multiple flows (for example 10+) within the attachment MTU to reach maximum throughput |
| Packet rate per traffic flow on a VLAN attachment | 1,000,000 pps |
| MTU | 1,440, 1,460, 1,500 or 8,896 bytes |
| Lifetime of a Partner Interconnect pairing key | 28 days between generation and provisioning by the provider; then delete and create a new key |
| Bandwidth per wire | 10 Gbps; can be increased through a support case, which requires confirming you will not exceed the per-flow wire limit |
| Bandwidth per traffic flow on a wire | 10 Gbps; with end-to-end MACsec a flow is a two-tuple hash (source and destination MAC), otherwise an eight-tuple hash |
| Cloud Router | All Cloud Router quotas and limits apply (learned and advertised route limits) |

### Required roles

| Task | Role |
|---|---|
| Check quotas | `roles/owner`, `roles/editor` or `roles/servicemanagement.quotaViewer` |
| Modify or request quota | `roles/owner`, `roles/editor`, `roles/servicemanagement.quotaAdmin` or a custom role with `serviceusage.quotas.update` |

## Notes

- Exceeding a quota with gcloud prints a `quota exceeded` error and exits with code `1`; via API Google Cloud returns HTTP `413 Request Entity Too Large`.
- Quota does not guarantee resource availability; a zonal or regional resource can still be unavailable.
- Request increases in the Google Cloud console (Quotas page); some quotas rise automatically with use.
- The source also shows a Console path for checking quota.
- Source: https://docs.cloud.google.com/network-connectivity/docs/interconnect/quotas (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [best-practices.md](./best-practices.md)
- [dedicated-overview.md](./dedicated-overview.md)
