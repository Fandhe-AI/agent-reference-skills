---
source: https://opencode.ai/docs/build/plugins/cli/#formatting
---

# Formatting

Format filesystem paths for display, including home-directory abbreviation.

## Signature / Usage

Format filesystem paths for display, including home-directory abbreviation.

```ts
const displayPath = context.ui.format.path(context.location?.directory ?? "/home/me/project")
```

## Notes

- OpenCode plugins are distinct from Claude Code plugins (anthropic-claude-code-extend).

## Related

- [context.md](./context.md)
