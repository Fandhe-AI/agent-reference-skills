---
source: https://docs.astral.sh/uv/reference/cli/#uv-pip-show
---

# uv pip show

Show information about one or more installed packages.

## Signature / Usage

```
uv pip show [OPTIONS] [PACKAGE]...
```

```console
$ uv pip show numpy
```

### Arguments

| Name | Description |
| --- | --- |
| `PACKAGE` | The package(s) to display. |

## Options / Props

| Name | Value | Description |
| --- | --- | --- |
| `--cert` | file | Path to a PEM-encoded CA certificate bundle. If provided, overrides the default certificate source. |
| `--files`, `-f` | | Show the full list of installed files for each package. |
| `--prefix` | prefix | Show a package from the specified `--prefix` directory. |
| `--python`, `-p` | python | Python interpreter to find the package in. By default uv looks for packages in a virtual environment but looks in a system Python environment if no virtual environment is found. Env: `UV_PYTHON`. |
| `--strict` | | Validate the Python environment, to detect packages with missing dependencies and other issues. |
| `--system` | | Show a package in the system Python environment. Disables discovery of virtual environments. Env: `UV_SYSTEM_PYTHON`. |
| `--target`, `-t` | target | Show a package from the specified `--target` directory. |

## Notes

- Global options (`--allow-insecure-host` / `--trusted-host`, `--cache-dir`, `--color`, `--config-file`, `--directory`, `--help`, `--managed-python`, `--no-managed-python`, `--no-cache`, `--no-config`, `--no-progress`, `--no-python-downloads`, `--offline`, `--project`, `--quiet`, `--system-certs`, `--verbose`) are listed in `../project-commands/uv.md`. The CLI reference states `--project` has no effect in the `uv pip` interface (the pip guides use it only as the source directory for `--group` in `uv pip compile` / `uv pip install`).

## Related

- [Inspecting environments](./inspection.md)
- [uv pip list](./uv-pip-list.md)
