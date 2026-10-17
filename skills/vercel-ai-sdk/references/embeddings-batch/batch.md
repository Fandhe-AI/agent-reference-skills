---
source: https://ai-sdk.dev/docs/ai-sdk-core/batch
---

# Batch

Batches submit multiple independent requests for asynchronous processing. The provider processes the batch in the background, so the application does not keep a request open while the model generates results. Useful for classification, summarization, and content generation that do not need an immediate response. Supports text generation (`type: 'text'`) and image generation (`type: 'image'`).

## Signature / Usage

Five lifecycle functions, all exported from `ai`:

- `experimental_startBatch`: submits a batch and returns its initial status and a serializable reference.
- `experimental_getBatchStatus`: retrieves the latest status and request counts.
- `experimental_getBatchResults`: asynchronously iterates over the terminal result for each request.
- `experimental_cancelBatch`: requests cancellation of a batch.
- `experimental_listBatches`: lists batches and their latest statuses.

```ts
import {
  experimental_cancelBatch as cancelBatch,
  experimental_getBatchResults as getBatchResults,
  experimental_getBatchStatus as getBatchStatus,
  experimental_listBatches as listBatches,
  experimental_startBatch as startBatch,
} from 'ai';
```

## Supported providers

Batch processing requires a provider that implements the batch interface; support is provider- and model-specific.

| Provider | Provider value | Request types | Provider API |
| --- | --- | --- | --- |
| Anthropic | `anthropic` | text | Message Batches API |
| Google | `google` | text, image | Gemini Batch API |
| OpenAI | `openai` | text | Batch API |
| xAI | `xai` | text, image | Batch API |
| AI Gateway | global default | text | Batch processing |

OpenAI batch support is available through the Responses API, not `openai.chat()`.

## Starting a batch

Pass a provider and one or more uniquely identified requests. Each text request must specify `type: 'text'`, a model ID, and either a text `prompt` or a `messages` array. Requests can use different model IDs when supported by the provider, and can use the usual text-generation settings such as `instructions`, `maxOutputTokens`, `temperature`, `topP`, `topK`, `presencePenalty`, `frequencyPenalty`, `stopSequences`, `seed`, and `reasoning`.

```ts
import { anthropic } from '@ai-sdk/anthropic';
import { experimental_startBatch as startBatch } from 'ai';

const provider = anthropic;

const batch = await startBatch({
  provider,
  requests: [
    {
      id: 'capital-france',
      type: 'text',
      model: 'claude-haiku-5-5',
      prompt: 'What is the capital of France?',
    },
    {
      id: 'capital-germany',
      type: 'text',
      model: 'claude-haiku-5-5',
      prompt: 'What is the capital of Germany?',
    },
  ],
});

console.log(batch.id, batch.status);
```

- Request IDs must be non-empty and unique within the batch. Results are not guaranteed to arrive in input order; use the ID, not an array position.
- Provider-specific settings can be passed at the batch level with `providerOptions`, or per request. The `warnings` property on the start result contains warnings about unsupported settings.
- The batch reference returned by `startBatch` is serializable. Persist it before the process exits if the batch will be completed by another process or later. When retrieving a batch, pass the same provider; the AI SDK uses the reference to ensure the batch is not read through an incompatible provider.
- Tool definitions and tool settings are provided on individual requests. A tool with the same name must have the same definition in every request that uses it.

### Image requests

Image requests use the same prompt and generation settings as `generateImage`: `prompt`, `n`, `size`, `aspectRatio`, `seed`, and `providerOptions`. A prompt can also contain input images and a mask for providers that support image editing. Provider batch endpoints may support only a subset of these options; unsupported options produce warnings or errors.

```ts
import { google } from '@ai-sdk/google';
import { experimental_startBatch as startBatch } from 'ai';

const batch = await startBatch({
  provider: google,
  requests: [
    {
      id: 'red-panda',
      type: 'image',
      model: 'gemini-3.1-flash-image-preview',
      prompt: 'A red panda reading beside a cabin window',
      aspectRatio: '16:9',
    },
  ],
});
```

Successful image items have an `images` array of `GeneratedFile` values, plus image warnings, response metadata, usage, and provider metadata when supplied. Successful text items have `text` and `content`. Use `type` to narrow mixed results:

```ts
for await (const item of getBatchResults({ provider: google, batch })) {
  if (item.type === 'image' && item.status === 'succeeded') {
    console.log(item.images);
  }
}
```

## Batch tools

Batch text requests support both client-defined and provider-defined tools. Tool definitions are sent with each request that includes them.

Client-defined tools are definition-only in a batch: their `execute` functions are never invoked, and the AI SDK does not submit tool results or start a follow-up generation. Pass the same tool set to `getBatchResults` to validate and normalize returned tool calls:

