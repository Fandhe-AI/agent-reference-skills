# Fast Mode

Opt-in service tier delivering up to 2.5x faster, more consistent latency for high-value, user-facing, latency-critical traffic, while keeping pay-as-you-go pricing.

Priority processing was renamed Fast mode on July 30, 2026. `gpt-5.6-sol` was also sped up to be up to 2.5x faster than Standard processing. Either `service_tier: "priority"` or `service_tier: "fast"` accesses this behavior.

## Signature / Usage

```python
from openai import OpenAI

client = OpenAI()

response = client.responses.create(
    model="gpt-5.6-sol",
    input="What does 'fit check for my napalm era' mean?",
    service_tier="fast",
)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `service_tier` | `"fast"` \| `"priority"` | Request-level opt-in to Fast mode (Responses API or Chat Completions API); `priority` behaves identically for supported models |
| Project **Service Tier** setting | `"Fast"` | Project-level default; requests without an explicit `service_tier` use Fast mode; existing project traffic transitions gradually |

## Rate limits and ramp rate

- Fast mode consumption counts toward the same rate limit as Standard processing for a given model.
- **Ramp rate limit**: if traffic sends ≥1M TPM and increases TPM by more than 50% within 15 minutes, the system may downgrade some requests to standard speed/rate (`service_tier: "default"` in the response). Ramp gradually, use feature flags to shift traffic over hours, and avoid large ETL/batch jobs in Fast mode.

## Notes

- The response's `service_tier` field reports the tier actually used; for GPT-5.6 and earlier it returns `priority` regardless of whether `priority` or `fast` was requested.
- Fast mode charges a per-token premium over Standard processing; cached-input discounts still apply.
- Fast mode doesn't support fine-tuned models or embeddings; GPT-5.6 models support long context under Fast mode.
- Fast mode is separate from Scale Tier — Fast mode billing/limits don't count against Scale Tier TPM bundles, and Scale Tier spillover doesn't auto-move to Fast mode.
- Compatible with data residency, Zero Data Retention, and a BAA (existing endpoint/tool/eligibility requirements still apply).

## Related

- [Latency optimization](./latency-optimization.md)
- [Deployment checklist](./deployment-checklist.md)
