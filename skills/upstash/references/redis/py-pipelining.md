# Python SDK — Pipelining & Transactions

Batch multiple Redis commands into a single HTTP request using the Python SDK. Pipelines are non-atomic; transactions are atomic.

## Signature / Usage

```python
from upstash_redis import Redis
redis = Redis.from_env()

# Pipeline — non-atomic
pipeline = redis.pipeline()
pipeline.set("foo", 1).incr("foo").get("foo")
result = pipeline.exec()
# result is a list: [True, 2, 2]

# Transaction (multi) — atomic
tx = redis.multi()
tx.set("foo", 1).get("foo")
result = tx.exec()

# Async pipeline
from upstash_redis.asyncio import Redis as AsyncRedis
redis = AsyncRedis.from_env()
pipeline = redis.pipeline()
pipeline.set("key", "val").get("key")
result = await pipeline.exec()
```

## Notes

- Method chaining is supported: `pipeline.set(...).incr(...).get(...)`
- Call `.exec()` (or `await .exec()` in async) to send all queued commands as a single HTTP request
- Pipeline results are ordered lists; each element corresponds to a queued command's return value
- Transactions guarantee no other commands execute between queued commands
- Use `redis.execute(["COMMAND", "arg"])` for any Redis command not yet implemented in the SDK

## Related

- [Python SDK Overview](./py-sdk-overview.md)
- [Pipelining & Transactions](./pipelining-transactions.md)
- [REST API](./rest-api.md)
