---
source: https://opencode.ai/docs/build/plugins/cli/#context
---

# Context

`setup` receives configuration, app metadata, the current location, the OpenCode client, cached data, theme tokens, the OpenTUI renderer, and the UI APIs.

## Signature / Usage

`setup` receives configuration, app metadata, the current location, the OpenCode client, cached data, theme tokens, the
OpenTUI renderer, and the UI APIs documented below.

```ts
setup(context) {
  const compact = context.options.compact === true
  const location = context.location ?? context.data.location.default()
  const version = context.app.version
  const channel = context.app.channel
  const client = context.client
  const renderer = context.renderer
  const theme = context.theme
}
```

Return a cleanup function for resources owned by the plugin.

```ts
setup(context) {
  const stop = context.data.on("session.execution.succeeded", () => {})
  return () => stop()
}
```

## Notes

- OpenCode plugins are distinct from Claude Code plugins (anthropic-claude-code-extend).

## Related

- [overview.md](./overview.md)
- [client.md](./client.md)
- [events.md](./events.md)
