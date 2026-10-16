---
source: https://docs.astral.sh/uv/reference/settings/#configuration
---

# Settings: build and install

Caching, build, and installation settings from the Configuration section of the settings reference. They apply in `[tool.uv]` of `pyproject.toml` or at the top level of `uv.toml`.

## Signature / Usage

```toml
# uv.toml
cache-dir = "./.uv_cache"
```

```toml
# pyproject.toml
[tool.uv]
cache-keys = [{ file = "pyproject.toml" }, { file = "requirements.txt" }, { git = { commit = true } }]
link-mode = "copy"
no-build-package = ["ruff"]
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `cache-dir` | `str` | `None` | Path to the cache directory. Defaults to `$XDG_CACHE_HOME/uv` or `$HOME/.cache/uv` on Linux and macOS, and `%LOCALAPPDATA%\uv\cache` on Windows. |
| `cache-keys` | `list[dict]` | `[{ file = "pyproject.toml" }, { file = "setup.py" }, { file = "setup.cfg" }]` | Keys to consider when caching builds for the project: files, directories (`dir`), Git info (`git = { commit = true, tags = true }`), or environment variables (`env`). Defaults also rebuild when a `src` directory is added or removed. Globs follow the `glob` crate syntax and can be expensive. Only affect the project defined by the `pyproject.toml` in which they are specified; paths are relative to the project directory. |
| `compile-bytecode` | `bool` | `false` | Compile Python files to bytecode after installation. By default compilation is lazy at first import. When enabled, uv processes the entire site-packages directory (including packages not modified by the current operation) and ignores errors, like pip. |
| `concurrent-builds` | `int` | `None` | Maximum number of source distributions built concurrently. Defaults to the number of available CPU cores. |
| `concurrent-installs` | `int` | `None` | Number of threads used when installing and unzipping packages. Defaults to the number of available CPU cores. |
| `config-settings` | `dict` | `{}` | Settings to pass to the PEP 517 build backend, as `KEY=VALUE` pairs. |
| `config-settings-package` | `dict` | `{}` | Per-package PEP 517 build backend settings (map from package name to key-value pairs). |
| `extra-build-dependencies` | `dict` | `[]` | Additional build dependencies for packages; extends the PEP 517 build environment for the project's dependencies (e.g., for packages that assume `pip` is present without declaring it). |
| `extra-build-variables` | `dict[str, dict[str, str]]` | `{}` | Extra environment variables to set when building certain packages. |
| `link-mode` | `"clone" \| "copy" \| "hardlink" \| "symlink"` | `"clone"` (macOS, Linux) or `"hardlink"` (Windows) | Method to use when installing packages from the global cache. WARNING: symlink mode is discouraged; `uv cache clean` would break all installed packages by removing the underlying source files. |
| `no-binary` | `bool` | `false` | Do not install pre-built wheels; build and install from source. The resolver still uses pre-built wheels to extract metadata. |
| `no-binary-package` | `list[str]` | `[]` | Do not install pre-built wheels for specific packages. |
| `no-build` | `bool` | `false` | Do not build source distributions. Cached wheels from previously built sdists are reused; operations that require a build exit with an error. First-party packages (workspace projects) and editable requirements are still built, and their backends may run arbitrary Python code. |
| `no-build-isolation` | `bool` | `false` | Disable isolation when building source distributions; assumes PEP 518 build dependencies are already installed. |
| `no-build-isolation-package` | `list[str]` | `[]` | Disable build isolation for specific packages. |
| `no-build-package` | `list[str]` | `[]` | Do not build source distributions for specific packages. First-party packages are still built. |
| `no-cache` | `bool` | `false` | Avoid reading from or writing to the cache, using a temporary directory for the duration of the operation. |
| `reinstall` | `bool` | `false` | Reinstall all packages regardless of whether they are already installed. Implies `refresh`. |
| `reinstall-package` | `list[str]` | `[]` | Reinstall a specific package. Implies `refresh-package`. |
| `require-build-hashes` | `bool` | `false` | Require hashes for all build dependencies. uv checks hashes provided in `build-constraint-dependencies`; enabling requires a hash for every build dependency including transitive ones. Hashes can be URL fragments in `build-system.requires`. Hashes returned by a build backend do not count. Not required for the bundled `uv_build` backend. When build isolation is disabled, hashes are not checked; already-installed packages and previously built wheels are not checked. Also applies to `uv pip` (overridable in `[tool.uv.pip]`). |

Examples from the reference:

```toml
[tool.uv]
compile-bytecode = true
concurrent-builds = 4
concurrent-installs = 4
config-settings = { editable_mode = "compat" }
config-settings-package = { numpy = { editable_mode = "compat" } }
extra-build-dependencies = { pytest = ["setuptools"] }
extra-build-variables = { flash-attn = { FLASH_ATTENTION_SKIP_CUDA_BUILD = "TRUE" } }
no-binary = true
no-binary-package = ["ruff"]
no-build = true
no-build-isolation = true
no-build-isolation-package = ["package1", "package2"]
no-cache = true
reinstall = true
reinstall-package = ["ruff"]
require-build-hashes = true
```

## Notes

- `require-build-hashes` has the environment variable `UV_REQUIRE_BUILD_HASHES` (added in 0.13.0); the `build-dependency-hashes` preview feature documents the related `--require-build-hashes` option.
- `cache-dir` and `cache-keys` configure uv's package cache only; see the caching page. Unrelated to application caches in upstash, turborepo, tanstack-query, or drizzle.

## Related

- [Caching](./cache.md)
- [Storage](./storage.md)
- [Settings: resolver](./settings-resolver.md)
- [Settings: pip (a-l)](./settings-pip-a-l.md)
