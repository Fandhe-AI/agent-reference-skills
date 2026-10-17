---
source: https://docs.astral.sh/uv/concepts/projects/dependencies/#build-dependencies
---

# Build, editable and virtual dependencies

Build dependencies (`build-system.requires`), editable installs, and virtual (non-packaged) dependencies.

## Signature / Usage

```toml
[project]
name = "pandas"
version = "0.1.0"

[build-system]
requires = ["setuptools>=42"]
build-backend = "setuptools.build_meta"
```

```console
$ uv add --editable ./path/foo
$ uv add --no-editable ./path/foo
```

## Build dependencies

- A project structured as a Python package may declare dependencies required to build but not run it, in `build-system.requires` (PEP 518).
- By default uv respects `tool.uv.sources` when resolving build dependencies, e.g. a local `setuptools`:

```toml
[tool.uv.sources]
setuptools = { path = "./packages/setuptools" }
```

- When publishing, run `uv build --no-sources` to ensure the package builds correctly when `tool.uv.sources` is disabled, as with other build tools like `pypa/build`.

## Editable dependencies

A regular installation of a directory first builds a wheel and installs it, copying all source files; edits leave the environment outdated. Editable installations add a link to the project within the virtual environment (a `.pth` file), so the interpreter includes the source files directly.

- Limitations: the build backend needs to support editables, and native modules aren't recompiled before import.
- uv uses editable installation for workspace packages by default.
- Add with `--editable`; opt out in a workspace with `--no-editable`.

## Virtual dependencies

A "virtual" dependency is not installed as a package, but its dependencies are. By default, dependencies are never virtual.

- A `path` source can be virtual if it explicitly sets `tool.uv.package = false`. Without this, uv treats the path dependency as a normal package and attempts to build it, even if it does not declare a build system.
- Set `package = false` on the source; if a dependency sets `tool.uv.package = false`, override with `package = true` on the source.

```toml
[project]
dependencies = ["bar"]

[tool.uv.sources]
bar = { path = "../projects/bar", package = false }
```

- A `workspace` source can likewise be virtual with `tool.uv.package = false`; otherwise the member is built even without a build system.
- Workspace members that are _not_ dependencies can be virtual by default. With parent `members = ["child"]` and a `child` without a build system and `dependencies = ["anyio"]`, `child` is not installed but its transitive dependency `anyio` is. If the parent declares `child = { workspace = true }` as a dependency, `child` is built and installed:

```toml
[project]
name = "parent"
version = "1.0.0"
dependencies = ["child"]

[tool.uv.sources]
child = { workspace = true }

[tool.uv.workspace]
members = ["child"]
```

## Related

- [Dependency sources](./dependency-sources.md)
- [Configuring projects](./config.md)
- [Building distributions](./build.md)
- [Using workspaces](./workspaces.md)
