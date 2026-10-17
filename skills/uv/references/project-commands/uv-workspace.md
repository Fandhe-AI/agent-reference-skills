---
source: https://docs.astral.sh/uv/reference/cli/#uv-workspace
---

# uv workspace

Inspect uv workspaces. Command group with three subcommands: `metadata`, `dir`, `list`.

## Signature / Usage

```
uv workspace [OPTIONS] <COMMAND>
```

```console
$ uv workspace list --paths
```

| Subcommand | Description |
| --- | --- |
| `uv workspace metadata` | View metadata about the current workspace |
| `uv workspace dir` | Display the path of a workspace member |
| `uv workspace list` | List the members of a workspace |

### uv workspace metadata

View metadata about the current workspace. The output of this command is not yet stable.

```
uv workspace metadata [OPTIONS]
```

### uv workspace dir

Display the path of a workspace member. By default, the path to the workspace root directory is displayed. The `--package` option can be used to display the path to a workspace member instead. If used outside of a workspace, i.e., if a `pyproject.toml` cannot be found, uv will exit with an error.

```
uv workspace dir [OPTIONS]
```

### uv workspace list

List the members of a workspace. Displays newline separated names of workspace members.

```
uv workspace list [OPTIONS]
```

## Options / Props

### uv workspace metadata

