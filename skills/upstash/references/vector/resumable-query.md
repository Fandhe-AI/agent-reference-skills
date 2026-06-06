# resumableQuery

Paginated vector search with server-side state. Unlike standard `query` (single fixed-topK batch), resumable queries let you fetch additional result batches without re-running the full search.

## Signature / Usage

```ts
import { Index } from "@upstash/vector";
const index = new Index();

// Start a resumable query
const { result, fetchNext, stop } = await index.resumableQuery({
  vector: [0.1, 0.2, 0.3],
  topK: 10,
  maxIdle: 3600, // seconds; default 1 hour
  includeMetadata: true,
  filter: "genre = 'fantasy'",
});

// Process first batch
console.log(result); // initial topK results

// Fetch next batch
const nextBatch = await fetchNext(10); // fetch 10 more

// Terminate session
await stop();
```

## Options / Props

**Payload:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `vector` | `number[]` | Yes* | Dense query vector |
| `sparseVector` | object | Yes* | Sparse query vector |
| `data` | `string` | Yes* | Text to embed; requires hosted embedding model |
| `topK` | `number` | Yes | Number of results per batch |
| `maxIdle` | `number` | No | Max idle time in seconds before auto-termination. Default: 3600 |
| `includeMetadata` | `boolean` | No | Include metadata in results |
| `includeVectors` | `boolean` | No | Include vector arrays in results |
| `includeData` | `boolean` | No | Include the `data` field in results |
| `filter` | `string` | No | Metadata filter expression applied for the entire session |
| `weightingStrategy` | string | No | Sparse vector dimension weighting |
| `fusionAlgorithm` | `'RRF' \| 'DBSF'` | No | Score fusion for hybrid indexes |

**Returned object:**

| Name | Type | Description |
|------|------|-------------|
| `result` | array | Initial batch of query results |
| `fetchNext` | `(k: number) => Promise<array>` | Fetches the next `k` results continuing from current position |
| `stop` | `() => Promise<void>` | Terminates the session and releases server resources |

## Notes

- Always call `stop()` when done to release server resources; otherwise the session expires after `maxIdle` seconds
- Score values are normalized 0–1 regardless of similarity function
- Vector dimension must match the index dimension
- Available in Python, Go, and REST API with equivalent interfaces

## Related

- [query.md](./query.md)
- [filtering.md](./filtering.md)
