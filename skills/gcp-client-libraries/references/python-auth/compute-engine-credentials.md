---
source: https://github.com/googleapis/google-cloud-python/blob/google-auth-v2.62.2/packages/google-auth/docs/user-guide.rst
---

# Compute Engine and Metadata-Server Credentials

Applications on Compute Engine, Container Engine, or the App Engine flexible environment obtain credentials from the Compute Engine service account through the metadata server. The App Engine standard environment uses the App Engine App Identity API instead.

## Signature / Usage

### Compute Engine, Container Engine, App Engine flexible

Two ways: use application default credentials (`google.auth.default()` detects them automatically), or use `compute_engine.Credentials` explicitly.

```python
from google.auth import compute_engine

credentials = compute_engine.Credentials()
```

### App Engine standard environment

Per the `default()` docstring, the App Identity Service applies to App Engine standard first generation only; App Engine standard second generation uses the Metadata Service (see [adc-default.md](./adc-default.md)). Use application default credentials, or `app_engine.Credentials`:

```python
from google.auth import app_engine

credentials = app_engine.Credentials()
```

For App Engine standard first generation (not stated in the guide; inferred from the `default()` docstring, which ties the App Identity Service to first generation), to make authenticated requests in App Engine with this library's credentials and transports:

1. If you use the `google.auth.transport.requests` transport, vendor in the `requests-toolbelt` library and enable the App Engine monkeypatch (see the App Engine documentation on issuing requests).
2. To make HTTPS calls, enable the `ssl` library in `app.yaml`:

```yaml
libraries:
- name: ssl
  version: latest
```

3. Enable billing for the App Engine project, then enable socket support through an environment variable in `app.yaml`:

```yaml
env_variables:
  GAE_USE_SOCKETS_HTTPLIB : 'true'
```

## Options / Props

Environment variables that tune metadata-server access (from `google/auth/environment_vars.py`):

| Variable | Description |
|----------|-------------|
| `GCE_METADATA_HOST` | Alternate hostname or `host:port` for GCE metadata requests |
| `GCE_METADATA_ROOT` | Old name of `GCE_METADATA_HOST`; `GCE_METADATA_HOST` is checked first |
| `GCE_METADATA_IP` | Alternate `ip:port` for ip-only GCE metadata requests |
| `GCE_METADATA_TIMEOUT` | Timeout in seconds to wait for the metadata server when detecting GCE |
| `GCE_METADATA_DETECT_RETRIES` | Number of retries on metadata lookup |
| `NO_GCE_CHECK` | Default is false; set to true to disable the GCE check |
| `GCE_METADATA_MTLS_MODE` | mTLS behavior for metadata requests: `"strict"`, `"none"` or `"default"` |
| `APPENGINE_RUNTIME` | Gen1 App Engine runtime variable, used to distinguish GAE gen1 from gen2+ |

## Notes

- `google.auth.default()` covers these environments automatically (steps 3 and 4 of its lookup order); see [adc-default.md](./adc-default.md).
- No key file is involved: the credentials come from the Compute Engine service account attached to the resource. Service account keys are a security risk; prefer ADC with attached service accounts, impersonation or Workload Identity Federation (see `gcp-foundation`).
- Not stated in the guide; inferred from the `default()` docstring, which uses the App Identity Service only for App Engine standard (first generation): the App Engine steps apply to that path. google-auth 2.62.2 requires Python `>=3.10` (setup.py), so check that your runtime supports it.
- Never print or log the tokens that the metadata server returns.
- Applies to google-auth 2.62.2 (PyPI); Python `>=3.10`.
- Source: https://github.com/googleapis/google-cloud-python/blob/google-auth-v2.62.2/packages/google-auth/docs/user-guide.rst (retrieved 2026-11-16; pinned at tag google-auth-v2.62.2)
- Source: https://github.com/googleapis/google-cloud-python/blob/google-auth-v2.62.2/packages/google-auth/google/auth/environment_vars.py (retrieved 2026-11-16; pinned at tag google-auth-v2.62.2)
- Source: https://github.com/googleapis/google-cloud-python/blob/google-auth-v2.62.2/packages/google-auth/google/auth/_default.py (retrieved 2026-11-16; pinned at tag google-auth-v2.62.2)
- Source: https://github.com/googleapis/google-cloud-python/blob/google-auth-v2.62.2/packages/google-auth/setup.py (retrieved 2026-11-16; pinned at tag google-auth-v2.62.2)

## Related

- [adc-default.md](./adc-default.md)
- [id-tokens.md](./id-tokens.md)
- [credential-types.md](./credential-types.md)
