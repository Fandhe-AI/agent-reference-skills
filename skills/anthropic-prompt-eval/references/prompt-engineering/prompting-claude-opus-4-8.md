<!-- source: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-4-8 / last verified: 2026-08-07 -->

# Prompting Claude Opus 4.8

Behavioral differences and prompting patterns for Claude Opus 4.8, covering verbosity, effort calibration, tool use, subagents, and frontend defaults.

Claude Opus 4.8 has particular strengths in long-horizon agentic work, knowledge work, vision, and memory tasks, and performs well out of the box on existing Claude Opus 4.7 prompts.

## Response length and verbosity

Calibrates response length to perceived task complexity rather than a fixed default. To decrease verbosity: `"Provide concise, focused responses. Skip non-essential context, and keep examples minimal."` Positive examples of desired concision are more effective than negative "don't do X" instructions.

## Calibrating effort and thinking depth

The [effort parameter](https://platform.claude.com/docs/en/build-with-claude/effort) trades intelligence for speed/cost. Start at `xhigh` for coding/agentic use cases, minimum `high` for intelligence-sensitive use cases.

| Level | Guidance |
| --- | --- |
| `max` | Can deliver gains but diminishing returns and prone to overthinking; test for intelligence-demanding tasks |
| `xhigh` | Best for most coding and agentic use cases |
| `high` | Balances token usage and intelligence; minimum for intelligence-sensitive use cases |
| `medium` | Cost-sensitive use cases trading off intelligence |
| `low` | Short, scoped, latency-sensitive, non-intelligence-sensitive tasks |

Opus 4.8 respects effort levels strictly, especially at the low end — at `low`/`medium` it scopes work tightly, risking under-thinking on moderately complex tasks. Raise effort rather than prompting around shallow reasoning; if effort must stay `low`, add `"This task involves multistep reasoning. Think carefully through the problem before responding."` Thinking is off unless `thinking: {type: "adaptive"}` is explicitly set. If thinking triggers more than desired, steer with `"Thinking adds latency and should only be used when it will meaningfully improve answer quality..."` At `max`/`xhigh` effort, set a large max output token budget (start at 64k) so the model has room to think and act across subagents/tool calls.

## Tool use triggering

Favors reasoning over tool calls by default (usually beneficial). `high`/`xhigh` effort substantially increases tool usage in agentic search and coding; explicit instructions on when/how to use specific tools also help.

## User-facing progress updates

Provides more regular, higher-quality updates through long agentic traces than prior models — remove scaffolding that forces interim status messages ("after every 3 tool calls, summarize"). If updates aren't well-calibrated, describe the desired shape explicitly with examples.

## More literal instruction following

Interprets prompts literally, especially at lower effort — does not silently generalize an instruction from one item to another or infer unstated requests. State scope explicitly when broad application is intended (for example, "apply this formatting to every section, not just the first one").

## Tone and writing style

Tends toward direct, opinionated prose with minimal validation-forward phrasing and sparing emoji. Re-evaluate style prompts if the product needs a specific voice, for example: `"Use a warm, collaborative tone. Acknowledge the user's framing before answering."`

## Controlling subagent spawning

Spawns fewer subagents by default than expected; steerable via explicit guidance on when subagents are desirable versus when to complete work directly.

## Design and frontend defaults

Has a persistent default house style: warm cream/off-white backgrounds (~`#F4F1EA`), serif display type (Georgia, Fraunces, Playfair), italic word-accents, terracotta/amber accent — reads well for editorial/hospitality/portfolio but off for dashboards/dev tools/fintech/healthcare/enterprise. Generic instructions ("don't use cream," "make it clean") tend to shift to a different fixed palette rather than producing variety. Two reliable approaches:

1. **Specify a concrete alternative** — a fully detailed spec (color palette, typography, layout, motion) the model follows precisely.
2. **Have the model propose options before building** — for example, `"Before building, propose 4 distinct visual directions tailored to this brief (each as: bg hex / accent hex / typeface — one-line rationale). Ask the user to pick one, then implement only that direction."` — useful in place of `temperature`-driven variety.

Requires less frontend-design prompting than prior models to avoid "AI slop" aesthetics; a short `<frontend_aesthetics>` block banning overused fonts (Inter, Roboto, Arial) and purple-gradient clichés suffices, versus the longer snippet needed for earlier models (see the public frontend-design skill).

## Interactive coding products

Token usage/behavior differs between autonomous single-turn agents and interactive multi-turn agents — the latter reasons more after each user turn, improving long-horizon coherence but costing more tokens. Use `xhigh`/`high` effort, add autonomous features (auto mode), and reduce required user interactions; specify task/intent/constraints fully upfront rather than conveying them progressively, which reduces token efficiency and sometimes performance.

## Code review harnesses

Meaningfully better bug-finding (higher recall and precision) than prior models, but review prompts tuned for earlier models with qualitative bars ("only report high-severity," "be conservative," "don't nitpick") can cause Opus 4.8 to investigate thoroughly yet report fewer findings, lowering measured recall despite improved capability. Recommended prompt:

```text
Report every issue you find, including ones you are uncertain about or consider
low-severity. Do not filter for importance or confidence at this stage - a
separate verification step will do that. Your goal here is coverage: it is
better to surface a finding that later gets filtered out than to silently drop
a real bug. For each finding, include your confidence level and an estimated
severity so a downstream filter can rank them.
```

If self-filtering in a single pass, use concrete criteria ("bugs that could cause incorrect behavior, a test failure, or a misleading result; omit pure style/naming nits") rather than qualitative terms like "important."

## Computer use

[Computer use](https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool) works up to 2576px / 3.75MP; 1080p balances performance and cost, 720p or 1366×768 lower cost for cost-sensitive workloads.

## Notes

- `effort`/`thinking` parameter schema is an anthropic-api-core topic.

## Related

- [claude-prompting-best-practices](./claude-prompting-best-practices.md)
- [prompting-claude-opus-5](./prompting-claude-opus-5.md)
