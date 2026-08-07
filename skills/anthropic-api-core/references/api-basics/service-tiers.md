<!-- source: https://platform.claude.com/docs/en/api/service-tiers / last verified: 2026-08-07 -->

# Service tiers

Three service tiers balance availability, performance, and predictable cost: Priority, Standard, and Batch.

## Signature / Usage

```python
message = client.messages.create(
    model="claude-opus-4-8",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Hello, Claude!"}],
    service_tier="auto",  # Priority if available, fallback to standard
)
print(message.usage.service_tier)
```

## Options / Props

| `service_tier` value | Behavior |
|---|---|
| `"auto"` (default) | Uses Priority Tier capacity if available, falls back to standard |
| `"standard_only"` | Only standard tier, never draws down Priority Tier capacity |

**Priority Tier token burndown rates (input):** cache reads 0.1x, cache writes 1.25x (5m TTL) / 2.0x (1h TTL), US-only inference (`inference_geo: "us"`) on Claude 4.6+ is 1.1x, all other input 1x. **Output:** US-only inference on Claude 4.6+ is 1.1x, otherwise 1x.

Response `usage` object includes the assigned tier:

```json
{"usage": {"input_tokens": 410, "cache_creation_input_tokens": 0, "cache_read_input_tokens": 0, "output_tokens": 585, "service_tier": "priority"}}
```

## Notes

- Priority Tier capacity commitments are **no longer available for purchase**; only organizations with an existing commitment can continue using it through their contract end date. New guaranteed-capacity needs should contact sales.
- A Priority Tier commitment = input TPM + output TPM + duration (1/3/6/12 months) + specific model version, targeting 99.5% uptime; requests beyond committed capacity fall back to standard tier.
- Priority Tier is not supported on Claude Mythos 5, Claude Mythos Preview, Claude Opus 5, or Claude Sonnet 5.
- Requests assigned Priority Tier still draw from regular rate limits; if servicing would exceed them, the request is declined.
- `anthropic-priority-*` response headers indicate Priority Tier eligibility even when over the committed limit.

## Related

- [rate-limits](./rate-limits.md)
- [overview](./overview.md)
