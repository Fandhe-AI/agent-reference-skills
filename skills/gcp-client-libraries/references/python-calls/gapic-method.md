---
source: https://github.com/googleapis/google-cloud-python/blob/google-api-core-v2.44.0/packages/google-api-core/google/api_core/gapic_v1/method.py
---

# gapic_v1.method: DEFAULT and per-call retry / timeout

`google.api_core.gapic_v1.method` wraps low-level gRPC methods with common functionality. It is used by GAPIC clients to provide common error mapping, retry, timeout, compression, pagination and long-running operations. The wrapped function takes optional `retry`, `timeout` and `compression` arguments. `DEFAULT` is the sentinel meaning "unspecified, so the default should be used".

## Signature / Usage

### Sentinel

```python
DEFAULT = _MethodDefault._DEFAULT_VALUE
```

### `wrap_method`

```python
def wrap_method(
    func,
    default_retry=None,
    default_timeout=None,
    default_compression=None,
    client_info=client_info.DEFAULT_CLIENT_INFO,
    *,
    with_call=False,
    client_options=None,
    method_name=None,
    is_streaming=False,
    kind=_DEFAULT_TRANSPORT_KIND,
    default_host=None,
):
```

### Calling the wrapped function

```python
def __call__(
    self, *args, timeout=DEFAULT, retry=DEFAULT, compression=DEFAULT, **kwargs
):
```

Per the `wrap_method` docstring: calling the wrapped method with no `retry` / `timeout` uses the defaults; `wrapped_get_topic(retry=None)` applies no retry but keeps the default timeout; `wrapped_get_topic(timeout=None, retry=None)` is more or less equivalent to calling the function directly but with error re-mapping; passing a `retry.Retry(...)` object overrides the default retry. If `timeout` or `retry` is `None`, it is not applied.

The late-wrapping order: `func` is first wrapped with the timeout, then with the retry. The documented callstack is `method.__call__() -> Retry.__call__() -> Timeout.__call__() -> wrap_errors() -> get_topic()`.

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `func` | `Callable[Any]` | — | The function to wrap. It should accept an optional `timeout` argument; if `metadata` is not `None` it should accept a `metadata` argument. |
| `default_retry` | `Optional[google.api_core.Retry]` | `None` | Default retry strategy. If `None`, the method will not retry by default. |
| `default_timeout` | `Optional[google.api_core.Timeout]` | `None` | Default timeout strategy; can also be an int or float. If `None`, no timeout is specified by default. |
| `default_compression` | `Optional[grpc.Compression]` | `None` | Default compression. If `None`, no compression is specified by default. |
| `client_info` | `Optional[ClientInfo]` | `DEFAULT_CLIENT_INFO` | Used to create a user-agent string passed as gRPC metadata. If `None`, no user agent metadata is provided. |
| `with_call` | `bool` | `False` | If `True`, wrapped `grpc.UnaryUnaryMulticallable`s return `(response, grpc.Call)`. |
| `client_options` | `Optional[ClientOptions]` | `None` | Client-level behavior such as custom OpenTelemetry tracer providers. |
| `method_name` | `Optional[str]` | `None` | Explicit full RPC method name; used to identify the RPC for observability. |
| `is_streaming` | `bool` | `False` | Whether the RPC is streaming. Streaming methods are currently gated and do not generate Tier 3 spans. |
| `kind` | `str` | `"grpc"` | Transport kind. Allowed values for OpenTelemetry method tracing are `"grpc"` and `"rest"`. |
| `default_host` | `Optional[str]` | `None` | Fallback transport host when `api_endpoint` is not set on `client_options`. |

## Notes

- Applies to google-api-core 2.44.0 (PyPI), Python `>=3.10`.
- Source inconsistency: the `wrap_method` docstring example constructs `default_retry = retry.Retry(deadline=60)` (the `deadline` argument is DEPRECATED, see `retry.md`) and `default_timeout = timeout.Timeout(deadline=60)`, and the `default_timeout` argument is typed `google.api_core.Timeout`, but `google/api_core/timeout.py` defines no `Timeout` class (it defines `TimeToDeadlineTimeout`, `ConstantTimeout`, `ExponentialTimeout`). The example is therefore not reproduced here. The example also omits `default_timeout` from its `wrap_method(get_topic, default_retry)` call.
- The docstring says a numeric `default_timeout` is accepted ("Can also be specified as an int or float"); `timeout.md` describes the timeout classes.
- Per-call `retry=` accepts a `retry.Retry` (see `retry.md`); the same keyword is documented on client methods in the `Retry` module docstring.
- Idempotency: passing `retry=` with a broad predicate to a non-idempotent method can duplicate side effects; use request IDs where the API supports them. This note is not from the docstring.
- This is the Google Cloud client library (`google-cloud-*`) GAPIC layer, distinct from the `google-genai` Gemini SDK (the `google-gemini-api` skill).
- Source: https://github.com/googleapis/google-cloud-python/blob/google-api-core-v2.44.0/packages/google-api-core/google/api_core/gapic_v1/method.py (retrieved 2026-11-16; pinned at tag google-api-core-v2.44.0)
- Snippet taken from the source above (public signatures). Blocks are fragments.

## Related

- [retry.md](./retry.md)
- [timeout.md](./timeout.md)
- [exceptions.md](./exceptions.md)
- [operation-lro.md](./operation-lro.md)
