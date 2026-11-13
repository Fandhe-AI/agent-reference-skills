---
source: https://opencode.ai/docs/build/plugins/cli/#solid-components
---

# Solid components

Use `usePlugin` to access the current context inside JSX rendered by a route, dialog, or slot.

## Signature / Usage

Use `usePlugin` to access the current context inside JSX rendered by a route, dialog, or slot.

```tsx
import { usePlugin } from "@opencode/plugin/tui"

function Status() {
  const context = usePlugin()
  return <text fg={context.theme.text.base}>{context.app.version}</text>
}
```

## Notes

- OpenCode plugins are distinct from Claude Code plugins (anthropic-claude-code-extend).

## Related

- [theme-and-renderer.md](./theme-and-renderer.md)
- [slots.md](./slots.md)
- [routes-and-tabs.md](./routes-and-tabs.md)
