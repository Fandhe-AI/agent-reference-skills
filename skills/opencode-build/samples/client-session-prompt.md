---
source: https://opencode.ai/docs/build/client/
---

# Drive a Session with @opencode/client

Connect to a running OpenCode server, create a session, send a prompt, and stream events.

```ts
import { OpenCode } from "@opencode/client"

const client = OpenCode.make({
  baseUrl: "http://localhost:4096",
})

const session = await client.session.create({
  location: { directory: "/workspace" },
})

await client.session.prompt({
  sessionID: session.id,
  text: "Review the current changes",
})
```

Authenticate and set a timeout:

```ts
const client = OpenCode.make({
  baseUrl: "https://opencode.example.com",
  headers: {
    authorization: `Bearer ${process.env.OPENCODE_TOKEN}`,
  },
})

await client.session.list(undefined, {
  signal: AbortSignal.timeout(10_000),
})
```

Stream only some event types:

```ts
for await (const event of client.event.subscribe({ types: ["config.updated"] })) {
  // event.type is "config.updated" | "server.connected"
}
```

## Notes

- Install with `bun add @opencode/client`.
- Event subscriptions are live-only: no replay and no automatic reconnection.
- Use `@opencode/client/service` (`Service.ensure()`) in Node to start or discover a local background service.
