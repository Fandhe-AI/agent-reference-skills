---
source: https://opencode.ai/docs/build/plugins/server/#hooks
---

# Hooks Overview

Hooks intercept live operations. Register a hook on its domain and dispose the returned registration when it is no longer needed.

## Signature / Usage

```ts
const registration = await ctx.session.hook("context", () => {})
await registration.dispose()
```

Multiple plugins can register the same hook. OpenCode runs them in plugin order, so later hooks see changes made by earlier hooks.

## Notes

- OpenCode plugin hooks are distinct from Claude Code hooks (anthropic-claude-code-extend), which are shell commands configured in settings.
- Hook domains documented: session, permission, shell, tool.

## Related

- [Session hooks: prompt admission and forks](./session-hooks-prompt.md)
- [Session hooks: model requests](./session-hooks-model-request.md)
- [Permission hooks](./permission-hooks.md)
- [Shell hooks](./shell-hooks.md)
- [Tool hooks](./tool-hooks.md)
