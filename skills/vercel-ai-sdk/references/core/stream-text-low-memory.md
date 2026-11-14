---
source: https://ai-sdk.dev/docs/reference/ai-sdk-core/stream-text-low-memory
---

# experimental_streamTextLowMemory

Streams with the `streamText` execution engine without a replay buffer or unused final results. Use it when you consume the output once and do not need to read the complete result later. Experimental; may change in future versions.

## Signature / Usage

Adapted (not in the official docs): the official snippet's `__PROVIDER_IMPORT__` / `__MODEL__` template placeholders are replaced by a `model` placeholder (any provider model).

```ts
import { experimental_streamTextLowMemory } from 'ai';

const result = experimental_streamTextLowMemory({
  model,
  prompt: 'Describe the history of astronomy.',
});

for await (const delta of result.textStream) {
  process.stdout.write(delta);
}

console.log(await result.totalUsage);
```

Tools, `stopWhen`, and `result.stream` work as in `streamText`. Adapted (not in the official docs): the official snippet's `__PROVIDER_IMPORT__` / `__MODEL__` placeholders are replaced by a `model` placeholder.

```ts
import { experimental_streamTextLowMemory, isStepCount, tool } from 'ai';
import { z } from 'zod/v4';

const result = experimental_streamTextLowMemory({
  model,
  prompt: 'How many characters are in astronomy?',
  tools: {
    countCharacters: tool({
      description: 'Count the Unicode code points in a string.',
      inputSchema: z.object({ text: z.string() }),
      execute: async ({ text }) => Array.from(text).length,
    }),
  },
  stopWhen: isStepCount(3),
});

for await (const part of result.stream) {
  if (part.type === 'text-delta') process.stdout.write(part.text);
  if (part.type === 'tool-result') console.log(part.output);
}
```

## Options / Props

Accepts the same options as `streamText`, including model settings, prompts and messages, provider options, tools, tool approval, `prepareStep`, `stopWhen`, structured output, transforms, retries, timeouts, cancellation, callbacks, and telemetry. These use the shared execution engine; there is no separate tool loop or provider implementation.

### Return value

| Member | Behavior |
| --- | --- |
| `textStream` | Text deltas as an async iterable and readable stream. |
| `stream` / `fullStream` | All execution events, including tools, reasoning, errors, and finish events. |
| `partialOutputStream` | Cumulative partial output. Requires an explicit `output` option; use `Output.text()` for cumulative text. |
| `elementStream` | Parsed elements when the output specification supports them. |
| `totalUsage` / `usage` | Promise-like usage metadata, resolved when the stream finishes. |
| `finishReason` / `rawFinishReason` | Promise-like completion metadata. |
| `consumeStream()` | Consume and discard the stream when no other consumer is needed. |
| `toTextStreamResponse()` / `pipeTextStreamToResponse()` | Text response helpers. |
| `toUIMessageStream()` / `toUIMessageStreamResponse()` / `pipeUIMessageStreamToResponse()` | UI message conversion and response helpers, including their existing callbacks. |

## Notes

- Source: https://ai-sdk.dev/docs/reference/ai-sdk-core/stream-text-low-memory (ai@7.0.173)
- Tool execution and subsequent model calls receive the complete conversation history. Lifecycle callbacks and telemetry receive their normal content and are not silently skipped. Existing error semantics apply: use `onError` or `stream` to observe provider errors; `textStream` contains only text deltas.
- It does not save a copy of the stream for replay. For plain text streaming it also avoids keeping the complete generated text for later access. It reduces memory use; it does not set a fixed memory limit. Providers, UI message assembly, and your own code can also keep output in memory (appending every chunk to a string still builds the full answer).
- Choose one stream accessor, response helper, or `consumeStream()` call. A second attempt to claim the stream throws or rejects. There is no replay after completion. Calling `.tee()` on the returned readable stream yourself can reintroduce buffering.
- Metadata promises can be obtained before, during, or after streaming. They do not consume the stream: start a consumer before awaiting completion metadata. Cancelling the stream rejects any pending completion promises and cancels the upstream stream. External abort signals follow `streamText`'s abort behavior.
- Final-content getters such as `text`, `content`, `steps`, `finalStep`, `responseMessages`, and `output` are absent from both the type and runtime object. Use ordinary `streamText` when you need its retained results or independent stream readers; its behavior is unchanged.

## Related

- [streamText](./stream-text.md)
- [Generating Text](./generating-text.md)
