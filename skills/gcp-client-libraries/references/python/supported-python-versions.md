---
source: https://docs.cloud.google.com/python/docs/supported-python-versions
---

# Supported Python versions

Cloud Client Libraries for Python are compatible with all current active and maintenance versions of Python. The pinned packages require Python 3.10 or newer.

## Signature / Usage

### Install the core helper package

Adapted (not in the official docs): removed the `$` shell prompt so the command can be pasted.

```bash
pip install --upgrade google-cloud-core
```

## Options / Props

Python floors and last compatible releases of `google-api-core`:

| Python | Last `google-api-core` release that supports it |
| --- | --- |
| >= 3.10 | current (2.44.0) |
| 3.9 | `google-api-core==2.30.3` |
| 3.7 and 3.8 | `google-api-core==2.29.0` |
| 3.6 | `google-api-core==2.8.2` |
| 2.7 and 3.5 | `google-api-core==1.31.1` |

## Notes

- New feature development uses the current active and maintenance Python versions. For new applications, use the newest actively supported version.
- After a Python version reaches end-of-life it receives no critical updates; update as soon as possible.
- Legacy support: older Python runtimes are supported on a best-effort basis; critical patches and bug fixes might be released for prior major Python versions.
- Version information per library is listed in each GitHub repository; an index of all Cloud Client Libraries for Python is at https://github.com/GoogleAPIs/google-cloud-python.
- Applies to `google-api-core` 2.44.0 and `google-cloud-core` 2.8.0: both READMEs state "Python >= 3.10" and "Unsupported Python Versions: Python <= 3.9". The Secret Manager README (2.32.0) states "Python >= 3.10, including 3.14".
- Corrected from the official docs: `$ pip install --upgrade google-cloud-core` (shell prompt removed).
- The twin has no code. Snippet taken from https://github.com/googleapis/google-cloud-python/blob/google-cloud-core-v2.8.0/packages/google-cloud-core/README.rst.
- Source: https://docs.cloud.google.com/python/docs/supported-python-versions (retrieved 2026-11-16; CC BY 4.0)
- Source: https://github.com/googleapis/google-cloud-python/blob/google-api-core-v2.44.0/packages/google-api-core/README.rst (retrieved 2026-11-16; pinned at tag google-api-core-v2.44.0)
- Source: https://github.com/googleapis/google-cloud-python/blob/google-cloud-core-v2.8.0/packages/google-cloud-core/README.rst (retrieved 2026-11-16; pinned at tag google-cloud-core-v2.8.0)
- Source: https://github.com/googleapis/google-cloud-python/blob/google-cloud-secret-manager-v2.32.0/packages/google-cloud-secret-manager/README.rst (retrieved 2026-11-16; pinned at tag google-cloud-secret-manager-v2.32.0)

## Related

- [setup.md](./setup.md)
- [secret-manager-readme.md](./secret-manager-readme.md)
