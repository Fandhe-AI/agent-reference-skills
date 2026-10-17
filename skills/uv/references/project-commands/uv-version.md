---
source: https://docs.astral.sh/uv/reference/cli/#uv-version
---

# uv version

Read or update the project's version.

## Signature / Usage

```
uv version [OPTIONS] [VALUE]
```

## Arguments

| Name | Description |
| --- | --- |
| `VALUE` | Set the project version to this value. To update the project using semantic versioning components instead, use `--bump`. |

## Options / Props

| Name | Value | Description |
| --- | --- | --- |
| `--active` | | Prefer the active virtual environment over the project's virtual environment. If the project virtual environment is active or no virtual environment is active, this has no effect. |
| `--bump` | `bump[=value]` | Update the project version using the given semantics. This flag can be passed multiple times. Possible values: `major` (1.2.3 => 2.0.0), `minor` (1.2.3 => 1.3.0), `patch` (1.2.3 => 1.2.4), `stable` (move from a pre-release to stable version, e.g., 1.2.3b4.post5.dev6 => 1.2.3), `alpha` (1.2.3a4 => 1.2.3a5), `beta` (1.2.3b4 => 1.2.3b5), `rc` (1.2.3rc4 => 1.2.3rc5), `post` (1.2.3.post5 => 1.2.3.post6), `dev` (1.2.3a4.dev6 => 1.2.3.dev7). |
| `--compile-bytecode`, `--compile` | | Compile Python files to bytecode after installation. May also be set with the `UV_COMPILE_BYTECODE` environment variable. |
| `--config-setting`, `--config-settings`, `-C` | `config-setting` | Settings to pass to the PEP 517 build backend, specified as `KEY=VALUE` pairs |
| `--config-settings-package` | `config-settings-package` | Settings to pass to the PEP 517 build backend for a specific package, specified as `PACKAGE:KEY=VALUE` pairs |
| `--default-index` | `default-index` | The default package index (by default: <https://pypi.org/simple>). The index given by this flag is given lower priority than all other indexes specified via the `--index` flag. May also be set with the `UV_DEFAULT_INDEX` environment variable. |
| `--dry-run` | | Don't write a new version to the `pyproject.toml`. Instead, the version will be displayed. |
| `--exclude-newer` | `exclude-newer` | Limit candidate packages to those that were uploaded prior to the given date (RFC 3339 timestamp, local date, "friendly" duration, or ISO 8601 duration; calendar units such as months and years are not allowed). Use `false` to disable `exclude-newer`. May also be set with the `UV_EXCLUDE_NEWER` environment variable. |
| `--exclude-newer-package` | `exclude-newer-package` | Limit candidate packages for specific packages to those that were uploaded prior to the given date. Accepts package-date pairs in the format `PACKAGE=DATE`. Can be provided multiple times for different packages. |
| `--extra-index-url` | `extra-index-url` | (Deprecated: use `--index` instead) Extra URLs of package indexes to use, in addition to `--index-url`. May also be set with the `UV_EXTRA_INDEX_URL` environment variable. |
| `--find-links`, `-f` | `find-links` | Locations to search for candidate distributions, in addition to those found in the registry indexes. May also be set with the `UV_FIND_LINKS` environment variable. |
| `--fork-strategy` | `fork-strategy` | The strategy to use when selecting multiple versions of a given package across Python versions and platforms. May also be set with the `UV_FORK_STRATEGY` environment variable. Possible values: `fewest`, `requires-python`. |
| `--frozen` | | Update the version without re-locking the project [env: UV_FROZEN=]. The project environment will not be synced. |
| `--index` | `index` | The indexes to use when resolving dependencies, in addition to the default index. May also be set with the `UV_INDEX` environment variable. |
| `--index-strategy` | `index-strategy` | The strategy to use when resolving against multiple index URLs. By default `first-index`. May also be set with the `UV_INDEX_STRATEGY` environment variable. Possible values: `first-index`, `unsafe-first-match`, `unsafe-best-match`. |
| `--index-url`, `-i` | `index-url` | (Deprecated: use `--default-index` instead) The URL of the Python package index (by default: <https://pypi.org/simple>). May also be set with the `UV_INDEX_URL` environment variable. |
| `--keyring-provider` | `keyring-provider` | Attempt to use `keyring` for authentication for index URLs. Defaults to `disabled`. May also be set with the `UV_KEYRING_PROVIDER` environment variable. Possible values: `disabled`, `subprocess`. |
| `--link-mode` | `link-mode` | The method to use when installing packages from the global cache. Defaults to `clone` (also known as Copy-on-Write) on macOS and Linux, and `hardlink` on Windows. May also be set with the `UV_LINK_MODE` environment variable. Possible values: `clone`, `copy`, `hardlink`, `symlink`. |
| `--locked` | | Assert that the `uv.lock` will remain unchanged [env: UV_LOCKED=]. Requires that the lockfile is up-to-date. If the lockfile is missing or needs to be updated, uv will exit with an error. |
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
| `--no-sync` | | Avoid syncing the virtual environment after re-locking the project [env: UV_NO_SYNC=] |
| `--output-format` | `output-format` | The format of the output [default: text]. Possible values: `text` (display the version as plain text), `json` (display the version as JSON). |
| `--package` | `package` | Update the version of a specific package in the workspace |
| `--prerelease` | `prerelease` | The strategy to use when considering pre-release versions. By default `if-necessary`. May also be set with the `UV_PRERELEASE` environment variable. Possible values: `disallow`, `allow`, `if-necessary`, `explicit`, `if-necessary-or-explicit` (deprecated alias for `if-necessary`). |
| `--prerelease-package` | `prerelease-package` | The strategy to use when considering pre-release versions for a specific package. Accepts package-mode pairs in the format `PACKAGE=MODE`. May be provided multiple times for different packages. |
| `--python`, `-p` | `python` | The Python interpreter to use for resolving and syncing. See `uv python` for details on Python discovery and supported request formats. May also be set with the `UV_PYTHON` environment variable. |
| `--refresh` | | Refresh all cached data |
| `--refresh-package` | `refresh-package` | Refresh cached data for a specific package |
| `--reinstall`, `--force-reinstall` | | Reinstall all packages, regardless of whether they're already installed. Implies `--refresh` |
| `--reinstall-package` | `reinstall-package` | Reinstall a specific package, regardless of whether it's already installed. Implies `--refresh-package` |
| `--require-build-hashes` | | Require hashes for all build dependencies. This does not require hashes for runtime dependencies. No hash is required when uv uses its bundled `uv_build` backend. |
| `--resolution` | `resolution` | The strategy to use when selecting between the different compatible versions for a given package requirement. By default `highest`. May also be set with the `UV_RESOLUTION` environment variable. Possible values: `highest`, `lowest`, `lowest-direct`. |
| `--short` | | Only show the version. By default, uv will show the project name before the version. |
| `--upgrade`, `-U` | | Allow package upgrades, ignoring pinned versions in any existing output file. Implies `--refresh` |
| `--upgrade-group` | `upgrade-group` | Allow upgrades for all packages in a dependency group, ignoring pinned versions in any existing output file |
| `--upgrade-package`, `-P` | `upgrade-package` | Allow upgrades for a specific package, ignoring pinned versions in any existing output file. Implies `--refresh-package` |

## Notes

- Global options are listed in uv.md (project-commands).

## Related

- [uv lock](./uv-lock.md)
- [uv sync](./uv-sync.md)
