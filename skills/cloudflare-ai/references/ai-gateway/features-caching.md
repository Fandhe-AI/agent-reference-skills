---
source: https://developers.cloudflare.com/ai-gateway/features/caching/
---

# Caching

Serve identical AI requests from Cloudflare's cache instead of the provider, reducing latency and cost. Disabled by default.

## Signature / Usage

```bash
# Run `wrangler whoami` to get your account ID to replace $CLOUDFLARE_ACCOUNT_ID,
# and `wrangler auth token` to get an auth token to replace $CLOUDFLARE_API_TOKEN.
# Use a key shared only by requests with equivalent responses.
curl -X POST "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions" \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --header "cf-aig-cache-key: responseWithCustomTtl" \
  --header "cf-aig-cache-ttl: 3600" \
  --data '{
    "model": "openai/gpt-4.1-mini",
    "messages": [
      {
        "role": "user",
        "content": "how to build a wooden spoon in 3 short steps? give as short as answer as possible"
      }
    ]
  }'
```

Bypass the cache for one request:

```bash
curl -X POST "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions" \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --header "cf-aig-skip-cache: true" \
  --data '{
    "model": "openai/gpt-4.1-mini",
    "messages": [{"role": "user", "content": "how to build a wooden spoon in 3 short steps?"}]
  }'
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| cf-aig-skip-cache | `true` | — | Bypass the cached copy and call the provider |
| cf-aig-cache-ttl | seconds | gateway default | Cache duration for a request already using caching; minimum 60 seconds, maximum one month |
| cf-aig-cache-key | string | — | Custom cache key; overrides the default key and opts the request into caching |
| cf-aig-cache-status | response header | — | `HIT` or `MISS` |
| cache_ttl | gateway field (API) | — | Default TTL set when creating a gateway via the API |

## Notes

- Default cache key: SHA-256 of provider, endpoint, model, provider authentication header, and full request body, i.e. exact-match of the whole request; any difference in messages, tools, or parameters yields a separate entry.
- Custom key: requests with the same key share a cached response, so choose keys that group only equivalent responses (never personalized or private content). With `cf-aig-cache-key`, TTL is the `cf-aig-cache-ttl` value, else the gateway default, else 5 minutes.
- Only text and image responses are cached, and only identical requests. Semantic caching is planned, not available.
- Cache is volatile: two identical simultaneous requests may both reach the provider.
- Default configuration: dashboard Settings > **Cache Responses**, or API `POST` creating a gateway with `cache_ttl` (token with `AI Gateway - Read` and `AI Gateway - Edit`).
- `cf-cache-ttl` and `cf-skip-cache` are deprecated names (still functional) of `cf-aig-cache-ttl` / `cf-aig-skip-cache`.
- A cache hit costs `0`.

## Related

- [header-glossary.md](./header-glossary.md)
- [configuration-custom-costs.md](./configuration-custom-costs.md)
- [features-rate-limiting.md](./features-rate-limiting.md)
