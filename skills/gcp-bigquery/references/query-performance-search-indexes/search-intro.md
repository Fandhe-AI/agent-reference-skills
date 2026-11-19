---
source: https://docs.cloud.google.com/bigquery/docs/search-intro
---

# Introduction to search in BigQuery

BigQuery search indexes combine a columnar store with text search so you can find unique data elements in unstructured text and semi-structured JSON without knowing the table schema in advance. BigQuery stores and manages the indexes; query them with the `SEARCH` function or other supported operators and functions. Designed for log analytics, security audits and regulatory reporting.

## Signature / Usage

### Search indexes and DML

A search index isn't used when the indexed table is modified by a DML statement (not used in this query):

```sql
DELETE FROM my_dataset.indexed_table
WHERE SEARCH(user_id, '123');
```

It can be used when the optimizable predicate is in a subquery against the indexed table:

```sql
DELETE FROM my_dataset.other_table
WHERE
  user_id IN (
    SELECT user_id
    FROM my_dataset.indexed_table
    WHERE SEARCH(user_id, '123')
  );
```

## Options / Props

### Roles and permissions

| Item | Value |
|------|-------|
| Create a search index | `bigquery.tables.createIndex` on the table |
| Drop a search index | `bigquery.tables.deleteIndex` |
| Predefined roles that include them | BigQuery Data Owner (`roles/bigquery.dataOwner`), BigQuery Data Editor (`roles/bigquery.dataEditor`), BigQuery Admin (`roles/bigquery.admin`) |

### Limitations

| Limitation |
|------------|
| No search index directly on a view or materialized view; calling `SEARCH` on a view of an indexed table uses the underlying index |
| No search index on an external table |
| Renaming a table after creating an index makes the index invalid |
| `SEARCH` is for point lookups; fuzzy search, typo correction, wildcards and other document searches aren't available |
| Before the index reaches 100% coverage you are charged for all index storage reported in `INFORMATION_SCHEMA.SEARCH_INDEXES` |
| Queries using `SEARCH` or optimized by search indexes aren't accelerated by BigQuery BI Engine |
| Not used when the indexed table is modified by DML (but usable in a subquery of a DML statement) |
| Not used when the query references materialized views |
| Not used in a multi-statement transaction query |
| Not used in a time-travel query |

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/search-intro (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Edition: the feature may not be available with reservations created with certain BigQuery editions; see Introduction to BigQuery editions.
- Use cases: search logs, identify data elements for deletion to comply with regulations, developer troubleshooting, security audits, dashboards with highly selective filters, exact matches on pre-processed data.
- Pricing: no charge for index build and refresh processing while the total size of indexed tables in your organization is below the region's limit (see https://docs.cloud.google.com/bigquery/quotas#index_limits); beyond it, provide your own reservation. Active indexes incur storage costs; the size is in `INFORMATION_SCHEMA.SEARCH_INDEXES`.
- The `DELETE` examples are illustrative; try deletes on a disposable dataset first.

## Related

- [search-index.md](./search-index.md)
- [bi-engine-intro.md](./bi-engine-intro.md)
