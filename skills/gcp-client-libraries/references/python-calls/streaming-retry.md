---
source: https://github.com/googleapis/google-cloud-python/blob/google-api-core-v2.44.0/packages/google-api-core/google/api_core/retry/retry_streaming.py
---

# Streaming retry (StreamingRetry / AsyncStreamingRetry)

`StreamingRetry()(func)` returns a function whose call returns a `Generator`. `AsyncStreamingRetry()(func)` returns a coroutine function: `await` the call to get the `AsyncGenerator` (signature `Callable[_P, Awaitable[AsyncGenerator[_Y, None]]]`). If any exception is raised by the target, the entire stream is retried within the wrapper.

Important Note (from the docstrings): when a stream encounters a retryable error, it will silently construct a fresh iterator instance in the background and continue yielding (likely duplicate) values as if no error occurred. This is the most general way to retry a stream, but it often is not the desired behavior. Example: `iter([1, 2, 1/0]) -> [1, 2, 1, 2, ...]`.

## Signature / Usage

### Synchronous: wrap the target (docstring option 1)

Adapted (not in the official docs): pass a fresh `seen_items` list per stream instead of a mutable default argument; the `seen_items=[]` default is shared across calls, so a second stream would skip the first stream's items.

```python
def attempt_with_modified_request(target, request, seen_items):
    # remove seen items from request on each attempt
    new_request = modify_request(request, seen_items)
    new_generator = target(new_request)
    for item in new_generator:
        yield item
        seen_items.append(item)

retry_wrapped_fn = StreamingRetry()(attempt_with_modified_request)
retryable_generator = retry_wrapped_fn(target, request, [])
```

### Synchronous: wrap the retry generator (docstring option 2)

Adapted (not in the official docs): passed the `on_error` reset callback to `StreamingRetry`; the docstring defines it but never wires it, so replayed items were yielded again.

```python
def retryable_with_filter(target):
    stream_idx = 0
    # reset stream_idx when the stream is retried
    def on_error(e):
        nonlocal stream_idx
        stream_idx = 0
    # build retryable
    retryable_gen = StreamingRetry(on_error=on_error)(target)
    # keep track of what has been yielded out of filter
    seen_items = []
    for item in retryable_gen():
        if stream_idx >= len(seen_items):
            seen_items.append(item)
            yield item
        elif item != seen_items[stream_idx]:
            raise ValueError("Stream differs from last attempt")
        stream_idx += 1

filter_retry_wrapped = retryable_with_filter(target)
```

### Asynchronous: wrap the target (docstring option 1)

Adapted (not in the official docs): `AsyncRetry(is_stream=True,...)` replaced with `AsyncStreamingRetry()`, the target and its arguments moved from the decorator call to the wrapped call, the wrapped call awaited (it returns a coroutine), and a fresh `seen_items` list passed instead of a mutable default argument.

```python
async def attempt_with_modified_request(target, request, seen_items):
    # remove seen items from request on each attempt
    new_request = modify_request(request, seen_items)
    new_generator = await target(new_request)
    async for item in new_generator:
        yield item
        seen_items.append(item)

retry_wrapped = AsyncStreamingRetry()(attempt_with_modified_request)
retryable_generator = await retry_wrapped(target, request, [])
```

### Asynchronous: wrap the retry generator (docstring option 2)

Adapted (not in the official docs): `AsyncRetry(is_stream=True, ...)` replaced with `AsyncStreamingRetry(on_error=on_error)` (the reset callback was never wired), the wrapped call awaited before `async for`, the undefined `previous_stream` replaced with `seen_items` (as in the sync docstring), and a stray `"` removed.

```python
async def retryable_with_filter(target):
    stream_idx = 0
    # reset stream_idx when the stream is retried
    def on_error(e):
        nonlocal stream_idx
        stream_idx = 0
    # build retryable
    retryable_gen = AsyncStreamingRetry(on_error=on_error)(target)
    # keep track of what has been yielded out of filter
    seen_items = []
    async for item in await retryable_gen():
        if stream_idx >= len(seen_items):
            yield item
            seen_items.append(item)
        elif item != seen_items[stream_idx]:
            raise ValueError("Stream differs from last attempt")
        stream_idx += 1

filter_retry_wrapped = retryable_with_filter(target)
```

### Lowest-level helpers

