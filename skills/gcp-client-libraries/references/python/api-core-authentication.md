---
source: https://github.com/googleapis/google-cloud-python/blob/google-api-core-v2.44.0/packages/google-api-core/docs/auth.rst
---

# Authentication overview (google-api-core)

How Python Google Cloud clients find credentials: Application Default Credentials (ADC) inferred from the environment, or an explicit `google.auth` `Credentials` object passed to the client.

## Signature / Usage

### Local development

Adapted (not in the official docs): removed the `$` shell prompt so the command can be pasted.

```bash
gcloud auth application-default login
```

This generates credentials for client libraries. To authenticate the CLI itself use `gcloud auth login`. If your gcloud does not support the new command, run `gcloud components update`.

### Client-provided authentication (ADC)

```python
from google.cloud import datastore
client = datastore.Client()
```

### Explicit credentials

```python
client = Client(credentials=credentials)
```

### User account via ADC

```python
import google.auth

credentials, project = google.auth.default()
```

## Notes

- Virtual machine environments (Compute Engine, App Engine, Cloud Run, Cloud Functions): authentication "should just work". Elsewhere the page says to download a service account JSON keyfile and set `GOOGLE_APPLICATION_CREDENTIALS="/path/to/keyfile.json"`. Service account keys are a security risk; prefer ADC with attached service accounts, impersonation or Workload Identity Federation (see `gcp-foundation`).
- Credential discovery precedence for ADC is that of `google.auth.default()` (the page defers to it). Be sure no other environment conflicts with user-provided credentials.
- Explicit credentials are useful when code runs in one place, must run as a specific service account, or needs two accounts for different projects.
- Production applications should use a service account; a personal account is for getting started.
- GCE: default credentials may lack the needed scopes when the instance is set up; add the right scopes, e.g. `https://www.googleapis.com/auth/cloud-platform` or `https://www.googleapis.com/auth/cloud-platform.read-only`.
- Cut from this page: the Compute Engine (`compute_engine.Credentials()`), service account file (`from_service_account_file`) and service account info (`from_service_account_info`) snippets, and the PKCS12/P12 note. Credential types belong to the `python-auth` category.
- If you accept credential JSON from an external source, validate it before use (docstring warning in `client_options.py`; https://cloud.google.com/docs/authentication/external/externally-sourced-credentials).
- Corrected from the official docs: `$ gcloud auth application-default login` (shell prompt removed).
- Fragments: `client = Client(credentials=credentials)` (undefined `Client`, `credentials`).
- Source inconsistency: this page uses `gcloud auth application-default login`; `config.rst` (google-cloud-core 2.8.0) uses `gcloud beta auth application-default login`.
- Applies to google-api-core 2.44.0.
- Source: https://github.com/googleapis/google-cloud-python/blob/google-api-core-v2.44.0/packages/google-api-core/docs/auth.rst (retrieved 2026-11-16; pinned at tag google-api-core-v2.44.0)
- Source: https://github.com/googleapis/google-cloud-python/blob/google-api-core-v2.44.0/packages/google-api-core/google/api_core/client_options.py (retrieved 2026-11-16; pinned at tag google-api-core-v2.44.0, Apache 2.0)

## Related

- [cloud-core-client.md](./cloud-core-client.md)
- [cloud-core-config.md](./cloud-core-config.md)
- [client-options.md](./client-options.md)
