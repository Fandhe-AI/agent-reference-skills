---
source: https://docs.astral.sh/uv/reference/cli/#uv-python-upgrade
---

# uv python upgrade

Upgrade installed Python versions to the latest supported patch release.

## Signature / Usage

```
uv python upgrade [OPTIONS] [TARGETS]...
```

A target Python minor version to upgrade may be provided, e.g., `3.13`. Multiple versions may be provided to perform more than one upgrade. If no target version is provided, uv will upgrade all managed CPython versions. During an upgrade, uv will not uninstall outdated patch versions.

## Options / Props

Arguments:

| Name | Type | Description |
| --- | --- | --- |
| `TARGETS` | string... | The Python minor version(s) to upgrade. If no target version is provided, uv will upgrade all managed CPython versions. |

Options:

| Name | Value | Description |
| --- | --- | --- |
| `--compile-bytecode`, `--compile` | flag | Compile Python's standard library to bytecode after installation. Trades longer installation times and some additional disk space for faster start times. When enabled, uv will process the Python version's `stdlib` directory and ignore any compilation errors. May also be set with the `UV_COMPILE_BYTECODE` environment variable. |
| `--graalpy-mirror` | url | URL to use as the source for downloading GraalPy installations. Replaces `https://github.com/oracle/graalpython/releases/download`. Distributions can be read from a local directory by using the `file://` URL scheme. |
| `--install-dir`, `-i` | dir | The directory Python installations are stored in. If provided, `UV_PYTHON_INSTALL_DIR` will need to be set for subsequent operations for uv to discover the Python installation. Defaults to `~/.local/share/uv/python`. May also be set with the `UV_PYTHON_INSTALL_DIR` environment variable. |
| `--mirror` | url | URL to use as the source for downloading Python installations. Replaces `https://github.com/astral-sh/python-build-standalone/releases/download`. Distributions can be read from a local directory by using the `file://` URL scheme. |
| `--pyodide-mirror` | url | URL to use as the source for downloading Pyodide installations. Replaces `https://github.com/pyodide/pyodide/releases/download`. Distributions can be read from a local directory by using the `file://` URL scheme. |
| `--pypy-mirror` | url | URL to use as the source for downloading PyPy installations. Replaces `https://downloads.python.org/pypy`. Distributions can be read from a local directory by using the `file://` URL scheme. |
| `--python-downloads-json-url` | url | URL pointing to JSON of custom Python installations. |
| `--reinstall`, `-r` | flag | Reinstall the latest Python patch, if it's already installed. By default, uv will exit successfully if the latest patch is already installed. |

```console
$ uv python upgrade 3.12
$ uv python upgrade
```

## Notes

- Global options (`--allow-insecure-host`, `--cache-dir`, `--color`, `--config-file`, `--directory`, `--help`, `--managed-python`, `--no-managed-python`, `--no-cache`, `--no-config`, `--no-progress`, `--no-python-downloads`, `--offline`, `--project`, `--quiet`, `--system-certs`, `--verbose`) are listed in the project-commands uv.md page.
- When an upgrade is performed, virtual environments created by uv will automatically use the new version. However, if the virtual environment was created before the upgrade functionality was added, it will continue to use the old Python version; to enable upgrades, the environment must be recreated.
- Upgrades are not yet supported for alternative implementations, like PyPy.

## Related

- [Installing and upgrading Python](./installing-python.md)
- [uv python install](./uv-python-install.md)
