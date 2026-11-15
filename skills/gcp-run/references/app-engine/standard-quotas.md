---
source: https://docs.cloud.google.com/appengine/docs/standard/quotas
---

# Quotas and limits (App Engine standard environment)

App Engine uses quotas (default values, usually adjustable) and system limits (fixed) for fair resource allocation. Quotas apply per project. Daily quotas replenish at midnight Pacific time; per-minute quotas refresh every 60 seconds. View consumption on the Console Quota Details page or the IAM Quotas page.

## Signature / Usage

### Serve a custom error page when a quota is exceeded

```yaml
error_handlers:
- file: default_error.html
- error_code: over_quota
  file: over_quota.html
```

When a resource needed to start a request is depleted (for example Instance hours), App Engine by default returns HTTP `403` or `503` instead of calling a handler. For other resources, the consuming call raises an exception the app can catch (Python `apiproxy_errors.OverQuotaError`, Java `com.google.apphosting.api.ApiProxy.OverQuotaException`, Go `appengine.IsOverQuota`).

## Options / Props

### Quota types

| Type | Behavior |
|---|---|
| Free quotas | Free amount per resource; only the standard environment has them. Beyond it you are billed. |
| Daily quotas | Exceeding returns an error; refreshed daily at midnight Pacific time. |
| Per-minute quotas | "Limited" appears on the Quotas page when depleted; requests are denied. |

### Services, versions, instances

| Limit | Free app | Paid app |
|---|---|---|
| Maximum services per app | 5 | 210 |
| Maximum versions per app | 15 | 210 |

Standard and flexible versions in one app count toward the same limits.

| Maximum instances per manual/basic scaling version | Free app | Paid app US | Paid app EU |
|---|---|---|---|
| | 20 | 25 (200 for `us-central`) | 25 |

| Description | Limit | Can be increased |
|---|---|---|
| Frontend instances per project and region (1-minute period) | Depends on region | Yes |
| Backend instances per project and region (1-minute period) | Depends on region | Yes |
| Instances for a version using Direct VPC egress (`appengine.googleapis.com/instance_limit_with_direct_vpc_egress`) | 100 | Yes |
| Characters in `VERSION-dot-SERVICE-dot-PROJECT_ID` | 63 | — |

An F4 instance counts as 4 normalized frontend instances.

### Storage, deployments, files

| Resource | Limit |
|---|---|
| Default Cloud Storage bucket stored data | First 5 GB free; no maximum |
| Default bucket Class A operations | First 20,000 ops/day free |
| Default bucket Class B operations | First 50,000 ops/day free |
| Default bucket network egress | First 1 GB free |
| Blobstore stored data | First 5 GB free; no maximum |
| Static data file size | 32 MB (64 MB for Go) |
| Code and static data storage | First 1 GB free; then 0.026/GB/month (US/Europe) or 0.023/GB/month (Asia, Japan) |
| Deployments | 10,000 per day per app |
| Files per app | 10,000 (contact Support to increase) |
| Files per directory | 1,000 (hard limit) |
| Incoming HTTP request size | 32 MB |
| Outgoing bandwidth | First 1 GB per day free; no maximum |

### Instance hours

| Resource | Free quota |
|---|---|
| F1 instances | 28 free instance hours per day |
| B1 instances | 9 free instance hours per day |

Accrual for basic or automatic scaling ends 15 minutes after the last request; for manual scaling, 15 minutes after shutdown. Bills show "B" classes as Backend Instances and "F" classes as Frontend Instances, with a multiple per class (an F4 for one hour bills four F1 hours).

### Datastore (Firestore in Datastore mode)

| Resource | Default limit |
|---|---|
| Stored data (billable) | 1 GiB free; no maximum |
| Number of indexes | 200 |
| Entity reads | 50,000 free |
| Entity writes | 20,000 free |
| Entity deletes | 20,000 free |
| Small operations | Unlimited |

### Mail

| Resource | Default daily limit | Maximum rate |
|---|---|---|
| Recipients emailed | 100 messages | 8 messages/minute |
| Admins emailed | 5,000 mails | 24 mails/minute |
| Message body data sent | 60 MB | 340 KB/minute |
| Attachments sent | 2,000 | 8/minute |
| Attachment data sent | 100 MB | 10 MB/minute |

Maximum 50 authorized senders; each admin email is limited to 16 KB total.

### Search, Task Queue, Cron, URL Fetch, Memcache

| Resource | Limit |
|---|---|
| Search total storage | 0.25 GB free |
| Search queries | 1000 per day free |
| Search documents added | 0.01 GB per day free |
| Search execution time | 100 aggregated minutes per minute per app and index |
| Search documents added or deleted | 15,000 per minute |
| Search storage per index | 10 GB (up to 200 GB on request) |
| Task queues (push and pull, excluding default) | 100 |
| Push queue maximum task size | 100 KB |
| Push queue execution rate | 500 task invocations per second per queue |
| Push task maximum countdown/ETA | 30 days |
| Tasks added in a batch | 100 |
| Tasks added in a transaction | 5 |
| Task Queue management calls (Console) | 10,000 per day |
| Cron jobs | 250 |
| UrlFetch API calls | 860,000,000 per day; 660,000 per minute |
| UrlFetch data sent / received | 4.5 TB per day; 3,600 MB per minute |
| Shared Memcache | 90,000,000 centi-MCUs per minute per project per region |

### Networking

- Outbound connections per second per instance: 500 (not increasable; not applicable to Direct VPC egress traffic).
- Outbound DNS resolutions per second per instance: 100 (not increasable).
- Maximum packets per second per instance, excluding Direct VPC egress: 80,000.
- Maximum bits per second per instance, excluding Direct VPC egress: 100,000,000.
- Maximum bits per second per instance for egress over Direct VPC: 1 Gbps to VPC destinations.

## Notes

- Container Registry is shut down (effective March 18, 2025); deployments store the Cloud Build image in Artifact Registry and incur charges above the Artifact Registry free tier.
- Snippet taken from https://docs.cloud.google.com/appengine/docs/standard/reference/app-yaml (`error_handlers`); the source page's own code block is a Python 2 `except ..., message` snippet, omitted here.
- Higher quotas: request a quota adjustment, contact Cloud Customer Care for throughput limits, or use SendGrid/Mailjet/Mailgun for email above the Mail quota.
- Source: https://docs.cloud.google.com/appengine/docs/standard/quotas (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [standard-app-yaml.md](./standard-app-yaml.md)
- [an-overview-of-app-engine.md](./an-overview-of-app-engine.md)
