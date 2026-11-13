---
source: https://opencode.ai/docs/build/plugins/server/#lifecycle
---

# Server Plugin Lifecycle

The server part of a plugin runs in the OpenCode server. `setup` runs when the plugin loads and may return a cleanup function that runs when the plugin unloads.

## Signature / Usage

```ts title=".opencode/plugins/example/index.ts"
import { Plugin } from "@opencode/plugin"

export default Plugin.define({
  id: "example",
  async setup(ctx) {
    await ctx.storage.set("loaded", true)
  },
})
```

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

### Context

The plugin context is essentially an [OpenCode server client](https://opencode.ai/docs/build/client/). Its read and action methods use the same inputs and responses as the client. It adds plugin-only methods for transforms, runtime hooks, reloads, registrations, and plugin options.

```ts
setup(ctx) {
  console.log(ctx.app.version)
}
```

`ctx.location` describes the location where this plugin instance is loaded. It includes `directory`, optional `workspaceID`, and `project` metadata (`id`, `directory`, and `canonical`). It is available in both Promise and Effect plugins. This is the plugin instance's location, not the location of every session it can access or event it receives.

```ts
setup(ctx) {
  console.log(ctx.location.directory)
  console.log(ctx.location.project.canonical)
}
```

### Options

Pass plugin options with the object form in `opencode.json(c)`.

```jsonc title="opencode.jsonc"
{
  "plugins": [
    {
      "package": "./plugins/company",
      "options": {
        "strict": true,
      },
    },
  ],
}
```

Read those values from `ctx.options` during `setup`.

```ts title="plugins/company/index.ts"
import { Plugin } from "@opencode/plugin"

export default Plugin.define({
  id: "company",
  setup(ctx) {
    const strict = ctx.options.strict === true
  },
})
```

## Notes

- `ctx.location` is the plugin instance's location, not the location of every session or event the plugin observes.
- Effect plugins use the same context; `ctx.location` is available in both Promise and Effect plugins. Effect here is the `effect` npm package (v4), unrelated to React's `useEffect`.
- OpenCode server plugins are distinct from Claude Code hooks and plugins (anthropic-claude-code-extend).

## Related

- [Overview](./overview.md)
- [Transforms](./transforms.md)
- [Storage](./storage.md)
- [Effect plugins (official)](https://opencode.ai/docs/build/plugins/effect/)
