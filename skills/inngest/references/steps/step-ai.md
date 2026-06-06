# step.ai

AI-specific step utilities for calling inference providers with request offloading, observability, and cost tracking.

## Signature / Usage

### step.ai.infer

Offloads an inference request to Inngest's infrastructure, pausing the serverless function during the request to reduce execution costs.

```ts
const response = await step.ai.infer("call-openai", {
  model: step.ai.models.openai({ model: "gpt-4o" }),
  body: {
    messages: [{ role: "user", content: "Summarize this text" }],
  },
});
```

### step.ai.wrap

Wraps an existing AI SDK call as a step to add observability without restructuring code.

```ts
const result = await step.ai.wrap("anthropic-call", anthropic.messages.create.bind(anthropic.messages), {
  model: "claude-3-5-sonnet-20241022",
  max_tokens: 1024,
  messages: [{ role: "user", content: "Hello" }],
});
```

## Options / Props

### step.ai.infer options

| Name | Type | Description |
|------|------|-------------|
| `id` | `string` | Unique step identifier |
| `config.model` | `step.ai.models.*()` | Model configuration; supports `openai`, `gemini`, `anthropic`, `grok`, `azure` |
| `config.body` | `ModelRequestBody` | Provider-specific request body |

### step.ai.wrap options

| Name | Type | Description |
|------|------|-------------|
| `id` | `string` | Unique step identifier |
| `sdkFunction` | `Function` | Bound AI SDK method to wrap |
| `args` | `object` | JSON-serializable arguments forwarded to the SDK function |

## Notes

- `step.ai.infer` offloads HTTP to Inngest's infrastructure — the serverless function is suspended during inference, reducing billable execution time
- Both methods record request/response metadata in workflow traces
- `step.ai.wrap` arguments must be JSON-serializable to support prompt editing and step rerun in the dev server
- TypeScript only; Python and Go use `step.run()` wrappers instead

## Related

- [step.run](./step-run.md)
- [Parallel Steps](./parallel-steps.md)
