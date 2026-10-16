# Fast Mode

Opt-in service tier delivering up to 2.5x faster, more consistent latency for high-value, user-facing, latency-critical traffic, while keeping pay-as-you-go pricing.

Priority processing was renamed Fast mode on July 30, 2026. `gpt-5.6-sol` was also sped up to be up to 2.5x faster than Standard processing. Either `service_tier: "priority"` or `service_tier: "fast"` accesses this behavior.

For faster speeds with GPT-6 Astra or GPT-6.1 Sol, see [Ultrafast mode](./ultrafast-mode.md).

## Signature / Usage

```python
from openai import OpenAI

client = OpenAI()

response = client.responses.create(
    model="gpt-6.1-sol",
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
- **Ramp rate limit**: if traffic ramps too fast, the system may downgrade some requests to standard speed/rate (`service_tier: "default"` in the response). As a rule of thumb, once traffic reaches 1M input TPM, increase it by no more than 50% every 15 minutes; the exact point varies by model and traffic conditions. Ramp gradually, use feature flags to shift traffic over hours, and avoid large ETL/batch jobs in Fast mode.

## Notes

- The response's `service_tier` field reports the tier actually used; for GPT-5.6 and earlier it returns `priority` regardless of whether `priority` or `fast` was requested.
- Fast mode charges a per-token premium over Standard processing; cached-input discounts still apply.
- Fast mode doesn't support fine-tuned models or embeddings; GPT-5.6 models support long context under Fast mode.
- Fast mode is separate from Scale Tier — Fast mode billing/limits don't count against Scale Tier TPM bundles, and Scale Tier spillover doesn't auto-move to Fast mode.
- Compatible with data residency, Zero Data Retention, and a BAA (existing endpoint/tool/eligibility requirements still apply).
- Fast mode supports multimodal requests, including image inputs.
- In the usage dashboard, group by service tier to see Fast mode requests; for GPT-5.6 and earlier they appear as `priority` even when `fast` is specified.
- GPT-5.6 Sol Fast mode costs twice the Standard rate: $8 / $40 per 1M input/output tokens (short-context), $16 / $60 (long-context). Promotional pricing is available at least through November 21, 2026.
- Latency SLA: Fast mode for GPT-6 Astra has no latency SLA. For GPT-5.6 and earlier, Fast mode and Scale Tier receive the same SLA treatment.
- EU data residency: supported for GPT-6.1 Sol, GPT-6 Sol and GPT-6 Luna; not available for GPT-6 Astra.
- Ramp rate limits are shared across all of an organization's traffic; if they are hit routinely, consider Scale Tier quota.

## Related

- [Ultrafast mode](./ultrafast-mode.md)
- [Latency optimization](./latency-optimization.md)
- [Deployment checklist](./deployment-checklist.md)
