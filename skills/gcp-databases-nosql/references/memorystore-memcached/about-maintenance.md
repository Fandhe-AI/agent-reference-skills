---
source: https://docs.cloud.google.com/memorystore/docs/memcached/about-maintenance
---

# About maintenance

Memorystore for Memcached routinely updates instances (features, OS patches, OSS Memcached patch versions). Most updates run online, but maintenance causes dropped connections and a full cache flush, node by node. Maintenance can run automatically in a maintenance window or manually.

## Signature / Usage

### Reschedule maintenance to the next available window

```bash
gcloud memcache instances reschedule-maintenance \
    my-memcache-instance --region=us-central1 \
    --reschedule-type=next-available-window
```

## Options / Props

### Maintenance window settings (per instance)

| Setting | Description |
|---|---|
| Day of the week | Day maintenance occurs. |
| Start hour | Hour maintenance begins. |
| Duration | 3 to 8 hours. Nodes are updated sequentially and evenly across the duration. |

### Rescheduling

| Option | Behavior |
|---|---|
| Update now | Apply the update immediately. |
| Defer to next scheduled window | Defers by one week. |
| Custom day and time | Any time within one week after the original time. |

## Notes

- Impact: each node's cache is flushed and data is not restored; downtime is about 5 minutes per node, and the node connection is dropped. Use retries with exponential backoff. IP addresses do not change.
- Without a maintenance window, maintenance can start at any time without advance notice. Setting a window causes no downtime. You cannot opt out, but you can defer up to seven days.
- Notifications are not sent by default: set a maintenance window and opt in; email arrives at least one week before, to your Google account address only. Opting in covers all instances with maintenance windows in the project; one notification per instance. Title: `Upcoming maintenance for your Cloud Memorystore instance [your-instance-name]`.
- Rescheduling: not possible if less than an hour remains; no multi-instance reschedule in one operation. When rescheduling in bulk programmatically, limit batches to 100 instances and wait between requests.
- Best practices: set a window and subscribe for all production instances; keep System Memory Utilization at or below 50% during maintenance (schedule low traffic or temporarily scale up); implement reconnect retries; test on a non-production instance first.
- Manual maintenance: requires a window and notifications; you update nodes via gcloud at your own pace. Remaining nodes are updated automatically during the window.
- Windows are set in UTC with gcloud; the console shows local time but stores UTC; no daylight saving changes. Time-sensitive vulnerabilities can rarely trigger maintenance outside the window. Updates start inside the window and almost always complete within it.
- `reschedule-maintenance` with `immediate` (or a near `specific-time`) starts maintenance, which drops connections and flushes each node's cache; this is destructive, so try it on a disposable instance first.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/memcache/instances/reschedule-maintenance (the maintenance page has no code). `--reschedule-type` must be one of `immediate`, `next-available-window` or `specific-time`; `--schedule-time` takes an RFC 3339 time, for example `2012-11-15T16:19:00.094Z`.
- Source: https://docs.cloud.google.com/memorystore/docs/memcached/about-maintenance (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [access-control.md](./access-control.md)
- [memory-management-best-practices.md](./memory-management-best-practices.md)
- [supported-versions.md](./supported-versions.md)
