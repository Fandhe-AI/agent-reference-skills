---
source: https://docs.astral.sh/uv/concepts/projects/dependencies/
---

# Managing dependencies

Project dependencies live in `project.dependencies`, `project.optional-dependencies`, `dependency-groups` and `tool.uv.sources`; manage them with `uv add` / `uv remove`.

## Signature / Usage

```console
$ uv add httpx
$ uv add "httpx>=0.20"
$ uv remove httpx
$ uv add -r requirements.txt
```

```toml
[project]
name = "example"
version = "0.1.0"
dependencies = ["httpx>=0.27.2"]
```

## Dependency fields

| Field | Purpose |
|-------|---------|
| `project.dependencies` | Published dependencies |
| `project.optional-dependencies` | Published optional dependencies, or "extras" |
| `dependency-groups` | Local dependencies for development |
| `tool.uv.sources` | Alternative sources for dependencies during development |

## Adding, removing, changing

- `uv add` adds an entry to `project.dependencies` with a constraint (e.g., `>=0.27.2`) for the most recent, compatible version. `--dev`, `--group`, or `--optional` add to an alternative field. The kind of bound can be adjusted with `--bounds` (setting `add-bounds`), or the constraint can be provided directly.
- Adding a dependency from a non-registry source adds an entry in `tool.uv.sources`, e.g. `uv add "httpx @ git+https://github.com/encode/httpx"` produces `httpx = { git = "https://github.com/encode/httpx" }`.
- If a dependency cannot be used, uv displays an error (`No solution found when resolving dependencies`).
- `uv add -r requirements.txt` imports dependencies from a requirements file.
- `uv remove httpx` removes a dependency; `--dev`, `--group`, `--optional` target a specific table. If a source is defined for the removed dependency and there are no other references, it is also removed.
- Changing: `uv add "httpx>0.1.0"`. The locked version only changes if necessary to satisfy new constraints; to force the latest within the constraints use `--upgrade-package <name>`. Requesting a different source updates `tool.uv.sources`, e.g. `uv add "httpx @ ../httpx"`.

## Platform-specific dependencies

Use environment markers (PEP 508):

```console
$ uv add "jax; sys_platform == 'linux'"
$ uv add "numpy; python_version >= '3.11'"
```

```toml
dependencies = ["jax; sys_platform == 'linux'"]
```

Dependency sources can also be changed per-platform (see dependency-sources.md).

## Project dependencies

`project.dependencies` represents the dependencies used when uploading to PyPI or building a wheel; entries use dependency specifiers syntax and the table follows PEP 621.

```toml
[project]
name = "albatross"
version = "0.1.0"
dependencies = [
  # Any version in this range
  "tqdm >=4.66.2,<5",
  # Exactly this version of torch
  "torch ==2.2.2",
  # Install transformers with the torch extra
  "transformers[torch] >=4.39.3,<5",
  # Only install this package on older python versions
  # See "Environment Markers" for more information
  "importlib_metadata >=7.1.0,<8; python_version < '3.10'",
  "mollymawk ==0.1.0"
]
```

## Dependency specifiers

uv uses standard dependency specifiers (PEP 508), composed in order of: the dependency name, the extras (optional), the version specifier, an environment marker (optional).

- Version specifiers are comma separated and added together: `foo >=1.2.3,<2,!=1.4.0`.
- Specifiers are padded with trailing zeros if required, so `foo ==2` matches foo 2.0.0.
- `foo ==2.1.*` accepts any release from the 2.1 series. `foo ~=1.2` equals `foo >=1.2,<2`; `foo ~=1.2.3` equals `foo >=1.2.3,<1.3`.
- Extras are comma-separated in square brackets: `pandas[excel,plot] ==2.2`. Whitespace between extra names is ignored.
- Markers: `importlib-metadata >=7.1.0,<8; python_version < '3.10'`, `colorama >=0.4.6,<5; platform_system == "Windows"`. Markers are combined with `and`, `or`, and parentheses: `aiohttp >=3.7.4,<4; (sys_platform != 'win32' or implementation_name != 'pypy') and python_version >= '3.10'`. Versions within markers must be quoted, versions outside of markers must not be quoted.

## Notes

- `project.dependencies` and `project.optional-dependencies` can be used even if the project isn't going to be published. `dependency-groups` are a recently standardized feature and may not be supported by all tools yet.
- Dependency metadata can also be updated by editing the `pyproject.toml` directly.

## Related

- [Dependency sources](./dependency-sources.md)
- [Optional dependencies](./optional-dependencies.md)
- [Development dependencies and dependency groups](./dependency-groups.md)
- [Build, editable and virtual dependencies](./build-editable-virtual-dependencies.md)
- [Locking and syncing](./lock-sync.md)
