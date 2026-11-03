---
source: https://developers.cloudflare.com/ai-gateway/reference/troubleshooting/
---

# Troubleshooting

Common AI Gateway issues: authentication errors, provider-credential errors, request failures, and caching surprises.

## Signature / Usage

Anthropic Messages needs the provider key in `x-api-key` while the Cloudflare token goes in `cf-aig-authorization`:

Snippet taken from https://developers.cloudflare.com/ai-gateway/configuration/bring-your-own-keys/ (BYOK request; remove provider headers when the key is stored)

```bash
curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/openai/chat/completions \
  -H 'cf-aig-authorization: Bearer {CF_AIG_TOKEN}' \
  -H "Content-Type: application/json" \
  -d '{"model": "gpt-4", "messages": [...]}'
```

## Options / Props

### Error codes seen in this skill

| Code | Meaning | Where |
|------|---------|-------|
| 400 / 2044 | `Customer-provided provider credentials are required for this request` | Unified Billing fallback blocked and no credentials found |
| 2016 / 2017 | Prompt / response blocked by Guardrails | [features-guardrails.md](./features-guardrails.md) |
| 2029 / 2030 | Request / response blocked by DLP | [features-dlp.md](./features-dlp.md) |
| 429 | Rate limit or spend limit exceeded; Unified Billing rate limit | rate-limiting, spend limits, limits |

## Notes

- 401 or unauthenticated from the provider: AI Gateway did not pass valid credentials upstream. On provider-native endpoints put the Cloudflare token in `cf-aig-authorization` and supply provider credentials in the format recognized for that provider (Anthropic Messages: `x-api-key`; OpenAI: `Authorization: Bearer`). Provider-specific endpoints need the provider path in the URL (e.g. `/openai/`, `/google-vertex-ai/`); the unified `/compat/chat/completions` endpoint needs the provider prefix in `model` (e.g. `openai/gpt-4o`). With multiple BYOK keys, use alias `default` or send `cf-aig-byok-alias`; confirm in the dashboard that credentials saved.
- Error 2044 occurs when **Require provider credentials** is on or `cf-aig-no-wholesale: true` is sent and no request or stored credentials apply. Fix by supplying a recognized provider key, or verifying gateway authentication and the BYOK alias.
- Timeouts: check provider health; consider Dynamic Routing fallbacks; review rate limiting. Provider errors: verify keys directly with the provider, check its status page, read AI Gateway logs.
- Not cached: confirm caching is enabled and the request is cacheable; streaming responses are not cached by default. Unexpected hits/misses: review TTL, `cf-aig-skip-cache`, and custom `cf-aig-cache-key` usage.
- Vertex AI specifics: [usage-providers-anthropic-bedrock-vertex-gemini.md](./usage-providers-anthropic-bedrock-vertex-gemini.md). DLP troubleshooting: see [features-dlp.md](./features-dlp.md).

## Related

- [configuration-bring-your-own-keys.md](./configuration-bring-your-own-keys.md)
- [features-unified-billing.md](./features-unified-billing.md)
- [features-caching.md](./features-caching.md)
- [observability-logging.md](./observability-logging.md)
