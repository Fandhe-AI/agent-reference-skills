---
source: https://docs.cloud.google.com/firestore/native/docs/query-explain
---

# Understand query performance using Query Explain

Query Explain submits Native mode queries to the backend and returns query plan and execution statistics, similar to `EXPLAIN [ANALYZE]` in relational databases. Requests are sent with the Firestore server client libraries.

## Signature / Usage

### Default option (plan only)

Adapted (not in the official docs): the official Node.js sample uses the operator `'='` (not a Firestore operator; `'=='` is used) and the string `'false'` for `analyze` (a non-empty string is truthy in JavaScript; the option is a boolean, as in the source's Java `setAnalyze(true)`), so `false` is used.

```javascript
const q = db.collection('col').where('country', '==', 'USA');
const options = { analyze : false };

const explainResults = await q.explain(options);

const metrics = explainResults.metrics;
const plan = metrics.planSummary;
```

Example plan output:

```text
{
    "indexes_used": [
        {"query_scope": "Collection", "properties": "(category ASC, __name__ ASC)"},
        {"query_scope": "Collection", "properties": "(country ASC, __name__ ASC)"},
    ]
}
```

### Analyze option (plan and execute)

Adapted (not in the official docs): operator `'='` replaced by `'=='` and the string `'true'` by the boolean `true`, as above.

```javascript
const q = db.collection('col').where('country', '==', 'USA');

const options = { analyze : true };

const explainResults = await q.explain(options);

const metrics = explainResults.metrics;
const plan = metrics.planSummary;
const indexesUsed = plan.indexesUsed;
const stats = metrics.executionStats;
```

Example stats output:

```text
{
    "resultsReturned": "5",
    "executionDuration": "0.100718s",
    "readOperations": "5",
    "debugStats": {
               "index_entries_scanned": "95000",
               "documents_scanned": "5"
               "billing_details": {
                     "documents_billable": "5",
                     "index_entries_billable": "0",
                     "small_ops": "0",
                     "min_query_cost": "0",
               }
    }

}
```

### Interpret results

For the equivalent of this SQL on `movies`:

```sql
SELECT *
FROM /movies
WHERE category = 'Romantic' AND country = 'USA';
```

the analyze output showed two single-field indexes, 16500 index entries scanned for 1200 documents returned (0.118882s). After creating the composite index `(category ASC, country ASC, __name__ ASC)`, it used that one index, scanned 1200 entries and ran in 0.026139s.

## Options / Props

| Option | Behavior | Cost |
|---|---|---|
| default (`analyze: false`) | Plans the query, skips execution; shows which indexes are used (for example whether a composite index is used instead of intersecting many indexes) | One read operation regardless of query complexity; no index or read operations |
| analyze (`analyze: true`) | Plans and executes; adds execution statistics and billing information | The usual cost of the query; no extra charge for analysis |

## Notes

- Corrected from the official docs: the Node.js samples read `where('country', '=', 'USA')` and `const options = { analyze : 'false' };` / `{ analyze : 'true' }`.
- Query Explain supports polled queries; streaming queries are not yet supported.
- Requests are authenticated with IAM using the same permissions as regular queries; other techniques such as Firebase Authentication are ignored.
- One query execution is analyzed at a time, so timings vary between requests; use it to spot structural inefficiencies, not aggregate statistics.
- The report format is for ad hoc reading and will evolve; some metrics may be added, removed or updated and are not covered by the usual deprecation policy.
- Source inconsistency: the example outputs are not strictly valid JSON (trailing commas, a missing comma after `"documents_scanned": "5"`), and the plan uses snake_case keys while code samples read camelCase properties. The source also shows Java (Admin) samples, omitted here.
- Firestore pages here describe Google Cloud's managed document database (Native mode, Datastore mode, MongoDB compatibility), distinct from Supabase Postgres (`supabase`) and Cloudflare KV / D1 (`cloudflare-storage`). Client-library setup in general: `gcp-client-libraries`.
- Source: https://docs.cloud.google.com/firestore/native/docs/query-explain (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [query-explain-report-reference.md](./query-explain-report-reference.md)
- [multiple-range-optimize-indexes.md](./multiple-range-optimize-indexes.md)
- [standard-index-overview.md](./standard-index-overview.md)
