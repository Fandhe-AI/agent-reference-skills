---
source: https://github.com/googleapis/google-cloud-python/blob/google-cloud-core-v2.8.0/packages/google-cloud-core/google/cloud/client/__init__.py
---

# google.cloud.client.Client and ClientWithProject

Base classes for handwritten `google-cloud-*` clients: `Client` bundles credentials and an HTTP object, `ClientWithProject` also stores a project.

## Signature / Usage

### Signatures

```python
class Client(_ClientFactoryMixin):
    def __init__(self, credentials=None, _http=None, client_options=None): ...
    def close(self): ...

class ClientWithProject(Client, _ClientProjectMixin):
    def __init__(self, project=None, credentials=None, client_options=None, _http=None): ...
```

### Close a client

```python
import contextlib

with contextlib.closing(client):  # closes on exit
    do_something_with(client)
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `credentials` | `google.auth.credentials.Credentials` | Optional. If not passed (and no `_http`), falls back to the default inferred from the environment |
| `client_options` | `google.api_core.client_options.ClientOptions` | Optional. Custom options for the client |
| `project` | `str` | `ClientWithProject` only. Falls back to the default inferred from the environment (see `cloud-core-config.md`) |
| `_http` | `requests.Session`-like | Private; "could change in the future". Any object with `request()` like `requests.Session.request` |
| `SCOPE` | `Tuple[str, ...]` or `None` | Class attribute; scopes required for a service; set by subclasses |

## Notes

- Raises `google.auth.exceptions.DefaultCredentialsError` if `credentials` is not specified and default credentials cannot be acquired.
- The class docstring says: if no `_http` is passed, a `requests.Session` is created and authorized with the `credentials`. Callers and subclasses may use the private key from `credentials` to sign data.
- Clients are not pickleable: `__getstate__` raises `PicklingError` ("Pickling client objects is explicitly not supported").
- Further behavior of `Client.__init__` (scopes fallback, quota project, API key / credentials-file exclusion, dict `client_options`) is implemented in code without docstring prose and is intentionally not described here.
- Factories `Client.from_service_account_info(info, ...)` and `Client.from_service_account_json(path, ...)` build credentials from a service account key. Service account keys are a security risk; prefer ADC with attached service accounts, impersonation or Workload Identity Federation (see `gcp-foundation`). Passing `credentials` in kwargs to these factories raises `TypeError`.
- Applies to google-cloud-core 2.8.0. Snippet taken from https://github.com/googleapis/google-cloud-python/blob/google-cloud-core-v2.8.0/packages/google-cloud-core/google/cloud/client/__init__.py (public signatures and the `close()` docstring).
- Source: https://github.com/googleapis/google-cloud-python/blob/google-cloud-core-v2.8.0/packages/google-cloud-core/google/cloud/client/__init__.py (retrieved 2026-11-16; pinned at tag google-cloud-core-v2.8.0, Apache 2.0)

## Related

- [cloud-core-config.md](./cloud-core-config.md)
- [client-options.md](./client-options.md)
- [api-core-authentication.md](./api-core-authentication.md)
