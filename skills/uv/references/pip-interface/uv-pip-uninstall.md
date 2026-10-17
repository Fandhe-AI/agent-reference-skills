---
source: https://docs.astral.sh/uv/reference/cli/#uv-pip-uninstall
---

# uv pip uninstall

Uninstall packages from an environment.

## Signature / Usage

```
uv pip uninstall [OPTIONS] <PACKAGE|--requirements <REQUIREMENTS>>
```

```console
$ uv pip uninstall flask
```

### Arguments

| Name | Description |
| --- | --- |
| `PACKAGE` | Uninstall all listed packages. |

## Options / Props

| Name | Value | Description |
| --- | --- | --- |
| `--break-system-packages` | | Allow uv to modify an `EXTERNALLY-MANAGED` Python installation. Intended for CI when installing into Python installations managed by an external package manager like `apt`; use with caution. Env: `UV_BREAK_SYSTEM_PACKAGES`. |
| `--cert` | file | Path to a PEM-encoded CA certificate bundle. If provided, overrides the default certificate source. |
| `--dry-run` | | Don't actually uninstall anything; print the resulting plan. |
| `--keyring-provider` | keyring-provider | Use `keyring` for authentication for remote requirements files. Only `subprocess` is supported. Defaults to `disabled`. Env: `UV_KEYRING_PROVIDER`. |
| `--no-break-system-packages` | | Negation of `--break-system-packages`. |
| `--prefix` | prefix | Uninstall packages from the specified `--prefix` directory. |
| `--python`, `-p` | python | Python interpreter from which packages should be uninstalled. By default uninstallation requires a virtual environment; an alternative Python is only recommended in CI and can modify the system Python installation. Env: `UV_PYTHON`. |
| `--requirements`, `--requirement`, `-r` | requirements | Uninstall the packages listed in the given files. Supported formats: `requirements.txt`, `.py` files with inline metadata, `pylock.toml`, `pyproject.toml`, `setup.py`, `setup.cfg`. |
| `--system` | | Use the system Python to uninstall packages (the first Python in `PATH`). Intended for CI; can modify the system Python installation. Env: `UV_SYSTEM_PYTHON`. |
| `--target`, `-t` | target | Uninstall packages from the specified `--target` directory. |

## Notes

- Global options (`--allow-insecure-host` / `--trusted-host`, `--cache-dir`, `--color`, `--config-file`, `--directory`, `--help`, `--managed-python`, `--no-managed-python`, `--no-cache`, `--no-config`, `--no-progress`, `--no-python-downloads`, `--offline`, `--project`, `--quiet`, `--system-certs`, `--verbose`) are listed in `../project-commands/uv.md`. `--project` has no effect in the `uv pip` interface.

## Related

- [Managing packages](./packages.md)
- [uv pip install](./uv-pip-install.md)
