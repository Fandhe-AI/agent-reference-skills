---
source: https://docs.cloud.google.com/alloydb/docs/instance-configure-database-flags
---

# Configure an instance's database flags

Add, modify or remove database flags on an AlloyDB for PostgreSQL instance to tune PostgreSQL parameters and instance behavior. A flag value persists until you remove the flag or change it again.

## Signature / Usage

### Set database flags

Warning (source caution): this command overwrites all database flags previously set. Any flag not in the `--database-flags` list is reset to its default. To keep existing flags while adding new ones, include both current and new flags in the list.

```bash
   gcloud alloydb instances update INSTANCE_ID \
   --database-flags FLAGS_LIST \
   --region=REGION_ID \
   --cluster=CLUSTER_ID \
   --project=PROJECT_ID
```

To apply updates faster, add `--update-mode=FORCE_APPLY` (beta). It can temporarily decrease database performance, so avoid it in production.

```bash
   gcloud beta alloydb instances update INSTANCE_ID \
   --database-flags FLAGS_LIST \
   --region=REGION_ID \
   --cluster=CLUSTER_ID \
   --project=PROJECT_ID \
   --update-mode=FORCE_APPLY
```

### List an instance's manually set flags

```bash
   gcloud alloydb instances describe INSTANCE_ID \
   --region=REGION_ID \
   --cluster=CLUSTER_ID \
   --project=PROJECT_ID
```

## Options / Props

| Argument | Description |
|---|---|
| `INSTANCE_ID` | ID of the instance. |
| `FLAGS_LIST` | Comma-separated flag specifications `name=value`. For flags that take no value, give the name followed by `=`. |
| `REGION_ID` | Region of the instance, e.g. `us-central1`. |
| `CLUSTER_ID` | Cluster of the instance. |
| `PROJECT_ID` | Project of the cluster. |

### Maintenance policy for flags that need a restart

| Policy | Primary instance | Read pool instance |
|---|---|---|
| Low downtime (default; recommended for production) | Under 1 second of downtime for most workloads; flag finishes updating after about 15 minutes | No downtime; about 10 minutes |
| Force apply (`FORCE_APPLY`; more appropriate for development) | About one minute of downtime; flag updated after one or two minutes | About one minute of downtime; one or two minutes |

Force apply trades longer downtime and a temporary performance drop (peak performance returns several minutes later) for speed. Avoid it for updates that can change the machine family, e.g. moving an instance on the C4A machine family to a different one.

### Prerequisites

- Project enabled to access AlloyDB; one of `roles/alloydb.admin`, `roles/owner`, `roles/editor`.
- Total replication slots at least one less than the `max_wal_senders` limit, so maintenance and updates can create temporary replication slots (https://docs.cloud.google.com/alloydb/docs/cluster-upgrade#configure-source-instances).

## Notes

- Setting, removing or modifying a flag might restart the instance, depending on the flag; see Supported database flags (https://docs.cloud.google.com/alloydb/docs/reference/database-flags). One flag may require another to fully enable a feature.
- `gcloud alloydb instances update` overwriting the whole flag set is destructive to existing configuration; run `describe` first and try on a disposable instance.
- The source also shows the Console flow (Advanced configuration options > Add flag) and Terraform (the `database_flags` map on `google_alloydb_instance`; keep flag changes in Terraform files only, or manual changes cause perpetual diffs and overwritten changes on `terraform apply`).
- The columnar engine is enabled through the `google_columnar_engine.enabled` flag; see [columnar-engine.md](./columnar-engine.md).
- Managed PostgreSQL-compatible database on Google Cloud, distinct from Supabase Postgres (`supabase`), Cloudflare D1 / Hyperdrive (`cloudflare-storage`), and the Node.js client `mssql` / ORM `drizzle` (those skills cover client code, not the managed service).
- Source: https://docs.cloud.google.com/alloydb/docs/instance-configure-database-flags (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [maintenance-windows.md](./maintenance-windows.md)
- [maintenance.md](./maintenance.md)
- [columnar-engine.md](./columnar-engine.md)
- Supported database flags: https://docs.cloud.google.com/alloydb/docs/reference/database-flags
- gcloud alloydb instances update: https://docs.cloud.google.com/sdk/gcloud/reference/alloydb/instances/update
