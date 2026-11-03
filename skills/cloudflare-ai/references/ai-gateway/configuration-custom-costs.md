---
source: https://developers.cloudflare.com/ai-gateway/configuration/custom-costs/
---

# Custom costs

Override default or public model costs per request with the `cf-aig-custom-cost` header to reflect negotiated rates.

## Signature / Usage

Negotiated prices in this example: $1 per million input tokens, $2 per million output tokens, $0.10 per million cache-read tokens, $0.50 per million cache-write tokens.

```bash
curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/openai/chat/completions \
  --header "Authorization: Bearer $TOKEN" \
  --header 'Content-Type: application/json' \
  --header 'cf-aig-custom-cost: {"per_token_in":0.000001,"per_token_out":0.000002,"per_cache_read_token":0.0000001,"per_cache_write_token":0.0000005}' \
  --data ' {
        "model": "gpt-4o-mini",
        "messages": [
          {
            "role": "user",
            "content": "When is Cloudflare’s Birthday Week?"
          }
        ]
      }'
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| per_token_in | number | — | Cost per input token |
| per_token_out | number | — | Cost per output token |
| per_cache_read_token | number | — | Cost per cache-read token |
| per_cache_write_token | number | — | Cost per cache-write token |

## Notes

- Applies only to requests whose responses include token counts; otherwise no cost is calculated.
- No limit on decimal places.
- Cache-token pricing is optional; specify at least one cache rate to enable it. If only one is given the other defaults to `per_token_in`. If both are omitted, cache-token counts are ignored.
- Providers report cache usage either inclusive of input tokens or separately; AI Gateway accounts for each to avoid double-counting. Example (inclusive): 1,000 input, 600 cache-read, 200 cache-write, 100 output tokens gives 200 fresh input tokens (`1,000 - 600 - 200`), each priced with its own rate.
- Custom costs appear underlined in logs.
- A cache hit always costs `0`, even with a custom cost; custom costs apply only when the request reaches the provider.
- Pass the gateway/provider token from an environment variable (`$TOKEN`), not literally.

## Related

- [observability-costs.md](./observability-costs.md)
- [features-caching.md](./features-caching.md)
- [header-glossary.md](./header-glossary.md)
