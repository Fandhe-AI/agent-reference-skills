---
source: https://docs.cloud.google.com/sql/docs/extended-support
---

# Extended support in Cloud SQL

Paid extended support for Cloud SQL for MySQL and PostgreSQL major versions that reached community end-of-life. Instances are enrolled automatically and charged in addition to regular instance cost starting May 1, 2025.

## Signature / Usage

Versions in extended support as of the retrieval date (per https://docs.cloud.google.com/sql/docs/db-versions): PostgreSQL 9.6, 10, 11, 12 (since February 1, 2025) and 13 (since February 1, 2026); MySQL 5.6, 5.7 (since February 1, 2025). Upgrading to a major version in regular support ends the charges. Snippet taken from https://docs.cloud.google.com/sql/docs/postgres/create-instance (a version identifier passed to `--database-version`):

```bash
  gcloud sql instances create myinstance \
  --database-version=POSTGRES_16 \
  --tier=db-perf-optimized-N-4 \
  --edition=ENTERPRISE_PLUS \
  --region=us-central1
```

## Options / Props

| Topic | Rule |
|-------|------|
| Benefits | Patches for all critical and high severity CVEs; fixes for bugs in Cloud SQL-maintained code; edition-specific SLA coverage if eligibility criteria are met; new instances on extended-support major versions can be created |
| Not included | Features and service improvements implemented after the end of regular support |
| Notification | Console and email notifications three months before extended support (and billing) starts |
| Enrollment | At the Cloud SQL EOL date, three months after community EOL (MySQL 5.6 and PostgreSQL 9.6 start later); automatic, no action needed |
| Duration | Three years; then the major version is deprecated and instances are upgraded to the default major version during regular maintenance |
| Pricing | Additional to instance cost (Cloud SQL pricing page). Charges were waived Feb 1 through Apr 30, 2025 |
| Opt out | Upgrade (in-place major version upgrade, or migrate data) to a major version in regular support; charges stop after the upgrade, whether manual or automatic |

## Notes

- Upgrade before the extended support period starts to avoid charges.
- Viewing instances in extended support: filter by **Type** (major version) on the Cloud SQL Instances page for a project, or use **Products & versions** in Database Center for an organization (console steps omitted).
- Source: https://docs.cloud.google.com/sql/docs/extended-support (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sql/docs/db-versions (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sql/docs/postgres/create-instance (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [db-versions.md](./db-versions.md)
- [operational-guidelines.md](./operational-guidelines.md)
