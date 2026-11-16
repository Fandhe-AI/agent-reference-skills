---
source: https://docs.cloud.google.com/sql/docs/quotas
---

# Cloud SQL quotas and limits

Quotas apply per project; limits apply to the instance or project. Admin API rate quotas are enforced per minute, per user and per region; storage, connection, table and per-platform limits are fixed or configurable.

## Signature / Usage

### Find the connection limit

From inline code in the source (not source code blocks):

```sql
SHOW VARIABLES LIKE "max_connections";
```

```sql
SELECT * FROM pg_settings WHERE name = 'max_connections';
```

(First for MySQL, second for PostgreSQL.)

### Connector quota usage formula

From inline code in the source (not a source code block):

```text
Quota usage = connector processes running * instances * 2 API calls per hour
```

Example: `3 connector processes * 2 instances * 2 API calls = 12`.

### Quota accounting header

From inline code in the source (not a source code block):

```text
x-goog-user-project: my-project
```

The caller needs `serviceusage.services.use` on that project ID.

## Options / Props

### Permissions

| Permission | Purpose |
|------------|---------|
| `serviceusage.quotas.get` | Check quotas |
| `serviceusage.quotas.update` | Increase quotas |

Included in the Editor and Owner basic roles and the predefined Quota Administrator role.

### Admin API rate quotas (per minute, per user, per region)

| Category | Metric | Default limit | Methods (summary) |
|----------|--------|---------------|-------------------|
| Connect | `sqladmin.googleapis.com/connect` | 1000 | `GetConnectSettings`, `GenerateEphermalCertificates` |
| Get | `sqladmin.googleapis.com/get` | 500 | Get on backup runs, databases, instances, operations, SSL certs, users |
| List | `sqladmin.googleapis.com/list` | 500 | List on the same resources plus `ListServerCas` |
| Mutate | `sqladmin.googleapis.com/mutate` | 180 | Insert/Delete/Patch/Update, `Clone`, `Import`, `PromoteReplica`, `RestoreBackup`, `RotateServerCa`, `TruncateLog`, `DemoteMaster`, `AddServerCa`, `ResetSslConfig`, `CreateEphemeral` |
| Default per region | `sqladmin.googleapis.com/default_per_region` | 180 | `Export`, `Failover`, `Restart`, `StartReplica`, `StopReplica` |
| Default (global, per user) | `sqladmin.googleapis.com/default` | 180 | `SqlFlagsService.List`, `SqlTiersService.List` |

Exceeding returns HTTP `429` with reason `rateLimitExceeded`; quotas refill over 60-second intervals. Daily quotas replenish at midnight Pacific Time. The Quotas page shows only project-level usage, not per-user.

### Limits

| Limit | Value |
|-------|-------|
| Instances per project | New network architecture 1,000; old 100; mixed between 100 and 1,000. Read replicas count. Increase via support case |
| Instances per network (recommendation) | Below 500 (forwarding rule quota) |
| PostgreSQL `max_connections` upper bound | Sum of `max_connections`, `autovacuum_max_workers`, `max_worker_processes` cannot exceed `262142`; replica value must be >= primary |
| SQL Server user connections | Max 32,767 |
| IAM database authentication login quota | 12,000 per minute per instance (successful and unsuccessful) |
| MySQL tables | 50,000 default; 500,000 with at least 32 cores and 200 GB memory (beyond is outside the SLA); 16 TB table cap with `innodb_file_per_table` |
| PostgreSQL table size | 32 TB |
| Storage | Dedicated core up to 64 TB; shared core up to 3 TB |
| `ExecuteSql` REST API | 10 concurrent queries per instance; 100 queries per minute per project per region; request 512 KiB, response 10 MiB |
| PostgreSQL metrics | Up to 500 databases; beyond that aggregated as `__ALL__` |
| Saved queries (Preview) | 10,000 per project; 1 MiB per query |
| App Engine standard | 100 concurrent connections per instance (60 for PHP 5.5) |
| Cloud Run built-in connection | 100 connections per Cloud SQL database per container instance (not for Auth Proxy sidecar, language connectors, direct IP) |
| Cloud Run functions | 1st gen one execution per instance; 2nd gen 100 connections per instance |

### Mitigations for `429` errors

Client-side caching of instance metadata (avoid repeated `SqlInstancesService.Get`), exponential backoff with jitter, dedicated service accounts per workload, request a quota increase. To find the culprit use Metrics Explorer with `serviceruntime.googleapis.com/api/request_count`, filters `response_code = 429` and `service = sqladmin.googleapis.com`, grouped by `credential_id`.

## Notes

- Source inconsistency: this page gives shared-core storage as up to 3 TB; https://docs.cloud.google.com/sql/docs/postgres/instance-settings gives up to 3054 GB with a shared vCPU.
- Creating or increasing storage to 64 TB might increase latency of operations such as backups.
- Quotas don't guarantee resource availability in a region. Quota increase requests are free; make them days in advance (Console **Quotas** page, filter **Cloud SQL Admin API**).
- Forwarding rule quota hits can fail create, update (network switch) and maintenance operations.
- If MySQL tables exceed defaults, upgrade to Enterprise Plus, add memory, or lower `innodb_buffer_pool_size`; tune `table_open_cache` and `table_definition_cache`.
- The source repeats the storage, App Engine, Cloud Run and Cloud Run functions limit sections at the end of the page; they are listed once here. The console step lists were omitted.
- Source: https://docs.cloud.google.com/sql/docs/quotas (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [best-practices.md](./best-practices.md)
- [storage-options-overview.md](./storage-options-overview.md)
