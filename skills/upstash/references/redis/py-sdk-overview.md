# upstash-redis — Python SDK Overview

Connectionless, HTTP-based Redis client for Python, designed for serverless and serverful environments. Requires Python 3.8+. Supports both synchronous and asynchronous operation.

## Signature / Usage

```python
from upstash_redis import Redis

# Manual initialization
redis = Redis(url="UPSTASH_REDIS_REST_URL", token="UPSTASH_REDIS_REST_TOKEN")

# Auto-load from environment variables
redis = Redis.from_env()

# Basic usage
redis.set("key", "value")
value = redis.get("key")

# Async usage
from upstash_redis.asyncio import Redis as AsyncRedis
redis = AsyncRedis.from_env()
await redis.set("key", "value")
value = await redis.get("key")
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `url` | `str` | REST endpoint URL from Upstash Console |
| `token` | `str` | Auth token (standard or read-only) |
| `rest_encoding` | `str \| None` | Set to `None` to skip base64 encoding for valid JSON (reduces latency) |
| `rest_retries` | `int` | Number of automatic retries (default: 1) |
| `rest_retry_interval` | `float` | Seconds between retries (default: 3) |
| `allow_telemetry` | `bool` | Disable anonymous telemetry with `False` (default: `True`) |

## Notes

- Install: `pip install upstash-redis`
- `Redis.from_env()` reads `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`
- Async client is in `upstash_redis.asyncio` module
- Initialize the client outside request handlers to maximize reuse across invocations
- Unimplemented commands can be run directly: `redis.execute(["XLEN", "stream_key"])`

## Related

- [Connection & Authentication](./connection-auth.md)
- [TypeScript SDK Overview](./ts-sdk-overview.md)
- [Python SDK Pipelining & Transactions](./py-pipelining.md)
