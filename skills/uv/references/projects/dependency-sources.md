---
source: https://docs.astral.sh/uv/concepts/projects/dependencies/#dependency-sources
---

# Dependency sources

The `tool.uv.sources` table extends the standard dependency tables with alternative sources used during development (editable installs, relative paths, Git, URL, index, workspace).

## Signature / Usage

```toml
[project]
name = "example"
version = "0.1.0"
dependencies = ["foo"]

[tool.uv.sources]
foo = { path = "./packages/foo" }
```

## Supported sources

| Source | Description |
|--------|-------------|
| Index | A package resolved from a specific package index |
| Git | A Git repository |
| URL | A remote wheel or source distribution |
| Path | A local wheel, source distribution, or project directory |
| Workspace | A member of the current workspace |

## Index

```console
$ uv add torch --index pytorch=https://download.pytorch.org/whl/cpu
```

```toml
[project]
dependencies = ["torch"]

[tool.uv.sources]
torch = { index = "pytorch" }

[[tool.uv.index]]
name = "pytorch"
url = "https://download.pytorch.org/whl/cpu"
```

- If the index is already configured, select it by name (preview): `uv add --preview-features index-by-name torch --index pytorch`.
- An `index` source _pins_ a package to the given index; it will not be downloaded from other indexes.
- An `explicit = true` flag on the index means it is _only_ used for packages that explicitly specify it in `tool.uv.sources`. If `explicit` is not set, other packages may be resolved from the index, if not found elsewhere.

## Git

Prefix a Git-compatible URL with `git+`:

```console
$ uv add git+https://github.com/encode/httpx
$ uv add git+ssh://git@github.com/encode/httpx
$ uv add git+https://github.com/encode/httpx --tag 0.27.0
$ uv add git+https://github.com/encode/httpx --branch main
$ uv add git+https://github.com/encode/httpx --rev 326b9431c761e1ef1e00b9f760d1f654c8db48c6
$ uv add git+https://github.com/langchain-ai/langchain#subdirectory=libs/langchain
$ uv add --lfs git+https://github.com/astral-sh/lfs-cowsay
```

```toml
[tool.uv.sources]
httpx = { git = "https://github.com/encode/httpx", tag = "0.27.0" }
langchain = { git = "https://github.com/langchain-ai/langchain", subdirectory = "libs/langchain" }
lfs-cowsay = { git = "https://github.com/astral-sh/lfs-cowsay", lfs = true }
```

- Git LFS is configurable per source; by default LFS objects are not fetched. `lfs = true` always fetches; `lfs = false` never fetches; when omitted, the `UV_GIT_LFS` environment variable applies to all Git sources without an explicit `lfs`. Ensure Git LFS is installed and configured, otherwise a build failure can occur.

## URL

Provide a `https://` URL to a wheel (`.whl`) or a source distribution (typically `.tar.gz` or `.zip`):

```toml
[tool.uv.sources]
httpx = { url = "https://files.pythonhosted.org/packages/5c/2d/3da5bdf4408b8b2800061c339f240c1802f2e82d55e50bd39c5a881f47f0/httpx-0.27.0.tar.gz" }
```

URL dependencies can also be added or edited manually with `{ url = <url> }`. A `subdirectory` may be specified if the source distribution isn't in the archive root.

## Path

Provide the path of a wheel, a source distribution, or a directory containing a `pyproject.toml`:

```console
$ uv add /example/foo-0.1.0-py3-none-any.whl
$ uv add ./foo-0.1.0-py3-none-any.whl
$ uv add ~/projects/bar/
$ uv add --editable ../projects/bar/
```

```toml
[tool.uv.sources]
foo = { path = "/example/foo-0.1.0-py3-none-any.whl" }
bar = { path = "../projects/bar", editable = true }
```

- When using a directory as a path dependency, uv attempts to build and install the target as a package by default (see virtual dependencies).
- An editable installation is not used for path dependencies by default; it may be requested for project directories.
- For multiple packages in the same repository, workspaces may be a better fit.

## Workspace member

Declare a dependency on a workspace member with `{ workspace = true }`. All workspace members must be explicitly stated. Workspace members are always editable. To source a dependency from a different workspace, `workspace` can also be a path string.

```toml
[project]
dependencies = ["foo==0.1.0"]

[tool.uv.sources]
foo = { workspace = true }

[tool.uv.workspace]
members = [
  "packages/foo"
]
```

```toml
[tool.uv.sources]
foo = { workspace = "../other-workspace" }
```

## Platform-specific sources

Limit a source to a platform or Python version with environment markers:

```toml
[project]
dependencies = ["httpx"]

[tool.uv.sources]
httpx = { git = "https://github.com/encode/httpx", tag = "0.27.2", marker = "sys_platform == 'darwin'" }
```

uv still includes `httpx` on all platforms, but downloads the source from GitHub on macOS and falls back to PyPI elsewhere.

## Multiple sources

A list of sources, disambiguated by PEP 508 environment markers:

```toml
[tool.uv.sources]
httpx = [
  { git = "https://github.com/encode/httpx", tag = "0.27.2", marker = "sys_platform == 'darwin'" },
  { git = "https://github.com/encode/httpx", tag = "0.24.1", marker = "sys_platform == 'linux'" },
]
```

Also works for indexes:

```toml
[project]
dependencies = ["torch"]

[tool.uv.sources]
torch = [
  { index = "torch-cpu", marker = "platform_system == 'Darwin'"},
  { index = "torch-gpu", marker = "platform_system == 'Linux'"},
]

[[tool.uv.index]]
name = "torch-cpu"
url = "https://download.pytorch.org/whl/cpu"
explicit = true

[[tool.uv.index]]
name = "torch-gpu"
url = "https://download.pytorch.org/whl/cu130"
explicit = true
```

## Disabling sources

```console
$ uv lock --no-sources
```

`--no-sources` ignores the `tool.uv.sources` table (e.g., to simulate resolving with the package's published metadata). It also prevents uv from discovering any workspace members that could satisfy a given dependency.

## Notes

- Sources are only respected by uv. If another tool is used, only the definitions in the standard project tables are used; any metadata in the source table must be re-specified in the other tool's format.
- The index example (`download.pytorch.org/whl/cpu`) only works on x86-64 Linux due to the specifics of the PyTorch index.

## Related

- [Managing dependencies](./dependencies.md)
- [Build, editable and virtual dependencies](./build-editable-virtual-dependencies.md)
- [Using workspaces](./workspaces.md)
