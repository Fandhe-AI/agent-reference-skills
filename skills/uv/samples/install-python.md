---
source: https://docs.astral.sh/uv/guides/install-python/
---

# Installing and managing Python

Install, list, upgrade, and automatically download Python versions with `uv python`.

```console
$ uv python install
$ uv python install 3.12
$ uv python install 3.11 3.12
$ uv python install pypy@3.10
$ uv python install --reinstall
$ uv python list
$ uv python upgrade 3.12
$ uv python upgrade
```

Automatic download when a version is required:

```console
$ uvx python@3.12 -c "print('hello world')"
$ uv venv
```

## Notes

- uv only installs a versioned executable by default (for example `python3.15`); the experimental `--default` option also installs `python` and `python3`.
- Distributions come from the Astral `python-build-standalone` project.
- Existing system Python is used without configuration; `--no-managed-python` forces the system Python.
