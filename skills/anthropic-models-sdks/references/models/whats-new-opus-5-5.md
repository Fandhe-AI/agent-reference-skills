<!-- source: https://platform.claude.com/docs/en/models/opus-5-5/whats-new-opus-5-5 / last verified: 2026-10-17 -->

# What's new in Claude Opus 5.5

Overview of breaking changes, feature support, and behavior differences in Claude Opus 5.5, built for long-running agentic coding and knowledge work, priced at $4 / $20 USD per million input / output tokens.

## Signature / Usage

| Model | Claude API ID | Description |
| --- | --- | --- |
| Claude Opus 5.5 | `claude-opus-5-5` | For long-running agentic coding and knowledge work |

Adaptive thinking is always on; the `effort` parameter controls depth and its default on this model is `medium`.

```python
model = "claude-opus-5"  # Before
model = "claude-opus-5-5"  # After
```

Then remove any `thinking: {"type": "disabled"}` or `thinking: {"type": "enabled", ...}` settings and choose an effort level instead.

## Notes

- **Breaking, thinking can't be disabled:** on Opus 5, `thinking: {"type": "disabled"}` is accepted at effort `high` or below. On Opus 5.5 both `{"type": "disabled"}` and `{"type": "enabled", "budget_tokens": N}` return 400 `invalid_request_error`. Omit `thinking`, or send `{"type": "adaptive"}` (equivalent). Select content blocks by `type`, not position, and pass `thinking` blocks back unmodified.
- **Breaking, forced tool use:** `tool_choice` `any` / `tool` returns 400 (`tool_choice: type "tool" and "any" are not supported for this model.`). Use `auto` with `strict: true` or structured outputs; same validation on token counting.
- **Breaking, thinking blocks tied to the model and the conversation:** Opus 5.5 reads thinking blocks from Opus 5, earlier Opus / Sonnet / Haiku models and, on the Claude API and Google Cloud, from Sonnet 5.5 and Haiku 5.5, but not from Claude Fable or Claude Mythos. On the Claude API, Fable 5.1 and Mythos 5.1 read Opus 5.5 blocks; no other model does. Unreadable blocks are dropped (not billed); header `thinking-binding-controls-2026-08-01` reports drops in `input_transformations`. Editing `system`, `tools`, or earlier messages invalidates later blocks (enforced by default for accounts created on or after August 31, 2026, 00:00 UTC); `thinking.block_binding.prefix_mismatch_behavior: "drop_block"` drops instead of erroring.
- **Breaking on the Claude API and Google Cloud, `computer_20251124`:** a request declaring it returns 400 (`'claude-opus-5-5' does not support tool types: computer_20251124.`). Use `{"type": "computer_toolset_20260801"}` without the beta header. On Amazon Bedrock `computer_20251124` keeps working.
- **Response shape:** text between tool calls comes back in `thinking` blocks, empty at the default `display: "omitted"`; set `display` to `"updates"` (beta, `thinking-display-updates-2026-08-18`) or `"summarized"` to receive it.
- **Feature support:** per-message effort (beta), mid-conversation system messages, task budgets, prompt caching (512-token minimum), batch processing, Files API, PDF, vision, server- and client-side tools. Fast mode (`speed: "fast"`, no beta header) on the Claude API and on Claude in Microsoft Foundry for Azure-hosted deployments only; not on Bedrock, Claude Platform on AWS, or Google Cloud.
- **Beta features:** `inline-tools-2026-09-15` (a `tool_addition` block in a mid-conversation system message carries a full tool definition); `compact-2026-09-04` (top-level `compaction` parameter returns a signed `compaction` block).
- **Behavior differences from Opus 5:** default effort `medium` (was `high`); more thinking per turn at a given effort, most at `xhigh` / `max`; biology safety classifier in addition to cybersecurity, `reasoning_extraction` category may decline; sharper chart / diagram / screenshot reading.
- **Refusals:** `stop_reason: "refusal"` with `stop_details`; `fallbacks: "default"` (beta) retries on the model Anthropic recommends for that category.
- **Pricing (USD per MTok):** input $4, output $20 (Opus 5: $5 / $25); 5m cache write $5, 1h cache write $8, cache read $0.20 (0.05x); batch $2 / $10.
- **Availability:** Claude API `claude-opus-5-5`; Amazon Bedrock `anthropic.claude-opus-5-5`; Claude Platform on AWS `claude-opus-5-5`; Google Cloud `claude-opus-5-5`; Microsoft Foundry `claude-opus-5-5`.

## Related

- [Models overview](./overview.md)
- [Claude Opus 5.5 migration guide](./migration-opus-5-5.md)
- [What's new in Claude Opus 5](./whats-new-opus-5.md)
- [What's new in Claude Fable 5.1](./whats-new-fable-5-1.md)
