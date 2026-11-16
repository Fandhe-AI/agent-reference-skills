---
source: https://docs.cloud.google.com/sql/docs/sqlserver/editions-intro
---

# Introduction to Cloud SQL for SQL Server editions

Cloud SQL editions are a tier-based pricing model. Enterprise Plus gives the best performance, availability and observability; Enterprise provides all core capabilities for less stringent requirements.

## Signature / Usage

### Choosing an edition

When you create a primary instance with the gcloud CLI or the Cloud SQL Admin API without specifying an edition, the default is Enterprise for every supported SQL Server version. Enterprise Plus has no default; you must specify it explicitly for SQL Server 2019 Enterprise, 2022 Enterprise or 2025 Enterprise. The Google Cloud console selects Enterprise Plus by default for a new primary instance. A read replica created without an edition inherits the primary's edition.

Default edition by database version, from the source: Cloud SQL Enterprise Plus edition (`ENTERPRISE_PLUS`) is the default for no version; to create an Enterprise Plus instance for SQL Server 2019 Enterprise, SQL Server 2022 Enterprise or SQL Server 2025 Enterprise, you must explicitly specify `ENTERPRISE_PLUS`. Cloud SQL Enterprise edition (`ENTERPRISE`) is the default for all supported SQL Server versions (2017, 2019, 2022 and 2025).

### Moving between editions

Use in-place upgrade to upgrade to Enterprise Plus (sub-second downtime, existing configuration retained) or to switch back to Enterprise: https://docs.cloud.google.com/sql/docs/sqlserver/upgrade-cloud-sql-instance-to-enterprise-plus-in-place

Snippet taken from https://docs.cloud.google.com/sql/docs/postgres/upgrade-cloud-sql-instance-to-enterprise-plus-in-place (the PostgreSQL in-place upgrade page; `MACHINE_TYPE` is an Enterprise Plus machine type):

```bash
gcloud sql instances patch INSTANCE_ID \
  --edition=enterprise-plus \
  --tier=MACHINE_TYPE \
  --project=PROJECT_ID
```

## Options / Props

| Capability | Enterprise Plus | Enterprise |
|------------|-----------------|------------|
| Database versions | SQL Server 2025 / 2022 / 2019 Enterprise | 2025 (Standard, Enterprise, Express); 2022 and 2019 (Standard, Enterprise, Express, Web); 2017 (Standard, Enterprise, Express, Web) |
| Availability SLA | 99.99% (includes maintenance) | 99.95% (excludes maintenance) |
| Machine series | N2, Memory-optimized-N2, C4, C4D | General purpose dedicated core, N4 |
| N2 limits | Up to 128 vCPU, 864 GB RAM, 1:8 | n/a |
| Memory-optimized-N limits | Up to 16 vCPU, 512 GB RAM, 1:32 | n/a |
| C4 limits | Up to 8 vCPU, 62 GB RAM, 1:7.5 to 1:7.75 | n/a |
| C4D limits | Up to 192 vCPU, 1,512 GB RAM, 1:7.5 to 1:7.875 | n/a |
| General purpose dedicated core | n/a | Up to 96 vCPU (up to 80 vCPU in select regions), 624 GB RAM, 1:6.5 |
| N4 limits | n/a | Up to 80 vCPU, 624 GB RAM, 1:8 |
| Data cache | Yes | No |
| Point-in-time log retention | Up to 35 days | Up to 7 days |
| Maintenance downtime | < 1 second | < 120 seconds |
| Planned operations downtime | Sub-second | Few minutes |
| Advanced DR / write endpoint / write endpoint connectivity | Yes | No |
| AI-assisted troubleshooting, enhanced recommenders | Yes | No |
| Query insights | 30 day retention, 1 MB query length (per this page; the SQL Server query insights page gives 20 KB, see Notes), 200 query plan samples max, wait event analysis, index advisor | 7 day retention, 4500 bytes query length, 20 query plan samples max |

## Notes

- Source: https://docs.cloud.google.com/sql/docs/sqlserver/editions-intro (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- SQL Server variant of the editions page; PostgreSQL counterpart: https://docs.cloud.google.com/sql/docs/postgres/editions-intro. Enterprise Plus is supported on MySQL, PostgreSQL and SQL Server.
- Managed SQL Server edition model; distinct from the Node.js client `mssql` skill (client code only, no edition concept).
- Source inconsistency: this page gives the Enterprise Plus query insights query length as 1 MB, while https://docs.cloud.google.com/sql/docs/sqlserver/using-query-insights (retrieved 2026-11-16) gives a 20 KB query length limit maximum (`--insights-config-query-string-length` from `256` to `20480` bytes, default `10240`) for Enterprise Plus and 4500 bytes (`256` to `4500`, default `1024`) for Enterprise. The same page lists Enterprise Plus query insights for SQL Server Enterprise 2019 or 2022 only (2025 Enterprise isn't listed) and says Enterprise query insights isn't supported on SQL Server Express instances. Use the query insights page's values when setting the length.
- SQL Server 2017: from April 12, 2027 new instances can't be created; on October 13, 2027 it reaches end of life and Cloud SQL stops supporting it.
- Instances that existed before editions launched (August 1, 2024) were updated to Enterprise automatically at the same price.
- The editions page has no code block. Snippet taken from https://docs.cloud.google.com/sql/docs/postgres/upgrade-cloud-sql-instance-to-enterprise-plus-in-place (PostgreSQL page; the SQL Server in-place upgrade page was not retrieved). `--edition` takes `enterprise` or `enterprise-plus` (gcloud sql instances patch help).
- Engine scope of the borrowed command: on SQL Server, Enterprise Plus supports only SQL Server 2019, 2022 and 2025 Enterprise (Database versions row above), so `--edition=enterprise-plus` applies only to instances on those database versions; Standard, Express and Web instances stay on Enterprise.
- `--tier=MACHINE_TYPE` changes the machine type of the instance; check the SQL Server in-place upgrade page for supported machine types and try the change on a disposable instance first.
- Source: https://docs.cloud.google.com/sql/docs/postgres/upgrade-cloud-sql-instance-to-enterprise-plus-in-place (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sql/docs/sqlserver/using-query-insights (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0; the query insights limits in the source inconsistency note)

## Related

- [features.md](./features.md)
- [high-availability.md](./high-availability.md)
- [replication.md](./replication.md)
