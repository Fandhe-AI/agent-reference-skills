# Commands: Vector (VECTOR.* / redis.vector)

Upstash Redis extension commands for storing embeddings and running approximate nearest-neighbour search inside Redis.

## Signature / Usage

```ts
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

const index = await redis.vector.createIndex({ name: "docs", dimension: 3, metric: "COSINE" });
// or, for an existing index: const index = redis.vector.index("docs");

await index.add("doc-1", [0.1, 0.2, 0.3]); // number[], Float32Array, or { base64 }
const hits = await index.query({ vector: [0.1, 0.2, 0.3], topK: 5 }); // [{ id, score }]
await index.get("doc-1");   // vector or null
await index.delete("doc-1");
await index.count();
await index.info();         // { dimension, metric } or null
await index.drop();
```

```bash
VECTOR.CREATE <index> DIM <dimension> METRIC <COSINE | EUCLIDEAN | DOT> [EXISTSOK]
VECTOR.ADD <index> <id> <VALUES <count> <element> [<element> ...] | FP32 <blob> | BASE64-FP32 <blob>>
VECTOR.QUERY <index> TOPK <count> <VALUES <count> <element> [...] | FP32 <blob> | BASE64-FP32 <blob>> [PROFILE <FAST | BALANCED | PRECISE>]
VECTOR.GET <index> <id>
VECTOR.DEL <index> <id>
VECTOR.COUNT <index>
VECTOR.INFO <index>
VECTOR.DROP <index>
```

```bash
# REST API: pass binary vectors as BASE64-FP32
curl -X POST https://YOUR_ENDPOINT.upstash.io \
  -H "Authorization: Bearer $UPSTASH_REDIS_REST_TOKEN" \
  -d '["VECTOR.QUERY", "my-index", "TOPK", "5", "BASE64-FP32", "zczMPc3MTD6amZk+"]'
```

## Options / Props

| Command | Arguments | Reply |
|---------|-----------|-------|
| `VECTOR.CREATE` | `DIM` (1 to 32768), `METRIC` (`COSINE` / `EUCLIDEAN` / `DOT`), optional `EXISTSOK` | `1` created, `0` if `EXISTSOK` matched an existing index |
| `VECTOR.ADD` | `<id>` (non-empty), one of `VALUES` / `FP32` / `BASE64-FP32` | `1` ID added, `0` existing vector replaced |
| `VECTOR.QUERY` | `TOPK` (1 to 1000), one vector form, optional `PROFILE` (default `BALANCED`) | Array of `[id, score]`, best first |
| `VECTOR.GET` | `<id>` | Array of doubles, or null if the ID is absent |
| `VECTOR.DEL` | `<id>` | `1` removed, `0` not present |
| `VECTOR.COUNT` | `<index>` | Integer (`0` for a missing index) |
| `VECTOR.INFO` | `<index>` | `dimension`, `metric` (RESP2 flat array, RESP3 map), null if missing |
| `VECTOR.DROP` | `<index>` | `1` dropped, `0` did not exist |

## Notes

- Vector indexes are an Upstash extension, not part of open-source Redis. They are separate from Upstash Vector, which is a standalone vector database with its own API and SDKs.
- An index lives at an ordinary Redis key, so `EXISTS`, `EXPIRE`, and `DEL` apply; a key already holding another type cannot be turned into one. `VECTOR.DROP` on a key holding another type returns `WRONGTYPE`.
- `DIM` and `METRIC` are fixed at creation; to change either, drop and recreate. Use `COSINE` when only direction matters (usual for text embeddings), `DOT` when magnitude carries meaning, `EUCLIDEAN` for straight-line distance.
- Vector forms are mutually exclusive: `VALUES` (decimal numbers), `FP32` (raw little-endian 32-bit float blob, length a non-zero multiple of 4), `BASE64-FP32` (base64 of that blob, required over the JSON REST API).
- Scores are normalized to 0 through 1 for every metric; higher is closer. Search is approximate; `PROFILE` changes only the recall / latency trade-off per call, never what is stored.
- Stored values are 32-bit floats, so `VECTOR.GET` returns float precision rather than the exact original values.
- Errors: `ERR Index <index> already exists` (create without `EXISTSOK`), `ERR Index <index> already exists with a different configuration`, `ERR vector dimension mismatch: expected <dim>, got <n>`, `ERR Index <index> is not found`.
- Use `VECTOR.INFO` (null when missing) rather than `VECTOR.COUNT` (`0` for both missing and empty) to test existence. Removing the last vector does not delete the index.
- Other clients use the generic command interface: `redis.call("VECTOR.QUERY", ...)` (ioredis), `client.sendCommand([...])` (node-redis), `client.execute_command(...)` (redis-py), `client.Do(ctx, ...)` (go-redis), `redis::cmd(...)` (redis-rs).
- Python: `redis.vector.create_index(name=, dimension=, metric=)`, `index.add(id, vec)`, `index.query(vector=, top_k=)`.
- Distinct from the Redis Search `SEARCH.*` commands (full-text / structured filtering).
- Source: https://upstash.com/docs/redis/commands/vector/overview and each `vector-*` command page (fetched 2026-10; no version pin on the site).

## Related

- [Redis Search: Introduction](./search-introduction.md)
- [TypeScript SDK Overview](./ts-sdk-overview.md)
- [REST API](./rest-api.md)
