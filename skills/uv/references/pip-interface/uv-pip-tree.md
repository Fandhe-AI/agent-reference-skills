---
source: https://docs.astral.sh/uv/reference/cli/#uv-pip-tree
---

# uv pip tree

Display the dependency tree for an environment.

## Signature / Usage

```
uv pip tree [OPTIONS]
```

```console
$ uv pip tree --depth 2
```

## Options / Props

| Name | Value | Description |
| --- | --- | --- |
| `--cert` | file | Path to a PEM-encoded CA certificate bundle. If provided, overrides the default certificate source. |
| `--default-index` | default-index | The default package index (by default: `https://pypi.org/simple`); lower priority than `--index`. Indexes configured in `uv.toml` / `pyproject.toml` may be selected by name (`index-by-name` preview feature). Env: `UV_DEFAULT_INDEX`. |
| `--depth`, `-d` | depth | Maximum display depth of the dependency tree. Default: 255. |
| `--exclude-newer` | exclude-newer | Limit candidates to distributions uploaded prior to the given date (per-artifact upload time). Accepts RFC 3339 timestamps, local dates (`2006-12-02`), friendly durations (`24 hours`, `1 week`, `30 days`), or ISO 8601 durations (`PT24H`, `P7D`, `P30D`); months and years not allowed. `false` disables. Env: `UV_EXCLUDE_NEWER`. |
| `--exclude-newer-package` | exclude-newer-package | Per-package `PACKAGE=DATE`. Can be provided multiple times. |
| `--extra-index-url` | extra-index-url | (Deprecated: use `--index` instead) Extra package index URLs; earlier values take priority. Env: `UV_EXTRA_INDEX_URL`. |
| `--find-links`, `-f` | find-links | Locations to search for candidate distributions in addition to registry indexes. Env: `UV_FIND_LINKS`. |
| `--index` | index | Indexes to use when resolving dependencies, in addition to the default index; earlier values take priority. Env: `UV_INDEX`. |
| `--index-strategy` | index-strategy | Strategy for multiple index URLs. Default `first-index`. Values: `first-index`, `unsafe-first-match`, `unsafe-best-match`. Env: `UV_INDEX_STRATEGY`. |
| `--index-url`, `-i` | index-url | (Deprecated: use `--default-index` instead) The URL of the Python package index. Env: `UV_INDEX_URL`. |
| `--invert`, `--reverse` | | Show the reverse dependencies for the given package; inverts the tree and displays the packages that depend on the given package. |
| `--keyring-provider` | keyring-provider | Use `keyring` for authentication for index URLs. Only `subprocess` is supported. Defaults to `disabled`. Env: `UV_KEYRING_PROVIDER`. |
| `--no-dedupe` | | Do not de-duplicate repeated dependencies. Usually, when a package has already displayed its dependencies, further occurrences do not re-display them and include a `(*)`; this flag repeats them. |
| `--no-index` | | Ignore the registry index (e.g., PyPI), relying on direct URL dependencies and `--find-links`. |
| `--outdated` | | Show the latest available version of each package in the tree. |
| `--package` | package | Display only the specified packages. |
| `--prune` | prune | Prune the given package from the display of the dependency tree. |
| `--python`, `-p` | python | Python interpreter for which packages should be listed. By default uv lists packages in a virtual environment but shows packages in a system Python environment if no virtual environment is found. Env: `UV_PYTHON`. |
| `--show-sizes` | | Show compressed wheel sizes for packages in the tree. |
| `--show-version-specifiers` | | Show the version constraint(s) imposed on each package. |
| `--strict` | | Validate the Python environment, to detect packages with missing dependencies and other issues. |
| `--system` | | List packages in the system Python environment. Disables discovery of virtual environments. Env: `UV_SYSTEM_PYTHON`. |

## Notes

- Global options (`--allow-insecure-host` / `--trusted-host`, `--cache-dir`, `--color`, `--config-file`, `--directory`, `--help`, `--managed-python`, `--no-managed-python`, `--no-cache`, `--no-config`, `--no-progress`, `--no-python-downloads`, `--offline`, `--project`, `--quiet`, `--system-certs`, `--verbose`) are listed in `../project-commands/uv.md`. `--project` has no effect in the `uv pip` interface.
- `uv pip tree` shows an installed environment; the project-level tree is `uv tree`.

## Related

- [Inspecting environments](./inspection.md)
- [uv pip list](./uv-pip-list.md)
