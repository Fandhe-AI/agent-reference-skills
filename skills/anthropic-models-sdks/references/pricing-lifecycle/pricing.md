<!-- source: https://platform.claude.com/docs/en/about-claude/pricing / last verified: 2026-10-17 -->

# Pricing

Anthropic's pricing structure for models and features. All prices are in USD. For the most current pricing, see claude.com/pricing.

## Signature / Usage

### Model pricing

| Model | Base Input Tokens | 5m Cache Writes | 1h Cache Writes | Cache Hits & Refreshes | Output Tokens |
| --- | --- | --- | --- | --- | --- |
| Claude Fable 5.1 | $10 / MTok | $12.50 / MTok | $20 / MTok | $0.25 / MTok (1) | $50 / MTok |
| Claude Mythos 5.1 (limited availability) | $10 / MTok | $12.50 / MTok | $20 / MTok | $0.25 / MTok (1) | $50 / MTok |
| Claude Fable 5 | $10 / MTok | $12.50 / MTok | $20 / MTok | $1 / MTok | $50 / MTok |
| Claude Mythos 5 (limited availability) | $10 / MTok | $12.50 / MTok | $20 / MTok | $1 / MTok | $50 / MTok |
| Claude Opus 5.5 | $4 / MTok | $5 / MTok | $8 / MTok | $0.20 / MTok (2) | $20 / MTok |
| Claude Opus 5 | $5 / MTok | $6.25 / MTok | $10 / MTok | $0.50 / MTok | $25 / MTok |
| Claude Opus 4.8 | $5 / MTok | $6.25 / MTok | $10 / MTok | $0.50 / MTok | $25 / MTok |
| Claude Opus 4.7 | $5 / MTok | $6.25 / MTok | $10 / MTok | $0.50 / MTok | $25 / MTok |
| Claude Opus 4.6 | $5 / MTok | $6.25 / MTok | $10 / MTok | $0.50 / MTok | $25 / MTok |
| Claude Opus 4.5 | $5 / MTok | $6.25 / MTok | $10 / MTok | $0.50 / MTok | $25 / MTok |
| Claude Opus 4.1 (retired, except on Bedrock and Google Cloud) | $15 / MTok | $18.75 / MTok | $30 / MTok | $1.50 / MTok | $75 / MTok |
| Claude Opus 4 (retired, except on Google Cloud) | $15 / MTok | $18.75 / MTok | $30 / MTok | $1.50 / MTok | $75 / MTok |
| Claude Sonnet 5.5 | $2 / MTok | $2.50 / MTok | $4 / MTok | $0.10 / MTok (2) | $10 / MTok |
| Claude Sonnet 5 | $2 / MTok (3) | $2.50 / MTok | $4 / MTok | $0.20 / MTok | $10 / MTok (3) |
| Claude Sonnet 4.6 | $3 / MTok | $3.75 / MTok | $6 / MTok | $0.30 / MTok | $15 / MTok |
| Claude Sonnet 4.5 | $3 / MTok | $3.75 / MTok | $6 / MTok | $0.30 / MTok | $15 / MTok |
| Claude Sonnet 4 (retired, except on Bedrock and Google Cloud) | $3 / MTok | $3.75 / MTok | $6 / MTok | $0.30 / MTok | $15 / MTok |
| Claude Haiku 5.5 (for prompts up to 100,000 tokens) | $0.10 / MTok | $0.125 / MTok | $0.20 / MTok | $0.01 / MTok | $0.50 / MTok |
| Claude Haiku 5.5 (for prompts over 100,000 tokens) | $0.50 / MTok | $0.625 / MTok | $1 / MTok | $0.05 / MTok | $2.50 / MTok |
| Claude Haiku 4.5 | $1 / MTok | $1.25 / MTok | $2 / MTok | $0.10 / MTok | $5 / MTok |
| Claude Haiku 3.5 (retired, except on Google Cloud) | $0.80 / MTok | $1 / MTok | $1.60 / MTok | $0.08 / MTok | $4 / MTok |

Footnotes:

