---
source: https://docs.astral.sh/uv/reference/cli/#uv-tool-run
---

# uv tool run (uvx)

Run a command provided by a Python package. `uvx` is a convenient alias for `uv tool run`; their behavior is identical.

## Signature / Usage

```
uv tool run [OPTIONS] [COMMAND]
```

```console
$ uvx ruff@0.3.0 --version
```

- By default, the package to install is assumed to match the command name.
- The command name can include an exact version in the format `<package>@<version>`, e.g., `uv tool run ruff@0.3.0`. For more complex version specification, or if the command is provided by a different package, use `--from`.
- `uvx` can invoke Python, e.g., `uvx python` or `uvx python@<version>`; an interpreter is started in an isolated virtual environment.
- If the tool was previously installed via `uv tool install`, the installed version is used unless a version is requested or `--isolated` is used.
- If no command is provided, the installed tools are displayed.
- Packages are installed into an ephemeral virtual environment in the uv cache directory.

`uv tool` group: Run and install commands provided by Python packages (`uv tool [OPTIONS] <COMMAND>`; subcommands run, install, upgrade, list, audit, uninstall, update-shell, dir).

## Options / Props

| Name | Value | Description |
| --- | --- | --- |
| `--from` | from | Use the given package to provide the command. By default, the package name is assumed to match the command name. |
| `--with`, `-w` | with | Run with the given packages installed |
| `--with-editable` | with-editable | Run with the given packages installed in editable mode. When used in a project, these dependencies are layered on top of the uv tool's environment in a separate, ephemeral environment and are allowed to conflict with those specified. |
| `--with-requirements` | with-requirements | Run with the packages listed in the given files. Supported formats: `requirements.txt`, `.py` files with inline metadata, and `pylock.toml`. |
| `--isolated` | | Run the tool in an isolated virtual environment, ignoring any already-installed tools [env: `UV_ISOLATED`] |
| `--python`, `-p` | python | The Python interpreter to use to build the run environment. May also be set with `UV_PYTHON`. |
| `--python-platform` | python-platform | The platform for which requirements should be installed, as a target triple (e.g., `x86_64-unknown-linux-gnu`, `aarch64-apple-darwin`). Intended for advanced use cases. |
| `--env-file` | env-file | Load environment variables from a `.env` file. Can be provided multiple times, later files overriding earlier ones. May also be set with `UV_ENV_FILE`. |
| `--no-env-file` | | Avoid reading environment variables from a `.env` file [env: `UV_NO_ENV_FILE`] |
| `--default-index` | default-index | The default package index (by default: <https://pypi.org/simple>). May also be set with `UV_DEFAULT_INDEX`. |
| `--index` | index | The indexes to use when resolving dependencies, in addition to the default index. Earlier values take priority. May also be set with `UV_INDEX`. |
| `--index-url`, `-i` | index-url | (Deprecated: use `--default-index` instead) The URL of the Python package index. May also be set with `UV_INDEX_URL`. |
| `--extra-index-url` | extra-index-url | (Deprecated: use `--index` instead) Extra URLs of package indexes to use, in addition to `--index-url`. May also be set with `UV_EXTRA_INDEX_URL`. |
| `--index-strategy` | index-strategy | Strategy for resolving against multiple index URLs: `first-index` (default), `unsafe-first-match`, `unsafe-best-match`. May also be set with `UV_INDEX_STRATEGY`. |
| `--find-links`, `-f` | find-links | Locations to search for candidate distributions, in addition to registry indexes. May also be set with `UV_FIND_LINKS`. |
| `--no-index` | | Ignore the registry index (e.g., PyPI), instead relying on direct URL dependencies and those provided via `--find-links` |
| `--keyring-provider` | keyring-provider | Attempt to use `keyring` for authentication for index URLs: `disabled` (default) or `subprocess`. May also be set with `UV_KEYRING_PROVIDER`. |
| `--constraints`, `--constraint`, `-c` | constraints | Constrain versions using the given requirements files [env: `UV_CONSTRAINT`] |
| `--build-constraints`, `--build-constraint`, `-b` | build-constraints | Constrain build dependencies using the given requirements files when building source distributions [env: `UV_BUILD_CONSTRAINT`] |
| `--overrides`, `--override` | overrides | Override versions using the given requirements files [env: `UV_OVERRIDE`] |
| `--exclude-newer` | exclude-newer | Limit candidate packages to those uploaded prior to the given date (RFC 3339 timestamp, local date, friendly duration such as `1 week`, or ISO 8601 duration such as `P7D`). `false` disables it. May also be set with `UV_EXCLUDE_NEWER`. |
| `--exclude-newer-package` | exclude-newer-package | Per-package `PACKAGE=DATE` form of `--exclude-newer`. Can be provided multiple times. |
| `--resolution` | resolution | `highest` (default), `lowest`, `lowest-direct`. May also be set with `UV_RESOLUTION`. |
| `--prerelease` | prerelease | `disallow`, `allow`, `if-necessary` (default), `explicit`, `if-necessary-or-explicit` (deprecated alias for `if-necessary`). May also be set with `UV_PRERELEASE`. |
| `--prerelease-package` | prerelease-package | `PACKAGE=MODE` pre-release strategy for a specific package. May be provided multiple times. |
| `--fork-strategy` | fork-strategy | `fewest` or `requires-python`. May also be set with `UV_FORK_STRATEGY`. |
| `--upgrade`, `-U` | | Allow package upgrades, ignoring pinned versions in any existing output file. Implies `--refresh` |
| `--upgrade-package`, `-P` | upgrade-package | Allow upgrades for a specific package. Implies `--refresh-package` |
| `--upgrade-group` | upgrade-group | Allow upgrades for all packages in a dependency group |
| `--refresh` | | Refresh all cached data |
| `--refresh-package` | refresh-package | Refresh cached data for a specific package |
| `--reinstall`, `--force-reinstall` | | Reinstall all packages, regardless of whether they're already installed. Implies `--refresh` |
| `--reinstall-package` | reinstall-package | Reinstall a specific package. Implies `--refresh-package` |
| `--compile-bytecode`, `--compile` | | Compile Python files to bytecode after installation. May also be set with `UV_COMPILE_BYTECODE`. |
| `--link-mode` | link-mode | Method used when installing packages from the global cache: `clone` (default on macOS/Linux), `copy`, `hardlink` (default on Windows), `symlink` (discouraged). May also be set with `UV_LINK_MODE`. |
| `--no-binary` | | Don't install pre-built wheels. May also be set with `UV_NO_BINARY`. |
| `--no-binary-package` | no-binary-package | Don't install pre-built wheels for a specific package [env: `UV_NO_BINARY_PACKAGE`] |
| `--no-build` | | Don't build source distributions. May also be set with `UV_NO_BUILD`. |
| `--no-build-package` | no-build-package | Don't build source distributions for a specific package [env: `UV_NO_BUILD_PACKAGE`] |
| `--no-build-isolation` | | Disable isolation when building source distributions. May also be set with `UV_NO_BUILD_ISOLATION`. |
| `--no-build-isolation-package` | no-build-isolation-package | Disable build isolation for a specific package |
| `--config-setting`, `--config-settings`, `-C` | config-setting | Settings to pass to the PEP 517 build backend, as `KEY=VALUE` pairs |
| `--config-settings-package` | config-settings-package | Settings for the PEP 517 build backend for a specific package, as `PACKAGE:KEY=VALUE` pairs |
| `--require-build-hashes` | | Require hashes for all build dependencies. Does not require hashes for runtime dependencies. |
| `--no-require-build-hashes` | | Do not require hashes for every build dependency |
| `--no-sources` | | Ignore the `tool.uv.sources` table when resolving dependencies. May also be set with `UV_NO_SOURCES`. |
| `--no-sources-package` | no-sources-package | Don't use sources from the `tool.uv.sources` table for the specified packages [env: `UV_NO_SOURCES_PACKAGE`] |
| `--lfs` | | Whether to use Git LFS when adding a dependency from Git |
| `--torch-backend` | torch-backend | Backend for the PyTorch ecosystem (e.g., `cpu`, `cu126`, `auto`). In preview and may change in any future release. May also be set with `UV_TORCH_BACKEND`. |

## Notes

- Global options (`--allow-insecure-host`, `--cache-dir`, `--color`, `--config-file`, `--directory`, `--help`, `--managed-python`, `--no-managed-python`, `--no-cache`, `--no-config`, `--no-progress`, `--no-python-downloads`, `--offline`, `--project`, `--quiet`, `--system-certs`, `--verbose`) are listed in uv.md (project-commands).
- `--torch-backend` is documented as "in preview and may change in any future release".
- Execution is nearly equivalent to `uv run --no-project --with <name> -- <name>` (see tools.md).

## Related

- [Tools](./tools.md)
- [uv tool install](./uv-tool-install.md)
- [uv tool list](./uv-tool-list.md)
