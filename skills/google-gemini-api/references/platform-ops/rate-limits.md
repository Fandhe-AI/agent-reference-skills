---
source: https://ai.google.dev/gemini-api/docs/rate-limits
---

# Rate limits

Rate limits regulate the number of requests to the Gemini API within a timeframe. Active limits are shown in Google AI Studio (`https://aistudio.google.com/rate-limit`).

## Signature / Usage

Source page has no code; spend-based limits and usage tiers from the page:

```text
| Usage tier | Spend rate limit (per 10 minutes) |
|---|---|
| Free | N/A |
| Tier 1 | $10 |
| Tier 2 | $50 |
| Tier 3 | $200 |
```

## Options / Props

Dimensions: requests per minute (RPM), tokens per minute input (TPM), requests per day (RPD). Exceeding any one triggers a rate limit error. Image models also have images per minute (IPM); some models have a tokens per day (TPD) limit.

Usage tiers:

| Usage tier | Qualification | Billing tier cap |
|---|---|---|
| Free | Active project or free trial | N/A |
| Tier 1 | Set up and link an active billing account | $250 |
| Tier 2 | Paid $100 + 3 days from first successful payment | $2,000 |
| Tier 3 | Paid $1,000 + 30 days from first successful payment | $20,000 - $100,000+ |

Batch API limits (separate from non-batch calls):

| Limit | Value |
|---|---|
| Concurrent batch requests | 100 |
| Input file size limit | 2GB |
| File storage limit | 20GB |
| Enqueued tokens per model | per-tier tables (e.g. Tier 1 Gemini 3.8 Flash 3,000,000; Tier 2 400,000,000; Tier 3 1,000,000,000) |

Other tier tables on the page list per-model batch enqueued tokens for Tier 1 / 2 / 3 (e.g. Gemini 4 Argon 5,000,000 / 500,000,000 / 1,000,000,000; Gemini Embedding 500,000 / 5,000,000 / 10,000,000).

## Notes

- `RESOURCE_EXHAUSTED` is the status name used by this page; the Interactions API reports 429 with snake_case codes such as `rate_limit_exceeded` or `quota_exceeded` (see api-errors.md).
- Limits apply per project, not per API key. RPD quotas reset at midnight Pacific time.
- Limits vary by model; experimental and preview models are more restricted. Specified limits are not guaranteed.
- Spend-based limits use a rolling 10-minute window; exceeding returns `429 RESOURCE_EXHAUSTED`. Resolve by waiting and retrying, reducing expensive requests, or requesting an increase.
- Tier 2 / 3 qualification is based on cumulative spending on Google Cloud services for the linked billing account. Free to Tier 1 upgrades typically take effect instantly; later upgrades within 10 minutes.
- Priority inference has its own limits: default 0.3x the standard rate limit for each model and tier. Flex traffic counts toward general limits only.
- Rate limit increase requests go through a form; no guarantee is offered.
- Docs fetched 2026-10-16.

## Related

- [billing](./billing.md)
- [batch-api](./batch-api.md)
- [priority-inference](./priority-inference.md)
- [api-errors](./api-errors.md)
