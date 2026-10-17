---
source: https://ai-sdk.dev/docs/reference/ai-sdk-core/embed
---

# embed

Generate an embedding for a single value using an embedding model. Ideal for embedding a single value to retrieve similar items or to use in a downstream task.

## Signature / Usage

```ts
import { embed } from 'ai';

const { embedding } = await embed({
  model: 'openai/text-embedding-3-small',
  value: 'sunny day at the beach',
});
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `model` | EmbeddingModel | — | The embedding model to use. Example: `openai.embeddingModel('text-embedding-3-small')` |
| `value` | VALUE | — | The value to embed. The type depends on the model. |
| `dimensions` | number (Optional) | — | Requested output embedding dimensions. Must be a positive integer. Forwarded to the model; requires support in the provider implementation. Provider mappings are being added separately. Use providerOptions until your provider supports this setting. |
| `maxRetries` | number (Optional) | 2 | Maximum number of retries. Set to 0 to disable retries. |
| `abortSignal` | AbortSignal (Optional) | — | An optional abort signal that can be used to cancel the call. |
| `headers` | Record<string, string> (Optional) | — | Additional HTTP headers to be sent with the request. Only applicable for HTTP-based providers. |
| `providerOptions` | ProviderOptions (Optional) | — | Provider-specific options that are passed through to the provider. |
| `runtimeContext` | RUNTIME_CONTEXT (Optional) | — | User-defined runtime context passed to lifecycle callbacks. Defaults to an empty object. Telemetry integrations only receive top-level properties explicitly included with telemetry.includeRuntimeContext. |
| `telemetry` | TelemetryOptions<RUNTIME_CONTEXT> (Optional) | — | Telemetry configuration. |
| `telemetry.isEnabled` | boolean (Optional) | — | Enable or disable telemetry. Enabled by default. Set to `false` to opt out. |
| `telemetry.recordInputs` | boolean (Optional) | — | Enable or disable input recording. Enabled by default. |
| `telemetry.recordOutputs` | boolean (Optional) | — | Enable or disable output recording. Enabled by default. |
| `telemetry.functionId` | string (Optional) | — | Identifier for this function. Used to group telemetry data by function. |
| `telemetry.includeRuntimeContext` | { [KEY in keyof RUNTIME_CONTEXT]?: boolean } (Optional) | — | Top-level runtime context properties to include in telemetry. Only properties set to true are included. All properties are excluded by default. User callbacks still receive the full context. |
| `telemetry.integrations` | Telemetry \| Telemetry[] (Optional) | — | Per-call telemetry integrations that receive lifecycle events. When provided, these replace any globally registered integrations for this call. |
| `onStart` | (event: EmbedStartEvent<RUNTIME_CONTEXT>) => PromiseLike<void> \| void (Optional) | — | Callback called when the embed operation begins, before the embedding model is called. Errors thrown in this callback are silently caught and do not break the embedding flow. |
| `onStart.event.runtimeContext` | RUNTIME_CONTEXT | — | The full, unfiltered runtime context supplied to the operation. |
| `onStart.event.callId` | string | — | Unique identifier for this embed call. |
| `onStart.event.operationId` | string | — | Identifies the operation type ('ai.embed'). |
| `onStart.event.model` | { provider: string; modelId: string } | — | The embedding model being used. |
| `onStart.event.value` | string \| Array<string> | — | The value being embedded. |
| `onStart.event.dimensions` | number (Optional) | — | Requested output embedding dimensions, when specified. |
| `onStart.event.maxRetries` | number | — | Maximum number of retries for failed requests. |
| `onStart.event.abortSignal` | AbortSignal \| undefined | — | Abort signal for cancelling the operation. |
| `onStart.event.headers` | Record<string, string \| undefined> \| undefined | — | Additional HTTP headers sent with the request. |
| `onStart.event.providerOptions` | ProviderOptions \| undefined | — | Additional provider-specific options. |
| `onEnd` | (event: EmbedEndEvent<RUNTIME_CONTEXT>) => PromiseLike<void> \| void (Optional) | — | Callback called when the embed operation completes, after the embedding model returns. Errors thrown in this callback are silently caught and do not break the embedding flow. |
| `onEnd.event.runtimeContext` | RUNTIME_CONTEXT | — | The full, unfiltered runtime context supplied to the operation. |
| `onEnd.event.callId` | string | — | Unique identifier for this embed call. |
| `onEnd.event.operationId` | string | — | Identifies the operation type ('ai.embed'). |
| `onEnd.event.model` | { provider: string; modelId: string } | — | The embedding model that was used. |
| `onEnd.event.value` | string \| Array<string> | — | The value that was embedded. |
| `onEnd.event.embedding` | Embedding \| Array<Embedding> | — | The resulting embedding vector. |
| `onEnd.event.usage` | EmbeddingModelUsage | — | Token usage for the embedding operation. |
| `onEnd.event.warnings` | Array<Warning> | — | Warnings from the embedding model. |
| `onEnd.event.providerMetadata` | ProviderMetadata \| undefined | — | Optional provider-specific metadata. |
| `onEnd.event.response` | { headers?: Record<string, string>; body?: unknown } \| undefined | — | Optional response data including headers and body. |

### Returns

| Name | Type | Description |
| --- | --- | --- |
| `value` | VALUE | The value that was embedded. |
| `embedding` | number[] | The embedding of the value. |
| `usage` | EmbeddingModelUsage | The token usage for generating the embeddings. |
| `usage.tokens` | number | The number of tokens used in the embedding. |
| `warnings` | Warning[] | Warnings from the model provider (e.g. unsupported settings). |
| `response` | Response (Optional) | Optional response data. |
| `response.headers` | Record<string, string> (Optional) | Response headers. |
| `response.body` | unknown (Optional) | The response body. |
| `providerMetadata` | ProviderMetadata \| undefined (Optional) | Optional metadata from the provider. The outer key is the provider name. The inner values are the metadata. Details depend on the provider. |

## Related

- [embedMany](./embed-many.md)
- [cosineSimilarity](./cosine-similarity.md)
- [Embeddings](./embeddings.md)
