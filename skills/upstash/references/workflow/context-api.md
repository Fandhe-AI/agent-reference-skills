# context.api (OpenAI / Anthropic / Resend)

The `context.api` namespace provides type-safe built-in integrations for OpenAI, Anthropic, and Resend, as an alternative to `context.call` for third-party requests.

## Signature / Usage

```typescript
// OpenAI
const { status, body } = await context.api.openai.call("Call OpenAI", {
  token: "<OPENAI_API_KEY>",
  operation: "chat.completions.create",
  body: {
    model: "gpt-4o",
    messages: [
      { role: "system", content: "Assistant says 'hello!'" },
      { role: "user", content: "User shouts back 'hi!'" },
    ],
  },
});

// Anthropic
const { status, body } = await context.api.anthropic.call("Call Anthropic", {
  token: "<ANTHROPIC_API_KEY>",
  operation: "messages.create",
  body: {
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 1024,
    messages: [{ role: "user", content: "Hello, world" }],
  },
});

// Resend (single email)
const { status, body } = await context.api.resend.call("Call Resend", {
  token: "<RESEND_API_KEY>",
  body: {
    from: "Acme <onboarding@resend.dev>",
    to: ["delivered@resend.dev"],
    subject: "Hello World",
    html: "<p>It works!</p>",
  },
  headers: { "content-type": "application/json" },
});
```

## Options / Props

| Integration | Option | Description |
|-------------|--------|-------------|
| `openai.call` | `token`, `operation: "chat.completions.create"`, `body`, optional `baseURL` | Text generation via `/v1/chat/completions`. `baseURL` targets an OpenAI-compatible provider |
| `anthropic.call` | `token`, `operation: "messages.create"`, `body` | Text generation via `/v1/messages` |
| `resend.call` | `token`, `body`, `headers`, optional `batch: true` | Send email via `/emails`, or `/emails/batch` when `batch: true` (body is an array) |

The first argument is the step name. The SDK provides predefined request/response body types; override them with generics:

```typescript
// openai / anthropic
const { status, body } = await context.api.openai.call<ResponseBodyType, RequestBodyType>("Call OpenAI", { ... });

// resend takes an extra leading IsBatch generic
const { status, body } = await context.api.resend.call<IsBatch, ResponseBodyType, RequestBodyType>("Call Resend", { ... });
```

## OpenAI-compatible provider

```typescript
const { status, body } = await context.api.openai.call("Call Deepseek", {
  baseURL: "https://api.deepseek.com",
  token: process.env.DEEPSEEK_API_KEY,
  operation: "chat.completions.create",
  body: {
    model: "deepseek-chat",
    messages: [
      { role: "system", content: "Assistant says 'hello!'" },
      { role: "user", content: "User shouts back 'hi!'" },
    ],
  },
});
```

## Notes

- `context.api.openai.call`, `context.api.anthropic.call`, and `context.api.resend.call` are not yet available in workflow-py; use `context.call` instead
- Model IDs in the examples (`gpt-4o`, `claude-3-5-sonnet-20241022`, `deepseek-chat`) are copied verbatim from the official docs and may be outdated; pick a current model ID from the provider
- More integrations may be added over time (per the docs)

## Related

- [context-call](./context-call.md)
- [context](./context.md)
