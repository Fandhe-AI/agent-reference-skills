---
source: https://developers.cloudflare.com/ai-search/api/items/workers-binding/
---

# Items (Workers binding)

Upload, list, inspect, and delete documents in an instance's built-in storage through the `items` property.

## Signature / Usage

```ts
const instance = env.AI_SEARCH.get("my-instance");

// Upload from a string
await instance.items.upload(
	"faq.md",
	"# FAQ\n\nQ: How do I reset my password?\nA: Go to Settings > Security...",
);

// Upload with metadata
await instance.items.upload("guide.pdf", pdfBlob, {
	metadata: {
		category: "onboarding",
		language: "en",
		version: "2.0",
	},
});

// Upload and wait until processing completes
const item = await instance.items.uploadAndPoll("handbook.txt", handbookContent);
console.log(`handbook.txt status: ${item.status}`);

const { result, result_info } = await instance.items.list();
await instance.items.delete("item-id-123");

const itemInfo = await instance.items.get("item-id-123").info();
const file = await instance.items.get("item-id-123").download();
const logs = await instance.items.get("item-id-123").logs({ limit: 50 });
const chunks = await instance.items.get("item-id-123").chunks({
	limit: 20,
	offset: 0,
});
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `upload(name, content, options)` `name` | string | — | Filename, used as item key. Max 128 characters. |
| `content` | ReadableStream, Blob, or string | — | PDF and plain-text/code up to 10 MiB (PDFs over 4 MiB indexed only with OCR); other formats up to 4 MiB. |
| `options.metadata` | Record<string, string> | — | Custom metadata; max 5 fields per instance; fields must be defined on the instance first. |
| `options.pollIntervalMs` | number | `1000` | `uploadAndPoll` only. |
| `options.timeoutMs` | number | `120000` | `uploadAndPoll` only; max `300000`. |
| `list` `page` | number | `1` | Page number. |
| `list` `per_page` | number | `20` | Max `50`. |
| `list` `status` | string | — | `queued`, `running`, `completed`, `error`, `skipped`, `outdated`. |
| `list` `sort_by` | string | `status` | `status` or `modified_at`. |
| `list` `search` | string | — | Search item keys. |
| `list` `source` | string | — | Source identifier, e.g. `builtin`. |
| `list` `metadata_filter` | string | — | JSON-encoded Vectorize metadata filter. |
| `logs` `limit` / `cursor` | number / string | `50` | 1 to 100; opaque cursor. |
| `chunks` `limit` / `offset` | number | `20` / `0` | limit 1 to 100. |

Item object: `id`, `key`, `status`, `chunks_count`, `file_size`, `metadata` (`filename`, `folder`, `timestamp`), `source_id`, `created_at`, `last_seen_at`. `upload` returns `id` and `key`; `download` returns `filename`, `contentType`, `size`, `body` (ReadableStream).

## Notes

- `upload()` returns immediately and queues the document; use `uploadAndPoll()` or poll `items.get(id).info()` before searching.
- Duplicate keys fail with error `7042`; files above limits fail with `7054`.
- Items are stored in built-in storage; see data-sources.md.

## Related

- [Data sources and built-in storage](./data-sources.md)
- [Metadata attributes](./metadata-attributes.md)
- [REST API: instances and items](./rest-api-instances-items.md)
