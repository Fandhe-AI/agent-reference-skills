---
source: https://developers.cloudflare.com/ai-gateway/features/rate-limiting/
---

# Rate limiting

Cap the number of requests per time window (fixed or sliding) on a gateway to prevent excessive bills and suspicious activity.

## Signature / Usage

The official page has no code; the configuration is gateway-level (dashboard Settings > **Rate-limiting**, or the gateway create API fields below).

Snippet taken from https://developers.cloudflare.com/ai-gateway/usage/rest-api/ (shows the kind of request that is subject to the gateway limit)

```bash
curl -X POST "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions" \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
    "model": "openai/gpt-4.1-mini",
    "messages": [{"role": "user", "content": "What is Cloudflare?"}]
  }'
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| rate_limiting_limit | number | — | Requests allowed per interval (API field) |
| rate_limiting_interval | number | — | Window length (API field) |
| rate_limiting_technique | fixed or sliding | — | Windowing technique (API field) |

## Notes

- Fixed window: no more than `x` requests per clock-aligned window. Sliding: no more than `x` requests in the trailing window. With 10 requests per 10 minutes, 10 requests at 12:09 plus 10 at 12:11 all succeed under fixed windows but fail under sliding.
- Exceeding the limit returns `429 Too Many Requests` and the request is not processed.
- Applied uniformly to all requests on the gateway. Set via dashboard or by creating a gateway with a `POST` (token needs `AI Gateway - Read` and `AI Gateway - Edit`).
- For cost-based limits per user/model/provider, see spend limits.

## Related

- [features-spend-limits.md](./features-spend-limits.md)
- [features-dynamic-routing.md](./features-dynamic-routing.md)
- [reference-limits.md](./reference-limits.md)
