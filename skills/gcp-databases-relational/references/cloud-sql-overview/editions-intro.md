---
source: https://docs.cloud.google.com/sql/docs/postgres/editions-intro
---

# Introduction to Cloud SQL editions (PostgreSQL)

Cloud SQL editions are a tier-based pricing model. Enterprise Plus edition gives the best performance, availability and observability; Enterprise edition provides all core capabilities for less stringent requirements.

## Signature / Usage

Set the edition with `--edition` when creating an instance. Snippets taken from https://docs.cloud.google.com/sql/docs/postgres/create-instance.

Enterprise Plus edition:

```bash
    gcloud sql instances create INSTANCE_NAME \
    --database-version=DATABASE_VERSION \
    --region=REGION \
    --tier=TIER \
    --edition=ENTERPRISE_PLUS
```

Enterprise edition:

```bash
    gcloud sql instances create INSTANCE_NAME \
    --database-version=DATABASE_VERSION \
    --region=REGION \
    --cpu=NUMBER_CPUS \
    --memory=MEMORY_SIZE \
    --edition=ENTERPRISE
```

In the console, Enterprise Plus is selected by default for a new primary. A read replica created without an edition inherits the primary's edition. Enterprise Plus enables data cache automatically; C4D does not support it, so add `--no-enable-data-cache` when creating an Enterprise Plus instance on C4D (8 vCPUs or larger).

## Options / Props

### Default edition (when none is specified with gcloud CLI or Cloud SQL Admin API)

| Default edition | Database versions |
|---|---|
| Enterprise Plus (`ENTERPRISE_PLUS`) | PostgreSQL 16, 17, 18 (`POSTGRES_16`, `POSTGRES_17`, `POSTGRES_18`) |
| Enterprise (`ENTERPRISE`) | PostgreSQL 9.6, 10, 11, 12, 13, 14, 15 (`POSTGRES_9_6`, `POSTGRES_10`, `POSTGRES_11`, `POSTGRES_12`, `POSTGRES_13`, `POSTGRES_14`, `POSTGRES_15`) |

### Edition comparison

| Feature | Enterprise Plus | Enterprise |
|---------|-----------------|------------|
| Database versions | PostgreSQL 12, 13, 14, 15, 16, 17, 18 | PostgreSQL 9.6, 10, 11, 12, 13, 14, 15, 16, 17, 18 |
| Availability SLA | 99.99% (includes maintenance) | 99.95% (excludes maintenance) |
| Machine series | N2, C4A, C4, C4D | General purpose shared core, general purpose dedicated core, N4 |
| N2 limits | Up to 128 vCPU, 864 GB RAM, 1:8 | n/a |
| C4A limits | Up to 72 vCPU, 576 GB RAM, 1:8 | n/a |
| C4 limits | Up to 8 vCPU, 62 GB RAM, 1:7.5 to 1:7.75 | n/a |
| C4D limits | Up to 192 vCPU, 1,512 GB RAM, 1:7.5 to 1:7.875 | n/a |
| Shared core | n/a | 1 vCPU, up to 1.7 GB RAM, 1:6.5 |
| Dedicated core | n/a | Up to 96 vCPU (80 in select regions), up to 624 GB RAM, 1:6.5 |
| N4 | n/a | Up to 80 vCPU, up to 624 GB RAM, 1:8 |
| Data cache | Yes | No |
| Point-in-time log retention | Up to 35 days | Up to 7 days |
| Read pools | Yes | No |
| Maintenance downtime | < 1 second | < 30 seconds |
| Planned operations downtime | Sub-second | Few minutes |
| Advanced DR / write endpoint / write endpoint connectivity | Yes | No |
| Managed Connection Pooling | Yes | No |
| AI-assisted troubleshooting | Yes | No |
| Query insights | 30 day retention, 1 MB query length (per this page; the query insights page gives 100 KB, see Notes), 200 query plan samples, wait event analysis, index advisor | 7 day retention, 4500 bytes query length, 20 query plan samples |
| Enhanced recommenders | Yes | No |

## Notes

- Enterprise Plus enhancements: up to 4x read performance (data cache on local SSD), up to 2x write latency improvement, engine autotuning, Hyperdisk enhanced storage, managed read pools; near-zero downtime for maintenance and planned operations; advanced DR with cross-regional replication; Managed Connection Pooling; query insights, enhanced metrics, AI-assisted troubleshooting.
- Upgrade to Enterprise Plus with in-place upgrade (sub-second downtime); the instance keeps its configuration. You can also switch back to Enterprise. Editions can be mixed. Enterprise Plus is available for MySQL, PostgreSQL and SQL Server.
- Instances that existed before the July 12, 2023 launch were converted to Enterprise edition automatically (same price and capabilities as of that date).
- Enterprise Plus supports PostgreSQL 12–18 but is the default only for 16+ (the source's table cell says so).
- `--cpu`/`--memory` are not compatible with Enterprise Plus (gcloud help); keep `--edition=ENTERPRISE` on the Enterprise command, since PostgreSQL 16+ defaults to Enterprise Plus.
- Source inconsistency: this page (https://docs.cloud.google.com/sql/docs/postgres/editions-intro) gives Enterprise maintenance downtime as < 30 seconds; https://docs.cloud.google.com/sql/docs/postgres/instance-settings says non-Enterprise-Plus maintenance downtime is typically 60 seconds or less.
- Source inconsistency: this page gives the Enterprise Plus query insights query length as 1 MB, while https://docs.cloud.google.com/sql/docs/postgres/using-query-insights (retrieved 2026-11-16) gives a 100 KB query length limit maximum and a configurable `--insights-config-query-string-length` range of `1024` to `100000` bytes (default `10000`) for Enterprise Plus; Enterprise is 4500 bytes on both pages. Use the query insights page's values when setting the length (see `database-center-insights/query-insights.md`).
- Source inconsistency: N4 maximum memory is 624 GB here and 640 GB in https://docs.cloud.google.com/sql/docs/postgres/machine-series-overview.
- Source: https://docs.cloud.google.com/sql/docs/postgres/editions-intro (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sql/docs/postgres/create-instance (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sql/docs/postgres/machine-series-overview (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sql/docs/postgres/using-query-insights (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0; the query length limits)

## Related

- [machine-series-overview.md](./machine-series-overview.md)
- [storage-options-overview.md](./storage-options-overview.md)
- [db-versions.md](./db-versions.md)
