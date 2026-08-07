<!-- source: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-sonnet-5 / last verified: 2026-08-07 -->

# Prompting Claude Sonnet 5

Behavioral differences and prompting patterns for Claude Sonnet 5, covering effort, adaptive thinking defaults, tool use, and migration from Claude Sonnet 4.6.

Claude Sonnet 5 has particular strengths in coding and agentic tasks, and performs well out of the box on existing Claude Sonnet 4.6 prompts.

## Response length and verbosity

Calibrates response length to task complexity rather than a fixed default. To decrease verbosity: `"Provide concise, focused responses. Skip non-essential context, and keep examples minimal."` Positive examples of desired concision outperform negative "don't" instructions.

## Calibrating effort and thinking depth

Effort defaults to `high` (same as Sonnet 4.6); raise to `xhigh` for the hardest coding/agentic tasks.

| Level | Guidance |
| --- | --- |
| `max` | Absolute maximum capability, no token-spend constraint |
| `xhigh` | Recommended for the hardest coding and agentic use cases |
| `high` | Default; balances token usage and intelligence |
| `medium` | Cost-sensitive use cases trading off intelligence |
| `low` | Short, scoped, latency-sensitive, non-intelligence-sensitive tasks |

Rough cross-model mapping: Sonnet 5 at `medium` ≈ Sonnet 4.6 at `high`; Sonnet 5 at `high` ≈ Sonnet 4.6 at `max`. Match by observed thinking length rather than effort name when benchmarking. Respects effort strictly at the low end (risk of under-thinking at `low` on moderately complex tasks) — raise effort rather than prompting around it, or add `"This task involves multistep reasoning. Think carefully through the problem before responding."`

[Adaptive thinking](https://platform.claude.com/docs/en/build-with-claude/thinking) is **on by default** (a change from Sonnet 4.6, where omitting `thinking` ran without it). Pass `thinking: {type: "disabled"}` to turn it off entirely. Because `max_tokens` is a hard limit on thinking + response text combined, revisit `max_tokens` for workloads that previously ran without thinking. Manual extended thinking (`budget_tokens`) is **not supported** — returns a 400 error; use adaptive thinking with `effort` instead. If thinking triggers more than desired: `"Thinking adds latency and should only be used when it will meaningfully improve answer quality, typically for problems that require multistep reasoning. When in doubt, respond directly."`

At `high`/`xhigh`/`max` effort, leave headroom in `max_tokens` — a tight budget can produce an almost-entirely-thinking response truncated with `stop_reason: "max_tokens"`. Sonnet 5 also uses a new tokenizer producing ~30% more tokens for the same text than Sonnet 4.6, so `max_tokens` limits tuned for 4.6 may truncate equivalent output.

## Tool use triggering

More agentic than Sonnet 4.6 by default — reaches for tools and self-verification loops more readily. With thinking disabled, less likely to reach for tools; add an explicit nudge if you rely on tool calls with thinking off. `high`/`xhigh` effort substantially increases tool usage in agentic search/coding.

## User-facing progress updates

Provides regular, higher-quality updates through long agentic traces — remove scaffolding that forces interim status messages. Describe desired update shape/examples explicitly if not well-calibrated.

## More literal instruction following

Interprets prompts literally, especially at lower effort — does not silently generalize instructions or infer unstated requests. State scope explicitly for broad application (for example, "apply this formatting to every section, not just the first one").

## Tone and writing style

Re-evaluate style prompts against the new baseline if a specific voice is required, for example: `"Use a warm, collaborative tone. Acknowledge the user's framing before answering."` Setting `temperature`, `top_p`, or `top_k` to a non-default value now returns a **400 error** (new constraint for Sonnet-class models) — remove these parameters and use system-prompt instructions for tone/variety instead.

## Design and frontend defaults

May settle into a consistent default visual style on open-ended briefs; generic "don't use X color" instructions tend to shift to a different fixed palette rather than variety. Two reliable approaches: (1) specify a concrete alternative spec the model follows precisely; (2) have the model propose several distinct visual directions before building (recommended in place of `temperature`, which is no longer accepted). A short `<frontend_aesthetics>` block banning overused fonts and purple-gradient clichés steers away from "AI slop" aesthetics; see the public frontend-design skill for a fuller treatment.

## Interactive coding products

Token usage/behavior differs between autonomous single-turn and interactive multi-turn coding agents. Use `xhigh`/`high` effort, add autonomous features (auto mode), and specify task/intent/constraints fully upfront rather than progressively, which reduces token efficiency and sometimes performance.

## Code review harnesses

Harnesses tuned for earlier models with qualitative bars ("only report high-severity," "be conservative") can cause Sonnet 5 to investigate thoroughly yet report fewer findings, lowering measured recall despite improved capability. Recommended prompt:

```text
Report every issue you find, including ones you are uncertain about or consider
low-severity. Do not filter for importance or confidence at this stage - a
separate verification step will do that. Your goal here is coverage: it is
better to surface a finding that later gets filtered out than to silently drop
a real bug. For each finding, include your confidence level and an estimated
severity so a downstream filter can rank them.
```

If self-filtering in a single pass, use concrete criteria rather than qualitative terms like "important."

## Computer use

Supports the `computer_20251124` tool version. [Computer use](https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool) works up to 2576px / 3.75MP; 1080p balances performance and cost, 720p or 1366×768 lower cost for cost-sensitive workloads.

## Notes

- Full `effort`/`thinking`/sampling-parameter schema (including the new tokenizer and the `temperature`/`top_p`/`top_k` 400-error constraint) is an anthropic-api-core topic.

## Related

- [claude-prompting-best-practices](./claude-prompting-best-practices.md)
- [prompting-claude-opus-5](./prompting-claude-opus-5.md)
