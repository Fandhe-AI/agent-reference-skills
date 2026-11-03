---
source: https://developers.cloudflare.com/ai-gateway/configuration/bring-your-own-keys/
---

# BYOK (Store Keys)

Store provider API keys with Cloudflare (Secrets Store) once and reference them from the gateway, so requests need no provider key.

## Signature / Usage

```bash
curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/openai/chat/completions \
  -H 'cf-aig-authorization: Bearer {CF_AIG_TOKEN}' \
  -H "Content-Type: application/json" \
  -d '{"model": "gpt-4", "messages": [...]}'
```

Select a non-default stored key with an alias:

```bash
# Uses the key with alias "production"
curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/openai/chat/completions \
  -H 'cf-aig-authorization: Bearer {CF_AIG_TOKEN}' \
  -H 'cf-aig-byok-alias: production' \
  -H "Content-Type: application/json" \
  -d '{"model": "gpt-4", "messages": [...]}'
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| cf-aig-byok-alias | request header | `default` | Alias of the stored key to use (direct provider-passthrough requests) |
| Secrets Store secret name (API setup) | string | — | Must be `{gateway_id}_{provider_slug}_{alias}`, e.g. `my-gateway_anthropic_default` |

## Notes

- Prerequisites: the gateway is authenticated; you have permission to create and deploy secrets in Secrets Store.
- Dashboard: AI > AI Gateway > gateway > **Provider Keys** > **Add API Key** (provider, key, optional description). AI Gateway creates and names the secret automatically.
- API setup: create the Secrets Store secret first using the naming format above, then create the provider configuration with the same `provider_slug` and `alias`. The returned `secret_id` is not used for runtime lookup, so the naming convention is required.
- Remove provider authorization headers from requests: the stored key is substituted only when the provider authorization header is absent. A header you send is forwarded as-is, and placeholder values cause a provider authentication error. `cf-aig-authorization` is still required.
- Multiple keys per provider with aliases; unspecified requests use alias `default`. On Unified Billing endpoints (e.g. `env.AI.run()` or `/ai/v1/chat/completions`) only the `default` alias is consulted; if missing, the request falls through to Unified Billing.
- Rotation: edit the key entry in the dashboard; applications switch immediately. Deleting a key immediately stops requests that depend on it.
- Stored keys enable rate/budget limits via Dynamic Routing. Because AI Gateway tokens are account-scoped, any token with `Run` can consume stored keys of every gateway in the account.
- The "traditional" approach of sending `Authorization: Bearer <provider key>` per request still works; keep that key in a secret binding or environment variable, not in code.

## Related

- [configuration-authentication.md](./configuration-authentication.md)
- [features-unified-billing.md](./features-unified-billing.md)
- [features-dynamic-routing.md](./features-dynamic-routing.md)
- [usage-providers-overview.md](./usage-providers-overview.md)
