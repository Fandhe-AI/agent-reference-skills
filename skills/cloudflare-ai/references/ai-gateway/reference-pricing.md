---
source: https://developers.cloudflare.com/ai-gateway/reference/pricing/
---

# Pricing

AI Gateway is available on all plans; core features (dashboard analytics, caching, rate limiting) are free. Logs, DLP, Guardrails, Unified Billing, and Logpush have the terms below. Prices are subject to change.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/ai-gateway/get-started/

```bash
# Run `wrangler auth token` to get an auth token to replace $CLOUDFLARE_API_TOKEN,
# and `wrangler whoami` to replace $CLOUDFLARE_ACCOUNT_ID.
curl -X POST "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions" \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "cf-aig-gateway-id: default" \
  --header "Content-Type: application/json" \
  --data '{
    "model": "@cf/moonshotai/kimi-k2.6",
    "messages": [{"role": "user", "content": "What is Cloudflare?"}]
  }'
```

## Options / Props

| Item | Pricing / limit |
|------|-----------------|
| Logs, first gateway on or after September 24, 2026 | Workers Logs pricing and retention |
| Legacy Logs, Workers Free | 100,000 logs total across all gateways |
| Legacy Logs, Workers Paid | 10,000,000 logs per gateway |
| DLP scanning | Free on all plans; without a Zero Trust subscription, two predefined profiles (Financial Information; Social / Insurance / National Identifier Numbers) |
| DLP with Zero Trust DLP subscription | All predefined, custom, integration profiles, datasets, and OCR available |
| Guardrails | Billed as Workers AI token-based inference for `@cf/meta/llama-guard-3-8b`; scales with prompt/response length |
| Unified Billing | 5% fee on credits purchased ($100 purchase is charged $105); provider inference passed through with no markup; credit card only |
| Logpush | Per Logpush pricing, by volume exported and transformed |

## Notes

- Enterprise customers should confirm pricing with their account team.
- Legacy Logs storage behavior: see [observability-legacy-logs.md](./observability-legacy-logs.md).

## Related

- [features-unified-billing.md](./features-unified-billing.md)
- [features-guardrails.md](./features-guardrails.md)
- [features-dlp.md](./features-dlp.md)
- [observability-logpush.md](./observability-logpush.md)
- [reference-limits.md](./reference-limits.md)
