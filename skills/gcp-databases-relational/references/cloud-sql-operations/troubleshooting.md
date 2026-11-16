---
source: https://docs.cloud.google.com/sql/docs/postgres/troubleshooting
---

# Troubleshoot Cloud SQL for PostgreSQL

Issue / fix tables for Cloud SQL for PostgreSQL by area: backup and recovery, cancel import and export, cloning, connectivity, instance creation, Data API (ExecuteSql), export, flags, high availability, import, Vertex AI integration, logging, instance management, Private Service Connect and replication.

## Signature / Usage

### Find who is connected

```sql
SELECT datname, usename, application_name as appname, client_addr, state, now() - backend_start as conn_age, now() - state_change as last_activity_age FROM pg_stat_activity WHERE backend_type = 'client backend' ORDER BY 6 DESC LIMIT 20
```

### Find running queries

Adapted (not in the official docs): the source selects the nonexistent `pg_stat_activity` column `username`; changed to `usename`.

```sql
SELECT datname, usename, application_name as appname, client_addr, state, now() - backend_start as conn_age, now() - xact_start as xact_age, now() - query_start as query_age, now() - state_change as last_activity_age, wait_event_type, wait_event, query FROM pg_stat_activity WHERE state <> 'idle' ORDER BY 8 DESC LIMIT 20;
```

### Stop a blocked background process (needs `pg_signal_backend`)

Step 1: grant the role (USERNAME is a placeholder).

```sql
GRANT pg_signal_backend TO USERNAME;
```

Step 2: find the process ID of the blocked or stuck process.

Adapted (not in the official docs): `username` replaced with `usename` (the real `pg_stat_activity` column).

```sql
SELECT pid, usename, state, query FROM pg_stat_activity;
```

Step 3: stop a running or idle process. Run ONE of the following: cancel the current query (first) or terminate the session (second). Both act on every session of `USERNAME`, including your own if you are connected as that user.

Adapted (not in the official docs): `username` replaced with `usename` (the real `pg_stat_activity` column).

```sql
SELECT pg_cancel_backend(pid) FROM pg_stat_activity WHERE usename = 'USERNAME';
```

Adapted (not in the official docs): `username` replaced with `usename` (the real `pg_stat_activity` column).

```sql
SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE usename = 'USERNAME';
```

### Instance disk usage by database

```sql
SELECT pg_database.datname, pg_size_pretty(pg_database_size(pg_database.datname)) AS size FROM pg_database;
```

### Keep a time zone across sessions

```sql
ALTER DATABASE dbname SET TIMEZONE TO 'timezone';
ALTER USER username SET TIMEZONE TO 'timezone';
```

### Node.js `verify-full` hostname mismatch

The downloaded `server-ca.pem` has no DNS name. Replace `INSTANCE_IP_ADDRESS`, then set `servername` to the `DNS:` value.

```bash
echo | openssl s_client -starttls postgres -connect INSTANCE_IP_ADDRESS:5432 | openssl x509 -noout -text | grep 'DNS:'
```

```javascript
ssl: {
  rejectUnauthorized: true,
  ca: fs.readFileSync("/path/to/server/CA"),
  servername: 'N-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxx.us-central1.sql.goog'
}
```

### Enable Service Networking API (`SERVICE_NETWORKING_NOT_ENABLED`)

```bash
gcloud services enable servicenetworking.googleapis.com \
--project=PROJECT_ID
```

### Allocated IP range exhausted (`Couldn't find free blocks in allocated IP ranges`)

After allocating a new range (no overlap with existing ones), update the peering with the old and new names. `--force` is in the source command.

```bash
gcloud services vpc-peerings update \
--service=servicenetworking.googleapis.com \
--ranges=OLD_RESERVED_RANGE_NAME,NEW_RESERVED_RANGE_NAME \
--network=VPC_NETWORK \
--project=PROJECT_ID \
--force
```

After only expanding an existing range (increase, never decrease: for example 10.0.10.0/24 to at least 10.0.10.0/23):

```bash
gcloud services vpc-peerings update \
--service=servicenetworking.googleapis.com \
--ranges=RESERVED_RANGE_NAME \
--network=VPC_NETWORK \
--project=PROJECT_ID
```

### Vertex AI integration: flag off (`Cannot invoke ml_predict_row if 'cloudsql.enable_google_ml_integration' is off.`)