`retry_target_stream(target, predicate, sleep_generator, timeout=None, on_error=None, exception_factory=build_retry_error, init_args=(), init_kwargs={}, **kwargs)` returns a `Generator[_Y, Any, None]`. The async version in `retry_streaming_async.py` (exported as `retry_target_stream_async`) has the same parameters, accepts a `target` returning `AsyncIterable[_Y] | Awaitable[AsyncIterable[_Y]]`, and returns an `AsyncGenerator[_Y, None]`.

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `predicate` | `Callable[[Exception], bool]` | `if_transient_error` | Returns `True` if the exception is retryable. |
| `initial` | `float` | `1.0` (seconds) | Minimum delay in seconds. Must be greater than 0. |
| `maximum` | `float` | `60.0` (seconds) | Maximum delay in seconds. |
| `multiplier` | `float` | `2.0` | Multiplier applied to the delay. |
| `timeout` | `float` | `120.0` (seconds) | How long to keep retrying. Checked only before initiating a retry. |
| `on_error` | `Callable[[Exception], Any]` | `None` | Called while processing a retryable exception; errors raised by it are not caught. |
| `deadline` | `float` | — | DEPRECATED: use `timeout`; overrides `timeout`. |

## Notes

- Applies to google-api-core 2.44.0 (PyPI), Python `>=3.10`. Both classes are exported from `google.api_core.retry` (`StreamingRetry`, `AsyncStreamingRetry`, `retry_target_stream`, `retry_target_stream_async`).
- Source inconsistency: the `AsyncStreamingRetry` docstring says it "returns an AsyncGenerator when called", but `__call__` is annotated `Callable[_P, Awaitable[AsyncGenerator]]` and the wrapper is `async def` (from the signature and the function body of `AsyncStreamingRetry.__call__` in `retry_streaming_async.py`).
- Source inconsistency: the `AsyncStreamingRetry` docstring documents an `is_stream` argument ("Defaults to False") and both of its examples call `AsyncRetry(is_stream=True, ...)`, but the constructor (inherited `_BaseRetry.__init__` in `retry_base.py`) has no `is_stream` parameter. From the function body of `_BaseRetry.__init__` in `retry_base.py` (not documented in the docstring): passing `is_stream=` is swallowed by `**kwargs` and has no effect; only `deadline` is read from `**kwargs`.
- Corrected from the official docs: `def attempt_with_modified_request(target, request, seen_items=[]):` and `retryable_generator = retry_wrapped_fn(target, request)` (sync option 1; mutable default shared across calls).
- Corrected from the official docs: `retryable_gen = StreamingRetry(...)(target)` (sync option 2; the `on_error` callback was not passed).
- Corrected from the official docs: `async def attempt_with_modified_request(target, request, seen_items=[]):` and `retry_wrapped = AsyncRetry(is_stream=True,...)(attempt_with_modified_request, target, request, [])` (async option 1).
- Corrected from the official docs: `retryable_gen = AsyncRetry(is_stream=True, ...)(target)`, `async for item in retryable_gen:` and `elif item != previous_stream[stream_idx]:` / `raise ValueError("Stream differs from last attempt")"` (async option 2).
- Both helpers carry a source `TODO` about `max_attempts` (not supported) and a note that the same args are reused on every attempt.
- Idempotency: restarting a stream re-issues the call; for non-idempotent methods this can duplicate side effects. Use request IDs where the API supports them. This note is not from the docstring.
- Source: https://github.com/googleapis/google-cloud-python/blob/google-api-core-v2.44.0/packages/google-api-core/google/api_core/retry/retry_streaming.py (retrieved 2026-11-16; pinned at tag google-api-core-v2.44.0)
- Source: https://github.com/googleapis/google-cloud-python/blob/google-api-core-v2.44.0/packages/google-api-core/google/api_core/retry/retry_streaming_async.py (retrieved 2026-11-16; pinned at tag google-api-core-v2.44.0)
- Source: https://github.com/googleapis/google-cloud-python/blob/google-api-core-v2.44.0/packages/google-api-core/google/api_core/retry/retry_base.py (retrieved 2026-11-16; pinned at tag google-api-core-v2.44.0)
- Snippet taken from the docstrings of the first two sources above. Blocks are fragments (`modify_request`, `target`, `request` undefined; the async option 1 block uses a top-level `await`).

## Related

- [retry.md](./retry.md)
- [async-retry.md](./async-retry.md)
- [timeout.md](./timeout.md)
