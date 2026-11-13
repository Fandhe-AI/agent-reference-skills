---
source: https://opencode.ai/docs/build/plugins/cli/#storage
---

# Storage

Durable storage persists JSON across restarts and synchronizes across TUI instances; memory storage survives plugin reloads but is discarded when the TUI exits.

## Signature / Usage

Durable storage persists JSON across restarts and synchronizes across TUI instances.

```ts
const [settings, updateSettings] = context.storage.store("settings", {
  initial: { compact: false },
})
await updateSettings((draft) => {
  draft.compact = true
})
```

Memory storage survives plugin reloads but is discarded when the TUI exits.

```ts
const [state, updateState] = context.storage.memory("state", {
  initial: { count: 0 },
})
updateState((draft) => {
  draft.count++
})
```

## Notes

- OpenCode plugins are distinct from Claude Code plugins (anthropic-claude-code-extend).

## Related

- [context.md](./context.md)
