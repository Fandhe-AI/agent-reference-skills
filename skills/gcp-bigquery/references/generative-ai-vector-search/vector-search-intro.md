---
source: https://docs.cloud.google.com/bigquery/docs/vector-search-intro
---

# Introduction to embeddings and vector search

Overview of embeddings and vector search in BigQuery. Vector search compares similar objects using embeddings, for semantic search at scale or hybrid search (semantic plus lexical keyword search). With vector indexes it uses inverted file indexing (IVF) and the ScaNN algorithm.

## Signature / Usage

Snippet taken from https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/search_functions (`VECTOR_SEARCH` over `ObjectRef` values):

```sql
SELECT *
FROM
  VECTOR_SEARCH(
    TABLE mydataset.images,
    'image_ref',
    (SELECT image_ref FROM mydataset.images_query)
);
```

## Options / Props

### Functions

| Function | Purpose |
|---|---|
| `AI.EMBED` | Generate a single embedding with Agent Platform embedding models. Input: text, or image data as `ObjectRef` values |
| `AI.GENERATE_EMBEDDING` | Table of embeddings for a column of an input table. Works with structured data in standard tables for all supported model types; multimodal embedding models also work with `ObjectRef` columns or object tables |
| `VECTOR_SEARCH` | Semantic vector search or hybrid search by using SQL |
| `AI.SEARCH` | Semantic or hybrid search for results close to a string you provide; use when the table has autonomous embedding generation enabled |
| `AI.SIMILARITY` | Cosine similarity between the embeddings of two inputs; for a small number of comparisons without precomputed embeddings. Use `VECTOR_SEARCH` when performance is critical and there are many embeddings |
| `AI.RANK` | Reorders rows by how well a column's text answers a search query; returns a relevance score and rank position, most to least relevant |

### Use cases

| Use case | Description |
|---|---|
| Retrieval-augmented generation (RAG) | Parse documents, vector search content, generate summarized answers with Gemini models within BigQuery |
| Product substitutes / matching | Suggest alternatives based on customer behavior and product similarity |
| Log analytics | Triage anomalies in logs; enrich LLM context |
| Clustering and targeting | Segment audiences |
| Entity resolution and deduplication | Deduplicate PII records, match mailing addresses |

### Embedding models retiring April 1, 2027

| Model |
|---|
| `text-embedding-005` |
| `text-embeding-004` |
| `text-multilingual-embedding-002` |
| `multimodalembedding@001` |

### Pricing conditions

| Operation | Condition |
|---|---|
| `VECTOR_SEARCH` / `AI.SEARCH` on-demand | Charged for bytes scanned in the base table, the index, and the search query |
| `VECTOR_SEARCH` / `AI.SEARCH` editions | Charged for slots needed within the reservation edition; using an index isn't supported in Standard editions |
| `CREATE VECTOR INDEX` | No charge for building and refreshing while total indexed table data is below the per-organization limit; beyond it, provide your own reservation for index management jobs |
| Storage | Embeddings and indexes are billed as active storage; indexes incur storage costs while active, and a partially covered index is charged for what has been indexed |

## Notes

- With a vector index, `VECTOR_SEARCH` and `AI.SEARCH` use Approximate Nearest Neighbor search, trading recall for performance. Without an index they use brute force over every record; you can also choose brute force for exact results when an index exists.
- For remote models, all inference occurs in Agent Platform; for other model types, inference occurs in BigQuery. Results are stored in BigQuery.
- Autonomous embedding generation: BigQuery maintains an embedding column based on a source column and regenerates it when source data is added or modified, using an Agent Platform embedding model.
- Model deprecation: the models above have a retirement date of April 1, 2027 (spelling `text-embeding-004` as in the source). Embeddings from different models or versions are in separate embedding spaces and generally incompatible, even with the same dimensions. Migration steps: (1) regenerate stored embeddings with the replacement model (for autonomous embedding generation, drop the generated embedding column and add one that uses the replacement model); (2) update queries or pipelines that generate embeddings at search time to use the same model; (3) recreate or rebuild vector indexes on the embedding column.
- Limitations: queries with `VECTOR_SEARCH` or `AI.SEARCH` aren't accelerated by BigQuery BI Engine. Pre-filter pruning is optimized only when filtering on partitioned columns or stored columns, not clustered columns; using non-stored clustered columns in a pre-filter subquery results in a full table scan.
- Index size and storage can be checked with the `INFORMATION_SCHEMA.VECTOR_INDEXES` view (also shows coverage). Limits: see Vector index limits and generative AI function limits on the BigQuery quotas page.
- These functions call Vertex AI (Agent Platform) embedding models from BigQuery; the Gemini Developer API and the `google-genai` SDK are in `google-gemini-api`.
- Source: https://docs.cloud.google.com/bigquery/docs/vector-search-intro (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [vector-index-intro.md](./vector-index-intro.md)
- [generative-ai-overview.md](./generative-ai-overview.md)
- [ai-introduction.md](./ai-introduction.md)
