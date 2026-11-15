---
source: https://github.com/googleapis/google-cloud-python/blob/google-api-core-v2.44.0/packages/google-api-core/google/api_core/client_options.py
---

# ClientOptions

`google.api_core.client_options.ClientOptions` provides a consistent interface for user options across clients. Pass an instance, or a mapping, as `client_options`.

## Signature / Usage

### Signature

```python
class ClientOptions(object):
    def __init__(
        self,
        api_endpoint: Optional[str] = None,
        client_cert_source: Optional[Callable[[], Tuple[bytes, bytes]]] = None,
        client_encrypted_cert_source: Optional[
            Callable[[], Tuple[str, str, bytes]]
        ] = None,
        quota_project_id: Optional[str] = None,
        credentials_file: Optional[str] = None,
        scopes: Optional[Sequence[str]] = None,
        api_key: Optional[str] = None,
        api_audience: Optional[str] = None,
        universe_domain: Optional[str] = None,
        tracer_provider: Optional["opentelemetry.trace.TracerProvider"] = None,
    ): ...

def from_dict(options: Mapping[str, object]) -> ClientOptions: ...
```

### Pass an object

```python
from google.api_core.client_options import ClientOptions
from google.cloud.vision_v1 import ImageAnnotatorClient

def get_client_cert():
    # code to load client certificate and private key.
    return client_cert_bytes, client_private_key_bytes

options = ClientOptions(api_endpoint="foo.googleapis.com",
    client_cert_source=get_client_cert)

client = ImageAnnotatorClient(client_options=options)
```

### Pass a mapping

```python
from google.cloud.vision_v1 import ImageAnnotatorClient

client = ImageAnnotatorClient(
    client_options={
        "api_endpoint": "foo.googleapis.com",
        "client_cert_source" : get_client_cert
    })
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `api_endpoint` | `Optional[str]` | Desired API endpoint, e.g. `compute.googleapis.com` |
| `client_cert_source` | `Optional[Callable[[], Tuple[bytes, bytes]]]` | Callback returning client certificate bytes and private key bytes, both PEM. Mutually exclusive with `client_encrypted_cert_source` |
| `client_encrypted_cert_source` | `Optional[Callable[[], Tuple[str, str, bytes]]]` | Callback returning certificate file path, encrypted private key file path and passphrase bytes. Mutually exclusive with `client_cert_source` |
| `quota_project_id` | `Optional[str]` | A project name that a client's quota belongs to |
| `credentials_file` | `Optional[str]` | Deprecated. Path to a credentials file. Mutually exclusive with `api_key`. Will be removed in the next major version of `google-api-core` |
| `scopes` | `Optional[Sequence[str]]` | OAuth access token override scopes |
| `api_key` | `Optional[str]` | Google API key. Mutually exclusive with `credentials_file` |
| `api_audience` | `Optional[str]` | Intended audience for API calls, set when using certain third-party authentication flows. Typically a resource identifier; defaults to the service endpoint value. Example: `"https://language.googleapis.com"` |
| `universe_domain` | `Optional[str]` | Desired universe domain; must match the one in credentials. Default `googleapis.com`. If both `api_endpoint` and `universe_domain` are set, `api_endpoint` is used; otherwise the endpoint format is `{service}.{universe_domain}` |
| `tracer_provider` | `Optional["opentelemetry.trace.TracerProvider"]` | OpenTelemetry tracer provider used for tracing in supported libraries |

## Notes

- Raises `ValueError` if both `client_cert_source` and `client_encrypted_cert_source` are provided, or both `credentials_file` and `api_key`. From the function bodies of `from_dict` and `ClientOptions.__init__` in `client_options.py` (not documented in the docstrings): `from_dict` raises `ValueError` ("ClientOptions does not accept an option '<key>'") for an unknown key, and `__init__` emits a `DeprecationWarning` when `credentials_file` is passed.
- Docstring security warning: if you accept a credential configuration (JSON/file/stream) from an external source, validate it before passing it to any Google API or client library; an unvalidated configuration can compromise your systems. See https://cloud.google.com/docs/authentication/external/externally-sourced-credentials.
- Service account keys are a security risk; prefer ADC with attached service accounts, impersonation or Workload Identity Federation (see `gcp-foundation`).
- Fragments: `client_cert_bytes` / `client_private_key_bytes` are undefined in the docstring example and `get_client_cert` is reused undefined in the mapping example; the signature block is the verbatim `def` with `: ...` bodies.
- Snippet taken from https://github.com/googleapis/google-cloud-python/blob/google-api-core-v2.44.0/packages/google-api-core/google/api_core/client_options.py (signature and docstring examples). Examples use the `google-cloud-vision` client name as in the docstring.
- Behavior of a handwritten `google-cloud-core` client with these options is in `cloud-core-client.md`. Universe handling in `universe-domain.md`; tracing in `opentelemetry-tracing.md`.
- Applies to google-api-core 2.44.0.
- Source: https://github.com/googleapis/google-cloud-python/blob/google-api-core-v2.44.0/packages/google-api-core/google/api_core/client_options.py (retrieved 2026-11-16; pinned at tag google-api-core-v2.44.0, Apache 2.0)

## Related

- [universe-domain.md](./universe-domain.md)
- [client-info.md](./client-info.md)
- [opentelemetry-tracing.md](./opentelemetry-tracing.md)
- [cloud-core-client.md](./cloud-core-client.md)
