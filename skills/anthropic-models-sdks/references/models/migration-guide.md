<!-- source: https://platform.claude.com/docs/en/about-claude/models/migration-guide / last verified: 2026-08-07 -->

# Migration Guide

Anthropic's comprehensive guide for migrating to the latest Claude models from previous versions.

## Signature / Usage

### Migrating to Claude Mythos 5 and Claude Fable 5

**Claude Fable 5** is the most capable widely released model, available on Claude API, Amazon Bedrock, Claude Platform on AWS, Google Cloud, and Microsoft Foundry. **Claude Mythos 5** offers the same capabilities in limited availability through Project Glasswing.

Baseline settings (both models): adaptive thinking always on (no configuration required); prefill not supported (returns 400 error); 1M token context window default, up to 128k output tokens; pricing $10/MTok input, $50/MTok output; require 30-day data retention, not available under ZDR.

Key differences: Fable 5 is GA, Mythos 5 is access-gated. Fable 5 includes safety classifiers (may return `stop_reason: "refusal"`); Mythos 5 does not. Priority Tier is supported on Fable 5 only.

### Migrating from Claude Mythos Preview

Mostly drop-in with the same Messages API and tool use patterns. Key changes: remove manual extended thinking (`thinking: {type: "enabled", budget_tokens: N}`); no assistant message prefilling; thinking output never returns raw chain of thought (set `thinking.display: "summarized"` for summaries); same tokenizer, so token counts roughly unchanged.

### Migrating to Claude Opus 5

Claude Opus 5 is a step-change improvement over Opus 4.8, excelling at deep reasoning and long-horizon tasks.

**From Claude Opus 4.8** — breaking changes: requests without `thinking` field now run with adaptive thinking; `thinking: {type: "disabled"}` with effort `xhigh`/`max` returns 400 error. Recommended: test `max` effort for capability-critical work, consider automatic fallbacks, cache shorter prompts (512 token minimum, down from 1,024), change tools mid-conversation (beta), re-tune length/verbosity prompts.

**From Claude Opus 4.6 and earlier** — breaking changes: extended thinking removed (`thinking: {type: "enabled", budget_tokens: N}` returns 400 error); thinking on by default (Opus 5 only); disabling thinking capped at `high` effort (Opus 5 only); sampling parameters removed (`temperature`, `top_p`, `top_k` return 400 error); thinking content omitted by default (set `thinking.display: "summarized"` to restore); updated token counting (new tokenizer uses 1x-1.35x more tokens, up to ~35% more); prefill removal (returns 400 error).

Behavior changes: response length varies by use case complexity; more literal instruction following; more direct tone; built-in progress updates in agentic traces; different subagent spawning patterns; stricter effort calibration; fewer tool calls by default; real-time cybersecurity safeguards; high-resolution image support (up to 2,576px on long edge).

Effort levels: `max` (maximum capability, diminishing returns on simpler tasks), `xhigh` (extended capability for long-running work), `high` (default, balanced), `medium` (cost-saving), `low` (most efficient for short, scoped tasks).

## Notes

- The `/claude-api migrate` command in Claude Code can automate model migrations, applying model ID swaps, parameter changes, prefill replacements, and effort calibration across codebases, then producing verification checklists.
- Migration checklist summary: update model name; remove/update thinking configuration as needed; audit and remove sampling parameters; review and re-tune prompts for behavioral changes; handle new safety features (refusals, classifiers); re-baseline costs and latency; update `max_tokens` for token counting changes; consider new features (task budgets, fallbacks, mid-conversation tools).

## Related

- [Models overview](./overview.md)
- [Introducing Claude Fable 5 and Claude Mythos 5](./introducing-claude-fable-5-and-claude-mythos-5.md)
- [What's new in Claude Opus 5](./whats-new-opus-5.md)
- [What's new in Claude Sonnet 5](./whats-new-sonnet-5.md)
