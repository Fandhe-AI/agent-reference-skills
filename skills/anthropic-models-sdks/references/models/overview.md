<!-- source: https://platform.claude.com/docs/en/models/overview / last verified: 2026-10-17 -->

# Models overview

Claude is a family of state-of-the-art large language models developed by Anthropic. Compare the current lineup, find the model ID for every platform, and open each model's page for its full specs and resources.

## Signature / Usage

If you're unsure which model to use, start with **Claude Opus 5.5** (`claude-opus-5-5`) for most workloads. Use **Claude Fable 5.1** (`claude-fable-5-1`) for demanding reasoning and long-horizon agentic work, or when your evals on Claude Opus 5.5 at higher effort still fall short. All current models support text and image input, text output, multilingual capabilities, vision, and tool use. Each model's page lists the platforms it's available on.

Latest models comparison:

| Feature | Claude Fable 5.1 | Claude Opus 5.5 | Claude Sonnet 5.5 | Claude Haiku 5.5 |
| --- | --- | --- | --- | --- |
| Description | For demanding reasoning and long-horizon agentic work | For long-running agentic coding and knowledge work | The best combination of speed and intelligence | For high-volume, latency-sensitive tasks such as classification, extraction, and routing |
| Comparative latency | Slower | Moderate | Fast | Fastest |
| Pricing | $10 / input MTok, $50 / output MTok | $4 / input MTok, $20 / output MTok | $2 / input MTok, $10 / output MTok | From $0.10 / input MTok, From $0.50 / output MTok |
| Claude API ID | `claude-fable-5-1` | `claude-opus-5-5` | `claude-sonnet-5-5` | `claude-haiku-5-5` |
| Thinking | Adaptive (always on) | Adaptive (always on) | Adaptive | Adaptive |
| Default effort | `high` | `medium` | `high` | `medium` |
| Context window | 1M tokens | 1M tokens | 1M tokens | 1M tokens |
| Max output | 128K tokens | 128K tokens | 128K tokens | 128K tokens |
| Reliable knowledge cutoff | Jun 2026 | Jun 2026 | Jun 2026 | Jun 2026 |
| Training data cutoff | Jun 2026 | Jun 2026 | Jun 2026 | Jun 2026 |
| Retirement | Not sooner than September 1, 2027 | Not sooner than September 22, 2027 | Not sooner than September 28, 2027 | Not sooner than October 7, 2027 |
| Claude API alias | `claude-fable-5-1` | `claude-opus-5-5` | `claude-sonnet-5-5` | `claude-haiku-5-5` |
| Amazon Bedrock ID | `anthropic.claude-fable-5-1` | `anthropic.claude-opus-5-5` | `anthropic.claude-sonnet-5-5` | `anthropic.claude-haiku-5-5` |
| Google Cloud ID | `claude-fable-5-1` | `claude-opus-5-5` | `claude-sonnet-5-5` | `claude-haiku-5-5` |
| Microsoft Foundry ID | `claude-fable-5-1` | `claude-opus-5-5` | `claude-sonnet-5-5` | `claude-haiku-5-5` |
| Claude Platform on AWS ID | `claude-fable-5-1` | `claude-opus-5-5` | `claude-sonnet-5-5` | `claude-haiku-5-5` |

Row notes (from the official page):

- **Comparative latency:** Relative to the current lineup. Actual latency depends on prompt length, output length, and thinking effort.
- **Pricing:** Base price per million tokens. Batch API requests are 50% off; prompt cache reads cost 10% of the base input price (2.5% on Claude Fable 5.1 and Claude Mythos 5.1, 5% on Claude Opus 5.5 and Claude Sonnet 5.5). See `../pricing-lifecycle/pricing.md` for cache writes, long-context, and per-platform pricing.
- **Claude API ID:** Every Claude model ID is a pinned snapshot, including the dateless IDs used from the 4.6 generation on.
- **Thinking:** Adaptive thinking lets the model decide how much to think, steered by effort. Extended thinking is the manual `thinking.type` "enabled" + `budget_tokens` mode on earlier models; it is deprecated on Claude Opus 4.6 and Claude Sonnet 4.6 and not accepted on later models.
- **Default effort:** The `effort` parameter's default on the Claude API. Set effort explicitly to use a different level.
- **Context window:** 1M tokens is roughly 555k words or 2.5M Unicode characters on the current tokenizer (introduced with Claude Opus 4.7); models before it fit about 750k words in 1M tokens. 200k tokens is roughly 150k words.
- **Max output:** Synchronous Messages API limit. On the Message Batches API, Claude Opus 5.5, Claude Opus 5, Claude Sonnet 5.5, Claude Sonnet 5, Claude Haiku 5.5, Claude Opus 4.8, Claude Opus 4.7, Claude Opus 4.6, and Claude Sonnet 4.6 support up to 300k output tokens with the `output-300k-2026-03-24` beta header.
- **Reliable knowledge cutoff:** The date through which the model's knowledge is most extensive and reliable. Training data cutoff is the broader range of data used.
- **Retirement:** Anthropic's commitment for the platforms that Anthropic operates. Amazon Bedrock and Google Cloud set their own dates.
- **Claude API alias:** For models before the 4.6 generation, the alias is a convenience pointer that resolves to the dated ID. Dateless IDs are their own pinned snapshot; the alias row repeats them.
- **Amazon Bedrock ID:** The ID on Bedrock's Messages-API endpoint (Claude Opus 4.7 and later, plus Claude Haiku 4.5); a model offered only through Bedrock's InvokeModel integration shows that ID instead. Bedrock offers global endpoints (dynamic routing) and regional endpoints (guaranteed data routing) for Claude Sonnet 4.5 and later, and sets its own lifecycle dates.
- **Google Cloud ID:** Google Cloud offers global, multi-region, and regional endpoints, and sets its own lifecycle dates.
- **Microsoft Foundry ID:** Foundry deployments default to the Claude API model ID (the alias, where one exists); the deployment name is what you send. Foundry follows the Claude API lifecycle schedule.
- **Claude Platform on AWS ID:** Claude Platform on AWS uses the Claude API model IDs (the dateless form where the Claude API has an alias), not Bedrock-style IDs, and follows Anthropic's first-party model lifecycle.

