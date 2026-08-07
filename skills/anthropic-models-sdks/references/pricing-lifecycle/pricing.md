<!-- source: https://platform.claude.com/docs/en/about-claude/pricing / last verified: 2026-08-07 -->

# Pricing

Anthropic's pricing structure for models and features. All prices are in USD. For the most current pricing, see claude.com/pricing.

## Signature / Usage

### Model pricing

| Model | Base Input Tokens | 5m Cache Writes | 1h Cache Writes | Cache Hits & Refreshes | Output Tokens |
| --- | --- | --- | --- | --- | --- |
| Claude Fable 5 | $10 / MTok | $12.50 / MTok | $20 / MTok | $1 / MTok | $50 / MTok |
| Claude Mythos 5 (limited availability) | $10 / MTok | $12.50 / MTok | $20 / MTok | $1 / MTok | $50 / MTok |
| Claude Opus 5 | $5 / MTok | $6.25 / MTok | $10 / MTok | $0.50 / MTok | $25 / MTok |
| Claude Opus 4.8 | $5 / MTok | $6.25 / MTok | $10 / MTok | $0.50 / MTok | $25 / MTok |
| Claude Opus 4.7 | $5 / MTok | $6.25 / MTok | $10 / MTok | $0.50 / MTok | $25 / MTok |
| Claude Opus 4.6 | $5 / MTok | $6.25 / MTok | $10 / MTok | $0.50 / MTok | $25 / MTok |
| Claude Opus 4.5 | $5 / MTok | $6.25 / MTok | $10 / MTok | $0.50 / MTok | $25 / MTok |
| Claude Opus 4.1 (retired, except on Bedrock and Google Cloud) | $15 / MTok | $18.75 / MTok | $30 / MTok | $1.50 / MTok | $75 / MTok |
| Claude Opus 4 (retired, except on Google Cloud) | $15 / MTok | $18.75 / MTok | $30 / MTok | $1.50 / MTok | $75 / MTok |
| Claude Sonnet 5 (through August 31, 2026) | $2 / MTok | $2.50 / MTok | $4 / MTok | $0.20 / MTok | $10 / MTok |
| Claude Sonnet 5 (starting September 1, 2026) | $3 / MTok | $3.75 / MTok | $6 / MTok | $0.30 / MTok | $15 / MTok |
| Claude Sonnet 4.6 | $3 / MTok | $3.75 / MTok | $6 / MTok | $0.30 / MTok | $15 / MTok |
| Claude Sonnet 4.5 | $3 / MTok | $3.75 / MTok | $6 / MTok | $0.30 / MTok | $15 / MTok |
| Claude Sonnet 4 (retired, except on Bedrock and Google Cloud) | $3 / MTok | $3.75 / MTok | $6 / MTok | $0.30 / MTok | $15 / MTok |
| Claude Haiku 4.5 | $1 / MTok | $1.25 / MTok | $2 / MTok | $0.10 / MTok | $5 / MTok |
| Claude Haiku 3.5 (retired, except on Bedrock and Google Cloud) | $0.80 / MTok | $1 / MTok | $1.60 / MTok | $0.08 / MTok | $4 / MTok |

MTok = Million tokens. Claude Sonnet 5 introductory pricing of $2/$10 per million input/output tokens is in effect through August 31, 2026; standard pricing of $3/$15 takes effect September 1, 2026. Claude 4.7 and later models and Claude Mythos Preview use a newer tokenizer producing approximately 30% more tokens for the same text (exact increase depends on content/workload); Claude Sonnet 4.6 and earlier use the previous tokenizer.

### Batch processing (50% discount)

