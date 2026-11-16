---
source: https://docs.cloud.google.com/bigtable/docs/tables-and-views
---

# Tables and views

Bigtable stores data in tables and lets you create logical views, continuous materialized views and authorized views of them to simplify SQL query patterns, precompute aggregations and enforce fine-grained access control. Views share table data with users and groups without access to the source data.

## Signature / Usage

Create an authorized view from a JSON definition file (example from the gcloud reference; the source page has no code):

```bash
gcloud bigtable authorized-views create my-authorized-view \
    --instance=test-instance --table=test-table \
    --definition-file=authorized_view.json
```

## Options / Props

| | Logical views | Parameterized views | Continuous materialized views | Authorized views |
|---|---|---|---|---|
| Structure | Virtual table of a SQL query result | Virtual table of a SQL query result | Read-only table based on a source table | Subset of a table |
| Definition | SQL query | SQL query using `VIEW_PARAMETERS()` | SQL query | JSON definition file |
| Consistency with source | Consistent when the query is run | Consistent when the query is run | Eventually consistent | Consistent when the query is run |
| Query options | Must use SQL | SQL | SQL or Bigtable Data API | Bigtable Data API |
| Writeable | No | No | No | Yes |
| Storage | Data remains in the source table | Data remains in the source table | Data duplicated, aggregated or transformed in a new read-only table | Data remains in the source table |
| Usage costs | Compute to execute the query | Compute to execute the query | Compute when syncing, plus storage | Compute to execute the query |

## Notes

- A table is a sorted key-value map; rows are indexed by a unique row key and related columns are grouped into column families. Tables are sparse (no NULLs stored). A cell is identified by (row key, column family, column qualifier, timestamp). No joins; transactions only within a single row.
- A table is an instance-level resource automatically replicated to every cluster in the instance. Garbage collection policies are set at the column-family level.
- Parameterized views dynamically filter data ranges by application context, protect against SQL injection and reduce the need for many static views.
- Continuous materialized views continuously run a SQL query and keep a new table in sync; you pay for storage, sync processing and replication.
- Authorized views control both read and write access, are useful for multi-customer tables, and incur no additional storage cost.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/bigtable/authorized-views/create (the tables and views page has no code block). Logical views and continuous materialized views are created with `gcloud bigtable logical-views create` and `gcloud bigtable materialized-views create` (`--instance`, `--query`).
- Bigtable: wide-column NoSQL database, not a relational database; its SQL (GoogleSQL for Bigtable) is not Cloud SQL / Spanner (`gcp-databases-relational`).
- Source: https://docs.cloud.google.com/bigtable/docs/tables-and-views (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [schema-design.md](./schema-design.md)
- [data-types.md](./data-types.md)
- [garbage-collection.md](./garbage-collection.md)
