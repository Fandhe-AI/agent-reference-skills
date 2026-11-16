---
source: https://docs.cloud.google.com/sql/docs/postgres/replication/create-replica
---

# Create read replicas (Cloud SQL for PostgreSQL)

How to create a read replica, a replica of a Private Service Connect instance, and cascading replicas, plus IAM database authentication on replicas and troubleshooting.

## Signature / Usage

### Create a read replica

```bash
gcloud sql instances create REPLICA_NAME \
--master-instance-name=MASTER_INSTANCE_NAME
```

Use `--tier` for a different tier and `--region` for a different region. If the primary is Enterprise, or Enterprise Plus on PostgreSQL 16 and later, the replica inherits the machine type. For an internal-IP-only primary, add `--enable-google-private-path` to let other Google Cloud services (for example BigQuery) query over an internal connection. The replica must be in the same VPC network as the primary; you can set `allocated-ip-range-name`, otherwise a random range is used.

### Replica of a Private Service Connect instance

```bash
gcloud sql instances create REPLICA_INSTANCE_NAME \
--master-instance-name=PRIMARY_INSTANCE_NAME \
--project=PROJECT_ID \
--region=REGION_NAME \
--enable-private-service-connect \
--allowed-psc-projects=ALLOWED_PROJECTS \
--availability-type=AVAILABILITY_TYPE \
--no-assign-ip \
--tier=TIER \
--edition=EDITION
```

### Create a cascading replica

Adapted (not in the official docs): removed the trailing `\` after the last argument, which left a dangling line continuation.

```bash
gcloud sql instances create REPLICA_NAME \
      --master-instance-name=PARENT_REPLICA_NAME
```

Replace `REPLICA_NAME` with the unique ID of the new replica and `PARENT_REPLICA_NAME` with the parent replica.

## Options / Props

### Private Service Connect replica parameters

| Name | Description |
|---|---|
| `REPLICA_INSTANCE_NAME` / `PRIMARY_INSTANCE_NAME` | Names of the replica and primary. |
| `PROJECT_ID` | ID or project number of the project containing the instance. |
| `REGION_NAME` | Region of the replica (same or different region from the primary). |
| `ALLOWED_PROJECTS` | Comma-separated allowed project IDs or numbers; other projects cannot enable PSC for the instance. Not copied from the primary. |
| `AVAILABILITY_TYPE` | `REGIONAL` (HA, recommended for production; fails over to another zone) or `ZONAL` (no failover, default). |
| `TIER` | Machine type, such as `db-perf-optimized-N-4` or `db-custom-2-7680`. Required if the primary is Enterprise Plus on PostgreSQL 15 and earlier, MySQL 8.0 and earlier, or SQL Server; otherwise inherited. |
| `EDITION` | `ENTERPRISE` or `ENTERPRISE_PLUS`; same requirement as `TIER`. |

### Troubleshooting

| Issue | Troubleshooting |
|---|---|
| Replica did not start replicating | Inspect logs in Cloud Logging for the specific error. |
| `invalidFlagValue` | Check `max_connections` is greater than or equal to the primary's value, then inspect logs. |
| Unknown error | Inspect logs. For `set Service Networking service account as servicenetworking.serviceAgent role on consumer project`, create the service agent (see https://docs.cloud.google.com/iam/docs/create-service-agents). |
| Disk is full | Edit the primary to a larger disk. |
| Disk space grows significantly | Unused replication slots keep WAL. Query `pg_replication_slots` (filter on `active`) and drop unused slots with `pg_drop_replication_slot`. |
| Replica uses too much memory | Restart the replica to reclaim temporary memory. |
| Replication stopped | Storage limit reached without automatic storage increase; enable it. |
| Replication lag consistently high | Write load too high; fix slow queries, make sure every table has a unique/primary key, increase replica size, reduce load, or recreate the replica. |
| Hash index errors on PostgreSQL 9.6 | Hash indexes are not propagated below PostgreSQL 10; upgrade to 10+ or avoid hash indexes. |
| Primary always runs a `cloudsqlreplica` query on `pg_stat_activity` | Expected after creating a replica. |
| Creation fails with timeout | Long-running uncommitted transactions on the primary; stop queries and recreate. |
| Different vCPU sizes cause plan differences | Turn on `log_duration`, set `log_statement` to `ddl`, run `explain analyze` on both and compare plans. |

## Notes

- You cannot create a replica of a replica from the Console menu; use the cascading procedure. If you specify PostgreSQL 16 or later as the replica's database version, the default edition is Enterprise Plus; with no version or an earlier one, it is Enterprise (source note).
- You cannot create read replicas if the primary has a private IP connection and accepts connections from Cloud SQL Language Connectors only.
- A PSC replica can replicate only from another PSC instance, not from an external-IP or private-services-access instance. Create a PSC endpoint per replica; with the Auth Proxy or Language Connectors, create a DNS zone and record for replicas.
- If `cloudsql.iam_authentication` is on for the primary it is enabled on replicas automatically; otherwise replicas cannot use IAM database authentication.
- Source inconsistency: this page says the flag `cloudsql.iam_authentication` on the primary is enabled on replicas automatically, while https://docs.cloud.google.com/sql/docs/postgres/iam-authentication says "IAM database authentication is not enabled in a read replica automatically, even when it is enabled on the primary instance. After you create a read replica, you need to add IAM database authentication."
- Source inconsistency: the connector-enforcement restriction on read replicas is scoped three ways. This page: a primary with private IP that accepts Language Connector connections only. https://docs.cloud.google.com/sql/docs/postgres/replication: any instance with connector enforcement, "unless private service access is configured". https://docs.cloud.google.com/sql/docs/postgres/connect-connectors: Private Service Connect-enabled instances with connector enforcement.
- `--allocated-ip-range-name` is available on `gcloud beta sql instances create` (not GA `create`) in gcloud 593.0.0.
- Corrected from the official docs: the cascading-replica command ended with `--master-instance-name=PARENT_REPLICA_NAME \` (dangling continuation).
- Creating a replica takes a backup if needed. Do not use a replica as the source for Datastream or Kafka.
- Promoting or deleting replicas is destructive. Try it on a disposable instance first.
- Source inconsistency: the v1beta4 PSC example uses `PATCH .../instances` to create a replica while the v1 example uses `POST`; the REST forms are omitted here.
- The source also shows Console, Terraform, REST v1 / v1beta4 (curl, PowerShell), and a cascading-replica curl sample (omitted; its `curl` lines lacked line continuations and its JSON had a trailing comma).
- Managed PostgreSQL on Google Cloud; distinct from Supabase Postgres (`supabase`) and the Node.js client `mssql` / ORM `drizzle` (those cover client code, not the managed service).
- Source: https://docs.cloud.google.com/sql/docs/postgres/replication/create-replica (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [replication.md](./replication.md)
- [cross-region-replicas.md](./cross-region-replicas.md)
- [replication-lag.md](./replication-lag.md)
- [about-read-pools.md](./about-read-pools.md)
- Manage replicas: https://docs.cloud.google.com/sql/docs/postgres/replication/manage-replicas
- gcloud: https://docs.cloud.google.com/sdk/gcloud/reference/sql/instances/create
