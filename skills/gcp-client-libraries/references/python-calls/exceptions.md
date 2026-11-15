---
source: https://github.com/googleapis/google-cloud-python/blob/google-api-core-v2.44.0/packages/google-api-core/google/api_core/exceptions.py
---

# exceptions (google.api_core.exceptions)

Exceptions raised by Google API core and clients, covering both HTTP and gRPC clients. `GoogleAPIError` is the base for all of them; `GoogleAPICallError` is the base for exceptions raised by calling API methods, and its subclasses map HTTP status codes and gRPC status codes.

## Signature / Usage

### Base class and mapping helpers

```python
class GoogleAPICallError(GoogleAPIError, metaclass=_GoogleAPICallErrorMeta):
    def __init__(self, message, errors=(), details=(), response=None, error_info=None):
```

```python
def from_http_status(status_code, message, **kwargs):
def from_http_response(response):
def exception_class_for_http_status(status_code):
def from_grpc_status(status_code, message, **kwargs):
def from_grpc_error(rpc_exc):
def exception_class_for_grpc_status(status_code):
```

```python
def format_http_response_error(
    response, method: str, url: str, payload: Optional[Dict] = None
):
```

## Options / Props

### `GoogleAPICallError` constructor and properties

| Name | Type | Description |
| --- | --- | --- |
| `message` | `str` | The exception message. |
| `errors` | `Sequence[Any]` | Optional list of error details. Property returns a list of additional error details. |
| `details` | `Sequence[Any]` | Optional list of objects defined in `google.rpc.error_details`. Property: information contained in `google.rpc.status.details`; a list of structured objects from `error_details.proto`. |
| `response` | `Union[requests.Request, grpc.Call]` | The response or gRPC call metadata. |
| `error_info` | `Optional[error_details_pb2.ErrorInfo]` | Optional `google.rpc.error_details.ErrorInfo`. |
| `code` (class attr) | `Optional[int]` | The HTTP status code associated with this error; `None` if there is no direct HTTP mapping. |
| `grpc_status_code` (class attr) | `Optional[grpc.StatusCode]` | The gRPC status code associated with this error; `None` if there is no gRPC match. |
| `reason` | `Union[str, None]` | The reason of the error (from `ErrorInfo`); `None` when no error info. |
| `domain` | `Union[str, None]` | The logical grouping to which the `reason` belongs (from `ErrorInfo`). |
| `metadata` | `Union[Dict[str, str], None]` | Additional structured details about the error (from `ErrorInfo`). |

### Class hierarchy and codes

