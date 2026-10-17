---
source: https://docs.astral.sh/uv/reference/cli/#uv-check
---

# uv check

Run checks on the project.

## Signature / Usage

```
uv check [OPTIONS]
```

```console
$ uv check --fix
```

- Currently, this type checks Python code using ty. By default, all Python files in the project are checked.
- To apply safe fixes to type-checking errors, use `--fix`.

## Options / Props

| Name | Value | Description |
| --- | --- | --- |
| `--all-extras` | | Include all optional dependencies. When two or more extras are declared as conflicting in `tool.uv.conflicts`, using this flag will always result in an error. Note that all optional dependencies are always included in the resolution; this option only affects the selection of packages to install. |
| `--all-groups` | | Include dependencies from all dependency groups. `--no-group` can be used to exclude specific groups. |
| `--all-packages` | | Check all packages in the workspace. The workspace's environment is synchronized to include all workspace members, and files in every member are checked. |
| `--compile-bytecode`, `--compile` | | Compile Python files to bytecode after installation. May also be set with the `UV_COMPILE_BYTECODE` environment variable. |
| `--config-setting`, `--config-settings`, `-C` | `config-setting` | Settings to pass to the PEP 517 build backend, specified as `KEY=VALUE` pairs |
| `--config-settings-package` | `config-settings-package` | Settings to pass to the PEP 517 build backend for a specific package, specified as `PACKAGE:KEY=VALUE` pairs |
| `--default-index` | `default-index` | The default package index (by default: <https://pypi.org/simple>). The index given by this flag is given lower priority than all other indexes specified via the `--index` flag. May also be set with the `UV_DEFAULT_INDEX` environment variable. |
| `--exclude-newer` | `exclude-newer` | Limit candidate packages to those that were uploaded prior to the given date (RFC 3339 timestamp, local date, "friendly" duration, or ISO 8601 duration; calendar units such as months and years are not allowed). Use `false` to disable `exclude-newer`. May also be set with the `UV_EXCLUDE_NEWER` environment variable. |
| `--exclude-newer-package` | `exclude-newer-package` | Limit candidate packages for specific packages to those that were uploaded prior to the given date. Accepts package-date pairs in the format `PACKAGE=DATE`. Can be provided multiple times for different packages. |
| `--extra` | `extra` | Include optional dependencies from the specified extra name. May be provided more than once. When multiple extras or groups are specified that appear in `tool.uv.conflicts`, uv will report an error. Note that all optional dependencies are always included in the resolution; this option only affects the selection of packages to install. |
| `--extra-index-url` | `extra-index-url` | (Deprecated: use `--index` instead) Extra URLs of package indexes to use, in addition to `--index-url`. May also be set with the `UV_EXTRA_INDEX_URL` environment variable. |
| `--find-links`, `-f` | `find-links` | Locations to search for candidate distributions, in addition to those found in the registry indexes. May also be set with the `UV_FIND_LINKS` environment variable. |
| `--fix` | | Apply safe fixes to resolve type-checking errors |
| `--fork-strategy` | `fork-strategy` | The strategy to use when selecting multiple versions of a given package across Python versions and platforms. May also be set with the `UV_FORK_STRATEGY` environment variable. Possible values: `fewest`, `requires-python`. |
| `--frozen` | | Sync without updating the `uv.lock` file [env: UV_FROZEN=]. Instead of checking if the lockfile is up-to-date, uses the versions in the lockfile as the source of truth. If the lockfile is missing, uv will exit with an error. |
| `--group` | `group` | Include dependencies from the specified dependency group. When multiple extras or groups are specified that appear in `tool.uv.conflicts`, uv will report an error. May be provided multiple times. |
| `--index` | `index` | The indexes to use when resolving dependencies, in addition to the default index. May also be set with the `UV_INDEX` environment variable. |
| `--index-strategy` | `index-strategy` | The strategy to use when resolving against multiple index URLs. By default `first-index`. May also be set with the `UV_INDEX_STRATEGY` environment variable. Possible values: `first-index`, `unsafe-first-match`, `unsafe-best-match`. |
| `--index-url`, `-i` | `index-url` | (Deprecated: use `--default-index` instead) The URL of the Python package index (by default: <https://pypi.org/simple>). May also be set with the `UV_INDEX_URL` environment variable. |
| `--isolated` | | Run checks without mutating project state [env: UV_ISOLATED=]. Uses a temporary virtual environment and leaves existing environments and the project lockfile unchanged. Declared project requirements are resolved and installed into the temporary environment. |
| `--keyring-provider` | `keyring-provider` | Attempt to use `keyring` for authentication for index URLs. Defaults to `disabled`. May also be set with the `UV_KEYRING_PROVIDER` environment variable. Possible values: `disabled`, `subprocess`. |
| `--link-mode` | `link-mode` | The method to use when installing packages from the global cache. Defaults to `clone` (also known as Copy-on-Write) on macOS and Linux, and `hardlink` on Windows. May also be set with the `UV_LINK_MODE` environment variable. Possible values: `clone`, `copy`, `hardlink`, `symlink`. |
| `--locked` | | Assert that the `uv.lock` will remain unchanged [env: UV_LOCKED=]. Requires that the lockfile is up-to-date. If the lockfile is missing or needs to be updated, uv will exit with an error. |
| `--no-binary` | | Don't install pre-built wheels. May also be set with the `UV_NO_BINARY` environment variable. |
| `--no-binary-package` | `no-binary-package` | Don't install pre-built wheels for a specific package [env: UV_NO_BINARY_PACKAGE=] |
| `--no-build` | | Don't build source distributions. First-party packages, such as projects in the workspace, will still be built. May also be set with the `UV_NO_BUILD` environment variable. |
| `--no-build-isolation` | | Disable isolation when building source distributions. Assumes that build dependencies specified by PEP 518 are already installed. May also be set with the `UV_NO_BUILD_ISOLATION` environment variable. |
| `--no-build-isolation-package` | `no-build-isolation-package` | Disable isolation when building source distributions for a specific package. |
| `--no-build-package` | `no-build-package` | Don't build source distributions for a specific package [env: UV_NO_BUILD_PACKAGE=]. First-party packages, such as projects in the workspace, will still be built. |
| `--no-default-groups` | | Ignore the default dependency groups. uv includes the groups defined in `tool.uv.default-groups` by default. This disables that option, however, specific groups can still be included with `--group`. May also be set with the `UV_NO_DEFAULT_GROUPS` environment variable. |
| `--no-dev` | | Disable the development dependency group [env: UV_NO_DEV=]. This option is an alias of `--no-group dev`. See `--no-default-groups` to disable all default groups instead. This option is only available when running in a project. |
| `--no-extra` | `no-extra` | Exclude the specified optional dependencies, if `--all-extras` is supplied. May be provided multiple times. |
| `--no-group` | `no-group` | Disable the specified dependency group [env: UV_NO_GROUP=]. This option always takes precedence over default groups, `--all-groups`, and `--group`. May be provided multiple times. |
| `--no-index` | | Ignore the registry index (e.g., PyPI), instead relying on direct URL dependencies and those provided via `--find-links` |
| `--no-install-project` | | Do not install the current project [env: UV_NO_INSTALL_PROJECT=]. By default, the current project is installed into the environment with all of its dependencies. The `--no-install-project` option excludes the project itself while still installing its dependencies, which is useful when the project can be type-checked from its source tree without building native extensions. |
| `--no-project` | | Avoid discovering a project or workspace. Instead of running checks in the context of the current project, run them in the context of the current directory. This is useful when the current directory is not a project. May also be set with the `UV_NO_PROJECT` environment variable. |
| `--no-require-build-hashes` | | Do not require hashes for every build dependency |
| `--no-sources` | | Ignore the `tool.uv.sources` table when resolving dependencies. May also be set with the `UV_NO_SOURCES` environment variable. |
| `--no-sources-package` | `no-sources-package` | Don't use sources from the `tool.uv.sources` table for the specified packages [env: UV_NO_SOURCES_PACKAGE=] |
| `--no-sync` | | Avoid syncing the virtual environment [env: UV_NO_SYNC=] |
| `--only-dev` | | Only include the development dependency group. The project and its dependencies will be omitted. This option is an alias for `--only-group dev`. Implies `--no-default-groups`. |
| `--only-group` | `only-group` | Only include dependencies from the specified dependency group. The project and its dependencies will be omitted. May be provided multiple times. Implies `--no-default-groups`. |
| `--package` | `package` | Check specific packages in the workspace. The workspace's environment is synchronized to include the selected members and their dependencies. Only files owned by the selected members are checked. |
| `--prerelease` | `prerelease` | The strategy to use when considering pre-release versions. By default `if-necessary`. May also be set with the `UV_PRERELEASE` environment variable. Possible values: `disallow`, `allow`, `if-necessary`, `explicit`, `if-necessary-or-explicit` (deprecated alias for `if-necessary`). |
| `--prerelease-package` | `prerelease-package` | The strategy to use when considering pre-release versions for a specific package. Accepts package-mode pairs in the format `PACKAGE=MODE`. May be provided multiple times for different packages. |
| `--python`, `-p` | `python` | The Python interpreter to use for the project environment. By default, the first interpreter that meets the project's `requires-python` constraint is used. See `uv python` for more details on Python discovery and requests. May also be set with the `UV_PYTHON` environment variable. |
| `--refresh` | | Refresh all cached data |
| `--refresh-package` | `refresh-package` | Refresh cached data for a specific package |
| `--reinstall`, `--force-reinstall` | | Reinstall all packages, regardless of whether they're already installed. Implies `--refresh` |
| `--reinstall-package` | `reinstall-package` | Reinstall a specific package, regardless of whether it's already installed. Implies `--refresh-package` |
| `--require-build-hashes` | | Require hashes for all build dependencies. This does not require hashes for runtime dependencies. No hash is required when uv uses its bundled `uv_build` backend, since it is part of the uv executable. |
| `--resolution` | `resolution` | The strategy to use when selecting between the different compatible versions for a given package requirement. By default `highest`. May also be set with the `UV_RESOLUTION` environment variable. Possible values: `highest`, `lowest`, `lowest-direct`. |
| `--script` | `script` | Run checks for the specified PEP 723 Python script, rather than the current project. If provided, uv will use the dependencies based on the script's inline metadata table, in adherence with PEP 723. |
| `--ty-version` | `ty-version` | The version of ty to use for type checking. Accepts either a version (e.g., `0.0.1`) which will be treated as an exact pin, a version specifier (e.g., `>=0.0.1`), or `latest` to use the latest available version. By default, the exact version resolved in `uv.lock` will be used when `ty` is a project dependency or a dependency in the project's `dev` group. Otherwise, a constrained version range of ty will be used (e.g., `>=0.0,<0.1`). |
| `--upgrade`, `-U` | | Allow package upgrades, ignoring pinned versions in any existing output file. Implies `--refresh` |
| `--upgrade-group` | `upgrade-group` | Allow upgrades for all packages in a dependency group, ignoring pinned versions in any existing output file |
| `--upgrade-package`, `-P` | `upgrade-package` | Allow upgrades for a specific package, ignoring pinned versions in any existing output file. Implies `--refresh-package` |

## Notes

- Preview feature `check-command`: `uv check` runs Python type checking with ty, uses the project's environment to resolve imports and can synchronize that environment before checking; a preview warning is displayed unless the feature is enabled (see the preview features page).
- Global options are listed in uv.md (project-commands).

## Related

- [uv format](./uv-format.md)
- [uv sync](./uv-sync.md)
