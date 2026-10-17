---
source: https://docs.astral.sh/uv/reference/cli/#uv-pip-freeze
---

# uv pip freeze

List, in requirements format, packages installed in an environment.

## Signature / Usage

```
uv pip freeze [OPTIONS]
```

```console
$ uv pip freeze
```

## Options / Props

| Name | Value | Description |
| --- | --- | --- |
| `--cert` | file | Path to a PEM-encoded CA certificate bundle. If provided, overrides the default certificate source. |
| `--exclude` | exclude | Exclude the specified package(s) from the output. |
| `--exclude-editable` | | Exclude any editable packages from output. |
| `--path` | paths | Restrict to the specified installation path for listing packages (can be used multiple times). |
| `--prefix` | prefix | List packages from the specified `--prefix` directory. |
| `--python`, `-p` | python | Python interpreter for which packages should be listed. By default uv lists packages in a virtual environment but shows packages in a system Python environment if no virtual environment is found. Env: `UV_PYTHON`. |
| `--strict` | | Validate the Python environment, to detect packages with missing dependencies and other issues. |
| `--system` | | List packages in the system Python environment. Disables discovery of virtual environments. Env: `UV_SYSTEM_PYTHON`. |
| `--target`, `-t` | target | List packages from the specified `--target` directory. |

## Notes

- Global options (`--allow-insecure-host` / `--trusted-host`, `--cache-dir`, `--color`, `--config-file`, `--directory`, `--help`, `--managed-python`, `--no-managed-python`, `--no-cache`, `--no-config`, `--no-progress`, `--no-python-downloads`, `--offline`, `--project`, `--quiet`, `--system-certs`, `--verbose`) are listed in `../project-commands/uv.md`. The CLI reference states `--project` has no effect in the `uv pip` interface (the pip guides use it only as the source directory for `--group` in `uv pip compile` / `uv pip install`).
- `.egg-info` and legacy editable `.egg-link` distributions already present in an environment are listed (see compatibility-options.md).

## Related

- [Inspecting environments](./inspection.md)
- [uv pip list](./uv-pip-list.md)
