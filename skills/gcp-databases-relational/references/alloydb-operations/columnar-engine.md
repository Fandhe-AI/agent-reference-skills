---
source: https://docs.cloud.google.com/alloydb/docs/columnar-engine/about
---

# About the AlloyDB columnar engine

The columnar engine speeds up queries that scan, join and aggregate large data by keeping selected columns in memory in a column-oriented format. It works on primary and read pool instances; auto-columnarization can choose the columns, and transparent query forwarding can route read-only traffic to a read pool with the engine enabled.

## Signature / Usage

### Enable the engine (database flag)

The engine is enabled by setting the instance's `google_columnar_engine.enabled` flag to `on` (see Notes). Snippet taken from https://docs.cloud.google.com/alloydb/docs/instance-configure-database-flags:

```bash
   gcloud alloydb instances update INSTANCE_ID \
   --database-flags FLAGS_LIST \
   --region=REGION_ID \
   --cluster=CLUSTER_ID \
   --project=PROJECT_ID
```

Warning (source caution): this command overwrites all database flags previously set. Any flag not in the `--database-flags` list is reset to its default; include both current and new flags in the list.

### Manually refresh the column store

Snippet taken from https://docs.cloud.google.com/alloydb/docs/columnar-engine/configure (replace `TABLE_NAME` with the table or materialized view):

```sql
SELECT google_columnar_engine_refresh('TABLE_NAME');
```

## Options / Props

| Item | Value |
|---|---|
| Default column store memory | 30% of instance memory; 10% on a 1-vCPU instance |
| Enabling the engine | One-time operation; requires a restart |
| Small tables | Typically fewer than 5,000 rows: planner may use the row store |
| Manually added columns | Not removed automatically; `google_columnar_engine_drop()` forces removal |
| Partitioned tables | Populate each leaf partition individually |

Supported data types: `array`, `bigint`, `boolean`, `bytea`, `char`, `date`, `decimal`, `double precision`, `enum`, `float4`, `float8`, `integer`, `json`, `jsonb`, `numeric`, `real`, `serial`, `short`, `smallint`, `text`, `timestamp`, `timestamptz`, `uuid`, `varchar`, `vector`.

## Notes

- Enabling: set `google_columnar_engine.enabled` to `on`; the instance restarts automatically after the flag is set (columnar-engine/configure page). Try it on a disposable instance first, and run `gcloud alloydb instances describe` before the update so no existing flag is reset.
- Components: a column store (table and materialized-view columns; frequently used expressions can be added, Preview) and a columnar query planner and execution engine.
- A query uses the engine only if all columns in the query fragments (joins, scans) are in the column store.
- Default memory: 30% of instance memory (10% on a 1-vCPU instance). You may lower it on the primary and give more to a read pool.
- How to use: (1) enable the engine on the instance (one-time, requires a restart); (2) add columns via auto-columnarization or manually (or add frequent expressions); (3) track contents with the `g_columnar_relations` view and verify use with `EXPLAIN`.
- Queries that benefit: table scans with selective filters or few columns (including `LIKE`, `ILIKE`, `SUBSTR`, `TRIM`); aggregates `SUM`, `MIN`, `MAX`, `AVG`, `COUNT` at the beginning of a columnar scan (ungrouped or grouped-by columns); `ORDER BY` / `SORT` on columnar scan results; `LIMIT` at the beginning of a columnar scan before any `SORT` / `GROUP BY`; `INNER HASH JOIN` on column keys without join qualifiers; selective joins at the beginning of a columnar scan; filters with JSON expressions.
- Columns of unsupported types are skipped and manual adds are ignored; a table is still usable when every column the query touches on it is supported and loaded, even in joins with other tables that have unsupported columns.
- Unsupported data sources: non-leaf partitioned tables; foreign tables (except Apache Iceberg tables created with `USING iceberg` when direct Iceberg access is enabled).
- Limitations: on an indexed column the optimizer may choose the row store; manually added columns aren't removed automatically (use `google_columnar_engine_drop()` to force removal), while auto-columnarization may add and remove columns dynamically; frequent row updates invalidate columnar data (compare `invalid_block_count` with `total_block_count` in `g_columnar_relations`, reduce update frequency or refresh more often); a partitioned table can't be populated directly, populate each leaf partition; tables or views with typically fewer than 5,000 rows may use the row store even when loaded.
- Managed PostgreSQL-compatible database on Google Cloud, distinct from Supabase Postgres (`supabase`), Cloudflare D1 / Hyperdrive (`cloudflare-storage`), and the Node.js client `mssql` / ORM `drizzle` (those skills cover client code, not the managed service).
- Source: https://docs.cloud.google.com/alloydb/docs/columnar-engine/about (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/alloydb/docs/columnar-engine/configure (enable flag, refresh snippet; retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/alloydb/docs/instance-configure-database-flags (gcloud snippet; retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [instance-configure-database-flags.md](./instance-configure-database-flags.md)
- Configure the columnar engine: https://docs.cloud.google.com/alloydb/docs/columnar-engine/configure
- Columnar engine flags: https://docs.cloud.google.com/alloydb/docs/reference/columnar-engine-flags
