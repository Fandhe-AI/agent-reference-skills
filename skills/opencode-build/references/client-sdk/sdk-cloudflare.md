---
source: https://opencode.ai/docs/build/sdk/cloudflare/
---

# Cloudflare

Use `@opencode/sdk/workerd` inside a Cloudflare Durable Object. This profile uses the object's SQLite storage, persists durable events for eviction recovery, and replaces unavailable local filesystem and process services.

## Signature / Usage

```sh
bun add @opencode/sdk
```

Hold one host for the lifetime of the Durable Object instance instead of creating one for every request.

```ts
import { OpenCodeWorkerd } from "@opencode/sdk/workerd"
import myPlugin from "./my-plugin"

export class OpenCodeDO {
  private readonly opencode: Promise<OpenCodeWorkerd.Interface>

  constructor(state: DurableObjectState) {
    this.opencode = state.blockConcurrencyWhile(() =>
      OpenCodeWorkerd.create({
        storage: state.storage,
        config: { default_agent: "build" },
        plugins: [myPlugin],
      }),
    )
  }

  async fetch() {
    const opencode = await this.opencode
    return Response.json(await opencode.server.info())
  }
}
```

`blockConcurrencyWhile` keeps every Durable Object event out until the host is ready and resets the object if initialization fails. The retained Promise gives request handlers direct access to the same host after startup.

```ts
constructor(state: DurableObjectState) {
  this.opencode = state.blockConcurrencyWhile(() =>
    OpenCodeWorkerd.create({ storage: state.storage }),
  )
}
```

Wrangler selects OpenCode's Workerd-safe implementations through the `workerd` package condition. Cloudflare may evict a Durable Object without running cleanup, so correctness does not depend on `close()` being called.

```jsonc
// wrangler.jsonc
{
  "compatibility_flags": ["nodejs_compat"]
}
```

### Route outbound requests

Pass `fetch` to route OpenCode's outbound HTTP requests (OpenCode Console config, model requests, web fetch and search, well-known config, and remote MCP servers) through a custom handler such as a Service Binding. Agent code in Code Mode continues to use `globalThis.fetch`.

```ts
OpenCodeWorkerd.create({
  storage: state.storage,
  fetch: (input, init) => {
    const request = new Request(input, init)
    return new URL(request.url).hostname === "console.example.com" ? env.CONSOLE.fetch(request) : fetch(request)
  },
})
```

### Customize

Customize your OpenCode instance by registering plugins bundled with your Worker. Pass plugins to `OpenCodeWorkerd.create()` to customize agents, models, tools, and other behavior:

```ts
import { Plugin } from "@opencode/plugin"
import { OpenCodeWorkerd } from "@opencode/sdk/workerd"

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

await OpenCodeWorkerd.create({
  storage: state.storage,
  config: { default_agent: "build" },
  plugins: [plugin],
})
```

See the full plugins documentation (https://opencode.ai/docs/build/plugins/server/) for plugin hooks, transforms, tools, and the complete plugin context.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `storage` | — | The Durable Object's SQLite storage (`state.storage`) |
| `config` | — | OpenCode config, e.g. `{ default_agent: "build" }` |
| `plugins` | — | Plugins bundled with your Worker |
| `fetch` | — | Custom handler for OpenCode's outbound HTTP requests |

## Notes

- Requires the `nodejs_compat` compatibility flag.
- The "Route outbound requests" snippet is a fragment: `state` and `env` (with a `CONSOLE` Service Binding) must be in scope, for example from a Durable Object constructor that also accepts `env`.
- This page covers embedding OpenCode in a Durable Object. Building agents or sandboxes on Cloudflare itself is covered by cloudflare-agents (Agents SDK) and cloudflare-sandbox-containers (Sandbox SDK / Containers); Durable Object APIs are in cloudflare-stateful. `@opencode/sdk/workerd` is unrelated to the `agents` package.
- Cloudflare may evict a Durable Object without cleanup, so do not rely on `close()`.

## Related

- [sdk.md](./sdk.md)
- [overview.md](./overview.md)
- Plugins (server): https://opencode.ai/docs/build/plugins/server/
