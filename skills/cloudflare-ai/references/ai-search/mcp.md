---
source: https://developers.cloudflare.com/ai-search/api/search/mcp/, https://developers.cloudflare.com/ai-search/how-to/connect-mcp-client/
---

# MCP endpoint

Every instance (or namespace) public endpoint can serve a Model Context Protocol endpoint at `/mcp` exposing a `search` tool over indexed content.

## Signature / Usage

```bash
curl https://<PUBLIC_ENDPOINT_ID>.search.ai.cloudflare.com/mcp \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/call",
    "params": {
      "name": "search",
      "arguments": {
        "query": "How do I configure AI Search?"
      }
    }
  }'
```

MCP client configuration:

```json
{
	"mcpServers": {
		"ai-search": {
			"url": "https://<PUBLIC_ENDPOINT_ID>.search.ai.cloudflare.com/mcp"
		}
	}
}
```

Create an instance that crawls a site you own, then check progress:

```sh
npx wrangler ai-search create docs-search --type web-crawler --source developers.cloudflare.com
npx wrangler ai-search stats docs-search
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `search` | tool | — | Queries indexed content; default description `Finds exactly what you're looking for`, editable via **Tool Description**. |
| Namespace endpoint | URL | — | `https://ns-<NAMESPACE_ENDPOINT_ID>.search.ai.cloudflare.com/mcp`. |

## Notes

- Send `POST` only (non-POST returns error `60016`); include `Accept: application/json, text/event-stream`.
- To authenticate agents, use a custom domain protected by Cloudflare Access and send an Access service token as `CF-Access-Client-Id` / `CF-Access-Client-Secret` headers; header support varies by MCP client. Set `default_domain_enabled` to `false`.
- Some clients need a transport field such as `"type": "http"` on the server entry.
- Adapted from the official docs: the source guide also suggests `wrangler ai-search create docs-search --type builtin`; `builtin` is not a documented `--type` value elsewhere (omit `--type` and `--source` for built-in storage), so it is omitted here.
- Protocol itself: see the mcp-spec skill. Consuming the instance as an agent tool in code: cloudflare-agents skill (agents-sdk; https://developers.cloudflare.com/agents/).

## Related

- [Public endpoint settings](./public-endpoint-settings.md)
- [Custom domains and Cloudflare Access](./custom-domains-and-access.md)
- [Public endpoint usage](./public-endpoint-usage.md)
