---
source: https://developers.cloudflare.com/ai-search/configuration/data-source/website/, https://developers.cloudflare.com/ai-search/configuration/data-source/website/authentication-headers/, https://developers.cloudflare.com/ai-search/configuration/data-source/website/content-selectors/, https://developers.cloudflare.com/ai-search/configuration/data-source/website/custom-metadata/
---

# Website data source

Crawl and index a website on a domain onboarded to the same Cloudflare account. Pages are stored in built-in storage.

## Signature / Usage

Content selectors (first matching path wins):

```bash
curl -X POST "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/ai-search/namespaces/default/instances" \
  -H "Authorization: Bearer <API_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "id": "my-ai-search",
    "source": "https://example.com",
    "type": "web-crawler",
    "source_params": {
      "web_crawler": {
        "parse_options": {
          "content_selector": [
            {
              "path": "**/blog/**",
              "selector": "article .post-body"
            },
            {
              "path": "**/docs/**",
              "selector": "main .content"
            }
          ]
        }
      }
    }
  }'
```

Custom metadata via `<meta>` tags:

```html
<meta name="title" content="Getting Started Guide" />
<meta name="category" content="documentation" />
<meta name="version" content="2.5" />
<meta name="is_public" content="true" />
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Path filtering | patterns | — | Matches the full URL including scheme and host; use `**/blog/**`, not `/blog/**`. |
| Parse type | `sitemap` / `discover` | `sitemap` | See website-parse-types.md. |
| Specific sitemap | URLs | — | Up to 5; sitemap parse type only. |
| Rendering mode | choice | static | Static sites download raw HTML; rendered sites use a headless browser (`use_browser_rendering`). |
| Authentication headers | headers | — | Up to 5; `source_params.web_crawler.parse_options.include_headers` (**Extra headers** in the dashboard). |
| Content selectors | `{ path, selector }[]` | — | `source_params.web_crawler.parse_options.content_selector`; up to 10; path and selector each max 200 characters. |
| Custom metadata | meta tags | — | Needs a schema first. |

Recognized meta fields (must still be in the schema): `title` (`name="title"` or `og:title`), `description` (`name="description"` or `og:description`), `image` (`og:image`). The standard tag wins over Open Graph. Booleans accept `true`/`1`/`yes` and `false`/`0`/`no` (case-insensitive); other values are omitted.

Website limits: 100,000 pages per `discover` crawl; depth up to 100,000 (default 5); cached page age up to 604,800 seconds; files-per-instance limit also applies.

## Notes

- Bot Management, WAF, and Turnstile rules apply to the crawler. To allow it, add a WAF custom rule with Bot Detection ID equals `122933950` and action Skip, placed first. Identity: https://radar.cloudflare.com/bots/directory/cloudflare-ai-search
- If a CSS selector matches nothing, the Markdown is empty and the item errors. Path filtering takes priority over selectors; changing selectors or headers triggers a reindex.
- Without selectors, `<header>`, `<footer>`, `<head>` are removed before conversion.
- Cloudflare Access protected site: create a service token and add `CF-Access-Client-Id` / `CF-Access-Client-Secret` as headers. Service tokens bypass user authentication, so scope the Access policy to content you intend to index. Store credentials securely and never commit them.
- Sensitive header values are credentials; do not index authenticated pages into an instance exposed through an open public endpoint.
- Other products (Bot Management, WAF, Turnstile, Access, Browser Run) are documented at https://developers.cloudflare.com/bots/, https://developers.cloudflare.com/waf/, https://developers.cloudflare.com/cloudflare-one/access-controls/, https://developers.cloudflare.com/browser-run/.

## Related

- [Website parse types](./website-parse-types.md)
- [Chunking and path filtering](./chunking-and-path-filtering.md)
- [Metadata attributes](./metadata-attributes.md)
