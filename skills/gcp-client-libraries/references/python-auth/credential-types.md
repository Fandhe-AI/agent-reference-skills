---
source: https://github.com/googleapis/google-cloud-python/blob/google-auth-v2.62.2/packages/google-auth/docs/user-guide.rst
---

# Credential Types and Account Types (google-auth)

`google-auth` is the Google authentication library for Python. A `google.auth.credentials.Credentials` object identifies an application or user to a service or API. Credentials come from three kinds of accounts: service accounts, user accounts and external accounts.

## Signature / Usage

### Install

Adapted (not in the official docs): removed the `$` shell prompt so the command can be pasted.

```bash
pip install --upgrade google-auth
```

### Extras

Adapted (not in the official docs): removed the `$` shell prompt so the command can be pasted, and quoted the extra so zsh does not treat `[pyopenssl]` as a glob.

```bash
pip install 'google-auth[pyopenssl]'
```

The extras `pyopenssl` and `enterprise_cert` should not be used together because they use conflicting versions of `cryptography`.

### Account types

| Account type | Used for | Library support |
|---|---|---|
| Service account | Identifies a particular application (server-to-server, e.g. accessing a database) | The library "primarily focuses" on these |
| User account | Obtained by asking the user to authorize access to their data (e.g. a user's Google Drive documents) | No support for *obtaining* user credentials; limited support for *using* them |
| External account (workload identity federation) | Identifies an application on-prem or on a non-Google Cloud platform: AWS, Azure, any OIDC provider, or X.509 certificates | Supported |

### Where each type is documented

| Credential type | Page |
|---|---|
| Application Default Credentials (`google.auth.default()`) | [adc-default.md](./adc-default.md) |
| Service account private key files | [service-account-credentials.md](./service-account-credentials.md) |
| User credentials (`google.oauth2.credentials`) | [user-credentials.md](./user-credentials.md) |
| Compute Engine / App Engine standard | [compute-engine-credentials.md](./compute-engine-credentials.md) |
| External accounts (workload identity federation) | [external-account-wif.md](./external-account-wif.md), [external-account-executable.md](./external-account-executable.md), [external-account-custom-suppliers.md](./external-account-custom-suppliers.md) |
| Workforce identity federation | [workforce-identity-federation.md](./workforce-identity-federation.md) |
| Impersonated credentials | [impersonated-credentials.md](./impersonated-credentials.md) |
| Downscoped credentials | [downscoped-credentials.md](./downscoped-credentials.md) |
| ID tokens | [id-tokens.md](./id-tokens.md) |
| Transports (`requests`, `urllib3`, gRPC) | [authenticated-requests.md](./authenticated-requests.md) |

## Options / Props

Capabilities listed by the library index:

| Capability | Module |
|---|---|
| Application Default Credentials | `google.auth.default` |
| Signing and verifying JWTs | `google.auth.jwt` |
| Creating Google ID tokens | see [id-tokens.md](./id-tokens.md) |
| Verifying and decoding ID tokens | `google.oauth2.id_token` |
| Service account credentials | `google.oauth2.service_account` |
| Impersonated credentials | `google.auth.impersonated_credentials` |
| Compute Engine credentials | `google.auth.compute_engine` |
| App Engine standard credentials | `google.auth.app_engine` |
| Identity Pool credentials | `google.auth.identity_pool` |
| AWS credentials | `google.auth.aws` |
| Downscoping with Credential Access Boundaries | `google.auth.downscoped` |
| Transports | `google.auth.transport.requests`, `google.auth.transport.urllib3`, `google.auth.transport.grpc` |

## Notes

- Security warning from the User Guide: if you accept a credential configuration (credential JSON / file / stream) from an external source for authentication to Google Cloud, you must validate it before providing it to any Google API or client library. An unvalidated credential configuration can compromise the security of your systems and data. See `https://cloud.google.com/docs/authentication/external/externally-sourced-credentials`.
- Service account keys are a security risk; prefer ADC with attached service accounts, impersonation or Workload Identity Federation (see `gcp-foundation`).
- Never print, log or return access tokens or ID tokens obtained from these credentials.
- Corrected from the official docs: `$ pip install --upgrade google-auth` (index page) and `$ pip install google-auth[pyopenssl]` (README).
- `oauth2client` was deprecated in favor of this library (per the index page).
- Applies to google-auth 2.62.2 (PyPI); Python `>=3.10`. License: Apache-2.0.
- This is the Google Cloud client-library auth layer (`google-auth`, used by `google-cloud-*` packages) and is distinct from the `google-genai` Gemini SDK (the `google-gemini-api` skill).
- Source: https://github.com/googleapis/google-cloud-python/blob/google-auth-v2.62.2/packages/google-auth/docs/user-guide.rst (retrieved 2026-11-16; pinned at tag google-auth-v2.62.2)
- Source: https://github.com/googleapis/google-cloud-python/blob/google-auth-v2.62.2/packages/google-auth/README.rst (retrieved 2026-11-16; pinned at tag google-auth-v2.62.2; supported Python versions: `>= 3.10`, consistent with the pin)
- Source: https://github.com/googleapis/google-cloud-python/blob/google-auth-v2.62.2/packages/google-auth/docs/index.rst (retrieved 2026-11-16; pinned at tag google-auth-v2.62.2)

## Related

- [adc-default.md](./adc-default.md)
- [service-account-credentials.md](./service-account-credentials.md)
- [external-account-wif.md](./external-account-wif.md)
