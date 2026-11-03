---
source: https://developers.cloudflare.com/ai-search/configuration/data-source/r2/
---

# R2 data source

Connect a Cloudflare R2 bucket so AI Search indexes its objects automatically on a sync schedule.

## Signature / Usage

```sh
wrangler ai-search create my-instance --type r2 --source my-bucket
```

Set custom metadata with the R2 binding:

```js
await env.MY_BUCKET.put("docs/document.pdf", fileContent, {
	customMetadata: {
		category: "documentation",
		version: "2.5",
		is_public: "true",
	},
});
```

Or with Wrangler (`--remote` writes to the real bucket):

Adapted (not in the official docs): added `--remote`, since `wrangler r2 object put` defaults to local; see Notes.

```sh
wrangler r2 object put your-bucket/docs/document.pdf \
  --remote \
  --file=./document.pdf \
  --header="x-amz-meta-category:documentation" \
  --header="x-amz-meta-version:2.5" \
  --header="x-amz-meta-is_public:true"
```

## Notes

- Corrected from the official docs: the source omits `--remote`; `wrangler r2 object put` targets the local simulator by default, so production uploads need `--remote`. The AWS SDK example in the source references undefined `accountId`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`; it is omitted (use the S3 `Metadata` option with credentials from your environment).
- First R2-backed instance: dashboard or Wrangler creates and registers a service API token automatically; with REST or the Workers binding pass `token_id` (see service-api-token.md).
- Objects without a filename extension need an explicit supported `Content-Type`; missing, unsupported, malformed, or `application/octet-stream` types are not supported.
- Path filtering example: Include `/docs/**`, Exclude `/docs/drafts/**` (see chunking-and-path-filtering.md).
- Metadata extraction: reads `x-amz-meta-*`, strips the prefix, matches field names case-insensitively against the schema, casts types; invalid values are silently ignored. Unicode values use MIME-Word encoding (RFC 2047). A schema must be defined first (metadata-attributes.md).
- Files that are unsupported or too large are skipped and logged as errors.
- R2 bucket and `wrangler r2` details: cloudflare-storage skill.

## Related

- [Service API token](./service-api-token.md)
- [Metadata attributes](./metadata-attributes.md)
- [Data sources](./data-sources.md)
