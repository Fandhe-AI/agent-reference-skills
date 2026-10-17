---
source: https://docs.astral.sh/uv/reference/cli/#uv-audit
---

# uv audit

Audit the project's dependencies.

## Signature / Usage

```
uv audit [OPTIONS]
```

```console
$ uv audit --output-format json
```

- Dependencies are audited for known vulnerabilities, as well as 'adverse' statuses such as deprecation and quarantine.
- By default, all extras and dependency groups within the project are audited, regardless of `tool.uv.default-groups`. To omit all dependency groups, use `--no-default-groups`. To exclude individual extras or groups, use `--no-extra` or `--no-group`.
- Auditing requires network access and cannot be performed in offline mode.

## Options / Props

| Name | Value | Description |
| --- | --- | --- |
| `--config-setting`, `--config-settings`, `-C` | `config-setting` | Settings to pass to the PEP 517 build backend, specified as `KEY=VALUE` pairs |
| `--config-settings-package` | `config-settings-package` | Settings to pass to the PEP 517 build backend for a specific package, specified as `PACKAGE:KEY=VALUE` pairs |
| `--default-index` | `default-index` | The default package index (by default: <https://pypi.org/simple>). The index given by this flag is given lower priority than all other indexes specified via the `--index` flag. May also be set with the `UV_DEFAULT_INDEX` environment variable. |
| `--exclude-newer` | `exclude-newer` | Limit candidate packages to those that were uploaded prior to the given date (RFC 3339 timestamp, local date, "friendly" duration, or ISO 8601 duration; calendar units such as months and years are not allowed). Use `false` to disable `exclude-newer`. May also be set with the `UV_EXCLUDE_NEWER` environment variable. |
| `--exclude-newer-package` | `exclude-newer-package` | Limit candidate packages for specific packages to those that were uploaded prior to the given date. Accepts package-date pairs in the format `PACKAGE=DATE`. Can be provided multiple times for different packages. |
| `--extra-index-url` | `extra-index-url` | (Deprecated: use `--index` instead) Extra URLs of package indexes to use, in addition to `--index-url`. May also be set with the `UV_EXTRA_INDEX_URL` environment variable. |
| `--find-links`, `-f` | `find-links` | Locations to search for candidate distributions, in addition to those found in the registry indexes. May also be set with the `UV_FIND_LINKS` environment variable. |
| `--fork-strategy` | `fork-strategy` | The strategy to use when selecting multiple versions of a given package across Python versions and platforms. May also be set with the `UV_FORK_STRATEGY` environment variable. Possible values: `fewest`, `requires-python`. |
| `--frozen` | | Audit the requirements without locking the project [env: UV_FROZEN=]. If the lockfile is missing, uv will exit with an error. |
| `--ignore` | `ignore` | Ignore a vulnerability by ID. Vulnerabilities matching any of the provided IDs (including aliases) will be excluded from the audit results. May be provided multiple times. |
| `--ignore-until-fixed` | `ignore-until-fixed` | Ignore a vulnerability by ID, but only while no fix is available. Vulnerabilities matching any of the provided IDs (including aliases) will be excluded from the audit results as long as they have no known fix versions. Once a fix version becomes available, the vulnerability will be reported again. May be provided multiple times. |
| `--index` | `index` | The indexes to use when resolving dependencies, in addition to the default index. May also be set with the `UV_INDEX` environment variable. |
| `--index-strategy` | `index-strategy` | The strategy to use when resolving against multiple index URLs. By default `first-index`. May also be set with the `UV_INDEX_STRATEGY` environment variable. Possible values: `first-index`, `unsafe-first-match`, `unsafe-best-match`. |
| `--index-url`, `-i` | `index-url` | (Deprecated: use `--default-index` instead) The URL of the Python package index (by default: <https://pypi.org/simple>). May also be set with the `UV_INDEX_URL` environment variable. |
| `--keyring-provider` | `keyring-provider` | Attempt to use `keyring` for authentication for index URLs. Defaults to `disabled`. May also be set with the `UV_KEYRING_PROVIDER` environment variable. Possible values: `disabled`, `subprocess`. |
| `--link-mode` | `link-mode` | The method to use when installing packages from the global cache. This option is only used when building source distributions. Defaults to `clone` (also known as Copy-on-Write) on macOS and Linux, and `hardlink` on Windows. May also be set with the `UV_LINK_MODE` environment variable. Possible values: `clone`, `copy`, `hardlink`, `symlink`. |
| `--locked` | | Assert that the `uv.lock` will remain unchanged [env: UV_LOCKED=]. Requires that the lockfile is up-to-date. If the lockfile is missing or needs to be updated, uv will exit with an error. |
| `--no-binary` | | Don't install pre-built wheels. May also be set with the `UV_NO_BINARY` environment variable. |
| `--no-binary-package` | `no-binary-package` | Don't install pre-built wheels for a specific package [env: UV_NO_BINARY_PACKAGE=] |
| `--no-build` | | Don't build source distributions. First-party packages, such as projects in the workspace, will still be built. May also be set with the `UV_NO_BUILD` environment variable. |
| `--no-build-isolation` | | Disable isolation when building source distributions. Assumes that build dependencies specified by PEP 518 are already installed. May also be set with the `UV_NO_BUILD_ISOLATION` environment variable. |
| `--no-build-isolation-package` | `no-build-isolation-package` | Disable isolation when building source distributions for a specific package. |
| `--no-build-package` | `no-build-package` | Don't build source distributions for a specific package [env: UV_NO_BUILD_PACKAGE=]. First-party packages, such as projects in the workspace, will still be built. |
| `--no-default-groups` | | Don't audit dependency groups unless explicitly requested. By default, `uv audit` includes all dependency groups, regardless of `tool.uv.default-groups`. Groups can still be selected with `--only-group` or `--only-dev`. May also be set with the `UV_NO_DEFAULT_GROUPS` environment variable. |
| `--no-dev` | | Don't audit the development dependency group [env: UV_NO_DEV=]. This option is an alias of `--no-group dev`. See `--no-default-groups` to exclude all dependency groups instead. This option is only available when running in a project. |
| `--no-extra` | `no-extra` | Don't audit the specified optional dependencies. May be provided multiple times. |
| `--no-group` | `no-group` | Don't audit the specified dependency group [env: UV_NO_GROUP=]. May be provided multiple times. |
| `--no-index` | | Ignore the registry index (e.g., PyPI), instead relying on direct URL dependencies and those provided via `--find-links` |
| `--no-require-build-hashes` | | Do not require hashes for every build dependency |
| `--no-sources` | | Ignore the `tool.uv.sources` table when resolving dependencies. May also be set with the `UV_NO_SOURCES` environment variable. |
| `--no-sources-package` | `no-sources-package` | Don't use sources from the `tool.uv.sources` table for the specified packages [env: UV_NO_SOURCES_PACKAGE=] |
| `--only-dev` | | Only audit the development dependency group. The project and its dependencies will be omitted. This option is an alias for `--only-group dev`. Implies `--no-default-groups`. |
| `--only-group` | `only-group` | Only audit dependencies from the specified dependency group. The project and its dependencies will be omitted. May be provided multiple times. Implies `--no-default-groups`. |
| `--output-format` | `output-format` | Select the output format [default: text]. Possible values: `text` (human-readable), `json`, `sarif` (SARIF format). |
| `--prerelease` | `prerelease` | The strategy to use when considering pre-release versions. By default `if-necessary`. May also be set with the `UV_PRERELEASE` environment variable. Possible values: `disallow`, `allow`, `if-necessary`, `explicit`, `if-necessary-or-explicit` (deprecated alias for `if-necessary`). |
| `--prerelease-package` | `prerelease-package` | The strategy to use when considering pre-release versions for a specific package. Accepts package-mode pairs in the format `PACKAGE=MODE`. May be provided multiple times for different packages. |
| `--python-platform` | `python-platform` | The platform to use when auditing. For example, pass `--platform windows` to audit the dependencies that would be included when installing on Windows. Represented as a "target triple", a string that describes the target platform in terms of its CPU, vendor, and operating system name, like `x86_64-unknown-linux-gnu` or `aarch64-apple-darwin`. Possible values: the same list as in `uv run` (aliases `windows`, `linux`, `macos`; target triples; `manylinux` targets; Android, Pyodide and iOS targets). |
| `--python-version` | `python-version` | The Python version to use when auditing. For example, pass `--python-version 3.10` to audit the dependencies that would be included when installing on Python 3.10. Defaults to the version of the discovered Python interpreter. |
| `--require-build-hashes` | | Require hashes for all build dependencies. This does not require hashes for runtime dependencies. No hash is required when uv uses its bundled `uv_build` backend, since it is part of the uv executable. |
| `--resolution` | `resolution` | The strategy to use when selecting between the different compatible versions for a given package requirement. By default `highest`. May also be set with the `UV_RESOLUTION` environment variable. Possible values: `highest`, `lowest`, `lowest-direct`. |
| `--script` | `script` | Audit the specified PEP 723 Python script, rather than the current project. The specified script must be locked, i.e. with `uv lock --script <script>` before it can be audited. |
| `--service-format` | `service-format` | The service format to use for vulnerability lookups. Each service format has a default URL, which can be changed with `--service-url`. The defaults are: OSV: <https://api.osv.dev/>. [default: osv]. Possible values: `osv`. |
| `--service-url` | `service-url` | The URL to vulnerability service API endpoint. If not provided, the default URL for the selected service will be used. The service needs to use the OSV protocol, unless a different format was requested by `--service-format`. |
| `--upgrade`, `-U` | | Allow package upgrades, ignoring pinned versions in any existing output file. Implies `--refresh` |
| `--upgrade-group` | `upgrade-group` | Allow upgrades for all packages in a dependency group, ignoring pinned versions in any existing output file |
| `--upgrade-package`, `-P` | `upgrade-package` | Allow upgrades for a specific package, ignoring pinned versions in any existing output file. Implies `--refresh-package` |

## Notes

- Preview feature `audit-command`: `uv audit` and `uv tool audit` check project and installed-tool dependencies for known vulnerabilities; a preview warning is displayed unless the feature is enabled (see the preview features page). The preview feature `malware-check` is separate: it checks packages for malware using OSV before installing.
- Global options are listed in uv.md (project-commands).

## Related

- [uv lock](./uv-lock.md)
- [uv tree](./uv-tree.md)
- [uv (commands and global options)](./uv.md)
