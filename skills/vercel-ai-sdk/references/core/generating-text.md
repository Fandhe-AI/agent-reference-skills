---
source: https://ai-sdk.dev/docs/ai-sdk-core/generating-text
---

# Generating and Streaming Text

AI SDK Core provides `generateText` (generate text for a given prompt and model) and `streamText` (stream text from a given prompt and model). Tool calling and structured data generation are built on top of text generation.

## Signature / Usage

```ts
import { generateText } from 'ai';

const { text } = await generateText({
  model,
  instructions:
    'You are a professional writer. ' +
    'You write simple, clear, and concise content.',
  prompt: `Summarize the following article in 3-5 sentences: ${article}`,
});
```

```ts
import { streamText } from 'ai';

const result = streamText({
  model,
  prompt: 'Invent a new holiday and describe its traditions.',
});

// example: use textStream as an async iterable
for await (const textPart of result.textStream) {
  console.log(textPart);
}
```

### generateText result

| Property | Description |
| --- | --- |
| `result.content` | The content that was generated in all steps. |
| `result.text` | The generated text from the final step. |
| `result.files` | The files that were generated in all steps. |
| `result.sources` | Sources used as references in all steps (only available for some models). |
| `result.toolCalls` | The tool calls that were made in all steps. |
| `result.toolResults` | The results of the tool calls from all steps. |
| `result.finishReason` | The reason the model finished generating text. |
| `result.rawFinishReason` | The raw reason why the generation finished (from the provider). |
| `result.usage` | The total usage across all steps (for multi-step generations). |
| `result.warnings` | Warnings from the model provider in all steps (e.g. unsupported settings). |
| `result.steps` | Details for all steps, including per-step `performance`. |
| `result.finalStep` | Details for the final step, including `performance`. |
| `result.output` | The generated structured output using the `output` specification. |

Each step includes `performance`:

| Field | Description |
| --- | --- |
| `effectiveOutputTokensPerSecond` | Effective output tokens per second, calculated as `outputTokens / requestSeconds`. |
| `outputTokensPerSecond` | For streaming steps, output tokens per second after the first generated output chunk (`outputTokens / outputStreamSeconds`). For `generateText`, `undefined`. |
| `inputTokensPerSecond` | For streaming steps, input tokens per second before the first generated output chunk (`inputTokens / ttftSeconds`). For `generateText`, `undefined`. |
| `effectiveTotalTokensPerSecond` | Effective total tokens per second, calculated as `(inputTokens + outputTokens) / requestSeconds`. |
| `stepTimeMs` | Total time spent on the step, including language model response time and tool execution time, in milliseconds. |
| `responseTimeMs` | Time spent waiting for the language model response in milliseconds. |
| `toolExecutionMs` | Time spent executing each client-side tool call in the step in milliseconds, keyed by tool call ID. |
| `timeToFirstOutputMs` | For streaming steps, the time until the first generated output chunk was received in milliseconds. For `generateText`, `undefined`. |
| `timeBetweenOutputChunksMs` | For streaming steps with at least two output chunks, timing statistics for the gaps between output chunks in milliseconds (`min`, `p10`, `median`, `avg`, `p90`, `max`). |

### streamText result promises

`result.content`, `result.text`, `result.finalStep`, `result.files`, `result.sources`, `result.toolCalls`, `result.toolResults`, `result.finishReason`, `result.rawFinishReason`, `result.usage` (total usage across all steps), `result.warnings`, `result.steps` resolve when the stream is finished. `result.totalUsage` is deprecated; use `result.usage` instead.

### Response headers and body

```ts
const result = await generateText({
  // ...
});

console.log(JSON.stringify(result.finalStep.response.headers, null, 2));
console.log(JSON.stringify(result.finalStep.response.body, null, 2));
```

### Callbacks

`onEnd` (triggered after the last step of `generateText`, or when the `streamText` stream is finished) receives text, usage information, finish reason, messages, steps, total usage, and more:

```ts
const result = await generateText({
  model,
  prompt: 'Invent a new holiday and describe its traditions.',
  onEnd({ text, finishReason, usage, responseMessages, steps, totalUsage }) {
    // your own logic, e.g. for saving the chat history or recording usage

    const messages = responseMessages; // messages that were generated
  },
});
```

`streamText` also supports `onError` (log errors) and `onChunk` (called for each stream part):

```ts
const result = streamText({
  model,
  prompt: 'Invent a new holiday and describe its traditions.',
  onChunk({ chunk }) {
    if (chunk.type === 'text-delta') {
      console.log(chunk.text);
    }
  },
  onError({ error }) {
    console.error(error); // your error logging logic here
  },
});
```

`onChunk` receives all stream part types from `stream`: `start`, `start-step`, `text-start`, `text-delta`, `text-end`, `reasoning-start`, `reasoning-delta`, `reasoning-end`, `custom`, `source`, `file`, `reasoning-file`, `tool-call`, `tool-input-start`, `tool-input-delta`, `tool-input-end`, `tool-result`, `tool-error`, `tool-output-denied`, `tool-approval-request`, `tool-approval-response`, `finish-step`, `finish`, `abort`, `error`, `raw`.

#### Lifecycle callbacks (experimental)

Available on both `generateText` and `streamText`; errors thrown inside these callbacks are silently caught and do not break the generation flow.

