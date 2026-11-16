---
source: https://docs.cloud.google.com/sql/docs/db-versions
---

# Database versions and version policies

Cloud SQL's supported major/minor versions and the support lifecycle (regular support, extended support, deprecation). All instances on community end-of-life (EOL) MySQL/PostgreSQL major versions are enrolled in extended support and charged starting May 1, 2025.

## Signature / Usage

The gcloud CLI and Cloud SQL Admin API identify versions as `POSTGRES_9_6`, `POSTGRES_10` … `POSTGRES_18` (per https://docs.cloud.google.com/sql/docs/postgres/editions-intro). Snippet taken from https://docs.cloud.google.com/sql/docs/postgres/create-instance (a version identifier passed to `--database-version`):

```bash
  gcloud sql instances create myinstance \
  --database-version=POSTGRES_16 \
  --tier=db-perf-optimized-N-4 \
  --edition=ENTERPRISE_PLUS \
  --region=us-central1
```

## Options / Props

### PostgreSQL

| Major | Minor | Regular support start | Extended support start | Deprecation |
|-------|-------|-----------------------|------------------------|-------------|
| 18 (default) | 18.6 | September 25, 2025 | - | - |
| 17 | 17.11 | October 22, 2024 | February 1, 2030 | February 1, 2033 |
| 16 | 16.15 | June 7, 2024 | February 1, 2029 | February 1, 2032 |
| 15 | 15.19 | May 24, 2023 | February 1, 2028 | February 1, 2031 |
| 14 | 14.24 | November 11, 2021 | February 1, 2027 | February 1, 2030 |
| 13 | 13.23 | November 5, 2020 | February 1, 2026 | February 1, 2029 |
| 12 | 12.22 | May 21, 2020 | February 1, 2025* | February 1, 2028 |
| 11 | 11.22 | September 27, 2019 | February 1, 2025* | February 1, 2028 |
| 10 | 10.23 | March 27, 2020 | February 1, 2025* | February 1, 2028 |
| 9.6 | 9.6.24 | April 1, 2018 | February 1, 2025* | February 1, 2028 |

### MySQL

| Major | Minor | Regular support start | Extended support start | Deprecation |
|-------|-------|-----------------------|------------------------|-------------|
| 9.7 | 9.7.2 | August 6, 2026 | Not applicable | Not applicable |
| 8.4 (default) | 8.4.11 | October 1, 2024 | Not applicable | Not applicable |
| 8.0 | 8.0.46 (default), 8.0.45 ... 8.0.18 (listed in source) | August 30, 2020 | January 1, 2027 | July 1, 2029 |
| 5.7 | 5.7.44 | August 1, 2016 | February 1, 2025* | February 1, 2028 |
| 5.6 | 5.6.51 | August 1, 2016 | February 1, 2025* | February 1, 2028 |

### SQL Server (support start / mainstream end / extended end)

| Major | Minor | Support start | Mainstream end | Extended end |
|-------|-------|---------------|----------------|--------------|
| 2025 (Standard, Enterprise, Express) | CU2 | November 18, 2025 | January 6, 2031 | January 6, 2036 |
| 2022 (Standard, Enterprise, Express, Web) | CU19 | June 26, 2023 | January 11, 2028 | January 11, 2033 |
| 2019 (Standard, Enterprise, Express, Web) | CU32 | June 24, 2021 | February 28, 2025 | January 8, 2030 |
| 2017 (Standard, Enterprise, Express, Web) | CU31 | February 19, 2020 | October 11, 2022 | October 13, 2027 |

\* From May 1, 2025, instances on EOL major versions are charged for extended support; upgrade to avoid charges. SQL Server dates follow the Microsoft lifecycle and Cloud SQL doesn't charge extended support for SQL Server. From April 12, 2027 new SQL Server 2017 instances can't be created; SQL Server 2017 reaches EOL October 13, 2027 and Cloud SQL stops supporting it afterward.

### Lifecycle rules

| Phase | Rule |
|-------|------|
| New major version | Supported within five months of community GA |
| Regular support | Minor version and maintenance updates, security fixes, as long as the community supports it |
| Extended support | MySQL/PostgreSQL only; three years after community EOL |
| Deprecation | Instances auto-upgraded to the default major/minor version; notice to project owners at least 12 months before (for MySQL/PostgreSQL at the end of the second year of extended support) |
| New minor version | Supported within three months of community GA; existing instances upgraded at the next maintenance rollout |

### Version format

MySQL: first two numbers = major (5.7.13 -> 5.7, minor 13). PostgreSQL 9.6: 9.6 major; PostgreSQL 10+: first number is major. SQL Server: year (+edition) is major, Cumulative Update is minor (2022 Enterprise CU11).

## Notes

- MySQL 8.0 provisions on the default minor version (one earlier than the latest). Automatic minor version upgrade is supported for 8.0.35 or later, on by default when no minor version is specified, and happens only during scheduled maintenance (not self-service maintenance). On 8.0.34 or earlier upgrade manually first.
- Source inconsistency: the lifecycle rule gives three years of extended support, but the MySQL 8.0 row runs from January 1, 2027 (extended support start) to July 1, 2029 (deprecation); the per-version dates in the tables are the ones to plan against (see `extended-support.md`).
- If no database version is specified at creation, the default version is used. Cloud SQL might not support every community minor version.
- Console steps to see/filter instance versions and the Database Center fleet view are omitted.
- Source: https://docs.cloud.google.com/sql/docs/db-versions (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sql/docs/postgres/editions-intro (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sql/docs/postgres/create-instance (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [extended-support.md](./extended-support.md)
- [editions-intro.md](./editions-intro.md)
