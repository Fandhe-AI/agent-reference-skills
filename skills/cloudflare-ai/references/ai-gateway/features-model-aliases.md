---
source: https://developers.cloudflare.com/ai-gateway/features/routing/model-aliases/, https://developers.cloudflare.com/ai-gateway/features/routing/
---

# Model aliases

Beta. A model alias is a pool of models that an application calls by one name, such as `custom/support-fast`. AI Gateway picks a model from the pool per request using a default order (with fallback) or smart routing, so models can change without updating code. Aliases belong to individual gateways.

## Signature / Usage

Call an alias on the `/ai/run` REST endpoint with `custom/<alias-name>` as the model and `cf-aig-gateway-id` to select the gateway (set `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN`; replace `my-gateway` and the alias).

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run" \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --header "cf-aig-gateway-id: my-gateway" \
  --data '{
    "model": "custom/support-fast",
    "input": {
      "messages": [
        { "role": "user", "content": "Reply with a short greeting." }
      ]
    }
  }'
```

Override the alias's routing for one request with `options.routing`:

```json
{
	"model": "custom/support-fast",
	"input": {
		"messages": [{ "role": "user", "content": "Reply with a short greeting." }]
	},
	"options": {
		"routing": {
			"algorithm": "preferred"
		}
	}
}
```

Create or replace an alias (`POST` / `PUT`; name without `custom/`):

```json
{
	"name": "support-fast",
	"models": [
		{ "model": "openai/gpt-4.1-nano", "providers": ["openai"] },
		{ "model": "anthropic/claude-sonnet-4.6", "providers": ["anthropic"] }
	],
	"routing": {
		"algorithm": "preferred"
	}
}
```

## Options / Props

### Routing algorithm

| Algorithm | Behavior |
|-----------|----------|
| `preferred` (Default order) | Try eligible models from top to bottom until one responds |
| `smart` (Smart routing) | Choose a model for each request; if models cannot be ranked, the gateway uses the default order |

### Management API

Path prefix `/client/v4/accounts/{account_id}/ai-gateway/gateways/{gateway_id}`; requires AI Gateway permissions (not the Workers AI permission used for inference).

| Method | Path suffix | Operation |
|--------|-------------|-----------|
| `GET` | `/model_aliases` | List aliases |
| `POST` | `/model_aliases` | Create an alias |
| `GET` | `/model_aliases/{alias_id}` | Get an alias |
| `PUT` | `/model_aliases/{alias_id}` | Replace an alias |
| `DELETE` | `/model_aliases/{alias_id}` | Delete an alias |

### Limits and errors

- Up to 100 aliases per gateway; 1 to 50 model entries per alias.
- Names are unique per gateway, 1-64 characters: lowercase letters and numbers, optionally separated by a single `.`, `_`, or `-` (`support-fast` is valid; `Support Fast`, `support--fast`, `support-` are not).
- An alias cannot reference another `custom/` alias; models must support a shared protocol format; aliases do not support x402 payments.

| Response | Meaning | Action |
|----------|---------|--------|
| `404` with `Model not found` | The selected gateway has no alias with that name | Check the alias name, `custom/` prefix, and gateway ID |
| `400` with `has no available models` | No alias target resolves to an available protocol-compatible model | Check exact catalog model IDs and provider restrictions |
| `503` with `Model aliases are temporarily unavailable` | The gateway cannot read the alias configuration | Retry the request |

## Notes

- Source: https://developers.cloudflare.com/ai-gateway/features/routing/model-aliases/ (pin 34d908a / fetched 2026-11-14); changelog https://developers.cloudflare.com/changelog/ai-gateway/2026-11-04-model-aliases/.
- Dashboard: gateway > **Routing** > **Create alias**; enter a name (the dashboard adds `custom/`), pick models (drag to order; **Add model** for fallbacks), choose a routing algorithm. Renaming changes the name the application must request. Config changes can take time to reach other locations; a request may use a cached alias configuration while it refreshes.
- Prerequisites: a gateway with authentication on, plus Unified Billing or stored provider keys for the models. Calling the REST API needs a Cloudflare API token with **Account** > **Workers AI** > **Read**, which differs from the AI Gateway permissions used to manage aliases. Not every catalog model is available as an alias target.
- Routing options supplied with a request override the alias's saved algorithm. Only models and providers that support the request format and pass gateway checks are eligible; fallback does not bypass authentication, billing, or gateway policies.
- `PUT` replaces the whole configuration; include every model and provider restriction to keep. Omitting `routing`, or setting it to `null` or `{}`, clears routing preferences. Each model's optional `providers` list restricts its providers and sets their order (API only; the dashboard selects models only).
- An alias does not make model-specific input formats interchangeable. For conditional branches, percentage splits, or limits use dynamic routes instead; for catalog-wide automatic selection use Auto Router (`cloudflare/auto`).
- Provider model semantics belong to openai-api-core, anthropic-api-core, google-gemini-api.

## Related

- [features-dynamic-routing.md](./features-dynamic-routing.md)
- [features-auto-router.md](./features-auto-router.md)
- [usage-rest-api.md](./usage-rest-api.md)
- [configuration-authentication.md](./configuration-authentication.md)
- [features-unified-billing.md](./features-unified-billing.md)
