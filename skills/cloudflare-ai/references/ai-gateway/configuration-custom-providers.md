---
source: https://developers.cloudflare.com/ai-gateway/configuration/custom-providers/
---

# Custom Providers

Register providers not natively supported (internal, regional, or self-hosted models with an HTTPS API) so they get AI Gateway observability, caching, and rate limiting.

## Signature / Usage

Create a provider (token needs `AI Gateway - Edit`):

```bash
# Run `wrangler whoami` to get your account ID to replace $CLOUDFLARE_ACCOUNT_ID,
# and `wrangler auth token` to get an auth token to replace $CLOUDFLARE_API_TOKEN.
curl -X POST "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/custom-providers" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My Custom Provider",
    "slug": "some-provider",
    "base_url": "https://api.myprovider.com",
    "description": "Custom AI provider for internal models",
    "enable": true
  }'
```

Route through the provider-specific endpoint (slug must be prefixed with `custom-`):

```bash
# Run `wrangler auth token` to get an auth token to replace $CF_AIG_TOKEN for use with the API.
curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/custom-some-provider/v1/chat/completions \
  -H "Authorization: Bearer $PROVIDER_API_KEY" \
  -H "cf-aig-authorization: Bearer $CF_AIG_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "model-name",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'
```

Or through the Unified API (`/compat`) for OpenAI-compatible providers:

```bash
curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat/chat/completions \
  -H "Authorization: Bearer $PROVIDER_API_KEY" \
  -H "cf-aig-authorization: Bearer $CF_AIG_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "custom-some-provider/model-name",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'
```

## Options / Props

### Create / update fields (`.../ai-gateway/custom-providers`; update is `PATCH .../custom-providers/{provider_id}`, all fields optional)

| Name | Type | Default | Description |
|------|------|---------|-------------|
| name | string | — | Display name (required on create) |
| slug | string | — | Unique identifier, alphanumeric with hyphens, unique in the account (required on create) |
| base_url | string | — | HTTPS URL; must start with `https://` (required on create) |
| description | string | — | Description |
| link | string | — | URL to provider documentation |
| enable | boolean | `false` | Whether the provider is active |
| beta | boolean | `false` | Mark as beta |
| curl_example | string | — | Example cURL command |
| js_example | string | — | Example JavaScript code |

### List query parameters (`GET .../custom-providers`)

| Name | Type | Default | Description |
|------|------|---------|-------------|
| page | number | `1` | Page number |
| per_page | number | `20` | Items per page (max `100`) |
| enable | boolean | — | Filter by enabled status |
| beta | boolean | — | Filter by beta status |
| search | string | — | Search in id, name, or slug |
| order_by | string | `"name ASC"` | Sort field and direction |

### Other operations

| Operation | Request |
|-----------|---------|
| Get | `GET .../custom-providers/{provider_id}` |
| Delete | `DELETE .../custom-providers/{provider_id}` |

### Unified API vs provider-specific endpoint

| | Unified API (`/compat`) | Provider-specific endpoint |
|---|---|---|
| Best for | OpenAI-compatible APIs | Any API structure |
| Request format | OpenAI `/chat/completions` schema | Provider's native format |
| Path control | Fixed to `/compat/chat/completions` | Full control of upstream path |
| Provider selection | `model`: `custom-{slug}/{model-name}` | URL path `/custom-{slug}/{path}` |

## Notes

- URL formula: gateway `.../custom-{slug}/{provider-path}` maps to upstream `{base_url}/{provider-path}`. Put only the root domain (or a fixed prefix) in `base_url`; API path segments go in the request URL. Example: `base_url` `https://api.custom-ai.com` and request path `/custom-custom-ai/api/coding/paas/v4/chat/completions` reaches `https://api.custom-ai.com/api/coding/paas/v4/chat/completions`.
- With the OpenAI SDK, set `base_url` to `https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/custom-alt-provider/v1`; the SDK appends `/chat/completions`.
- Common 404 cause: `/v1` present in both `base_url` and request path (upstream sees `/v1/v1/...`).
- Errors: 409 duplicate slug (code 1003), 404 provider not found (1004), 400 invalid `base_url` (1002; HTTP is not supported).
- Updates and deletion invalidate cached entries for the provider; deleting immediately stops requests routed through it.
- Limitations: account-specific; HTTPS only; unique slugs per account; cache and rate limiting apply to the provider globally, not per model. A logo SVG is generated automatically.
- Dashboard: Compute & AI > AI Gateway > Custom Providers.
- Best practices: test with `enable: false` first, store provider keys with BYOK rather than sending them in every request, and keep keys in environment variables or secret bindings.
- Provider API schemas themselves belong to openai-api-core, anthropic-api-core, or google-gemini-api; this page covers only gateway routing.

## Related

- [configuration-bring-your-own-keys.md](./configuration-bring-your-own-keys.md)
- [configuration-authentication.md](./configuration-authentication.md)
- [usage-chat-completion.md](./usage-chat-completion.md)
- [features-dynamic-routing.md](./features-dynamic-routing.md)
