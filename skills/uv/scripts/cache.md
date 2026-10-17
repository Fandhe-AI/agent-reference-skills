---
source: https://docs.astral.sh/uv/concepts/cache/
---

# Cache

Commands to inspect, revalidate, and clean the uv cache. Do not modify the cache directly; always use the commands below (the official documentation describes deleting it directly as unsafe).

## Show the cache directory

```sh
uv cache dir
```

## Show the cache size

```sh
uv cache size
```

```sh
uv cache size --human
```

`uv cache size` is treated as a preview feature (`cache-size`); without enabling it, a preview warning is shown (`https://docs.astral.sh/uv/concepts/preview/`).

## Remove cache entries for one package

> **Warning**: This deletes the cache entries of the given package. Reuse will trigger a re-download or rebuild.

```sh
uv cache clean ruff
```

## Remove the entire cache

> **Warning**: This deletes every entry in the cache directory (the directory and lock file remain). Caches used by other projects are lost too, and the next run must re-download or rebuild.

```sh
uv cache clean
```

## Remove unused entries (prune)

> **Warning**: This deletes all unused cache entries and centrally managed project environments. Project environments are recreated when needed.

```sh
uv cache prune
```

The official documentation states it is safe to run periodically.

## Prune for CI

```sh
uv cache prune --ci
```

Removes pre-built wheels and unzipped source distributions while keeping wheels built from source. Running this at the end of a CI job is recommended.

## Ignore the lock

> **Warning**: Use only when you know no other uv process is reading or writing the cache. This ignores the in-use check and deletes anyway.

```sh
uv cache clean --force
```

```sh
uv cache prune --force
```

By default uv waits up to 5 minutes for other uv processes; change this with `UV_LOCK_TIMEOUT`.

## Get an accurate estimate of reclaimed space

```sh
uv cache clean --preview-features cache-physical-space
```

## Revalidate the cache

```sh
uv sync --refresh
```

```sh
uv pip install --refresh <PACKAGE>
```

```sh
uv sync --refresh-package ruff
```

```sh
uv pip install --refresh-package ruff <PACKAGE>
```

To update without reading the cache, `--refresh` is recommended over `--no-cache`.

## Ignore existing installations (reinstall)

```sh
uv sync --reinstall
```

```sh
uv pip install --reinstall <PACKAGE>
```

The official documentation also suggests running `uv cache clean <package-name>` first to drop the cached copy before reinstalling.

## Choose the cache directory

```sh
uv sync --cache-dir /path/to/cache
```

Set it with `--cache-dir`, `UV_CACHE_DIR`, or `tool.uv.cache-dir`. Placing the cache on the same filesystem as the Python environment is better for performance.
