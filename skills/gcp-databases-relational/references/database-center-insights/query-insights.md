---
source: https://docs.cloud.google.com/sql/docs/postgres/using-query-insights
---

# Use query insights (Cloud SQL for PostgreSQL) and AlloyDB query insights overview

Query insights detects, diagnoses and prevents query performance problems: database load by query, tag, user, database and client address, sampled query plans, end-to-end traces and latency percentiles. This page covers Cloud SQL for PostgreSQL (Enterprise and Enterprise Plus editions) and the AlloyDB query insights overview.

## Signature / Usage

### Enable (gcloud)

```bash
    gcloud sql instances patch INSTANCE_ID \
    --insights-config-query-insights-enabled
```

Optional flags in the source: `--insights-config-record-client-address`, `--insights-config-record-application-tags`, `--insights-config-query-string-length`, `--insights-config-query-plans-per-minute`. Replace `INSIGHTS_CONFIG_QUERY_STRING_LENGTH` (the query string length to store, in bytes) and `QUERY_PLANS_PER_MINUTE` (the maximum query plan sampling rate; see the limits under Options / Props).

Adapted (not in the official docs): removed --region=REGION (not a flag of gcloud sql instances patch) and --tier=API_TIER_STRING (sets the machine type per `gcloud sql instances patch --help`; not needed to enable insights).

```bash
gcloud sql instances patch INSTANCE_ID \
--insights-config-query-insights-enabled \
--insights-config-query-string-length=INSIGHTS_CONFIG_QUERY_STRING_LENGTH \
--insights-config-query-plans-per-minute=QUERY_PLANS_PER_MINUTE \
--insights-config-record-application-tags \
--insights-config-record-client-address
```

### Disable (gcloud)

Disabling does not delete data from disk.

```bash
gcloud sql instances patch INSTANCE_ID \
  --no-insights-config-query-insights-enabled
```

### Tag queries (sqlcommenter)

With a supported ORM, sqlcommenter adds tags automatically. Without one, add a comment with key-value pairs using at least one of `action`, `controller`, `framework`, `route`, `application`, `db driver`; all other keys are dropped. Tags appear in logs like:

```sql
SELECT * from USERS /*action='run+this',
controller='foo%3',
traceparent='00-01',
tracestate='rojo%2'*/
```

### Normalized query form

PostgreSQL 11 and later replace constants with `$1`, `$2`, ... (9.6 and 10 use `?`).

```sql
  UPDATE
    "demo_customer"
  SET
    "customer_id" = $1::uuid,
    "name" = $2,
    "address" = $3,
    "rating" = $4,
    "balance" = $5,
    "current_city" = $6,
    "current_location" = $7
  WHERE
    "demo_customer"."id" = $8
```

## Options / Props

### Enterprise vs Enterprise Plus

| Area | Enterprise edition | Enterprise Plus edition |
| --- | --- | --- |
| Database versions | PostgreSQL 9.6 or later | PostgreSQL 12 or later |
| Machine types | All | Not on shared-core or read replica instances |
| Metrics retention | 7 days | 30 days |
| Query length limit maximum | 4500 bytes | 100 KB |
| Query plan sample maximum | 20 | 200 |
| Wait event analysis, index advisor, terminate sessions in active queries, AI-assisted troubleshooting (Preview) | Not available | Available |
| Query cardinality | Top 100 queries per day by client IP, database, application tag, username and query text | Top 4,000 queries per minute by application tag, database, username and query ID |

### Console settings

| Setting | Enterprise | Enterprise Plus |
| --- | --- | --- |
| Enable Enterprise Plus features | Not available | Default: disabled |
| Active query analysis | Default: disabled | Default: disabled |
| Index advisor recommendations | Not available | Default: disabled |
| AI-assisted troubleshooting (Preview, console only) | Not available | Default: disabled |
| Store client IP addresses | Default: disabled | Default: disabled |
| Store application tags | Default: disabled | Default: disabled |
| Customize query lengths | `256` to `4500` bytes, default `1024` | `1024` to `100000` bytes, default `10000` |
| Maximum sampling rate (query plans per minute, across all databases; `0` disables) | `0` to `20`, default `5` | up to `200`, default `200` |

