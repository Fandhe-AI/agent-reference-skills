# Python SDK (upstash-ratelimit)

`upstash-ratelimit` is a connectionless rate limiting library for Python, designed for serverless environments (AWS Lambda, Vercel Serverless, Google Cloud Functions, and other HTTP-preferred environments). Compatible with Python 3.8 and above. Repository: https://github.com/upstash/ratelimit-python

## Signature / Usage

```bash
pip install upstash-ratelimit
```

```python
from upstash_ratelimit import Ratelimit, FixedWindow
from upstash_redis import Redis

# Create a new ratelimiter, that allows 10 requests per 10 seconds
ratelimit = Ratelimit(
    redis=Redis.from_env(),
    limiter=FixedWindow(max_requests=10, window=10),
    # Optional prefix for the keys used in Redis. Default: "@upstash/ratelimit"
    prefix="@upstash/ratelimit",
)

# Use a constant string to limit all requests with a single ratelimit
# Or use a user ID, API key or IP address for individual limits.
identifier = "api"
response = ratelimit.limit(identifier)

if not response.allowed:
    print("Unable to process at this time")
else:
    do_expensive_calculation()
    print("Here you go!")
```

The asyncio variant is imported from the `upstash_ratelimit.asyncio` module.

### Response

```python
@dataclasses.dataclass
class Response:
    allowed: bool      # Whether the request may pass (True) or exceeded the limit (False)
    limit: int         # Maximum number of requests allowed within a window
    remaining: int     # How many requests the user has left within the current window
    reset: float       # Unix timestamp in seconds when the limits are reset
```

### Algorithms

```python
from upstash_ratelimit import Ratelimit, FixedWindow, SlidingWindow, TokenBucket

FixedWindow(max_requests=10, window=10)
SlidingWindow(max_requests=10, window=10)
TokenBucket(max_tokens=10, refill_rate=5, interval=10)
```

### Block until ready

```python
response = ratelimit.block_until_ready("id", timeout=30)

if not response.allowed:
    print("Unable to process, even after 30 seconds")
else:
    do_expensive_calculation()
```

### Custom rates

```python
# subtract 5 from the number of allowed requests in the window
response = ratelimit.limit("api", rate=5)
```

### Multiple limits

```python
redis = Redis.from_env()
free = Ratelimit(redis=redis, limiter=SlidingWindow(max_requests=10, window=10), prefix="ratelimit:free")
paid = Ratelimit(redis=redis, limiter=SlidingWindow(max_requests=60, window=10), prefix="ratelimit:paid")
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `redis` | `Redis` | `upstash_redis` client, e.g. `Redis.from_env()` |
| `limiter` | `FixedWindow` / `SlidingWindow` / `TokenBucket` | Algorithm instance |
| `prefix` | `str` | Redis key prefix; default `"@upstash/ratelimit"` |
| `FixedWindow` / `SlidingWindow` args | `max_requests`, `window` | Requests allowed per window (units as in the official examples: `window=10` for 10 seconds) |
| `TokenBucket` args | `max_tokens`, `refill_rate`, `interval` | Bucket size, refill amount, refill interval |
| `limit(identifier, rate=...)` | `rate: int` | Tokens consumed by this request |
| `block_until_ready(identifier, timeout=...)` | `timeout` in seconds | Waits for the next window and retries; finite blocking time |

## Notes

- Python SDK only. The TypeScript SDK (`@upstash/ratelimit`) uses `success` / `Promise` and millisecond timeouts, whereas Python uses `allowed`, synchronous calls (or `upstash_ratelimit.asyncio`), `snake_case` names and seconds.
- Fixed and sliding window: reset time is based on fixed window boundaries, not the first request. For sliding window, `reset` is the start of the next window, not an exact reset time.
- Fixed Window: cheap, but bursts at boundaries can leak through and cause stampedes when a new window begins. Sliding Window: solves the boundary issue but costs more storage/computation and is an approximation. Token Bucket: smooths bursts and allows a higher initial burst, but is expensive in computation.
- For Redis client configuration, see the upstash/redis-python repository.
- Source: https://upstash.com/docs/redis/sdks/ratelimit-py/overview (plus `gettingstarted`, `algorithms`, `features`; retrieved 2026-10, no version in URL).

## Related

- [overview.md](./overview.md)
- [algorithms.md](./algorithms.md)
- [features.md](./features.md)
- [methods.md](./methods.md)
