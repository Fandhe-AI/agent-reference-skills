---
source: https://developers.cloudflare.com/vectorize/platform/limits/
---

# Limits

Account, index, and vector limits for Vectorize on the Workers Free and Paid plans.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/vectorize/best-practices/query-vectors/

```ts
// topK defaults to 5; returnValues defaults to false; returnMetadata defaults to "none"
let matches = await env.YOUR_INDEX.query(queryVector, {
	topK: 1,
	returnValues: true,
	returnMetadata: "all",
});
```

## Options / Props

### Current (V2) limits

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Indexes per account | limit | — | Workers Paid: unlimited, default limit 50,000; each index above 50,000 costs $0.10 per month. Free: 100. |
| Maximum dimensions per vector | limit | — | 1536 dimensions, 32 bits precision. |
| Precision per vector dimension | limit | — | 32 bits (float32). |
| Maximum vector ID length | limit | — | 64 bytes. |
| Metadata per vector | limit | — | 10KiB. |
| Maximum `topK` with values or metadata | limit | — | 50. |
| Maximum `topK` without values and metadata | limit | — | 100. |
| Maximum upsert batch size | limit | — | 1000 (Workers) / 5000 (HTTP API). |
| Maximum vectors in a list-vectors page | limit | — | 1000. |
| Maximum index name length | limit | — | 64 bytes. |
| Maximum vectors per index | limit | — | 20,000,000. |
| Maximum namespaces per index | limit | — | 50,000 (Workers Paid) / 1000 (Free). |
| Maximum namespace name length | limit | — | 64 bytes. |
| Maximum vectors upload size | limit | — | 100 MB. |
| Maximum metadata indexes per Vectorize index | limit | — | 10. |
| Maximum indexed data per metadata index per vector | limit | — | 64 bytes. |

### Legacy V1 limits (deprecated)

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Indexes per account | limit | — | 100. |
| Maximum dimensions per vector | limit | — | 1536. |
| Maximum vector ID length | limit | — | 64 bytes. |
| Metadata per vector | limit | — | 10 KiB. |
| Maximum `topK` | limit | — | 20. |
| Maximum upsert batch size | limit | — | 1000 (Workers) / 5000 (HTTP API). |
| Maximum index name length | limit | — | 63 bytes. |
| Maximum vectors per index | limit | — | 200,000. |
| Maximum namespaces per index | limit | — | 1000. |
| Maximum namespace name length | limit | — | 63 bytes. |

## Notes

- Request a higher limit via the Limit Increase Request Form linked from https://developers.cloudflare.com/vectorize/platform/limits/ ; Cloudflare contacts you if it can be increased.
- Other pages in this skill mention older figures (for example 1,000 namespaces, 32-character index names in tutorials); this table is the authoritative one.
- The NDJSON CLI upload guidance of at most 5000 vectors per file is an API rate-limit precaution; see insert vectors.

## Related

- [Pricing](./pricing.md)
- [Insert vectors](./insert-vectors.md)
- [Metadata filtering](./metadata-filtering.md)
