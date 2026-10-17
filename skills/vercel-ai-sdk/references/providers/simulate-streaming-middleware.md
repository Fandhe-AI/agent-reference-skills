---
source: https://ai-sdk.dev/docs/reference/ai-sdk-core/simulate-streaming-middleware
---

# simulateStreamingMiddleware

Simulates streaming behavior with responses from non-streaming language models, keeping a consistent streaming interface.

## Signature / Usage

```ts
import { streamText, wrapLanguageModel, simulateStreamingMiddleware } from 'ai';

// Example with a non-streaming model
const result = streamText({
  model: wrapLanguageModel({
    model: nonStreamingModel,
    middleware: simulateStreamingMiddleware(),
  }),
  prompt: 'Your prompt here',
});

// Now you can use the streaming interface
for await (const chunk of result.stream) {
  // Process streaming chunks
}
```

Import: `import { simulateStreamingMiddleware } from "ai"`

## Notes

- Takes no parameters.
- Awaits the complete response, creates a `ReadableStream` that emits chunks in the correct sequence, breaks the response into appropriate chunk types, and preserves metadata, reasoning, tool calls, and other response properties.
- Handles text content, reasoning (as string or array of objects), tool calls, metadata and usage information, and warnings.

## Related

- [Language Model Middleware](./middleware.md)
- [wrapLanguageModel](./wrap-language-model.md)
