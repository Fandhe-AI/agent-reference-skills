---
source: https://ai-sdk.dev/docs/ai-sdk-core/overview
---

# AI SDK Core

AI SDK Core simplifies working with LLMs by offering a standardized way of integrating them into your app. Its functions cover text generation, structured data generation, and tool usage with a standardized approach to prompts and settings.

## Signature / Usage

```ts
import { generateText } from 'ai';

const { text } = await generateText({
  model,
  prompt: 'Write a vegetarian lasagna recipe for 4 people.',
});
```

### Core Functions

| Name | Description |
| --- | --- |
| `generateText` | Generates text and tool calls. Ideal for non-interactive use cases such as automation tasks (e.g. drafting email or summarizing web pages) and for agents that use tools. |
| `streamText` | Streams text and tool calls. Use it for interactive use cases such as chat bots and content streaming. |

## Notes

- Both `generateText` and `streamText` support structured output via the `output` property (e.g. `Output.object()`, `Output.array()`), allowing typed, schema-validated data for information extraction, synthetic data generation, classification tasks, and streaming generated UIs.
- The `model` placeholder in snippets stands for any provider model (for example a model id string routed through the AI Gateway, or a provider package model).

## Related

- [Generating Text](./generating-text.md)
- [Generating Structured Data](./generating-structured-data.md)
- [Settings](./settings.md)
- [generateText](./generate-text.md)
- [streamText](./stream-text.md)
