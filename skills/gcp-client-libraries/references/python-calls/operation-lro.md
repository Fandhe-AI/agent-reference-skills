---
source: https://github.com/googleapis/google-cloud-python/blob/google-api-core-v2.44.0/packages/google-api-core/google/api_core/operation.py
---

# Operation (long-running operations)

`google.api_core.operation.Operation` is a Future for interacting with a Google API Long-Running Operation (`google.longrunning.operations_pb2.Operation`). It extends `polling.PollingFuture` (see `polling.md`), so `result()` blocks and polls until the operation is done. `AsyncOperation` (`operation_async`) is the asyncio counterpart.

## Signature / Usage

### Wait for the result (module docstring)

```python
operation = my_api_client.long_running_method()
result = operation.result()
```

### Callback (module docstring)

```python
operation = my_api_client.long_running_method()

def my_callback(future):
    result = future.result()

operation.add_done_callback(my_callback)
```

### Constructor and methods

```python
def __init__(
    self,
    operation,
    refresh,
    cancel,
    result_type,
    metadata_type=None,
    polling=polling.DEFAULT_POLLING,
    **kwargs,
):
```

```python
def result(self, timeout=_DEFAULT_VALUE, retry=None, polling=None):
def done(self, retry=None):
def cancel(self):
def cancelled(self):
def exception(self, timeout=_DEFAULT_VALUE):
def add_done_callback(self, fn):
```

### Factories

```python
def from_http_json(operation, api_request, result_type, **kwargs):
def from_grpc(operation, operations_stub, result_type, grpc_metadata=None, **kwargs):
def from_gapic(operation, operations_client, result_type, grpc_metadata=None, **kwargs):
```

### Async

```python
class AsyncOperation(async_future.AsyncFuture):
    def __init__(
        self,
        operation,
        refresh,
        cancel,
        result_type,
        metadata_type=None,
        retry=async_future.DEFAULT_RETRY,
    ):
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `operation` | `operations_pb2.Operation` | — | The initial operation. |
| `refresh` | `Callable[[], Operation]` | — | Returns the latest state of the operation. |
| `cancel` | `Callable[[], None]` | — | Tries to cancel the operation. |
| `result_type` | `type` | — | The protobuf type for the operation's result. |
| `metadata_type` | `type` | `None` | The protobuf type for the operation's metadata. |
| `polling` | `google.api_core.retry.Retry` | `polling.DEFAULT_POLLING` | Configuration for how often `done()` is polled. If `timeout` is specified in `result()`, it overrides `polling.timeout`. |
| `retry` | `google.api_core.retry.Retry` | — | DEPRECATED: use `polling`. If specified it overrides `polling`. |

Members (docstrings):

- `operation`: the current `google.longrunning.Operation`.
- `metadata`: the current operation metadata (`google.protobuf.Message`). From the property body of `metadata` in `operation.py` (not documented in the docstring): returns `None` when the operation has no `metadata` field.
- `Operation.deserialize(payload)`: classmethod; payload is the serialized operation protocol buffer (bytes); returns an `operations_pb2.Operation`.
- `done(retry=None)`: `True` if the operation is complete, `False` otherwise; `retry` is how to retry the RPC.
- `cancel()`: attempts to cancel; returns `True` if the cancel RPC was made, `False` if the operation is already complete.
- `cancelled()`: `True` if the operation was cancelled.
- `result(timeout=, retry=, polling=)`: returns the operation's result; the three parameters are described in `polling.md`.

## Notes

- Applies to google-api-core 2.44.0 (PyPI), Python `>=3.10`.
- Source inconsistency: the `result()` docstring says `Raises: google.api_core.GoogleAPICallError: If the operation errors or if the timeout is reached before the operation completes.` but the code in `_blocking_poll` converts `exceptions.RetryError` into `concurrent.futures.TimeoutError` ("Operation did not complete within the designated timeout of ... seconds."). Neither is chosen here.
- Source inconsistency: the `AsyncOperation` module docstring callback example places `await future.result()` inside a plain `def my_callback`, so it is not reproduced. `AsyncOperation` in this source takes `retry` (default `async_future.DEFAULT_RETRY`), which is defined in `google/api_core/future/async_future.py` (not part of this source set); its `result()` parameters and `DEFAULT_RETRY` values are not described here. Its docstring says the retry is overridden by the `timeout` argument to `result()` regardless of the retry's `deadline`.
- `AsyncOperation.done`, `cancel` and `cancelled` are coroutines (`async def`); `from_gapic` is available in `operation_async` too.
- Cancelling an operation attempts to cancel only; the docstring does not promise that the underlying work stops.
- This is the Google Cloud client library (`google-cloud-*`), distinct from the `google-genai` Gemini SDK (the `google-gemini-api` skill). Product-specific operations are covered in `gcp-run` / `gcp-storage`.
- Source: https://github.com/googleapis/google-cloud-python/blob/google-api-core-v2.44.0/packages/google-api-core/google/api_core/operation.py (retrieved 2026-11-16; pinned at tag google-api-core-v2.44.0)
- Source: https://github.com/googleapis/google-cloud-python/blob/google-api-core-v2.44.0/packages/google-api-core/google/api_core/operation_async.py (retrieved 2026-11-16; pinned at tag google-api-core-v2.44.0)
- Snippet taken from the sources above. Blocks are fragments (undefined `my_api_client`; method signatures listed without bodies).

## Related

- [polling.md](./polling.md)
- [retry.md](./retry.md)
- [exceptions.md](./exceptions.md)
