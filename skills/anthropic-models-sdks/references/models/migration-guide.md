<!-- source: https://platform.claude.com/docs/en/about-claude/models/migration-guide / last verified: 2026-10-17 -->

# Migration guides

Guides for migrating to the latest Claude models from previous Claude versions. The official page is now a hub that links to one guide per current model.

## Signature / Usage

| Guide | Page |
| --- | --- |
| Claude Fable 5.1 and Claude Mythos 5.1 migration guide | [migration-fable-5-1.md](./migration-fable-5-1.md) |
| Claude Opus 5.5 migration guide | [migration-opus-5-5.md](./migration-opus-5-5.md) |
| Claude Sonnet 5.5 migration guide | [migration-sonnet-5-5.md](./migration-sonnet-5-5.md) |
| Claude Haiku 5.5 migration guide | [migration-haiku-5-5.md](./migration-haiku-5-5.md) |

Get help: check the API documentation for detailed specifications, review model capabilities (`overview.md`) for performance comparisons, review API release notes for API updates, and contact support if you encounter any issues during migration.

Minimal migration shape (model ID swap, no manual `thinking` budget, no sampling parameters, no prefill):

```python
response = client.messages.create(
    model="claude-opus-5-5",  # was an earlier model ID
    max_tokens=1024,
    messages=[{"role": "user", "content": "Hello"}],
)
```

## Notes

- Claude Fable 5 is legacy (successor: Claude Fable 5.1). For migrating from Fable 5, see `migration-fable-5-1.md`. Claude Opus 5 and Claude Sonnet 5 are likewise legacy; see `migration-opus-5-5.md` and `migration-sonnet-5-5.md`.
- The `/claude-api migrate` command in Claude Code can automate model migrations, applying model ID swaps, parameter changes, prefill replacements, and effort calibration across codebases, then producing verification checklists.
- Migration checklist summary: update model name; remove/update thinking configuration as needed; audit and remove sampling parameters; review and re-tune prompts for behavioral changes; handle new safety features (refusals, classifiers); re-baseline costs and latency; update `max_tokens` for token counting changes; consider new features (task budgets, fallbacks, mid-conversation tools).
- Previous-generation guidance (content of this page before the hub restructure, kept for reference):
  - Claude Mythos 5 / Claude Fable 5: Fable 5 is the most capable widely released model (Claude API, Amazon Bedrock, Claude Platform on AWS, Google Cloud, Microsoft Foundry); Mythos 5 offers the same capabilities in limited availability through Project Glasswing. Both: adaptive thinking always on; prefill not supported (400); 1M token context window default, up to 128k output tokens; $10/MTok input, $50/MTok output; require 30-day data retention, not available under ZDR. Fable 5 is GA with safety classifiers (may return `stop_reason: "refusal"`) and supports Priority Tier; Mythos 5 is access-gated, without classifiers.
  - From Claude Mythos Preview: mostly drop-in. Remove manual extended thinking (`thinking: {type: "enabled", budget_tokens: N}`); no assistant message prefilling; thinking output never returns raw chain of thought (set `thinking.display: "summarized"` for summaries); same tokenizer.
  - Claude Opus 5, from Opus 4.8: requests without `thinking` run with adaptive thinking; `thinking: {type: "disabled"}` with effort `xhigh`/`max` returns 400; prompt cache minimum 512 tokens (down from 1,024).
  - Claude Opus 5, from Opus 4.6 and earlier: `thinking: {type: "enabled", budget_tokens: N}` returns 400; thinking on by default; disabling thinking capped at `high` effort; `temperature`, `top_p`, `top_k` return 400; thinking content omitted by default (set `thinking.display: "summarized"`); new tokenizer uses 1x-1.35x more tokens (up to ~35% more); prefill returns 400; high-resolution images up to 2,576px on the long edge.
  - Effort levels: `max`, `xhigh`, `high` (default), `medium`, `low`.

## Related

- [Models overview](./overview.md)
- [Migrating to Claude Fable 5.1 / Mythos 5.1](./migration-fable-5-1.md)
- [Migrating to Claude Opus 5.5](./migration-opus-5-5.md)
- [Migrating to Claude Sonnet 5.5](./migration-sonnet-5-5.md)
- [Migrating to Claude Haiku 5.5](./migration-haiku-5-5.md)
- [Introducing Claude Fable 5 and Claude Mythos 5](./introducing-claude-fable-5-and-claude-mythos-5.md)
- [What's new in Claude Opus 5](./whats-new-opus-5.md)
- [What's new in Claude Sonnet 5](./whats-new-sonnet-5.md)
