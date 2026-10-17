# vector

| Name | Description | Path |
|------|-------------|------|
| delete | Removes vectors from an index by ID, ID prefix, or metadata filter. | [delete.md](./delete.md) |
| Embedding Models | Upstash Vector can automatically generate embeddings from raw text using a hosted model selected at index creation time. This eliminates the need to pre-vectorize data before upsert and query. | [embedding-models.md](./embedding-models.md) |
| fetch | Retrieves vectors by their IDs. Returns `null` for IDs that do not exist. | [fetch.md](./fetch.md) |
| Metadata Filtering | SQL-like filter expressions that restrict vector similarity search results. Only vectors whose metadata matches the filter are returned. | [filtering.md](./filtering.md) |
| Hybrid Indexes | Combines dense (semantic) and sparse (keyword) vector search. Both components are queried and their scores are fused, yielding better recall for out-of-domain queries where pure semantic search fails. | [hybrid-indexes.md](./hybrid-indexes.md) |
| info / reset | `info` retrieves index statistics. `reset` clears all vectors from a namespace or the entire index. | [info-reset.md](./info-reset.md) |
| Metadata and Data | Per-vector context stored alongside vectors. Metadata is structured (JSON) and can be used to filter queries; data is unstructured (typically raw text) and can only be returned, not filtered on. | [metadata.md](./metadata.md) |
| Namespace | Isolated partitions of a vector index. Each namespace acts as an independent subset; all read/write operations target a single namespace. Every index has a default namespace (`""`). | [namespace.md](./namespace.md) |
| Python SDK (upstash-vector) | HTTP-based Upstash Vector client for Python 3.8+. API mirrors the TypeScript SDK with Python naming conventions (snake_case, keyword arguments for options). | [python-sdk.md](./python-sdk.md) |
| query | Retrieves the most similar vectors from an index using Approximate Nearest Neighbor (ANN) search. Scores are normalized between 0 and 1, where 1 is highest similarity. | [query.md](./query.md) |
| range | Retrieves vectors in paginated chunks using a cursor. Stateless — all parameters must be passed in every request. | [range.md](./range.md) |
| resumableQuery | Paginated vector search with server-side state. Unlike standard `query` (single fixed-topK batch), resumable queries let you fetch additional result batches without re-running the full search. | [resumable-query.md](./resumable-query.md) |
| Algorithm & Similarity Functions (COSINE / EUCLIDEAN / DOT_PRODUCT) | Upstash Vector uses ANN search based on DiskANN / FreshDiskANN, and lets you choose a similarity function when creating an index. Each function yields different query results. | [similarity-functions.md](./similarity-functions.md) |
| Sparse Indexes | Sparse vector indexes for exact keyword matching and information retrieval. Represent data in high-dimensional space where only a small fraction of dimensions have non-zero values. | [sparse-indexes.md](./sparse-indexes.md) |
| @upstash/vector TypeScript SDK | Serverless vector database client for TypeScript/JavaScript. Provides full type safety for upsert, query, fetch, delete, range, and namespace operations against an Upstash Vector index. | [ts-sdk-overview.md](./ts-sdk-overview.md) |
| upsert | Adds new vectors to an index or updates existing ones. Vectors must match the index dimension. | [upsert.md](./upsert.md) |
