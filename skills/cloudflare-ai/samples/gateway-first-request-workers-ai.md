---
source: https://developers.cloudflare.com/ai-gateway/tutorials/create-first-aig-workers/
---

# First AI Gateway request to Workers AI

Send a chat completion to Workers AI through an AI Gateway named `default` using the REST API.

## Signature / Usage

Create the gateway first (dashboard: AI > AI Gateway > Create Gateway), then export the credentials as environment variables and call the OpenAI-compatible endpoint with the `cf-aig-gateway-id` header.

```bash
# Run `wrangler whoami` to get your account ID to replace $CLOUDFLARE_ACCOUNT_ID,
# and `wrangler auth token` to get an auth token to replace $CLOUDFLARE_API_TOKEN.
curl -X POST "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions" \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "cf-aig-gateway-id: default" \
  --header "Content-Type: application/json" \
  --data '{
    "model": "@cf/moonshotai/kimi-k2.6",
    "messages": [{"role": "user", "content": "What is Cloudflare?"}]
  }'
```

## Notes

- To create the gateway through the API instead of the dashboard, use an API token with `AI Gateway - Read` and `AI Gateway - Edit` permissions.
- The Workers AI billing mode (Standard or Unified) is chosen when the gateway is created.
- Keep the API token in an environment variable or secret store; do not paste it into shell history or commit it.
- Request counts, token usage, cache efficiency, errors, and estimated cost appear under the gateway in the dashboard.

## Related

- [REST API usage](../references/ai-gateway/usage-rest-api.md)
- [Authenticated gateway](../references/ai-gateway/configuration-authentication.md)
- [Logging](../references/ai-gateway/observability-logging.md)
