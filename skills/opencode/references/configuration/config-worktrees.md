---
source: https://opencode.ai/docs/config/#worktrees
---

# Config: Worktrees

Set the parent directory for new local worktrees.

## Signature / Usage

Set the parent directory for new local worktrees. OpenCode appends the requested or generated worktree name.

```jsonc
{
  "worktree": {
    "directory": "../worktrees",
  },
}
```

Relative paths resolve against the project's saved canonical checkout. This applies to global and project
configuration alike; absolute paths are used as-is, and `~/` resolves
against the user's home directory.

For example, this global configuration places new worktrees under each project's own `.lane/trees/` directory:

```jsonc
{
  "worktree": {
    "directory": ".lane/trees",
  },
}
```

Without this setting, creation uses the server's data directory under `worktree/<first-six-project-ID-characters>`.
Worktree creation and refresh load configuration from the project's saved canonical checkout, including when other
clones share its project ID. Changing it does not move existing worktrees.

Git is the built-in default. A [plugin](https://opencode.ai/docs/build/plugins/server/#worktrees) that registers a strategy automatically becomes the
default in that plugin runtime. Project operations use the canonical checkout's runtime. Strategy-specific options
belong to that plugin, not the `worktree` config object.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `worktree.directory` | — | Parent directory for new local worktrees |

## Related

- [config-locations.md](./config-locations.md)
