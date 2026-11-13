---
source: https://opencode.ai/docs/build/sdk/
---

# Overview

`@opencode/sdk` hosts OpenCode directly inside your application. Unlike the network client, it assembles the OpenCode server and routes API calls through its HTTP router in memory. It opens no HTTP listener and adds no network hop between the client and server.

For Cloudflare Durable Objects, see the Cloudflare guide.

## Signature / Usage

Install the SDK:

```sh
bun add @opencode/sdk
```

### Create a host

`OpenCode.create()` returns an explicitly owned host. Use `await using` to release its router, Location services, fibers, and scoped plugin registrations:

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

Call `await opencode.close()` explicitly when explicit resource management is not available.

The embedded host uses the same Promise values, declared errors, request options, and `AsyncIterable` streams as `@opencode/client`. It exposes the full generated client and adds the convenience aliases `sessions` and `events` for the session and event groups.

### Worktrees

Worktree operations require a `projectID`. Create and refresh load configuration and plugins from the project's saved canonical checkout. List reads saved inventory only; remove activates canonical plugins and uses the recorded strategy, failing if that strategy is unavailable.

```ts
const projectID = session.projectID
const worktree = await opencode.worktree.create({ projectID, name: "task" })
await opencode.worktree.refresh({ projectID })
await opencode.worktree.remove({ projectID, directory: worktree.directory, force: false })
```

Refresh discovers worktrees across known checkout roots using all available strategies. Register a custom strategy through a plugin's worktree transform (https://opencode.ai/docs/build/plugins/server/#worktrees).

### Stream events

```ts
for await (const event of opencode.events.subscribe()) {
  console.log(event.type)
}
```

Pass an `AbortSignal` through the generated request options, or leave an iteration to cancel its response body.

### Customize

Customize your OpenCode instance by registering plugins. Pass plugins to `OpenCode.create()` to customize agents, models, tools, and other behavior when the embedded host starts:

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

Call `await opencode.plugin(plugin)` to register another plugin after startup.

See the full plugins documentation (https://opencode.ai/docs/build/plugins/server/) for plugin hooks, transforms, tools, and the complete plugin context.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `plugins` (OpenCode.create) | — | Plugins registered when the embedded host starts |
| `projectID` (worktree.*) | — | Required for worktree operations |
| `name` (worktree.create) | — | Worktree name |
| `directory` (worktree.remove) | — | Worktree directory to remove |
| `force` (worktree.remove) | — | Shown as `false` in the example |

## Notes

- The embedded host opens no HTTP listener; use `@opencode/client` to reach a remote server.
- Embedded SDK (`@opencode/sdk`) is distinct from the Claude Code Agent SDK (anthropic-agent-sdk), the OpenAI Agents SDK (openai-agents), and the Cloudflare Agents SDK (cloudflare-agents).

## Related

- [overview.md](./overview.md)
- [client.md](./client.md)
- [sdk-cloudflare.md](./sdk-cloudflare.md)
- Plugins (server): https://opencode.ai/docs/build/plugins/server/
- Effect embedded apps: https://opencode.ai/docs/build/sdk/effect/