| Model | Batch input | Batch output |
| --- | --- | --- |
| Claude Fable 5 | $5 / MTok | $25 / MTok |
| Claude Mythos 5 (limited availability) | $5 / MTok | $25 / MTok |
| Claude Opus 5 | $2.50 / MTok | $12.50 / MTok |
| Claude Opus 4.8 | $2.50 / MTok | $12.50 / MTok |
| Claude Opus 4.7 | $2.50 / MTok | $12.50 / MTok |
| Claude Opus 4.6 | $2.50 / MTok | $12.50 / MTok |
| Claude Opus 4.5 | $2.50 / MTok | $12.50 / MTok |
| Claude Opus 4.1 (retired, except on Bedrock and Google Cloud) | $7.50 / MTok | $37.50 / MTok |
| Claude Opus 4 (retired, except on Google Cloud) | $7.50 / MTok | $37.50 / MTok |
| Claude Sonnet 5 (through August 31, 2026) | $1 / MTok | $5 / MTok |
| Claude Sonnet 5 (starting September 1, 2026) | $1.50 / MTok | $7.50 / MTok |
| Claude Sonnet 4.6 | $1.50 / MTok | $7.50 / MTok |
| Claude Sonnet 4.5 | $1.50 / MTok | $7.50 / MTok |
| Claude Sonnet 4 (retired, except on Bedrock and Google Cloud) | $1.50 / MTok | $7.50 / MTok |
| Claude Haiku 4.5 | $0.50 / MTok | $2.50 / MTok |
| Claude Haiku 3.5 (retired, except on Bedrock and Google Cloud) | $0.40 / MTok | $2 / MTok |

### Prompt caching multipliers (relative to base input token rate)

| Cache operation | Multiplier | Duration |
| --- | --- | --- |
| 5-minute cache write | 1.25x base input price | Cache valid for 5 minutes |
| 1-hour cache write | 2x base input price | Cache valid for 1 hour |
| Cache read (hit) | 0.1x base input price | Same duration as the preceding write |

Cache write tokens are charged when content is first stored; cache read tokens are charged on retrieval. A cache hit costs 10% of standard input price, so caching pays off after one cache read for 5-minute duration (1.25x write) or after two cache reads for 1-hour duration (2x write). These multipliers stack with the Batch API discount and data residency multipliers.

### Fast mode pricing

| Model | Input | Output |
| --- | --- | --- |
| Claude Opus 5 / Claude Opus 4.8 | $10 / MTok | $50 / MTok |

Research preview, Claude API (first-party) only — not available on Claude Platform on AWS or partner-operated cloud platforms, and not available with the Batch API. Not available on Claude Opus 4.7 (errors) or Claude Opus 4.6 (runs at standard speed, billed at standard rates). Stacks with prompt caching and data residency multipliers.

### Tool use system prompt token overhead

| Model | `auto`/`none` | `any`/`tool` |
| --- | --- | --- |
| Claude Opus 5 | 286 tokens | 406 tokens |
| Claude Opus 4.8 | 290 tokens | 410 tokens |
| Claude Opus 4.7 | 675 tokens | 804 tokens |
| Claude Opus 4.6 | 497 tokens | 589 tokens |
| Claude Opus 4.5 | 496 tokens | 588 tokens |
| Claude Opus 4.1 (retired, except on Bedrock and Google Cloud) | 313 tokens | 315 tokens |
| Claude Opus 4 (retired, except on Google Cloud) | 313 tokens | 315 tokens |
| Claude Sonnet 5 | 354 tokens | 474 tokens |
| Claude Sonnet 4.6 | 497 tokens | 589 tokens |
| Claude Sonnet 4.5 | 496 tokens | 588 tokens |
| Claude Sonnet 4 (retired, except on Bedrock and Google Cloud) | 313 tokens | 315 tokens |
| Claude Haiku 4.5 | 496 tokens | 588 tokens |
| Claude Haiku 3.5 (retired, except on Bedrock and Google Cloud) | 264 tokens | 355 tokens |

If no `tools` are provided, a tool choice of `none` uses 0 additional system prompt tokens.

### Specific tool pricing

