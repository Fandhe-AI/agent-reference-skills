---
source: https://docs.astral.sh/uv/reference/cli/#uv-pip-install
---

# uv pip install

Install packages into an environment.

## Signature / Usage

```
uv pip install [OPTIONS] <PACKAGE|--requirements <REQUIREMENTS>|--editable <EDITABLE>|--group <GROUP>>
```

```console
$ uv pip install flask
```

### Arguments

| Name | Description |
| --- | --- |
| `PACKAGE` | Install all listed packages. The order of the packages is used to determine priority during resolution. |

## Options / Props

| Name | Value | Description |
| --- | --- | --- |
| `--all-extras` | | Include all optional dependencies. Only applies to `pylock.toml`, `pyproject.toml`, `setup.py`, and `setup.cfg` sources. |
| `--break-system-packages` | | Allow uv to modify an `EXTERNALLY-MANAGED` Python installation. Intended for CI when installing into Python installations managed by an external package manager like `apt`; use with caution. Env: `UV_BREAK_SYSTEM_PACKAGES`. |
| `--build-constraints`, `--build-constraint`, `-b` | build-constraints | Constrain build dependencies using the given requirements files when building source distributions. Env: `UV_BUILD_CONSTRAINT`. |
| `--cert` | file | Path to a PEM-encoded CA certificate bundle. If provided, overrides the default certificate source. |
| `--check` | | Check whether the environment satisfies the requirements without modifying it. Resolves and reports any necessary changes, exiting with code 1 if changes are needed. |
| `--compile-bytecode`, `--compile` | | Compile Python files to bytecode after installation. By default compilation is lazy on first import; enabling trades longer installs for faster start times. Install operations compile installed or reinstalled files; sync operations (`uv sync`, `uv run`) process the entire site-packages directory. Env: `UV_COMPILE_BYTECODE`. |
| `--config-setting`, `--config-settings`, `-C` | config-setting | Settings to pass to the PEP 517 build backend, as `KEY=VALUE` pairs. |
| `--config-settings-package` | config-settings-package | Per-package build backend settings, as `PACKAGE:KEY=VALUE` pairs. |
| `--constraints`, `--constraint`, `-c` | constraints | Constrain versions using the given requirements files. Equivalent to pip's `--constraint`. Env: `UV_CONSTRAINT`. |
| `--default-index` | default-index | The default package index (by default: `https://pypi.org/simple`); lower priority than `--index`. Indexes configured in `uv.toml` / `pyproject.toml` may be selected by name (`index-by-name` preview feature). Env: `UV_DEFAULT_INDEX`. |
| `--dry-run` | | Don't actually install anything; resolve dependencies and print the resulting plan. |
| `--editable`, `-e` | editable | Install the editable package based on the provided local file path. |
| `--exact` | | Perform an exact sync, removing extraneous packages. By default installing makes the minimum necessary changes to satisfy the requirements. |
| `--exclude-newer` | exclude-newer | Limit candidates to distributions uploaded prior to the given date (per-artifact upload time). Accepts RFC 3339 timestamps, local dates (`2006-12-02`), friendly durations (`24 hours`, `1 week`, `30 days`), or ISO 8601 durations (`PT24H`, `P7D`, `P30D`); months and years not allowed. `false` disables. Env: `UV_EXCLUDE_NEWER`. |
| `--exclude-newer-package` | exclude-newer-package | Per-package `PACKAGE=DATE`. Can be provided multiple times. |
| `--excludes`, `--exclude` | excludes | Exclude packages from resolution using the given requirements files (omitted entirely, own dependencies ignored; unconditional). Env: `UV_EXCLUDE`. |
| `--extra` | extra | Include optional dependencies from the specified extra name; may be provided more than once. Only applies to `pylock.toml`, `pyproject.toml`, `setup.py`, `setup.cfg` sources. |
| `--extra-index-url` | extra-index-url | (Deprecated: use `--index` instead) Extra package index URLs; take priority over `--index-url`; earlier values take priority. Env: `UV_EXTRA_INDEX_URL`. |
| `--find-links`, `-f` | find-links | Locations to search for candidate distributions in addition to registry indexes. Env: `UV_FIND_LINKS`. |
| `--fork-strategy` | fork-strategy | Strategy for selecting multiple versions across Python versions and platforms. Values: `fewest`, `requires-python` (default). Env: `UV_FORK_STRATEGY`. |
| `--group` | group | Install the specified dependency group from a `pylock.toml` or `pyproject.toml`. If no path is provided, the one in the working directory is used. May be provided multiple times. |
| `--index` | index | Indexes to use when resolving dependencies, in addition to the default index; take priority over `--default-index`; earlier values take priority. Env: `UV_INDEX`. |
| `--index-strategy` | index-strategy | Strategy for multiple index URLs. Default `first-index`. Values: `first-index`, `unsafe-first-match`, `unsafe-best-match`. Env: `UV_INDEX_STRATEGY`. |
| `--index-url`, `-i` | index-url | (Deprecated: use `--default-index` instead) The URL of the Python package index. Env: `UV_INDEX_URL`. |
| `--keyring-provider` | keyring-provider | Use `keyring` for authentication for index URLs. Only `subprocess` is supported. Defaults to `disabled`. Env: `UV_KEYRING_PROVIDER`. |
| `--link-mode` | link-mode | Method for installing packages from the global cache. Defaults to `clone` on macOS and Linux, `hardlink` on Windows. Values: `clone`, `copy`, `hardlink`, `symlink`. Symlink mode is discouraged. Env: `UV_LINK_MODE`. |
| `--no-binary` | no-binary | Don't install pre-built wheels; build from source for the given packages (wheels still used for metadata). `:all:` / `:none:` supported. |
| `--no-break-system-packages` | | Negation of `--break-system-packages`. |
| `--no-build` | | Don't build source distributions; alias for `--only-binary :all:`. uv may still build editable requirements. |
| `--no-build-isolation` | | Disable isolation when building source distributions; assumes PEP 518 build dependencies are installed. Env: `UV_NO_BUILD_ISOLATION`. |
| `--no-build-isolation-package` | no-build-isolation-package | Disable build isolation for a specific package. |
| `--no-deps` | | Ignore package dependencies; only install packages explicitly listed on the command line or in the requirements files. |
| `--no-editable` | | Install any editable dependencies as non-editable. Env: `UV_NO_EDITABLE`. |
| `--no-editable-package` | no-editable-package | Install the specified editable packages as non-editable. |
| `--no-index` | | Ignore the registry index (e.g., PyPI), relying on direct URL dependencies and `--find-links`. |
| `--no-sources` | | Ignore the `tool.uv.sources` table when resolving dependencies. Env: `UV_NO_SOURCES`. |
| `--no-sources-package` | no-sources-package | Don't use `tool.uv.sources` for the specified packages. Env: `UV_NO_SOURCES_PACKAGE`. |
| `--no-verify-hashes` | | Disable validation of hashes in the requirements file. Env: `UV_NO_VERIFY_HASHES`. |
| `--only-binary` | only-binary | Only use pre-built wheels; don't build source distributions for the given packages. `:all:` / `:none:` supported. |
| `--output-format` | output-format | Output format (default `text`; values `text`, `json`). JSON on stdout, diagnostics on stderr. The JSON schema is experimental and may change without warning. |
| `--overrides`, `--override` | overrides | Override versions using the given requirements files (absolute; replaces the requirements of constituent packages). Env: `UV_OVERRIDE`. |
| `--prefix` | prefix | Install packages into `lib`, `bin`, and other top-level folders under the specified directory as if a virtual environment were present. Prefer `--python`; scripts installed via `--prefix` are non-portable. Installs a Python interpreter if none is found (disable with `--no-python-downloads`). |
| `--prerelease` | prerelease | Strategy for pre-release versions. Default `if-necessary`. Values: `disallow`, `allow`, `if-necessary`, `explicit`, `if-necessary-or-explicit` (deprecated alias for `if-necessary`). Env: `UV_PRERELEASE`. |
| `--prerelease-package` | prerelease-package | Per-package `PACKAGE=MODE`. May be provided multiple times. |
| `--python`, `-p` | python | Python interpreter into which packages should be installed. By default installation requires a virtual environment; an alternative Python is only recommended in CI and can modify the system Python installation. Env: `UV_PYTHON`. |
| `--python-platform` | python-platform | Platform for which requirements should be installed (target triple). Selects wheels compatible with the target platform; installed distributions may not be compatible with the current platform. Intended for advanced use cases. Same value list as `uv pip compile` (see uv-pip-compile.md). |
| `--python-version` | python-version | Minimum Python version that should be supported by the requirements (e.g., `3.7` or `3.7.9`). |
| `--refresh` | | Refresh all cached data. |
| `--refresh-package` | refresh-package | Refresh cached data for a specific package. |
| `--reinstall`, `--force-reinstall` | | Reinstall all packages regardless of whether already installed. Implies `--refresh`. |
| `--reinstall-package` | reinstall-package | Reinstall a specific package. Implies `--refresh-package`. |
| `--require-build-hashes` | | Require hashes for all build dependencies (via a `--build-constraint` file). Does not require hashes for runtime dependencies; use `--require-hashes`. |
| `--require-hashes` | | Require a matching hash for each requirement; all requirements must include a hash and be pinned to exact versions or direct URLs. Git dependencies, editable installations, and local directory dependencies are not supported (local wheels / archives are). Env: `UV_REQUIRE_HASHES`. |
| `--requirements`, `--requirement`, `-r` | requirements | Install the packages listed in the given files. Supported formats: `requirements.txt`, `.py` files with inline metadata, `pylock.toml`, `pyproject.toml`, `setup.py`, `setup.cfg`. `-` reads from stdin. |
| `--resolution` | resolution | Strategy for selecting between compatible versions. Default `highest`. Values: `highest`, `lowest`, `lowest-direct`. Env: `UV_RESOLUTION`. |
| `--strict` | | Validate the Python environment after completing the installation, to detect packages with missing dependencies or other issues. |
| `--system` | | Install packages into the system Python environment (first Python in `PATH`). Intended for CI; can modify the system Python installation. Env: `UV_SYSTEM_PYTHON`. |
| `--target`, `-t` | target | Install packages into the specified directory (top level), rather than into the virtual or system Python environment. |
| `--torch-backend` | torch-backend | Backend for the PyTorch ecosystem (e.g., `cpu`, `cu126`, `auto`). Preview; may change in any future release. Same value list as `uv pip compile`. Env: `UV_TORCH_BACKEND`. |
| `--upgrade`, `-U` | | Allow package upgrades, ignoring pinned versions in any existing output file. Implies `--refresh`. |
| `--upgrade-group` | upgrade-group | Allow upgrades for all packages in a dependency group. |
| `--upgrade-package`, `-P` | upgrade-package | Allow upgrades for a specific package. Implies `--refresh-package`. |
| `--user` | | Listed in the CLI reference without a description; the `--user` install scheme is not supported by uv (see compatibility-options.md). |

## Notes

- Global options (`--allow-insecure-host` / `--trusted-host`, `--cache-dir`, `--color`, `--config-file`, `--directory`, `--help`, `--managed-python`, `--no-managed-python`, `--no-cache`, `--no-config`, `--no-progress`, `--no-python-downloads`, `--offline`, `--project`, `--quiet`, `--system-certs`, `--verbose`) are listed in `../project-commands/uv.md`. The CLI reference states `--project` has no effect in the `uv pip` interface; however, the pip guides use `--project <dir>` with `--group` to specify the project directory where dependency groups are sourced from (see `../pip-interface/locking-environments.md` / `../pip-interface/packages.md`).
- Changed in 0.13.0: `--require-hashes` in constraints files included with `-c` from a requirements file is now honored; installs that previously succeeded can fail if a requirement is missing a hash. Editable requirements in included constraints files are rejected with an error. Values passed to `--constraint`, `--override`, `--exclude`, and `--build-constraint` are treated as single paths. See `../getting-started/breaking-changes-0-13.md`.
- `--torch-backend` is in preview per the CLI reference.

## Related

- [Managing packages](./packages.md)
- [uv pip sync](./uv-pip-sync.md)
- [uv pip uninstall](./uv-pip-uninstall.md)
