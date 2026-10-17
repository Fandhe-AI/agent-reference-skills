---
source: https://docs.astral.sh/uv/reference/cli/#uv-pip-check
---

# uv pip check

Verify installed packages have compatible dependencies.

## Signature / Usage

```
uv pip check [OPTIONS]
```

```console
$ uv pip check
```

## Options / Props

| Name | Value | Description |
| --- | --- | --- |
| `--cert` | file | Path to a PEM-encoded CA certificate bundle. If provided, overrides the default certificate source. |
| `--python`, `-p` | python | Python interpreter for which packages should be checked. By default uv checks packages in a virtual environment but checks a system Python environment if no virtual environment is found. Env: `UV_PYTHON`. |
| `--python-platform` | python-platform | Platform for which packages should be checked (target triple, e.g., `x86_64-unknown-linux-gnu`). By default, installed packages are checked against the platform of the current interpreter. macOS default minimum `13.0` (`MACOSX_DEPLOYMENT_TARGET`), iOS `13.0` (`IPHONEOS_DEPLOYMENT_TARGET`), Android API level `24` (`ANDROID_API_LEVEL`). Same value list as `uv pip compile` (see uv-pip-compile.md). |
| `--python-version` | python-version | Python version against which packages should be checked. By default, installed packages are checked against the version of the current interpreter. |
| `--system` | | Check packages in the system Python environment. Disables discovery of virtual environments. Env: `UV_SYSTEM_PYTHON`. |

## Notes

- Global options (`--allow-insecure-host` / `--trusted-host`, `--cache-dir`, `--color`, `--config-file`, `--directory`, `--help`, `--managed-python`, `--no-managed-python`, `--no-cache`, `--no-config`, `--no-progress`, `--no-python-downloads`, `--offline`, `--project`, `--quiet`, `--system-certs`, `--verbose`) are listed in `../project-commands/uv.md`. `--project` has no effect in the `uv pip` interface.
- Diagnostics surfaced by `uv pip check` and differences from `pip check` are in compatibility-options.md.

## Related

- [Inspecting environments](./inspection.md)
- [Compatibility with pip (options)](./compatibility-options.md)
