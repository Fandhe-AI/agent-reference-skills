---
source: https://developers.cloudflare.com/ai-search/configuration/data-source/website/parse-types/
---

# Website parse types

The parse type controls how AI Search finds pages on a website data source: `sitemap` (default) or `discover`.

## Signature / Usage

```bash
curl -X POST "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/ai-search/namespaces/default/instances" \
  -H "Authorization: Bearer <API_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "id": "my-ai-search",
    "type": "web-crawler",
    "source": "example.com",
    "source_params": {
      "web_crawler": {
        "parse_type": "discover",
        "discover_options": {
          "source": "links",
          "limit": 5000,
          "depth": 3,
          "max_age": 86400,
          "include_subdomains": true
        }
      }
    }
  }'
```

`robots.txt` allowing only the AI Search crawler:

```txt
User-agent: *
Disallow: /

User-agent: Cloudflare-AI-Search
Allow: /

Sitemap: https://example.com/sitemap.xml
```

## Options / Props

`discover_options` (apply only when `parse_type` is `discover`):

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `source` | string | `all` | `all`, `sitemaps`, `links`. |
| `limit` | number | `100000` | 1 to 100,000 pages. |
| `depth` | number | `5` | 1 to 100,000 link hops. |
| `max_age` | number | `86400` | 0 to 604,800 seconds of cache reuse; `0` always fetches. |
| `include_subdomains` | boolean | `false` | Follow subdomain links. |

Comparison:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `sitemap` | parse type | yes | Reads sitemaps from `robots.txt`, `/sitemap.xml`, or up to 10 specific sitemap URLs; re-crawls when `<lastmod>` changes (else `<changefreq>`, else daily); indexes by `<priority>`; supports `.gz`. |
| `discover` | parse type | — | Delegates to the Browser Run `/crawl` endpoint, collecting URLs from sitemaps and links; ignores `<lastmod>` and `<changefreq>`; re-fetches by `max_age`. |

## Notes

- Prefer `sitemap` when a complete, current sitemap exists; use `discover` when it is missing, incomplete, or stale. Changing the parse type triggers a full resync.
- Crawler user agent: `Cloudflare-AI-Search`. `robots.txt`-disallowed pages get `blocked_by_robots_txt`.
- `discover` declares `search` and `ai-input` content-signal purposes; a site setting either to `no` rejects the crawl.
- `specific_sitemaps` with `discover` returns a validation error (error `7045`).
- If a `discover` crawl does not finish or hits the limit, previously indexed pages are kept.
- `include_subdomains` can enlarge a crawl well beyond the pages you expect; pair it with `limit`, `depth`, and path filtering. The dashboard crawl options are **Crawl source**, **Page limit**, **Crawl depth**, **Max cache age**, and **Include subdomains**.
- Migration (2026-11-03 pin to 2026-11-14 pin): the `include_external_links` option and the `Cloudflare-AI-Search-External` user agent are no longer documented, and the specific sitemap limit rose from 5 to 10 URLs. The official API error table still lists `7102` (`include_external_links_not_allowed`), so treat it as legacy.
- Source: https://developers.cloudflare.com/ai-search/configuration/data-source/website/parse-types/ (pin 34d908a / fetched 2026-11-14)
- Standard sitemap limits: 50 MB and 50,000 URLs per file.

## Related

- [Website data source](./data-source-website.md)
- [Syncing](./syncing.md)
- [Error codes](./error-codes.md)
