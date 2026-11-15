---
source: https://github.com/googleapis/google-cloud-python/blob/google-auth-v2.62.2/packages/google-auth/docs/user-guide.rst
---

# User Credentials

User credentials are typically obtained via OAuth 2.0. `google-auth` does not provide direct support for obtaining them, but you can use them: obtain an access token with a library such as `oauthlib`, then wrap it in `google.oauth2.credentials.Credentials`.

## Signature / Usage

### From an access token

```python
import google.oauth2.credentials

credentials = google.oauth2.credentials.Credentials(
    'access_token')
```

### With refresh support

Specify the refresh token and token URI so the credentials refresh automatically:

```python
credentials = google.oauth2.credentials.Credentials(
    'access_token',
    refresh_token='refresh_token',
    token_uri='token_uri',
    client_id='client_id',
    client_secret='client_secret')
```

### With google-auth-oauthlib

A separate library, `google-auth-oauthlib`, integrates with `requests-oauthlib`. `google_auth_oauthlib.helpers.credentials_from_session` converts a `requests_oauthlib.OAuth2Session` into `google.oauth2.credentials.Credentials`:

```python
from google_auth_oauthlib.helpers import credentials_from_session

google_auth_credentials = credentials_from_session(oauth2session)
```

`google_auth_oauthlib.flow.Flow` performs the OAuth 2.0 Authorization Grant Flow with `requests-oauthlib`.

## Notes

- The strings `'access_token'`, `'refresh_token'`, `'token_uri'`, `'client_id'`, `'client_secret'` are placeholders. Read real values from a secret store or environment, never hard-code them, and never print or log them. `oauth2session` is a placeholder for an existing session (fragment).
- `google-auth-oauthlib` is a separate PyPI package and is not part of google-auth 2.62.2.
- Refresh handlers for short-lived tokens are shown in [downscoped-credentials.md](./downscoped-credentials.md).
- Applies to google-auth 2.62.2 (PyPI); Python `>=3.10`.
- Source: https://github.com/googleapis/google-cloud-python/blob/google-auth-v2.62.2/packages/google-auth/docs/user-guide.rst (retrieved 2026-11-16; pinned at tag google-auth-v2.62.2)

## Related

- [credential-types.md](./credential-types.md)
- [adc-default.md](./adc-default.md)
