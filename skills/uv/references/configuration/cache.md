---
source: https://docs.astral.sh/uv/concepts/cache/
---

# Caching

uv uses aggressive caching to avoid re-downloading (and re-building) dependencies that have already been accessed in prior runs.

## Signature / Usage

```toml title="pyproject.toml"
[tool.uv]
cache-keys = [{ file = "pyproject.toml" }, { git = { commit = true } }]
```

```console
$ uv cache clean
$ uv cache clean ruff
$ uv cache prune
$ uv cache prune --ci
```

## Dependency caching

- **Registry dependencies** (e.g., PyPI): uv respects HTTP caching headers.
- **Direct URL dependencies**: HTTP caching headers, and also caches based on the URL itself.
- **Git dependencies**: cached based on the fully-resolved Git commit hash. `uv pip compile` pins Git dependencies to a specific commit hash when writing the resolved dependency set.
- **Local dependencies**: cached based on the last-modified time of the source archive (the local `.whl` or `.tar.gz`). For directories, based on the last-modified time of `pyproject.toml`, `setup.py`, or `setup.cfg`.
- **Flat indexes** (`--find-links` locations): contents are assumed immutable, each file cached by name. Replacing a file with new contents under the same name is not picked up until the cache is refreshed.

Escape hatches:

| Goal | Command |
| --- | --- |
| Clear the cache entirely | `uv cache clean` |
| Clear one package | `uv cache clean <package-name>` (e.g., `uv cache clean ruff`) |
| Revalidate cached data for all dependencies | `--refresh` (e.g., `uv sync --refresh`, `uv pip install --refresh ...`) |
| Revalidate for a specific dependency | `--refresh-package` (e.g., `uv sync --refresh-package ruff`) |
| Ignore existing installed versions | `--reinstall` (consider `uv cache clean <package-name>` first) |

Local directory dependencies passed explicitly on the command line (e.g., `uv pip install .`) are always rebuilt and reinstalled.

## Dynamic metadata

By default, uv only rebuilds and reinstalls local directory dependencies (e.g., editables) if `pyproject.toml`, `setup.py`, or `setup.cfg` in the directory root has changed, or if a `src` directory is added or removed. Add entries under `tool.uv.cache-keys` to incorporate additional information into the cache key; this replaces the defaults, so include `pyproject.toml` explicitly.

```toml title="pyproject.toml"
[tool.uv]
cache-keys = [{ file = "pyproject.toml" }, { git = { commit = true, tags = true } }]
```

```toml title="pyproject.toml"
[tool.uv]
cache-keys = [{ file = "pyproject.toml" }, { file = "requirements.txt" }]
```

```toml title="pyproject.toml"
[tool.uv]
cache-keys = [{ file = "**/*.toml" }]
```

```toml title="pyproject.toml"
[tool.uv]
cache-keys = [{ file = "pyproject.toml" }, { env = "MY_ENV_VAR" }]
```

```toml title="pyproject.toml"
[tool.uv]
cache-keys = [{ file = "pyproject.toml" }, { dir = "src" }]
```

Escape hatch for `dynamic` metadata not covered by `cache-keys`: always rebuild and reinstall.

```toml title="pyproject.toml"
[tool.uv]
reinstall-package = ["my-package"]
```

## Cache safety

It is safe to run multiple uv commands concurrently, even against the same virtual environment. The cache supports multiple concurrent readers and writers; uv applies a file-based lock to the target virtual environment when installing. Interrupted or overlapping HTTP cache refreshes can invalidate individual entries; uv detects incomplete policy updates and downloads the response again. With `--offline`, an affected entry is unavailable until it can be refreshed online.

## Clearing the cache

- `uv cache clean` removes all cache entries; the directory and its lock file remain so other uv processes can safely share the cache.
- `uv cache clean ruff` removes all entries for the `ruff` package.
- `uv cache prune` removes all unused cache entries and all centralized project environments (recreated as needed). Safe to run periodically.

By default, cache cleanup estimates the disk space reclaimed. Enable the `cache-physical-space` preview feature for a more accurate estimate that accounts for hardlinks and copy-on-write clones:

```console
$ uv cache clean --preview-features cache-physical-space
```

uv blocks cache-modifying operations while other uv commands are running. `uv cache` commands wait 5 min by default for other uv processes to terminate; change with `UV_LOCK_TIMEOUT`. `--force` ignores the lock when no other uv process is using the cache.

## Caching in continuous integration

By default, uv caches both wheels built from source and pre-built wheels downloaded directly. In CI it is often faster to omit pre-built wheels (re-download each run) while keeping wheels built from source. `uv cache prune --ci` removes all pre-built wheels and unzipped source distributions but retains wheels built from source. Run it at the end of a CI job.

## Cache directory

uv determines the cache directory according to, in order:

1. A temporary cache directory, if `--no-cache` was requested.
2. The directory specified via `--cache-dir`, `UV_CACHE_DIR`, or `tool.uv.cache-dir`.
3. A system-appropriate directory, e.g., `$XDG_CACHE_HOME/uv` or `$HOME/.cache/uv` on Unix and `%LOCALAPPDATA%\uv\cache` on Windows.

## Cache versioning

The cache is composed of buckets (wheels, source distributions, Git repositories, ...), each versioned. If a release has a breaking change to the cache format, uv does not read from or write to an incompatible bucket. For example, uv 0.4.13 changed the core metadata bucket from v12 to v13. Multiple versions of uv can safely share a cache directory, though releases with differing cache versions may not share the same underlying entries.

## Notes

- uv always requires a cache directory. With `--no-cache`, uv still uses a temporary cache for sharing data within that single invocation. In most cases `--refresh` should be used instead of `--no-cache`: it updates the cache for subsequent operations but does not read from it.
- Globs in `file` cache keys can be expensive, as uv may need to walk the filesystem. The `dir` key only tracks changes to the directory itself, not arbitrary changes within it.
- It is never safe to modify the cache directly (e.g., by removing a file or directory).
- The cache directory should be on the same file system as the Python environment; otherwise uv falls back to slow copy operations instead of linking.
- Distinct from application-level or build-system caches: this page covers uv's package cache only (see also upstash, turborepo, tanstack-query, drizzle for unrelated cache concepts).

## Related

- [Storage](./storage.md)
- [uv cache](./uv-cache.md)
- [Settings: build and install](./settings-build-install.md)
- [Preview features](./preview-features.md)
