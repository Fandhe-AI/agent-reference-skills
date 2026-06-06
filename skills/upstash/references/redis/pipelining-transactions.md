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
- Auto-pipelining (TypeScript) can automatically batch commands sent in the same event loop tick
- The REST API equivalents are `/pipeline` (non-atomic) and `/multi-exec` (atomic)
- Pipelines count as a single HTTP request for billing purposes

## Related

- [REST API](./rest-api.md)
- [TypeScript SDK Overview](./ts-sdk-overview.md)
- [Python SDK Overview](./py-sdk-overview.md)
