---
source: https://github.com/googleapis/google-cloud-python/blob/google-auth-v2.62.2/packages/google-auth/docs/user-guide.rst
---

# ID Tokens: fetch_id_token and IDTokenCredentials

Google OpenID Connect (ID) tokens are available through service account, impersonated and Compute Engine credentials. They authenticate to Cloud Functions, Cloud Run, services behind Identity-Aware Proxy, or any service that can verify a Google ID token.

## Signature / Usage

### From the running environment

On App Engine, Cloud Run, Compute Engine, or with application default credentials set via `GOOGLE_APPLICATION_CREDENTIALS`, use `google.oauth2.id_token.fetch_id_token`:

```python
import google.oauth2.id_token
import google.auth.transport.requests

request = google.auth.transport.requests.Request()
target_audience = "https://pubsub.googleapis.com"

id_token = google.oauth2.id_token.fetch_id_token(request, target_audience)
```

### Service account

```python
from google.oauth2 import service_account

target_audience = 'https://example.com'

creds = service_account.IDTokenCredentials.from_service_account_file(
        '/path/to/svc.json',
        target_audience=target_audience)
```

### Compute Engine

```python
from google.auth import compute_engine
import google.auth.transport.requests

target_audience = 'https://example.com'

request = google.auth.transport.requests.Request()
creds = compute_engine.IDTokenCredentials(request,
                        target_audience=target_audience)
```

### Impersonated

```python
from google.auth import impersonated_credentials

# get target_credentials from a source_credential

target_audience = 'https://example.com'

creds = impersonated_credentials.IDTokenCredentials(
                                  target_credentials,
                                  target_audience=target_audience)
```

### Verify an ID token

`google.oauth2.id_token` verifies tokens signed with RS256 and ES256. ES256 requires the `cryptography` dependency at version 1.4.0 or newer (check with `pip freeze` or `from google.auth.crypt import es256`).

Adapted (not in the official docs): the official example imports `from google.auth2 import id_token` (no such module; the module is `google.oauth2.id_token`), imports the transport it uses, has an `except` body that is only a comment, and passes `audience=` so tokens minted for other audiences are rejected (without it `verify_token` does not verify the audience).

```python
from google.oauth2 import id_token
import google.auth.transport.requests

request = google.auth.transport.requests.Request()

try:
    decoded_token = id_token.verify_token(
        token_to_verify, request, audience=expected_audience)
except ValueError:
    # Verification failed.
    raise
```

### End-to-end: ID token against a Cloud Run endpoint

Adapted (not in the official docs): the official example prints the raw token and the decoded claims; this version only reports whether verification succeeded, and passes `audience=target_audience` to `verify_token`.

```python
from google.oauth2 import id_token
from google.oauth2 import service_account
import google.auth
import google.auth.transport.requests
from google.auth.transport.requests import AuthorizedSession

target_audience = 'https://your-cloud-run-app.a.run.app'
url = 'https://your-cloud-run-app.a.run.app'

creds = service_account.IDTokenCredentials.from_service_account_file(
        '/path/to/svc.json', target_audience=target_audience)

authed_session = AuthorizedSession(creds)

# make authenticated request and print the response, status_code
resp = authed_session.get(url)
print(resp.status_code)
print(resp.text)

# to verify an ID Token
request = google.auth.transport.requests.Request()
token = creds.token
claims = id_token.verify_token(token, request, audience=target_audience)
print("ID token verified:", bool(claims))
```

## Options / Props

`impersonated_credentials.IDTokenCredentials` (from `impersonated_credentials.py`):

| Name | Type | Default | Description |
|------|------|---------|-------------|
| target_credentials | `google.auth.credentials.Credentials` | required | Target credential used to acquire the ID tokens for |
| target_audience | `str` | `None` | Audience to issue the token for |
| include_email | `bool` | `False` | Include the email in the ID token |
| quota_project_id | `str` | `None` | Project used for quota and billing |

## Notes

- Never print, log or return an ID token; it is a bearer credential. Print only a non-secret indicator such as verification success.
- Adapted from the official docs: the original end-to-end block ran `print(token)` and `print(id_token.verify_token(token,request))`; the verify example began `from google.auth2 import id_token` and `except ValueError:` followed only by the comment `# Verification failed.`; both blocks called `verify_token` without an audience (`decoded_token = id_token.verify_token(token_to_verify,request)` and `id_token.verify_token(token,request)`).
- Service account keys are a security risk; prefer ADC with attached service accounts, impersonation or Workload Identity Federation (see `gcp-foundation`). The key-file `from_service_account_file('/path/to/svc.json', ...)` forms above are as documented; on Cloud Run or Compute Engine prefer `fetch_id_token` or `compute_engine.IDTokenCredentials`.
- `verify_token` checks the audience only when `audience=` is passed; its docstring says "If None then the audience is not verified." For tokens from Google's OAuth 2.0 authorization server, the module docstring points to `verify_oauth2_token`, which also raises `exceptions.GoogleAuthError` "If the issuer is invalid".
- Fragments: `target_credentials`, `token_to_verify` and `expected_audience` are placeholders.
- The Cloud Run `url` and `target_audience` are placeholders for your own service URL.
- The docstring writes the type as `google.auth.Credentials`; the class is `google.auth.credentials.Credentials`.
- Applies to google-auth 2.62.2 (PyPI); Python `>=3.10`.
- Source: https://github.com/googleapis/google-cloud-python/blob/google-auth-v2.62.2/packages/google-auth/docs/user-guide.rst (retrieved 2026-11-16; pinned at tag google-auth-v2.62.2)
- Source: https://github.com/googleapis/google-cloud-python/blob/google-auth-v2.62.2/packages/google-auth/google/auth/impersonated_credentials.py (retrieved 2026-11-16; pinned at tag google-auth-v2.62.2)
- Source: https://github.com/googleapis/google-cloud-python/blob/google-auth-v2.62.2/packages/google-auth/google/oauth2/id_token.py (retrieved 2026-11-16; pinned at tag google-auth-v2.62.2)

## Related

- [impersonated-credentials.md](./impersonated-credentials.md)
- [service-account-credentials.md](./service-account-credentials.md)
- [authenticated-requests.md](./authenticated-requests.md)
