<!-- source: https://platform.claude.com/docs/en/about-claude/models/overview / last verified: 2026-08-07 -->

# Models overview

Claude is a family of state-of-the-art large language models developed by Anthropic. Introduces the available models and compares their performance.

## Signature / Usage

If unsure which model to use, start with **Claude Opus 5** for complex agentic coding and enterprise work. For workloads that need the highest available capability, use **Claude Fable 5**.

All current Claude models support text and image input, text output, multilingual capabilities, and vision. Models are available through the Claude API, Amazon Bedrock, Claude Platform on AWS, Google Cloud, and Microsoft Foundry.

### Claude Fable 5 and Claude Mythos 5

Claude Fable 5 (`claude-fable-5`) is Anthropic's most capable widely released model. Claude Mythos 5 (`claude-mythos-5`) shares Claude Fable 5's specs and pricing and joins the invitation-only Claude Mythos Preview (`claude-mythos-preview`) within Project Glasswing.

Claude Fable 5 is generally available on the Claude API, Amazon Bedrock, Claude Platform on AWS, Google Cloud, and Microsoft Foundry beginning June 9, 2026. Claude Mythos 5 is not generally available: it is offered in limited availability to approved customers in Project Glasswing, beginning the same day.

## Options / Props

Latest models comparison:

| Feature | Claude Fable 5 | Claude Opus 5 | Claude Sonnet 5 | Claude Haiku 4.5 |
| --- | --- | --- | --- | --- |
| Description | Next-generation intelligence for long-running agents | For complex agentic coding and enterprise work | The best combination of speed and intelligence | The fastest model with near-frontier intelligence |
| Claude API ID | claude-fable-5 | claude-opus-5 | claude-sonnet-5 | claude-haiku-4-5-20251001 |
| Claude API alias | claude-fable-5 | claude-opus-5 | claude-sonnet-5 | claude-haiku-4-5 |
| AWS Bedrock ID | anthropic.claude-fable-5 (3) | anthropic.claude-opus-5 (3) | anthropic.claude-sonnet-5 (3) | anthropic.claude-haiku-4-5-20251001-v1:0 |
| Google Cloud ID | claude-fable-5 | claude-opus-5 | claude-sonnet-5 | claude-haiku-4-5@20251001 |
| Pricing (1) | $10 / input MTok, $50 / output MTok | $5 / input MTok, $25 / output MTok | $3 / input MTok, $15 / output MTok (4) | $1 / input MTok, $5 / output MTok |
| Extended thinking (`thinking.type: "enabled"`) | No | No | No | Yes |
| Adaptive thinking | Yes (always on) | Yes | Yes | No |
| Comparative latency | Slower | Moderate | Fast | Fastest |
| Context window | 1M tokens | 1M tokens | 1M tokens | 200k tokens |
| Max output | 128k tokens | 128k tokens | 128k tokens | 64k tokens |
| Reliable knowledge cutoff (2) | Jan 2026 | May 2026 | Jan 2026 | Feb 2025 |
| Training data cutoff | Jan 2026 | May 2026 | Jan 2026 | Jul 2025 |

*(1) See pricing.md for complete pricing information including Batch API discounts and prompt caching rates. (2) Reliable knowledge cutoff indicates the date through which a model's knowledge is most extensive and reliable; training data cutoff is the broader range. (3) Available on Bedrock through the Messages-API Bedrock endpoint. (4) Introductory pricing of $2 / $10 per MTok applies to Claude Sonnet 5 through August 31, 2026.*

Legacy models (still available, consider migrating):

