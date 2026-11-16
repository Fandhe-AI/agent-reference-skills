---
source: https://docs.cloud.google.com/memorystore/docs/valkey/about-maintenance
---

# About maintenance

How Memorystore for Valkey performs zero-downtime maintenance (feature, OS and database patches) using a gradual deployment and a create-before-destroy lifecycle, which maintenance settings exist, and how clients should be configured to ride through it.

## Signature / Usage

### Create a weekly maintenance window (gcloud)

Snippet taken from https://docs.cloud.google.com/memorystore/docs/valkey/find-and-set-maintenance-windows

```bash
gcloud memorystore instances update INSTANCE_ID \
--project=PROJECT_ID \
--location=REGION_ID \
--maintenance-policy-weekly-window=day=DAY,startTime=hours=HOUR
```

### Configure the client application

1. Use and configure your third-party client according to the Valkey client best practices (see [general-best-practices.md](./general-best-practices.md)); the recommended configurations avoid connection resets through periodic inline topology refreshes and background connection rotations.
2. Test your client with a series of update operations (scale in or out, replica count changes) while running a representative workload on primary and replica nodes, and monitor for client impact. This tests inline topology refresh, full sync impact, new node discovery and existing node removal.

### Cluster Mode Disabled instances

- During maintenance they undergo a failover that resets connections; it typically lasts 15 seconds. Create a retry mechanism with exponential backoff to reconnect.
- After you receive the upcoming-maintenance email you can run simulated maintenance on a non-production instance (see https://docs.cloud.google.com/memorystore/docs/valkey/simulate-maintenance#run-maintenance-simulation-on-instance).
- Keep `/instance/memory/maximum_utilization` at 50% or lower when scheduled maintenance begins (the general guidance refers to an 80% threshold). Either schedule maintenance when traffic is low or temporarily scale up the instance during the window.

### Create-before-destroy lifecycle

Each shard has one primary and zero or more replicas. For every node, Memorystore:

1. Adds a new replica with the latest software (full sync, diskless replication unless persistence is enabled). A new node is created instead of updating an existing one so provisioned capacity is retained if bootstrap fails.
2. If the node being updated is a primary, runs a coordinated failover to the new replica (not needed for Cluster Mode Disabled instances, which have one shard and no in-memory topology). Requests are briefly blocked on the primary, the replica wins the election, the old primary redirects requests via the OSS Valkey protocol, and the client refreshes its topology. Typically tens of milliseconds.
3. Removes the replica running the earlier software. Clients are dropped; Cluster Mode Disabled clients need retry with exponential backoff. For Cluster Mode Enabled instances the replica stays up for a drain period (typically minutes) and redirects reads to the shard primary so clients can refresh their topology; reaching a removed node after the drain period fails and triggers a topology refresh.
4. Repeats for each node.

Shards without replicas still get a new replica first, a coordinated failover, then replacement of the primary. For highly available instances at most one fault domain / zone is updated at a time, and only a few nodes at once. More shards means a smaller dataset per node, lowering fork latency of full sync.

## Options / Props

| Name | Type / Value | Description |
|------|--------------|-------------|
| Day of the week | `MONDAY` - `SUNDAY` | Day maintenance occurs |
| Start hour | `0` - `23` (UTC in gcloud) | Hour maintenance begins |
| Window length | 1 hour | Maintenance might extend beyond the window |
| Default weekday window | Monday to Friday, 10 PM to 6 AM | Instance time zone; used when no window is set |
| Default weekend window | Friday 10 PM to Monday 6 AM | Instance time zone; used when no window is set |
| Reschedule limit | 14 days (two weeks) | From the originally scheduled time; cannot reschedule with less than one hour remaining |
| Reschedule options | Update now / Custom day and time | Update now applies immediately |
| Notification lead time | at least one week | Opt-in required; sent to the email of your Google Account only (no aliases) |
| Bulk reschedule batch size | 100 instances | Recommended maximum per request; wait between requests |

### Notification email subjects

- `"Upcoming maintenance for your Cloud Memorystore instance [your-instance-name]"`
- `"Maintenance is undergoing for your Cloud Memorystore instance [your-instance-name]"`
- `"Completed Maintenance for your Cloud Memorystore instance [your-instance-name]"`
- `"Canceled maintenance for your Cloud Memorystore instance [your-instance-name]"`

## Notes

- Maintenance categories: Memorystore features, operating system patches, database (Valkey) patches beyond OSS Valkey. Not every maintenance release is applied automatically; use self-service maintenance for a specific version sooner.
- Recommendations apply to HA instances and instances without replicas; HA is strongly recommended for production.
- Maintenance is zero-downtime via request redirection, coordinated failover, graceful node removal and Private Service Connect endpoints that are unaffected by maintenance. The behavior applies to scheduled maintenance only.
- You cannot opt out of maintenance or control the order across instances; you can defer up to two weeks. To receive notifications, set a maintenance window and opt in at least one week before the scheduled update. Subscribing alerts for all instances with scheduled maintenance in the project, one notification per instance.
- Maintenance updates are not guaranteed to finish inside the window. Apply immediately on a test instance to observe impact; defer production if issues appear.
- Example from the source: a retailer sets the window to Sunday, 1 AM (low traffic around midnight Sundays).
- Memorystore for Valkey on Google Cloud: managed Valkey, distinct from Upstash Redis (`upstash`) and Cloudflare Workers KV (`cloudflare-storage`).
- Source inconsistency: the HA and replicas page gives an average unavailability of about 30 seconds during automated repairs and maintenance failover, while the maintenance page says a Cluster Mode Disabled failover "typically lasts 15 seconds", a coordinated failover (Cluster Mode Enabled) takes typically tens of milliseconds, and scheduled maintenance is zero-downtime. Kept as written on each page; design clients to retry with exponential backoff.
- Source: https://docs.cloud.google.com/memorystore/docs/valkey/about-maintenance (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [find-and-set-maintenance-windows.md](./find-and-set-maintenance-windows.md)
- [self-service-maintenance.md](./self-service-maintenance.md)
- [general-best-practices.md](./general-best-practices.md)
- [upgrade-valkey-version.md](./upgrade-valkey-version.md)
