---
source: https://ai-sdk.dev/docs/reference/ai-sdk-core/list-batches
---

# experimental_listBatches

Lists a page of asynchronous batches and their latest normalized statuses.

## Signature / Usage

```ts
import { experimental_listBatches as listBatches } from 'ai';

const page = await listBatches({
  provider,
  limit: 20,
  cursor,
});

console.log(page.batches, page.nextCursor);
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `provider` | Experimental_BatchProvider (Optional) | — | The provider whose batches should be listed. Defaults to the global provider, or the AI Gateway when no global provider is configured. |
| `limit` | number (Optional) | — | Maximum number of batches to return in this page. |
| `cursor` | string (Optional) | — | Opaque cursor returned as nextCursor by the previous list operation. |
| `providerOptions` | ProviderOptions (Optional) | — | Additional provider-specific options for listing batches. |
| `maxRetries` | number (Optional) | 2 | Maximum number of retries for listing batches. Set to 0 to disable retries. |
| `abortSignal` | AbortSignal (Optional) | — | An optional abort signal to cancel the request. |
| `timeout` | number \| { totalMs?: number } (Optional) | — | Maximum time allowed for the list request. |
| `headers` | Record<string, string \| undefined> (Optional) | — | Additional HTTP headers for the request. |

### Returns

| Name | Type | Description |
| --- | --- | --- |
| `batches` | Array<Experimental_Batch> | The batches in this page. Each item contains a serializable batch reference and its latest normalized status. |
| `nextCursor` | string (Optional) | Opaque cursor to pass as cursor to retrieve the next page. Omitted when there are no more batches. |
| `providerMetadata` | ProviderMetadata (Optional) | Provider-specific metadata for the list operation. |

## Notes

- Stability: batch support is experimental and the API may change in patch releases.
- Calling this function with a provider that does not support listing batches throws an `UnsupportedFunctionalityError`.

## Related

- [Batch](./batch.md)
- [experimental_startBatch](./start-batch.md)
