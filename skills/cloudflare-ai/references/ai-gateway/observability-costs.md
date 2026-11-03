---
source: https://developers.cloudflare.com/ai-gateway/observability/costs/
---

# Costs

Estimated token-based cost metrics across AI providers. Available only for endpoints whose responses return token data and the model name.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/ai-gateway/configuration/custom-costs/

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

## Notes

- Use cost metrics to compare providers, monitor trends, and apply custom pricing for negotiated rates.
- The metric is an estimate from token counts; the provider's dashboard is authoritative.
- If a provider adds a new model or changes pricing and cost data is outdated or missing, Cloudflare asks users to submit a request via the form linked from the official page.
- Custom costs override default or public model costs per request.

## Related

- [configuration-custom-costs.md](./configuration-custom-costs.md)
- [observability-analytics.md](./observability-analytics.md)
- [features-spend-limits.md](./features-spend-limits.md)
