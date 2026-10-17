---
source: https://ai-sdk.dev/docs/reference/ai-sdk-core/get-batch-status
---

# experimental_getBatchStatus

Retrieves the latest status of an asynchronous batch.

## Signature / Usage

```ts
import { anthropic } from '@ai-sdk/anthropic';
import { experimental_getBatchStatus as getBatchStatus } from 'ai';

const status = await getBatchStatus({
  provider: anthropic,
  batch,
});

console.log(status.status, status.requestCounts);
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `provider` | Experimental_BatchProvider (Optional) | — | The provider used to access the batch. Defaults to the global provider, or the AI Gateway when no global provider is configured. |
| `batch` | Experimental_BatchReference | — | The serializable reference returned by experimental_startBatch. |
| `providerOptions` | ProviderOptions (Optional) | — | Additional provider-specific options for status retrieval. |
| `maxRetries` | number (Optional) | 2 | Maximum number of retries for status retrieval. Set to 0 to disable retries. |
| `abortSignal` | AbortSignal (Optional) | — | An optional abort signal to cancel the request. |
| `timeout` | number \| { totalMs?: number } (Optional) | — | Maximum time allowed for the status request. |
| `headers` | Record<string, string \| undefined> (Optional) | — | Additional HTTP headers for the request. |

### Returns

| Name | Type | Description |
| --- | --- | --- |
| `status` | 'pending' \| 'completed' \| 'failed' | The latest normalized batch status. |
| `rawStatus` | string (Optional) | The provider-specific batch status, when available. |
| `requestCounts` | { total: number; pending: number; completed: number; failed: number } (Optional) | Provider-reported request counts. |
| `error` | Experimental_BatchError (Optional) | Error details when the batch fails. |
| `createdAt` | string (Optional) | Creation timestamp, when provided by the provider. |
| `expiresAt` | string (Optional) | Expiration timestamp, when provided by the provider. |
| `providerMetadata` | ProviderMetadata (Optional) | Provider-specific metadata for the batch. |

## Notes

- Stability: batch support is experimental and the API may change in patch releases.

## Related

- [Batch](./batch.md)
- [experimental_startBatch](./start-batch.md)
- [experimental_getBatchResults](./get-batch-results.md)
