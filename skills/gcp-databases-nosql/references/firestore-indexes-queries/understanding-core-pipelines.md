---
source: https://docs.cloud.google.com/firestore/native/docs/query-data/understanding-core-pipelines
---

# Query interfaces overview

Firestore in Native mode supports two interfaces for accessing data: the newer stage-based Pipeline operations (Enterprise edition only) and the original method-chaining Core operations (Enterprise and Standard editions). Index defaults and pricing differ strongly between editions.

## Signature / Usage

Core operations use method chaining on document or collection references, with an implied stage order and limited aggregation support. Pipeline operations are a composable sequence of stages executed in order, allowing for example filtering on the result of an aggregation.

Snippet taken from https://docs.cloud.google.com/firestore/native/docs/standard-index-overview (the source page has no code):

```javascript
const stateQuery = citiesRef.where("state", "==", "CA");
const populationQuery = citiesRef.where("population", "<", 100000);
const nameQuery = citiesRef.where("name", ">=", "San Francisco");
```

## Options / Props

### Standard vs Enterprise edition

| Feature | Standard edition | Enterprise edition |
|---|---|---|
| Supported operations | Limited to Firestore Core operations | Core and Pipeline operations, and Firestore MongoDB compatibility operations |
| Indexing requirement | All queries require indexes | Indexes are not required for queries |
| Index creation | Automatic indexes for single fields; composite indexes manual | No automatic indexes; manage manually |
| Indexed fields | `__name__` automatically appended if absent | `__name__` is not appended; specify it explicitly if needed |
| Index sparsity | All indexes sparse: an entry exists only if all indexed fields are present | Default dense: an entry exists even if none of the fields are present; sparse can be enabled (entry exists if at least one field is present) |
| Sort order normalization | `order by` normalized by appending inequality fields and `__name__` for a unique deterministic order | None; `sort a ASC` only guarantees sorting by `a`; add a unique field such as `__name__` for deterministic order |
| Query performance and cost | Generally performant due to index requirements | Create indexes to optimize; find missing indexes with Query Explain and Query Insights; unindexed queries may be non-performant and costly as data grows |
| Indexing overhead cost | No charge for index writes | Index entries consume write units when the document is written (1 write unit per 1 KiB of index entry size) |
| Billing model | Per document read, write and delete | Read Units (4 KiB tranches); writes and deletes merged into Write Units (1 KiB tranches) |
| Base pricing (us-central1) | Reads $0.03 per 100,000 documents ($0.30 per million); writes $0.09 per 100,000 ($0.90 per million); deletes $0.01 per 100,000 ($0.10 per million) | Read Units $0.05 per 1 million; Write Units $0.26 per 1 million; generally lower if documents are under 4 KiB |
| Real-time updates | Included, billed as reads at $0.03 per 100,000 documents | Separate SKU (Realtime Update Units) per 4 KiB tranche, $0.30 per million read units |

## Notes

- Pipeline operations are available only in Firestore Enterprise edition; Core operations work in both editions.
- Prices are as stated in the source for us-central1 and may change; check the Firestore pricing page.
- Firestore pages here describe Google Cloud's managed document database (Native mode, Datastore mode, MongoDB compatibility), distinct from Supabase Postgres (`supabase`) and Cloudflare KV / D1 (`cloudflare-storage`).
- Source: https://docs.cloud.google.com/firestore/native/docs/query-data/understanding-core-pipelines (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/firestore/native/docs/standard-index-overview (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [enterprise-index-overview.md](./enterprise-index-overview.md)
- [standard-index-overview.md](./standard-index-overview.md)
- [query-explain.md](./query-explain.md)
