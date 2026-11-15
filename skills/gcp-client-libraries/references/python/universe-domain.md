---
source: https://github.com/googleapis/google-cloud-python/blob/google-api-core-v2.44.0/packages/google-api-core/google/api_core/universe.py
---

# Universe domain helpers

Source-only page (no official guide). `google.api_core.universe` holds helpers for resolving the universe domain and API endpoint. The table comes from the module's docstrings; Notes marked as such are read from code.

## Signature / Usage

### Public signatures

```python
DEFAULT_UNIVERSE = "googleapis.com"

def get_universe_domain(
    *potential_universes: Optional[str],
    default_universe: str,
) -> str: ...

def determine_domain(
    client_universe_domain: Optional[str], universe_domain_env: Optional[str]
) -> str: ...

def compare_domains(client_universe: str, credentials: Any) -> bool: ...

def get_default_mtls_endpoint(api_endpoint: Optional[str]) -> Optional[str]: ...

def get_api_endpoint(
    api_override: Optional[str],
    universe_domain: str,
    default_universe: str,
    default_mtls_endpoint: Optional[str],
    default_endpoint_template: str,
    use_mtls: bool,
) -> str: ...
```

## Options / Props

| Function | Behavior (from docstrings) |
| --- | --- |
| `get_universe_domain(*potential_universes, default_universe)` | Returns the universe domain used by the client; arguments are "potential universe domains in order of preference". Raises `EmptyUniverseError` if the resolved value is an empty string |
| `determine_domain(client_universe_domain, universe_domain_env)` | `client_universe_domain` is the value from client options; `universe_domain_env` is the value of the `GOOGLE_CLOUD_UNIVERSE_DOMAIN` environment variable. Raises `ValueError` if empty |
| `compare_domains(client_universe, credentials)` | Returns `True` iff the client and credentials universe domains match; otherwise raises `ValueError` (the body raises the `ValueError` subclass `UniverseMismatchError`) |
| `get_default_mtls_endpoint(api_endpoint)` | Converts `*.sandbox.googleapis.com` and `*.googleapis.com` to `*.mtls.sandbox.googleapis.com` and `*.mtls.googleapis.com`. Other URLs (including those that already contain `.mtls.`) pass through as-is |
| `get_api_endpoint(...)` | `api_override`, if specified, is always returned. `default_endpoint_template` contains a placeholder `{UNIVERSE_DOMAIN}`. Raises `google.auth.exceptions.MutualTLSChannelError` if mTLS is requested but not supported in the configured universe domain, and `ValueError` if mTLS is requested with no mTLS endpoint |

## Notes

- Default universe domain: `googleapis.com`. `ClientOptions.universe_domain` "must match the one in credentials"; if `api_endpoint` is also set, `api_endpoint` is used as the service endpoint, otherwise the format is `{service}.{universe_domain}` (see `client-options.md`).
- From the exception class bodies in `universe.py` (not documented in docstrings): `UniverseMismatchError` message: "The configured universe domain (...) does not match the universe domain found in the credentials (...). If you haven't configured the universe domain explicitly, `googleapis.com` is the default." `EmptyUniverseError` message: "Universe Domain cannot be an empty string."
- The source states only what is above; the module has no prose guide. Behavior of individual GAPIC clients is not described in this file.
- Snippet taken from https://github.com/googleapis/google-cloud-python/blob/google-api-core-v2.44.0/packages/google-api-core/google/api_core/universe.py (public signatures).
- Applies to google-api-core 2.44.0.
- Source: https://github.com/googleapis/google-cloud-python/blob/google-api-core-v2.44.0/packages/google-api-core/google/api_core/universe.py (retrieved 2026-11-16; pinned at tag google-api-core-v2.44.0, Apache 2.0)

## Related

- [client-options.md](./client-options.md)
