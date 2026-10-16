<!-- source: https://platform.claude.com/docs/en/models/sonnet-5-5/whats-new-sonnet-5-5 / last verified: 2026-10-17 -->

# What's new in Claude Sonnet 5.5

What changes when moving from Claude Sonnet 5 to Claude Sonnet 5.5: breaking changes, feature support, behavior differences, pricing, and availability. Sonnet 5.5 offers the best combination of speed and intelligence.

## Signature / Usage

| Model | Claude API ID | Description |
| --- | --- | --- |
| Claude Sonnet 5.5 | `claude-sonnet-5-5` | The best combination of speed and intelligence |

Adaptive thinking is on by default; default `effort` on the Claude API is `high`. Same tokenizer as Sonnet 5.

To turn off up-front thinking, send `between_tools` instead of `disabled`:

```python
client.messages.create(
    model="claude-sonnet-5-5",
    max_tokens=16000,
    thinking={"type": "between_tools"},
    output_config={"effort": "high"},
    messages=[{"role": "user", "content": "..."}],
)
```

## Notes

- **Breaking, `between_tools`:** `thinking: {"type": "disabled"}` returns 400 `invalid_request_error` pointing to `between_tools` (the lowest thinking setting, no beta header, all platforms). Accepted at `low` / `medium` / `high` effort; at `xhigh` / `max` it returns 400 (use adaptive thinking). It takes no other field (`display`, `budget_tokens`, `block_binding` return 400), and per-message `output_config.effort` that differs from the level in effect returns 400. Manual `budget_tokens` returns 400.
- **Breaking, forced tool use:** `tool_choice` `any` / `tool` returns 400; `auto` and `none` supported; same check on token counting.
- **Breaking, thinking blocks tied to the model and the conversation:** Sonnet 5.5 reads blocks from Sonnet 5, Opus 4.8, Haiku 4.5, and earlier models and, on the Claude API and Google Cloud, from Haiku 5.5; not from Opus 5, Opus 5.5, or any Fable / Mythos model. On the Claude API and Google Cloud Opus 5.5 reads Sonnet 5.5 blocks. Prefix check enforced by default for accounts created on or after August 31, 2026, 00:00 UTC (Claude API, Bedrock, Google Cloud); `block_binding` works only with `thinking: {"type": "adaptive"}`.
- **Breaking on the Claude API and Google Cloud, `computer_20251124`:** returns 400; use `computer_toolset_20260801`. Amazon Bedrock accepts `computer_20251124`.
- **Breaking, advisor tool pairings (beta):** a Sonnet 5.5 executor needs Mythos 5.1, Fable 5.1, Mythos 5, Fable 5, Opus 5.5, Opus 5, or Sonnet 5.5 as advisor. Opus 4.8, Opus 4.7, Sonnet 5, and Haiku 5.5 advisors return 400. Advice returns encrypted as an `advisor_redacted_result` block.
- **Response shape:** notes longer than a sentence or two between tool calls come back as progress-update `thinking` blocks (empty at default `display: "omitted"`); shorter remarks stay `text`. With `between_tools` the text comes back.
- **Feature support:** per-message effort (beta), mid-conversation system messages, mid-conversation tool changes (beta), prompt caching with a 512-token minimum (1,024 on Sonnet 5), batch, Files API, PDF, vision, tools. Per-message effort, mid-conversation system messages, and tool changes are not available on Sonnet 5. Betas: `compact-2026-09-04`, `inline-tools-2026-09-15`.
- **Account-bound thinking:** blocks work only in the account that produced them or a linked account; otherwise dropped (`reason: "organization_binding_mismatch"` in `input_transformations` with the beta header).
- **Behavior differences:** effort levels recalibrated (re-run sweeps); five `stop_details` categories: `cyber`, `bio`, `frontier_llm`, `reasoning_extraction`, `general_harms`. Server-side fallback retries `cyber` and `frontier_llm` declines on Sonnet 5 only.
- **Pricing:** same as Sonnet 5 except prompt cache reads at $0.10 per MTok (half the Sonnet 5 rate).
- **Availability:** Claude API `claude-sonnet-5-5`; Bedrock `anthropic.claude-sonnet-5-5`; Claude Platform on AWS, Google Cloud, Microsoft Foundry `claude-sonnet-5-5`.

## Related

- [Models overview](./overview.md)
- [Claude Sonnet 5.5 migration guide](./migration-sonnet-5-5.md)
- [What's new in Claude Sonnet 5](./whats-new-sonnet-5.md)
