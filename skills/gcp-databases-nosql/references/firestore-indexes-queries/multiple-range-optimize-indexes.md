---
source: https://docs.cloud.google.com/firestore/native/docs/query-data/multiple-range-optimize-indexes
---

# Optimize queries with range and inequality filters on multiple fields

Indexing strategy examples for queries with range and inequality filters on multiple fields, using Query Explain to compare index orderings on an `employees` collection.

## Signature / Usage

Check plan and execution statistics with Query Explain (Node.js):

Adapted (not in the official docs): `analyze : 'true'` changed to the boolean `true`; the option is a boolean, and a string would also turn `'false'` into analysis.

```javascript
let q = db.collection("employees")
      .where("salary", ">", 100000)
      .where("experience", ">",0);

let options = { analyze : true };
let explainResults = await q.explain(options);

let planSummary = explainResults.metrics.planSummary;
let stats = explainResults.metrics.executionStats;

console.log(planSummary);
console.log(stats);
```

Less selective field first, using the `(experience ASC, salary ASC)` index (Java in the source: `.whereGreaterThan("salary", 100000).whereGreaterThan("experience", 0).orderBy("experience").orderBy("salary")`; the source shows no Node.js form of this ordering). The result below scans 95000 index entries to return five documents:

```text
// Output query planning info
{
    "indexesUsed": [
        {
            "properties": "(experience ASC, salary ASC, __name__ ASC)",
            "query_scope": "Collection"
        }
    ],

    // Output Query Execution Stats
    "resultsReturned": "5",
    "executionDuration": "2.5s",
    "readOperations": "100",
    "debugStats": {
        "index_entries_scanned": "95000",
        "documents_scanned": "5",
        "billing_details": {
            "documents_billable": "5",
            "index_entries_billable": "95000",
            "small_ops": "0",
            "min_query_cost": "0"
        }
    }
}
```

Ordering `salary` (more selective) before `experience` makes Firestore use `(salary ASC, experience ASC)` and scan 1000 entries:

```text
// Output query planning info
{
    "indexesUsed": [
        {
            "properties": "(salary ASC, experience ASC, __name__ ASC)",
            "query_scope": "Collection"
        }
    ],

    // Output Query Execution Stats
    "resultsReturned": "5",
    "executionDuration": "0.2s",
    "readOperations": "6",
    "debugStats": {
        "index_entries_scanned": "1000",
        "documents_scanned": "5",
        "billing_details": {
            "documents_billable": "5",
            "index_entries_billable": "1000",
            "small_ops": "0",
            "min_query_cost": "0"
        }
    }
}
```

## Notes

- The query for the slow case is `whereGreaterThan("salary", 100000).whereGreaterThan("experience", 0).orderBy("experience").orderBy("salary")`; the fast case swaps the `orderBy` order (`salary`, then `experience`). From domain knowledge, most employees have some experience but few have salary above 100000, so `salary` is more selective.
- Corrected from the official docs: the Node.js sample reads `let options = { analyze : 'true' };` (string instead of boolean; see [query-explain.md](./query-explain.md)).
- Source inconsistency: the example outputs are annotated pseudo-JSON (comments). The Java sample in the source prints `stats` although the variable is declared `executionStats`; Java samples are omitted here.
- Source: https://docs.cloud.google.com/firestore/native/docs/query-data/multiple-range-optimize-indexes (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Firestore pages here describe Google Cloud's managed document database (Native mode, Datastore mode, MongoDB compatibility), distinct from Supabase Postgres (`supabase`) and Cloudflare KV / D1 (`cloudflare-storage`).

## Related

- [multiple-range-fields.md](./multiple-range-fields.md)
- [query-explain.md](./query-explain.md)
- [standard-index-overview.md](./standard-index-overview.md)
