# Pipelining & Transactions

Batch multiple Redis commands into a single HTTP request to reduce network roundtrips. Pipelining is non-atomic; transactions (`multi()`) are atomic.

## Signature / Usage

```ts
// Pipeline — non-atomic batch
const p = redis.pipeline()
p.set("key", 2)
p.incr("key")
const [setResult, incrResult] = await p.exec<[string, number]>()

// Transaction — atomic batch
const tx = redis.multi()
tx.set("foo", "bar")
tx.get("foo")
const [setResult, getResult] = await tx.exec()
```

```python
# Python — pipeline
pipeline = redis.pipeline()
pipeline.set("foo", 1).incr("foo").get("foo")
result = pipeline.exec()

# Python — transaction
pipeline = redis.multi()
pipeline.set("foo", 1).get("foo")
result = pipeline.exec()
```

## Options / Props

| Method | Description |
|--------|-------------|
| `redis.pipeline()` | Creates a non-atomic pipeline; other client commands may interleave |
| `redis.multi()` | Creates an atomic transaction; no other commands run between queued commands |
| `p.exec<[T1, T2]>()` | Executes queued commands; returns typed array of results |

## Notes

- Pipeline results are returned as an ordered array matching the command sequence
- Transactions guarantee atomicity — use when operations must be consistent with each other
- Auto-pipelining (TypeScript) is **enabled by default**: the client queues commands and sends them as one PIPELINE request when no more commands are added or one of them is awaited. Disable with `enableAutoPipelining: false` in the constructor / `Redis.fromEnv({...})`
- Awaiting every command separately triggers one PIPELINE call each; use `Promise.all([redis.get("foo"), redis.get("bar")])` to batch them into a single call (results keep the written order)
- Auto-pipelining helps where simultaneous requests are limited (Vercel Edge, Cloudflare Workers allow 6)
- Pipeline example from the docs: `p.hset("key2", { field: { hello: "world" } }).hvals("key2")` chains inline; `redis.multi()` has the same API but executes atomically
- Source: https://upstash.com/docs/redis/sdks/ts/pipelining/pipeline-transaction and https://upstash.com/docs/redis/sdks/ts/pipelining/auto-pipeline (fetched 2026-11-14; no version pin on the site)
- The REST API equivalents are `/pipeline` (non-atomic) and `/multi-exec` (atomic)
- Billing is per command (the official REST page states pricing is based on per command/request); the docs do not state a single-request discount for pipelines

## Related

- [REST API](./rest-api.md)
- [TypeScript SDK Overview](./ts-sdk-overview.md)
- [Python SDK Overview](./py-sdk-overview.md)
