---
source: https://developers.cloudflare.com/ai-search/api/search/rest-api/
---

# REST API: search and chat completions

Query an instance over HTTP with an OpenAI-compatible `messages` format. Search returns chunks; chat completions retrieves and generates.

## Signature / Usage

```bash
curl -X POST "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/ai-search/namespaces/default/instances/<INSTANCE_NAME>/search" \
  -H "Authorization: Bearer <API_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {
        "content": "What is Cloudflare?",
        "role": "user"
      }
    ]
  }'
```

Chat completions (same body, `/chat/completions`):

```bash
curl -X POST "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/ai-search/namespaces/default/instances/<INSTANCE_NAME>/chat/completions" \
  -H "Authorization: Bearer <API_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {
        "content": "What is Cloudflare?",
        "role": "user"
      }
    ]
  }'
```

Image query:

```bash
curl -X POST "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/ai-search/namespaces/default/instances/<INSTANCE_NAME>/search" \
  -H "Authorization: Bearer <API_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [{
      "role": "user",
      "content": [{
        "type": "image_url",
        "image_url": { "url": "https://example.com/product.png" }
      }]
    }]
  }'
```

Cross-instance search at namespace level:

```bash
curl -X POST "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/ai-search/namespaces/<NAMESPACE>/search" \
  -H "Authorization: Bearer <API_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {
        "role": "user",
        "content": "What is Cloudflare?"
      }
    ],
    "ai_search_options": {
      "instance_ids": ["product-docs", "customer-abc123"]
    }
  }'
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `messages` | array | — | Message objects; `content` may be a string or parts (`text`, `image_url`, `file`). |
| `query` | string | — | Search endpoint also accepts a plain `query`. |
| `stream` | boolean | — | Chat completions SSE; chunks event first. |
| `ai_search_options.instance_ids` | string[] | — | Namespace-level endpoints only. |

## Notes

- Image `image_url` must be `https://` or `data:image/<subtype>;base64,...`. Response `query_kind` is `image`; image-only responses omit `search_query`. Native image embedding needs `@cf/qwen/qwen3-vl-embedding-2b` or `google-ai-studio/gemini-embedding-2`; text-only embedding models caption the image first.
- Other `ai_search_options` fields match the Workers binding (see search.md).
- Public (unauthenticated) variants: public-endpoint-usage.md.

## Related

- [search()](./search.md)
- [chatCompletions()](./chat-completions.md)
- [Public endpoint usage](./public-endpoint-usage.md)
