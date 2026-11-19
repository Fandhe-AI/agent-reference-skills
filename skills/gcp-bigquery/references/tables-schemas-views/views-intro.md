---
source: https://docs.cloud.google.com/bigquery/docs/views-intro
---

# Introduction to logical views

A logical view is a virtual table defined by a SQL query and is the default type of view in BigQuery. The defining query runs each time the view is queried, so results contain only current data. With authorized views, you can give users access to a subset of data without granting access to the base tables.

## Signature / Usage

```sql
CREATE VIEW `myproject.mydataset.newview`
OPTIONS(
  expiration_timestamp=TIMESTAMP_ADD(CURRENT_TIMESTAMP(), INTERVAL 48 HOUR),
  friendly_name="newview",
  description="a view that expires in 2 days",
  labels=[("org_unit", "development")]
)
AS SELECT column_1, column_2, column_3 FROM `myproject.mydataset.mytable`
```

## Options / Props

### Use cases

| Use case | Detail |
|---|---|
| Reusable name | Give a complex query or limited data set a reusable name that other users can be authorized to query like a table. |
| Shared logic | Abstract and store calculation and join logic in a common object. |
| Subset access | Provide access to a subset of data and calculation logic without access to the base tables. |
| Optimization | Optimize queries with high computation cost and small result sets (see materialized views). |
| Visualization | Data source for a visualization tool such as Data Studio. |
| Sharing | Share data with subscribers of BigQuery sharing (formerly Analytics Hub). |

### Limitations

| Limitation | Detail |
|---|---|
| Read-only | You can't run queries that insert, update, or delete data through a view. |
| Remote locations | If the view references tables from remote locations, enable global queries before you create the view. |
| Qualified references | A reference inside a view must be qualified with a dataset; the default dataset doesn't affect a view body. |
| `tabledata.list` | You cannot use the `TableDataList` JSON API method to retrieve data from a view. |
| Dialects | You cannot mix GoogleSQL and legacy SQL; a GoogleSQL query cannot reference a view defined with legacy SQL. |
| Query parameters | You cannot reference query parameters in views. |
| Stored schema | Underlying table schemas are stored with the view at creation. If columns are added, deleted, or modified later, the view isn't updated and the reported schema stays inaccurate until the view SQL is changed or the view is recreated. All submitted queries still produce accurate results. |
| Legacy SQL views | You cannot automatically update a legacy SQL view to GoogleSQL. Modify the query with the console **Edit query** option, `bq update --view`, the client libraries, or the `tables.update` / `tables.patch` API methods. |
| Temporary objects | You cannot include a temporary user-defined function or a temporary table in the defining query. |
| Wildcard tables | You cannot reference a view in a wildcard table query. |
| Parameterized types | Views cannot inherit or explicitly define parameterized data types such as `STRING(n)`; those are supported only for base table columns and script variables. |

## Notes

- Quotas: see the "View limits" section of the BigQuery quotas page; the defining SQL is also subject to query job quotas.
- Pricing: BigQuery uses logical views by default, not materialized views. Queries are billed by the total data in all table fields referenced directly or indirectly by the top-level query. See on-demand compute pricing and materialized views pricing (prices are not copied here).
- Security: control access with authorized views.
- Snippet taken from https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language (the "Creating a new view" example under `CREATE VIEW`).
- Source: https://docs.cloud.google.com/bigquery/docs/views-intro (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [materialized-views-intro.md](./materialized-views-intro.md)
- [tables-intro.md](./tables-intro.md)
