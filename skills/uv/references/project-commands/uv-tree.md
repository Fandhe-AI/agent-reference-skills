---
source: https://docs.astral.sh/uv/reference/cli/#uv-tree
---

# uv tree

Display the project's dependency tree.

## Signature / Usage

```
uv tree [OPTIONS]
```

```console
$ uv tree --depth 1 --outdated
```

## Options / Props

| Name | Value | Description |
| --- | --- | --- |
| `--all-groups` | | Include dependencies from all dependency groups. `--no-group` can be used to exclude specific groups. |
| `--config-setting`, `--config-settings`, `-C` | `config-setting` | Settings to pass to the PEP 517 build backend, specified as `KEY=VALUE` pairs |
| `--config-settings-package` | `config-settings-package` | Settings to pass to the PEP 517 build backend for a specific package, specified as `PACKAGE:KEY=VALUE` pairs |
| `--default-index` | `default-index` | The default package index (by default: <https://pypi.org/simple>). The index given by this flag is given lower priority than all other indexes specified via the `--index` flag. May also be set with the `UV_DEFAULT_INDEX` environment variable. |
| `--depth`, `-d` | `depth` | Maximum display depth of the dependency tree [default: 255] |
| `--exclude-newer` | `exclude-newer` | Limit candidate packages to those that were uploaded prior to the given date. Accepts RFC 3339 timestamps (e.g., `2006-12-02T02:07:43Z`), local dates (e.g., `2006-12-02`), a "friendly" duration (e.g., `24 hours`, `1 week`, `30 days`), or an ISO 8601 duration (e.g., `PT24H`, `P7D`, `P30D`). Calendar units such as months and years are not allowed. Use `false` to disable `exclude-newer`. May also be set with the `UV_EXCLUDE_NEWER` environment variable. |
| `--exclude-newer-package` | `exclude-newer-package` | Limit candidate packages for specific packages to those that were uploaded prior to the given date. Accepts package-date pairs in the format `PACKAGE=DATE`. Can be provided multiple times for different packages. |
| `--extra-index-url` | `extra-index-url` | (Deprecated: use `--index` instead) Extra URLs of package indexes to use, in addition to `--index-url`. May also be set with the `UV_EXTRA_INDEX_URL` environment variable. |
| `--find-links`, `-f` | `find-links` | Locations to search for candidate distributions, in addition to those found in the registry indexes. May also be set with the `UV_FIND_LINKS` environment variable. |
| `--fork-strategy` | `fork-strategy` | The strategy to use when selecting multiple versions of a given package across Python versions and platforms. May also be set with the `UV_FORK_STRATEGY` environment variable. Possible values: `fewest`, `requires-python`. |
| `--format` | `format` | The format in which to display the dependency graph [default: text]. Possible values: `text` (human-readable tree), `json` (JSON). |
| `--frozen` | | Display the requirements without locking the project [env: UV_FROZEN=]. If the lockfile is missing, uv will exit with an error. |
| `--group` | `group` | Include dependencies from the specified dependency group. May be provided multiple times. |
| `--index` | `index` | The indexes to use when resolving dependencies, in addition to the default index. May also be set with the `UV_INDEX` environment variable. |
| `--index-strategy` | `index-strategy` | The strategy to use when resolving against multiple index URLs. By default `first-index`. May also be set with the `UV_INDEX_STRATEGY` environment variable. Possible values: `first-index`, `unsafe-first-match`, `unsafe-best-match`. |
| `--index-url`, `-i` | `index-url` | (Deprecated: use `--default-index` instead) The URL of the Python package index (by default: <https://pypi.org/simple>). May also be set with the `UV_INDEX_URL` environment variable. |
| `--invert`, `--reverse` | | Show the reverse dependencies for the given package. This flag will invert the tree and display the packages that depend on the given package |
| `--keyring-provider` | `keyring-provider` | Attempt to use `keyring` for authentication for index URLs. Defaults to `disabled`. May also be set with the `UV_KEYRING_PROVIDER` environment variable. Possible values: `disabled`, `subprocess`. |
| `--link-mode` | `link-mode` | The method to use when installing packages from the global cache. This option is only used when building source distributions. Defaults to `clone` (also known as Copy-on-Write) on macOS and Linux, and `hardlink` on Windows. May also be set with the `UV_LINK_MODE` environment variable. Possible values: `clone`, `copy`, `hardlink`, `symlink`. |
| `--locked` | | Assert that the `uv.lock` will remain unchanged [env: UV_LOCKED=]. Requires that the lockfile is up-to-date. If the lockfile is missing or needs to be updated, uv will exit with an error. |
| `--no-binary` | | Don't install pre-built wheels. May also be set with the `UV_NO_BINARY` environment variable. |
| `--no-binary-package` | `no-binary-package` | Don't install pre-built wheels for a specific package [env: UV_NO_BINARY_PACKAGE=] |
| `--no-build` | | Don't build source distributions. First-party packages, such as projects in the workspace, will still be built. May also be set with the `UV_NO_BUILD` environment variable. |
| `--no-build-isolation` | | Disable isolation when building source distributions. Assumes that build dependencies specified by PEP 518 are already installed. May also be set with the `UV_NO_BUILD_ISOLATION` environment variable. |
| `--no-build-isolation-package` | `no-build-isolation-package` | Disable isolation when building source distributions for a specific package. |
| `--no-build-package` | `no-build-package` | Don't build source distributions for a specific package [env: UV_NO_BUILD_PACKAGE=]. First-party packages, such as projects in the workspace, will still be built. |
| `--no-dedupe` | | Do not de-duplicate repeated dependencies. Usually, when a package has already displayed its dependencies, further occurrences will not re-display its dependencies, and will include a (\*) to indicate it has already been shown. This flag will cause those duplicates to be repeated |
| `--no-default-groups` | | Ignore the default dependency groups. uv includes the groups defined in `tool.uv.default-groups` by default. This disables that option, however, specific groups can still be included with `--group`. May also be set with the `UV_NO_DEFAULT_GROUPS` environment variable. |
| `--no-dev` | | Disable the development dependency group [env: UV_NO_DEV=]. This option is an alias of `--no-group dev`. See `--no-default-groups` to disable all default groups instead. This option is only available when running in a project. |
| `--no-group` | `no-group` | Disable the specified dependency group [env: UV_NO_GROUP=]. This option always takes precedence over default groups, `--all-groups`, and `--group`. May be provided multiple times. |
| `--no-index` | | Ignore the registry index (e.g., PyPI), instead relying on direct URL dependencies and those provided via `--find-links` |
| `--no-require-build-hashes` | | Do not require hashes for every build dependency |
| `--no-sources` | | Ignore the `tool.uv.sources` table when resolving dependencies. Used to lock against the standards-compliant, publishable package metadata, as opposed to using any workspace, Git, URL, or local path sources. May also be set with the `UV_NO_SOURCES` environment variable. |
| `--no-sources-package` | `no-sources-package` | Don't use sources from the `tool.uv.sources` table for the specified packages [env: UV_NO_SOURCES_PACKAGE=] |
| `--only-dev` | | Only include the development dependency group. The project and its dependencies will be omitted. This option is an alias for `--only-group dev`. Implies `--no-default-groups`. |
| `--only-group` | `only-group` | Only include dependencies from the specified dependency group. The project and its dependencies will be omitted. May be provided multiple times. Implies `--no-default-groups`. |
| `--outdated` | | Show the latest available version of each package in the tree |
| `--package` | `package` | Display only the specified packages |
| `--prerelease` | `prerelease` | The strategy to use when considering pre-release versions. By default `if-necessary`. May also be set with the `UV_PRERELEASE` environment variable. Possible values: `disallow`, `allow`, `if-necessary`, `explicit`, `if-necessary-or-explicit` (deprecated alias for `if-necessary`). |
| `--prerelease-package` | `prerelease-package` | The strategy to use when considering pre-release versions for a specific package. Accepts package-mode pairs in the format `PACKAGE=MODE`. May be provided multiple times for different packages. |
| `--prune` | `prune` | Prune the given package from the display of the dependency tree |
| `--python`, `-p` | `python` | The Python interpreter to use for locking and filtering. By default, the tree is filtered to match the platform as reported by the Python interpreter. Use `--universal` to display the tree for all platforms, or use `--python-version` or `--python-platform` to override a subset of markers. See `uv python` for details on Python discovery and supported request formats. May also be set with the `UV_PYTHON` environment variable. |
| `--python-platform` | `python-platform` | The platform to use when filtering the tree. For example, pass `--platform windows` to display the dependencies that would be included when installing on Windows. Represented as a "target triple", a string that describes the target platform in terms of its CPU, vendor, and operating system name, like `x86_64-unknown-linux-gnu` or `aarch64-apple-darwin`. Possible values: the same list as in `uv run` (aliases `windows`, `linux`, `macos`; target triples; `manylinux` targets; Android, Pyodide and iOS targets). |
| `--python-version` | `python-version` | The Python version to use when filtering the tree. For example, pass `--python-version 3.10` to display the dependencies that would be included when installing on Python 3.10. Defaults to the version of the discovered Python interpreter. |
| `--require-build-hashes` | | Require hashes for all build dependencies. This does not require hashes for runtime dependencies. No hash is required when uv uses its bundled `uv_build` backend, since it is part of the uv executable. |
| `--resolution` | `resolution` | The strategy to use when selecting between the different compatible versions for a given package requirement. By default `highest`. May also be set with the `UV_RESOLUTION` environment variable. Possible values: `highest`, `lowest`, `lowest-direct`. |
| `--script` | `script` | Show the dependency tree the specified PEP 723 Python script, rather than the current project. If provided, uv will resolve the dependencies based on its inline metadata table, in adherence with PEP 723. |
| `--show-sizes` | | Show compressed wheel sizes for packages in the tree |
| `--universal` | | Show a platform-independent dependency tree. Shows resolved package versions for all Python versions and platforms, rather than filtering to those that are relevant for the current environment. Multiple versions may be shown for a each package. |
| `--upgrade`, `-U` | | Allow package upgrades, ignoring pinned versions in any existing output file. Implies `--refresh` |
| `--upgrade-group` | `upgrade-group` | Allow upgrades for all packages in a dependency group, ignoring pinned versions in any existing output file |
| `--upgrade-package`, `-P` | `upgrade-package` | Allow upgrades for a specific package, ignoring pinned versions in any existing output file. Implies `--refresh-package` |

## Notes

- Global options are listed in uv.md (project-commands).
- For `uv tree`, JSON output is selected with `--format json` (see the options table above). The preview features page refers to this generically as `--output-format json` for commands that support machine-readable output; for `uv tree` use `--format json`. The JSON schemas are experimental and may change without warning (preview feature `json-output` suppresses the warning; see the preview features page).

## Related

- [uv lock](./uv-lock.md)
- [uv export](./uv-export.md)
