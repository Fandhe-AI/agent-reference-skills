---
source: https://ai-sdk.dev/docs/reference/ai-sdk-core/embed-many
---

# embedMany

Embed several values using an embedding model.

## Signature / Usage

```ts
import { embedMany } from 'ai';

const { embeddings } = await embedMany({
  model: 'openai/text-embedding-3-small',
  values: [
    'sunny day at the beach',
    'rainy afternoon in the city',
    'snowy night in the mountains',
  ],
});
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `model` | EmbeddingModel | — | The embedding model to use. Example: `openai.embeddingModel('text-embedding-3-small')` |
| `values` | Array<string> | — | The values to embed. |
| `dimensions` | number (Optional) | — | Requested output embedding dimensions. Must be a positive integer. Forwarded to the model; requires support in the provider implementation. Provider mappings are being added separately. Use providerOptions until your provider supports this setting. |
| `maxRetries` | number (Optional) | 2 | Maximum number of retries. Set to 0 to disable retries. |
| `abortSignal` | AbortSignal (Optional) | — | An optional abort signal that can be used to cancel the call. |
| `headers` | Record<string, string> (Optional) | — | Additional HTTP headers to be sent with the request. Only applicable for HTTP-based providers. |
| `providerOptions` | ProviderOptions (Optional) | — | Provider-specific options that are passed through to the provider. |
| `maxParallelCalls` | number (Optional) | Infinity | Maximum number of concurrent requests when a request is split into multiple model calls. Must be greater than 0 when chunking is active and the model supports parallel calls; invalid values throw AI_InvalidArgumentError. |
| `runtimeContext` | RUNTIME_CONTEXT (Optional) | — | User-defined runtime context passed to lifecycle callbacks. Defaults to an empty object. Telemetry integrations only receive top-level properties explicitly included with telemetry.includeRuntimeContext. |
| `telemetry` | TelemetryOptions<RUNTIME_CONTEXT> (Optional) | — | Telemetry configuration. |
| `telemetry.isEnabled` | boolean (Optional) | — | Enable or disable telemetry. Enabled by default. Set to `false` to opt out. |
| `telemetry.recordInputs` | boolean (Optional) | — | Enable or disable input recording. Enabled by default. |
| `telemetry.recordOutputs` | boolean (Optional) | — | Enable or disable output recording. Enabled by default. |
| `telemetry.functionId` | string (Optional) | — | Identifier for this function. Used to group telemetry data by function. |
| `telemetry.includeRuntimeContext` | { [KEY in keyof RUNTIME_CONTEXT]?: boolean } (Optional) | — | Top-level runtime context properties to include in telemetry. Only properties set to true are included. All properties are excluded by default. User callbacks still receive the full context. |
| `telemetry.integrations` | Telemetry \| Telemetry[] (Optional) | — | Per-call telemetry integrations that receive lifecycle events. When provided, these replace any globally registered integrations for this call. |
| `onStart` | (event: EmbedStartEvent<RUNTIME_CONTEXT>) => PromiseLike<void> \| void (Optional) | — | Callback called when the embedMany operation begins, before the embedding model is called. Errors thrown in this callback are silently caught and do not break the embedding flow. |
| `onStart.event.runtimeContext` | RUNTIME_CONTEXT | — | The full, unfiltered runtime context supplied to the operation. |
| `onStart.event.callId` | string | — | Unique identifier for this embedMany call. |
| `onStart.event.operationId` | string | — | Identifies the operation type ('ai.embedMany'). |
| `onStart.event.model` | { provider: string; modelId: string } | — | The embedding model being used. |
| `onStart.event.value` | string \| Array<string> | — | The values being embedded (array of strings for embedMany). |
| `onStart.event.dimensions` | number (Optional) | — | Requested output embedding dimensions, when specified. |
| `onStart.event.maxRetries` | number | — | Maximum number of retries for failed requests. |
| `onStart.event.abortSignal` | AbortSignal \| undefined | — | Abort signal for cancelling the operation. |
| `onStart.event.headers` | Record<string, string \| undefined> \| undefined | — | Additional HTTP headers sent with the request. |
| `onStart.event.providerOptions` | ProviderOptions \| undefined | — | Additional provider-specific options. |
| `onEnd` | (event: EmbedEndEvent<RUNTIME_CONTEXT>) => PromiseLike<void> \| void (Optional) | — | Callback called when the embedMany operation completes, after all embedding model calls return. Errors thrown in this callback are silently caught and do not break the embedding flow. |
| `onEnd.event.runtimeContext` | RUNTIME_CONTEXT | — | The full, unfiltered runtime context supplied to the operation. |
| `onEnd.event.callId` | string | — | Unique identifier for this embedMany call. |
| `onEnd.event.operationId` | string | — | Identifies the operation type ('ai.embedMany'). |
| `onEnd.event.model` | { provider: string; modelId: string } | — | The embedding model that was used. |
| `onEnd.event.value` | string \| Array<string> | — | The values that were embedded (array of strings for embedMany). |
| `onEnd.event.embedding` | Embedding \| Array<Embedding> | — | The resulting embedding vectors (array of embeddings for embedMany). |
| `onEnd.event.usage` | EmbeddingModelUsage | — | Token usage for the embedding operation. |
| `onEnd.event.warnings` | Array<Warning> | — | Warnings from the embedding model. |
| `onEnd.event.providerMetadata` | ProviderMetadata \| undefined | — | Optional provider-specific metadata. |
| `onEnd.event.response` | Array<{ headers?: Record<string, string>; body?: unknown } \| undefined> | — | Response data from each embedding call. There may be multiple responses if the request was split into chunks. |

### Returns

| Name | Type | Description |
| --- | --- | --- |
| `values` | Array<string> | The values that were embedded. |
| `embeddings` | number[][] | The embeddings. They are in the same order as the values. |
| `usage` | EmbeddingModelUsage | The token usage for generating the embeddings. |
| `usage.tokens` | number | The total number of input tokens. |
| `warnings` | Warning[] | Warnings from the model provider (e.g. unsupported settings). |
| `providerMetadata` | ProviderMetadata \| undefined (Optional) | Optional metadata from the provider. The outer key is the provider name. The inner values are the metadata. Details depend on the provider. |
| `responses` | Array<{ headers?: Record<string, string>; body?: unknown } \| undefined> (Optional) | Optional raw response data from each chunk request. There may be multiple responses if the request was split into multiple chunks. |

## Notes

- `embedMany` automatically splits large requests into smaller chunks when the model has a limit on either the number of embeddings or the UTF-8 input bytes that can be processed in a single call. Providers can use a conservative byte budget to keep requests below aggregate token limits without adding a tokenizer to the AI SDK core package. An individual value larger than the byte budget is sent in its own call because splitting it would change the resulting embedding.

## Related

- [embed](./embed.md)
- [cosineSimilarity](./cosine-similarity.md)
- [Embeddings](./embeddings.md)
