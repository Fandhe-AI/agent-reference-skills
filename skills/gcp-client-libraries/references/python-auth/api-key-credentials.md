---
source: https://github.com/googleapis/google-cloud-python/blob/google-auth-v2.62.2/packages/google-auth/google/auth/api_key.py
---

# API Key Credentials (google.auth.api_key)

`google.auth.api_key.Credentials` provides authorization to applications using an API key. This page is source-only: it records what the module docstrings state, because the User Guide does not cover API keys.

## Signature / Usage

```python
class Credentials(credentials.Credentials):
    """API key credentials.
    These credentials use API key to provide authorization to applications.
    """

    def __init__(self, token):
        """
        Args:
            token (str): API key string
        Raises:
            ValueError: If the provided API key is not a non-empty string.
        """
```

```python
    def apply(self, headers, token=None):
        """Apply the API key token to the x-goog-api-key header.
        Args:
            headers (Mapping): The HTTP request headers.
            token (Optional[str]): If specified, overrides the current access
                token.
        """
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| token (`__init__`) | `str` | API key string; must be a non-empty string |
| headers (`apply`) | `Mapping` | The HTTP request headers |
| token (`apply`) | `Optional[str]` | If specified, overrides the current access token |

## Notes

- The API key is applied to the `x-goog-api-key` header, per the `apply` docstring.
- Read the API key from an environment variable or Secret Manager; never hard-code a literal and never print or log it. Pass the value as `token`, for example `api_key.Credentials(token=<value read from your secret source>)`.
- Snippet taken from https://github.com/googleapis/google-cloud-python/blob/google-auth-v2.62.2/packages/google-auth/google/auth/api_key.py (class and `apply` signatures with docstrings).
- The `__init__` docstring documents `ValueError` for an empty or non-string key.
- Applies to google-auth 2.62.2 (PyPI); Python `>=3.10`. API key authentication for individual Google Cloud APIs is product-specific.
- Source: https://github.com/googleapis/google-cloud-python/blob/google-auth-v2.62.2/packages/google-auth/google/auth/api_key.py (retrieved 2026-11-16; pinned at tag google-auth-v2.62.2)

## Related

- [credential-types.md](./credential-types.md)
- [authenticated-requests.md](./authenticated-requests.md)
