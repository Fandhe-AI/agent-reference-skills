---
source: https://opencode.ai/docs/build/plugins/cli/#events
---

# Events

Use `data.on` for one typed event or `data.listen` for every server event; both return an unsubscribe function.

## Signature / Usage

Use `data.on` for one typed event or `data.listen` for every server event; both return an unsubscribe function.

```ts
const stopPermission = context.data.on("permission.asked", (event) => {
  context.ui.toast.show({ message: `Permission ${event.data.id}` })
})
const stopAll = context.data.listen(({ details }) => console.log(details.type))

return () => {
  stopPermission()
  stopAll()
}
```

## Notes

- OpenCode plugins are distinct from Claude Code plugins (anthropic-claude-code-extend).

## Related

- [context.md](./context.md)
- [dialogs-and-toasts.md](./dialogs-and-toasts.md)
