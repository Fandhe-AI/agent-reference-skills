---
source: https://docs.astral.sh/uv/concepts/python-versions/#installing-a-python-version
---

# Installing and upgrading Python

uv bundles a list of downloadable CPython and PyPy distributions for macOS, Linux, and Windows, and can install and upgrade uv-managed Python versions.

## Signature / Usage

```console
$ uv python install 3.12.3
$ uv python install 3.12
$ uv python install '>=3.8,<3.10'
$ uv python install 3.9 3.10 3.11
$ uv python install pypy
```

Upgrade:

```console
$ uv python upgrade 3.12
$ uv python upgrade
```

Install `python` and `python3` executables with the experimental `--default` option:

```console
$ uv python install 3.12 --default
```

Executable update behavior:

```console
$ uv python install 3.12.7  # Adds `python3.12` to `~/.local/bin`
$ uv python install 3.12.6  # Does not update `python3.12`
$ uv python install 3.12.8  # Updates `python3.12` to point to 3.12.8
```

Viewing, finding and minor version directories:

```console
$ uv python list
$ uv python list 3.13
$ uv python list pypy
$ uv python list --all-versions
$ uv python list --all-platforms
$ uv python list --only-installed
$ uv python find
$ uv python find '>=3.11'
$ uv python find --system
```

```
~/.local/share/uv/python/cpython-3.12-macos-aarch64-none
```

```console
$ readlink ~/.local/share/uv/python/cpython-3.12-macos-aarch64-none
~/.local/share/uv/python/cpython-3.12.11-macos-aarch64-none
```

## Notes

- By default, Python versions are automatically downloaded as needed without using `uv python install`.
- All Python version request formats are supported by `uv python install` except those used for requesting local interpreters such as a file path.
- By default `uv python install` will verify that a managed Python version is installed or install the latest version. If a `.python-version` file is present, uv will install the Python version listed in the file. A project that requires multiple Python versions may define a `.python-versions` file; if present, uv will install all the Python versions listed in the file.
- The available Python versions are frozen for each uv release. To install new Python versions, you may need to upgrade uv.
- Installed Python versions are stored as described in the storage documentation (Python versions / Python executables).
- Changed in 0.13.0: the default stable Python version changed from 3.14 to 3.15. This affects Python downloads when no version is requested or pinned, e.g., when running `uv python install`. Opt out by requesting Python 3.14 explicitly, or use `uv python pin 3.14` to record the version in `.python-version`.

### Installing Python executables

- uv installs Python executables into your `PATH` by default, e.g., on Unix `uv python install 3.12` will install a Python executable into `~/.local/bin`, e.g., as `python3.12`.
- If `~/.local/bin` is not in your `PATH`, you can add it with `uv python update-shell`.
- uv will only overwrite an existing executable if it is managed by uv — e.g., if `~/.local/bin/python3.12` exists already uv will not overwrite it without the `--force` flag.
- uv will update executables that it manages. However, it will prefer the latest patch version of each Python minor version by default.

### Upgrading Python versions

- Upgrades are only supported for uv-managed Python versions. Upgrades are not currently supported for PyPy, GraalPy, and Pyodide.
- uv allows transparently upgrading Python versions to the latest patch release, e.g., 3.13.4 to 3.13.5. uv does not allow transparently upgrading across minor Python versions, e.g., 3.12 to 3.13, because changing minor versions can affect dependency resolution.
- After an upgrade, uv will prefer the new version, but will retain the existing version as it may still be used by virtual environments. Virtual environments using the Python version will be automatically upgraded to the new patch version.
- If a virtual environment was created with an explicitly requested patch version, e.g., `uv venv -p 3.10.8`, it will not be transparently upgraded to a new version.

### Minor version directories

Automatic upgrades for virtual environments are implemented using a directory with the Python minor version, which is a symbolic link (on Unix) or junction (on Windows) pointing to a specific patch version. If this link is resolved by another tool, e.g., by canonicalizing the Python interpreter path, and used to create a virtual environment, it will not be automatically upgraded.

### Viewing and finding Python

- By default, downloads for other platforms and old patch versions are hidden in `uv python list`.
- `uv python find` displays the path to the first available Python executable. By default it will include Python versions from virtual environments: if a `.venv` directory is found in the working directory or any of the parent directories or the `VIRTUAL_ENV` environment variable is set, it will take precedence over any Python executables on the `PATH`. To ignore virtual environments, use `--system`.

## Related

- [Python versions](./python-versions.md)
- [Python discovery](./python-discovery.md)
- [uv python install](./uv-python-install.md)
- [uv python upgrade](./uv-python-upgrade.md)
- [uv python list](./uv-python-list.md)
- [uv python find](./uv-python-find.md)
