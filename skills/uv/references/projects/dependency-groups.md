---
source: https://docs.astral.sh/uv/concepts/projects/dependencies/#development-dependencies
---

# Development dependencies and dependency groups

Development dependencies are local-only and declared in `[dependency-groups]` (PEP 735); they are not included in published project requirements.

## Signature / Usage

```console
$ uv add --dev pytest
$ uv add --group lint ruff
```

```toml
[dependency-groups]
dev = [
  "pytest"
]
lint = [
  "ruff"
]
```

## Options / Props

| Name | Description |
|------|-------------|
| `--dev` / `--only-dev` / `--no-dev` | Toggle inclusion or exclusion of the `dev` group; equivalent to `--group dev` / `--only-group dev` / `--no-group dev` |
| `--group <name>` | Include a group (and add to it with `uv add`) |
| `--only-group <name>` | Install only the group |
| `--no-group <name>` | Exclude a group |
| `--all-groups` | Include all groups |
| `--no-default-groups` | Disable all default groups |

## Notes

- Development dependencies are not included in the `[project]` table. They can have entries in `tool.uv.sources` the same as normal dependencies.
- The `dev` group is special-cased and is synced by default.
- uv requires all dependency groups to be compatible with each other and resolves all groups together when creating the lockfile; incompatible groups cause a resolution error unless explicitly declared as conflicting (see conflicts-environments.md).

### Nesting groups

A dependency group can include other groups. An included group's dependencies cannot conflict with the other dependencies declared in a group.

```toml
[dependency-groups]
dev = [
  {include-group = "lint"},
  {include-group = "test"}
]
lint = [
  "ruff"
]
test = [
  "pytest"
]
```

### Default groups

By default uv includes the `dev` group (e.g., during `uv run` or `uv sync`). Change with `tool.uv.default-groups`; use `"all"` to enable all groups. To disable during `uv run` / `uv sync` use `--no-default-groups`; to exclude a specific default group use `--no-group <name>`.

```toml
[tool.uv]
default-groups = ["dev", "foo"]
```

```toml
[tool.uv]
default-groups = "all"
```

### Group `requires-python`

By default, dependency groups must be compatible with the project's `requires-python` range. A group can require a different range in `[tool.uv.dependency-groups]`:

```toml
[project]
name = "example"
version = "0.0.0"
requires-python = ">=3.10"

[dependency-groups]
dev = ["pytest"]

[tool.uv.dependency-groups]
dev = {requires-python = ">=3.12"}
```

### Legacy `dev-dependencies`

Before `[dependency-groups]` was standardized, uv used `tool.uv.dev-dependencies`. Its contents are combined with `dependency-groups.dev`. Eventually, the `dev-dependencies` field will be deprecated and removed. If a `tool.uv.dev-dependencies` field exists, `uv add --dev` uses the existing section instead of adding a new `dependency-groups.dev` section.

```toml
[tool.uv]
dev-dependencies = [
  "pytest"
]
```

## Related

- [Managing dependencies](./dependencies.md)
- [Optional dependencies](./optional-dependencies.md)
- [Locking and syncing](./lock-sync.md)