1. Cache hits and refreshes on Claude Fable 5.1 and Claude Mythos 5.1 are priced at 0.025x the base input price.
2. Cache hits and refreshes on Claude Opus 5.5 and Claude Sonnet 5.5 are priced at 0.05x the base input price. All other models use the standard 0.1x multiplier.
3. The $2/$10 per million input/output token pricing for Claude Sonnet 5, announced at launch as introductory pricing through August 31, 2026, is now the standard price. The previously scheduled increase to $3/$15 per million input/output tokens on September 1, 2026 will not occur.

MTok = Million tokens. Claude 4.7 and later models and Claude Mythos Preview use a newer tokenizer that produces approximately 30% more tokens for the same text (exact increase depends on content/workload); Claude Sonnet 4.6 and earlier use the previous tokenizer.

### Batch processing (50% discount)

| Model | Batch input | Batch output |
| --- | --- | --- |
| Claude Fable 5.1 | $5 / MTok | $25 / MTok |
| Claude Mythos 5.1 (limited availability) | $5 / MTok | $25 / MTok |
| Claude Fable 5 | $5 / MTok | $25 / MTok |
| Claude Mythos 5 (limited availability) | $5 / MTok | $25 / MTok |
| Claude Opus 5.5 | $2 / MTok | $10 / MTok |
| Claude Opus 5 | $2.50 / MTok | $12.50 / MTok |
| Claude Opus 4.8 | $2.50 / MTok | $12.50 / MTok |
| Claude Opus 4.7 | $2.50 / MTok | $12.50 / MTok |
| Claude Opus 4.6 | $2.50 / MTok | $12.50 / MTok |
| Claude Opus 4.5 | $2.50 / MTok | $12.50 / MTok |
| Claude Opus 4.1 (retired, except on Bedrock and Google Cloud) | $7.50 / MTok | $37.50 / MTok |
| Claude Opus 4 (retired, except on Google Cloud) | $7.50 / MTok | $37.50 / MTok |
| Claude Sonnet 5.5 | $1 / MTok | $5 / MTok |
| Claude Sonnet 5 | $1 / MTok | $5 / MTok |
| Claude Sonnet 4.6 | $1.50 / MTok | $7.50 / MTok |
| Claude Sonnet 4.5 | $1.50 / MTok | $7.50 / MTok |
| Claude Sonnet 4 (retired, except on Bedrock and Google Cloud) | $1.50 / MTok | $7.50 / MTok |
| Claude Haiku 5.5 (for prompts up to 100,000 tokens) | $0.05 / MTok | $0.25 / MTok |
| Claude Haiku 5.5 (for prompts over 100,000 tokens) | $0.25 / MTok | $1.25 / MTok |
| Claude Haiku 4.5 | $0.50 / MTok | $2.50 / MTok |
| Claude Haiku 3.5 (retired, except on Google Cloud) | $0.40 / MTok | $2 / MTok |

### Prompt caching multipliers (relative to base input token rate)

There are two ways to enable prompt caching: **automatic caching** (a single top-level `cache_control` field; the system manages cache breakpoints as conversations grow; the recommended starting point) and **explicit cache breakpoints** (`cache_control` placed directly on individual content blocks).

| Cache operation | Multiplier | Duration |
| --- | --- | --- |
| 5-minute cache write | 1.25x base input price | Cache valid for 5 minutes |
| 1-hour cache write | 2x base input price | Cache valid for 1 hour |
| Cache read (hit) | 0.1x base input price (0.025x on Claude Fable 5.1 and Claude Mythos 5.1; 0.05x on Claude Opus 5.5 and Claude Sonnet 5.5) | Same duration as the preceding write |

Cache write tokens are charged when content is first stored; cache read tokens are charged on retrieval. A cache hit costs 10% of standard input price, so caching pays off after one cache read for 5-minute duration (1.25x write) or after two cache reads for 1-hour duration (2x write). On Claude Fable 5.1 and Claude Mythos 5.1, a cache hit costs 2.5% of the standard input price ($0.25 per million tokens). On Claude Opus 5.5 and Claude Sonnet 5.5, a cache hit costs 5% ($0.20 per million tokens on Opus 5.5, $0.10 on Sonnet 5.5). These multipliers stack with the Batch API discount and data residency multipliers.

### Fast mode pricing

