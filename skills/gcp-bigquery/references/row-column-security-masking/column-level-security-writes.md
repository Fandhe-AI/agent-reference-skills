---
source: https://docs.cloud.google.com/bigquery/docs/column-level-security-writes
---

# Impact on writes from column-level access control

Column-level access control requires read permission (Fine-Grained Reader on the policy tags) for protected columns. Write operations that must read column data are checked; pure inserts, loads and streaming are not, but the writer cannot read the newly written data without fine-grained read access. The examples use a `customers` table whose columns `user_id` (STRING, REQUIRED), `credit_score` (INTEGER, NULLABLE) and `ssn` (STRING, NULLABLE) carry `policy-tag-1`, `policy-tag-2` and `policy-tag-3`.

## Signature / Usage

### DML

`INSERT` (no Fine-Grained Reader check on scanned or updated columns):

```sql
INSERT INTO customers VALUES('alice', 85, '123-456-7890');
```

`UPDATE` (source columns `user_id`, `credit_score` are checked):

```sql
UPDATE customers SET credit_score = 0
  WHERE user_id LIKE 'alice%' AND credit_score < 30
```

`DELETE` (source column `credit_score` is checked):

```sql
DELETE customers WHERE credit_score = 0
```

### Load, copy and query results

Adapted (not in the official docs): the source shows these three commands without the `bq` prefix, so in a normal shell `cp` would run the system command; `bq` is added so each runs as a bq subcommand.

```bash
bq load --source_format=CSV samples.customers \
  ./customers_data.csv \
  ./customers_schema.json
```

Adapted (not in the official docs): `bq` prefix added to the source's `cp -a samples.customers samples.customers_dest`.

```bash
bq cp -a samples.customers samples.customers_dest
```

Adapted (not in the official docs): `bq` prefix added to the source's `query ...` command.

```bash
bq query --use_legacy_sql=false \
--max_rows=0 \
--destination_table samples.customers_dest \
--append_table "SELECT * FROM samples.customers LIMIT 10;"
```

## Options / Props

### Which columns are checked for Fine-Grained Reader

| Operation | Policy tags checked on source columns | Policy tags checked on update columns | Columns checked |
|---|---|---|---|
| `INSERT` | N/A | No | `user_id`, `credit_score`, `ssn` (update columns) |
| `UPDATE` | Yes | No | Source: `user_id`, `credit_score`; update: `credit_score` |
| `DELETE` | Yes | No | Source: `credit_score`; update: `user_id`, `credit_score`, `ssn` |
| `bq load` from a local file or Cloud Storage | N/A | No | `user_id`, `credit_score`, `ssn` (update columns) |
| `bq cp -a` (append copy) | Yes | No | Source: `customers.user_id`, `customers.credit_score`, `customers.ssn`; update: the same three columns of `customers_dest` |
| Query results appended to a destination table | Yes | No | Source: `customers.user_id`, `customers.credit_score`, `customers.ssn`; update: the same three columns of `customers_dest` |

## Notes

- `DELETE`, `UPDATE` and `MERGE` check Fine-Grained Reader on the scanned columns; columns are not scanned unless there is a `WHERE` clause, or another clause or subquery that requires reading data.
- Loading (from Cloud Storage or local files) does not check the destination columns because it does not read destination content. Streaming is similar to `LOAD` and `INSERT`.
- Streaming: no policy tags are checked with the Storage Write API (REST) or the Storage Write API (gRPC). For BigQuery change data capture ingestion, the policy tags are checked on the primary key columns.
- Copying checks the source table only; after the copy you cannot read the written data without Fine-Grained Reader on the destination columns.
- Corrected from the official docs: the source writes `load --source_format=CSV ...`, `cp -a ...` and `query --use_legacy_sql=false ...` without `bq`; `bq load`, `bq cp` and `bq query` are the standalone-tool forms (flags `--source_format`, `-a` / `--append_table`, `--max_rows`, `--destination_table`, `--use_legacy_sql` exist in the bq CLI reference).
- The `UPDATE` and `DELETE` statements are the source's examples and modify rows of `customers`; try them on a disposable table. The `DELETE ... WHERE credit_score = 0` is selective.
- Source: https://docs.cloud.google.com/bigquery/docs/column-level-security-writes (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [column-level-security-intro.md](./column-level-security-intro.md)
- [column-data-masking-intro.md](./column-data-masking-intro.md)
