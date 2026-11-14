---
source: https://developers.cloudflare.com/ai-search/configuration/, https://developers.cloudflare.com/ai-search/configuration/data-source/, https://developers.cloudflare.com/ai-search/configuration/data-source/built-in-storage/
---

# Data sources, built-in storage, file types

Every instance has built-in storage and a built-in vector index (powered by R2 and Vectorize). You can add a website, R2 bucket, or D1 database (beta) as an external data source.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/ai-search/api/items/workers-binding/

```ts
await instance.items.upload(
	"faq.md",
	"# FAQ\n\nQ: How do I reset my password?\nA: Go to Settings > Security...",
);
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Built-in storage | source | — | Upload files via the Items API or dashboard **Items** tab; indexed immediately; no sync jobs. |
| Website | source | — | Crawl a domain you own; not editable after creation. |
| R2 Bucket | source | — | Index objects of an R2 bucket; not editable after creation. |
| D1 database (beta) | source | — | Index the rows returned by a read-only SQL query; not editable after creation. Indexes database rows, not files; see data-source-d1.md for its limits. |

File limits:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| PDF with OCR | size | — | 10 MiB. |
| PDF without OCR | size | — | 4 MiB. |
| Plain text, code, config, markup | size | — | 10 MiB. |
| Other formats converted to Markdown | size | — | 4 MiB. |

Plain-text types: `.txt` `.rst` `.log` `.log.gz` `.ini` `.conf` `.env` `.properties` `.gitignore` `.editorconfig` `.toml` `.markdown` `.md` `.mdx` `.mdoc` `.tex` `.latex` `.sh` `.bat` `.ps1` `.sgml` `.json` `.xml` `.sql` `.yaml` `.yml` `.css` `.js` `.ts` `.tsx` `.php` `.py` `.rb` `.java` `.c` `.cpp` `.cxx` `.h` `.hpp` `.go` `.rs` `.swift` `.dart` `.tf` `.el`.

Rich formats converted with Markdown Conversion: PDF, images (`.jpeg` `.jpg` `.png` `.webp` `.svg` `.gif` `.bmp`), HTML (`.html` `.htm`), XML, Microsoft Office (`.xlsx` `.xlsm` `.xlsb` `.xls` `.et` `.docx`), Open Document (`.ods` `.odt`), CSV, Apple `.numbers`.

## Notes

- Files over the limits are not indexed and appear in error logs.
- OCR: set `indexing_options.use_ocr` to `true` when creating or updating; disabled by default; changing it triggers a full reindex. Available on every account, billed as image-processing ingestion tokens. Image ingestion supports `.jpg` `.jpeg` `.png` `.webp` `.gif` `.bmp` `.tif` `.tiff` `.heic` `.heif`; multimodal embedding models embed images directly, text-only models caption them.
- Image conversion uses two Workers AI models for object detection and summarization.
- An instance can combine built-in storage with a website, R2, or D1 source.
- Storage, vector indexing, Browser Run crawling, and managed Workers AI embedding/reranking are included in AI Search billing; generation through your gateway is billed separately. Storage is billed as AI Search storage rather than on your R2 bill.
- Built-in storage also holds the Markdown AI Search extracts from each indexed file of a connected data source; this content counts toward AI Search storage (see limits-pricing.md).
- Source: https://developers.cloudflare.com/ai-search/configuration/data-source/ and https://developers.cloudflare.com/ai-search/configuration/data-source/built-in-storage/ (pin 34d908a / fetched 2026-11-14)
- R2 itself: cloudflare-storage skill. Vectorize is a sibling category.

## Related

- [R2 data source](./data-source-r2.md)
- [Website data source](./data-source-website.md)
- [D1 data source](./data-source-d1.md)
- [Items (Workers binding)](./items-workers-binding.md)
- [Vectorize](../vectorize/README.md)
