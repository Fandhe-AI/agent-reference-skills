---
source: https://github.com/googleapis/google-cloud-python/blob/google-cloud-secret-manager-v2.32.0/packages/google-cloud-secret-manager/README.rst
---

# Secret Manager Python client README (representative GAPIC package)

The README of `google-cloud-secret-manager`, selected as a representative generated (GAPIC) Python client package: quick-start prerequisites, venv installation, supported Python versions and logging.

## Signature / Usage

### Install on Mac / Linux

Adapted (not in the official docs): replaced the `<your-env>` placeholder with `your-env` so the commands run as written.

```bash
python3 -m venv your-env
source your-env/bin/activate
pip install google-cloud-secret-manager
```

### Install on Windows

Adapted (not in the official docs): replaced the `<your-env>` placeholder with `your-env` so the commands run as written.

```text
py -m venv your-env
.\your-env\Scripts\activate
pip install google-cloud-secret-manager
```

## Notes

- Corrected from the official docs: `python3 -m venv <your-env>`, `source <your-env>/bin/activate`, `py -m venv <your-env>` and `.\<your-env>\Scripts\activate` (the angle brackets are parsed as shell redirection).
- The Windows commands run in cmd or PowerShell, not bash; the README tags both blocks `console` without naming a shell, so the Windows block uses a `text` fence.
- Quick start steps: select or create a Cloud Platform project; enable billing; enable Secret Manager; set up authentication (the README links to the google-api-core auth page; see `api-core-authentication.md`).
- Python: "Python >= 3.10, including 3.14". Unsupported: Python <= 3.9. Install in a virtual environment with `venv` so no system install permissions are needed.
- Stability level in the README badge: stable. Code samples live in the package `samples/` folder; the full client reference is at https://cloud.google.com/python/docs/reference/secretmanager/latest/summary_overview.
- Logging: see `logging.md` for the `GOOGLE_SDK_PYTHON_LOGGING_SCOPE` section of this README.
- Tracing with this client is shown in `opentelemetry-tracing.md`.
- The Cloud docs site hosts an older Secret Manager README (2.29.0); this page follows the pinned 2.32.0 tag. Secret Manager product usage belongs to a product skill, not here.
- This package was selected as the representative GAPIC package README for the Python client libraries.
- This is the Google Cloud client library, distinct from the `google-genai` Gemini SDK (the `google-gemini-api` skill).
- Applies to google-cloud-secret-manager 2.32.0.
- Source: https://github.com/googleapis/google-cloud-python/blob/google-cloud-secret-manager-v2.32.0/packages/google-cloud-secret-manager/README.rst (retrieved 2026-11-16; pinned at tag google-cloud-secret-manager-v2.32.0)

## Related

- [logging.md](./logging.md)
- [supported-python-versions.md](./supported-python-versions.md)
- [setup.md](./setup.md)
