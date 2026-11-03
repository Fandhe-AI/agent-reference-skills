---
source: https://developers.cloudflare.com/ai-gateway/features/machine-payments/
---

# Machine Payments (x402)

Pay for inference on select open models from a stablecoin wallet via the x402 protocol, without a prepaid credit balance. Requires a US base and a credit card on file.

## Signature / Usage

```bash
# Run `wrangler whoami` to get your account ID to replace $CLOUDFLARE_ACCOUNT_ID,
# and `wrangler auth token` to get an auth token to replace $CLOUDFLARE_API_TOKEN.
curl -iX POST "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run" \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Payment-Method: x402" \
  --header "Content-Type: application/json" \
  --data '{
    "model": "z-ai/glm-4.7-flash",
    "input": {
      "max_tokens": 9001,
      "messages": [
        {
          "role": "user",
          "content": "What is Cloudflare?"
        }
      ]
    }
  }'
```

First response (challenge):

```http
HTTP/1.1 402 Payment Required
PAYMENT-REQUIRED: <base64-encoded payment requirements>
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Payment-Method: x402 | request header (Cloudflare-specific) | — | Negotiate payment through x402 instead of the account's billing method |
| PAYMENT-REQUIRED | response header | — | Accepted network, asset, payment scheme, and maximum authorized amount |
| PAYMENT-SIGNATURE | request header | — | Signed authorization sent on the retry |

### Eligible models

| Model |
|-------|
| `z-ai/glm-4.7-flash` |
| `google/gemma-4-26b-a4b-it` |
| `openai/gpt-oss-20b` |
| `alibaba/qwen3.8-27b` |

## Notes

- Only `POST /ai/run` is eligible. Prerequisites: credit card on file and an authenticated gateway.
- Flow: client sends request with the header; AI Gateway returns `402` with `PAYMENT-REQUIRED` (most models use the `upto` scheme, i.e. a maximum charge); the wallet signs for up to that amount; the client retries with `PAYMENT-SIGNATURE`; Cloudflare verifies, runs inference, and settles the actual cost, which cannot exceed the authorized maximum. An x402-compatible client handles the challenge and retry automatically.
- Without `Payment-Method: x402`, normal credential precedence applies and cost may be deducted from the Unified Billing balance.

## Related

- [features-unified-billing.md](./features-unified-billing.md)
- [usage-rest-api.md](./usage-rest-api.md)
