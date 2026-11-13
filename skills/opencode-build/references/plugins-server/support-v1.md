---
source: https://opencode.ai/docs/build/plugins/server/#support-v1
---

# Support V1

A plugin can support V1 and V2 from the same package entrypoint.

## Signature / Usage

Default export one object with a V1 `server()` function and a V2 `setup()` function:

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

- V1 calls `server()` and uses the returned hooks.
- V2 reads the default export's `id` and `setup()` (or `effect()` for Effect plugins), ignoring `server()`.
- Keep each implementation on its own API; sharing an export does not translate V1 hooks into V2 hooks.
- Spread `Plugin.define(...)` into the exported object so it type-checks the V2 definition separately from `server()`.

## Notes

- The V1 object form is supported in OpenCode `1.18.29`. Older V1 releases may expect function exports instead; test the installed package with the oldest V1 release you intend to support and with V2. (The migration guide words this as "`1.18.29` and newer".)
- Effect here is the `effect` npm package (v4), unrelated to React's `useEffect`.
- OpenCode plugins are distinct from Claude Code plugins (anthropic-claude-code-extend).

## Related

- [Migrate plugins from V1](./migrate-v1.md)
- [Tool hooks](./tool-hooks.md)