- **Bash tool:** 325 additional input tokens (Claude Opus 5, Opus 4.8, Opus 4.7); 244 tokens (Opus 4.6, Sonnet 4.6, and earlier). Plus per-model tool-use system prompt overhead.
- **Code execution tool:** free when used together with `web_search_20260209`+ or `web_fetch_20260209`+. Otherwise billed by execution time: 5-minute minimum, 1,550 free hours/month per org, $0.05/hour/container beyond that; files preloaded onto the container are billed even if the tool is not called.
- **Text editor tool:** standard token pricing plus 700 additional input tokens for `text_editor_20250429` (Claude 4.x).
- **Web search tool:** $10 per 1,000 searches, plus standard token costs for search-generated content. Each search counts as one use regardless of result count; errored searches are not billed.
- **Web fetch tool:** no additional charges beyond standard token costs. Use `max_content_tokens` to cap fetched content. Approximate costs: 10 kB page ~2,500 tokens; 100 kB doc ~25,000 tokens; 500 kB PDF ~125,000 tokens.
- **Computer use tool:** standard tool use pricing; system prompt overhead 466-499 tokens; 735 input tokens per tool definition (Claude 4.x); plus screenshot image and tool execution result tokens.

### Claude Managed Agents pricing

Billed on tokens (standard model pricing + prompt caching multipliers; web search at $10/1,000 searches) plus session runtime.

| SKU | Rate | Metering |
| --- | --- | --- |
| Session runtime | $0.08 per session-hour | `running` status duration only |

Batch API discount, data residency multiplier, and cloud-platform pricing do not apply to Managed Agents sessions. Session runtime replaces code-execution container-hour billing for Managed Agents (no separate container-hour charge on top).

### Worked example (Claude Opus 5, 1-hour session, 50,000 input / 15,000 output tokens)

| Line item | Calculation | Cost |
| --- | --- | --- |
| Input tokens | 50,000 x $5 / 1,000,000 | $0.25 |
| Output tokens | 15,000 x $25 / 1,000,000 | $0.375 |
| Session runtime | 1.0 hour x $0.08 | $0.08 |
| Total | | $0.705 |

With 40,000 of the 50,000 input tokens as cache reads: uncached input $0.05, cache read tokens $0.02, output $0.375, session runtime $0.08, total $0.525.

## Notes

- **Claude Platform on AWS pricing:** bills through AWS Marketplace using Claude Consumption Units (CCU). Token usage is rated in USD at standard per-model/per-feature rates, discounts applied, then converted to CCUs at $0.01/CCU, reported hourly. Postpaid (arrears) only; no prepaid credits. `inference_geo: "us"` applies a 1.1x pricing multiplier for Claude 4.6+ models; `"global"` (default) uses standard pricing.
- **Claude in Microsoft Foundry pricing:** bills through Azure Marketplace using CCUs, same conversion mechanism. The US Data Zone Standard deployment type applies the same 1.1x multiplier as `inference_geo: "us"`.
- **Cloud platform pricing (Bedrock / Google Cloud):** partner-operated, invoiced by the cloud provider directly; see their own pricing pages. Starting with Claude Sonnet 4.5/Haiku 4.5/Opus 4.5, Bedrock offers global and regional endpoints; Google Cloud offers global, multi-region, and regional endpoints. Regional/multi-region endpoints include a 10% premium over global.
- **Data residency pricing:** for Claude 4.6+ models, `inference_geo` US-only inference incurs a 1.1x multiplier on all token pricing categories on the Claude API (first-party) and Claude Platform on AWS. Earlier models do not support `inference_geo`; requests including it return a 400 error.
- **Long context pricing:** Claude 4.6+ models and Claude Mythos Preview include the full 1M token context window at standard pricing (no premium for large requests); caching/batch discounts apply at standard rates across the full window.
- Rate limits vary by usage tier (Start, Build, Scale). Volume/enterprise discounts negotiated case-by-case.

## Related

- [Models overview](../models/overview.md)
- [What's new in Claude Opus 5](../models/whats-new-opus-5.md)
- [What's new in Claude Sonnet 5](../models/whats-new-sonnet-5.md)
- [Model deprecations](./model-deprecations.md)
