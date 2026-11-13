---
source: https://opencode.ai/docs/build/plugins/server/#plugins
---

# Plugins (ctx.plugin)

List the plugins currently active for a location.

## Signature / Usage

```ts
const plugins = await ctx.plugin.list()
```

### Reference

Schemas: [`Plugin.Info`](https://opencode.ai/docs/api/#schema-Plugin.Info), [`Plugin.Source`](https://opencode.ai/docs/api/#schema-Plugin.Source)

```ts
interface PluginContext {
  list(input?: PluginListInput, requestOptions?: RequestOptions): Promise<PluginListOutput>
}
```

## Notes

- OpenCode plugins are distinct from Claude Code plugins (anthropic-claude-code-extend).

## Related

- [Overview](./overview.md)
