---
source: https://docs.astral.sh/uv/reference/cli/#uv-tool-list
---

# uv tool list

List installed tools.

## Signature / Usage

```
uv tool list [OPTIONS]
```

```console
$ uv tool list --outdated
```

## Options / Props

| Name | Value | Description |
| --- | --- | --- |
| `--outdated` | | List outdated tools. The latest version of each tool is shown alongside the installed version; up-to-date tools are omitted. |
| `--show-extras` | | Whether to display the extra requirements installed with each tool |
| `--show-paths` | | Whether to display the path to each tool environment and installed executable |
| `--show-python` | | Whether to display the Python version associated with each tool |
| `--show-version-specifiers` | | Whether to display the version specifier(s) used to install each tool |
| `--show-with` | | Whether to display the additional requirements installed with each tool |
| `--exclude-newer` | exclude-newer | Limit candidate packages to those uploaded prior to the given date. `false` disables it. May also be set with `UV_EXCLUDE_NEWER`. |
| `--exclude-newer-package` | exclude-newer-package | Per-package `PACKAGE=DATE` form of `--exclude-newer`. Can be provided multiple times. |

## Notes

- Global options are listed in uv.md (project-commands).

## Related

- [uv tool upgrade](./uv-tool-upgrade.md)
- [uv tool uninstall](./uv-tool-uninstall.md)
- [uv tool audit](./uv-tool-audit.md)
