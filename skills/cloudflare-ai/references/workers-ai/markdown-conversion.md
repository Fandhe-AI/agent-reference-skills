---
source: https://developers.cloudflare.com/workers-ai/features/markdown-conversion/, https://developers.cloudflare.com/workers-ai/features/markdown-conversion/usage/binding/
---

# Markdown Conversion (toMarkdown binding)

Convert documents to Markdown with `env.AI.toMarkdown()`.

## Signature / Usage

Adapted (not in the official docs): the official snippet imported `Env` from a non-existent `./env` module, assumed the R2 objects exist, and did not declare the R2 binding; this version declares `Env` inline and returns 404 when an object is missing. It requires an `r2_buckets` binding named `R2`.

```ts
interface Env {
	AI: Ai;
	R2: R2Bucket;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext) {
		// https://pub-979cb28270cc461d94bc8a169d8f389d.r2.dev/somatosensory.pdf
		const pdf = await env.R2.get("somatosensory.pdf");

		// https://pub-979cb28270cc461d94bc8a169d8f389d.r2.dev/cat.jpeg
		const cat = await env.R2.get("cat.jpeg");

		if (!pdf || !cat) {
			return new Response("Not found", { status: 404 });
		}

		return Response.json(
			await env.AI.toMarkdown([
				{
					name: "somatosensory.pdf",
					blob: new Blob([await pdf.arrayBuffer()], {
						type: "application/pdf",
					}),
				},
				{
					name: "cat.jpeg",
					blob: new Blob([await cat.arrayBuffer()], {
						type: "image/jpeg",
					}),
				},
			]),
		);
	},
};
```

Other methods:

```js
const result = await env.AI.toMarkdown().transform({
	name: "document.pdf",
	blob: new Blob([documentBuffer]),
});

const formats = await env.AI.toMarkdown().supported();
```

## Options / Props

`env.AI.toMarkdown(files, { conversionOptions })`

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| files | MarkdownDocument \| MarkdownDocument[] | — | Document(s) to convert. |
| conversionOptions | ConversionOptions | — | Per-format options (see Conversion options). |

`MarkdownDocument`:

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| name | string | — | Name of the document to convert. |
| blob | Blob | — | Blob with the document content. |

`ConversionResult` (returned as `Promise<ConversionResult | ConversionResult[]>`):

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| id | string | — | ID associated to this object. |
| name | string | — | Name of the converted document; matches the input name. |
| format | 'markdown' \| 'text' \| 'error' | — | Equals `text` when `output.format` is `text`. |
| mimetype | string | — | Detected mime type. |
| tokens | number | — | Estimated token count; absent when `format` is `error`. |
| data | string | — | Converted content; absent when `format` is `error`. |
| error | string | — | Failure message; only when `format` is `error`. |

`SupportedFormat` (from `supported()`): `extension` (string), `mimeType` (string).

## Notes

- `toMarkdown().transform()` takes the same arguments and returns the same values as `toMarkdown()`.
- Pricing: free for most format conversions; image conversion uses Workers AI models (object detection and summarization), which may incur charges beyond the free allocation.
- The binding result field is spelled `mimetype`; the REST response uses `mimeType`.
- Requires the `ai` binding (see Binding and env.AI.run()); R2 storage is covered by cloudflare-storage.
- Related products without a skill: Browser Run `/markdown` https://developers.cloudflare.com/browser-run/quick-actions/markdown-endpoint/ and Markdown for Agents https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/
- Corrected from the official docs: the official snippet imported `Env` from a non-existent `./env` module, assumed the R2 objects exist, and did not declare the R2 binding; this version declares `Env` inline and returns 404 when an object is missing, and requires an `r2_buckets` binding named `R2`.

## Related

- [Conversion options](./markdown-conversion-options.md)
- [Formats and how it works](./markdown-conversion-formats.md)
- [REST API](./markdown-conversion-rest-api.md)
- [Binding and env.AI.run()](./bindings-and-run.md)
