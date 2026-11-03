---
source: https://developers.cloudflare.com/ai-gateway/get-started/
---

# Getting started

Set up AI Gateway and send a first request using a Cloudflare API token and account ID.

## Signature / Usage

```bash
# Run `wrangler auth token` to get an auth token to replace $CLOUDFLARE_API_TOKEN,
# and `wrangler whoami` to replace $CLOUDFLARE_ACCOUNT_ID.
curl -X POST "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions" \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "cf-aig-gateway-id: default" \
  --header "Content-Type: application/json" \
  --data '{
    "model": "@cf/moonshotai/kimi-k2.6",
    "messages": [
      {
        "role": "user",
        "content": "What is Cloudflare?"
      }
    ]
  }'
```

## Options / Props

### Prerequisites

| Item | Requirement |
|------|-------------|
| Account ID | Found in the Cloudflare dashboard |
| API token | Permissions `AI Gateway - Read`, `AI Gateway - Edit`, `Workers AI - Read` |

### Provider authentication options

| Option | Description |
|--------|-------------|
| Unified Billing | Prepaid AI Gateway credits for Workers AI and supported third-party providers |
| BYOK (Store Keys) | Provider API keys stored with Cloudflare and added at runtime |
| Request headers | Provider key sent in headers as usual, e.g. `Authorization: Bearer <OPENAI_API_KEY>` |

### Integration options

| Option | Endpoint |
|--------|----------|
| REST API | `/ai/run` (all modalities), `/ai/v1/chat/completions` (OpenAI SDK compatible), `/ai/v1/responses` (agentic workflows) under `https://api.cloudflare.com/client/v4/accounts/{account_id}` |
| Provider-specific endpoints | `https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/{provider}` |

## Notes

- `cf-aig-gateway-id: default` routes the Workers AI request through the account's default gateway. If the gateway does not exist, AI Gateway creates it on the first authenticated request. It uses Standard billing by default; switch to Unified billing in gateway settings.
- Workers AI requests always require the `cf-aig-gateway-id` header and the `@cf/` model prefix. For third-party models, no gateway needs to be specified: `default` is used and auto-created on the first authenticated request.
- Gateways can also be created manually (dashboard: AI > AI Gateway > Create Gateway; gateway name limit is 64 characters) or via the API (token with `AI Gateway - Read` and `AI Gateway - Edit`).
- Keep API tokens in environment variables or secret bindings; never place them in URLs or committed files.

## Related

- [overview.md](./overview.md)
- [configuration-manage-gateway.md](./configuration-manage-gateway.md)
- [usage-rest-api.md](./usage-rest-api.md)
- [usage-providers-overview.md](./usage-providers-overview.md)
- [features-unified-billing.md](./features-unified-billing.md)
- [configuration-bring-your-own-keys.md](./configuration-bring-your-own-keys.md)
