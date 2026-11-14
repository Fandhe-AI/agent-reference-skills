---
source: https://developers.cloudflare.com/ai-gateway/configuration/manage-gateway/
---

# Manage gateways

Create, edit, and delete gateways via the dashboard or API; configure the auto-created default gateway, Workers AI billing, and gateway-level retries.

## Signature / Usage

Requests that omit the gateway ID use `default`, which is created on the first authenticated request:

Snippet taken from https://developers.cloudflare.com/ai-gateway/get-started/

```bash
# Run `wrangler auth token` to get an auth token to replace $CLOUDFLARE_API_TOKEN,
# and `wrangler whoami` to replace $CLOUDFLARE_ACCOUNT_ID.
curl -X POST "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions" \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "cf-aig-gateway-id: default" \
  --header "Content-Type: application/json" \
  --data '{
    "model": "@cf/moonshotai/kimi-k2.6",
    "messages": [{"role": "user", "content": "What is Cloudflare?"}]
  }'
```

## Options / Props

### Auto-created `default` gateway settings

| Setting | Default value |
|---------|---------------|
| Authentication | On |
| Log collection | On |
| Caching | Off (TTL of 0) |
| Rate limiting | Off |
| Require provider credentials | Off |
| Workers AI billing | Standard billing |

### Retry settings (Settings > Retry Requests)

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Retry count | number | — | Max retry attempts (up to 5) |
| Delay | seconds | — | Base delay between retries, 0.1 to 60 seconds |
| Backoff | Constant, Linear, Exponential | — | Strategy for subsequent retries |

### API operations (Cloudflare API, `ai_gateway` resource)

| Operation | HTTP method |
|-----------|-------------|
| Create | `POST` |
| Edit | `PUT` |
| Delete | `DELETE` |

## Notes

- Auto-creation applies only to gateway ID `default`; any other ID requires creating the gateway first. The triggering request must be authenticated (REST: `Authorization`; `gateway.ai.cloudflare.com`: `cf-aig-authorization`; Workers AI binding: account identity). If you delete the default gateway, a new authenticated request re-creates it.
- Manual creation: AI > AI Gateway > Create Gateway; name limit 64 characters; choose Workers AI Billing (Standard charges at cycle end; Unified deducts prepaid credits in real time). API creation needs a token with `AI Gateway - Read` and `AI Gateway - Edit`.
- To switch Workers AI to prepaid credits: load credits, then Settings > Workers AI Billing > Unified billing > Save. To prevent Unified Billing fallback for BYOK third-party providers, turn on **Require provider credentials**.
- Gateway-level retries suit cases where you control neither the client nor its backoff; per-request `cf-aig-*` headers override them. For cross-provider failover use dynamic routes.
- Deleting a gateway is permanent.

## Related

- [get-started.md](./get-started.md)
- [features-unified-billing.md](./features-unified-billing.md)
- [configuration-request-handling.md](./configuration-request-handling.md)
- [features-dynamic-routing.md](./features-dynamic-routing.md)
