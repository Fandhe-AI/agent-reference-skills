---
source: https://ai-sdk.dev/docs/reference/ai-sdk-core/get-batch-results
---

# experimental_getBatchResults

Returns an async iterable of terminal results for the requests in an asynchronous batch.

## Signature / Usage

```ts
import { anthropic } from '@ai-sdk/anthropic';
import { experimental_getBatchResults as getBatchResults } from 'ai';

for await (const item of getBatchResults({ provider: anthropic, batch })) {
  if (item.status === 'succeeded') {
    console.log(item.id, item.text);
  } else {
    console.error(item.id, item.error);
  }
}
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `provider` | Experimental_BatchProvider (Optional) | — | The provider used to access the batch. Defaults to the global provider, or the AI Gateway when no global provider is configured. |
| `batch` | Experimental_BatchReference | — | The serializable reference returned by experimental_startBatch. |
| `tools` | ToolSet (Optional) | — | The client-defined tools provided on requests in the batch. Used to validate and normalize returned tool calls; execute functions are never invoked. |
| `providerOptions` | ProviderOptions (Optional) | — | Additional provider-specific options for result retrieval. |
| `maxRetries` | number (Optional) | 2 | Maximum number of retries for result retrieval. Set to 0 to disable retries. |
| `abortSignal` | AbortSignal (Optional) | — | An optional abort signal to cancel result retrieval. |
| `timeout` | number \| { totalMs?: number } (Optional) | — | Maximum time allowed for result retrieval. |
| `headers` | Record<string, string \| undefined> (Optional) | — | Additional HTTP headers for the request. |

### Returns

An `AsyncIterableStream<Experimental_BatchItemResult>` of succeeded, failed, cancelled, or expired request results. It can be consumed as either an async iterable or a `ReadableStream`.

Successful items contain `id`, `status: 'succeeded'`, `text`, normalized `content` (including text, reasoning, sources, files, tool calls, and tool results), `finishReason`, `usage`, and optional response and provider metadata. `text` is the concatenation of text parts and can be an empty string when a result contains no text parts. Failed, cancelled, and expired items contain the request `id`, their terminal status, and optional error details.

## Notes

- Stability: batch support is experimental and the API may change in patch releases.

## Related

- [Batch](./batch.md)
- [experimental_startBatch](./start-batch.md)
- [experimental_getBatchStatus](./get-batch-status.md)
