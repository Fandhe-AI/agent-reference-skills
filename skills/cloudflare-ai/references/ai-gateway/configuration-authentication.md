---
source: https://developers.cloudflare.com/ai-gateway/configuration/authentication/
---

# Authenticated Gateway

Require a valid Cloudflare API token on every request to a gateway, preventing unauthorized access and log-storage inflation from invalid requests. New gateways require authentication; existing gateways with it off can continue without it or turn it on, and once on it cannot be turned off.

## Signature / Usage

REST API (`api.cloudflare.com`) uses the standard `Authorization` header:

```bash
# Run `wrangler whoami` to get your account ID to replace $CLOUDFLARE_ACCOUNT_ID,
# and `wrangler auth token` to get an auth token to replace $CLOUDFLARE_API_TOKEN.
curl -X POST "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions" \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{"model": "openai/gpt-4.1-mini", "messages": [{"role": "user", "content": "What is Cloudflare?"}]}'
```

## Options / Props

### Endpoint to header

| Endpoint | Header |
|----------|--------|
| REST API (`/ai/run`, `/ai/v1/...`) | `Authorization: Bearer <Cloudflare API token>` |
| Provider-native `gateway.ai.cloudflare.com` | `cf-aig-authorization: Bearer <token>` |

### Behavior matrix

| Authentication setting | Header | Gateway state | Response |
|------------------------|--------|---------------|----------|
| On | present | Authenticated | Request succeeds |
| On | absent | Error | Fails (missing authorization) |
| Off | present | Unauthenticated | Succeeds |
| Off | absent | Unauthenticated | Succeeds |

### Configure through the API

| Operation | `authentication` field | Result |
|-----------|------------------------|--------|
| Create gateway | omitted | Defaults to `true` |
| Create gateway | `false` | HTTP `400` |
| Update gateway | omitted | Current setting preserved |
| Update gateway | `true` | Turned on permanently |
| Update gateway (authentication already on) | `false` | HTTP `400` with `Authentication cannot be disabled once enabled.` |
| Update gateway (existing unauthenticated gateway) | `false` | Accepted; does not allow turning authentication off after it is on |

## Notes

- Source: https://developers.cloudflare.com/ai-gateway/configuration/authentication/ and https://developers.cloudflare.com/changelog/ai-gateway/2026-11-03-required-authentication/ (pin 34d908a / fetched 2026-11-14). The **Off** row of the behavior matrix applies only to existing gateways that have not enabled authentication. Before turning authentication on for an existing gateway, configure HTTP clients to send a valid Cloudflare API token.
- Dashboard setup: gateway **Settings** (authentication is already required for new gateways) > **Create authentication token** (generates a token with `Run` permission; shown once, store it securely) > include it in requests > for an existing gateway with authentication off, turn on **Authenticated Gateway** (it cannot be turned off again).
- `gateway.ai.cloudflare.com` endpoints continue to work; for new integrations the REST API at `api.cloudflare.com` is recommended.
- Account-scoped tokens: `AI Gateway Read`, `Run`, and `Edit` cannot be restricted to a single gateway. Any token with `AI Gateway Run` can send requests through every gateway in the account, including gateways with stored BYOK provider keys. For isolation between gateways or tenants, use separate Cloudflare accounts or a Worker-side AI Gateway binding.
- Requests made through a Workers binding are pre-authenticated within the account; `cf-aig-authorization` need not be added.
- OpenAI SDK usage: set `apiKey` to the Cloudflare API token (read it from an environment variable or secret, not source) and `baseURL` to `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/ai/v1`. The same `baseURL`/`apiKey` pattern applies to `createOpenAI` from the Vercel AI SDK (see the vercel-ai-sdk skill).

## Related

- [configuration-bring-your-own-keys.md](./configuration-bring-your-own-keys.md)
- [usage-rest-api.md](./usage-rest-api.md)
- [integrations-workers-ai-binding.md](./integrations-workers-ai-binding.md)
- [configuration-cloudflare-access.md](./configuration-cloudflare-access.md)
