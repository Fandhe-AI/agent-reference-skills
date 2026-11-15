---
source: https://github.com/googleapis/google-cloud-python/blob/google-api-core-v2.44.0/packages/google-api-core/google/api_core/retry/retry_unary.py
---

# Retry (unary synchronous RPCs)

`google.api_core.retry.Retry` is an exponential-backoff retry decorator for unary synchronous RPCs. The retry is limited by a `timeout` (a window in which retries are attempted) rather than by a number of attempts. By default it retries transient API errors (see `if_transient_error`).

## Signature / Usage

### Decorate a function (module docstring)

```python
@retry.Retry()
def call_flaky_rpc():
    return client.flaky_rpc()

# Will retry flaky_rpc() if it raises transient API errors.
result = call_flaky_rpc()
```

### Custom predicate (module docstring)

```python
@retry.Retry(predicate=if_exception_type(exceptions.NotFound))
def check_if_exists():
    return client.does_thing_exist()

is_available = check_if_exists()
```

### Per-call `retry=` on a client method (module docstring)

Some client library methods apply retry automatically. These methods can accept a `retry` parameter.

```python
my_retry = retry.Retry(timeout=60)
result = client.some_method(retry=my_retry)
```

### Constructor (`_BaseRetry.__init__`, shared by all retry classes)

```python
def __init__(
    self,
    predicate: Callable[[Exception], bool] = if_transient_error,
    initial: float = _DEFAULT_INITIAL_DELAY,
    maximum: float = _DEFAULT_MAXIMUM_DELAY,
    multiplier: float = _DEFAULT_DELAY_MULTIPLIER,
    timeout: Optional[float] = _DEFAULT_DEADLINE,
    on_error: Optional[Callable[[Exception], Any]] = None,
    **kwargs: Any,
) -> None:
```

### Predicates and copies (signatures)

```python
def if_exception_type(
    *exception_types: type[Exception],
) -> Callable[[Exception], bool]:
```

```python
def with_timeout(self, timeout: float | None) -> Self:
def with_predicate(self, predicate: Callable[[Exception], bool]) -> Self:
def with_delay(
    self,
    initial: Optional[float] = None,
    maximum: Optional[float] = None,
    multiplier: Optional[float] = None,
) -> Self:
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `predicate` | `Callable[[Exception], bool]` | `if_transient_error` | Returns `True` if the given exception is retryable. |
| `initial` | `float` | `1.0` (seconds) | The minimum amount of time to delay in seconds. Must be greater than 0. |
| `maximum` | `float` | `60.0` (seconds) | The maximum amount of time to delay in seconds. |
| `multiplier` | `float` | `2.0` | The multiplier applied to the delay. |
| `timeout` | `Optional[float]` | `120.0` (seconds) | How long to keep retrying, in seconds. Checked only before initiating a retry, so the target may run past the timeout value as long as it is healthy. |
| `on_error` | `Optional[Callable[[Exception], Any]]` | `None` | Called while processing a retryable exception. Any error raised by this function is not caught. |
| `deadline` | `float` | — | DEPRECATED: use `timeout`. If specified it overrides `timeout`. Accepted via `**kwargs`. |

### `if_transient_error` (the default predicate)

The following are considered transient: `google.api_core.exceptions.InternalServerError` (HTTP 500, gRPC `INTERNAL(13)` and subclasses), `TooManyRequests` (HTTP 429), `ServiceUnavailable` (HTTP 503), `requests.exceptions.ConnectionError`, `requests.exceptions.ChunkedEncodingError` (server declared chunked encoding but sent an invalid chunk), and `google.auth.exceptions.TransportError`.

### Terminal failure (`retry_target`)

`retry_target(target, predicate, sleep_generator, timeout=None, on_error=None, exception_factory=build_retry_error, **kwargs)` is the lowest-level helper. With the default `exception_factory` it raises `google.api_core.RetryError` if the timeout is exceeded while retrying, otherwise the last exception encountered (for a non-retryable error). It raises `ValueError` if the sleep generator stops yielding values. `RetryFailureReason` has `TIMEOUT = 0` and `NON_RETRYABLE_ERROR = 1`.

## Notes

- Applies to google-api-core 2.44.0 (PyPI), Python `>=3.10`.
- Deprecated: `deadline` (constructor), `Retry.deadline` property and `with_deadline()`. The docstring says `retry.deadline` should be treated as just a deprecated alias for `retry.timeout`, and that the library operates in terms of timeouts, not deadlines.
- Timeout kinds named in the `Retry` docstring: RPC Timeout (handled separately by `google.api_core.timeout`, see `timeout.md`), Retry Timeout (the usual meaning of `Retry.timeout`) and Polling Timeout (see `polling.md`). The operation-level retry settings do NOT apply to polling-RPC retries.
- From the function body of `retry_target` in `retry_unary.py` (not documented in the docstring): the synchronous `Retry` calls `warnings.warn(_ASYNC_RETRY_WARNING)` when the target returns an awaitable; the message says to use `AsyncRetry` instead (see `async-retry.md`).
- Idempotency: retrying non-idempotent calls can duplicate side effects; use request IDs where the API supports them. Do not enable a blanket "retry everything" predicate for create/write/publish style calls. This note is not from the docstring.
- Source: https://github.com/googleapis/google-cloud-python/blob/google-api-core-v2.44.0/packages/google-api-core/google/api_core/retry/retry_unary.py (retrieved 2026-11-16; pinned at tag google-api-core-v2.44.0)
- Source: https://github.com/googleapis/google-cloud-python/blob/google-api-core-v2.44.0/packages/google-api-core/google/api_core/retry/retry_base.py (retrieved 2026-11-16; pinned at tag google-api-core-v2.44.0)
- Snippet taken from the two source files above (module docstring examples and the `_BaseRetry` signatures). Blocks are fragments (undefined `client`, bare names).

## Related

- [async-retry.md](./async-retry.md)
- [streaming-retry.md](./streaming-retry.md)
- [timeout.md](./timeout.md)
- [gapic-method.md](./gapic-method.md)
- [polling.md](./polling.md)
- [exceptions.md](./exceptions.md)
