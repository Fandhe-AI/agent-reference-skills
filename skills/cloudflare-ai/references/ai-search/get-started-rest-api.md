---
source: https://developers.cloudflare.com/ai-search/get-started/api/
---

# Get started: REST API

Create instances, upload content, check indexing, and query using HTTP.

## Signature / Usage

Requires an API token with Account > AI Search:Edit and AI Search:Run. Export it rather than pasting it into commands (keep it out of shell history and source control):

Adapted (not in the official docs): credentials come from environment variables instead of inline placeholders; see Notes.

```bash
export CLOUDFLARE_ACCOUNT_ID="<ACCOUNT_ID>"
export CLOUDFLARE_API_TOKEN="<API_TOKEN>"

# 1. Create an instance (built-in storage)
curl -X POST "https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/ai-search/namespaces/default/instances" \
  -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
  -H "Content-Type: application/json" \
  --data '{ "id": "my-instance" }'

# 2. Upload a file
curl -X POST "https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/ai-search/namespaces/default/instances/my-instance/items" \
  -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
  -F "file=@/path/to/your/file.pdf"

# 3. Check indexing status
curl "https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/ai-search/namespaces/default/instances/my-instance/stats" \
  -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}"

# 4. Search
curl "https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/ai-search/namespaces/default/instances/my-instance/search" \
  -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"content":"How do I get started?","role":"user"}]}'
```

Connect a data source at creation time:

```json
{ "id": "my-instance", "type": "web-crawler", "source": "example.com" }
```

```json
{ "id": "my-instance", "type": "r2", "source": "<R2_BUCKET_NAME>", "token_id": "<SERVICE_TOKEN_ID>" }
```

## Notes

- Adapted from the official docs: the source uses `<ACCOUNT_ID>` / `<API_TOKEN>` placeholders inline; this page uses environment variables so the token is not typed into argv literals. Endpoints and payloads are unchanged.
- The first R2-backed instance on an account needs `token_id`; see service-api-token.md.
- Search before indexing finishes can return no chunks; poll `stats`.

## Related

- [REST API: instances and items](./rest-api-instances-items.md)
- [REST API: search and chat](./rest-api-search.md)
- [Service API token](./service-api-token.md)
