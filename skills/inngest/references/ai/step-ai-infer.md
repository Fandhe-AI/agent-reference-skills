# step.ai.infer()

Offloads an LLM inference request to Inngest's infrastructure, pausing function execution until the response is ready. Particularly cost-effective on serverless: the function is not billed while waiting for the provider.

## Signature / Usage

```ts
import { inngest } from "./client";

export const myFn = inngest.createFunction(
  { id: "ai-inference-example" },
  { event: "app/inference.requested" },
  async ({ event, step }) => {
    const result = await step.ai.infer("call-openai", {
      model: step.ai.models.openai({ model: "gpt-4o" }),
      body: {
        messages: [
          { role: "user", content: event.data.prompt },
        ],
      },
    });

    return result;
  }
);
```

## Options / Props

**`step.ai.infer(id, options)`**

| Name | Type | Description |
|------|------|-------------|
| `id` | `string` | Step identifier used in function logs and memoization |
| `options.model` | `ModelConfig` | Model configuration from `step.ai.models.*` |
| `options.body` | `object` | Strongly-typed request body; shape depends on the model provider |

**Model helpers (`step.ai.models.*`)**

| Helper | Provider | Notes |
|--------|----------|-------|
| `step.ai.models.openai({ model })` | OpenAI | Also compatible with OpenAI-compatible APIs (e.g. Perplexity) |
| `step.ai.models.anthropic({ model })` | Anthropic | |
| `step.ai.models.gemini({ model })` | Google Gemini | |
| `step.ai.models.grok({ model })` | xAI Grok | |
| `step.ai.models.openai({ model, baseUrl })` | Azure OpenAI / custom | Pass `baseUrl` for Azure or other compatible endpoints |

Models can also be imported from `@inngest/ai/models` as named imports (e.g. `import { openai } from "@inngest/ai/models"`).

## Notes

- The function is suspended while waiting — no compute cost on serverless during the API call.
- Once the provider responds, the function resumes with the full response as the step result.
- Requests and responses are automatically tracked in Inngest's AI observability dashboard (token usage, latency, model metrics).
- API keys are never stored or logged by Inngest; authentication originates from your own function environment.
- Streaming responses are not yet supported (forthcoming with realtime support).
- Available for both TypeScript and Python SDKs.

## Related

- [step.ai.wrap()](./step-ai-wrap.md)
- [Agent Tool Loop Pattern](./agent-tool-loop.md)
- [Human-in-the-Loop Pattern](./human-in-the-loop.md)