| Feature | Claude Opus 4.8 | Claude Opus 4.7 | Claude Opus 4.6 | Claude Sonnet 4.6 | Claude Sonnet 4.5 | Claude Opus 4.5 |
| --- | --- | --- | --- | --- | --- | --- |
| Claude API ID | claude-opus-4-8 | claude-opus-4-7 | claude-opus-4-6 | claude-sonnet-4-6 | claude-sonnet-4-5-20250929 | claude-opus-4-5-20251101 |
| Claude API alias | claude-opus-4-8 | claude-opus-4-7 | claude-opus-4-6 | claude-sonnet-4-6 | claude-sonnet-4-5 | claude-opus-4-5 |
| AWS Bedrock ID | anthropic.claude-opus-4-8 (6) | anthropic.claude-opus-4-7 (6) | anthropic.claude-opus-4-6-v1 | anthropic.claude-sonnet-4-6 | anthropic.claude-sonnet-4-5-20250929-v1:0 | anthropic.claude-opus-4-5-20251101-v1:0 |
| Google Cloud ID | claude-opus-4-8 | claude-opus-4-7 | claude-opus-4-6 | claude-sonnet-4-6 | claude-sonnet-4-5@20250929 | claude-opus-4-5@20251101 |
| Pricing | $5 / $25 MTok | $5 / $25 MTok | $5 / $25 MTok | $3 / $15 MTok | $3 / $15 MTok | $5 / $25 MTok |
| Extended thinking | No | No | Yes (deprecated) | Yes (deprecated) | Yes | Yes |
| Adaptive thinking | Yes | Yes | Yes | Yes | No | No |
| Comparative latency | Moderate | Moderate | Moderate | Fast | Fast | Moderate |
| Context window | 1M tokens | 1M tokens | 1M tokens | 1M tokens | 200k tokens | 200k tokens |
| Max output | 128k tokens | 128k tokens | 128k tokens | 128k tokens | 64k tokens | 64k tokens |
| Reliable knowledge cutoff (5) | Jan 2026 | Jan 2026 | May 2025 | Aug 2025 | Jan 2025 | May 2025 |
| Training data cutoff | Jan 2026 | Jan 2026 | Aug 2025 | Jan 2026 | Jul 2025 | Aug 2025 |

*(5) Reliable knowledge cutoff / training data cutoff definitions as above. (6) Available on Bedrock through the Messages-API Bedrock endpoint.*

## Notes

- Every Claude model ID is a pinned snapshot. Models with a date in the ID (e.g. `20250929`) are fixed to that release. Starting with the Claude 4.6 generation, model IDs use a dateless format that is also a pinned snapshot, not an evergreen pointer. For models before 4.6, Claude API alias entries are convenience pointers that resolve to a dated model ID. See `model-ids-and-versions.md`.
- Starting with Claude Sonnet 4.5 and all subsequent models, Bedrock offers global endpoints (dynamic routing) and regional endpoints (guaranteed data routing). Google Cloud offers global, multi-region, and regional endpoints. See `pricing.md`.
- Claude Platform on AWS uses the same model IDs as the Claude API (e.g. `claude-opus-4-6`), not Bedrock-style IDs. Its model lifecycle follows Anthropic's first-party model deprecations, not Bedrock's.
- Model capabilities and token limits can be queried programmatically with the Models API; the response includes `max_input_tokens`, `max_tokens`, and a `capabilities` object.
- On Claude Opus 4.8, the `effort` parameter defaults to `high` on all surfaces (Claude API, Claude Code, claude.ai). On Claude Opus 5 and Claude Sonnet 5, it defaults to `high` on the Claude API and Claude Code.
- Max output values apply to the synchronous Messages API. On the Message Batches API, Claude Opus 5, Opus 4.8, Opus 4.7, Opus 4.6, Sonnet 5, and Sonnet 4.6 support up to 300k output tokens using the `output-300k-2026-03-24` beta header.
- Claude Mythos 5 and Claude Mythos Preview are offered separately for defensive cybersecurity workflows as part of Project Glasswing. Access is invitation-only with no self-serve sign-up.

## Related

- [Choosing a model](./choosing-a-model.md)
- [Model IDs and versioning](./model-ids-and-versions.md)
- [Migration guide](./migration-guide.md)
- [Introducing Claude Fable 5 and Claude Mythos 5](./introducing-claude-fable-5-and-claude-mythos-5.md)
- [Pricing](../pricing-lifecycle/pricing.md)
