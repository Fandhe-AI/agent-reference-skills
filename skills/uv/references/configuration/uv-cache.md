---
source: https://docs.astral.sh/uv/reference/cli/#uv-cache
---

# uv cache

Manage uv's cache.

## Signature / Usage

```
uv cache [OPTIONS] <COMMAND>
```

| Command | Description |
| --- | --- |
| `uv cache clean [OPTIONS] [PACKAGE]...` | Clear the cache, removing all entries or those linked to specific packages |
| `uv cache prune [OPTIONS]` | Prune dangling cache entries and cached environments |
| `uv cache dir [OPTIONS]` | Show the cache directory |
| `uv cache size [OPTIONS]` | Show the cache size |

## Options / Props

`uv cache clean` arguments and options:

| Name | Value | Description |
| --- | --- | --- |
| `PACKAGE` | string... | The packages to remove from the cache |
| `--force` | flag | Force removal of the cache, ignoring in-use checks. By default, `uv cache clean` blocks until no process is reading the cache. With `--force` it proceeds without taking a lock. |

`uv cache prune` options:

| Name | Value | Description |
| --- | --- | --- |
| `--ci` | flag | Optimize the cache for persistence in a continuous integration environment, like GitHub Actions. In `--ci` mode, uv prunes any pre-built wheels from the cache, but retains any wheels that were built from source. |
| `--force` | flag | Force removal of the cache, ignoring in-use checks. By default, `uv cache prune` blocks until no process is reading the cache. |

`uv cache dir`: shows the cache directory. By default the cache is stored in `$XDG_CACHE_HOME/uv` or `$HOME/.cache/uv` on Unix and `%LOCALAPPDATA%\uv\cache` on Windows. When `--no-cache` is used, the cache is stored in a temporary directory and discarded when the process exits. An alternative directory may be specified via the `cache-dir` setting, the `--cache-dir` option, or `$UV_CACHE_DIR`. It is important for performance for the cache directory to be on the same file system as the Python environment uv is operating on.

`uv cache size` options:

| Name | Value | Description |
| --- | --- | --- |
| `--human`, `--human-readable`, `-H` | flag | Display the cache size in human-readable format (e.g., `1.2GiB` instead of raw bytes) |
| `--output-format` | `auto` \| `human` \| `machine` | Select the output format. Default `auto`: human-readable size in terminals, raw bytes otherwise. `human`: human-readable. `machine`: raw bytes. |

`uv cache size` displays the total size of the cache directory, including all downloaded and built wheels, source distributions, and other cached data.

## Notes

- Global options (`--allow-insecure-host`, `--cache-dir`, `--color`, `--config-file`, `--directory`, `--help`, `--managed-python`, `--no-managed-python`, `--no-cache`, `--no-config`, `--no-progress`, `--no-python-downloads`, `--offline`, `--project`, `--quiet`, `--system-certs`, `--verbose`) are listed in the project-commands uv.md page.
- `uv cache size` is a preview feature (`cache-size`); enabling the feature silences the preview warning. See the preview features page.
- `uv cache clean` removes cached data and is destructive for the cache only: the next command re-downloads or rebuilds what it needs.
- This page covers uv's package cache only; it is unrelated to the application caches of upstash, turborepo, tanstack-query, or drizzle.

## Related

- [Caching](./cache.md)
- [Storage](./storage.md)
- [Preview features](./preview-features.md)
