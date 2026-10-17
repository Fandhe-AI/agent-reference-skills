---
source: https://docs.astral.sh/uv/reference/cli/#uv-pip-sync
---

# uv pip sync

Sync an environment with a `requirements.txt` or `pylock.toml` file.

## Signature / Usage

```
uv pip sync [OPTIONS] <SRC_FILE>...
```

```console
$ uv pip sync requirements.txt
```

When syncing an environment, any packages not listed in the `requirements.txt` or `pylock.toml` file will be removed. To retain extraneous packages, use `uv pip install` instead.

The input file is presumed to be the output of a `pip compile` or `uv export` operation, in which it will include all transitive dependencies. If transitive dependencies are not present in the file, they will not be installed. Use `--strict` to warn if any transitive dependencies are missing.

### Arguments

| Name | Description |
| --- | --- |
| `SRC_FILE` | Include the packages listed in the given files. Supported formats: `requirements.txt`, `.py` files with inline metadata, `pylock.toml`, `pyproject.toml`, `setup.py`, and `setup.cfg`. For `pyproject.toml` / `setup.py` / `setup.cfg`, uv extracts the requirements for the relevant project. If `-` is provided, requirements are read from stdin. |

## Options / Props

| Name | Value | Description |
| --- | --- | --- |
| `--all-extras` | | Include all optional dependencies. Only applies to `pylock.toml`, `pyproject.toml`, `setup.py`, and `setup.cfg` sources. |
| `--allow-empty-requirements` | | Allow sync of empty requirements, which will clear the environment of all packages. |
| `--break-system-packages` | | Allow uv to modify an `EXTERNALLY-MANAGED` Python installation. Intended for CI when installing into Python installations managed by an external package manager like `apt`; use with caution. Env: `UV_BREAK_SYSTEM_PACKAGES`. |
| `--build-constraints`, `--build-constraint`, `-b` | build-constraints | Constrain build dependencies using the given requirements files when building source distributions. Env: `UV_BUILD_CONSTRAINT`. |
| `--cert` | file | Path to a PEM-encoded CA certificate bundle. If provided, overrides the default certificate source. |
| `--check` | | Check whether the environment matches the requirements without modifying it. Resolves and reports any necessary changes, exiting with code 1 if changes are needed. |
| `--compile-bytecode`, `--compile` | | Compile Python files to bytecode after installation. By default compilation is performed lazily on first import; enabling trades longer installs for faster start times (CLI applications, Docker). Install operations compile installed or reinstalled files; sync operations (`uv sync`, `uv run`) process the entire site-packages directory. Env: `UV_COMPILE_BYTECODE`. |
| `--config-setting`, `--config-settings`, `-C` | config-setting | Settings to pass to the PEP 517 build backend, as `KEY=VALUE` pairs. |
| `--config-settings-package` | config-settings-package | Per-package build backend settings, as `PACKAGE:KEY=VALUE` pairs. |
| `--constraints`, `--constraint`, `-c` | constraints | Constrain versions using the given requirements files. Equivalent to pip's `--constraint`. Env: `UV_CONSTRAINT`. |
| `--default-index` | default-index | The default package index (by default: `https://pypi.org/simple`); lower priority than `--index`. Indexes configured in `uv.toml` / `pyproject.toml` may be selected by name (`index-by-name` preview feature prefers names over relative paths). Env: `UV_DEFAULT_INDEX`. |
| `--dry-run` | | Don't actually install anything; resolve dependencies and print the resulting plan. |
| `--exclude-newer` | exclude-newer | Limit candidates to distributions uploaded prior to the given date (per-artifact upload time). Accepts RFC 3339 timestamps, local dates (`2006-12-02`), friendly durations (`24 hours`, `1 week`, `30 days`), or ISO 8601 durations (`PT24H`, `P7D`, `P30D`); months and years not allowed. `false` disables. Env: `UV_EXCLUDE_NEWER`. |
| `--exclude-newer-package` | exclude-newer-package | Per-package `PACKAGE=DATE`. Can be provided multiple times. |
| `--extra` | extra | Include optional dependencies from the specified extra name; may be provided more than once. Only applies to `pylock.toml`, `pyproject.toml`, `setup.py`, `setup.cfg` sources. |
| `--extra-index-url` | extra-index-url | (Deprecated: use `--index` instead) Extra package index URLs; take priority over `--index-url`; earlier values take priority. Env: `UV_EXTRA_INDEX_URL`. |
| `--find-links`, `-f` | find-links | Locations to search for candidate distributions in addition to registry indexes (directory of wheels / sdists, or a URL with a flat list of links). Env: `UV_FIND_LINKS`. |
| `--group` | group | Install the specified dependency group from a `pylock.toml` or `pyproject.toml`. If no path is provided, the one in the working directory is used. May be provided multiple times. |
| `--index` | index | Indexes to use when resolving dependencies, in addition to the default index; take priority over `--default-index`; earlier values take priority. Env: `UV_INDEX`. |
| `--index-strategy` | index-strategy | Strategy for multiple index URLs. Default `first-index`. Values: `first-index`, `unsafe-first-match`, `unsafe-best-match`. Env: `UV_INDEX_STRATEGY`. |
| `--index-url`, `-i` | index-url | (Deprecated: use `--default-index` instead) The URL of the Python package index. Env: `UV_INDEX_URL`. |
| `--keyring-provider` | keyring-provider | Use `keyring` for authentication for index URLs. Only `subprocess` is supported. Defaults to `disabled`. Env: `UV_KEYRING_PROVIDER`. |
| `--link-mode` | link-mode | Method for installing packages from the global cache. Defaults to `clone` on macOS and Linux, `hardlink` on Windows. Values: `clone`, `copy`, `hardlink`, `symlink`. Symlink mode is discouraged (`uv cache clean` would break installed packages). Env: `UV_LINK_MODE`. |
| `--no-allow-empty-requirements` | | Negation of `--allow-empty-requirements`. |
| `--no-binary` | no-binary | Don't install pre-built wheels; build from source for the given packages (the resolver still uses wheels to extract metadata). `:all:` / `:none:` supported. |
| `--no-break-system-packages` | | Negation of `--break-system-packages`. |
| `--no-build` | | Don't build source distributions; alias for `--only-binary :all:`. uv may still build editable requirements. |
| `--no-build-isolation` | | Disable isolation when building source distributions; assumes PEP 518 build dependencies are installed. Env: `UV_NO_BUILD_ISOLATION`. |
| `--no-index` | | Ignore the registry index (e.g., PyPI), relying on direct URL dependencies and `--find-links`. |
| `--no-sources` | | Ignore the `tool.uv.sources` table when resolving dependencies. Env: `UV_NO_SOURCES`. |
| `--no-sources-package` | no-sources-package | Don't use `tool.uv.sources` for the specified packages. Env: `UV_NO_SOURCES_PACKAGE`. |
| `--no-verify-hashes` | | Disable validation of hashes in the requirements file. By default uv verifies any available hashes but does not require all requirements to have one (use `--require-hashes`). Env: `UV_NO_VERIFY_HASHES`. |
| `--only-binary` | only-binary | Only use pre-built wheels; don't build source distributions for the given packages. `:all:` / `:none:` supported. |
| `--output-format` | output-format | Select the output format (default `text`; values `text`, `json`). JSON goes to stdout, diagnostics to stderr. The JSON schema is experimental and may change without warning. |
| `--prefix` | prefix | Install packages into `lib`, `bin`, and other top-level folders under the specified directory as if a virtual environment were present there. Prefer `--python` to install into an alternate environment (scripts installed via `--prefix` reference the installing interpreter, so are non-portable). Does not require an existing Python environment; installs a Python interpreter if none is found (disable with `--no-python-downloads`). |
| `--python`, `-p` | python | Python interpreter into which packages should be installed. By default syncing requires a virtual environment; an alternative Python is only recommended in CI and can modify the system Python installation. Env: `UV_PYTHON`. |
| `--python-platform` | python-platform | Platform for which requirements should be installed (target triple, e.g., `x86_64-unknown-linux-gnu`). Selects wheels compatible with the target platform; installed distributions may not be compatible with the current platform, and source builds target the current platform. Intended for advanced use cases. Same value list as `uv pip compile` (see uv-pip-compile.md). |
| `--python-version` | python-version | Minimum Python version that should be supported by the requirements (e.g., `3.7` or `3.7.9`); a missing patch is assumed minimum. |
| `--refresh` | | Refresh all cached data. |
| `--refresh-package` | refresh-package | Refresh cached data for a specific package. |
| `--reinstall`, `--force-reinstall` | | Reinstall all packages, regardless of whether already installed. Implies `--refresh`. |
| `--reinstall-package` | reinstall-package | Reinstall a specific package. Implies `--refresh-package`. |
| `--require-build-hashes` | | Require hashes for all build dependencies (via a `--build-constraint` file). Does not require hashes for runtime dependencies; use `--require-hashes`. |
| `--require-hashes` | | Require a matching hash for each requirement. When enabled, all requirements must include a hash and be pinned to exact versions (`==1.0.0`) or specified via direct URL. Git dependencies, editable installations, and local directory dependencies are not supported (local wheels / archives are). Env: `UV_REQUIRE_HASHES`. |
| `--strict` | | Validate the Python environment after completing the installation, to detect packages with missing dependencies or other issues. |
| `--system` | | Install packages into the system Python environment (the first Python found in the system `PATH`). Intended for CI; can modify the system Python installation. Env: `UV_SYSTEM_PYTHON`. |
| `--target`, `-t` | target | Install packages into the specified directory (top level), rather than into the virtual or system Python environment. Does not require an existing Python environment; installs one if none is found (disable with `--no-python-downloads`). |
| `--torch-backend` | torch-backend | Backend for the PyTorch ecosystem (e.g., `cpu`, `cu126`, `auto`). Preview; may change in any future release. Same value list as `uv pip compile`. Env: `UV_TORCH_BACKEND`. |

## Notes

- Global options (`--allow-insecure-host` / `--trusted-host`, `--cache-dir`, `--color`, `--config-file`, `--directory`, `--help`, `--managed-python`, `--no-managed-python`, `--no-cache`, `--no-progress`, `--no-python-downloads`, `--offline`, `--project`, `--quiet`, `--system-certs`, `--verbose`) are listed in `../project-commands/uv.md`. The CLI reference states `--project` has no effect in the `uv pip` interface (the pip guides use it only as the source directory for `--group` in `uv pip compile` / `uv pip install`).
- `uv pip sync` removes packages not in the input file; use `uv pip install` to keep them.
- `--torch-backend` is in preview per the CLI reference.

## Related

- [Locking environments](./locking-environments.md)
- [uv pip compile](./uv-pip-compile.md)
- [uv pip install](./uv-pip-install.md)
