---
source: https://opencode.ai/docs/build/plugins/server/
---

# Minimal Server Plugin

Define a server plugin with `Plugin.define`, use `ctx.storage`, and return a cleanup function from `setup`.

```ts
import { Plugin } from "@opencode/plugin"

export default Plugin.define({
  id: "example",
  async setup(ctx) {
    await ctx.storage.set("loaded", true)
  },
})
```

`setup` may return a cleanup function that runs when the plugin unloads:

```ts
import { Plugin } from "@opencode/plugin"

export default Plugin.define({
  id: "example",
  setup(ctx) {
    console.log(`loaded in OpenCode ${ctx.app.version}`)
    return () => console.log("unloaded")
  },
})
```

## Notes

- Save the first block as `.opencode/plugins/example/index.ts`; plugins under `.opencode/plugins/` load automatically.
- `id` is required and scopes plugin storage.
- OpenCode plugins are distinct from Claude Code plugins and hooks (anthropic-claude-code-extend).
