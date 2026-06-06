# step.ai.wrap()

Wraps an existing AI SDK call as a durable Inngest step, adding observability (prompts, token counts, latency) without changing the underlying SDK call. TypeScript only.

## Signature / Usage

```ts
// With Vercel AI SDK
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

const { text } = await step.ai.wrap("generate-text", generateText, {
  model: openai("gpt-4o"),
  prompt: "Summarize this document.",
});
```

```ts
// With Anthropic SDK (requires .bind() to preserve context)
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic();

const result = await step.ai.wrap(
  "anthropic-call",
  anthropic.messages.create.bind(anthropic.messages),
  {
    model: "claude-opus-4-5",
    max_tokens: 1024,
    messages: [{ role: "user", content: "Hello" }],
  }
);
```

```ts
// With OpenAI SDK
import OpenAI from "openai";

const openaiClient = new OpenAI();

const result = await step.ai.wrap(
  "openai-call",
  openaiClient.chat.completions.create.bind(openaiClient.chat.completions),
  {
    model: "gpt-4o",
    messages: [{ role: "user", content: "Hello" }],
  }
);
```

## Options / Props

**`step.ai.wrap(id, fn, args)`**

| Name | Type | Description |
|------|------|-------------|
| `id` | `string` | Step identifier used in function logs and memoization |
| `fn` | `Function` | The AI SDK function to wrap (e.g. `generateText`, `anthropic.messages.create`) |
| `args` | `object` | Arguments passed directly to `fn`; must be JSON-serializable for dev server prompt editing |

## Notes

- TypeScript only; Python SDK users should use `step.ai.infer()` instead.
- SDKs that require instance context (Anthropic, OpenAI) must use `.bind()` to preserve `this`.
- Unlike `step.ai.infer()`, the inference request is executed within your own function's compute — the function is not paused during the API call.
- All arguments must be JSON-serializable to enable prompt editing in the dev server.
- Complex SDK overloads may require type casting.
- Streaming responses are not supported.

## Related

- [step.ai.infer()](./step-ai-infer.md)
- [Agent Tool Loop Pattern](./agent-tool-loop.md)
