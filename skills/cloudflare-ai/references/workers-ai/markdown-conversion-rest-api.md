---
source: https://developers.cloudflare.com/workers-ai/features/markdown-conversion/usage/rest-api/
---

# Markdown conversion REST API

Convert uploaded files to Markdown and list supported formats over HTTP.

## Signature / Usage

```bash
curl https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/tomarkdown \
  -X POST \
  -H 'Authorization: Bearer {API_TOKEN}' \
  -F "files=@cat.jpeg" \
  -F "files=@somatosensory.pdf" \
  -F 'conversionOptions={ ... }'
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/tomarkdown/supported \
  -H 'Authorization: Bearer {API_TOKEN}'
```

Transform response:

```json
{
	"success": true,
	"result": [
		{
			"id": "...",
			"name": "good.html",
			"mimeType": "text/html",
			"format": "markdown",
			"tokens": 49,
			"data": "# Image Embedded with a Data URI\n\nThis _image_ is directly encoded in the HTML:\n\n\n\nAn image description\n\n \n\nIt's a tiny 5x5 pixel PNG, scaled up to 50x50px.\n\n"
		},
		{
			"id": "...",
			"name": "bad.pdf",
			"mimeType": "application/pdf",
			"format": "error",
			"error": "Some error that prevented this image from being converted"
		}
	]
}
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| files | File[] | — | Required. The files to convert. |
| conversionOptions | ConversionOptions | — | Optional; a stringified JSON object form field. |

## Notes

- Needs an API token with Workers AI REST permissions (see REST API); the account ID is in Workers & Pages on the dashboard.
- The `{ ... }` placeholder in the `conversionOptions` line stands for a JSON object of options (see Conversion options for a concrete example).
- Supported response (`/supported`) is `{ "success": true, "result": [ { "extension": ".html", "mimeType": "text/html" }, ... ] }`.
- Failed conversions are returned per file with `format: "error"` and an `error` message; the overall response can still have `success: true`.

## Related

- [Markdown conversion](./markdown-conversion.md)
- [Conversion options](./markdown-conversion-options.md)
- [REST API](./rest-api.md)
