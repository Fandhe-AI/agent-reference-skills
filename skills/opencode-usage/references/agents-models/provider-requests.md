---
source: https://opencode.ai/docs/providers/#endpoint
---

# Provider Endpoint, Requests, Timeouts, Encoding, WebSockets

Provider-wide request customization: base URL, headers and body, timeouts, body encoding, and WebSocket transport.

## Signature / Usage

### Endpoint

Override `settings.baseURL` to send a catalog provider through a proxy or compatible endpoint. Its existing package, models, and connection still apply.

```jsonc
// opencode.jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "providers": {
    "anthropic": {
      "settings": {
        "baseURL": "https://llm-proxy.example.com/anthropic",
      },
    },
  },
}
```

`settings` is package-specific. A field only has an effect when the selected package supports it.

### Requests

Use `headers` for additional HTTP headers and `body` for JSON fields that should be merged into every request body.

```jsonc
// opencode.jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "providers": {
    "openai": {
      "headers": {
        "X-Gateway-Tenant": "engineering",
      },
      "body": {
        "metadata": {
          "application": "opencode",
        },
      },
    },
  },
}
```

Both fields can also be set on a model or variant when only part of a provider's traffic needs the override.

```jsonc
// opencode.jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "providers": {
    "openai": {
      "models": {
        "gpt-6.1-sol": {
          "headers": { "X-Model-Tier": "coding" },
          "variants": [
            {
              "id": "batch",
              "body": { "service_tier": "flex" },
            },
          ],
        },
      },
    },
  },
}
```

### Timeouts

HTTP requests wait up to five minutes for response headers and up to fifteen minutes between streamed response chunks. Set the provider's `settings.headerTimeout` or `settings.chunkTimeout` to a number of milliseconds to change a limit, or to `false` to disable it. `settings.timeout` additionally bounds the whole request from send until the response completes; it has no default. These configuration settings apply provider-wide, not per model or variant. On a WebSocket transport, `chunkTimeout` bounds the gap between frames instead and defaults to thirty minutes.

```jsonc
// opencode.jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "providers": {
    "anthropic": {
      "settings": {
        "headerTimeout": 600000,
        "chunkTimeout": false,
      },
    },
  },
}
```

A request that exceeds either limit fails with a transport error. OpenCode retries a timed-out request up to three times before giving up.

### Request encoding

`settings.encoding` compresses HTTP request bodies with `"zstd"` or `"gzip"`, or sends plain JSON with `"none"`. Set it on a provider, model, or variant; the most specific value wins. Only enable an encoding the endpoint decodes: most providers and gateways reject compressed bodies. OpenAI defaults to `"zstd"` when signed in with ChatGPT and no custom `baseURL` is configured; API keys send plain JSON. WebSocket messages are unaffected.

```jsonc
// opencode.jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "providers": {
    "openai": {
      "settings": { "encoding": "none" },
    },
  },
}
```

### WebSockets

OpenAI, xAI, and supported Azure Responses models can keep one WebSocket connection open per session. Consecutive steps reuse the unchanged request prefix and only send content added since the previous response, reducing uploads in long sessions.

```jsonc
// opencode.jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "providers": {
    "openai": {
      "settings": { "transport": "http" },
    },
  },
}
```

WebSocket behavior follows these rules:

- Built-in providers opt supported routes in according to their own policy.
- Provider `settings.transport: "websocket"` enables it; `"http"` disables it.
- `"websocket"` on a route without a WebSocket channel logs a warning and falls back to HTTP.
- OpenAI provider compaction uses the same connection.
- xAI continues from stored responses only. With its default `store: false`, each step is sent in full over the reused connection.
- A closed socket reconnects on the next step. If the connection cannot open, the session continues over HTTP.
- Provider plugins with `http.request` or `http.response` hooks stay on HTTP so each request remains observable.

## Related

- [Providers](./providers.md)
- [Model options and aliases](./model-options-aliases.md)
- [Provider errors](./provider-errors.md)
