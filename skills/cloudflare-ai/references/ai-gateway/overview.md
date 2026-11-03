---
source: https://developers.cloudflare.com/ai-gateway/
---

# AI Gateway Overview

AI Gateway gives visibility and control over AI applications: analytics, logging, caching, rate limiting, request retry, and model fallback. Available on all plans.

## Signature / Usage

Provider-specific endpoint pattern (original provider API schema plus AI Gateway features):

```txt
https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/{provider}
```

## Options / Props

### Feature map

| Feature | Description | Page |
|---------|-------------|------|
| Analytics | Requests, tokens, and cost metrics | [observability-analytics.md](./observability-analytics.md) |
| Logging | Insight on requests and errors | [observability-logging.md](./observability-logging.md) |
| Caching | Serve from Cloudflare cache instead of the provider | [features-caching.md](./features-caching.md) |
| Rate limiting | Limit the number of requests the application receives | [features-rate-limiting.md](./features-rate-limiting.md) |
| Retry and fallback | Resilience via retries and model fallbacks | [features-dynamic-routing.md](./features-dynamic-routing.md) |
| Providers | Workers AI, Anthropic, Google Gemini, OpenAI, Replicate, and more | [usage-providers-overview.md](./usage-providers-overview.md) |

## Notes

- Models available through AI Gateway (OpenAI, Anthropic, Google, and more) are listed at https://developers.cloudflare.com/ai/models/.
- Related products: Workers AI ([overview.md](../workers-ai/overview.md)) and Vectorize ([overview.md](../vectorize/overview.md)).
- Provider API semantics themselves are covered by the openai-api-core, anthropic-api-core, and google-gemini-api skills; this skill covers only the gateway layer in front of them.

## Related

- [get-started.md](./get-started.md)
- [header-glossary.md](./header-glossary.md)
- [configuration-manage-gateway.md](./configuration-manage-gateway.md)
