---
source: https://docs.astral.sh/uv/reference/cli/#uv-tool-dir
---

# uv tool dir

Show the path to the uv tools directory. The tools directory stores environments and metadata for installed tools.

## Signature / Usage

```
uv tool dir [OPTIONS]
```

```console
$ uv tool dir --bin
```

- By default, tools are stored in the uv data directory at `$XDG_DATA_HOME/uv/tools` or `$HOME/.local/share/uv/tools` on Unix and `%APPDATA%\uv\data\tools` on Windows.
- The tool installation directory may be overridden with `$UV_TOOL_DIR`.
- To view the directory uv installs executables into, use `--bin`.

## Options / Props

| Name | Value | Description |
| --- | --- | --- |
| `--bin` | | Show the directory into which `uv tool` will install executables. By default the directory holding the tool environments is shown. The executable directory is derived from, in order of preference: `$UV_TOOL_BIN_DIR`, `$XDG_BIN_HOME`, `$XDG_DATA_HOME/../bin`, `$HOME/.local/bin`. |

## Notes

- Global options are listed in uv.md (project-commands).

## Related

- [Tools](./tools.md)
- [uv tool update-shell](./uv-tool-update-shell.md)
- [uv tool install](./uv-tool-install.md)
