---
source: https://docs.astral.sh/uv/reference/cli/#uv-build
---

# uv build

Build Python packages into source distributions and wheels.

## Signature / Usage

```
uv build [OPTIONS] [SRC]
```

`SRC` is the directory from which distributions should be built, or a source distribution archive to build into a wheel. Defaults to the current working directory.

By default, if passed a directory, `uv build` will build a source distribution ("sdist") from the source directory, and a binary distribution ("wheel") from the source distribution. `uv build --sdist` builds only the source distribution, `uv build --wheel` builds only the binary distribution, and `uv build --sdist --wheel` builds both distributions from source. If passed a source distribution, `uv build --wheel` will build a wheel from the source distribution.

## Options / Props

Global options (`--allow-insecure-host`, `--cache-dir`, `--color`, `--config-file`, `--directory`, `--help`, `--managed-python`, `--no-managed-python`, `--no-cache`, `--no-config`, `--no-progress`, `--no-python-downloads`, `--offline`, `--project`, `--quiet`, `--system-certs`, `--verbose`) are omitted here.

### Build

| Name | Value | Description |
| --- | --- | --- |
| `--sdist` | | Build a source distribution ("sdist") from the given directory |
| `--wheel` | | Build a binary distribution ("wheel") from the given directory |
| `--out-dir`, `-o` | `out-dir` | The output directory to which distributions should be written. Defaults to the `dist` subdirectory within the source directory, or the directory containing the source distribution archive. |
| `--clear` | | Clear the output directory before the build, removing stale artifacts |
| `--package` | `package` | Build a specific package in the workspace. The workspace will be discovered from the provided source directory, or the current directory if no source directory is provided. If the workspace member does not exist, uv will exit with an error. |
| `--all-packages`, `--all` | | Builds all packages in the workspace. Discovery and error behavior as for `--package`. |
| `--python`, `-p` | `python` | The Python interpreter to use for the build environment. By default, builds are executed in isolated virtual environments. May also be set with `UV_PYTHON`. |
| `--force-pep517` | | Always build through PEP 517, don't use the fast path for the uv build backend. By default, uv won't create a PEP 517 build environment for packages using the uv build backend, but uses a fast path that calls into the build backend directly. |
| `--no-build-logs` | | Hide logs from the build backend |
| `--no-create-gitignore` | | Do not create a `.gitignore` file in the output directory. By default, uv creates a `.gitignore` file in the output directory to exclude build artifacts from version control. |

### Build dependencies and isolation

| Name | Value | Description |
| --- | --- | --- |
| `--build-constraints`, `--build-constraint`, `-b` | `build-constraints` | Constrain build dependencies using the given requirements files when building distributions [env: `UV_BUILD_CONSTRAINT`] |
| `--config-setting`, `--config-settings`, `-C` | `config-setting` | Settings to pass to the PEP 517 build backend, specified as `KEY=VALUE` pairs |
| `--config-settings-package` | `config-settings-package` | Settings to pass to the PEP 517 build backend for a specific package, specified as `PACKAGE:KEY=VALUE` pairs |
| `--no-build-isolation` | | Disable isolation when building source distributions. Assumes that build dependencies specified by PEP 518 are already installed. [env: `UV_NO_BUILD_ISOLATION`] |
| `--no-build-isolation-package` | `no-build-isolation-package` | Disable isolation when building source distributions for a specific package |
| `--require-build-hashes` | | Require hashes for all build dependencies. Hashes can be provided in `tool.uv.build-constraint-dependencies` or URL fragments (e.g., `#sha256=...`) in `build-system.requires`. No hash is required when uv uses its bundled `uv_build` backend. When build isolation is disabled, build dependencies must already be installed and their hashes are not checked. |
| `--no-require-build-hashes` | | Do not require hashes for every build dependency |
| `--no-build` | | Don't build source distributions. First-party packages, such as projects in the workspace, will still be built. [env: `UV_NO_BUILD`] |
| `--no-build-package` | `no-build-package` | Don't build source distributions for a specific package [env: `UV_NO_BUILD_PACKAGE`] |
| `--no-binary` | | Don't install pre-built wheels. [env: `UV_NO_BINARY`] |
| `--no-binary-package` | `no-binary-package` | Don't install pre-built wheels for a specific package [env: `UV_NO_BINARY_PACKAGE`] |
| `--link-mode` | `clone`, `copy`, `hardlink`, `symlink` | The method to use when installing packages from the global cache. Only used when building source distributions. Defaults to `clone` on macOS and Linux, and `hardlink` on Windows. [env: `UV_LINK_MODE`] |

### Resolution and indexes

