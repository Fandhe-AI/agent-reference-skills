---
source: https://docs.astral.sh/uv/concepts/python-versions/#managed-python-distributions
---

# Managed Python distributions

Where uv-managed CPython, PyPy and Pyodide distributions come from, plus x86_64 emulation on aarch64 and Windows registry registration.

## Signature / Usage

```console
$ uv python install 3.13.1
$ py -V:Astral/CPython3.13.1
```

## Notes

### CPython distributions

- As Python does not publish official distributable CPython binaries, uv uses pre-built distributions from the Astral `python-build-standalone` project (also used in many other Python projects, like Mise and bazelbuild/rules_python).
- The uv Python distributions are self-contained, highly-portable, and performant. While Python can be built from source, as in tools like `pyenv`, doing so requires preinstalled system dependencies, and creating optimized, performant builds (e.g., with PGO and LTO enabled) is very slow.
- These distributions have some behavior quirks, generally as a consequence of portability; see the `python-build-standalone` quirks documentation for details.

### PyPy distributions

- PyPy versions lag behind CPython and currently only supports Python versions up to 3.11.
- PyPy distributions are provided by the PyPy project.

### Pyodide distributions

- Pyodide distributions are provided by the Pyodide project. Pyodide is a port of CPython for the WebAssembly / Emscripten platform.

### Transparent x86_64 emulation on aarch64

- Both macOS and Windows support running x86_64 binaries on aarch64 through transparent emulation (Rosetta 2 / Windows on ARM emulation). It's possible to use x86_64 uv on aarch64, and also possible to use an x86_64 Python interpreter on aarch64. Either uv binary can use either Python interpreter, but a Python interpreter needs packages for its architecture, either all x86_64 or all aarch64.
- To force use of emulated `x86_64` Python, set `UV_PYTHON_ARCH` to `x86_64` or request an explicit architecture, e.g., `cpython-3.14-windows-x86_64`.
- Changed in 0.13.0: on Windows ARM64, uv now prefers native ARM64 (`aarch64`) interpreters over emulated `x86_64`.

### Registration in the Windows registry

- On Windows, installation of managed Python versions will register them with the Windows registry as defined by PEP 514. After installation, the Python versions can be selected with the `py` launcher.
- On uninstall, uv will remove the registry entry for the target version as well as any broken registry entries.

## Related

- [Python versions](./python-versions.md)
- [Python downloads and preferences](./python-preferences.md)
- [uv python install](./uv-python-install.md)