Legacy models (still available): Claude Fable 5, Claude Opus 5, Claude Opus 4.8, Claude Opus 4.7, Claude Opus 4.6, Claude Opus 4.5, Claude Sonnet 5, Claude Sonnet 4.6, Claude Haiku 4.5. Each has its own model page at `platform.claude.com/docs/en/models/<model>/overview`.

Minimal request with a current model ID:

```python
import anthropic

client = anthropic.Anthropic()
message = client.messages.create(
    model="claude-opus-5-5",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Hello, Claude"}],
)
```

### Using the Models API

Query model capabilities and token limits programmatically with the Models API. The response includes `max_input_tokens`, `max_tokens`, and a `capabilities` object for every available model.

- **`line`:** Each model also has a `line` field naming the model line it belongs to. Claude Opus 4.5 and Claude Opus 4.6 both report `opus`. Use `line` to group models, for example in a model picker. `line` is `null` when a model belongs to no line. Read `line` instead of inferring it from the model's `id`. Anthropic might add more lines, so don't treat the set of values as fixed.
- **`capabilities.thinking.types.disabled`:** Reports whether the model accepts `thinking: {type: "disabled"}`, the setting that turns thinking off. `supported` is `false` when the model rejects `"disabled"` with a 400 error, and `true` on a model that doesn't support thinking. Even when `supported` is `true`, the API can still reject a `"disabled"` request for another reason, such as an effort level that the model doesn't allow with thinking off.
- **`capabilities.server_tools`:** Reports whether the model accepts the web search and code execution tools. It doesn't cover other server tools, such as web fetch. `server_tools.web_search.supported` and `server_tools.code_execution.supported` are `true` when the model accepts at least one version of that tool, not necessarily every version. `server_tools.supported` is `true` when the model accepts at least one of the two tools. Even when a tool is supported, your organization's settings can still cause a request that uses it to fail (for example, an administrator can disable web search).
- **Top-level `code_execution` capability:** A different check. It reports whether code that Claude runs in the code execution tool can call the request's other tools, as in programmatic tool calling. For Claude Haiku 4.5, for example, the Models API reports `server_tools.code_execution.supported` as `true` and `code_execution.supported` as `false`.

## Options / Props

