---
source: https://ai-sdk.dev/docs/reference/ai-sdk-core/cancel-batch
---

# experimental_cancelBatch

Requests cancellation of an asynchronous batch. A successful call means that the provider accepted the cancellation request, not that cancellation has finished.

## Signature / Usage

```ts
import { experimental_cancelBatch as cancelBatch } from 'ai';

const result = await cancelBatch({
  provider,
  batch,
});

console.log(result.providerMetadata);
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `provider` | Experimental_BatchProvider (Optional) | — | The provider used to access the batch. Defaults to the global provider, or the AI Gateway when no global provider is configured. |
| `batch` | Experimental_BatchReference | — | The serializable reference returned by experimental_startBatch. |
| `providerOptions` | ProviderOptions (Optional) | — | Additional provider-specific options for the cancellation request. |
| `abortSignal` | AbortSignal (Optional) | — | An optional abort signal to cancel the API request. |
| `timeout` | number \| { totalMs?: number } (Optional) | — | Maximum time allowed for the cancellation request. |
| `headers` | Record<string, string \| undefined> (Optional) | — | Additional HTTP headers for the request. |

### Returns

| Name | Type | Description |
| --- | --- | --- |
| `providerMetadata` | ProviderMetadata (Optional) | Provider-specific metadata from the cancellation response. |

## Notes

- Stability: batch support is experimental and the API may change in patch releases.
- Calling this function with a provider that does not support batch cancellation throws an `UnsupportedFunctionalityError`.

## Related

- [Batch](./batch.md)
- [experimental_getBatchStatus](./get-batch-status.md)
