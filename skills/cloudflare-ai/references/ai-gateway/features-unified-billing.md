---
source: https://developers.cloudflare.com/ai-gateway/features/unified-billing/
---

# Unified Billing

Pay for Workers AI and supported third-party providers (OpenAI, Anthropic, Google AI Studio, and more) with prepaid Cloudflare credits and receive a single bill, with no provider keys needed.

## Signature / Usage

AI binding:

```typescript
const resp = await env.AI.run(
	"openai/gpt-4.1-mini",
	{
		messages: [{ role: "user", content: "What is Cloudflare?" }],
	},
	{
		gateway: { id: "my-gateway" },
	},
);
```

REST API:

```bash
# Run `wrangler whoami` to get your account ID to replace $CLOUDFLARE_ACCOUNT_ID,
# and `wrangler auth token` to get an auth token to replace $CLOUDFLARE_API_TOKEN.
curl -X POST "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions" \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
    "model": "openai/gpt-4.1-mini",
    "messages": [{"role": "user", "content": "What is Cloudflare?"}]
  }'
```

## Options / Props

### Request credentials recognized on provider-native endpoints

| Provider | Endpoint | Request credentials |
|----------|----------|---------------------|
| Anthropic | Messages (`/anthropic/v1/messages`) | `x-api-key: <PROVIDER_API_KEY>` |
| Anthropic | Chat completions (`/anthropic/v1/chat/completions`) | `Authorization: Bearer <PROVIDER_API_KEY>` |
| Google AI Studio | Native `:generateContent`, `:streamGenerateContent`, `:embedContent` | `key` URL query parameter |
| Google AI Studio | Chat completions | `Authorization: Bearer <PROVIDER_API_KEY>` |
| Google AI Studio | Other endpoints | `x-goog-api-key: <PROVIDER_API_KEY>` |
| Google Vertex AI | Provider-native | `Authorization: Bearer <ACCESS_TOKEN>` or service account credentials in `Authorization` |
| OpenAI, Groq, xAI | Provider-native | `Authorization: Bearer <PROVIDER_API_KEY>` |

### Gateway / request switches

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Workers AI Billing | Standard / Unified | Standard | Gateway setting; Unified deducts prepaid credits in real time |
| Require provider credentials (`byok_only: true` in the `PUT` update body) | boolean | off | Third-party requests must carry or have stored provider credentials, else `400` |
| cf-aig-no-wholesale | `true` | — | Per-request: require provider credentials; cannot relax the gateway setting |

## Notes

- Fee: 5% on credits purchased (a $100 purchase is charged $105); provider inference pricing is passed through without markup. Credits must be bought with a non-prepaid credit or debit card; PayPal, Apple Pay, and Google Pay are not supported, even when linked to a card. Add the card directly in **Billing** and set it as the primary payment method (if the primary method is PayPal, Apple Pay, or Google Pay, make the card primary). If the dashboard shows a permission notice, ask the account administrator for access to purchase credits and configure auto top-up. If prompted, complete the bank's card verification before enabling auto top-up. Balance may rarely go negative; Cloudflare then charges the card on file at the start of the following month.
- Source: https://developers.cloudflare.com/ai-gateway/features/unified-billing/ (pin 34d908a / fetched 2026-11-14).
- Prerequisites: credits loaded (dashboard AI Gateway > Credits Available > Manage > Top-up credits; optional auto top-up with threshold and amount), authenticated gateway, and Workers AI Billing set to Unified billing to use credits for Workers AI.
- Credential precedence: (1) provider key on the request (BYOK and Unified Billing not consulted), (2) stored BYOK key under the `default` alias, (3) Unified Billing if fallback is allowed. If none applies and fallback is disabled, error `2044` is returned.
- Anthropic Messages needs the key in `x-api-key`; `Authorization: Bearer` is not recognized there and does not prevent stored-key lookup or Unified Billing fallback.
- On Unified Billing endpoints (`env.AI.run()`, `/ai/v1/chat/completions`) only the `default` alias BYOK key prevents fall-through; `cf-aig-byok-alias` works only on direct provider-passthrough requests.
- Workers AI requests do not use provider credentials; Require provider credentials does not block them.
- Machine Payments (x402) is an alternative to prepaid credits: see [features-machine-payments.md](./features-machine-payments.md).
- Zero Data Retention (ZDR) routes Unified Billing traffic through provider endpoints that do not retain prompts or responses; it applies only to Unified Billing with Cloudflare-managed credentials (not BYOK) and does not control AI Gateway logging. Check the model catalog (https://developers.cloudflare.com/ai/models/) for support.
- Prepaid credits give access to Workers AI models otherwise requiring the Workers Paid plan, and higher rate limits for frontier models.

## Related

- [configuration-bring-your-own-keys.md](./configuration-bring-your-own-keys.md)
- [configuration-manage-gateway.md](./configuration-manage-gateway.md)
- [features-machine-payments.md](./features-machine-payments.md)
- [features-spend-limits.md](./features-spend-limits.md)
- [reference-troubleshooting.md](./reference-troubleshooting.md)
- [usage-rest-api.md](./usage-rest-api.md)
