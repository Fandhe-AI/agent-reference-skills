---
source: https://docs.astral.sh/uv/reference/storage/
---

# Storage

uv uses high-level directories for storage. For each location, uv checks the listed environment variables in order and uses the first path found. Paths are platform-specific: uv follows XDG conventions on Linux and macOS and the Known Folder scheme on Windows.

## Signature / Usage

```console
$ uv cache dir
$ uv python dir
$ uv python dir --bin
$ uv tool dir
$ uv tool dir --bin
```

## Storage directories

| Directory | Purpose | Unix (in order) | Windows (in order) |
| --- | --- | --- | --- |
| Temporary | ephemeral data | `$TMPDIR`, `/tmp` | `%TMP%`, `%TEMP%`, `%USERPROFILE%` |
| Cache | disposable but useful to be long-lived | `$XDG_CACHE_HOME/uv`, `$HOME/.cache/uv` | `%LOCALAPPDATA%\uv\cache`, `uv\cache` within `FOLDERID_LocalAppData` |
| Persistent data | non-disposable data | `$XDG_DATA_HOME/uv`, `$HOME/.local/share/uv`, `$CWD/.uv` | `%APPDATA%\uv\data`, `.\.uv` |
| User-level configuration | changes to uv's settings | `$XDG_CONFIG_HOME/uv`, `$HOME/.config/uv` | `%APPDATA%\uv`, `uv` within `FOLDERID_RoamingAppData` |
| System-level configuration | changes to uv's settings | `$XDG_CONFIG_DIRS/uv`, `/etc/uv` | `%PROGRAMDATA%\uv`, `uv` within `FOLDERID_AppDataProgramData` |
| Executable | files run by the user (should be on `PATH`) | `$XDG_BIN_HOME`, `$XDG_DATA_HOME/../bin`, `$HOME/.local/bin` | `%XDG_BIN_HOME%`, `%XDG_DATA_HOME%\..\bin`, `%USERPROFILE%\.local\bin` |

## Types of data

| Data | Default location | Show / override |
| --- | --- | --- |
| Dependency cache | cache directory (temporary directory when the cache is disabled) | `uv cache dir`; `--cache-dir`, `UV_CACHE_DIR`, `cache-dir` setting |
| Python versions | `python/` under the persistent data directory, e.g., `~/.local/share/uv/python` | `uv python dir`; `UV_PYTHON_INSTALL_DIR` |
| Python executables (e.g., `python3.13`) | executable directory | `uv python dir --bin`; `UV_PYTHON_BIN_DIR` |
| Tools | `tools/` under the persistent data directory, e.g., `~/.local/share/uv/tools` | `uv tool dir`; `UV_TOOL_DIR` |
| Tool executables (e.g., `ruff`) | executable directory | `uv tool dir --bin`; `UV_TOOL_BIN_DIR` |
| The uv executable (`uv`, `uvx`, via the standalone installer) | executable directory | `UV_INSTALL_DIR` |
| Configuration files (TOML) | configuration directories | see configuration files |
| Project virtual environments | `.venv` in the project or workspace root, next to `pyproject.toml` | `UV_PROJECT_ENVIRONMENT` |
| Script virtual environments (scripts with inline metadata) | cache directory | |

## Notes

- For optimal performance, the cache directory needs to be on the same filesystem as virtual environments.
- Changing where Python is installed is not automatically reflected in existing virtual environments; they keep referring to the old location and need to be updated manually (e.g., by re-creating them).
- With the `centralized-project-envs` preview feature, uv stores default project environments in the cache directory. They can be removed by `uv cache clean` or `uv cache prune` and are recreated when next needed.

## Related

- [Configuration files](./configuration-files.md)
- [Caching](./cache.md)
- [Preview features](./preview-features.md)
- [uv cache](./uv-cache.md)
