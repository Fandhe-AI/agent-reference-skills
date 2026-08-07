<!-- source: https://platform.claude.com/docs/en/api/rate-limits / last verified: 2026-08-07 -->

# Rate limits

Spend limits and rate limits (RPM/ITPM/OTPM) enforced per organization and usage tier to prevent misuse and manage capacity.

## Signature / Usage

Response headers on every request expose current status:

```
retry-after
anthropic-ratelimit-requests-limit / -remaining / -reset
anthropic-ratelimit-tokens-limit / -remaining / -reset
anthropic-ratelimit-input-tokens-limit / -remaining / -reset
anthropic-ratelimit-output-tokens-limit / -remaining / -reset
anthropic-priority-input-tokens-* / anthropic-priority-output-tokens-*   # Priority Tier only
```

## Options / Props

**Monthly spend caps by usage tier:**

| Tier | Monthly spend cap |
|---|---|
| Start | $500 USD |
| Build | $1,000 USD |
| Scale | $200,000 USD |
| Custom | none (arranged with account team) |

**Rate limit dimensions:** RPM (requests/minute), ITPM (input tokens/minute), OTPM (output tokens/minute) — set per model class, enforced via token bucket algorithm (continuously replenished, not fixed-interval reset).

**Cache-aware ITPM:** only `input_tokens` (post-cache-breakpoint) and `cache_creation_input_tokens` count toward ITPM for most models; `cache_read_input_tokens` does not (exception: Claude Haiku 3.5, marked †, does count cache reads toward ITPM). `total_input_tokens = cache_read_input_tokens + cache_creation_input_tokens + input_tokens`. OTPM counts only actual generated tokens; `max_tokens` itself has no OTPM impact.

**Message Batches API limits** are separate, shared across all models: RPM to all endpoints + max batch requests in processing queue + max batch requests per batch (100,000 across all tiers).

**Managed Agents limits** (separate from Messages API): create endpoints 300 RPM, read endpoints 1,200 RPM.

**Fast mode** (`speed: "fast"`, Opus 5 / Opus 4.8 only) has dedicated rate limits, separate from standard Opus limits; exceeded → 429 with `retry-after`; not available on Opus 4.7 (errors) or Opus 4.6 (runs at standard speed).

## Notes

- 429 error indicates a rate limit was exceeded; response includes `retry-after`.
- Rate limits apply per model, so different models can be used simultaneously up to their own limits.
- Rate limits are shared across `inference_geo` values (`"us"` and `"global"` draw from the same pool).
- Workspace-level limits can be set below the org limit (can't set limits on the default workspace; unset workspace limits inherit org limits; org-wide limits always apply even if workspace limits sum to more).
- Read current limits programmatically via the Rate Limits API, or in Console at Settings → Limits; request increases via **Request rate limit increase**.
- Claude Platform on AWS: billed via AWS Marketplace, fixed on Start tier (no auto tier progression), no self-service rate-limit-increase flow (contact account rep/support), no per-workspace limit config, no fast mode.

## Related

- [service-tiers](./service-tiers.md)
- [errors](./errors.md)
- [overview](./overview.md)
