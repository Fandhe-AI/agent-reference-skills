---
source: https://opencode.ai/docs/build/sdk/cloudflare/
---

# OpenCode in a Cloudflare Durable Object

Hold one workerd-profile OpenCode host for the lifetime of a Durable Object.

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

```jsonc title="wrangler.jsonc"
{
  "compatibility_flags": ["nodejs_compat"]
}
```

## Notes

- Create the host once per Durable Object instance, not per request.
- Cloudflare may evict a Durable Object without running cleanup, so correctness must not depend on `close()`.
- Pass `fetch` to `OpenCodeWorkerd.create()` to route outbound HTTP through a handler such as a Service Binding.
- This is OpenCode's own SDK profile; the Cloudflare Agents SDK and Sandbox are cloudflare-agents / cloudflare-sandbox-containers.
