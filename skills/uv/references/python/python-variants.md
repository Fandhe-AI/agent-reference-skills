---
source: https://docs.astral.sh/uv/concepts/python-versions/#python-pre-releases
---

# Pre-release, free-threaded and debug Python

How uv selects Python pre-releases, free-threaded builds and debug builds.

## Signature / Usage

```console
$ uv python install 3.13+freethreaded
$ uv python list 3.13+debug
```

Explicit variant requests: `3.13t` or `3.13+freethreaded` (free-threaded), `3.13d` or `3.13+debug` (debug), `+gil` (require the GIL-enabled variant).

## Notes

### Python pre-releases

- Python pre-releases will not be selected by default. They will be used if there is no other available installation matching the request. For example, if only a pre-release version is available it will be used but otherwise a stable release version will be used.
- If the path to a pre-release Python executable is provided then no other Python version matches the request and the pre-release version will be used.
- If a pre-release Python version is available and matches the request, uv will not download a stable Python version instead.

### Free-threaded Python

- uv supports discovering and installing free-threaded Python variants in CPython 3.13+.
- For Python 3.13, free-threaded Python versions will not be selected by default. They will only be selected when explicitly requested, e.g., with `3.13t` or `3.13+freethreaded`.
- For Python 3.14+, uv will allow use of free-threaded Python 3.14+ interpreters without explicit selection. The GIL-enabled build of Python will still be preferred, e.g., when performing an installation with `uv python install 3.14`. However, e.g., if a free-threaded interpreter comes before a GIL-enabled build on the `PATH`, it will be used.
- If both free-threaded and GIL-enabled Python versions are available on the system, and you want to require the use of the GIL-enabled variant in a project, use the `+gil` variant specifier.

### Debug Python variants

- uv supports discovering and installing debug builds of Python, i.e., with debug assertions enabled. Debug builds of Python are slower and are not appropriate for general use.
- Debug builds will be used if there is no other available installation matching the request. If the path to a debug Python executable is provided then no other Python version matches the request and the debug version will be used.
- Debug builds can be explicitly requested with, e.g., `3.13d` or `3.13+debug`.
- CPython versions installed by uv usually have debug symbols stripped to reduce the distribution size. These debug builds do not have debug symbols stripped, which can be useful when debugging Python processes with a C-level debugger.

## Related

- [Python versions](./python-versions.md)
- [Python discovery](./python-discovery.md)
