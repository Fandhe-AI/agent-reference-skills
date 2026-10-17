---
source: https://docs.astral.sh/uv/reference/cli/#uv-add
---

# uv add

Add dependencies to the project. Dependencies are added to the project's `pyproject.toml` file.

## Signature / Usage

```
uv add [OPTIONS] <PACKAGES|--requirements <REQUIREMENTS>>
```

- If a given dependency exists already, it will be updated to the new version specifier unless it includes markers that differ from the existing specifier in which case another entry for the dependency will be added.
- The lockfile and project environment will be updated to reflect the added dependencies. To skip updating the lockfile, use `--frozen`. To skip updating the environment, use `--no-sync`.
- If any of the requested dependencies cannot be found, uv will exit with an error, unless the `--frozen` flag is provided, in which case uv will add the dependencies verbatim without checking that they exist or are compatible with the project.
- uv will search for a project in the current directory or any parent directory. If a project cannot be found, uv will exit with an error.

## Arguments

| Name | Description |
| --- | --- |
| `PACKAGES` | The packages to add, as PEP 508 requirements (e.g., `ruff==0.5.0`) |

## Options / Props

| Name | Value | Description |
| --- | --- | --- |
| `--active` | | Prefer the active virtual environment over the project's virtual environment. If the project virtual environment is active or no virtual environment is active, this has no effect. |
| `--bounds` | `bounds` | The kind of version specifier to use when adding dependencies. When adding a dependency to the project, if no constraint or URL is provided, a constraint is added based on the latest compatible version of the package. By default, a lower bound constraint is used, e.g., `>=1.2.3`. When `--frozen` is provided, no resolution is performed, and dependencies are always added without constraints. This option is in preview and may change in any future release. Possible values: `lower` (only a lower bound, e.g., `>=1.2.3`), `major` (same major version, similar to the semver caret, e.g., `>=1.2.3, <2.0.0`), `minor` (same minor version, similar to the semver tilde, e.g., `>=1.2.3, <1.3.0`), `exact` (pin the exact version, e.g., `==1.2.3`). |
| `--branch` | `branch` | Branch to use when adding a dependency from Git |
| `--compile-bytecode`, `--compile` | | Compile Python files to bytecode after installation. By default, uv does not compile Python (`.py`) files to bytecode (`__pycache__/*.pyc`); instead, compilation is performed lazily the first time a module is imported. May also be set with the `UV_COMPILE_BYTECODE` environment variable. |
| `--config-setting`, `--config-settings`, `-C` | `config-setting` | Settings to pass to the PEP 517 build backend, specified as `KEY=VALUE` pairs |
| `--config-settings-package` | `config-settings-package` | Settings to pass to the PEP 517 build backend for a specific package, specified as `PACKAGE:KEY=VALUE` pairs |
| `--constraints`, `--constraint`, `-c` | `constraints` | Constrain versions using the given requirements files [env: UV_CONSTRAINT=]. Constraints files are `requirements.txt`-like files that only control the *version* of a requirement that's installed. The constraints will *not* be added to the project's `pyproject.toml` file, but *will* be respected during dependency resolution. This is equivalent to pip's `--constraint` option. |
| `--default-index` | `default-index` | The default package index (by default: <https://pypi.org/simple>). Accepts either a repository compliant with PEP 503 (the simple repository API), or a local directory laid out in the same format. The index given by this flag is given lower priority than all other indexes specified via the `--index` flag. Indexes configured in `uv.toml` or `pyproject.toml` may be selected by name. Enable the `index-by-name` preview feature to prefer index names over relative paths. May also be set with the `UV_DEFAULT_INDEX` environment variable. |
| `--dev` | | Add the requirements to the development dependency group [env: UV_DEV=]. This option is an alias for `--group dev`. |
| `--editable` | | Add the requirements as editable |
| `--exclude-newer` | `exclude-newer` | Limit candidate packages to those that were uploaded prior to the given date. The date is compared against the upload time of each individual distribution artifact, not the release date of the package version. Accepts RFC 3339 timestamps (e.g., `2006-12-02T02:07:43Z`), local dates (e.g., `2006-12-02`), a "friendly" duration (e.g., `24 hours`, `1 week`, `30 days`), or an ISO 8601 duration (e.g., `PT24H`, `P7D`, `P30D`). Durations are always resolved to a fixed number of seconds assuming that a day is 24 hours; calendar units such as months and years are not allowed. Use `false` to disable `exclude-newer`. May also be set with the `UV_EXCLUDE_NEWER` environment variable. |
| `--exclude-newer-package` | `exclude-newer-package` | Limit candidate packages for specific packages to those that were uploaded prior to the given date. Accepts package-date pairs in the format `PACKAGE=DATE` (same date formats as `--exclude-newer`). Can be provided multiple times for different packages. |
| `--extra` | `extra` | Extras to enable for the dependency. May be provided more than once. To add this dependency to an optional extra instead, see `--optional`. |
| `--extra-index-url` | `extra-index-url` | (Deprecated: use `--index` instead) Extra URLs of package indexes to use, in addition to `--index-url`. All indexes provided via this flag take priority over the index specified by `--index-url` (which defaults to PyPI). When multiple `--extra-index-url` flags are provided, earlier values take priority. May also be set with the `UV_EXTRA_INDEX_URL` environment variable. |
| `--find-links`, `-f` | `find-links` | Locations to search for candidate distributions, in addition to those found in the registry indexes. If a path, the target must be a directory that contains packages as wheel files (`.whl`) or source distributions (e.g., `.tar.gz` or `.zip`) at the top level. If a URL, the page must contain a flat list of links to package files. May also be set with the `UV_FIND_LINKS` environment variable. |
| `--fork-strategy` | `fork-strategy` | The strategy to use when selecting multiple versions of a given package across Python versions and platforms. By default, uv will optimize for selecting the latest version of each package for each supported Python version (`requires-python`), while minimizing the number of selected versions across platforms. Under `fewest`, uv will minimize the number of selected versions for each package, preferring older versions that are compatible with a wider range of supported Python versions or platforms. May also be set with the `UV_FORK_STRATEGY` environment variable. Possible values: `fewest`, `requires-python`. |
| `--frozen` | | Add dependencies without re-locking the project [env: UV_FROZEN=]. The project environment will not be synced. |
| `--group` | `group` | Add the requirements to the specified dependency group. These requirements will not be included in the published metadata for the project. |
| `--index` | `index` | The indexes to use when resolving dependencies, in addition to the default index. All indexes provided via this flag take priority over the index specified by `--default-index` (which defaults to PyPI). When multiple `--index` flags are provided, earlier values take priority. Indexes configured in `uv.toml` or `pyproject.toml` may be selected by name. Enable the `index-by-name` preview feature to prefer index names over relative paths. Relative paths can be disambiguated from index names with `./` or `../` on Unix or `.\\`, `..\\`, `./` or `../` on Windows. May also be set with the `UV_INDEX` environment variable. |
| `--index-strategy` | `index-strategy` | The strategy to use when resolving against multiple index URLs. By default, uv will stop at the first index on which a given package is available, and limit resolutions to those present on that first index (`first-index`). This prevents "dependency confusion" attacks. May also be set with the `UV_INDEX_STRATEGY` environment variable. Possible values: `first-index`, `unsafe-first-match`, `unsafe-best-match`. |
| `--index-url`, `-i` | `index-url` | (Deprecated: use `--default-index` instead) The URL of the Python package index (by default: <https://pypi.org/simple>). The index given by this flag is given lower priority than all other indexes specified via the `--extra-index-url` flag. May also be set with the `UV_INDEX_URL` environment variable. |
| `--keyring-provider` | `keyring-provider` | Attempt to use `keyring` for authentication for index URLs. At present, only `--keyring-provider subprocess` is supported, which configures uv to use the `keyring` CLI to handle authentication. Defaults to `disabled`. May also be set with the `UV_KEYRING_PROVIDER` environment variable. Possible values: `disabled`, `subprocess`. |
| `--lfs` | | Whether to use Git LFS when adding a dependency from Git |
| `--link-mode` | `link-mode` | The method to use when installing packages from the global cache. Defaults to `clone` (also known as Copy-on-Write) on macOS and Linux, and `hardlink` on Windows. WARNING: The use of symlink link mode is discouraged, as they create tight coupling between the cache and the target environment. May also be set with the `UV_LINK_MODE` environment variable. Possible values: `clone`, `copy`, `hardlink`, `symlink`. |
| `--locked` | | Assert that the `uv.lock` will remain unchanged [env: UV_LOCKED=]. Requires that the lockfile is up-to-date. If the lockfile is missing or needs to be updated, uv will exit with an error. |
| `--marker`, `-m` | `marker` | Apply this marker to all added packages |
| `--no-binary` | | Don't install pre-built wheels. The given packages will be built and installed from source. The resolver will still use pre-built wheels to extract package metadata, if available. May also be set with the `UV_NO_BINARY` environment variable. |
| `--no-binary-package` | `no-binary-package` | Don't install pre-built wheels for a specific package [env: UV_NO_BINARY_PACKAGE=] |
| `--no-build` | | Don't build source distributions. When enabled, uv will reuse cached wheels from previously built source distributions, but operations that require building a source distribution will exit with an error. First-party packages, such as projects in the workspace, will still be built. uv will also still build editable requirements, and their build backends may run arbitrary Python code. May also be set with the `UV_NO_BUILD` environment variable. |
| `--no-build-isolation` | | Disable isolation when building source distributions. Assumes that build dependencies specified by PEP 518 are already installed. May also be set with the `UV_NO_BUILD_ISOLATION` environment variable. |
| `--no-build-isolation-package` | `no-build-isolation-package` | Disable isolation when building source distributions for a specific package. Assumes that the packages' build dependencies specified by PEP 518 are already installed. |
| `--no-build-package` | `no-build-package` | Don't build source distributions for a specific package [env: UV_NO_BUILD_PACKAGE=]. First-party packages, such as projects in the workspace, will still be built. |
| `--no-index` | | Ignore the registry index (e.g., PyPI), instead relying on direct URL dependencies and those provided via `--find-links` |
| `--no-install-local` | | Do not install local path dependencies [env: UV_NO_INSTALL_LOCAL=]. Skips the current project, workspace members, and any other local (path or editable) packages. Only remote/indexed dependencies are installed. Useful in Docker builds to cache heavy third-party dependencies first and layer local packages separately. The inverse `--only-install-local` can be used to install *only* local packages, excluding all remote dependencies. |
| `--no-install-package` | `no-install-package` | Do not install the given package(s). By default, all project's dependencies are installed into the environment. The `--no-install-package` option allows exclusion of specific packages. Note this can result in a broken environment, and should be used with caution. The inverse `--only-install-package` can be used to install *only* the specified packages, excluding all others. |
| `--no-install-project` | | Do not install the current project [env: UV_NO_INSTALL_PROJECT=]. By default, the current project is installed into the environment with all of its dependencies. The `--no-install-project` option allows the project to be excluded, but all of its dependencies are still installed. This is particularly useful in situations like building Docker images where installing the project separately from its dependencies allows optimal layer caching. The inverse `--only-install-project` can be used to install *only* the project itself, excluding all dependencies. |
| `--no-install-workspace` | | Do not install any workspace members, including the current project [env: UV_NO_INSTALL_WORKSPACE=]. By default, all workspace members and their dependencies are installed into the environment. The `--no-install-workspace` option allows exclusion of all the workspace members while retaining their dependencies. The inverse `--only-install-workspace` can be used to install *only* workspace members, excluding all other dependencies. |
| `--no-require-build-hashes` | | Do not require hashes for every build dependency |
| `--no-sources` | | Ignore the `tool.uv.sources` table when resolving dependencies. Used to lock against the standards-compliant, publishable package metadata, as opposed to using any workspace, Git, URL, or local path sources. May also be set with the `UV_NO_SOURCES` environment variable. |
| `--no-sources-package` | `no-sources-package` | Don't use sources from the `tool.uv.sources` table for the specified packages [env: UV_NO_SOURCES_PACKAGE=] |
| `--no-sync` | | Avoid syncing the virtual environment [env: UV_NO_SYNC=] |
| `--no-workspace` | | Don't add the dependency as a workspace member. By default, when adding a dependency that's a local path and is within the workspace directory, uv will add it as a workspace member; pass `--no-workspace` to add the package as direct path dependency instead. |
| `--optional` | `optional` | Add the requirements to the package's optional dependencies for the specified extra. The group may then be activated when installing the project with the `--extra` flag. To enable an optional extra for this requirement instead, see `--extra`. |
| `--package` | `package` | Add the dependency to a specific package in the workspace |
| `--prerelease` | `prerelease` | The strategy to use when considering pre-release versions. By default, uv will prefer stable candidates, falling back to pre-releases only after every stable candidate that satisfies the active constraints is rejected (`if-necessary`). May also be set with the `UV_PRERELEASE` environment variable. Possible values: `disallow`, `allow`, `if-necessary`, `explicit`, `if-necessary-or-explicit` (deprecated alias for `if-necessary`). |
| `--prerelease-package` | `prerelease-package` | The strategy to use when considering pre-release versions for a specific package. Accepts package-mode pairs in the format `PACKAGE=MODE`, where `MODE` is any value accepted by `--prerelease`. May be provided multiple times for different packages. |
| `--python`, `-p` | `python` | The Python interpreter to use for resolving and syncing. See `uv python` for details on Python discovery and supported request formats. May also be set with the `UV_PYTHON` environment variable. |
| `--raw`, `--raw-sources` | | Add a dependency as provided. By default, uv will use the `tool.uv.sources` section to record source information for Git, local, editable, and direct URL requirements. When `--raw` is provided, uv will add source requirements to `project.dependencies`, rather than `tool.uv.sources`. Additionally, by default, uv will add bounds to your dependency, e.g., `foo>=1.0.0`. When `--raw` is provided, uv will add the dependency without bounds. |
| `--refresh` | | Refresh all cached data |
| `--refresh-package` | `refresh-package` | Refresh cached data for a specific package |
| `--reinstall`, `--force-reinstall` | | Reinstall all packages, regardless of whether they're already installed. Implies `--refresh` |
| `--reinstall-package` | `reinstall-package` | Reinstall a specific package, regardless of whether it's already installed. Implies `--refresh-package` |
| `--require-build-hashes` | | Require hashes for all build dependencies. Hashes can be provided in `tool.uv.build-constraint-dependencies` or URL fragments (e.g., `#sha256=...`) in `build-system.requires`. This does not require hashes for runtime dependencies. No hash is required when uv uses its bundled `uv_build` backend, since it is part of the uv executable. When build isolation is disabled, build dependencies must already be installed and their hashes are not checked. |
| `--requirements`, `--requirement`, `-r` | `requirements` | Add the packages listed in the given files. The following formats are supported: `requirements.txt`, `.py` files with inline metadata, `pylock.toml`, `pyproject.toml`, `setup.py`, and `setup.cfg`. |
| `--resolution` | `resolution` | The strategy to use when selecting between the different compatible versions for a given package requirement. By default, uv will use the latest compatible version of each package (`highest`). May also be set with the `UV_RESOLUTION` environment variable. Possible values: `highest`, `lowest`, `lowest-direct`. |
| `--rev` | `rev` | Commit to use when adding a dependency from Git |
| `--script` | `script` | Add the dependency to the specified Python script, rather than to a project. If provided, uv will add the dependency to the script's inline metadata table, in adherence with PEP 723. If no such inline metadata table is present, a new one will be created and added to the script. When executed via `uv run`, uv will create a temporary environment for the script with all inline dependencies installed. |
| `--tag` | `tag` | Tag to use when adding a dependency from Git |
| `--upgrade`, `-U` | | Allow package upgrades, ignoring pinned versions in any existing output file. Implies `--refresh` |
| `--upgrade-group` | `upgrade-group` | Allow upgrades for all packages in a dependency group, ignoring pinned versions in any existing output file |
| `--upgrade-package`, `-P` | `upgrade-package` | Allow upgrades for a specific package, ignoring pinned versions in any existing output file. Implies `--refresh-package` |
| `--workspace` | | Add the dependency as a workspace member. By default, uv will add path dependencies that are within the workspace directory as workspace members. When used with a path dependency, the package will be added to the workspace's `members` list in the root `pyproject.toml` file. |

## Notes

- Global options are listed in uv.md (project-commands).
- `--bounds` is in preview and may change in any future release.

## Related

- [uv remove](./uv-remove.md)
- [uv lock](./uv-lock.md)
- [uv sync](./uv-sync.md)
