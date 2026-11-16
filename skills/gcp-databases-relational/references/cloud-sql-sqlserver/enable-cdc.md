---
source: https://docs.cloud.google.com/sql/docs/sqlserver/replication/enable-cdc
---

# Enable change data capture (CDC) in Cloud SQL for SQL Server

Change data capture records changes to SQL Server tables. The `sqlserver` user turns CDC on per database with Cloud SQL stored procedures in `msdb`, then a `dbo` user enables tracking per table with the standard `sys.sp_cdc_*` procedures.

## Signature / Usage

CDC is available on SQL Server 2017, 2019 and 2022 Standard and Enterprise.

### Turn CDC on or off for a database

```sql
EXEC msdb.dbo.gcloudsql_cdc_enable_db 'DATABASE_NAME'
```

```sql
EXEC msdb.dbo.gcloudsql_cdc_disable_db 'DATABASE_NAME'
```

Turning CDC off for a database is expected to delete the change data it has captured (see Notes); read or export any change data you still need first.

### Capture and cleanup jobs

The jobs are invisible to `sqlserver` in SSMS but viewable with `sys.sp_cdc_help_jobs` and modifiable with built-in procedures.

```sql
EXEC sys.sp_cdc_start_job @job_type = N'cleanup'
```

```sql
EXEC sys.sp_cdc_change_job  @job_type = N'capture',
        @maxtrans = 20,
        @pollinginterval = NULL,
        @maxscans = NULL,
        @continuous = NULL
```

### Track a table

```sql
EXEC sys.sp_cdc_enable_table
  @source_schema = N'dbo',
  @source_name = N'customer',
  @role_name = N'CDC'
```

Check whether CDC is enabled on a table:

```sql
EXECUTE sys.sp_cdc_help_change_data_capture
  @source_schema = N'dbo',
  @source_name = N'customer'
```

Query the change table, named `<schema>_<table_name>_CT` in the `cdc` schema:

```sql
SELECT * FROM cdc.dbo_customer_CT
```

### Capture instance and net changes

```sql
EXEC sys.sp_cdc_enable_table
    @source_schema = N'dbo',
    @source_name = N'customer',
    @role_name = N'CDC',
    @capture_instance = N'customer_cdc',
    @supports_net_changes = 1
```

```sql
DECLARE @from_lsn binary(10), @to_lsn binary(10)
SET @from_lsn = sys.fn_cdc_get_min_lsn(N'customer_cdc')
SET @to_lsn = sys.fn_cdc_get_max_lsn()
SELECT * FROM cdc.fn_cdc_get_all_changes_customer_cdc(@from_lsn, @to_lsn, N'all');
```

### Disable CDC for a table

Specify a capture instance, or `'all'`. The source example below uses `'all'`, which disables every capture instance on the table; to keep the others, pass a single capture instance name (for example `N'customer_cdc'` from the section above). Disabling drops the capture instance's change table and the change data in it (see Notes):

```sql
EXEC sys.sp_cdc_disable_table
  @source_schema = N'dbo',
  @source_name = N'customer',
  @capture_instance = N'all'
```

### Delete a CDC-enabled database

Disable CDC for the database first. Destructive: `DROP DATABASE` removes the database with all of its data, and disabling CDC first is expected to delete its captured change data; export the database (or confirm a backup you can restore to another instance) before running it.

Adapted (not in the official docs): the source writes `DROP DATABASE 'DATABASE_NAME'` with single quotes, which is not valid T-SQL for a database identifier; it is written with brackets here.

```sql
EXEC msdb.dbo.gcloudsql_cdc_disable_db 'DATABASE_NAME'
DROP DATABASE [DATABASE_NAME]
```

If open connections block the drop, list them, close them, disable CDC, then delete:

```sql
select db_name(dbid),* from sys.sysprocesses where db_name(dbid)= 'DATABASE_NAME'
```

## Notes

- Source: https://docs.cloud.google.com/sql/docs/sqlserver/replication/enable-cdc (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Adapted from the official docs: original fragment `DROP DATABASE 'DATABASE_NAME'`; corrected to `DROP DATABASE [DATABASE_NAME]`.
- SQL Server-specific page (CDC); no PostgreSQL counterpart was checked.
- Managed Cloud SQL CDC; distinct from the Node.js client `mssql` skill (client code only).
- `DROP DATABASE` is destructive; try it on a disposable database first.
- Not from the source: Microsoft's "Enable and disable change data capture" page (the page this Cloud SQL page links for disabling CDC, https://learn.microsoft.com/en-us/sql/relational-databases/track-changes/enable-and-disable-change-data-capture-sql-server, retrieved 2026-11-16) says disabling CDC for a database "removes all associated change data capture metadata, including the cdc user, schema and the change data capture jobs" (the `cdc` schema holds the change tables), and that `sys.sp_cdc_disable_table` removes a capture instance, which includes its change table. The Cloud SQL page doesn't describe what `gcloudsql_cdc_disable_db` removes; this page assumes the same behavior as `sys.sp_cdc_disable_db`. The export-first advice is editorial.
- Importing a CDC-enabled database keeps the `KEEP_CDC` flag and creates capture and cleanup jobs with default parameters.
- From April 12, 2027 new SQL Server 2017 instances can't be created; SQL Server 2017 reaches end of life on October 13, 2027.
- The `sys.sp_cdc_*` procedure options are described in Microsoft's documentation, not on this page.

## Related

- [replication.md](./replication.md)
- [users.md](./users.md)
