<!-- source: https://platform.claude.com/docs/en/about-claude/models/whats-new-sonnet-5 / last verified: 2026-08-07 -->

# What's new in Claude Sonnet 5

Overview of new features and behavior changes in Claude Sonnet 5, the next generation of Anthropic's Sonnet model family. It is a drop-in upgrade for Claude Sonnet 4.6 with three behavior changes: adaptive thinking on by default, manual extended thinking now returns a 400 error, and sampling parameters set to non-default values return a 400 error.

## Signature / Usage

| Model | API model ID | Description |
| --- | --- | --- |
| Claude Sonnet 5 | `claude-sonnet-5` | The best combination of speed and intelligence |

Claude Sonnet 5 supports a 1M token context window by default (both default and maximum; no smaller context variant), 128k max output tokens, adaptive thinking, and the same tools/platform features as Claude Sonnet 4.6 except Priority Tier (not available on Sonnet 5).

```python
# Not supported on Claude Sonnet 5 (returns 400)
thinking = {"type": "enabled", "budget_tokens": 32000}

# Use this instead
thinking = {"type": "adaptive"}
```

## Notes

- **Adaptive thinking on by default:** requests without a `thinking` field now run with adaptive thinking (unlike Sonnet 4.6, where they ran without thinking). To turn thinking off, pass `thinking: {type: "disabled"}`. Revisit `max_tokens` for workloads that ran without thinking on Sonnet 4.6.
- **Sampling parameters not accepted:** setting `temperature`, `top_p`, or `top_k` to a non-default value returns a 400 error (default values or omission are accepted). New for Sonnet-class models; the same constraint was previously introduced on Claude Opus 4.7.
- **Manual extended thinking removed:** `thinking: {type: "enabled", budget_tokens: N}` was deprecated on Sonnet 4.6 and is removed on Sonnet 5 (returns 400 error), same as Opus 4.8/4.7. Use adaptive thinking with the effort parameter instead.
- **New tokenizer:** the same input text produces approximately 30% more tokens than on Claude Sonnet 4.6 (exact increase depends on content). Not an API change — requests/responses/streaming keep the same shape. Affects token counts, context-window text capacity, `max_tokens` budgets, and per-request cost (per-token pricing unchanged).
- **Assistant message prefilling not supported:** returns a 400 error, unchanged from Sonnet 4.6. Use structured outputs, system prompt instructions, or `output_config.format` instead.
- Capability improvements over Sonnet 4.6: largest gains in coding and agentic tasks (capability upgrade at the same price).
- Cybersecurity safeguards: Claude Sonnet 5 is the first Sonnet-tier model with real-time cybersecurity safeguards; refusals return HTTP 200 with `stop_reason: "refusal"`, not an error.
- Pricing: $3/MTok input, $15/MTok output — unchanged from Sonnet 4.6. Introductory pricing of $2/$10 per MTok is in effect through August 31, 2026, after which standard $3/$15 pricing applies.
- Availability: Claude API (all customers); AWS via Claude in Amazon Bedrock and Claude Platform on AWS (also reachable via `InvokeModel`; not included in the legacy Bedrock — Opus 4.6 and earlier — integration); Google Cloud; Microsoft Foundry. Supports zero data retention for organizations with ZDR agreements.

## Related

- [Models overview](./overview.md)
- [Migration guide](./migration-guide.md)
- [Pricing](../pricing-lifecycle/pricing.md)
