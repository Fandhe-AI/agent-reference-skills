---
source: https://developers.cloudflare.com/ai-search/configuration/indexing/chunking/, https://developers.cloudflare.com/ai-search/configuration/indexing/path-filtering/
---

# Chunking and path filtering

Chunking splits content recursively at natural boundaries before embedding; path filtering chooses which files or URLs are indexed.

## Signature / Usage

```json
{
	"source_params": {
		"include_items": ["<PATTERN_1>", "<PATTERN_2>"],
		"exclude_items": ["<PATTERN_1>", "<PATTERN_2>"]
	}
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `chunk_size` | number | — | Tokens per chunk (min `64`; range varies by embedding model). |
| `chunk_overlap` | number | — | Overlap between adjacent chunks; the page states 0% to 30%. |
| `include_items` | string[] | — | Max 10 patterns; index only items matching at least one. |
| `exclude_items` | string[] | — | Max 10 patterns; skip items matching any. |

Pattern syntax (case-sensitive, micromatch-based): `*` matches within a path segment; `**` crosses `/`. Allowed characters: letters, digits, `_`, `-`, `.`, `/`, `? : = & %`, wildcards.

| Name | Type | Default | Description |
|------|------|---------|-------------|
| R2 example | Include `docs/**/*.pdf` | — | PDFs under docs only. |
| R2 example | Exclude `**/*.tmp`, `**/*.bak` | — | Skip temp/backup files. |
| R2 example | Include `customers/acme/**` | — | Scope an instance to one tenant. |
| Website example | Include `**/blog/**` | — | Blog pages only (patterns match the full URL). |
| Website example | Exclude `**/login*` | — | Skip login pages. |
| D1 example | Exclude `drafts-*.md` | — | Skip draft rows (rules match the row item key, such as `42.md`). |
| D1 example | Include `docs-*.md` | — | Index only one group of rows. |

## Notes

- R2 object keys do not start with `/`: use `docs/**`, not `/docs/**`. D1 item keys have no folders, so patterns do not start with `/` either; rows skipped by D1 rules are not listed in job logs, and already-indexed rows that become excluded are deleted on the next full sync. Path filtering works with website, R2, and D1 data sources.
- Order: exclude check first, then include check, then index. No rules means everything is indexed.
- `docs/*` does not match `site/docs/file.pdf` (use `**/docs/*`); single `*` does not cross directories; trailing slashes matter (`/blog/` does not match `/blog`).
- Skips are logged as `Skipped by rule: {pattern}` or `Skipped by Include Rules` in job logs.
- Larger chunks or higher `max_num_results` raise tokens passed to the generation model; `max_num_results` times chunk size must fit the model context window.
- Overlap is counted in every chunk it appears in, raising billable ingestion tokens.
- Narrow include and exclude rules also reduce AI Search storage (see limits-pricing.md).
- Source: https://developers.cloudflare.com/ai-search/configuration/indexing/path-filtering/ (pin 34d908a / fetched 2026-11-14)
- Smaller chunks mean more vectors; check instance limits. Error `7036` when chunk size exceeds the embedding model input limit.

## Related

- [Data source: website](./data-source-website.md)
- [R2 data source](./data-source-r2.md)
- [Limits and pricing](./limits-pricing.md)
