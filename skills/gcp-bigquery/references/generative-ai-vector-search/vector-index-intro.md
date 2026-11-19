---
source: https://docs.cloud.google.com/bigquery/docs/vector-index-intro
---

# Introduction to vector indexes

A vector index is a data structure that lets the `VECTOR_SEARCH` and `AI.SEARCH` functions run more efficiently, especially on large datasets. This feature may not be available when using reservations created with certain BigQuery editions.

## Signature / Usage

Snippet taken from https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language (`CREATE VECTOR INDEX`):

```sql
CREATE VECTOR INDEX my_index ON my_dataset.my_table(embedding)
OPTIONS (
  index_type = 'IVF',
  distance_type = 'COSINE',
  ivf_options = '{"num_lists":2500}');
```

## Options / Props

### Use cases

| Task |
|---|
| Perform semantic search |
| Detect similar or duplicate images, audio, or videos |
| Perform clustering, targeting, or classification |
| Build recommendation systems |
| Find the top K most similar images or reviews to a given input |

### Pricing conditions

| Item | Condition |
|---|---|
| `CREATE VECTOR INDEX` | Uses BigQuery compute pricing. No charge for building and refreshing while the total size of indexed table data is below your per-organization limit; beyond it, you must provide your own reservation for index management jobs |
| Storage | Indexes are billed at active storage rates while active; index storage size is in `INFORMATION_SCHEMA.VECTOR_INDEXES`. If coverage is below 100%, you are still charged for what has been indexed |

## Notes

- The feature may be unavailable on reservations created with certain editions; see the BigQuery editions introduction. Using an index isn't supported in Standard editions (per the vector search introduction).
- Limits: see Vector index limits on the BigQuery quotas page.
- Source: https://docs.cloud.google.com/bigquery/docs/vector-index-intro (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [vector-search-intro.md](./vector-search-intro.md)
