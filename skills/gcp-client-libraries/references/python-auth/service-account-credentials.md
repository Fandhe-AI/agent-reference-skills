---
source: https://github.com/googleapis/google-cloud-python/blob/google-auth-v2.62.2/packages/google-auth/docs/user-guide.rst
---

# Service Account Credentials (Private Key Files)

A service account private key file can be used to obtain credentials for a service account. The User Guide lists this as the fallback: use it only if you cannot use any of the other authentication methods (ADC on a Google Cloud host, impersonation, workload identity federation).

> Private keys must be kept secret. If you expose your private key it is recommended to revoke it immediately from the Google Cloud Console. (Official warning.)

## Signature / Usage

You can create a private key on the Credentials page of the Google Cloud Console, then obtain credentials one of three ways.

### 1. Environment variable plus ADC

Adapted (not in the official docs): removed the `$` shell prompt so the command can be pasted.

```bash
export GOOGLE_APPLICATION_CREDENTIALS=/path/to/key.json
```

Then use application default credentials. `google.auth.default()` checks `GOOGLE_APPLICATION_CREDENTIALS` before all other checks, so this always uses the credentials you explicitly specify.

### 2. From a key file

```python
from google.oauth2 import service_account

credentials = service_account.Credentials.from_service_account_file(
    '/path/to/key.json')

scoped_credentials = credentials.with_scopes(
    ['https://www.googleapis.com/auth/cloud-platform'])
```

### 3. From key contents already in memory

```python
import json

from google.oauth2 import service_account

json_acct_info = json.loads(function_to_get_json_creds())
credentials = service_account.Credentials.from_service_account_info(
    json_acct_info)

scoped_credentials = credentials.with_scopes(
    ['https://www.googleapis.com/auth/cloud-platform'])
```

## Notes

- Service account keys are a security risk; prefer ADC with attached service accounts, impersonation or Workload Identity Federation (see `gcp-foundation`).
- Keep key files out of source control and images, restrict file permissions, and never print or log key contents or the tokens derived from them.
- Load key material for method 3 from a secret store (for example Secret Manager) rather than a literal; `function_to_get_json_creds()` is a placeholder in the official example and is not defined by the library (fragment).
- Validate any credential configuration that comes from an external source before use (see [credential-types.md](./credential-types.md)).
- A service account key can also be the source for impersonation and for ID tokens; see [impersonated-credentials.md](./impersonated-credentials.md) and [id-tokens.md](./id-tokens.md).
- Corrected from the official docs: `$ export GOOGLE_APPLICATION_CREDENTIALS=/path/to/key.json`.
- Applies to google-auth 2.62.2 (PyPI); Python `>=3.10`.
- Source: https://github.com/googleapis/google-cloud-python/blob/google-auth-v2.62.2/packages/google-auth/docs/user-guide.rst (retrieved 2026-11-16; pinned at tag google-auth-v2.62.2)

## Related

- [adc-default.md](./adc-default.md)
- [impersonated-credentials.md](./impersonated-credentials.md)
- [credential-types.md](./credential-types.md)
