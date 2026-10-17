---
source: https://docs.astral.sh/uv/concepts/python-versions/#discovery-of-python-versions
---

# Python discovery

How uv searches for a Python interpreter that satisfies a request.

## Signature / Usage

```console
$ uv python find
$ uv python find '>=3.11'
$ uv python find --system
```

## Notes

When searching for a Python version, the following locations are checked:

- Managed Python installations in the `UV_PYTHON_INSTALL_DIR`.
- A Python interpreter on the `PATH` as `python`, `python3`, or `python3.x` on macOS and Linux, or `python.exe` on Windows.
- On Windows, the Python interpreters in the Windows registry and Microsoft Store Python interpreters (see `py --list-paths`) that match the requested version.

Behavior:

- In some cases, uv allows using a Python version from a virtual environment. In this case, the virtual environment's interpreter will be checked for compatibility with the request before searching for an installation as described above (see the pip-compatible virtual environment discovery documentation).
- When performing discovery, non-executable files will be ignored. Each discovered executable is queried for metadata to ensure it meets the requested Python version. If the query fails, the executable will be skipped. If the executable satisfies the request, it is used without inspecting additional executables.
- When searching for a managed Python version, uv will prefer newer versions first. When searching for a system Python version, uv will use the first compatible version — not the newest version.
- If a Python version cannot be found on the system, uv will check for a compatible managed Python version download.
- By default, `uv python find` includes Python versions from virtual environments; a `.venv` directory in the working directory or a parent, or the `VIRTUAL_ENV` environment variable, takes precedence over executables on the `PATH`. `--system` skips them.

## Related

- [Python versions](./python-versions.md)
- [Python downloads and preferences](./python-preferences.md)
- [uv python find](./uv-python-find.md)
