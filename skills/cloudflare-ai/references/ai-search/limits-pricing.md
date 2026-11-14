---
source: https://developers.cloudflare.com/ai-search/platform/limits-pricing/
---

# Limits and pricing

Account limits by Workers plan, included monthly usage, and usage-based rates.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/ai-search/configuration/indexing/hybrid-search/

```ts
const instance = await env.AI_SEARCH.create({
	id: "my-instance",
	index_method: {
		vector: true,
		keyword: true,
	},
	fusion_method: "rrf",
});
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Instances per account | limit | Free 100; Paid unlimited (default cap 5,000) | Above 5,000: $0.10 per additional instance per month. |
| Namespaces per account | limit | 100 / 100 | Free / Paid. |
| Files per instance | limit | Free 100,000; Paid 1M (500K with hybrid) | |
| Pages per `discover` crawl | limit | 100,000 | Both plans. |
| Pages crawled per day | limit | Free 500; Paid unlimited | |
| PDF with OCR / plain text or code | limit | 10 MiB | |
| PDF without OCR and other formats | limit | 4 MiB | |
| Included semantic queries per month | limit | 1,000 | Both plans. |
| Included full-text queries per month | limit | 1,000 | Both plans. |
| Instances per cross-instance request | limit | 10 | |
| Custom metadata fields | limit | 5 per instance | |
| Metadata per vector | limit | 10 KiB | |
| Included monthly usage | allowance | 5M ingestion tokens, 10 GB-month storage, 1,000 semantic and 1,000 full-text queries | |
| Base ingestion | price | $0.75 per million tokens | |
| Image processing | price | +$0.50 per million tokens | Shares the 5M allotment; OCR billed here. |
| Storage | price | $2.00 per GB-month | See "How storage is measured" in Notes. |
| Semantic, vector, hybrid queries | price | $0.75 per 1,000 | |
| Full-text queries | price | $0.10 per 1,000 | |

## Notes

- Billing start date: this page says AI Search billing begins on December 1, 2026; the 2026-10-01 release note says usage-based billing begins on November 1, 2026. Confirm with the official pages before relying on either.
- Ingestion tokens are counted on final indexed chunks with the `cl100k_base` tokenizer; overlap is counted in each chunk; OCR text counts as image-processing tokens.
- Workers AI embedding and reranking usage is included in AI Search usage; generation, query rewriting, and external providers are billed through your gateway/account.
- The R2, Vectorize, and Browser Run usage that AI Search runs on your behalf for storage, vector indexing, and website crawling does not appear on separate R2, Vectorize, or Browser Run bills. Storage is billed as AI Search storage.
- Website crawling is bounded by the lowest of per-crawl, files-per-instance, and per-day limits (500/day on Free).
- Namespaces do not incur a resource charge; the instance allowance counts across namespaces. Limit increase: https://forms.gle/wnizxrEUW33Y15CT8.
- Source: https://developers.cloudflare.com/ai-search/platform/limits-pricing/ (pin 34d908a / fetched 2026-11-14)
- The dedicated R2 bucket created for earlier website crawls is no longer used and may still count toward R2 storage; see the cloudflare-storage skill.

### How storage is measured

Storage is the size of the content AI Search keeps for each instance: files you upload to built-in storage, plus the Markdown text AI Search extracts and keeps for every indexed file from a connected data source (an R2 bucket or a website; for files that are already Markdown or plain text this copy is roughly the same size as the source file). This copy is separate from your own R2 bucket: if you connect an R2 bucket, you continue to pay R2 storage for that bucket separately. When a source file is deleted or replaced, its kept content is removed on the next sync. Vectors and the keyword index do not count toward storage. To reduce storage, narrow your path filtering include and exclude rules and remove duplicate or unneeded files from your data source (see chunking-and-path-filtering.md).

## Related

- [Data sources](./data-sources.md)
- [D1 data source](./data-source-d1.md)
- [Website parse types](./website-parse-types.md)
- [Error codes](./error-codes.md)
