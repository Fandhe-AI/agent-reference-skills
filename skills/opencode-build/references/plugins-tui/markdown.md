---
source: https://opencode.ai/docs/build/plugins/cli/#markdown
---

# Markdown

Register a fenced-code renderer by language; the returned function unregisters it.

## Signature / Usage

Register a fenced-code renderer by language; the returned function unregisters it.

```ts
const unregister = context.markdown.registerCodeBlockRenderer("acme", (_token, render) => render.defaultRender())
return unregister
```

## Notes

- OpenCode plugins are distinct from Claude Code plugins (anthropic-claude-code-extend).

## Related

- [theme-and-renderer.md](./theme-and-renderer.md)
