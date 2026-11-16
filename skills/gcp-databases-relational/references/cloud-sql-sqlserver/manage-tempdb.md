---
source: https://docs.cloud.google.com/sql/docs/sqlserver/manage-tempdb
---

# Manage the tempdb database in Cloud SQL for SQL Server

tempdb holds temporary tables, stored procedures and more, and is recreated on every restart (Cloud SQL re-grants the `sqlserver` user its permissions afterwards). The `sqlserver` user has `ALTER` permission on tempdb to manage files and sizes.

## Signature / Usage

### Add or remove a file

Use the `/var/opt/mssql/data/` directory for the physical path. Example values: `LOGICAL_FILENAME` `tempdev4`, `PHYSICAL_FILENAME` `/var/opt/mssql/data/tempdb4.ndf`, `SIZE` `1GB`.

```sql
ALTER DATABASE [tempdb] ADD FILE (NAME = LOGICAL_FILENAME, FILENAME = PHYSICAL_FILENAME, SIZE = SIZE)
```

```sql
ALTER DATABASE [tempdb] REMOVE FILE LOGICAL_FILENAME
```

Not from the source: SQL Server removes a file only when it is empty, so empty it first with the shrink procedure's `@empty_file` option (`EMPTYFILE`, see Options / Props); otherwise `REMOVE FILE` fails (Microsoft's `ALTER DATABASE` file options, https://learn.microsoft.com/en-us/sql/t-sql/statements/alter-database-transact-sql-file-and-filegroup-options).

### Shrink a file

`msdb.dbo.gcloudsql_tempdb_shrinkfile` gives the benefits of `DBCC SHRINKFILE`; run it, for example, from Cloud SQL Studio. Avoid shrinking as regular maintenance.

```sql
msdb.dbo.gcloudsql_tempdb_shrinkfile @filename = 'FILENAME'
```

With a target size in MB (runs `DBCC SHRINKFILE (@filename, 10)` for 10):

```sql
msdb.dbo.gcloudsql_tempdb_shrinkfile @filename = 'FILENAME', @target_size=TARGET_SIZE_INT
```

## Options / Props

| Parameter | Value | Effect (`DBCC SHRINKFILE`) |
|-----------|-------|----------------------------|
| `@filename` | File name, e.g. `tempdev` | Shrinks the file |
| `@empty_file` | 0 or 1 | If 1, passes `EMPTYFILE`; takes priority over other parameters |
| `@target_size` | Integer megabytes, greater than or equal to 0 | Passed as target size |
| `@truncateonly` | 0 or 1 | If 1, passes `TRUNCATEONLY`; target size is ignored; takes priority over `NOTRUNCATE` |
| `@no_truncate` | 0 or 1 | If 1, passes `NOTRUNCATE` |

Default file count: at least eight files for instances with eight or more logical processors; otherwise one file per logical processor.

## Notes

- Source: https://docs.cloud.google.com/sql/docs/sqlserver/manage-tempdb (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- SQL Server-specific page (tempdb); no PostgreSQL counterpart was checked.
- Managed Cloud SQL feature; distinct from the Node.js client `mssql` skill (client code only).
- Removing and shrinking tempdb files are disruptive; try them on a disposable instance first.
- The source also shows the `@empty_file`, `@truncateonly` and `@no_truncate` call forms; they are summarised in the table above.

## Related

- [users.md](./users.md)
- [features.md](./features.md)
