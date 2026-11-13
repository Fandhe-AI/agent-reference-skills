---
source: https://opencode.ai/docs/build/sdk/
---

# Embed OpenCode with @opencode/sdk

Host OpenCode in-process, with no HTTP listener, and customize it with a plugin.

```ts
import { OpenCode } from "@opencode/sdk"

await using opencode = await OpenCode.create()
const session = await opencode.sessions.create({
  location: { directory: "/workspace" },
})

await opencode.sessions.prompt({
  sessionID: session.id,
  text: "Review the current changes",
})
```

```ts
import { Plugin } from "@opencode/plugin"
import { OpenCode } from "@opencode/sdk"

const plugin = Plugin.define({
  id: "customize-agent",
  async setup(ctx) {
    await ctx.agent.transform((agents) => {
      agents.update("build", (agent) => {
        agent.description = "Builds features and fixes bugs for our team"
      })
    })
  },
})

await using opencode = await OpenCode.create({ plugins: [plugin] })
```

## Notes

- Install with `bun add @opencode/sdk`.
- `await using` releases the router, Location services, fibers, and plugin registrations; call `await opencode.close()` when explicit resource management is unavailable.
- Register another plugin after startup with `await opencode.plugin(plugin)`.
- The host exposes the full generated client plus `sessions` and `events` aliases.
