---
source: https://ai-sdk.dev/docs/reference/ai-sdk-core/start-batch
---

# experimental_startBatch

Starts an asynchronous batch of text or image generation requests.

## Signature / Usage

```ts
import { experimental_startBatch as startBatch } from 'ai';

const batch = await startBatch({
  requests: [
    {
      id: 'france',
      type: 'text',
      model: 'gpt-5.4-nano',
      prompt: 'What is the capital of France?',
    },
  ],
});
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `provider` | Experimental_BatchProvider (Optional) | — | The provider to use. Defaults to the global provider, or the AI Gateway when no global provider is configured. |
| `requests` | Array<Experimental_BatchRequest> | — | The independent requests to process. Each request must have a unique, non-empty id, a supported type, and type-specific properties such as model and prompt or messages for text requests. |
| `providerOptions` | ProviderOptions (Optional) | — | Additional provider-specific options for the batch. |
| `webhookUrl` | string (Optional) | — | URL to notify when the batch reaches a terminal state. Support and payloads are provider-specific. |
| `abortSignal` | AbortSignal (Optional) | — | An optional abort signal to cancel the request that starts the batch. |
| `timeout` | number \| { totalMs?: number } (Optional) | — | Maximum time allowed for the batch creation request. |
| `headers` | Record<string, string \| undefined> (Optional) | — | Additional HTTP headers for the request. |

### Returns

| Name | Type | Description |
| --- | --- | --- |
| `version` | 2 | Version of the serializable batch reference. |
| `id` | string | Provider batch identifier. |
| `provider` | string | Provider identifier for the batch. |
| `status` | 'pending' \| 'completed' \| 'failed' | Initial normalized batch status. |
| `rawStatus` | string (Optional) | The provider-specific batch status, when available. |
| `requestCounts` | { total: number; pending: number; completed: number; failed: number } (Optional) | Provider-reported request counts. |
| `error` | Experimental_BatchError (Optional) | Error details when the batch fails. |
| `createdAt` | string (Optional) | Creation timestamp, when provided by the provider. |
| `expiresAt` | string (Optional) | Expiration timestamp, when provided by the provider. |
| `providerMetadata` | ProviderMetadata (Optional) | Provider-specific metadata for the batch. |
| `warnings` | Warning[] | Warnings returned while starting the batch. |

## Notes

- Stability: batch support is experimental and the API may change in patch releases.

## Related

- [Batch](./batch.md)
- [experimental_getBatchStatus](./get-batch-status.md)
- [experimental_getBatchResults](./get-batch-results.md)
- [experimental_cancelBatch](./cancel-batch.md)
- [experimental_listBatches](./list-batches.md)
