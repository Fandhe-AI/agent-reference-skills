---
source: https://docs.astral.sh/uv/reference/cli/#uv-python-dir
---

# uv python dir

Show the uv Python installation directory.

## Signature / Usage

```
uv python dir [OPTIONS]
```

By default, Python installations are stored in the uv data directory at `$XDG_DATA_HOME/uv/python` or `$HOME/.local/share/uv/python` on Unix and `%APPDATA%\uv\data\python` on Windows. The Python installation directory may be overridden with `$UV_PYTHON_INSTALL_DIR`.

To view the directory where uv installs Python executables instead, use the `--bin` flag. The Python executable directory may be overridden with `$UV_PYTHON_BIN_DIR`.

## Options / Props

| Name | Value | Description |
| --- | --- | --- |
| `--bin` | flag | Show the directory into which `uv python` will install Python executables. Determined according to the XDG standard from, in order of preference: `$UV_PYTHON_BIN_DIR`, `$XDG_BIN_HOME`, `$XDG_DATA_HOME/../bin`, `$HOME/.local/bin`. |

## Notes

- Global options (`--allow-insecure-host`, `--cache-dir`, `--color`, `--config-file`, `--directory`, `--help`, `--managed-python`, `--no-managed-python`, `--no-cache`, `--no-config`, `--no-progress`, `--no-python-downloads`, `--offline`, `--project`, `--quiet`, `--system-certs`, `--verbose`) are listed in the project-commands uv.md page.

## Related

- [uv python install](./uv-python-install.md)
- [uv python update-shell](./uv-python-update-shell.md)
