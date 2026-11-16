---
source: https://docs.cloud.google.com/firestore/native/docs/query-explain-report-reference
---

# Query Explain report reference

Values returned by Firestore Query Explain operations: plan records, execution statistics and debug statistics. The format is meant for ad hoc analysis and parts of it are subject to change.

## Signature / Usage

Example plan record (`indexes_used`):

```text
{
    "indexes_used": [
        {"query_scope": "Collection", "properties": "(category ASC, __name__ ASC)"},
        {"query_scope": "Collection", "properties": "(country ASC, __name__ ASC)"},
    ]
}
```

## Options / Props

### Plan records

| Key | Type | Field subject to change? | Description |
|---|---|---|---|
| indexes_used | List of Generic Structs | Yes, the contents in the Struct response are subject to change. | List of indexes selected for this query. |

### Indexes used

| Key | Type | Description |
|---|---|---|
| query_scope | String | The scope at which a query is run. For example: `Collection`, `Collection Group` and `Includes Ancestors`. |
| properties | String | The index fields in a format. For example: `(age ASC, __name__ ASC)`. |

### Execution statistics

| Key | Type | Field subject to change? | Description |
|---|---|---|---|
| results_returned | long | No | Total number of results returned, including documents, projections, aggregation results, keys. |
| execution_duration | Duration | No | Total time to execute the query in the backend. |
| read_operations | long | No | Total billable read operations. |
| debug_stats | Generic Struct | Yes, the contents in the Struct response are subject to change. | Debugging statistics from the execution of the query. |

### Debug statistics

| Key | Type | Description |
|---|---|---|
| index_entries_scanned | String | Total number of index entries inspected during the query. |
| documents_scanned | String | Total number of documents scanned during the query. |
| billing_details | Generic Struct | Billing details including metrics like: "documents_billable", "index_entries_billable", "knn_vector_index_entries_billable", "min_query_cost". |

## Notes

- Metrics may be added, removed or updated as Firestore in Native Mode evolves and are not covered by the same deprecation policy as other Firestore APIs; the report is designed for reading, not machine processing.
- The contents of indexes used and debug statistics are subject to change.
- Snippet taken from https://docs.cloud.google.com/firestore/native/docs/query-explain (the reference page itself has no code).
- Firestore pages here describe Google Cloud's managed document database (Native mode, Datastore mode, MongoDB compatibility), distinct from Supabase Postgres (`supabase`) and Cloudflare KV / D1 (`cloudflare-storage`).
- Source: https://docs.cloud.google.com/firestore/native/docs/query-explain-report-reference (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/firestore/native/docs/query-explain (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [query-explain.md](./query-explain.md)
