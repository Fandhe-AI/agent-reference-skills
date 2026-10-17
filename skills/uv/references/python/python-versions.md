---
source: https://docs.astral.sh/uv/concepts/python-versions/
---

# Python versions

A Python version is composed of a Python interpreter (i.e. the `python` executable), the standard library, and other supporting files.

## Signature / Usage

```console
$ uv venv --python 3.11.6
```

uv will ensure that Python 3.11.6 is available — downloading and installing it if necessary — then create the virtual environment with it.

## Options / Props

Supported Python version request formats (`--python` flag in most uv commands):

| Format | Examples |
| --- | --- |
| `<version>` | `3`, `3.12`, `3.12.3` |
| `<version-specifier>` | `>=3.12,<3.13` |
| `<version><short-variant>` | `3.13t`, `3.12.0d` |
| `<version>+<variant>` | `3.13+freethreaded`, `3.12.0+debug`, `3.14+gil` |
| `<implementation>` | `cpython` or `cp` |
| `<implementation>@<version>` | `cpython@3.12` |
| `<implementation><version>` | `cpython3.12` or `cp312` |
| `<implementation><version-specifier>` | `cpython>=3.12,<3.13` |
| `<implementation>-<version>-<os>-<arch>-<libc>` | `cpython-3.12.3-macos-aarch64-none` |

A specific system Python interpreter can additionally be requested with:

| Format | Examples |
| --- | --- |
| `<executable-path>` | `/opt/homebrew/bin/python3` |
| `<executable-name>` | `mypython3` |
| `<install-dir>` | `/some/environment/` |

## Notes

- Managed and system installations: since it is common for a system to have an existing Python installation, uv supports discovering Python versions. uv also supports installing Python versions itself. Python versions uv installs are _managed_ Python installations; all other Python installations are _system_ Python installations.
- uv does not distinguish between Python versions installed by the operating system vs those installed and managed by other tools. For example, if a Python installation is managed with `pyenv`, it would still be considered a _system_ Python version in uv.
- Use `UV_PYTHON_ARCH` to select an architecture independently of the Python version. For example, setting `UV_PYTHON_ARCH=x86_64` makes `uv sync` use an `x86_64` interpreter while honoring the project's Python version request. A request that includes an architecture or names an interpreter executable takes precedence.
- By default, uv will automatically download Python versions if they cannot be found on the system. This behavior can be disabled with the `python-downloads` option (see python-preferences.md).
- Changed in 0.13.0: the default stable Python version changed from 3.14 to 3.15. This affects Python downloads when no version is requested or pinned. uv continues to use compatible Python installations that are already present. To opt out, request Python 3.14 explicitly, e.g., `uv venv --python 3.14`, or use `uv python pin 3.14` to record the version in `.python-version`.

### Python version files

- The `.python-version` file can be used to create a default Python version request. uv searches for a `.python-version` file in the working directory and each of its parents. If none is found, uv will check the user-level configuration directory. Any of the request formats described above can be used, though use of a version number is recommended for interoperability with other tools.
- A `.python-version` file can be created in the current directory with `uv python pin`; a global one can be created in the user configuration directory with `uv python pin --global`.
- Discovery of `.python-version` files can be disabled with `--no-config`.
- uv will not search for `.python-version` files beyond project or workspace boundaries (except the user configuration directory).

### Project Python versions

uv will respect Python requirements defined in `requires-python` in the `pyproject.toml` file during project command invocations. The first Python version that is compatible with the requirement will be used, unless a version is otherwise requested, e.g., via a `.python-version` file or the `--python` flag.

### Python implementation support

uv supports the CPython, PyPy, Pyodide, and GraalPy Python implementations. If a Python implementation is not supported, uv will fail to discover its interpreter. The implementations may be requested with either the long or short name (not case-sensitive):

- CPython: `cpython`, `cp`
- PyPy: `pypy`, `pp`
- GraalPy: `graalpy`, `gp`
- Pyodide: `pyodide`

## Related

- [Installing and upgrading Python](./installing-python.md)
- [Python discovery](./python-discovery.md)
- [Pre-release, free-threaded and debug Python](./python-variants.md)
- [Python downloads and preferences](./python-preferences.md)
- [Managed Python distributions](./managed-distributions.md)
- [uv python pin](./uv-python-pin.md)
