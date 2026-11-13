---
source: https://opencode.ai/docs/build/plugins/cli/#routes-and-tabs
---

# Routes and tabs

Register a JSX route, inspect the current route, navigate to home, a session, or the plugin page, and manage session tabs.

## Signature / Usage

Register a JSX route, inspect the current route, and navigate to home, a session, or the plugin page.

```tsx
const unregister = context.ui.router.register({
  name: "dashboard",
  render: ({ data }) => <text>{String(data?.title ?? "Acme")}</text>,
})
const current = context.ui.router.current()
context.ui.router.navigate({ type: "plugin", name: "dashboard", data: { title: "Status" } })
context.ui.router.navigate({ type: "session", sessionID })
context.ui.router.navigate({ type: "home" })
return unregister
```

Tabs can be listed, opened, focused, moved, and closed when session tabs are enabled. `open` leaves focus unchanged;
`focus` opens the tab when needed.

```ts
if (context.ui.tabs.enabled()) {
  context.ui.tabs.open(backgroundSessionID)
  context.ui.tabs.focus(sessionID)
  const tabs = context.ui.tabs.list()
  context.ui.tabs.move(backgroundSessionID, tabs.length - 1)
  context.ui.tabs.close(sessionID)
  context.ui.tabs.close()
}
```

## Notes

- OpenCode plugins are distinct from Claude Code plugins (anthropic-claude-code-extend).
- Tab APIs apply only when session tabs are enabled (`context.ui.tabs.enabled()`).

## Related

- [solid-components.md](./solid-components.md)
- [slots.md](./slots.md)
