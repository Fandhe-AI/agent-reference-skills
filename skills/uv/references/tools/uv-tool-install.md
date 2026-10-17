---
source: https://docs.astral.sh/uv/reference/cli/#uv-tool-install
---

# uv tool install

Install commands provided by a Python package.

## Signature / Usage

```
uv tool install [OPTIONS] <PACKAGE>
```

```console
$ uv tool install ruff@latest
```

- Packages are installed into an isolated virtual environment in the uv tools directory. The executables are linked into the tool executable directory, which is determined according to the XDG standard and can be retrieved with `uv tool dir --bin`.
- If the tool was previously installed, the existing tool will generally be replaced.
- Argument `PACKAGE`: the package to install commands from.

## Options / Props

| Name | Value | Description |
| --- | --- | --- |
| `--with`, `-w` | with | Include the following additional requirements |
| `--with-editable` | with-editable | Include the given packages in editable mode |
| `--with-executables-from` | with-executables-from | Install executables from the following packages |
| `--with-requirements` | with-requirements | Run with the packages listed in the given files. Supported formats: `requirements.txt`, `.py` files with inline metadata, and `pylock.toml`. |
| `--editable`, `-e` | | Install the target package in editable mode, such that changes in the package's source directory are reflected without reinstallation |
| `--force` | | Force installation of the tool. Will recreate any existing environment for the tool and replace any existing entry points with the same name in the executable directory. |
| `--python`, `-p` | python | The Python interpreter to use to build the tool environment. May also be set with `UV_PYTHON`. |
| `--python-platform` | python-platform | The platform for which requirements should be installed, as a target triple. Intended for advanced use cases. |
| `--default-index` | default-index | The default package index (by default: <https://pypi.org/simple>). May also be set with `UV_DEFAULT_INDEX`. |
| `--index` | index | The indexes to use when resolving dependencies, in addition to the default index. May also be set with `UV_INDEX`. |
| `--index-url`, `-i` | index-url | (Deprecated: use `--default-index` instead) The URL of the Python package index. May also be set with `UV_INDEX_URL`. |
| `--extra-index-url` | extra-index-url | (Deprecated: use `--index` instead) Extra URLs of package indexes to use. May also be set with `UV_EXTRA_INDEX_URL`. |
| `--index-strategy` | index-strategy | `first-index` (default), `unsafe-first-match`, `unsafe-best-match`. May also be set with `UV_INDEX_STRATEGY`. |
| `--find-links`, `-f` | find-links | Locations to search for candidate distributions, in addition to registry indexes. May also be set with `UV_FIND_LINKS`. |
| `--no-index` | | Ignore the registry index (e.g., PyPI), instead relying on direct URL dependencies and those provided via `--find-links` |
| `--keyring-provider` | keyring-provider | `disabled` (default) or `subprocess`. May also be set with `UV_KEYRING_PROVIDER`. |
| `--constraints`, `--constraint`, `-c` | constraints | Constrain versions using the given requirements files [env: `UV_CONSTRAINT`] |
| `--build-constraints`, `--build-constraint`, `-b` | build-constraints | Constrain build dependencies when building source distributions [env: `UV_BUILD_CONSTRAINT`] |
| `--overrides`, `--override` | overrides | Override versions using the given requirements files [env: `UV_OVERRIDE`] |
| `--excludes`, `--exclude` | excludes | Exclude packages from resolution using the given requirements files [env: `UV_EXCLUDE`]. Excluded packages are omitted entirely and their own dependencies are ignored; excludes are unconditional. |
| `--exclude-newer` | exclude-newer | Limit candidate packages to those uploaded prior to the given date. `false` disables it. May also be set with `UV_EXCLUDE_NEWER`. |
| `--exclude-newer-package` | exclude-newer-package | Per-package `PACKAGE=DATE` form of `--exclude-newer` |
| `--resolution` | resolution | `highest` (default), `lowest`, `lowest-direct`. May also be set with `UV_RESOLUTION`. |
| `--prerelease` | prerelease | `disallow`, `allow`, `if-necessary` (default), `explicit`, `if-necessary-or-explicit` (deprecated alias). May also be set with `UV_PRERELEASE`. |
| `--prerelease-package` | prerelease-package | `PACKAGE=MODE` pre-release strategy for a specific package |
| `--fork-strategy` | fork-strategy | `fewest` or `requires-python`. May also be set with `UV_FORK_STRATEGY`. |
| `--upgrade`, `-U` | | Allow package upgrades, ignoring pinned versions in any existing output file. Implies `--refresh` |
| `--upgrade-package`, `-P` | upgrade-package | Allow upgrades for a specific package. Implies `--refresh-package` |
| `--upgrade-group` | upgrade-group | Allow upgrades for all packages in a dependency group |
| `--refresh` | | Refresh all cached data |
| `--refresh-package` | refresh-package | Refresh cached data for a specific package |
| `--reinstall`, `--force-reinstall` | | Reinstall all packages. Implies `--refresh` |
| `--reinstall-package` | reinstall-package | Reinstall a specific package. Implies `--refresh-package` |
| `--compile-bytecode`, `--compile` | | Compile Python files to bytecode after installation. May also be set with `UV_COMPILE_BYTECODE`. |
| `--link-mode` | link-mode | `clone` (default on macOS/Linux), `copy`, `hardlink` (default on Windows), `symlink` (discouraged). May also be set with `UV_LINK_MODE`. |
| `--no-binary` | | Don't install pre-built wheels. May also be set with `UV_NO_BINARY`. |
| `--no-binary-package` | no-binary-package | Don't install pre-built wheels for a specific package [env: `UV_NO_BINARY_PACKAGE`] |
| `--no-build` | | Don't build source distributions. May also be set with `UV_NO_BUILD`. |
| `--no-build-package` | no-build-package | Don't build source distributions for a specific package [env: `UV_NO_BUILD_PACKAGE`] |
| `--no-build-isolation` | | Disable isolation when building source distributions. May also be set with `UV_NO_BUILD_ISOLATION`. |
| `--no-build-isolation-package` | no-build-isolation-package | Disable build isolation for a specific package |
| `--config-setting`, `--config-settings`, `-C` | config-setting | Settings to pass to the PEP 517 build backend, as `KEY=VALUE` pairs |
| `--config-settings-package` | config-settings-package | Per-package `PACKAGE:KEY=VALUE` build backend settings |
| `--require-build-hashes` | | Require hashes for all build dependencies |
| `--no-require-build-hashes` | | Do not require hashes for every build dependency |
| `--no-sources` | | Ignore the `tool.uv.sources` table when resolving dependencies. May also be set with `UV_NO_SOURCES`. |
| `--no-sources-package` | no-sources-package | Don't use sources from `tool.uv.sources` for the specified packages [env: `UV_NO_SOURCES_PACKAGE`] |
| `--lfs` | | Whether to use Git LFS when adding a dependency from Git |
| `--torch-backend` | torch-backend | Backend for the PyTorch ecosystem (e.g., `cpu`, `cu126`, `auto`). In preview and may change in any future release. May also be set with `UV_TORCH_BACKEND`. |

## Notes

- Global options are listed in uv.md (project-commands).
- Re-running `uv tool install` replaces the version constraints recorded for the tool; `uv tool upgrade` respects the constraints and settings from installation (see tools.md).
- Installation does not overwrite executables not previously installed by uv (e.g., installed by `pipx`) unless `--force` is given.
- `--torch-backend` is documented as "in preview and may change in any future release".

## Related

- [Tools](./tools.md)
- [uv tool upgrade](./uv-tool-upgrade.md)
- [uv tool dir](./uv-tool-dir.md)
- [uv tool update-shell](./uv-tool-update-shell.md)
