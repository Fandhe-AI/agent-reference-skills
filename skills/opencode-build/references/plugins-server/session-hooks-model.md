---
source: https://opencode.ai/docs/build/plugins/server/#hooks
---

# Session Hooks: Model Resolve, Model Request, Native HTTP

Experimental model resolution, model request settings, and native provider HTTP request / response hooks.

## Signature / Usage

### Model resolve

Experimental. Runs whenever a Session resolves the model for a request, before anything is built for it. `model` starts as the selected model; change it to serve this request with another model from the same provider, including one hidden from the model picker. The Session keeps its selected model; the request and the assistant message use the new one. `kind` says which request is resolving, so a router can skip titles or route again after compaction. A model from another provider fails as unavailable.

```ts
await ctx.session.hook(
  "experimental.model.resolve",
  (event) => {
    if (event.model.id === "auto" && event.kind !== "title")
      event.model = { providerID: event.model.providerID, id: pick(event.sessionID) }
  },
  { providerID: "acme" },
)
```

### Model request

Modify model request settings and optionally scope the hook to one provider. The event carries the same `kind` as the HTTP hooks below.

```ts
await ctx.session.hook(
  "model.request",
  (event) => {
    event.headers["x-plugin"] = "review"
  },
  { providerID: "anthropic" },
)
```

### Native HTTP

Modify native provider requests or responses. Their bodies are one-shot streams; clone or replace a body before reading it.

Both hooks run for every request a session issues. `event.kind` says which flow issued it: `"primary"` for the agent loop, `"compaction"` for checkpoint summaries, `"title"` for title generation, and `"generate"` for transient `ctx.session.generate` calls. Use it instead of the agent ID to tell auxiliary requests apart.

```ts
await ctx.session.hook("http.request", (event) => {
  event.request.headers.set("x-session-id", event.sessionID)
  if (event.kind === "title") event.request.headers.set("x-priority", "background")
})

await ctx.session.hook("http.response", (event) => {
  event.response = new Response(event.response.body, {
    status: event.response.status,
    headers: { ...Object.fromEntries(event.response.headers), "x-plugin": "review" },
  })
})
```

### Reference

```ts
interface SessionModelResolveHook {
  readonly sessionID: string
  readonly agent: string
  readonly kind: "primary" | "compaction" | "title" | "generate"
  model: { providerID: string; id: string; variant?: string }
}
```

## Notes

- `experimental.model.resolve` is experimental and its name or shape may change.
- V1 `chat.headers` migrates to `model.request` or `http.request`.
- OpenCode plugin hooks are distinct from Claude Code hooks (anthropic-claude-code-extend).

## Related

- [Session hooks: model requests](./session-hooks-model-request.md)
- [Session hooks: WebSocket](./session-hooks-websocket.md)
- [Session hooks: retry](./session-hooks-retry.md)