- `onStart`: Called once when the operation begins, before any LLM calls. Receives model info, messages, settings, and `runtimeContext`.
- `onStepStart`: Called before each step (LLM call). Receives the step number, model, messages being sent, tools, and prior steps.
- `onLanguageModelCallStart`: Called immediately before the provider model call begins.
- `onLanguageModelCallEnd`: Called after the model response has been normalized and parsed, but before any client-side tool execution begins. Receives the model-call content parts, usage, finish reason, and provider metadata.
- `onToolExecutionStart`: Called right before a tool's `execute` function runs. Receives the tool call object, messages, and `toolContext`.
- `onToolExecutionEnd`: Called right after a tool's `execute` function completes or errors. Receives the tool call object, `toolExecutionMs`, and a `toolOutput` discriminated union (`type: 'tool-result'` with `output`, or `type: 'tool-error'` with `error`).
- `onStepEnd`: Called after each step finishes (`generateText` includes `stepNumber`, the zero-based index of the completed step).

### stream property

```ts
for await (const part of result.stream) {
  switch (part.type) {
    case 'text-delta': {
      // handle text delta here
      break;
    }
    case 'tool-call': {
      // handle tool call here
      break;
    }
    case 'finish': {
      // handle finish here
      break;
    }
    case 'error': {
      // handle error here
      break;
    }
  }
}
```

### Stream helpers

`result.stream` can be passed to standalone helpers for AI SDK UI integration:

- `createUIMessageStreamResponse({ stream: toUIMessageStream({ stream: result.stream }) })`: Creates a UI Message stream HTTP response (with tool calls etc.) usable in a Next.js App Router API route.
- `pipeUIMessageStreamToResponse({ stream: toUIMessageStream({ stream: result.stream }), response })`: Writes UI Message stream delta output to a Node.js response-like object.
- `createTextStreamResponse({ stream: toTextStream({ stream: result.stream }) })`: Creates a simple text stream HTTP response.
- `pipeTextStreamToResponse({ stream: toTextStream({ stream: result.stream }), response })`: Writes text delta output to a Node.js response-like object.

### Stream transformation

Use `experimental_transform` to filter, change, or smooth the stream. Transformations are applied before the callbacks are invoked and the promises are resolved (e.g. an uppercase transformation means `onEnd` receives the transformed text). Multiple transformations are applied in the order provided.

```ts
import { smoothStream, streamText } from 'ai';

const result = streamText({
  model,
  prompt,
  experimental_transform: smoothStream(),
});
```

Custom transformation (the function receives the tools and `stopStream`, and returns a `TransformStream`):

```ts
import { streamText, type TextStreamPart, type ToolSet } from 'ai';

const upperCaseTransform =
  <TOOLS extends ToolSet>() =>
  (options: { tools: TOOLS; stopStream: () => void }) =>
    new TransformStream<TextStreamPart<TOOLS>, TextStreamPart<TOOLS>>({
      transform(chunk, controller) {
        controller.enqueue(
          // for text-delta chunks, convert the text to uppercase:
          chunk.type === 'text-delta'
            ? { ...chunk, text: chunk.text.toUpperCase() }
            : chunk,
        );
      },
    });
```

When invoking `stopStream`, simulate the `finish-step` and `finish` events to guarantee a well-formed stream is returned and all callbacks are invoked.

### Sources and citations

Some providers (e.g. Perplexity, Google) include sources in the response; sources reference URLs or documents. Each `url` source has `id`, `url`, optional `title`, and `providerMetadata`. For OpenAI Responses and Anthropic web search, sources contain the retrieved references, which can include more references than the model cites. OpenAI file-search results are also exposed as document sources when the API returns them.

```ts
for (const source of result.sources) {
  if (source.sourceType === 'url') {
    console.log('ID:', source.id);
    console.log('Title:', source.title);
    console.log('URL:', source.url);
    console.log('Provider metadata:', source.providerMetadata);
    console.log();
  }
}
```

OpenAI Responses and Anthropic attach an optional `citations` array to each `text` content part. A `Citation` (exported from `ai`) contains `source` (URL or document source), optional `startIndex` / `endIndex` (provider-supplied offsets, end exclusive), and optional `citedText` (supporting passage from the source, not an offset in the generated answer).

```ts
for (const part of result.content) {
  if (part.type === 'text') {
    for (const citation of part.citations ?? []) {
      console.log(citation.source, citation.startIndex, citation.endIndex);
    }
  }
}
```

For `streamText`, citations are available on `text-end` events (associated with the text block's `id`) and on text parts in the completed `result.content`, and survive `toUIMessageStream` as `TextUIPart.citations`.

## Notes

- `streamText` immediately starts streaming and suppresses errors to prevent server crashes. Use the `onError` callback to log errors.
- `result.textStream` is both a `ReadableStream` and an `AsyncIterable`.
- `streamText` uses backpressure and only generates tokens as they are requested. You need to consume the stream in order for it to finish.
- Lifecycle callbacks are experimental: "Experimental callbacks are subject to breaking changes in incremental package releases."
- `experimental_transform` is an experimental option.
- JavaScript `slice()` uses UTF-16 code units, so provider citation offsets may need conversion for emoji or characters outside the basic multilingual plane. When offsets are absent, render references alongside the containing text block instead of guessing a range.
- The `model` placeholder in snippets stands for any provider model.

## Related

- [generateText](./generate-text.md)
- [streamText](./stream-text.md)
- [smoothStream](./smooth-stream.md)
- [Lifecycle Callbacks](./lifecycle-callbacks.md)
- [Generating Structured Data](./generating-structured-data.md)
