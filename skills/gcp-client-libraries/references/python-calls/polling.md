---
source: https://github.com/googleapis/google-cloud-python/blob/google-api-core-v2.44.0/packages/google-api-core/google/api_core/future/polling.py
---

# Polling (PollingFuture, timeout / retry / polling)

`google.api_core.future.polling.PollingFuture` is a Future that needs to poll some service to check its status. `done()` is implemented by subclasses (for example `Operation`) and the polling behavior repeatedly calls `done` until it returns `True`. The polling logic lives in `result()`.

## Signature / Usage

### Default polling configuration (module constants)

```python
DEFAULT_POLLING = retries.Retry(
    predicate=POLLING_PREDICATE,
    initial=1.0,  # seconds
    maximum=20.0,  # seconds
    multiplier=1.5,
    timeout=900,  # seconds
)
```

### Constructor and `result`

```python
def __init__(self, polling=DEFAULT_POLLING, **kwargs):
```

```python
def result(self, timeout=_DEFAULT_VALUE, retry=None, polling=None):
```

## Options / Props

`result()` is controlled by three parameters, each with a distinct role (from the docstring):

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `timeout` | `int` | not set (marker) | The Polling Timeout in seconds: how long to wait for the operation to complete. If `None`, wait indefinitely. If provided it overrides `polling.timeout` (kept for backward compatibility). Affects neither Retry Timeout nor RPC Timeout. For just "do not block more than X seconds", call `result(timeout=X)`. |
| `retry` | `google.api_core.retry.Retry` | `None` | How to retry the polling RPC ONLY (what to do if the polling RPC returned an error). `retry.timeout` is the Retry Timeout. If a polling RPC fails and retrying it fails, the whole future fails with that exception. If not provided, the polling RPC uses the default retry config of its client (for example `operations_client.get_operation()`). Exists mainly for backward compatibility. |
| `polling` | `google.api_core.retry.Retry` | `None` (falls back to the constructor's `polling`) | How often and for how long to call the polling RPC when it returned successfully but the operation is not complete. Does NOT define how to retry each polling RPC. `polling.timeout` is the Polling Timeout unless overridden by `timeout`. |

Constructor: `polling` (`Retry`, default `DEFAULT_POLLING`) controls how often `done()` is polled; a `timeout` passed to `result()` overrides `polling.timeout`. `retry` is DEPRECATED: use `polling`; if set it overrides `polling`.

Other methods: `exception(timeout=_DEFAULT_VALUE)` returns the operation's error (`Optional[GoogleAPICallError]`), uses the same polling logic and accepts no `retry` / `polling`; `add_done_callback(fn)` runs `fn` when complete and, if not already complete, starts a helper thread to poll in the background; `running()` is `True` if the operation is currently running.

## Notes

- Applies to google-api-core 2.44.0 (PyPI), Python `>=3.10`.
- Timeout kinds (defined in the `Retry` docstring, see `retry.md`): RPC Timeout, Retry Timeout, Polling Timeout. `result()` operates in terms of Retry Timeout and Polling Timeout and does not let you customize the RPC timeout.
- Deprecated per source comments (not docstrings): `RETRY_PREDICATE` ("DEPRECATED as it conflates RPC retry and polling concepts into one. Use POLLING_PREDICATE instead") and `DEFAULT_RETRY` ("DEPRECATED: use DEFAULT_POLLING"). `POLLING_PREDICATE` is `retries.if_exception_type(_OperationNotComplete)`, so polling retries only on "operation not complete"; RPC-specific errors such as `ServiceUnavailable` are handled by the per-poll retry logic.
- Source inconsistency: the `result()` docstring says it raises `google.api_core.GoogleAPICallError` if the timeout is reached, but the code raises `concurrent.futures.TimeoutError` (converted from `RetryError`) with the message "Operation did not complete within the designated timeout of {polling.timeout} seconds." Neither is chosen here.
- The `timeout` argument is documented as `int` while also accepting `None` ("infinite timeout").
- Source: https://github.com/googleapis/google-cloud-python/blob/google-api-core-v2.44.0/packages/google-api-core/google/api_core/future/polling.py (retrieved 2026-11-16; pinned at tag google-api-core-v2.44.0)
- Snippet taken from the source above (module constant and public signatures). Blocks are fragments.

## Related

- [operation-lro.md](./operation-lro.md)
- [retry.md](./retry.md)
- [timeout.md](./timeout.md)
