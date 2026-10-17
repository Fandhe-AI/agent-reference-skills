---
source: https://docs.astral.sh/uv/reference/cli/#uv-tool-upgrade
---

# uv tool upgrade

Upgrade installed tools.

## Signature / Usage

```
uv tool upgrade [OPTIONS] <NAME>...
```

```console
$ uv tool upgrade black --upgrade-package click
```

- If a tool was installed with version constraints, they are respected on upgrade — to upgrade beyond the originally provided constraints, use `uv tool install` again.
- If a tool was installed with specific settings (e.g., `--prerelease allow`), they continue to be respected in upgrades.
- Argument `NAME`: the name of the tool to upgrade, along with an optional version specifier.

## Options / Props

| Name | Value | Description |
| --- | --- | --- |
| `--all` | | Upgrade all tools |
| `--python`, `-p` | python | Upgrade a tool, and specify it to use the given Python interpreter to build its environment. Use with `--all` to apply to all tools. May also be set with `UV_PYTHON`. |
| `--python-platform` | python-platform | The platform for which requirements should be installed, as a target triple. Intended for advanced use cases. |
| `--reinstall`, `--force-reinstall` | | Reinstall all packages, regardless of whether they're already installed. Implies `--refresh` |
| `--reinstall-package` | reinstall-package | Reinstall a specific package. Implies `--refresh-package` |
| `--default-index` | default-index | The default package index (by default: <https://pypi.org/simple>). May also be set with `UV_DEFAULT_INDEX`. |
| `--index` | index | Indexes to use when resolving dependencies, in addition to the default index. May also be set with `UV_INDEX`. |
| `--index-url`, `-i` | index-url | (Deprecated: use `--default-index` instead) May also be set with `UV_INDEX_URL`. |
| `--extra-index-url` | extra-index-url | (Deprecated: use `--index` instead) May also be set with `UV_EXTRA_INDEX_URL`. |
| `--index-strategy` | index-strategy | `first-index` (default), `unsafe-first-match`, `unsafe-best-match`. May also be set with `UV_INDEX_STRATEGY`. |
| `--find-links`, `-f` | find-links | Locations to search for candidate distributions. May also be set with `UV_FIND_LINKS`. |
| `--no-index` | | Ignore the registry index (e.g., PyPI), instead relying on direct URL dependencies and those provided via `--find-links` |
| `--keyring-provider` | keyring-provider | `disabled` (default) or `subprocess`. May also be set with `UV_KEYRING_PROVIDER`. |
| `--exclude-newer` | exclude-newer | Limit candidate packages to those uploaded prior to the given date. `false` disables it. May also be set with `UV_EXCLUDE_NEWER`. |
| `--exclude-newer-package` | exclude-newer-package | Per-package `PACKAGE=DATE` form of `--exclude-newer` |
| `--resolution` | resolution | `highest` (default), `lowest`, `lowest-direct`. May also be set with `UV_RESOLUTION`. |
| `--prerelease` | prerelease | `disallow`, `allow`, `if-necessary` (default), `explicit`, `if-necessary-or-explicit` (deprecated alias). May also be set with `UV_PRERELEASE`. |
| `--prerelease-package` | prerelease-package | `PACKAGE=MODE` pre-release strategy for a specific package |
| `--fork-strategy` | fork-strategy | `fewest` or `requires-python`. May also be set with `UV_FORK_STRATEGY`. |
| `--compile-bytecode`, `--compile` | | Compile Python files to bytecode after installation. May also be set with `UV_COMPILE_BYTECODE`. |
| `--link-mode` | link-mode | `clone` (default on macOS/Linux), `copy`, `hardlink` (default on Windows), `symlink` (discouraged). May also be set with `UV_LINK_MODE`. |
| `--no-binary` | | Don't install pre-built wheels. May also be set with `UV_NO_BINARY`. |
| `--no-binary-package` | no-binary-package | Don't install pre-built wheels for a specific package [env: `UV_NO_BINARY_PACKAGE`] |
| `--no-build` | | Don't build source distributions. May also be set with `UV_NO_BUILD`. |
| `--no-build-package` | no-build-package | Don't build source distributions for a specific package [env: `UV_NO_BUILD_PACKAGE`] |
| `--no-build-isolation` | | Disable isolation when building source distributions. May also be set with `UV_NO_BUILD_ISOLATION`. |
| `--no-build-isolation-package` | no-build-isolation-package | Disable build isolation for a specific package |
| `--config-setting`, `--config-settings`, `-C` | config-setting | Settings to pass to the PEP 517 build backend, as `KEY=VALUE` pairs |
| `--config-setting-package`, `--config-settings-package` | config-setting-package | Per-package `PACKAGE:KEY=VALUE` build backend settings |
| `--require-build-hashes` | | Require hashes for all build dependencies |
| `--no-require-build-hashes` | | Do not require hashes for every build dependency |
| `--no-sources` | | Ignore the `tool.uv.sources` table when resolving dependencies. May also be set with `UV_NO_SOURCES`. |
| `--no-sources-package` | no-sources-package | Don't use sources from `tool.uv.sources` for the specified packages [env: `UV_NO_SOURCES_PACKAGE`] |

## Notes

- Global options are listed in uv.md (project-commands).
- Tool upgrades reinstall the tool executables, even if they have not changed (see tools.md).
- The CLI reference help text spells this `--prereleases`; the actual flag is `--prerelease` (see concepts/tools).

## Related

- [Tools](./tools.md)
- [uv tool install](./uv-tool-install.md)
- [uv tool list](./uv-tool-list.md)
