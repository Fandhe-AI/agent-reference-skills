---
source: https://opencode.ai/docs/build/plugins/migrate-v1/
---

# Migrate a V1 Plugin

Port V1 plugin configuration and entrypoint to V2, or support both from one package.

```jsonc
// V1
{
  "plugin": [
    "opencode-example-plugin",
    ["./plugin/local.ts", { "enabled": true }]
  ]
}

// V2
{
  "plugins": [
    "opencode-example-plugin",
    {
      "package": "./plugin/local",
      "options": { "enabled": true }
    }
  ]
}
```

```ts title="V1"
import type { Plugin } from "@opencode-ai/plugin"

export const ExamplePlugin: Plugin = async ({ directory, project, client }) => {
  await client.app.log({
    body: { service: "example", level: "info", message: `Loaded for ${project.id}` },
  })

  return {
    // V1 tools and hooks
  }
}
```

```ts title="V2"
import { Plugin } from "@opencode/plugin"

export default Plugin.define({
  id: "example",
  async setup(ctx) {
    await ctx.storage.set("last-project", ctx.location.project.id)
    console.log(`Loaded for ${ctx.location.directory}`)
  },
})
```

Support V1 and V2 from the same entrypoint:

```ts title="src/index.ts"
import { Plugin } from "@opencode/plugin"

export default {
  ...Plugin.define({
    id: "example",
    async setup(ctx) {
      await ctx.tool.hook("execute.before", () => {
        console.log("A tool is about to run")
      })
    },
  }),
  async server() {
    return {
      "tool.execute.before": async () => {
        console.log("A tool is about to run")
      },
    }
  },
}
```

## Notes

- V1 plugin implementations do not run in V2; renaming the config entry is not enough.
- Configured local paths must name directories (`./plugin/local/index.ts`); a configured `./plugin/local.ts` file is skipped with a warning.
- V1 calls `server()`, V2 calls `setup()` (or `effect()`); hooks are not translated automatically.
- The V1 object form is supported in OpenCode `1.18.29` and newer.
