---
source: https://docs.cloud.google.com/docs/quotas/quota-adjuster
---

# Quota Adjuster

The quota adjuster watches resource consumption and proactively submits quota increase requests before you hit a quota value, at project, folder, or organization level.

## Signature / Usage

Enable (requires `cloudquotas.quotas.update` and `cloudquotas.quotas.get`):

```bash
gcloud auth login
```

```bash
gcloud quotas adjuster settings update --project=PROJECT_ID_OR_NUMBER --enablement=enabled
```

```bash
gcloud quotas adjuster settings update --folder=FOLDER_ID --enablement=enabled
```

```bash
gcloud quotas adjuster settings update --organization=ORGANIZATION_ID --enablement=enabled
```

Verify:

```bash
gcloud quotas adjuster settings describe --RESOURCE_CONTAINER_TYPE=ID
```

(`RESOURCE_CONTAINER_TYPE` is `project`, `folder`, or `organization`.)

REST enable:

```text
PATCH https://cloudquotas.googleapis.com/v1/RESOURCE_CONTAINER/ID/locations/global/quotaAdjusterSettings
```

```text
{
  name: RESOURCE_CONTAINER/ID/locations/global/quotaAdjusterSettings
  enablement: ENABLED
  etag: OPTIONAL_ETAG
}
```

Disable with `--enablement=disabled` (or `enablement: DISABLED` in the REST body):

```bash
gcloud quotas adjuster settings update --project=PROJECT_ID_OR_NUMBER --enablement=disabled
```

Console: IAM & Admin > Quotas & System Limits > Configurations tab > Enable toggle (project level only; folder and organization settings need the REST API or gcloud beta commands).

## Options / Props

| Item | Detail |
|------|--------|
| `RESOURCE_CONTAINER` | `projects`, `folders`, or `organizations` |
| `enablement` | `ENABLED` / `DISABLED` (gcloud: `enabled` / `disabled`, required) |
| `etag` | Optional |

Supported quota families (not every quota of a service): Artifact Registry API request quotas; Cloud Build API (Build and Operation Get requests, concurrent build CPUs / builds); Cloud Key Management Service API (crypto, read, write requests and usage); Cloud Logging API (log write bytes per minute per region); Cloud Monitoring API (time series ingestion / queries); Cloud Resource Manager API (read requests per minute); Cloud Run Admin API (job run / read / write requests, total CPU allocation); Cloud Trace API (write requests); and most Compute Engine API allocation quotas (CPUs per family, GPUs, disks, IP addresses, networks, firewall rules, forwarding rules, backend services, instance groups, VPC peerings, Interconnect, and more). Services add support over time; newly supported quotas are covered automatically.

## Notes

- Logic: if peak usage approaches the quota value over a period, the adjuster requests an increase (typically about 10-20%). It only raises values, never lowers them, and skips quotas that have a manual quota cap (override).
- Availability requires enough usage history for accurate predictions.
- Manual increase requests remain possible; adjuster requests appear on the Quotas & System Limits page; set up quota adjuster alerts to be notified of denials. Denials happen when Google Cloud cannot raise a quota for a project, resource, or region beyond a value; request manually in that case.
- Source: https://docs.cloud.google.com/docs/quotas/quota-adjuster
- Retrieved 2026-11-14. Content is CC BY 4.0; code examples are Apache 2.0.

## Related

- [view-manage-quotas.md](./view-manage-quotas.md)
- [cloud-quotas-overview.md](./cloud-quotas-overview.md)
