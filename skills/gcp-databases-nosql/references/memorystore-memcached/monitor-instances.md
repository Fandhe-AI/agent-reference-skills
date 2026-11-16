---
source: https://docs.cloud.google.com/memorystore/docs/memcached/monitor-instances
---

# Monitor Memcached instances

Monitor instances from the Instance details page, Cloud Monitoring (Metrics Explorer, dashboards, alerting policies), and Cloud Logging. Existing OSS Memcached monitoring tools can also run from Compute Engine VMs.

## Signature / Usage

### Look up instance details

```bash
gcloud memcache instances describe my-memcache-instance \
    --region=us-central1
```

## Options / Props

| Item | Value |
|---|---|
| Console metrics | Active Connections, Memory Usage, CPU Usage Time, Hit Ratio, Items, Eviction Count, Operation Count, Received Bytes, Sent Bytes, Uptime, Unused Memory, Get Operations, Set Operations, Delete Operations |
| Uptime metric | `memcache.googleapis.com/node/uptime` |
| Operations per second metric | `memcache.googleapis.com/node/operation_count` (aggregation: Sum; resource type: Memcached instance) |
| Memory dashboard | Resource "Memorystore Memcached Node", metric "Cache memory", filter by `instance_id` (or group by `instance_id`) |
| Alert example | Threshold for memory usage at 80% of instance size in bytes, "For" 1 minute initially |
| Audit logs | Logs Explorer, Audited Resource > `memcache.googleapis.com` |

## Notes

- Uptime graph: each line is one instance; a drop indicates a restart; missing data indicates unavailability.
- Alert setup: Monitoring > Alerting > Create Policy, add a condition on the Memorystore Memcached Node resource, then add a notification channel (email or others) and save.
- The monitoring steps are console-only in the source; no gcloud or code form is shown.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/memcache/instances/describe (the monitoring page has no code; the instance details shown there are the instance metadata this command prints).
- Corrected from the official docs: the audit-log steps select Audited Resource `memcached.googleapis.com`, but the Memorystore for Memcached API is `memcache.googleapis.com` (the metrics on this page and the gcloud create page use it).
- Source: https://docs.cloud.google.com/memorystore/docs/memcached/monitor-instances (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [memory-management-best-practices.md](./memory-management-best-practices.md)
- [best-practices.md](./best-practices.md)
- [supported-memcached-configurations.md](./supported-memcached-configurations.md)
