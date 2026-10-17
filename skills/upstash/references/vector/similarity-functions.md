# Algorithm & Similarity Functions (COSINE / EUCLIDEAN / DOT_PRODUCT)

Upstash Vector uses ANN search based on DiskANN / FreshDiskANN, and lets you choose a similarity function when creating an index. Each function yields different query results.

## Signature / Usage

Score calculation per similarity function (scores returned from queries are normalized between 0 and 1, where 1 is highest similarity, regardless of function):

```text
COSINE:      (1 + cosine_similarity(v1, v2)) / 2
EUCLIDEAN:   1 / (1 + squared_distance(v1, v2))
DOT_PRODUCT: (1 + dot_product(v1, v2)) / 2
```

## Options / Props

| Function | Measures | Use cases | Score |
|----------|----------|-----------|-------|
| Cosine Similarity | Cosine of the angle between two vectors; orientation, not magnitude | NLP (document / word embeddings), recommendation systems | `(1 + cosine_similarity(v1, v2)) / 2` |
| Euclidean Distance | Straight-line distance in multi-dimensional space; magnitude matters | Computer vision, anomaly detection | `1 / (1 + squared_distance(v1, v2))` |
| Dot Product | Sum of component-wise products; alignment between vectors | Machine learning models (sentiment analysis, classification), collaborative filtering | `(1 + dot_product(v1, v2)) / 2` |

## Notes

- To use dot product, the vectors need to be normalized to unit length.
- Algorithm: exhaustive search is impractical (resources, latency), so Approximate Nearest Neighbor (ANN) search is used; it may not find the absolute closest point but is low-latency and uses fewer resources. Recall rate compares ANN results with exhaustive search.
- Candidate ANN algorithms named in the docs: HNSW, NSG, DiskANN. DiskANN serves queries from disk with low latency and good recall, which keeps Upstash Vector cost-effective. DiskANN alone cannot insert/update without reindexing; FreshDiskANN adds a temporary in-memory index for up-to-date data, queried together with the disk index and merged to disk in the background.
- Upstash Vector is based on DiskANN and FreshDiskANN with further improvements.
- Sparse indexes use inner product and their scores are not normalized 0-1 (see sparse-indexes.md).
- Source: fetched 2026-10 from https://upstash.com/docs/vector/features/similarityfunctions and https://upstash.com/docs/vector/features/algorithm (no version pin; site is unversioned).

## Related

- [query.md](./query.md)
- [sparse-indexes.md](./sparse-indexes.md)
- [hybrid-indexes.md](./hybrid-indexes.md)
- [embedding-models.md](./embedding-models.md)