### Required roles and prerequisites

| Item | Value |
| --- | --- |
| Roles on the project hosting the instance | `roles/databaseinsights.viewer` (Database Insights viewer) and `roles/cloudsql.viewer` (Cloud SQL viewer) |
| API | Cloud Trace API enabled (for query plans and end-to-end views) |
| Enterprise Plus | Automatic storage increases must stay enabled (default); you cannot disable it and enable Enterprise Plus insights |

### Database load categories

| Category | Meaning |
| --- | --- |
| CPU capacity | Number of CPUs on the instance |
| CPU and CPU Wait | Ratio of active query time to wall-clock time (can exceed the max core line) |
| IO Wait | Ratio of time waiting for IO (read and write) |
| Lock Wait | Ratio of time waiting for locks, LwLocks and buffer pin locks |

### Storage and AlloyDB facts

| Topic | Cloud SQL | AlloyDB |
| --- | --- | --- |
| Cost | No additional cost | No additional cost; one week of data on the dashboard |
| Storage | Enterprise: metrics in Cloud Monitoring, no instance storage. Enterprise Plus: on instance disk, about 36 GB for 7 days and 155 GB for 30 days; up to 10 MB shared RAM | No instance storage; metrics in Cloud Monitoring, traces in Cloud Trace; 12 MB RAM at default 1024-byte query string |
| Compatibility | See Cloud SQL regions | All machine types and all regions |

## Notes

- By default only completed queries are shown; use active queries to monitor running queries.
- Enabling Enterprise Plus insights on PostgreSQL maintenance version `20250302.00_RC30` or earlier restarts the instance (operations suspended for several minutes); `20250302.00_RC31` or later does not need a restart. Enabling index advisor on RC30 or earlier also restarts. Changing the query length limit on RC31 or later needs no restart. Try changes on a disposable instance first.
- Corrected from the official docs: the original ended with "--tier=API_TIER_STRING \ --region=REGION". `gcloud sql instances patch` has no `--region` flag, and `--tier` changes the machine type.
- Snippet taken from https://docs.cloud.google.com/alloydb/docs/using-query-insights (the sqlcommenter log example); Source inconsistency: the Cloud SQL page renders the comment as "/action=…/" without the asterisks.
- Client IP tracking is not supported with Managed Connection Pooling (ports `3307` and `6432` show `local`). Changing client IPs can create gaps in charts; restart or disable client IP tracking.
- Limitations (Enterprise Plus): slow or timed-out queries under heavy load; restoring an older backup loses metrics since the backup; PostgreSQL 18 with maintenance version earlier than `20260319.00_RC02` may not store application tags when comment tags precede the SQL statement.
- Query insights stores only normalized queries; query plan traces store no constants. By default Cloud SQL does not collect IP addresses or tags unless enabled; AlloyDB collects IP addresses and tags by default.
- AlloyDB limitations: with more than about 100 client addresses only the top cumulative execution time ones are captured; client traffic changes can cause temporary metric gaps.
- AlloyDB integrates with APM tools via OpenCensus / OpenTelemetry and the Cloud Monitoring and Cloud Trace APIs.
- Metric types for Cloud SQL start with `database/postgresql/insights`.
- The source also shows Console steps, REST (`instances.patch` with `insightsConfig`), PowerShell and Terraform forms, and the multi-instance enable dialog.
- Managed PostgreSQL on Google Cloud, distinct from Supabase Postgres (`supabase`), Cloudflare D1 / Hyperdrive (`cloudflare-storage`), and the clients `mssql` / `drizzle`.
- Source: https://docs.cloud.google.com/sql/docs/postgres/using-query-insights (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/alloydb/docs/query-insights-overview (retrieved 2026-11-16)
- Source: https://docs.cloud.google.com/alloydb/docs/using-query-insights (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [database-center.md](./database-center.md)
