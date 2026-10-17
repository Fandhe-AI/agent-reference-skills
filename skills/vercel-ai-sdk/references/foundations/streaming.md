---
source: https://ai-sdk.dev/docs/foundations/streaming
---

# Streaming

Why stream LLM output: blocking UIs can leave users on loading spinners for 5, 10, even up to 40s, while streaming UIs display parts of the response as they become available.

## Signature / Usage

```ts
import { streamText } from 'ai';
__PROVIDER_IMPORT__;

const { textStream } = streamText({
  model: __MODEL__,
  prompt: 'Write a poem about embedding models.',
});

for await (const textPart of textStream) {
  console.log(textPart);
}
```

## Notes

- `__PROVIDER_IMPORT__` and `__MODEL__` are placeholders rendered by the official site for the selected provider and model.
- Streaming is not always necessary or beneficial: if a smaller, faster model achieves the desired functionality without streaming, that route can lead to simpler and more manageable development.
- The AI SDK is designed to make streaming UIs simple regardless of model speed (text generation streamed in under 10 lines with `streamText`).

## Related

- [Prompts](./prompts.md)
- [Tools](./tools.md)
- [Navigating the Library](./navigating-the-library.md)
