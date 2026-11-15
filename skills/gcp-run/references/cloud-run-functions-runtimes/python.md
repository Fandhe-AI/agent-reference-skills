---
source: https://docs.cloud.google.com/run/docs/runtimes/python
---

# Python runtime

Your Cloud Run function runs on an OS with add-on packages, language support, and the Python Functions Framework. The environment is identified by the language version, known as the runtime ID. Select it with `--base-image` at deploy time.

## Signature / Usage

### Select the runtime

```bash
gcloud run deploy FUNCTION \
    --source . \
    --function FUNCTION_ENTRYPOINT \
    --base-image python314
```

Replace `FUNCTION` (omit to be prompted) and `FUNCTION_ENTRYPOINT` (a function name or fully-qualified class name in your source).

## Options / Props

| Runtime | Runtime ID | Stacks | Deprecation | Decommission |
| --- | --- | --- | --- | --- |
| Python 3.15 (Preview) | `python315` | google-24 (default), google-24-full | | |
| Python 3.14 | `python314` | google-24 (default), google-24-full | 2030-10-10 | 2031-04-10 |
| Python 3.13 | `python313` | google-22 (default), google-22-full | 2029-10-10 | 2030-04-10 |
| Python 3.12 | `python312` | google-22 (default), google-22-full | 2028-10-02 | 2029-04-02 |
| Python 3.11 | `python311` | google-22 (default), google-22-full | 2027-10-24 | 2028-04-24 |
| Python 3.10 | `python310` | google-22 (default), google-22-full | 2026-10-04 | 2027-04-04 |
| Python 3.9 | `python39` | google-18-full | 2025-10-05 | 2026-04-05 |
| Python 3.8 | `python38` | google-18-full | 2024-10-14 | 2025-10-14 |
| Python 3.7 | `python37` | google-18-full | 2024-01-30 | 2025-01-30 |

## Notes

- Source layout: `main.py` at the root plus `requirements.txt`; see write-functions in the `cloud-run-functions` category.
- Dependencies: use `requirements.txt`, configure `pyproject.toml` as the standard project definition file, or package local dependencies alongside the function (https://docs.cloud.google.com/run/docs/runtimes/python-dependencies). `Pipfile` / `Pipfile.lock` are not supported; the project should not include them.
- The Python runtime sets certain environment variables automatically (https://docs.cloud.google.com/run/docs/configuring/services/environment-variables).
- Runtimes past their decommission date (before 2026-11-15, e.g. `python39` and older) cannot be used to create or update workloads; `python310` is deprecated since 2026-10-04. Use `python314`.
- The source also shows Console steps for selecting the runtime.
- Source: https://docs.cloud.google.com/run/docs/runtimes/python (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [runtime-support.md](./runtime-support.md)
- [nodejs.md](./nodejs.md)
- [local-dev-functions.md](./local-dev-functions.md)
