---
source: https://docs.astral.sh/uv/reference/cli/#uv-export
---

# uv export

Export the project's lockfile to an alternate format.

## Signature / Usage

```
uv export [OPTIONS]
```

```console
$ uv export --format requirements.txt --output-file requirements.txt
```

- At present, `requirements.txt`, `pylock.toml` (PEP 751) and CycloneDX v1.5 JSON output formats are supported.
- The project is re-locked before exporting unless the `--locked` or `--frozen` flag is provided.
- uv will search for a project in the current directory or any parent directory. If a project cannot be found, uv will exit with an error.
- If operating in a workspace, the root will be exported by default; however, specific members can be selected using the `--package` option.

## Options / Props

| Name | Value | Description |
| --- | --- | --- |
| `--all-extras` | | Include all optional dependencies |
| `--all-groups` | | Include dependencies from all dependency groups. `--no-group` can be used to exclude specific groups. |
| `--all-packages` | | Export the entire workspace. The dependencies for all workspace members will be included in the exported requirements file. Any extras or groups specified via `--extra`, `--group`, or related options will be applied to all workspace members. |
| `--config-setting`, `--config-settings`, `-C` | `config-setting` | Settings to pass to the PEP 517 build backend, specified as `KEY=VALUE` pairs |
| `--config-settings-package` | `config-settings-package` | Settings to pass to the PEP 517 build backend for a specific package, specified as `PACKAGE:KEY=VALUE` pairs |
| `--default-index` | `default-index` | The default package index (by default: <https://pypi.org/simple>). The index given by this flag is given lower priority than all other indexes specified via the `--index` flag. May also be set with the `UV_DEFAULT_INDEX` environment variable. |
| `--emit-find-links` | | Include `--find-links` entries in the generated output file |
| `--emit-index-url` | | Include `--index-url` and `--extra-index-url` entries in the generated output file |
| `--exclude-newer` | `exclude-newer` | Limit candidate packages to those that were uploaded prior to the given date. Accepts RFC 3339 timestamps (e.g., `2006-12-02T02:07:43Z`), local dates (e.g., `2006-12-02`), a "friendly" duration (e.g., `24 hours`, `1 week`, `30 days`), or an ISO 8601 duration (e.g., `PT24H`, `P7D`, `P30D`). Calendar units such as months and years are not allowed. Use `false` to disable `exclude-newer`. May also be set with the `UV_EXCLUDE_NEWER` environment variable. |
| `--exclude-newer-package` | `exclude-newer-package` | Limit candidate packages for specific packages to those that were uploaded prior to the given date. Accepts package-date pairs in the format `PACKAGE=DATE`. Can be provided multiple times for different packages. |
| `--extra` | `extra` | Include optional dependencies from the specified extra name. May be provided more than once. |
| `--extra-index-url` | `extra-index-url` | (Deprecated: use `--index` instead) Extra URLs of package indexes to use, in addition to `--index-url`. May also be set with the `UV_EXTRA_INDEX_URL` environment variable. |
| `--find-links`, `-f` | `find-links` | Locations to search for candidate distributions, in addition to those found in the registry indexes. May also be set with the `UV_FIND_LINKS` environment variable. |
| `--fork-strategy` | `fork-strategy` | The strategy to use when selecting multiple versions of a given package across Python versions and platforms. May also be set with the `UV_FORK_STRATEGY` environment variable. Possible values: `fewest`, `requires-python`. |
| `--format` | `format` | The format to which `uv.lock` should be exported. Supports `requirements.txt`, `pylock.toml` (PEP 751) and CycloneDX v1.5 JSON output formats. uv will infer the output format from the file extension of the output file, if provided. Otherwise, defaults to `requirements.txt`. Possible values: `requirements.txt`, `pylock.toml`, `cyclonedx1.5` (CycloneDX v1.5 JSON format). |
| `--frozen` | | Do not update the `uv.lock` before exporting [env: UV_FROZEN=]. If a `uv.lock` does not exist, uv will exit with an error. |
| `--group` | `group` | Include dependencies from the specified dependency group. May be provided multiple times. |
| `--index` | `index` | The indexes to use when resolving dependencies, in addition to the default index. All indexes provided via this flag take priority over the index specified by `--default-index` (which defaults to PyPI). May also be set with the `UV_INDEX` environment variable. |
| `--index-strategy` | `index-strategy` | The strategy to use when resolving against multiple index URLs. By default `first-index`. May also be set with the `UV_INDEX_STRATEGY` environment variable. Possible values: `first-index`, `unsafe-first-match`, `unsafe-best-match`. |
| `--index-url`, `-i` | `index-url` | (Deprecated: use `--default-index` instead) The URL of the Python package index (by default: <https://pypi.org/simple>). May also be set with the `UV_INDEX_URL` environment variable. |
| `--keyring-provider` | `keyring-provider` | Attempt to use `keyring` for authentication for index URLs. Defaults to `disabled`. May also be set with the `UV_KEYRING_PROVIDER` environment variable. Possible values: `disabled`, `subprocess`. |
| `--link-mode` | `link-mode` | The method to use when installing packages from the global cache. This option is only used when building source distributions. Defaults to `clone` (also known as Copy-on-Write) on macOS and Linux, and `hardlink` on Windows. May also be set with the `UV_LINK_MODE` environment variable. Possible values: `clone`, `copy`, `hardlink`, `symlink`. |
| `--locked` | | Assert that the `uv.lock` will remain unchanged [env: UV_LOCKED=]. Requires that the lockfile is up-to-date. If the lockfile is missing or needs to be updated, uv will exit with an error. |
| `--no-annotate` | | Exclude comment annotations indicating the source of each package |
| `--no-binary` | | Don't install pre-built wheels. May also be set with the `UV_NO_BINARY` environment variable. |
| `--no-binary-package` | `no-binary-package` | Don't install pre-built wheels for a specific package [env: UV_NO_BINARY_PACKAGE=] |
| `--no-build` | | Don't build source distributions. First-party packages, such as projects in the workspace, will still be built. May also be set with the `UV_NO_BUILD` environment variable. |
| `--no-build-isolation` | | Disable isolation when building source distributions. Assumes that build dependencies specified by PEP 518 are already installed. May also be set with the `UV_NO_BUILD_ISOLATION` environment variable. |
| `--no-build-isolation-package` | `no-build-isolation-package` | Disable isolation when building source distributions for a specific package. |
| `--no-build-package` | `no-build-package` | Don't build source distributions for a specific package [env: UV_NO_BUILD_PACKAGE=]. First-party packages, such as projects in the workspace, will still be built. |
| `--no-default-groups` | | Ignore the default dependency groups. uv includes the groups defined in `tool.uv.default-groups` by default. This disables that option, however, specific groups can still be included with `--group`. May also be set with the `UV_NO_DEFAULT_GROUPS` environment variable. |
| `--no-dev` | | Disable the development dependency group [env: UV_NO_DEV=]. This option is an alias of `--no-group dev`. See `--no-default-groups` to disable all default groups instead. This option is only available when running in a project. |
| `--no-editable` | | Export any editable dependencies, including the project and any workspace members, as non-editable [env: UV_NO_EDITABLE=] |
| `--no-editable-package` | `no-editable-package` | Export the specified editable packages as non-editable |
| `--no-emit-local`, `--no-install-local` | | Do not include local path dependencies in the exported requirements. Omits the current project, workspace members, and any other local (path or editable) packages from the export. Only remote/indexed dependencies are written. Useful for Docker and CI flows that want to export and cache third-party dependencies first. The inverse `--only-emit-local` can be used to emit *only* local packages, excluding all remote dependencies. |
| `--no-emit-package`, `--no-install-package` | `no-emit-package` | Do not emit the given package(s). By default, all project's dependencies are included in the exported requirements file. The `--no-emit-package` option allows exclusion of specific packages. The inverse `--only-emit-package` can be used to emit *only* the specified packages, excluding all others. |
| `--no-emit-project`, `--no-install-project` | | Do not emit the current project. By default, the current project is included in the exported requirements file with all of its dependencies. The `--no-emit-project` option allows the project to be excluded, but all of its dependencies to remain included. The inverse `--only-emit-project` can be used to emit *only* the project itself, excluding all dependencies. |
| `--no-emit-workspace`, `--no-install-workspace` | | Do not emit any workspace members, including the root project. By default, all workspace members and their dependencies are included in the exported requirements file, with all of their dependencies. The `--no-emit-workspace` option allows exclusion of all the workspace members while retaining their dependencies. The inverse `--only-emit-workspace` can be used to emit *only* workspace members, excluding all other dependencies. |
| `--no-extra` | `no-extra` | Exclude the specified optional dependencies, if `--all-extras` is supplied. May be provided multiple times. |
| `--no-group` | `no-group` | Disable the specified dependency group [env: UV_NO_GROUP=]. This option always takes precedence over default groups, `--all-groups`, and `--group`. May be provided multiple times. |
| `--no-hashes` | | Omit hashes in the generated output |
| `--no-header` | | Exclude the comment header at the top of the generated output file |
| `--no-index` | | Ignore the registry index (e.g., PyPI), instead relying on direct URL dependencies and those provided via `--find-links` |
| `--no-require-build-hashes` | | Do not require hashes for every build dependency |
| `--no-sources` | | Ignore the `tool.uv.sources` table when resolving dependencies. Used to lock against the standards-compliant, publishable package metadata, as opposed to using any workspace, Git, URL, or local path sources. May also be set with the `UV_NO_SOURCES` environment variable. |
| `--no-sources-package` | `no-sources-package` | Don't use sources from the `tool.uv.sources` table for the specified packages [env: UV_NO_SOURCES_PACKAGE=] |
| `--only-dev` | | Only include the development dependency group. The project and its dependencies will be omitted. This option is an alias for `--only-group dev`. Implies `--no-default-groups`. |
| `--only-group` | `only-group` | Only include dependencies from the specified dependency group. The project and its dependencies will be omitted. May be provided multiple times. Implies `--no-default-groups`. |
| `--output-file`, `-o` | `output-file` | Write the exported requirements to the given file |
| `--package` | `package` | Export the dependencies for specific packages in the workspace. If any workspace member does not exist, uv will exit with an error. |
| `--prerelease` | `prerelease` | The strategy to use when considering pre-release versions. By default `if-necessary`. May also be set with the `UV_PRERELEASE` environment variable. Possible values: `disallow`, `allow`, `if-necessary`, `explicit`, `if-necessary-or-explicit` (deprecated alias for `if-necessary`). |
| `--prerelease-package` | `prerelease-package` | The strategy to use when considering pre-release versions for a specific package. Accepts package-mode pairs in the format `PACKAGE=MODE`. May be provided multiple times for different packages. |
| `--prune` | `package` | Prune the given package from the dependency tree. Pruned packages will be excluded from the exported requirements file, as will any dependencies that are no longer required after the pruned package is removed. |
| `--python`, `-p` | `python` | The Python interpreter to use during resolution. A Python interpreter is required for building source distributions to determine package metadata when there are not wheels. The interpreter is also used as the fallback value for the minimum Python version if `requires-python` is not set. See `uv python` for details on Python discovery and supported request formats. May also be set with the `UV_PYTHON` environment variable. |
| `--refresh` | | Refresh all cached data |
| `--refresh-package` | `refresh-package` | Refresh cached data for a specific package |
| `--require-build-hashes` | | Require hashes for all build dependencies. This does not require hashes for runtime dependencies. No hash is required when uv uses its bundled `uv_build` backend, since it is part of the uv executable. |
| `--resolution` | `resolution` | The strategy to use when selecting between the different compatible versions for a given package requirement. By default `highest`. May also be set with the `UV_RESOLUTION` environment variable. Possible values: `highest`, `lowest`, `lowest-direct`. |
| `--script` | `script` | Export the dependencies for the specified PEP 723 Python script, rather than the current project. If provided, uv will resolve the dependencies based on its inline metadata table, in adherence with PEP 723. |
| `--upgrade`, `-U` | | Allow package upgrades, ignoring pinned versions in any existing output file. Implies `--refresh` |
| `--upgrade-group` | `upgrade-group` | Allow upgrades for all packages in a dependency group, ignoring pinned versions in any existing output file |
| `--upgrade-package`, `-P` | `upgrade-package` | Allow upgrades for a specific package, ignoring pinned versions in any existing output file. Implies `--refresh-package` |

## Notes

- Global options are listed in uv.md (project-commands).

## Related

- [uv lock](./uv-lock.md)
- [uv sync](./uv-sync.md)
- [uv tree](./uv-tree.md)