Fast mode provides significantly faster output for Claude Opus 5.5, Claude Opus 5, and Claude Opus 4.8 at premium pricing. Fast mode for Claude Opus 5 and Claude Opus 4.8 is in research preview. Pricing applies across the full context window, including requests over 200k input tokens. It is available on the Claude API (first-party) and, for Claude Opus 5.5, on Claude in Microsoft Foundry for deployments hosted on Azure; it is not available on Claude Platform on AWS or partner-operated cloud platforms, and not with the Batch API.

| Model | Input | Output |
| --- | --- | --- |
| Claude Opus 5.5 | $8 / MTok | $40 / MTok |
| Claude Opus 5 / Claude Opus 4.8 | $10 / MTok | $50 / MTok |

Stacks with prompt caching and data residency multipliers.

### Tool use system prompt token overhead

| Model | `auto`/`none` | `any`/`tool` |
| --- | --- | --- |
| Claude Opus 5.5 | 286 tokens | (blank in source) |
| Claude Opus 5 | 286 tokens | 406 tokens |
| Claude Opus 4.8 | 290 tokens | 410 tokens |
| Claude Opus 4.7 | 675 tokens | 804 tokens |
| Claude Opus 4.6 | 497 tokens | 589 tokens |
| Claude Opus 4.5 | 496 tokens | 588 tokens |
| Claude Opus 4.1 (retired, except on Bedrock and Google Cloud) | 313 tokens | 315 tokens |
| Claude Opus 4 (retired, except on Google Cloud) | 313 tokens | 315 tokens |
| Claude Sonnet 5.5 | 286 tokens | (blank in source) |
| Claude Sonnet 5 | 354 tokens | 474 tokens |
| Claude Sonnet 4.6 | 497 tokens | 589 tokens |
| Claude Sonnet 4.5 | 496 tokens | 588 tokens |
| Claude Sonnet 4 (retired, except on Bedrock and Google Cloud) | 313 tokens | 315 tokens |
| Claude Haiku 5.5 | 286 tokens | 406 tokens |
| Claude Haiku 4.5 | 496 tokens | 588 tokens |
| Claude Haiku 3.5 (retired, except on Google Cloud) | 264 tokens | 355 tokens |

If no `tools` are provided, a tool choice of `none` uses 0 additional system prompt tokens.

### Specific tool pricing

- **Bash tool:** 325 additional input tokens (Claude 4.7 and later models and Claude Mythos Preview); 244 tokens (Claude 4.6 and earlier). Plus per-model tool-use system prompt overhead.
- **Code execution tool:** free when used together with `web_search_20260209`+ or `web_fetch_20260209`+. Otherwise billed by execution time: 5-minute minimum, 1,550 free hours/month per org, $0.05/hour/container beyond that; files preloaded onto the container are billed even if the tool is not called.
- **Text editor tool:** standard token pricing plus additional input tokens: `text_editor_20250728` 974 tokens (Claude 4.7 and later models and Claude Mythos Preview), 745 tokens (Claude 4.6 and earlier).
- **Web search tool:** $10 per 1,000 searches, plus standard token costs for search-generated content. Each search counts as one use regardless of result count; errored searches are not billed.
- **Web fetch tool:** no additional charges beyond standard token costs. Use `max_content_tokens` to cap fetched content. Approximate costs: 10 kB page ~2,500 tokens; 100 kB doc ~25,000 tokens; 500 kB PDF ~125,000 tokens.
- **Computer use tool:** declaring `computer_toolset_20260801` with its default members adds about 4,500 input tokens (about 4,590 on Claude Sonnet 5 and about 4,520 on the other supported models); disabling `zoom` with `configs` removes about 410. For the earlier `computer_20251124` / `computer_20250124` versions: system prompt overhead 466-499 tokens; about 735 input tokens per tool definition. Plus screenshot/zoom image tokens and tool execution results.
- **Browser use tool:** declaring `browser_toolset_20260801` with its default members adds about 6,600 input tokens (about 6,670 on Claude Sonnet 5 and about 6,610 on the other supported models); enabling all four optional members adds about 880 tokens. Plus screenshot/zoom image tokens and text tool results.

### Claude Managed Agents pricing

Billed on tokens (standard model pricing + prompt caching multipliers; web search at $10/1,000 searches) plus session runtime.

| SKU | Rate | Metering |
| --- | --- | --- |
| Session runtime | $0.08 per session-hour | `running` status duration |

