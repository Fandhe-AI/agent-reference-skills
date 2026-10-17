---
source: https://docs.astral.sh/uv/concepts/projects/workspaces/
---

# Using workspaces

A workspace is a collection of one or more packages (workspace members) managed together, sharing a single lockfile; defined by a `tool.uv.workspace` table.

## Signature / Usage

```toml
[project]
name = "albatross"
version = "0.1.0"
requires-python = ">=3.12"
dependencies = ["bird-feeder", "tqdm>=4,<5"]

[tool.uv.sources]
bird-feeder = { workspace = true }

[tool.uv.workspace]
members = ["packages/*"]
exclude = ["packages/seeds"]
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `members` | list of globs | Required; directories included as members |
| `exclude` | list of globs | Optional; directories excluded |
| `--package <name>` | CLI flag | Run `uv run` / `uv sync` in a particular member from any workspace directory |

## Notes

- Inspired by the Cargo concept of the same name. Distinct from Cargo workspaces / `Cargo.lock` (see the rust skill) and JS monorepo tooling (see the turborepo and syncpack skills): uv workspaces group Python packages around a single `uv.lock`.
- Workspaces organize large codebases into multiple packages with common dependencies, e.g., a FastAPI-based web application alongside libraries versioned and maintained as separate Python packages, all in one Git repository. Each package defines its own `pyproject.toml`; the workspace shares a single lockfile.
- `uv lock` operates on the entire workspace; `uv run` and `uv sync` operate on the workspace root by default, but accept `--package`.
- By default, `uv init` inside an existing package adds the newly created member to the workspace, creating a `tool.uv.workspace` table in the root if needed.
- Every directory included by `members` (and not excluded) must contain a `pyproject.toml`; members can be applications or libraries. Every workspace needs a root, which is also a member. In the example, `uv run` and `uv run --package albatross` are equivalent; `uv run --package bird-feeder` runs in `bird-feeder`.
- Workspace sources: `workspace = true` in `tool.uv.sources` means the dependency is provided by the workspace rather than PyPI. `workspace` can be a path string to resolve from a different workspace; the path is resolved relative to the project that declares the source (or the workspace root for a workspace-level source) and must point to the external workspace root; uv selects the member matching the dependency name. Dependencies between members are editable.
- `tool.uv.sources` in the workspace root apply to all members unless overridden in a member's own `tool.uv.sources`. If a member provides a source for a dependency, it ignores the root's source for it, even if the member's source is limited by a marker that doesn't match the current platform.
- Layout example (root `albatross` with `packages/bird-feeder` and excluded `packages/seeds`, a single `uv.lock` at the root):

```text
albatross
├── packages
│   ├── bird-feeder
│   │   ├── pyproject.toml
│   │   └── src
│   │       └── bird_feeder
│   │           ├── __init__.py
│   │           └── foo.py
│   └── seeds
│       ├── pyproject.toml
│       └── src
│           └── seeds
│               ├── __init__.py
│               └── bar.py
├── pyproject.toml
├── README.md
├── uv.lock
└── src
    └── albatross
        └── __init__.py
```

- When to use: interconnected packages in a single repository (e.g., a core library and CLI tested independently; a library with a performance-critical extension module; a plugin system). Not suited when members have conflicting requirements or need separate virtual environments; use path dependencies instead (with the downside that `uv run --package` is unavailable):

```toml
[tool.uv.sources]
bird-feeder = { path = "packages/bird-feeder" }
```

- A workspace enforces a single `requires-python`, the intersection of all members' values. To test a member on an unsupported Python version, use `uv pip` in a separate virtual environment.
- Python does not provide dependency isolation, so uv can't ensure a package uses only its declared dependencies; for workspaces, it can't ensure packages don't import dependencies declared by another member.

## Related

- [Dependency sources](./dependency-sources.md)
- [Workspace metadata](./workspace-metadata.md)
- [Structure and files](./layout.md)
- [Creating projects](./init.md)
