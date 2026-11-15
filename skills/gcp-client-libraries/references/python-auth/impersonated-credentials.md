---
source: https://github.com/googleapis/google-cloud-python/blob/google-auth-v2.62.2/packages/google-auth/docs/user-guide.rst
---

# Impersonated Credentials

`google.auth.impersonated_credentials.Credentials` lets one set of credentials issued to a user or service account impersonate a service account. The User Guide calls impersonation the preferred way of using a service account for local development, instead of downloading the service account key. The source credentials must be granted the "Service Account Token Creator" IAM role on the target.

## Signature / Usage

Official example (it uses a key file for the source credentials; see Notes):

Adapted (not in the official docs): adds the `service_account` and `storage` imports the example omits, as written elsewhere in the same guide (`from google.oauth2 import service_account`, `from google.cloud import storage`).

```python
from google.auth import impersonated_credentials
from google.cloud import storage
from google.oauth2 import service_account

target_scopes = ['https://www.googleapis.com/auth/devstorage.read_only']
source_credentials = service_account.Credentials.from_service_account_file(
    '/path/to/svc_account.json',
    scopes=target_scopes)

target_credentials = impersonated_credentials.Credentials(
    source_credentials=source_credentials,
    target_principal='impersonated-account@_project_.iam.gserviceaccount.com',
    target_scopes=target_scopes,
    lifetime=500)
client = storage.Client(credentials=target_credentials)
buckets = client.list_buckets(project='your_project')
for bucket in buckets:
    print(bucket.name)
```

In the example, `source_credentials` has no direct access to list buckets in the target project; impersonation lets it assume a `target_principal` that does.

Constructor signature:

```python
    def __init__(
        self,
        source_credentials,
        target_principal,
        target_scopes,
        delegates=None,
        subject=None,
        lifetime=_DEFAULT_TOKEN_LIFETIME_SECS,
        quota_project_id=None,
        iam_endpoint_override=None,
        trust_boundary=None,
    ):
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| source_credentials | `google.auth.credentials.Credentials` | required | Credential used to acquire the impersonated credentials |
| target_principal | `str` | required | Service account to impersonate |
| target_scopes | `Sequence[str]` | required | Scopes requested during the authorization grant |
| delegates | `Sequence[str]` | `None` | Chained delegates; each identity needs Token Creator on the next. With `[B, C]`: source needs it on B, B on C, C on `target_principal`. If unset, source needs it on `target_principal` |
| subject | `str` | `None` | JWT `sub`; set only to impersonate a user (domain-wide delegation) |
| lifetime | `int` | `3600` | Seconds the credential is valid, up to 3600 |
| quota_project_id | `str` | `None` | Project for quota and billing; may differ from the project used to create the credentials |
| iam_endpoint_override | `str` | `None` | Full IAM endpoint with the target principal embedded; for regional endpoints |
| trust_boundary | `Mapping[str,str]` | `None` | A credential trust boundary |

## Notes

- Enable the IAM Credentials API on the source project (docstring: `gcloud services enable iamcredentials.googleapis.com`). A `RefreshError` commonly means `iamcredentials.googleapis.com` is not enabled or the Service Account Token Creator role is not assigned.
- Service account keys are a security risk; prefer ADC with attached service accounts, impersonation or Workload Identity Federation (see `gcp-foundation`). The example's key-file source is the documented form; `google.auth.default()` credentials (see [adc-default.md](./adc-default.md)) can also be a source credential.
- Corrected from the official docs: the guide's example has no `service_account` / `storage` imports; it starts with only `from google.auth import impersonated_credentials`.
- The docstring writes the type as `google.auth.Credentials`; the class is `google.auth.credentials.Credentials`.
- Security: the class does not validate credential configuration. A configuration with malicious URLs from an untrusted source is a risk; validate it first.
- ID tokens for the target: see [id-tokens.md](./id-tokens.md).
- Applies to google-auth 2.62.2 (PyPI); Python `>=3.10`.
- Source: https://github.com/googleapis/google-cloud-python/blob/google-auth-v2.62.2/packages/google-auth/docs/user-guide.rst (retrieved 2026-11-16; pinned at tag google-auth-v2.62.2)
- Snippet taken from https://github.com/googleapis/google-cloud-python/blob/google-auth-v2.62.2/packages/google-auth/google/auth/impersonated_credentials.py (constructor signature).
- Source: https://github.com/googleapis/google-cloud-python/blob/google-auth-v2.62.2/packages/google-auth/google/auth/impersonated_credentials.py (retrieved 2026-11-16; pinned at tag google-auth-v2.62.2)

## Related

- [service-account-credentials.md](./service-account-credentials.md)
- [id-tokens.md](./id-tokens.md)
- [downscoped-credentials.md](./downscoped-credentials.md)
