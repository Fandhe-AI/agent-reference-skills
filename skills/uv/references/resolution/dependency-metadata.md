---
source: https://docs.astral.sh/uv/concepts/resolution/#dependency-metadata
---

# Dependency metadata

`tool.uv.dependency-metadata` supplies static package metadata upfront so uv can skip building a package to discover its dependencies.

## Signature / Usage

```toml
[[tool.uv.dependency-metadata]]
name = "chumpy"
version = "0.70"
requires-dist = ["numpy>=1.8.1", "scipy>=0.13.0", "six>=1.11.0"]
```

## Dependency metadata

During resolution, uv needs to resolve the metadata for each package it encounters, in order to determine its dependencies. This metadata is often available as a static file in the package index; however, for packages that only provide source distributions, the metadata may not be available upfront.

In such cases, uv has to build the package to determine its metadata (e.g., by invoking `setup.py`). This can introduce a performance penalty during resolution. Further, it imposes the requirement that the package can be built on all platforms, which may not be true.

For example, you may have a package that should only be built and installed on Linux, but doesn't build successfully on macOS or Windows. While uv can construct a perfectly valid lockfile for this scenario, doing so would require building the package, which would fail on non-Linux platforms.

The `tool.uv.dependency-metadata` table can be used to provide static metadata for such dependencies upfront, thereby allowing uv to skip the build step and use the provided metadata instead.

These declarations are intended for cases in which a package does _not_ declare static metadata upfront, though they are also useful for packages that require disabling build isolation. In such cases, it may be easier to declare the package metadata upfront, rather than creating a custom build environment prior to resolving the package.

For example, past versions of `flash-attn` did not declare static metadata. By declaring metadata for `flash-attn` upfront, uv can resolve `flash-attn` without building the package from source (which itself requires installing `torch`):

```toml
[project]
name = "project"
version = "0.1.0"
requires-python = ">=3.12"
dependencies = ["flash-attn"]

[tool.uv.sources]
flash-attn = { git = "https://github.com/Dao-AILab/flash-attention", tag = "v2.6.3" }

[[tool.uv.dependency-metadata]]
name = "flash-attn"
version = "2.6.3"
requires-dist = ["torch", "einops"]
```

Like dependency overrides, `tool.uv.dependency-metadata` can also be used for cases in which a package's metadata is incorrect or incomplete, or when a package is not available in the package index. While dependency overrides allow overriding the allowed versions of a package globally, metadata overrides allow overriding the declared metadata of a _specific package_.

## Options / Props

| Name | Description |
| --- | --- |
| `name` | Package name |
| `version` | Optional for registry-based dependencies (when omitted, the metadata applies to all versions of the package); required for direct URL dependencies (like Git dependencies) |
| `requires-dist` | Dependencies of the package |
| `requires-python` | Python requirement of the package |
| `provides-extra` | Extras provided by the package |

## Notes

- Entries follow the Metadata 2.3 specification, though only `name`, `version`, `requires-dist`, `requires-python`, and `provides-extra` are read by uv.

## Related

- [constraints-overrides-exclusions.md](./constraints-overrides-exclusions.md)
- [resolver-internals.md](./resolver-internals.md)
