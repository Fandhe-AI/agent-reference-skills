---
source: https://docs.astral.sh/uv/reference/cli/#uv-python-install
---

# uv python install

Download and install Python versions.

## Signature / Usage

```
uv python install [OPTIONS] [TARGETS]...
```

Supports CPython and PyPy. CPython distributions are downloaded from the Astral `python-build-standalone` project. PyPy distributions are downloaded from `python.org`. The available Python versions are bundled with each uv release. To install new Python versions, you may need to upgrade uv.

Python versions are installed into the uv Python directory, which can be retrieved with `uv python dir`. By default, Python executables are added to a directory on the path with a minor version suffix, e.g., `python3.13`. To install `python3` and `python`, use the `--default` flag. Use `uv python dir --bin` to see the target directory. Multiple Python versions may be requested.

## Options / Props

Arguments:

| Name | Type | Description |
| --- | --- | --- |
| `TARGETS` | string... | The Python version(s) to install. If not provided, the requested Python version(s) will be read from the `UV_PYTHON` environment variable then `.python-versions` or `.python-version` files. If none of the above are present, uv will check if it has installed any Python versions. If not, it will install the latest stable version of Python. |

Options:

| Name | Value | Description |
| --- | --- | --- |
| `--compile-bytecode`, `--compile` | flag | Compile Python's standard library to bytecode after installation. By default, compilation is performed lazily the first time a module is imported; this trades longer installation times and some additional disk space for faster start times. When enabled, uv will process the Python version's `stdlib` directory and ignore any compilation errors. May also be set with the `UV_COMPILE_BYTECODE` environment variable. |
| `--default` | flag | Use as the default Python version. By default, only a `python{major}.{minor}` executable is installed, e.g., `python3.10`. With `--default`, `python{major}` (e.g., `python3`) and `python` executables are also installed. Alternative Python variants still include their tag: installing 3.13+freethreaded with `--default` includes `python3t` and `pythont`. If multiple Python versions are requested, uv will exit with an error. |
| `--force`, `-f` | flag | Replace existing Python executables during installation. By default, uv will refuse to replace executables that it does not manage. Implies `--reinstall`. |
| `--graalpy-mirror` | url | URL to use as the source for downloading GraalPy installations. Replaces `https://github.com/oracle/graalpython/releases/download`. Distributions can be read from a local directory by using the `file://` URL scheme. |
| `--install-dir`, `-i` | dir | The directory to store the Python installation in. If provided, `UV_PYTHON_INSTALL_DIR` will need to be set for subsequent operations for uv to discover the Python installation. Defaults to `~/.local/share/uv/python`. May also be set with the `UV_PYTHON_INSTALL_DIR` environment variable. |
| `--mirror` | url | URL to use as the source for downloading Python installations. Replaces `https://github.com/astral-sh/python-build-standalone/releases/download`. Distributions can be read from a local directory by using the `file://` URL scheme. |
| `--no-bin` | flag | Do not install a Python executable into the `bin` directory. Can also be set with `UV_PYTHON_INSTALL_BIN=0`. |
| `--no-registry` | flag | Do not register the Python installation in the Windows registry. Can also be set with `UV_PYTHON_INSTALL_REGISTRY=0`. |
| `--pyodide-mirror` | url | URL to use as the source for downloading Pyodide installations. Replaces `https://github.com/pyodide/pyodide/releases/download`. Distributions can be read from a local directory by using the `file://` URL scheme. |
| `--pypy-mirror` | url | URL to use as the source for downloading PyPy installations. Replaces `https://downloads.python.org/pypy`. Distributions can be read from a local directory by using the `file://` URL scheme. |
| `--python-downloads-json-url` | url | URL pointing to JSON of custom Python installations. |
| `--reinstall`, `-r` | flag | Reinstall the requested Python version, if it's already installed. If a minor version is requested, all matching installed patch versions are reinstalled. By default, uv will exit successfully if the version is already installed. |
| `--upgrade`, `-U` | flag | Upgrade existing Python installations to the latest patch version. If the requested versions are not yet installed, uv will install them. Only supported for minor version requests, e.g., `3.12`; uv exits with an error if a patch version, e.g., `3.12.2`, is requested. |

## Notes

- Global options (`--allow-insecure-host`, `--cache-dir`, `--color`, `--config-file`, `--directory`, `--help`, `--managed-python`, `--no-managed-python`, `--no-cache`, `--no-config`, `--no-progress`, `--no-python-downloads`, `--offline`, `--project`, `--quiet`, `--system-certs`, `--verbose`) are listed in the project-commands uv.md page.
- See `uv help python` to view supported request formats.
- Changed in 0.13.0: the default stable Python version changed from 3.14 to 3.15. This affects Python downloads when no version is requested or pinned, e.g., when running `uv python install`. Opt out with an explicit request such as `uv python install 3.14`, or `uv python pin 3.14` to record the version in `.python-version`.

## Related

- [Installing and upgrading Python](./installing-python.md)
- [uv python upgrade](./uv-python-upgrade.md)
- [uv python uninstall](./uv-python-uninstall.md)
- [uv python dir](./uv-python-dir.md)
