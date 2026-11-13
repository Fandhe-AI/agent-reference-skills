---
source: https://opencode.ai/docs/build/plugins/server/#hooks
---

# Session Hooks: Native WebSocket (experimental)

Handshake, send, and receive hooks for providers that stream over a WebSocket.

## Signature / Usage

Providers that stream over a WebSocket open one connection per session and reuse it across requests, so `http.request` and `http.response` never see that traffic. The `experimental.ws.handshake` hook runs once per model call before the connection is selected. It carries the same `sessionID`, `agent`, `model`, and `kind` as the HTTP hooks, plus the connection `url` and `headers`. Changing `url` or `headers` changes which socket the request uses, so a rotated bearer token reopens the connection.

HTTP hooks still run for every HTTP request, including the request a WebSocket route falls back to.

```ts
await ctx.session.hook(
  "experimental.ws.handshake",
  async (event) => {
    event.headers.authorization = `Bearer ${await mintToken(event.url)}`
    delete event.headers["api-key"]
  },
  { providerID: "azure" },
)
```

`experimental.ws.send` and `experimental.ws.receive` expose the frames themselves, the WebSocket counterpart of editing an HTTP request or response body. `send` runs after the provider driver builds an outbound frame and before it is written; `receive` runs on each inbound frame before the driver observes it. Both carry the frame as a string and send whatever `frame` holds when the hook returns.

OpenCode does not validate rewritten frames. The driver tracks state from the provider's replies, so a rewrite that changes protocol meaning is the plugin's responsibility, just as a rewritten HTTP body is.

```ts
await ctx.session.hook(
  "experimental.ws.send",
  (event) => {
    const body = JSON.parse(event.frame)
    if (body.type === "response.create") body.metadata = { ...body.metadata, session: event.sessionID }
    event.frame = JSON.stringify(body)
  },
  { providerID: "openai" },
)

await ctx.session.hook("experimental.ws.receive", (event) => {
  if (event.frame.includes('"type":"error"')) console.error(event.frame)
})
```

### Reference

```ts
interface SessionWebSocketHandshakeHook {
  readonly sessionID: string
  readonly agent: string
  readonly model: { providerID: string; id: string; variant?: string }
  readonly kind: "primary" | "compaction" | "title" | "generate"
  url: string
  headers: Record<string, string>
}

interface SessionWebSocketSendHook {
  readonly sessionID: string
  readonly agent: string
  readonly model: { providerID: string; id: string; variant?: string }
  readonly kind: "primary" | "compaction" | "title" | "generate"
  frame: string
}

interface SessionWebSocketReceiveHook {
  readonly sessionID: string
  readonly agent: string
  readonly model: { providerID: string; id: string; variant?: string }
  readonly kind: "primary" | "compaction" | "title" | "generate"
  frame: string
}
```

## Notes

- These hooks are experimental and their names or shapes may change.
- OpenCode plugin hooks are distinct from Claude Code hooks (anthropic-claude-code-extend).

## Related

- [Session hooks: model resolve and native HTTP](./session-hooks-model.md)
- [Session hooks: retry](./session-hooks-retry.md)