| Class | Parent | HTTP `code` | gRPC `grpc_status_code` |
| --- | --- | --- | --- |
| `GoogleAPIError` | `Exception` | — | — |
| `DuplicateCredentialArgs` | `GoogleAPIError` | — | — |
| `RetryError` | `GoogleAPIError` | — | — |
| `GoogleAPICallError` | `GoogleAPIError` | — | — |
| `Redirection` | `GoogleAPICallError` | — | — |
| `MovedPermanently` / `NotModified` / `TemporaryRedirect` | `Redirection` | 301 / 304 / 307 | — |
| `ResumeIncomplete` | `Redirection` | 308 | — |
| `ClientError` (4xx base) | `GoogleAPICallError` | — | — |
| `BadRequest` | `ClientError` | 400 | — |
| `InvalidArgument` / `FailedPrecondition` / `OutOfRange` | `BadRequest` | (inherited 400) | `INVALID_ARGUMENT` / `FAILED_PRECONDITION` / `OUT_OF_RANGE` |
| `Unauthorized` | `ClientError` | 401 | — |
| `Unauthenticated` | `Unauthorized` | (401) | `UNAUTHENTICATED` |
| `Forbidden` | `ClientError` | 403 | — |
| `PermissionDenied` | `Forbidden` | (403) | `PERMISSION_DENIED` |
| `NotFound` | `ClientError` | 404 | `NOT_FOUND` |
| `MethodNotAllowed` | `ClientError` | 405 | — |
| `Conflict` | `ClientError` | 409 | — |
| `AlreadyExists` / `Aborted` | `Conflict` | (409) | `ALREADY_EXISTS` / `ABORTED` |
| `LengthRequired` / `PreconditionFailed` / `RequestRangeNotSatisfiable` | `ClientError` | 411 / 412 / 416 | — |
| `TooManyRequests` | `ClientError` | 429 | — |
| `ResourceExhausted` | `TooManyRequests` | (429) | `RESOURCE_EXHAUSTED` |
| `Cancelled` | `ClientError` | 499 | `CANCELLED` |
| `ServerError` (5xx base) | `GoogleAPICallError` | — | — |
| `InternalServerError` | `ServerError` | 500 | `INTERNAL` |
| `Unknown` / `DataLoss` | `ServerError` | — | `UNKNOWN` / `DATA_LOSS` |
| `MethodNotImplemented` | `ServerError` | 501 | `UNIMPLEMENTED` |
| `BadGateway` | `ServerError` | 502 | — |
| `ServiceUnavailable` | `ServerError` | 503 | `UNAVAILABLE` |
| `GatewayTimeout` | `ServerError` | 504 | — |
| `DeadlineExceeded` | `GatewayTimeout` | (504) | `DEADLINE_EXCEEDED` |
| `ResumableTransferError` | `GoogleAPICallError` | — | — |
| `TransferStalledError` / `UnseekableStreamError` / `UploadCancelledError` / `MissingStatusHeaderError` | `ResumableTransferError` | — | — |
| `AsyncRestUnsupportedParameterError` | `NotImplementedError` (outside the hierarchy) | — | — |

Parenthesized values are inherited from the parent class. `Cancelled` maps to 499 per a source comment pointing to `google/rpc/code.proto`.

### Helpers

| Function | Description |
| --- | --- |
| `from_http_status(status_code, message, **kwargs)` | Creates the appropriate `GoogleAPICallError` subclass from an HTTP status code; extra kwargs go to the constructor. |
| `from_http_response(response)` | From a `requests.Response`, with message and errors populated from the response. |
| `format_http_response_error(response, method, url, payload=None)` | From a `google.auth` REST response (sync or async), with the message and errors populated from the response. From the function body (not the docstring): `details` and the first `ErrorInfo` detail are also taken from the payload. |
| `from_grpc_status(status_code, message, **kwargs)` | From a `grpc.StatusCode` (or int). |
| `from_grpc_error(rpc_exc)` | From a `grpc.RpcError`. |
| `exception_class_for_http_status` / `exception_class_for_grpc_status` | Return the exception class for a status code. |

`RetryError(message, cause)` is "raised when a function has exhausted all of its available retries"; `cause` is the last exception raised when retrying.

## Notes

- Applies to google-api-core 2.44.0 (PyPI), Python `>=3.10`. From the module-level code of `exceptions.py` (not documented in a docstring): `grpc` / `grpcio-status` are optional imports; without `grpc` the `grpc_status_code` values are `None`; without `grpcio-status` a warning asks to install it "to obtain helpful grpc error messages".
- The module comments state `format_http_response_error` is replacing `from_http_status` ("We're moving away from `from_http_status`") because the former works with both sync and async responses.
- Retry predicate relevance: `if_transient_error` (see `retry.md`) uses `InternalServerError`, `TooManyRequests` and `ServiceUnavailable`. Retrying write-style calls on these can duplicate side effects; use request IDs where the API supports them. This note is not from the docstring.
- Source: https://github.com/googleapis/google-cloud-python/blob/google-api-core-v2.44.0/packages/google-api-core/google/api_core/exceptions.py (retrieved 2026-11-16; pinned at tag google-api-core-v2.44.0)
- Snippet taken from the source above (public signatures). Blocks are fragments.

## Related

- [retry.md](./retry.md)
- [operation-lro.md](./operation-lro.md)
- [polling.md](./polling.md)