Legacy model specs (from each model's page at `/docs/en/models/<model>/overview`; these models are no longer in the latest comparison):

| Feature | Claude Fable 5 (legacy) | Claude Opus 5 (legacy) | Claude Sonnet 5 (legacy) | Claude Haiku 4.5 (legacy) |
| --- | --- | --- | --- | --- |
| Claude API ID | claude-fable-5 | claude-opus-5 | claude-sonnet-5 | claude-haiku-4-5-20251001 |
| Claude API alias | claude-fable-5 | claude-opus-5 | claude-sonnet-5 | claude-haiku-4-5 |
| AWS Bedrock ID | anthropic.claude-fable-5 | anthropic.claude-opus-5 | anthropic.claude-sonnet-5 | anthropic.claude-haiku-4-5-20251001-v1:0 |
| Google Cloud ID | claude-fable-5 | claude-opus-5 | claude-sonnet-5 | claude-haiku-4-5@20251001 |
| Pricing | $10 / input MTok, $50 / output MTok | $5 / input MTok, $25 / output MTok | $2 / input MTok, $10 / output MTok | $1 / input MTok, $5 / output MTok |
| Extended thinking (`thinking.type: "enabled"`) | No | No | No | Yes |
| Adaptive thinking | Yes (always on) | Yes | Yes | No |
| Comparative latency | Slower | Moderate | Fast | Fastest |
| Context window | 1M tokens | 1M tokens | 1M tokens | 200k tokens |
| Max output | 128k tokens | 128k tokens | 128k tokens | 64k tokens |
| Reliable knowledge cutoff | Jan 2026 | May 2026 | Jan 2026 | Feb 2025 |
| Training data cutoff | Jan 2026 | May 2026 | Jan 2026 | Jul 2025 |

| Feature | Claude Opus 4.8 | Claude Opus 4.7 | Claude Opus 4.6 | Claude Sonnet 4.6 | Claude Sonnet 4.5 (deprecated, retires November 30, 2026) | Claude Opus 4.5 |
| --- | --- | --- | --- | --- | --- | --- |
| Claude API ID | claude-opus-4-8 | claude-opus-4-7 | claude-opus-4-6 | claude-sonnet-4-6 | claude-sonnet-4-5-20250929 | claude-opus-4-5-20251101 |
| Claude API alias | claude-opus-4-8 | claude-opus-4-7 | claude-opus-4-6 | claude-sonnet-4-6 | claude-sonnet-4-5 | claude-opus-4-5 |
| AWS Bedrock ID | anthropic.claude-opus-4-8 | anthropic.claude-opus-4-7 | anthropic.claude-opus-4-6-v1 | anthropic.claude-sonnet-4-6 | anthropic.claude-sonnet-4-5-20250929-v1:0 | anthropic.claude-opus-4-5-20251101-v1:0 |
| Google Cloud ID | claude-opus-4-8 | claude-opus-4-7 | claude-opus-4-6 | claude-sonnet-4-6 | claude-sonnet-4-5@20250929 | claude-opus-4-5@20251101 |
| Pricing | $5 / $25 MTok | $5 / $25 MTok | $5 / $25 MTok | $3 / $15 MTok | $3 / $15 MTok | $5 / $25 MTok |
| Extended thinking | No | No | Yes (deprecated) | Yes (deprecated) | Yes | Yes |
| Adaptive thinking | Yes | Yes | Yes | Yes | No | No |
| Comparative latency | Moderate | Moderate | Moderate | Fast | Fast | Moderate |
| Context window | 1M tokens | 1M tokens | 1M tokens | 1M tokens | 200k tokens | 200k tokens |
| Max output | 128k tokens | 128k tokens | 128k tokens | 128k tokens | 64k tokens | 64k tokens |
| Reliable knowledge cutoff | Jan 2026 | Jan 2026 | May 2025 | Aug 2025 | Jan 2025 | May 2025 |
| Training data cutoff | Jan 2026 | Jan 2026 | Aug 2025 | Jan 2026 | Jul 2025 | Aug 2025 |

## Notes

- The source URL moved from `/docs/en/about-claude/models/overview` to `/docs/en/models/overview` (the old URL redirects). The 2026-10 page lists Claude Fable 5.1, Opus 5.5, Sonnet 5.5, and Haiku 5.5 as the current lineup; Fable 5, Opus 5, Sonnet 5, and the 4.x models are legacy.
- Claude Fable 5.1 and Claude Mythos 5.1 share the cache-read rate of 2.5% of base input price; Claude Opus 5.5 and Claude Sonnet 5.5 use 5%. Other models use 10%.
- Every Claude model ID is a pinned snapshot. Models with a date in the ID (e.g. `20250929`) are fixed to that release. Starting with the Claude 4.6 generation, model IDs use a dateless format that is also a pinned snapshot, not an evergreen pointer. See `model-ids-and-versions.md`.
- Claude Platform on AWS uses the same model IDs as the Claude API (e.g. `claude-opus-5-5`), not Bedrock-style IDs. Its model lifecycle follows Anthropic's first-party model deprecations, not Bedrock's.
- When migrating from Claude Opus 5 or earlier, see the Claude Opus 5.5 migration guide (`migration-opus-5-5.md`).
- Claude Mythos 5 and Claude Mythos 5.1 are offered separately for defensive cybersecurity workflows and are available only to organizations verified through Anthropic's verification programs (for example the Cyber Verification Program). Claude Mythos Preview is Deprecated (see `../pricing-lifecycle/model-deprecations.md`).
- The model cards show Claude Fable 5, Claude Opus 5, and Claude Sonnet 5 as "Active (legacy)"; see `../pricing-lifecycle/model-deprecations.md` for lifecycle terms.

## Related

- [Choosing a model](./choosing-a-model.md)
- [Model IDs and versioning](./model-ids-and-versions.md)
- [Migration guide](./migration-guide.md)
- [Introducing Claude Fable 5 and Claude Mythos 5](./introducing-claude-fable-5-and-claude-mythos-5.md)
- [Pricing](../pricing-lifecycle/pricing.md)
