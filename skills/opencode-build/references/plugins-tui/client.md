---
source: https://opencode.ai/docs/build/plugins/cli/#client
---

# Client

`context.client` is the generated OpenCode client and can call the connected server, including a remote server.

## Signature / Usage

`context.client` is the generated OpenCode client and can call the connected server, including a remote server.

```ts
const response = await context.client.plugin.list({
  location: context.location ?? context.data.location.default(),
})
const plugins = response.data
```

## Notes

- OpenCode plugins are distinct from Claude Code plugins (anthropic-claude-code-extend).

## Related

- [context.md](./context.md)
- [location-data.md](./location-data.md)
