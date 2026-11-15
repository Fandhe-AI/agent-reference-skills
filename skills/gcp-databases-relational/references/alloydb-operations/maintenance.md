---
source: https://docs.cloud.google.com/alloydb/docs/maintenance
---

# Maintenance overview

AlloyDB for PostgreSQL is managed: Google keeps the underlying VMs, load balancers and storage volumes up to date. Most updates need no downtime; maintenance updates that restart a node can incur brief downtime, limited to under one second for primary instances and zero for read pools, by preparing a replacement server and switching over.

## Signature / Usage

### Set a maintenance window

Snippet taken from https://docs.cloud.google.com/alloydb/docs/maintenance-windows (the task this overview links to).

```bash
gcloud alloydb clusters update CLUSTER_ID \
  --region LOCATION_ID \
  --maintenance-window-day DAY_OF_WEEK \
  --maintenance-window-hour HOUR_OF_DAY
```

## Options / Props

| Topic | Behavior |
|---|---|
| Default | No maintenance window set. Non-emergency maintenance can occur any time except 6 AM to 10 PM on weekdays, in the cluster region's local time. |
| With a window | Future non-emergency maintenance starts no later than one hour after the specified time. Events are scheduled at least one week ahead. |
| Window size | You can only set a one-hour window; you can't set when it ends. |
| Order | Read pools are updated simultaneously first, then the primary instance. |
| Duration | The whole process usually completes within an hour, but with multiple read pools downtime can extend past the one-hour window (maintenance can start at the last minute and take up to an hour). |
| Emergency maintenance | Urgent security patches can occur outside default times or configured windows, including deny maintenance periods. |
| Without a window | Maintenance is applied by region, so some regions get the latest version sooner. Release notes and maintenance changelogs are published after maintenance completes in all regions; clusters with windows typically update after that. |

Reasons for maintenance: new AlloyDB features and bug / security fixes (including PostgreSQL extensions), and database compatibility upgrades (PostgreSQL minor-version updates).

## Notes

- To access new AlloyDB features you need the latest system software version; a cluster with a maintenance window set might not have it.
- Self-service maintenance lets you update to the latest version before the scheduled window (https://docs.cloud.google.com/alloydb/docs/self-service-maintenance); it can unlock features, apply patches and let you set a deny period.
- Staging-cluster approach: https://docs.cloud.google.com/alloydb/docs/manage-maintenance-updates-staging-cluster
- Managed PostgreSQL-compatible database on Google Cloud, distinct from Supabase Postgres (`supabase`), Cloudflare D1 / Hyperdrive (`cloudflare-storage`), and the Node.js client `mssql` / ORM `drizzle` (those skills cover client code, not the managed service).
- Source: https://docs.cloud.google.com/alloydb/docs/maintenance (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [maintenance-windows.md](./maintenance-windows.md)
- [instance-primary-secondary-failover.md](./instance-primary-secondary-failover.md)
- Database version policies: https://docs.cloud.google.com/alloydb/docs/db-version-policies