```ts
const tools = {
  get_weather: tool({
    description: 'Get the current weather for a location.',
    inputSchema: z.object({ location: z.string() }),
    execute: async ({ location }) => {
      // This function is not called by batch processing.
      return { location, temperature: 21, condition: 'sunny' };
    },
  }),
};

const batch = await startBatch({
  provider: anthropic,
  requests: [
    {
      id: 'weather-san-francisco',
      type: 'text',
      model: 'claude-haiku-4-5',
      prompt: 'Call get_weather for San Francisco, California.',
      tools,
      toolChoice: { type: 'tool', toolName: 'get_weather' },
    },
  ],
});

for await (const item of getBatchResults({
  provider: anthropic,
  batch,
  tools,
})) {
  if (item.status === 'succeeded') {
    console.log(item.id, item.content);
  }
}
```

Provider-defined tools, such as web search or code execution, can execute on the provider when supported by that provider's batch API; their calls and results are returned as normalized `content` parts.

## Checking batch status

```ts
import { setTimeout } from 'node:timers/promises';

let status = batch.status;
let error = batch.error;

while (status === 'pending') {
  await setTimeout(10_000);
  const latestStatus = await getBatchStatus({
    provider: anthropic,
    batch,
  });
  status = latestStatus.status;
  error = latestStatus.error;
}

if (status === 'failed') {
  throw new Error(error?.message ?? 'The batch failed.');
}
```

Normalized status is one of:

- `pending`: the provider is still processing the batch.
- `completed`: the batch reached a terminal state and results can be retrieved.
- `failed`: the batch could not be completed. The `error` property may contain additional details.

Status responses can also include `requestCounts` (total, pending, completed, failed), `createdAt`, `expiresAt`, `rawStatus`, and provider metadata.

For webhook-capable providers, pass `webhookUrl` to `startBatch` to receive a notification when the batch reaches a terminal state. Webhook support and payloads are provider-specific; providers without webhooks return an unsupported warning and continue without one.

## Cancelling a batch

```ts
const result = await cancelBatch({
  provider,
  batch,
});

console.log(result.providerMetadata);
```

A successful call means the provider accepted the cancellation request. It does not guarantee that cancellation has finished or that every pending request will be cancelled. Use `getBatchStatus` afterwards.

## Listing batches

Results are paginated. Pass the returned `nextCursor` as `cursor` to get the next page:

```ts
let cursor: string | undefined;

do {
  const page = await listBatches({
    provider,
    limit: 20,
    cursor,
  });

  for (const batch of page.batches) {
    console.log(batch.id, batch.status);
  }

  cursor = page.nextCursor;
} while (cursor != null);
```

Each item is a serializable batch reference with its latest normalized status, so it can be passed directly to `getBatchStatus`, `getBatchResults`, or `cancelBatch`. Cursors are opaque and provider-specific; store or pass them unchanged.

## Retrieving results

After the batch is complete, `getBatchResults` returns an async iterable; each item has the ID and terminal status of one input request:

```ts
for await (const item of getBatchResults({ provider: anthropic, batch })) {
  if (item.status === 'succeeded') {
    console.log(item.id, item.text);
  } else {
    console.error(item.id, item.status, item.error);
  }
}
```

Successful items include `text` (concatenated text content; can be an empty string), `content` (ordered normalized parts: text, reasoning, files, sources, tool calls, tool results, provider content where supported), `finishReason` and optional `rawFinishReason`, `usage` and optional `response`, and optional `providerMetadata`. Failed, cancelled, and expired items include `id` and status; failed items include `error`, and cancelled/expired items may also include one. One failed request does not mean every request failed, so handle each item independently.

## Request controls

All lifecycle functions accept `providerOptions`, `headers`, `timeout`, and `abortSignal`. `getBatchStatus`, `getBatchResults`, and `listBatches` also accept `maxRetries`.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `maxRetries` | number | 2 | Retries for status, result retrieval, and listing. Does not retry batch creation or cancellation. `0` disables retries. |
| `abortSignal` | AbortSignal | — | Cancels the current API request. |
| `timeout` | number or `{ totalMs?: number }` | — | Limits the current HTTP operation. |

## Notes

- Stability: batch support is experimental and the API may change in patch releases.
- Cancellation and listing are optional provider capabilities; calling either with a provider that does not implement it throws an `UnsupportedFunctionalityError`.
- Batch retrieval does not run an AI SDK tool loop or invoke client-defined `execute` functions. Treat result content and provider metadata as untrusted model output, and avoid logging it indiscriminately because it can contain sensitive data.
- Request controls affect communication with the provider only; they do not change the provider's processing deadline or cancel a batch that has already been submitted.

## Related

- [experimental_startBatch](./start-batch.md)
- [experimental_getBatchStatus](./get-batch-status.md)
- [experimental_getBatchResults](./get-batch-results.md)
- [experimental_cancelBatch](./cancel-batch.md)
- [experimental_listBatches](./list-batches.md)