| Name | Value | Description |
| --- | --- | --- |
| `--active` | | Sync dependencies to the active virtual environment. Instead of creating or updating the virtual environment for the project or script, the active virtual environment will be preferred, if the `VIRTUAL_ENV` environment variable is set. |
| `--config-setting`, `--config-settings`, `-C` | `config-setting` | Settings to pass to the PEP 517 build backend, specified as `KEY=VALUE` pairs |
| `--config-settings-package` | `config-settings-package` | Settings to pass to the PEP 517 build backend for a specific package, specified as `PACKAGE:KEY=VALUE` pairs |
| `--default-index` | `default-index` | The default package index (by default: <https://pypi.org/simple>). The index given by this flag is given lower priority than all other indexes specified via the `--index` flag. May also be set with the `UV_DEFAULT_INDEX` environment variable. |
| `--exact` | | Perform an exact sync, removing extraneous packages. By default, synchronization preserves packages that are not part of the selected resolution. When enabled, uv removes those packages from the environment. |
| `--exclude-newer` | `exclude-newer` | Limit candidate packages to those that were uploaded prior to the given date (RFC 3339 timestamp, local date, "friendly" duration, or ISO 8601 duration; calendar units such as months and years are not allowed). Use `false` to disable `exclude-newer`. May also be set with the `UV_EXCLUDE_NEWER` environment variable. |
| `--exclude-newer-package` | `exclude-newer-package` | Limit candidate packages for specific packages to those that were uploaded prior to the given date. Accepts package-date pairs in the format `PACKAGE=DATE`. Can be provided multiple times for different packages. |
| `--extra-index-url` | `extra-index-url` | (Deprecated: use `--index` instead) Extra URLs of package indexes to use, in addition to `--index-url`. May also be set with the `UV_EXTRA_INDEX_URL` environment variable. |
| `--find-links`, `-f` | `find-links` | Locations to search for candidate distributions, in addition to those found in the registry indexes. May also be set with the `UV_FIND_LINKS` environment variable. |
| `--fork-strategy` | `fork-strategy` | The strategy to use when selecting multiple versions of a given package across Python versions and platforms. May also be set with the `UV_FORK_STRATEGY` environment variable. Possible values: `fewest`, `requires-python`. |
| `--frozen` | | Assert that a `uv.lock` exists without checking if it is up-to-date [env: UV_FROZEN=] |
| `--index` | `index` | The indexes to use when resolving dependencies, in addition to the default index. May also be set with the `UV_INDEX` environment variable. |
| `--index-strategy` | `index-strategy` | The strategy to use when resolving against multiple index URLs. By default `first-index`. May also be set with the `UV_INDEX_STRATEGY` environment variable. Possible values: `first-index`, `unsafe-first-match`, `unsafe-best-match`. |
| `--index-url`, `-i` | `index-url` | (Deprecated: use `--default-index` instead) The URL of the Python package index (by default: <https://pypi.org/simple>). May also be set with the `UV_INDEX_URL` environment variable. |
| `--keyring-provider` | `keyring-provider` | Attempt to use `keyring` for authentication for index URLs. Defaults to `disabled`. May also be set with the `UV_KEYRING_PROVIDER` environment variable. Possible values: `disabled`, `subprocess`. |
| `--link-mode` | `link-mode` | The method to use when installing packages from the global cache. This option is only used when building source distributions. Defaults to `clone` (also known as Copy-on-Write) on macOS and Linux, and `hardlink` on Windows. May also be set with the `UV_LINK_MODE` environment variable. Possible values: `clone`, `copy`, `hardlink`, `symlink`. |
| `--locked` | | Check if the lockfile is up-to-date [env: UV_LOCKED=]. Asserts that the `uv.lock` would remain unchanged after a resolution. If the lockfile is missing or needs to be updated, uv will exit with an error. |
| `--no-binary` | | Don't install pre-built wheels. May also be set with the `UV_NO_BINARY` environment variable. |
| `--no-binary-package` | `no-binary-package` | Don't install pre-built wheels for a specific package [env: UV_NO_BINARY_PACKAGE=] |
| `--no-build` | | Don't build source distributions. First-party packages, such as projects in the workspace, will still be built. May also be set with the `UV_NO_BUILD` environment variable. |
| `--no-build-isolation` | | Disable isolation when building source distributions. Assumes that build dependencies specified by PEP 518 are already installed. May also be set with the `UV_NO_BUILD_ISOLATION` environment variable. |
| `--no-build-isolation-package` | `no-build-isolation-package` | Disable isolation when building source distributions for a specific package. |
| `--no-build-package` | `no-build-package` | Don't build source distributions for a specific package [env: UV_NO_BUILD_PACKAGE=]. First-party packages, such as projects in the workspace, will still be built. |
| `--no-index` | | Ignore the registry index (e.g., PyPI), instead relying on direct URL dependencies and those provided via `--find-links` |
| `--no-require-build-hashes` | | Do not require hashes for every build dependency |
| `--no-sources` | | Ignore the `tool.uv.sources` table when resolving dependencies. May also be set with the `UV_NO_SOURCES` environment variable. |
| `--no-sources-package` | `no-sources-package` | Don't use sources from the `tool.uv.sources` table for the specified packages [env: UV_NO_SOURCES_PACKAGE=] |
| `--prerelease` | `prerelease` | The strategy to use when considering pre-release versions. By default `if-necessary`. May also be set with the `UV_PRERELEASE` environment variable. Possible values: `disallow`, `allow`, `if-necessary`, `explicit`, `if-necessary-or-explicit` (deprecated alias for `if-necessary`). |
| `--prerelease-package` | `prerelease-package` | The strategy to use when considering pre-release versions for a specific package. Accepts package-mode pairs in the format `PACKAGE=MODE`. May be provided multiple times for different packages. |
| `--python`, `-p` | `python` | The Python interpreter to use during resolution. A Python interpreter is required for building source distributions to determine package metadata when there are not wheels. The interpreter is also used as the fallback value for the minimum Python version if `requires-python` is not set. See `uv python` for details on Python discovery and supported request formats. May also be set with the `UV_PYTHON` environment variable. |
| `--refresh` | | Refresh all cached data |
| `--refresh-package` | `refresh-package` | Refresh cached data for a specific package |
| `--require-build-hashes` | | Require hashes for all build dependencies. This does not require hashes for runtime dependencies. No hash is required when uv uses its bundled `uv_build` backend, since it is part of the uv executable. |
| `--resolution` | `resolution` | The strategy to use when selecting between the different compatible versions for a given package requirement. By default `highest`. May also be set with the `UV_RESOLUTION` environment variable. Possible values: `highest`, `lowest`, `lowest-direct`. |
| `--script` | `script` | View metadata for the specified PEP 723 Python script, rather than the current workspace. If provided, uv will resolve the dependencies based on the script's inline metadata table, in adherence with PEP 723. |
| `--sync` | | Sync the environment to include module ownership metadata in the output. This adds a mapping from importable module names to references to the package nodes that provide them. By default, the environment is synced in inexact mode. This also allows creating or updating the lockfile, unless `--locked` or `--frozen` is provided. For scripts, the lockfile is only updated if it already exists. |
| `--upgrade`, `-U` | | Allow package upgrades, ignoring pinned versions in any existing output file. Implies `--refresh` |
| `--upgrade-group` | `upgrade-group` | Allow upgrades for all packages in a dependency group, ignoring pinned versions in any existing output file |
| `--upgrade-package`, `-P` | `upgrade-package` | Allow upgrades for a specific package, ignoring pinned versions in any existing output file. Implies `--refresh-package` |

### uv workspace dir

| Name | Value | Description |
| --- | --- | --- |
| `--package` | `package` | Display the path to a specific package in the workspace |

### uv workspace list

| Name | Value | Description |
| --- | --- | --- |
| `--paths` | | Show paths instead of names |
| `--scripts` | | List all standalone scripts with inline metadata in the workspace |

## Notes

- Preview features: `workspace-metadata` (the output is experimental and may change; `--sync` includes a mapping from importable modules to the packages that provide them), `workspace-dir`, `workspace-list`, and `workspace-list-scripts` (`uv workspace list --scripts` lists standalone Python scripts with inline metadata under the workspace root, printing paths relative to the workspace root). See the preview features page.
- This is a uv workspace (`[tool.uv.workspace]` members in `pyproject.toml`), distinct from a Cargo workspace (rust) and from JS monorepo workspaces (turborepo, syncpack).
- Global options are listed in uv.md (project-commands).

## Related

- [uv (commands and global options)](./uv.md)
- [uv sync](./uv-sync.md)
- [uv lock](./uv-lock.md)
