---
source: https://github.com/googleapis/google-cloud-python/blob/google-auth-v2.62.2/packages/google-auth/docs/user-guide.rst
---

# Application Default Credentials: google.auth.default()

Application Default Credentials (ADC) abstract authentication across Google Cloud hosting environments. On any Google Cloud hosting environment, or locally with the Google Cloud SDK installed, `google.auth.default()` determines the credentials from the environment.

## Signature / Usage

```python
import google.auth

credentials, project = google.auth.default()
```

With specific scopes:

```python
credentials, project = google.auth.default(
    scopes=['https://www.googleapis.com/auth/cloud-platform'])
```

Public signature:

```python
def default(
    scopes: Optional[Sequence[str]] = None,
    request: Optional["google.auth.transport.Request"] = None,
    quota_project_id: Optional[str] = None,
    default_scopes: Optional[Sequence[str]] = None,
) -> tuple["google.auth.credentials.Credentials", Optional[str]]:
```

Local development, per the `default()` docstring, enable ADC from the Cloud SDK with:

```bash
gcloud auth application-default login
```

The docstring says the active gcloud project (returned as the project ID) "can be set using" `gcloud config set project` (the docstring gives no argument; see `gcp-foundation` for gcloud setup).

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| scopes | `Sequence[str]` | Scopes for the credentials. If specified, the credentials are automatically scoped if necessary. |
| request | `google.auth.transport.Request` | Used to detect whether the app runs on Compute Engine, or to determine the project ID of a workload identity pool resource (external account credentials). If omitted, the standard library http client is used for Compute Engine credentials and `google.auth.transport.requests.Request` for external account credentials. |
| quota_project_id | `str` | Project ID used for quota and billing. |
| default_scopes | `Sequence[str]` | Default scopes passed by a Google client library. Use `scopes` for user-defined scopes. |

### Lookup order (from the docstring)

| # | Source |
|---|--------|
| 1 | `GOOGLE_APPLICATION_CREDENTIALS` set to a service account JSON key file, an external account (workload identity federation) config file, or a GDCH service account file |
| 2 | Google Cloud SDK application default credentials (`gcloud auth application-default login`); the active gcloud project is returned |
| 3 | App Engine standard environment (first generation): App Identity Service |
| 4 | Compute Engine, Cloud Run, App Engine flexible, or App Engine standard (second generation): the Metadata Service |
| 5 | Nothing found: `DefaultCredentialsError` |

### Environment variables read by `google.auth`

| Variable | Meaning |
|----------|---------|
| `GOOGLE_APPLICATION_CREDENTIALS` | Location of application default credentials (checked before all other checks) |
| `GOOGLE_CLOUD_PROJECT` | Explicit default project ID (also used by the Google Cloud Python libraries) |
| `GCLOUD_PROJECT` | Legacy project variable, used instead in some situations such as App Engine |
| `GOOGLE_CLOUD_QUOTA_PROJECT` | Project used for quota and billing |
| `CLOUDSDK_CONFIG` | Replaces `~/.config` for Cloud SDK config files if set |

## Notes

- Returns `(credentials, project_id)`. `project_id` may be `None`, which means it could not be ascertained from the environment. Raises `google.auth.exceptions.DefaultCredentialsError` if no credentials were found or the credentials found were invalid.
- `GOOGLE_APPLICATION_CREDENTIALS` pointing at a downloaded service account key is the highest-priority source. Service account keys are a security risk; prefer ADC with attached service accounts, impersonation or Workload Identity Federation (see `gcp-foundation`). See [service-account-credentials.md](./service-account-credentials.md).
- ADC also supports workload identity federation (AWS, Azure, any OIDC provider). It is recommended for non-Google Cloud environments because it avoids downloading, managing and storing service account private keys locally.
- Validate any credential configuration that comes from an external source before use (see [credential-types.md](./credential-types.md)).
- `gcloud`-side ADC setup belongs to `gcp-foundation`; this page covers the Python side only.
- Never print or log `credentials.token`.
- Applies to google-auth 2.62.2 (PyPI); Python `>=3.10`.
- This is the Google Cloud client-library auth layer, distinct from the `google-genai` Gemini SDK (the `google-gemini-api` skill).
- Source: https://github.com/googleapis/google-cloud-python/blob/google-auth-v2.62.2/packages/google-auth/docs/user-guide.rst (retrieved 2026-11-16; pinned at tag google-auth-v2.62.2)
- Snippet taken from https://github.com/googleapis/google-cloud-python/blob/google-auth-v2.62.2/packages/google-auth/google/auth/_default.py (the `default()` signature).
- Source: https://github.com/googleapis/google-cloud-python/blob/google-auth-v2.62.2/packages/google-auth/google/auth/_default.py (retrieved 2026-11-16; pinned at tag google-auth-v2.62.2)
- Source: https://github.com/googleapis/google-cloud-python/blob/google-auth-v2.62.2/packages/google-auth/google/auth/environment_vars.py (retrieved 2026-11-16; pinned at tag google-auth-v2.62.2)

## Related

- [credential-types.md](./credential-types.md)
- [compute-engine-credentials.md](./compute-engine-credentials.md)
- [external-account-wif.md](./external-account-wif.md)
- [impersonated-credentials.md](./impersonated-credentials.md)
