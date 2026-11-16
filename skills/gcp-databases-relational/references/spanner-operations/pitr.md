---
source: https://docs.cloud.google.com/spanner/docs/pitr
---

# Point-in-time recovery (PITR)

Spanner point-in-time recovery protects against accidental deletion or writes. If an operator inadvertently writes data or an application rollout corrupts the database, you can recover data from a point in the past, up to seven days. For longer-term retention use Backup and Restore or Export and Import.

## Signature / Usage

### Set the version retention period (PostgreSQL-dialect database)

```bash
gcloud spanner databases ddl update example-db \
    --instance=test-instance \
    --ddl="ALTER DATABASE \"example-db\" \
    SET spanner.version_retention_period = '7d';"
```

### View the retention period

```bash
gcloud spanner databases ddl describe example-db \
    --instance=test-instance
```

## Options / Props

| Item | Value |
|------|-------|
| Default version retention | 1 hour (all versions of data and schema) |
| Maximum version retention | 7 days |
| Setting | `version_retention_period` database option |
| Granularity of stored versions | Microseconds |
| Earliest recoverable time | `earliest_version_time` on the database |
| Additional charge | None; storage and compute costs might increase with longer retention; on-demand backup cost unaffected |

### Ways to recover data

| Scope | Method |
|-------|--------|
| A portion of the database | Stale read with a query condition and past timestamp, then write the results back to the live database (surgical fixes such as an accidentally deleted row) |
| A specific table | Export the table from an earlier timestamp within the same database, then import it back |
| The entire database | Backup or export the database specifying a past timestamp, then restore or import into a new database; can take several hours; you can't restore or import to an existing database |

### Performance considerations

| Effect | Guidance |
|--------|----------|
| Increased storage utilization | Set up storage alerts; storage grows gradually (increasing from 3 to 7 days needs 4 days to stabilize); estimate the increase before raising retention |
| Increased CPU usage and latency | Extra compute to compact and maintain earlier versions; monitor instance and database |
| Slower schema updates | Longer retention keeps schema versions longer; updates may be throttled (`UpdateDatabaseDdlMetadata.throttled`); follow schema update best practices and limits |

## Notes

- Source: https://docs.cloud.google.com/spanner/docs/pitr (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- PITR does not protect against a user accidentally deleting the database. Keep other recovery options, restrict roles that include `spanner.databases.drop`, and consider enabling database deletion protection.
- Destructive: writing recovered data back, importing, or restoring changes live data; try recovery steps on a disposable database first. Reducing a change stream's retention is a separate setting (see `change-streams.md`).
- For databases with a very high overwrite rate (multiple times per day), increase the retention period gradually while monitoring.
- Not from the source: lowering `version_retention_period` (for example from `7d` back to the 1-hour default) shortens the recovery window. Versions older than the new period become eligible for garbage collection, `earliest_version_time` moves forward, and stale reads, exports or backups can no longer target the earlier timestamps (reads older than the retention period fail with `FAILED_PRECONDITION`, see `timestamp-bounds.md`). Take a backup first if you might still need an older point in time.
- Source: https://docs.cloud.google.com/spanner/docs/use-pitr (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/spanner/docs/use-pitr. In the PostgreSQL-dialect statement, double quotes around the database name are required if it includes special characters such as a hyphen (GoogleSQL quotes identifiers with backticks). That page also shows Console, client library and restore/recover steps; they are not reproduced here.
- Source inconsistency: the gcloud example uses PostgreSQL-dialect syntax (`SET spanner.version_retention_period`) although the section links to the GoogleSQL DDL reference; for a GoogleSQL database use ``ALTER DATABASE `example-db` SET OPTIONS (version_retention_period = '7d')``, as in the source's `ddl describe` output and client samples.

## Related

- [backup.md](./backup.md)
- [fgac-about.md](./fgac-about.md)
- Recover data with PITR: https://docs.cloud.google.com/spanner/docs/use-pitr
