---
source: https://docs.astral.sh/uv/reference/cli/#uv-tool-uninstall
---

# uv tool uninstall

Uninstall a tool.

## Signature / Usage

```
uv tool uninstall [OPTIONS] <NAME>...
```

```console
$ uv tool uninstall ruff
```

Argument `NAME`: the name of the tool to uninstall.

## Options / Props

| Name | Value | Description |
| --- | --- | --- |
| `--all` | | Uninstall all tools |

## Notes

- Global options are listed in uv.md (project-commands).
- Uninstalling removes the tool environment from the uv tools directory (see tools.md: the environment is kept only until the tool is uninstalled).

## Related

- [Tools](./tools.md)
- [uv tool list](./uv-tool-list.md)
- [uv tool install](./uv-tool-install.md)