| Name | Value | Description |
| --- | --- | --- |
| `--default-index` | `default-index` | The default package index (by default: <https://pypi.org/simple>). [env: `UV_DEFAULT_INDEX`] |
| `--index` | `index` | The indexes to use when resolving dependencies, in addition to the default index. [env: `UV_INDEX`] |
| `--index-url`, `-i` | `index-url` | (Deprecated: use `--default-index` instead) The URL of the Python package index. [env: `UV_INDEX_URL`] |
| `--extra-index-url` | `extra-index-url` | (Deprecated: use `--index` instead) Extra URLs of package indexes to use, in addition to `--index-url`. [env: `UV_EXTRA_INDEX_URL`] |
| `--find-links`, `-f` | `find-links` | Locations to search for candidate distributions, in addition to those found in the registry indexes. [env: `UV_FIND_LINKS`] |
| `--no-index` | | Ignore the registry index (e.g., PyPI), instead relying on direct URL dependencies and those provided via `--find-links` |
| `--index-strategy` | `first-index`, `unsafe-first-match`, `unsafe-best-match` | The strategy to use when resolving against multiple index URLs. Default is `first-index`. [env: `UV_INDEX_STRATEGY`] |
| `--keyring-provider` | `disabled`, `subprocess` | Attempt to use `keyring` for authentication for index URLs. Defaults to `disabled`. [env: `UV_KEYRING_PROVIDER`] |
| `--resolution` | `highest`, `lowest`, `lowest-direct` | The strategy to use when selecting between the different compatible versions for a given package requirement. Default is `highest`. [env: `UV_RESOLUTION`] |
| `--prerelease` | `disallow`, `allow`, `if-necessary`, `explicit`, `if-necessary-or-explicit` | The strategy to use when considering pre-release versions. Default is `if-necessary`; `if-necessary-or-explicit` is a deprecated alias for `if-necessary`. [env: `UV_PRERELEASE`] |
| `--prerelease-package` | `prerelease-package` | Pre-release strategy for a specific package, in the format `PACKAGE=MODE`. |
| `--fork-strategy` | `fewest`, `requires-python` | The strategy to use when selecting multiple versions of a given package across Python versions and platforms. [env: `UV_FORK_STRATEGY`] |
| `--exclude-newer` | `exclude-newer` | Limit candidate packages to those that were uploaded prior to the given date. Accepts RFC 3339 timestamps, local dates, friendly durations (e.g., `24 hours`), or ISO 8601 durations; `false` disables. [env: `UV_EXCLUDE_NEWER`] |
| `--exclude-newer-package` | `exclude-newer-package` | Same as `--exclude-newer` for specific packages, in the format `PACKAGE=DATE`. |
| `--no-sources` | | Ignore the `tool.uv.sources` table when resolving dependencies. [env: `UV_NO_SOURCES`] |
| `--no-sources-package` | `no-sources-package` | Don't use sources from the `tool.uv.sources` table for the specified packages [env: `UV_NO_SOURCES_PACKAGE`] |
| `--require-hashes` | | Require a matching hash for each requirement. [env: `UV_REQUIRE_HASHES`] |
| `--no-verify-hashes` | | Disable validation of hashes in the requirements file. [env: `UV_NO_VERIFY_HASHES`] |
| `--refresh` | | Refresh all cached data |
| `--refresh-package` | `refresh-package` | Refresh cached data for a specific package |
| `--upgrade`, `-U` | | Allow package upgrades, ignoring pinned versions in any existing output file. Implies `--refresh` |
| `--upgrade-group` | `upgrade-group` | Allow upgrades for all packages in a dependency group, ignoring pinned versions in any existing output file |
| `--upgrade-package`, `-P` | `upgrade-package` | Allow upgrades for a specific package, ignoring pinned versions in any existing output file. Implies `--refresh-package` |

## Notes

- Global options are listed in the project-commands uv page (`uv.md`) and are not repeated here.
- Changed in 0.13.0: `uv build --clear` now rejects output directories that contain a build source (including equivalent paths via symlinks) before clearing. Previously `--clear` could delete a project or input source distribution when the output directory contained the source. Choose an output directory without build sources or omit `--clear`.
- Changed in 0.13.0: `tar-codec` is used for tar archives by default, including when building source distributions with `uv_build`; such source distributions can have different archive bytes and hashes. Opt out with `UV_LEGACY_TAR_BACKEND=1`.
- When the `--require-hashes` option applies to `uv pip` installs it covers runtime requirements; for `uv build`, `--require-build-hashes` applies to command-line build constraints and does not require hashes for runtime dependencies.

## Related

- [Build backend](./build-backend.md)
- [uv publish](./uv-publish.md)
- [Build failures](./build-failures.md)
- [Breaking changes in 0.13.0](../getting-started/breaking-changes-0-13.md)
