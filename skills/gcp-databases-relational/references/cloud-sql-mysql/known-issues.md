---
source: https://docs.cloud.google.com/sql/docs/mysql/known-issues
---

# Known issues for Cloud SQL for MySQL

Known issues with Cloud SQL for MySQL and how to avoid or recover from them: durability, connections, administration, import/export, log retention, upgrades, InnoDB page compression, and Monitoring/Logging region names.

## Signature / Usage

### Check the SQL mode before importing

The SQL Mode affects how Cloud SQL interprets queries. Cloud SQL enables Strict SQL by default, so importing a dump from a database without Strict SQL can fail. Use the same SQL Mode on import as on export.

```sql
SELECT @@GLOBAL.sql_mode;
```

### Export CSV with the escape character fix

CSV export of NULLs yields `"N` by default, which can leave unbalanced quotes; a newline in text adds a trailing quote. Importing such a file treats the value as `"NULL"`. Override the default when exporting with `--escape="5C"` (a flag of `gcloud sql export csv`).

## Options / Props

| Area | Issue | Mitigation |
|------|-------|------------|
| Durability (5.7 only) | Generated columns might corrupt data (MySQL bug #82736) | Avoid generated columns on 5.7 |
| Connections | Expired server SSL/TLS certificate | Console: instance > Connections > Security tab; add a new certificate and rotate |
| Connections | Old Auth Proxy version | Keep the Auth Proxy current |
| Connections | Connecting to a nonexistent instance reports only "not authorized" | Check project and instance name |
| Create instance | `Failed to create subnetwork. Router status is temporarily unavailable. Please try again later.` | Retry creation |
| Administration | Only one long-running import or export per instance at a time | Plan operations; you can cancel an operation |
| Administration | MySQL auto-commits each DDL statement; a cancelled import keeps completed steps | Clean up data manually |
| Import/export | `DEFINER` clause may fail import if the definer is a SUPER or system user different from the importing user | See DEFINER guidance in import-export |
| Import/export | Databases of 500 GB or more take a long time; other operations (e.g. backup) are unavailable meanwhile | Consider restoring a previous backup via `gcloud` or API |
| Import/export | Cloud Storage max single object is 5 TiB; export fails only if the *compressed* export file exceeds 5 TiB | Split the export into smaller segments; with standard export consider parallel export (fails if any table's compressed file exceeds 5 TiB) |
| Logs | Transaction logs are purged once daily, not continuously | Set number of backups to at least one more than days of log retention (7 days + 7 backups keeps between 6 and 7 days) |
| Upgrade | DMS upgrade 5.7 to 8.0: stored procedures in the `mysql` database may not be copied and may not be creatable there | Avoid keeping stored procedures in `mysql` |
| InnoDB page compression | Can slow updates on frequently updated tables | Test with and without; LZ4 for text, ZLIB for binary; avoid compression for frequently updated data |
| Monitoring / Logging | `us-central1` shown as `us-central`, `europe-west1` as `europe`, `asia-east1` as `asia` (Alerting, Metrics Explorer, Cloud Logging) | In Alerting and Metrics Explorer use the system metadata label `region` instead of the `cloudsql_database` resource label `region` |

## Notes

- MySQL variant; the PostgreSQL counterpart is https://docs.cloud.google.com/sql/docs/postgres/known-issues.
- Review also Operational Guidelines (https://docs.cloud.google.com/sql/docs/mysql/operational-guidelines) and Diagnosing Issues (https://docs.cloud.google.com/sql/docs/mysql/diagnose-issues).
- Snippet taken from https://docs.cloud.google.com/sql/docs/mysql/import-export (the `SELECT @@GLOBAL.sql_mode;` query; the known-issues page has no code block). The `--escape="5C"` flag value is quoted inline from the known-issues text.
- Source inconsistency: this page says you can cancel an import or export operation (https://docs.cloud.google.com/sql/docs/mysql/import-export/cancel-import-export), while the import-export best practices page says you can't stop a long-running Cloud SQL instance operation.
- Source: https://docs.cloud.google.com/sql/docs/mysql/known-issues (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sql/docs/mysql/import-export (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [import-export.md](./import-export.md)
- [upgrade-minor-db-version.md](./upgrade-minor-db-version.md)
- [features.md](./features.md)