```bash
gcloud sql instances patch INSTANCE_NAME --database-flags cloudsql.enable_google_ml_integration=on
```

### Vertex AI integration not enabled (`Failed to connect to remote host: Connection refused.`)

```bash
gcloud sql instances patch INSTANCE_NAME --enable-google-ml-integration
```

### Private Service Connect endpoint status (expect `ACCEPTED`; `PENDING` means the project isn't allowed)

```bash
gcloud compute forwarding-rules describe ENDPOINT_NAME \
--project=PROJECT_ID \
--region=REGION_NAME \
| grep pscConnectionStatus
```

## Options / Props

| Area | Issue | Fix |
|------|-------|-----|
| Backup | Can't see operation status | `gcloud sql operations list` |
| Backup | After instance deletion no backup | Take a final backup before deleting; retained backups can be restored; otherwise import an export |
| Backup | Retention beyond seven days | Automated backups retain 1 to 365; on-demand backups stay until deleted (affects billing) |
| Backup | Fails with more than 50 user-defined labels | Snapshot limit is 64 labels including system labels; keep 50 or fewer |
| Backup | Missing data after restore | `UNLOGGED` tables are wiped on restore, not replicated, lost on failover; use `SET LOGGED` |
| Backup | Instance cycling failure / restore | Too many connections, retry logic that never stops, or traffic; check autovacuum, use pooling, ramp traffic slowly |
| Backup | Final backup setting blocks delete / replica | Delete selection must match the `final-backup` setting (or leave empty); update the final backup org policy for replicas |
| Cancel | `You can't cancel operation ...` | Only running `IMPORT` / `EXPORT` operations can be canceled; retry in a few seconds if not cancelled |
| Clone | `constraints/sql.restrictAuthorizedNetworks` | Remove Authorized Networks entries or create a replica without them |
| Clone | `Failed to create subnetwork ...` (private IP via Console) | Use `gcloud` clone with `--allocated-ip-range-name` (alpha only in gcloud 593.0.0: `gcloud alpha sql instances clone --allocated-ip-range-name`) |
| Connect | `Aborted connection` | Use pooling and retry with exponential plus randomized backoff |
| Connect | Timeout with private IP / VPC peering | Run a Network Intelligence Center Connectivity Test; peering `ACTIVE`; firewall allows 5432 (3306 MySQL, 1433 SQL Server); export subnet routes with public IP for non-RFC 1918 ranges |
| Connect | `Certificate verify failed` | Certificates expired or wrong path; recreate client certificates |
| Connect | Slow IAM database authentication | Shared-core machine types (`db-f1-micro`, `db-g1-small`) throttle CPU; use pooling or Auth Proxy, raise timeout (10 to 15 seconds), or move to dedicated core |
| Connect | `FATAL: database 'user' does not exist` | `gcloud sql connect --user` works only with `postgres` |
| Create | Zone lacks resources | Retry in another zone or later |
| Create | `Required 'compute.projects.get' permission` | Service Networking service account not yet propagated; wait or add manually |
| Create | Custom SAN errors | At most 3 DNS names, each at most 253 characters, no wildcards, no trailing dots, RFC 1034 |
| Create | `sql.restrictNoncompliantResourceCreation` org policy | Meant for Assured Workloads; disable it elsewhere and use `constraints/gcp.resourceLocations`, `constraints/gcp.restrictNonCmekServices`, `constraints/sql.restrictPublicIp` |
| Data API | `ExecuteSql ... patching the instance with {settings: { dataApiAccess: "ALLOW_DATA_API" }}` | Data API is disabled by default; enable it |
| Data API | `Secret cannot be provided when auto_iam_authn is true.` | IAM authentication needs no password |
| Data API | `IAM authentication is not enabled for the instance` | Configure IAM authentication; Assured Workloads folders unsupported |
| Export / Import | Same rows as in the import-export page | See [import-export.md](./import-export.md) |
| HA | Manual failovers not in metrics | Only automatic failovers are recorded |
| HA | CPU / RAM near 100% | Upgrade the machine size |
| Vertex AI | PostgreSQL 12+, dedicated core, maintenance version `R20240130` or later | Upgrade version / machine type / self-service maintenance |
| Vertex AI | Quota | 1,500 requests per minute per region per model per project; gRPC limit 4 MB per request; instance and endpoint must be in the same region |
| Vertex AI | `aiplatform.endpoints.predict` denied | Grant Vertex AI permissions to the Cloud SQL service account |
| Logging | Rows as in the logging page | See [logging.md](./logging.md) |
| Manage | Storage larger than data | Transaction logs, temp files; `disk/bytes_used_by_data_type` breakdown: `Data`, `Wal`, `Archived_wal_log`, `Tmp_data`, `Audit_log`, `Replication_slot`, `Other` |
| Manage | Near 100% transaction IDs | Risk of wraparound blocking writes; see the txid wraparound tips |
| Manage | Instance can't be deleted | `HTTP Error 409` (another operation) or `INSTANCE_RISKY_FLAG_CONFIG` (a `beta` flag in use; remove and restart); disable deletion protection |
| Manage | Stuck on restart, out of disk | Enable automatic storage increase |
| Manage | Rename an instance | Unsupported; clone (recommended) or export and import |
| Manage | Deleted instance recovery | Data is lost unless a final backup, retained backups or deleted-instance PITR applies (`cloud-sql-backup-recovery`); export first; restrict the Cloud SQL Admin role |
| Manage | `429 Too Many Requests (rateLimitExceeded)` | Per-user, per-minute, per-region Admin API quota; find the `credential_id` with most 429s in Metrics Explorer (`serviceruntime.googleapis.com/api/request_count`); use caching, backoff, separate service accounts or a quota adjustment |
| PSC | Endpoint status | `CONNECTION_POLICY_MISSING`, `CONSUMER_INSTANCE_PROJECT_NOT_ALLOWLISTED`, `POLICY_LIMIT_REACHED`; creating a service connection policy needs `Compute Network Admin` |
| Replication | Disk full / grows | Primary disk fills during replica creation; unused replication slots hold WAL (inspect `pg_replication_slots`, drop with `pg_drop_replication_slot`) |
| Replication | Replication stopped | Storage limit reached without automatic storage increase |
| Replication | High lag | Slow queries, tables without a primary key, big `DELETE ... WHERE`; resize or reduce load |
| Replication | Creation fails with timeout | Long-running uncommitted transactions on the primary |

