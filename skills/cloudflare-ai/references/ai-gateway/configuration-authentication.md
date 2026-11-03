---
source: https://developers.cloudflare.com/ai-gateway/configuration/authentication/
---

# Authenticated Gateway

Require a valid Cloudflare API token on every request to a gateway, preventing unauthorized access and log-storage inflation from invalid requests.

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

## Notes

- Dashboard setup: gateway Settings > **Create authentication token** (generates a token with `Run` permission; shown once, store it securely) > include it in requests > toggle on Authenticated Gateway.
- `gateway.ai.cloudflare.com` endpoints continue to work; for new integrations the REST API at `api.cloudflare.com` is recommended.
- Account-scoped tokens: `AI Gateway Read`, `Run`, and `Edit` cannot be restricted to a single gateway. Any token with `AI Gateway Run` can send requests through every gateway in the account, including gateways with stored BYOK provider keys. For isolation between gateways or tenants, use separate Cloudflare accounts or a Worker-side AI Gateway binding.
- Requests made through a Workers binding are pre-authenticated within the account; `cf-aig-authorization` need not be added.
- OpenAI SDK usage: set `apiKey` to the Cloudflare API token (read it from an environment variable or secret, not source) and `baseURL` to `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/ai/v1`. The same `baseURL`/`apiKey` pattern applies to `createOpenAI` from the Vercel AI SDK (see the vercel-ai-sdk skill).

## Related

- [configuration-bring-your-own-keys.md](./configuration-bring-your-own-keys.md)
- [usage-rest-api.md](./usage-rest-api.md)
- [integrations-workers-ai-binding.md](./integrations-workers-ai-binding.md)
- [configuration-cloudflare-access.md](./configuration-cloudflare-access.md)
