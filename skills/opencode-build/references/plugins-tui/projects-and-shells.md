---
source: https://opencode.ai/docs/build/plugins/cli/#projects-and-shells
---

# Projects and shells

Projects, saved permissions, and shells support list, lookup, sync, and invalidate operations.

## Signature / Usage

Projects and saved permissions support list, lookup, sync, and invalidate operations.

```ts
await context.data.project.sync()
const projects = context.data.project.list()
const project = context.data.project.get(projectID)
context.data.project.invalidate()

await context.data.project.permission.sync(projectID)
const saved = context.data.project.permission.list(projectID) ?? []
context.data.project.permission.invalidate(projectID)
```

Shell data supports location-scoped list, lookup, sync, and invalidate operations.

```ts
await context.data.shell.sync(context.location)
const shells = context.data.shell.list(context.location)
const shell = context.data.shell.get(shellID)
context.data.shell.invalidate(context.location)
```

## Notes

- OpenCode plugins are distinct from Claude Code plugins (anthropic-claude-code-extend).

## Related

- [sessions.md](./sessions.md)
- [location-data.md](./location-data.md)
