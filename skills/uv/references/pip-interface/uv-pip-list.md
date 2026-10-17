---
source: https://docs.astral.sh/uv/reference/cli/#uv-pip-list
---

# uv pip list

List, in tabular format, packages installed in an environment.

## Signature / Usage

```
uv pip list [OPTIONS]
```

```console
$ uv pip list --format json
```

## Options / Props

| Name | Value | Description |
| --- | --- | --- |
| `--cert` | file | Path to a PEM-encoded CA certificate bundle. If provided, overrides the default certificate source. |
| `--default-index` | default-index | The default package index (by default: `https://pypi.org/simple`); lower priority than `--index`. Indexes configured in `uv.toml` / `pyproject.toml` may be selected by name (`index-by-name` preview feature). Env: `UV_DEFAULT_INDEX`. |
| `--editable`, `-e` | | Only include editable projects. |
| `--exclude` | exclude | Exclude the specified package(s) from the output. |
| `--exclude-editable` | | Exclude any editable packages from output. |
| `--exclude-newer` | exclude-newer | Limit candidates to distributions uploaded prior to the given date (per-artifact upload time). Accepts RFC 3339 timestamps, local dates (`2006-12-02`), friendly durations (`24 hours`, `1 week`, `30 days`), or ISO 8601 durations (`PT24H`, `P7D`, `P30D`); months and years not allowed. `false` disables. Env: `UV_EXCLUDE_NEWER`. |
| `--exclude-newer-package` | exclude-newer-package | Per-package `PACKAGE=DATE`. Can be provided multiple times. |
| `--extra-index-url` | extra-index-url | (Deprecated: use `--index` instead) Extra package index URLs; earlier values take priority. Env: `UV_EXTRA_INDEX_URL`. |
| `--find-links`, `-f` | find-links | Locations to search for candidate distributions in addition to registry indexes. Env: `UV_FIND_LINKS`. |
| `--format` | format | Output format (default `columns`). Values: `columns` (human-readable table), `freeze` (`pip freeze`-like, one package per line with its version), `json` (machine-readable). |
| `--index` | index | Indexes to use when resolving dependencies, in addition to the default index; earlier values take priority. Env: `UV_INDEX`. |
| `--index-strategy` | index-strategy | Strategy for multiple index URLs. Default `first-index`. Values: `first-index`, `unsafe-first-match`, `unsafe-best-match`. Env: `UV_INDEX_STRATEGY`. |
| `--index-url`, `-i` | index-url | (Deprecated: use `--default-index` instead) The URL of the Python package index. Env: `UV_INDEX_URL`. |
| `--keyring-provider` | keyring-provider | Use `keyring` for authentication for index URLs. Only `subprocess` is supported. Defaults to `disabled`. Env: `UV_KEYRING_PROVIDER`. |
| `--no-index` | | Ignore the registry index (e.g., PyPI), relying on direct URL dependencies and `--find-links`. |
| `--outdated` | | List outdated packages. The latest version of each package is shown alongside the installed version; up-to-date packages are omitted. |
| `--prefix` | prefix | List packages from the specified `--prefix` directory. |
| `--python`, `-p` | python | Python interpreter for which packages should be listed. By default uv lists packages in a virtual environment but shows packages in a system Python environment if no virtual environment is found. Env: `UV_PYTHON`. |
| `--strict` | | Validate the Python environment, to detect packages with missing dependencies and other issues. |
| `--system` | | List packages in the system Python environment. Disables discovery of virtual environments. Env: `UV_SYSTEM_PYTHON`. |
| `--target`, `-t` | target | List packages from the specified `--target` directory. |

## Notes

- Global options (`--allow-insecure-host` / `--trusted-host`, `--cache-dir`, `--color`, `--config-file`, `--directory`, `--help`, `--managed-python`, `--no-managed-python`, `--no-cache`, `--no-config`, `--no-progress`, `--no-python-downloads`, `--offline`, `--project`, `--quiet`, `--system-certs`, `--verbose`) are listed in `../project-commands/uv.md`. The CLI reference states `--project` has no effect in the `uv pip` interface (the pip guides use it only as the source directory for `--group` in `uv pip compile` / `uv pip install`).
- uv normalizes package names in output (e.g., `docstring-parser`), unlike `pip list` (see compatibility-resolution.md).

## Related

- [Inspecting environments](./inspection.md)
- [uv pip freeze](./uv-pip-freeze.md)
- [uv pip tree](./uv-pip-tree.md)
