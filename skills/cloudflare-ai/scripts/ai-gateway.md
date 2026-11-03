---
source: https://developers.cloudflare.com/ai-gateway/get-started/, https://developers.cloudflare.com/ai-gateway/configuration/manage-gateway/
---

# AI Gateway

Commands for sending requests through AI Gateway.

The API token needs `AI Gateway - Read`, `AI Gateway - Edit`, and `Workers AI - Read`. Wrangler flag tables belong to the cloudflare-wrangler skill.

## Signature / Usage

### Get credentials

```bash
# Run `wrangler auth token` to get an auth token to replace $CLOUDFLARE_API_TOKEN,
# and `wrangler whoami` to replace $CLOUDFLARE_ACCOUNT_ID.
```

These are the official hints; export the results as environment variables rather than pasting them into commands.

### Send a Workers AI request through the gateway

Adapted (not in the official docs): the official example only differs by quoting; `$VAR` references are wrapped in `${...}` here.

```bash
curl -X POST "https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/ai/v1/chat/completions" \
  --header "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
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

Workers AI requests always require the `cf-aig-gateway-id` header and the `@cf/` model prefix. If the `default` gateway does not exist, it is created on the first authenticated request (Standard billing).

### Send a third-party model request

Adapted (not in the official docs): the credential-hint comments are dropped (see "Get credentials") and `$VAR` references are wrapped in `${...}`. See Notes.

```bash
curl -X POST "https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/ai/v1/chat/completions" \
  --header "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
  --header "Content-Type: application/json" \
  --data '{
    "model": "openai/gpt-4.1-mini",
    "messages": [{"role": "user", "content": "What is Cloudflare?"}]
  }'
```

No gateway needs to be specified; `default` is used and auto-created. The upstream provider is paid through Unified Billing credits, a stored BYOK key, or the provider key in request headers. Endpoints: `/ai/run` (all modalities), `/ai/v1/chat/completions` (OpenAI SDK compatible), `/ai/v1/responses` (agentic workflows).

### Provider-specific endpoint URL format

```txt
https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/{provider}
```

Provider-native endpoints require a valid `cf-aig-authorization` header when the gateway has authentication on.

### Create, edit, and delete gateways (API)

The official pages describe these operations without curl examples, so no command is listed here. Use the Cloudflare API reference (`POST` create, `PUT` update, `DELETE` delete) at https://developers.cloudflare.com/api/resources/ai_gateway/ . Create needs `AI Gateway - Read` and `AI Gateway - Edit`.

> **Warning**: Deleting a gateway is permanent and cannot be undone.

## Notes

- Adapted from the official docs: `$VAR` references are wrapped in `${...}` in both REST API examples, and the third-party example omits the credential-hint comments that the "Get credentials" block already shows. Do not forward `cf-aig-authorization` or provider API keys to hosts other than `gateway.ai.cloudflare.com`.

## Related

- [Get started](../references/ai-gateway/get-started.md)
- [Manage gateway](../references/ai-gateway/configuration-manage-gateway.md)