Runtime is measured to the millisecond and accrues only while the session's status is `running`; `idle`, `rescheduling`, and `terminated` time does not count. Session runtime replaces code-execution container-hour billing (no separate container-hour charge on top). The Batch API discount and cloud-platform pricing do not apply to Managed Agents sessions. Fast mode premium pricing applies when an agent's `model.speed` is `"fast"`. The data residency multiplier applies: when an agent's `model.inference_geo` is pinned to `"us"`, session tokens are billed at 1.1x. On Claude Platform on AWS, session token and runtime charges convert to Claude Consumption Units (CCUs) at the standard rate.

### Worked example (Claude Opus 5.5, 1-hour session, 50,000 input / 15,000 output tokens)

| Line item | Calculation | Cost |
| --- | --- | --- |
| Input tokens | 50,000 x $4 / 1,000,000 | $0.20 |
| Output tokens | 15,000 x $20 / 1,000,000 | $0.30 |
| Session runtime | 1.0 hour x $0.08 | $0.08 |
| Total | | $0.58 |

```python
# Claude Opus 5.5: $4 / MTok input, $20 / MTok output, $0.08 per session-hour
cost = 50_000 * 4 / 1_000_000 + 15_000 * 20 / 1_000_000 + 1.0 * 0.08  # 0.58
```

With prompt caching active and 40,000 of the input tokens as cache reads: uncached input 10,000 x $4 / 1,000,000 = $0.04; cache read 40,000 x $4 x 0.05 / 1,000,000 = $0.008; output $0.30; session runtime $0.08; total $0.428.

## Notes

- **Limited access:** available only to organizations verified through Anthropic's verification programs, such as the Cyber Verification Program. To request access, apply to the program that covers your use case. Applies to Claude Mythos 5 / 5.1 rows.
- **Retired:** may still be available on other cloud platforms; see `model-deprecations.md`. Claude Haiku 3.5 is "retired, except on Google Cloud" (no longer Bedrock).
- **Claude Platform on AWS pricing:** bills through AWS Marketplace using Claude Consumption Units (CCU). Token usage is rated in USD at standard per-model/per-feature rates, discounts applied, then converted to CCUs at $0.01/CCU, reported hourly. Postpaid (arrears) only; no prepaid credits. `inference_geo: "us"` applies a 1.1x pricing multiplier for Claude 4.6+ models; `"global"` (default) uses standard pricing.
- **Claude in Microsoft Foundry pricing:** bills through Azure Marketplace using CCUs, same conversion mechanism. The US Data Zone Standard deployment type applies the same 1.1x multiplier as `inference_geo: "us"`.
- **Cloud platform pricing (Bedrock / Google Cloud):** partner-operated, invoiced by the cloud provider directly; see their own pricing pages. Starting with Claude Sonnet 4.5/Haiku 4.5/Opus 4.5, Bedrock offers global and regional endpoints; Google Cloud offers global, multi-region, and regional endpoints. Regional/multi-region endpoints include a 10% premium over global.
- **Data residency pricing:** for Claude 4.6+ models, `inference_geo` US-only inference incurs a 1.1x multiplier on all token pricing categories (input, output, cache writes, cache reads) on the Claude API (first-party) and Claude Platform on AWS. On Claude Haiku 5.5, the multiplier also applies to the higher prices for prompts over 100,000 tokens. Earlier models do not support `inference_geo`; requests including it return a 400 error.
- **Long context pricing:** Claude 4.6+ models (except Claude Haiku 5.5) and Claude Mythos Preview include the full 1M token context window at standard pricing; caching/batch discounts apply at standard rates across the full window. Claude Haiku 5.5 is priced by prompt length: a request whose prompt is over 100,000 tokens pays higher prices. Prompt length counts all input tokens, including cache reads and cache writes. Each request is priced on its own; a request over the threshold pays the higher prices even when part of its prompt is a cache hit.
- Rate limits vary by usage tier (Start, Build, Scale). Volume/enterprise discounts negotiated case-by-case.

## Related

- [Models overview](../models/overview.md)
- [What's new in Claude Opus 5](../models/whats-new-opus-5.md)
- [What's new in Claude Sonnet 5](../models/whats-new-sonnet-5.md)
- [Model deprecations](./model-deprecations.md)
