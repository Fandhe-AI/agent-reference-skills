---
source: https://docs.astral.sh/uv/reference/settings/#configuration
---

# Settings: Python and misc

Python installation, preview, version-requirement, and `[tool.uv.audit]` settings. Top-level settings apply in `[tool.uv]` of `pyproject.toml` or at the top level of `uv.toml`; audit settings live in `[tool.uv.audit]` (`[audit]` in `uv.toml`).

## Signature / Usage

```toml
# uv.toml
python-install-mirror = "https://github.com/astral-sh/python-build-standalone/releases/download"
```

```toml
# pyproject.toml
[tool.uv]
python-downloads = "manual"
python-preference = "managed"
required-version = ">=0.5.0"
preview-features = ["json-output"]

[tool.uv.audit]
ignore = ["PYSEC-2022-43017", "GHSA-5239-wwwm-4pmq"]
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `graalpy-install-mirror` | `str` | `None` | Mirror URL for managed GraalPy installations; replaces `https://github.com/oracle/graalpython/releases/download`. `file://` URL scheme reads from a local directory. |
| `preview-features` | `bool \| list[str]` | `false` | Whether to enable specific or all experimental preview features. Unknown feature names are ignored with a warning. Example: `preview-features = true` or `["json-output"]`. |
| `pyodide-install-mirror` | `str` | `None` | Mirror URL for managed Pyodide installations; replaces `https://github.com/pyodide/pyodide/releases/download`. |
| `pypy-install-mirror` | `str` | `None` | Mirror URL for managed PyPy installations; replaces `https://downloads.python.org/pypy`. |
| `python-downloads` | `"automatic" \| "manual" \| "never"` | `"automatic"` | Whether to allow Python downloads. `automatic`: download managed installations when needed. `manual`: require explicit installation. `never`: never allow downloads. |
| `python-downloads-json-url` | `str` | `None` | URL pointing to JSON of custom Python installations (e.g., `/etc/uv/python-downloads.json`). |
| `python-install-mirror` | `str` | `None` | Mirror URL for managed Python installations; replaces `https://github.com/astral-sh/python-build-standalone/releases/download`. `file://` supported. |
| `python-preference` | `"only-managed" \| "managed" \| "system" \| "only-system"` | `"managed"` | Whether to prefer Python installations already present on the system or those downloaded and installed by uv. |
| `required-version` | `str` | `null` | Enforce a requirement on the version of uv (PEP 440 specifier, like `==0.5.0` or `>=0.5.0`). uv exits with an error if the version does not meet it at runtime. |
| `audit.ignore` | `list[str]` | `[]` | Vulnerability IDs (including aliases) to ignore during auditing. |
| `audit.ignore-until-fixed` | `list[str]` | `[]` | Vulnerability IDs to ignore only while no fix is available; reported again once a fix version exists. |
| `audit.malware-check` | `bool` | `false` | Whether to run the automatic malware check during sync operations. |
| `audit.malware-check-url` | `str` | `"https://api.osv.dev/"` | The vulnerability service URL to use for automatic malware checks. |

## Notes

- The mirror settings correspond to `UV_PYTHON_INSTALL_MIRROR`, `UV_PYPY_INSTALL_MIRROR`, `UV_GRAALPY_INSTALL_MIRROR`, and `UV_PYODIDE_INSTALL_MIRROR`.
- The `[audit]` table is documented in the settings reference under `uv audit`; `audit.malware-check` corresponds to `UV_MALWARE_CHECK`.
- Changed in 0.13.0: the default stable Python version changed to 3.15, which applies when `python-downloads` is `automatic` and no version is requested or pinned.

## Related

- [Preview features](./preview-features.md)
- [Environment variables (UV_N-UV_Z)](./environment-variables-uv-n-z.md)
- [Storage](./storage.md)
