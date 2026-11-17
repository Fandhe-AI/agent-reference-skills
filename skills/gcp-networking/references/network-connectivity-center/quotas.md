---
source: https://docs.cloud.google.com/network-connectivity/docs/network-connectivity-center/quotas
---

# Quotas and limits (Network Connectivity Center)

Quotas and system limits for NCC and Router appliance. Quotas apply per project and can be changed; system limits can't. Quotas for Cloud Router network routes also apply to routes for NCC hubs and spokes and to Router appliance spokes.

## Signature / Usage

Adapted (not in the official docs): the source shows `gcloud compute project-info describe` (and `gcloud compute regions describe`), which return Compute Engine project and region quotas, not Network Connectivity Center quotas; this lists the quotas of `networkconnectivity.googleapis.com` with Cloud Quotas instead.

```bash
gcloud quotas info list --service=networkconnectivity.googleapis.com --project=PROJECT_ID
```

Replace `PROJECT_ID` with your project ID.

## Options / Props

### NCC quotas

| Item | Scope / notes |
|---|---|
| Hubs per project | Per project, global |
| Cloud VPN tunnel spokes per project per region | Only HA VPN tunnels are supported |
| Cloud Interconnect VLAN attachment spokes per project per region | Per project in each region |
| Router appliance spokes per project per region | Per project in each region |
| VPC spokes per project | Includes edge and center spokes even if not connected to any hub |
| Active VPC spokes per hub | Only spokes accepted into a hub (not pending or rejected) |
| Subnet routes per hub route table | Only hubs with VPC spokes |
| Dynamic routes per hub | Applicable to all VPC spokes |
| Routing VPC networks per hub | |
| Static routes with an internal passthrough Network Load Balancer IP as next hop per hub | Per project, global |
| Private Service Connect endpoints for global Google APIs propagated to VPC spokes of a hub (Preview) | Each propagated endpoint counts once regardless of spoke count; per project, per hub, per route table, global |
| Unique gateway edge dynamic route prefixes per group per region | 1000 (per group, per region) |
| Gateway spokes per hub per region | Per hub, per region |
| Gateway advertised routes on a single gateway | 10 (per gateway) |
| Private Service Connect forwarding rules per hub | Applicable to all VPC spokes |

### NCC limits (system limits)

| Item | Value |
|---|---|
| VPN tunnels linked to a spoke | 8 |
| VLAN attachments linked to a spoke | 6 |
| Router appliance instances linked to a spoke | 8 |
| Active VPC spokes per hub | 250 |
| VPC spokes (active and inactive) per hub | 1,000 |
| Include or exclude export CIDR ranges per VPC or producer VPC spoke | 16 |
| Include or exclude export or import CIDR ranges per hybrid spoke | 32 |

### Required roles

| Task | Required role |
|---|---|
| Check quotas for a project | `roles/owner`, `roles/editor` or `roles/servicemanagement.quotaViewer` |
| Modify or request additional quota | `roles/owner`, `roles/editor`, `roles/servicemanagement.quotaAdmin`, or a custom role with `serviceusage.quotas.update` |

## Notes

- NCC limits (system limits): Router appliance also inherits the Cloud Router limits on Cloud Routers per VPC network and region, and BGP peers per Cloud Router in a VPC network and region.
- Exceeding a quota with `gcloud` prints a `quota exceeded` error and exits with code `1`; an API request returns HTTP `413 Request Entity Too Large`.
- Quotas don't guarantee resource availability.
- Most quotas are adjusted in the Google Cloud console (Quotas page) via a quota adjustment request.
- The source also shows Console steps and links each quota to its Console Quotas page; the page itself does not list default quota values.
- Source inconsistency: the spoke filters overview (https://docs.cloud.google.com/network-connectivity/docs/network-connectivity-center/concepts/spoke-filters-overview, retrieved 2026-11-17) says each of the include and exclude export and import range lists supports up to 16 CIDRs without distinguishing spoke types, while this quota is 32 CIDR ranges per hybrid spoke (16 per VPC or producer VPC spoke).
- Corrected from the official docs: the source checks quotas with `gcloud compute project-info describe --project PROJECT_ID` and `gcloud compute regions describe example-region`; those commands describe the Compute Engine project and region, so they don't show Network Connectivity Center quotas. The example uses `gcloud quotas info list --service=networkconnectivity.googleapis.com` instead (gcloud 593.0.0 help: "list QuotaInfos of all quotas for a given project, folder or organization", `--service` is "Name of the service in which the quota is defined"). Snippet adapted from https://docs.cloud.google.com/sdk/gcloud/reference/quotas/info/list.
- Source: https://docs.cloud.google.com/network-connectivity/docs/network-connectivity-center/quotas (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [vpc-spokes-overview.md](./vpc-spokes-overview.md)
- [ncc-gateway-overview.md](./ncc-gateway-overview.md)
