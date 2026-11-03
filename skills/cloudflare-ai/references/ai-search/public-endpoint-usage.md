---
source: https://developers.cloudflare.com/ai-search/api/search/public-endpoint/
---

# Public endpoint usage

Call `/search`, `/chat/completions`, and `/mcp` without authentication from a generated hostname or a custom domain.

## Signature / Usage

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

```bash
curl https://<PUBLIC_ENDPOINT_ID>.search.ai.cloudflare.com/chat/completions \
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

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `<PUBLIC_ENDPOINT_ID>.search.ai.cloudflare.com` | hostname | — | Serves a single instance. |
| `ns-<NAMESPACE_ENDPOINT_ID>.search.ai.cloudflare.com` | hostname | — | Serves a namespace, searching several instances. |
| `/search` | path | — | Chunks without generation. |
| `/chat/completions` | path | — | OpenAI-compatible chat. |
| `/mcp` | path | — | MCP endpoint. |

## Notes

- Enable under dashboard **Settings** > **Public Endpoint**. Request and response formats match the REST API; image queries work the same (`image_url` part, HTTPS or `data:image/...`).
- A custom hostname must belong to a zone on the same account. To require authentication, put the custom domain behind Cloudflare Access and set `default_domain_enabled` to `false`, otherwise the default hostname keeps answering unauthenticated requests.
- Anyone who knows the URL can query indexed content; only index content safe to expose.

## Related

- [Public endpoint settings](./public-endpoint-settings.md)
- [Custom domains and Cloudflare Access](./custom-domains-and-access.md)
- [MCP endpoint](./mcp.md)
- [UI snippets](./ui-snippets.md)
