---
source: https://ai-sdk.dev/docs/reference/ai-sdk-core/extract
---

# experimental_extract

Extracts a nonempty map of typed fields from one state.

## Signature / Usage

```ts
import { experimental_extract } from 'ai';
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `model` | Experimental_ExtractionModel | — | Required experimental v4 extraction model instance. |
| `state` | Experimental_ExtractionState | — | Required string, JSON object, or ordered array of text, file, and JSON parts. |
| `fields` | Record<string, Experimental_ExtractionField> | — | Required nonempty field map. |
| `referenceDate` | string | — | Optional `YYYY-MM-DD` date that anchors relative dates. |
| `maxOutputTokens` | number | — | Optional maximum output tokens, an integer >= 1. |
| `reasoning` | 'provider-default' \| 'none' \| 'minimal' \| 'low' \| 'medium' \| 'high' \| 'xhigh' \| 'max' | — | Optional reasoning effort for supported models. |
| `maxRetries` | number | 2 | Nonnegative integer; defaults to 2. |
| `abortSignal` | AbortSignal | — | Cancels the extraction request. |
| `experimental_download` | Experimental_DownloadFunction | — | Required for remote file URLs in state. Use `createDownload({ fetch })` with a DNS-protected transport for untrusted URLs. |
| `headers` | Record<string, string> | — | Additional HTTP headers. |
| `providerOptions` | ProviderOptions | — | Provider-specific options. |

Remote file URLs are rejected with `DownloadError` unless `experimental_download` is supplied. The model's `fetch` option does not apply to these downloads.

### Fields

| Type | Options |
| --- | --- |
| `text` | None |
| `number` | `unit`, `integer`, `decimals` (0 to 6) |
| `date` | None |
| `time` | None |
| `datetime` | None |
| `duration` | `unit` (`seconds`, `minutes`, `hours`, `days`, `weeks`, `months`, `years`), `integer`, `decimals` |
| `list` | Required `items` (`text`, `number`, or `date`), `integer`, `decimals` |

Every field accepts optional `instructions` as a string, JSON object, or JSON array.

### Returns

`Promise<Experimental_ExtractionResult<FIELDS>>`:

- `answers`: One typed answer per field ID, with `value` typed from the field.
- `usage`: `inputTokens`, `outputTokens`, and `totalTokens`, each possibly undefined.
- `warnings`: Provider warnings, also passed to the SDK warning logger.
- `providerMetadata`: Optional provider-specific metadata.
- `response`: Timestamp, model ID, and optional response ID, headers, and body.

## Notes

- Errors: unsupported field types throw `Experimental_ExtractionUnsupportedFieldTypeError` before provider I/O. Invalid inputs throw `InvalidArgumentError`; malformed answers throw `InvalidResponseDataError`. Fields the model refuses throw `Experimental_ExtractionRefusalError`. Model instances must implement v4; other versions throw `UnsupportedModelVersionError`.
- Source: https://ai-sdk.dev/docs/reference/ai-sdk-core/extract (ai@7.0.173)

## Related

- [Extractions](./extractions.md)
- [experimental_decide](./decide.md)
