---
source: https://developers.cloudflare.com/ai-gateway/configuration/request-handling/
---

# Request handling

Per-request timeouts and retries via `cf-aig-*` headers that work with any provider endpoint.

## Signature / Usage

```bash
# Run `wrangler whoami` to get your account ID to replace $CLOUDFLARE_ACCOUNT_ID,
# and `wrangler auth token` to get an auth token to replace $CLOUDFLARE_API_TOKEN.
curl -X POST "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions" \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --header "cf-aig-request-timeout: 5000" \
  --data '{
    "model": "openai/gpt-4.1-mini",
    "messages": [{"role": "user", "content": "What is Cloudflare?"}]
  }'
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| cf-aig-request-timeout | number (ms) | — | Return an error or trigger a retry if the first part of the response is not received in time |
| cf-aig-max-attempts | number | — | Maximum attempts (maximum of 5 tries) |
| cf-aig-retry-delay | number (ms) | — | Delay before retrying (maximum 60 seconds) |
| cf-aig-backoff | "constant" \| "linear" \| "exponential" | — | Backoff method |

## Notes

- Timeout is measured to the first part of the response, so a streaming response that starts in time is awaited.
- On the final retry attempt the gateway waits until the request completes regardless of duration.
- Dynamic routes also offer per-model timeouts and retries, conditional routing, rate limiting, and budget limiting through a visual interface. Gateway-level retries can be set in gateway settings.

## Related

- [configuration-manage-gateway.md](./configuration-manage-gateway.md)
- [features-dynamic-routing.md](./features-dynamic-routing.md)
- [header-glossary.md](./header-glossary.md)
- [usage-universal-endpoint.md](./usage-universal-endpoint.md)
