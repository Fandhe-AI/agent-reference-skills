# vector

| Name | Description | Path |
|------|-------------|------|
| @upstash/vector TypeScript SDK | Installation, `Index` initialization, and type-safe client setup | [ts-sdk-overview.md](./ts-sdk-overview.md) |
| upsert | Add or update vectors by ID, with optional metadata and namespace targeting | [upsert.md](./upsert.md) |
| query | ANN similarity search with filtering, metadata inclusion, and hybrid/sparse modes | [query.md](./query.md) |
| fetch | Retrieve vectors by ID or ID prefix | [fetch.md](./fetch.md) |
| delete | Remove vectors by ID, ID prefix, or metadata filter | [delete.md](./delete.md) |
| range | Paginated cursor-based vector scan | [range.md](./range.md) |
| Metadata Filtering | SQL-like filter syntax for restricting query and delete operations | [filtering.md](./filtering.md) |
| Namespace | Index partitioning; implicit creation, listing, deletion, and reset | [namespace.md](./namespace.md) |
| resumableQuery | Paginated search with server-side state; fetch result batches incrementally | [resumable-query.md](./resumable-query.md) |
| Hybrid Indexes | Dense + sparse combined search with RRF/DBSF fusion and queryMode control | [hybrid-indexes.md](./hybrid-indexes.md) |
| Sparse Indexes | Exact keyword matching with BM25 and BGE-M3 sparse embedders | [sparse-indexes.md](./sparse-indexes.md) |
| Embedding Models | Hosted text-to-vector models (BGE family, BM25) for automatic embedding | [embedding-models.md](./embedding-models.md) |
| info / reset | Index statistics and namespace/index reset operations | [info-reset.md](./info-reset.md) |
| Python SDK (upstash-vector) | Python SDK differences, snake_case API, retry, and telemetry configuration | [python-sdk.md](./python-sdk.md) |
