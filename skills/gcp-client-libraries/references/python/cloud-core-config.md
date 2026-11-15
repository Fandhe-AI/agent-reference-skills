---
source: https://github.com/googleapis/google-cloud-python/blob/google-cloud-core-v2.8.0/packages/google-cloud-core/docs/config.rst
---

# google-cloud-core configuration and project detection

Service client objects determine the project ID by searching a fixed list of locations. Override it with the `project` parameter and read it back from the `project` property.

## Signature / Usage

### Default project detection

```python
>>> from google.cloud import bigquery
>>> client = bigquery.Client()
```

Search order (per `config.rst`):

1. `GOOGLE_CLOUD_PROJECT` environment variable
2. `GOOGLE_APPLICATION_CREDENTIALS` JSON file
3. Default service configuration path from `$ gcloud beta auth application-default login`
4. Google App Engine application ID
5. Google Compute Engine project ID (from the metadata server)

### Override the project

```python
>>> from google.cloud import bigquery
>>> client = bigquery.Client(project='my-project')
```

### Read the project of a client

```python
>>> client.project
u'my-project'
```

### Change the gcloud default project

Adapted (not in the official docs): removed the `$` shell prompt so the command can be pasted.

```bash
gcloud config set project my-new-default-project
```

## Notes

- Corrected from the official docs: `$ gcloud config set project my-new-default-project` (shell prompt removed).
- The `>>>` blocks are interactive fragments, not runnable scripts (the `u'my-project'` output is Python 2 style, as in the source).
- From the function body of `_ClientProjectMixin.__init__` in `google/cloud/client/__init__.py` (google-cloud-core 2.8.0; not documented prose): an explicit `project` wins; otherwise the environment variables read from `google.auth.environment_vars` (`PROJECT`, then `LEGACY_PROJECT`); then `credentials.project_id` ("Project set on explicit credentials overrides discovery from SDK / GAE / GCE"); then default project detection. The comment states the environment variable is meant to override a project set on the credentials.
- Authentication: credentials come from the environment or are passed directly (see `api-core-authentication.md`). `gcloud beta auth application-default login` writes a JSON file with default project ID and credentials; setting `GOOGLE_APPLICATION_CREDENTIALS` and `GOOGLE_CLOUD_PROJECT` overrides the automatically configured credentials. ADC setup with gcloud belongs to `gcp-foundation`.
- Source inconsistency: `config.rst` uses `gcloud beta auth application-default login`, while `auth.rst` (google-api-core 2.44.0) uses `gcloud auth application-default login`. Both are kept verbatim in their pages.
- Source inconsistency: the `_ClientProjectMixin` docstring says it raises `EnvironmentError` when no project is found, while the `ClientWithProject` docstring says `ValueError`.
- The page also includes an `automodule:: google.cloud.environment_vars` directive (the environment variable reference); it has no prose.
- Applies to google-cloud-core 2.8.0 (PyPI). The Cloud docs site hosts an older 2.6.0 copy whose code is broken; this page follows the pinned tag.
- Source: https://github.com/googleapis/google-cloud-python/blob/google-cloud-core-v2.8.0/packages/google-cloud-core/docs/config.rst (retrieved 2026-11-16; pinned at tag google-cloud-core-v2.8.0)
- Source: https://github.com/googleapis/google-cloud-python/blob/google-cloud-core-v2.8.0/packages/google-cloud-core/google/cloud/client/__init__.py (retrieved 2026-11-16; pinned at tag google-cloud-core-v2.8.0, Apache 2.0)

## Related

- [cloud-core-client.md](./cloud-core-client.md)
- [api-core-authentication.md](./api-core-authentication.md)
