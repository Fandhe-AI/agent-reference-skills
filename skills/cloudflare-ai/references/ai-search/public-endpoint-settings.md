---
source: https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/
---

# Public endpoint settings

Expose an instance (or namespace) through unauthenticated `/mcp`, `/chat/completions`, and `/search` endpoints.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/ai-search/api/search/public-endpoint/

```bash
curl https://<PUBLIC_ENDPOINT_ID>.search.ai.cloudflare.com/search \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {
        "content": "How do I configure AI Search?",
        "role": "user"
      }
    ]
  }'
```

Tool description example:

```txt
Search the Acme product documentation for information about
installation, configuration, API references, and troubleshooting
guides. Use this tool when users ask questions about how to set up
or use Acme products.
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Requests per period | number | `120` | Rate limit across all enabled public endpoints. |
| Time period | duration | 1 minute | Rate limit window. |
| Period type | string | `fixed` | `fixed` or `sliding`. |
| Authorized hosts | hostnames | website: source domain; others: `*` | CORS allowed origins. |
| Tool Description | text | `Finds exactly what you're looking for` | MCP tool description. |
| Per-endpoint toggles | booleans | — | Enable `/mcp`, `/chat/completions`, `/search` independently (dashboard **Settings** > **Public Endpoints**). |

## Notes

- Hostname is generated on first enable (`<PUBLIC_ENDPOINT_ID>.search.ai.cloudflare.com`, or `ns-<id>` for namespaces) and never rotated; disabling keeps the ID.
- CORS is a browser control, not access control; `curl` and scripts ignore it.
- No authentication: anyone with the URL can query. For restriction use a custom domain with Cloudflare Access. If left open: only index public-safe content, set rate limits, disable unused endpoints such as `/mcp`, monitor usage.
- Corresponding errors: `60003`-`60009`, `60005` rate limited.

## Related

- [Custom domains and Cloudflare Access](./custom-domains-and-access.md)
- [Namespace public endpoints](./namespace-public-endpoints.md)
- [UI snippets](./ui-snippets.md)
- [Public endpoint usage](./public-endpoint-usage.md)
