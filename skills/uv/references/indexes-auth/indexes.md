---
source: https://docs.astral.sh/uv/concepts/indexes/
---

# Package indexes

By default, uv uses the Python Package Index (PyPI) for dependency resolution and package installation. uv can be configured to use other package indexes, including private indexes, via the `[[tool.uv.index]]` configuration option (and `--index`, the analogous command-line option).

## Signature / Usage

```toml
[[tool.uv.index]]
# Optional name for the index.
name = "pytorch"
# Required URL for the index.
url = "https://download.pytorch.org/whl/cpu"
```

```shell
# On the command line.
$ uv lock --index pytorch=https://download.pytorch.org/whl/cpu
# Via an environment variable.
$ UV_INDEX=pytorch=https://download.pytorch.org/whl/cpu uv lock
```

## Defining an index

- Indexes are prioritized in the order in which they are defined: the first index listed in the configuration file is the first consulted. Indexes provided via the command line take precedence over those in the configuration file.
- By default, uv includes PyPI as the "default" index, i.e., the index used when a package is not found on any other index. To exclude PyPI, set `default = true` on another index entry (or use the `--default-index` command-line option):

```toml
[[tool.uv.index]]
name = "pytorch"
url = "https://download.pytorch.org/whl/cpu"
default = true
```

- The default index is always treated as lowest priority, regardless of its position in the list of indexes.
- Index names may only contain alphanumeric characters, dashes, underscores, and periods, and must be valid ASCII.
- When providing an index on the command line (`--index` or `--default-index`) or through an environment variable (`UV_INDEX` or `UV_DEFAULT_INDEX`), use its URL, a configured name, or the `<name>=<url>` syntax.
- With `--preview-features index-by-name`, configured index names take precedence over matching paths.

## Pinning a package to an index

A package can be pinned to a specific index by specifying the index in its `tool.uv.sources` entry. To ensure that `torch` is always installed from the `pytorch` index:

```toml
[tool.uv.sources]
torch = { index = "pytorch" }

[[tool.uv.index]]
name = "pytorch"
url = "https://download.pytorch.org/whl/cpu"
```

To pull from a different index based on the platform, provide a list of sources disambiguated by environment markers:

```toml
[project]
dependencies = ["torch"]

[tool.uv.sources]
torch = [
  { index = "pytorch-cpu", marker = "sys_platform == 'darwin'"},
  { index = "pytorch-cu130", marker = "sys_platform != 'darwin'"},
]

[[tool.uv.index]]
name = "pytorch-cpu"
url = "https://download.pytorch.org/whl/cpu"

[[tool.uv.index]]
name = "pytorch-cu130"
url = "https://download.pytorch.org/whl/cu130"
```

An index can be marked as `explicit = true` to prevent packages from being installed from that index unless explicitly pinned to it:

```toml
[tool.uv.sources]
torch = { index = "pytorch" }

[[tool.uv.index]]
name = "pytorch"
url = "https://download.pytorch.org/whl/cpu"
explicit = true
```

## Searching across multiple indexes

By default, uv stops at the first index on which a given package is available, and limits resolutions to those present on that first index (`first-index`). If a package exists on an internal index specified via `[[tool.uv.index]]`, it is always installed from that internal index, never from PyPI. The intent is to prevent "dependency confusion" attacks.

Use the `--index-strategy` command-line option, or the `UV_INDEX_STRATEGY` environment variable, to opt in to alternate behaviors:

| Value | Description |
|-------|-------------|
| `first-index` (default) | Search for each package across all indexes, limiting the candidate versions to those present in the first index that contains the package. |
| `unsafe-first-match` | Search for each package across all indexes, but prefer the first index with a compatible version, even if newer versions are available on other indexes. |
| `unsafe-best-match` | Search for each package across all indexes, and select the best version from the combined set of candidate versions. |

## Notes

- Named indexes referenced via `tool.uv.sources` must be defined within the project's `pyproject.toml`; indexes provided via the command line, environment variables, or user-level configuration are not recognized.
- If an index is marked as both `default = true` and `explicit = true`, it is treated as an explicit index (only usable via `tool.uv.sources`) while also removing PyPI as the default index.
- `unsafe-best-match` is the closest to pip's behavior, but exposes users to the risk of "dependency confusion" attacks.

## Related

- [Index authentication](./index-authentication.md)
- [Flat indexes and --index-url](./flat-indexes.md)
- [Authentication](./authentication.md)