## Notes

- `pg_terminate_backend` ends other users' sessions, `ALTER` / `DROP` / instance deletion, `--force` peering updates and backup-restore related fixes are destructive or disruptive; try them on a disposable resource first.
- Adapted from the official docs: running queries used `SELECT datname, username, ...`; the column is `usename` (https://www.postgresql.org/docs/current/monitoring-stats.html#MONITORING-PG-STAT-ACTIVITY-VIEW).
- Adapted from the official docs: Step 2 selected `username`; now `usename`.
- Adapted from the official docs: `pg_cancel_backend` filtered `WHERE username = ...`; now `usename`.
- Adapted from the official docs: `pg_terminate_backend` filtered `WHERE username = ...`; now `usename`.
- Source inconsistency: its deleted-instance row says all data and backups are permanently lost; its backup row and the backups page describe final and retained backups.
- The source gives the `pg_signal_backend` procedure as three steps and shows `pg_cancel_backend` and `pg_terminate_backend` in separate blocks; they are alternatives, kept as separate fences here.
- `--database-flags` overwrites all previously set database flags (unlisted flags return to defaults) and may restart the instance; include every existing flag in the list. Source: https://docs.cloud.google.com/sql/docs/postgres/flags
- `--allocated-ip-range-name` is not a flag of GA or beta `gcloud sql instances clone` in gcloud 593.0.0; only `gcloud alpha sql instances clone` has it.
- Omitted: the SQL Server Entra ID rows and most per-row prose.
- The source also shows PSC REST / PowerShell forms and `gcloud logging read` download commands (see the logging page).
- Distinct from Supabase Postgres (`supabase`), Cloudflare D1 / Hyperdrive (`cloudflare-storage`), and the `mssql` / `drizzle` client skills.
- Source: https://docs.cloud.google.com/sql/docs/postgres/troubleshooting (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sql/docs/postgres/flags (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [known-issues.md](./known-issues.md)
- [logging.md](./logging.md)
- [import-export.md](./import-export.md)
- [import-export-sql.md](./import-export-sql.md)
- [maintenance.md](./maintenance.md)
