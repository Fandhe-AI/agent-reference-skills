---
source: https://opencode.ai/docs/build/plugins/cli/#attention
---

# Attention

Attention requests can show a system notification, play a configured sound, or do both based on terminal focus.

## Signature / Usage

Attention requests can show a system notification, play a configured sound, or do both based on terminal focus.

```ts
const result = await context.attention.notify({
  title: "OpenCode",
  message: "Session done",
  notification: { when: "blurred" },
  sound: { name: "done", volume: 0.5, when: "always" },
})
console.log(result.ok, result.notification, result.sound, result.skipped)
```

## Notes

- OpenCode plugins are distinct from Claude Code plugins (anthropic-claude-code-extend).

## Related

- [dialogs-and-toasts.md](./dialogs-and-toasts.md)
