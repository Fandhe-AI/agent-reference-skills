---
source: https://github.com/googleapis/google-cloud-python/blob/google-api-core-v2.44.0/packages/google-api-core/google/api_core/retry/retry_unary_async.py
---

# AsyncRetry

`AsyncRetry` is the exponential back-off retry decorator for coroutine functions. It shares most functionality and behavior with `Retry` (see `retry.md`) and by default retries transient API errors (`if_transient_error`).

## Signature / Usage

### Decorate a coroutine (module docstring)

```python
@retry_async.AsyncRetry()
async def call_flaky_rpc():
    return await client.flaky_rpc()

# Will retry flaky_rpc() if it raises transient API errors.
result = await call_flaky_rpc()
```

### Custom predicate (module docstring)

```python
@retry_async.AsyncRetry(predicate=retry_async.if_exception_type(exceptions.NotFound))
async def check_if_exists():
    return await client.does_thing_exist()

is_available = await check_if_exists()
```

### Per-call `retry=` (module docstring)

```python
my_retry = retry_async.AsyncRetry(timeout=60)
result = await client.some_method(retry=my_retry)
```

### Lowest-level helper

```python
async def retry_target(
    target: Callable[[], Awaitable[_R]],
    predicate: Callable[[Exception], bool],
    sleep_generator: Iterable[float],
    timeout: float | None = None,
    on_error: Callable[[Exception], None] | None = None,
    exception_factory: Callable[
        [list[Exception], RetryFailureReason, float | None],
        tuple[Exception, Exception | None],
    ] = build_retry_error,
    **kwargs,
):
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `predicate` | `Callable[[Exception], bool]` | `if_transient_error` | Returns `True` if the given exception is retryable. |
| `initial` | `float` | `1.0` (seconds) | Minimum delay in seconds. Must be greater than 0. |
| `maximum` | `float` | `60.0` (seconds) | Maximum delay in seconds. |
| `multiplier` | `float` | `2.0` | Multiplier applied to the delay. |
| `timeout` | `Optional[float]` | `120.0` (seconds) | How long to keep retrying in seconds. Checked only before initiating a retry, so the target may run past the timeout as long as it is healthy. |
| `on_error` | `Optional[Callable[[Exception], Any]]` | `None` | Called while processing a retryable exception. Any error raised by it is not caught. |
| `deadline` | `float` | — | DEPRECATED: use `timeout`. If set it overrides `timeout`. |

## Notes

- Applies to google-api-core 2.44.0 (PyPI), Python `>=3.10`.
- `retry_target` (async) raises `ValueError` if the sleep generator stops yielding values. With the default `exception_factory` it raises `google.api_core.RetryError` on timeout, otherwise the last non-retryable exception. `deadline` is DEPRECATED and overrides `timeout`.
- The constructor, `with_timeout`, `with_predicate`, `with_delay`, `if_exception_type` and `if_transient_error` come from the shared base and are documented in `retry.md`.
- `AsyncRetry` wraps a single awaited call. For streams use `AsyncStreamingRetry` (see `streaming-retry.md`).
- Idempotency: retrying non-idempotent calls can duplicate side effects; use request IDs where the API supports them. This note is not from the docstring.
- Source: https://github.com/googleapis/google-cloud-python/blob/google-api-core-v2.44.0/packages/google-api-core/google/api_core/retry/retry_unary_async.py (retrieved 2026-11-16; pinned at tag google-api-core-v2.44.0)
- Snippet taken from the source above (module docstring examples and the `retry_target` signature). Blocks are fragments (undefined `client`, top-level `await`).

## Related

- [retry.md](./retry.md)
- [streaming-retry.md](./streaming-retry.md)
- [polling.md](./polling.md)
