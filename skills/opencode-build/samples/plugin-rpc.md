---
source: https://opencode.ai/docs/build/plugins/rpc/
---

# Plugin RPC

Define a typed RPC contract, implement it in the server part, and call it from an HTTP client.

```ts title="src/rpc.ts"
import { Rpc } from "@opencode/plugin/rpc"

export const Acme = Rpc.define({
  id: "acme",
  methods: {
    search: {
      input: {
        type: "object",
        properties: { query: { type: "string" } },
        required: ["query"],
        additionalProperties: false,
      },
      output: {
        type: "object",
        properties: { text: { type: "string" } },
        required: ["text"],
        additionalProperties: false,
      },
      errors: {
        not_found: {
          type: "object",
          properties: { query: { type: "string" } },
          required: ["query"],
          additionalProperties: false,
        },
      },
    },
  },
  events: {
    updated: {
      schema: {
        type: "object",
        properties: {
          itemID: { type: "string" },
          text: { type: "string" },
        },
        required: ["itemID", "text"],
        additionalProperties: false,
      },
    },
  },
})
```

```ts title="src/index.ts"
import { Plugin } from "@opencode/plugin"
import { Acme } from "./rpc.js"

export default Plugin.define({
  id: "acme-plugin",
  async setup(ctx) {
    const registration = await ctx.rpc.register(Acme, {
      search: async (input, context) => {
        const { query } = input as { query: string }
        const text = await findText(query, { signal: context.signal })
        if (!text) return context.error("not_found", "Result not found", { query })
        return { text }
      },
    })

    const acme = ctx.rpc(Acme)
    const result = await acme.search({ query: "hello" })

    await registration.events.emit("updated", { itemID: "item-1", text: "ready" })
  },
})
```

```ts
import { OpenCode } from "@opencode/client"
import { Acme } from "opencode-acme-plugin/rpc"

const client = OpenCode.make({
  baseUrl: "http://localhost:4096",
})

const acme = client.rpc(Acme)
const result = await acme.search({ query: "hello" })
```

## Notes

- `findText` is a placeholder from the official example; supply your own implementation.
- Importing the contract does not register it; the server plugin must be configured and running.
- Error names beginning with `rpc.` are reserved. Event data must be an object.
- Export `./rpc` from the package so clients can import the contract without loading the implementation.
