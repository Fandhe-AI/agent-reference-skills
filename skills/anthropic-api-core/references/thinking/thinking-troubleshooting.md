<!-- source: https://platform.claude.com/docs/en/build-with-claude/thinking-troubleshooting / last verified: 2026-08-07 -->

# Troubleshooting thinking

Diagnose and fix common thinking failures: configuration 400 errors, empty/missing thinking blocks, `max_tokens` stops, and cache misses.

## Options / Props

Per-model supported thinking types (values not listed as rejected are accepted):

| Model | Thinking types | Default | Rejected with 400 |
|---|---|---|---|
| Claude Fable 5.1 | Adaptive only | Always on | `"enabled"`, `"disabled"` |
| Claude Mythos 5.1 | Adaptive only | Always on | `"enabled"`, `"disabled"` |
| Claude Fable 5 | Adaptive only | Always on | `"enabled"`, `"disabled"` |
| Claude Mythos 5 | Adaptive only | Always on | `"enabled"`, `"disabled"` |
| Claude Mythos Preview | Adaptive, extended | Always on | `"disabled"` |
| Claude Opus 5.5 | Adaptive only | Always on | `"enabled"`, `"disabled"` |
| Claude Opus 5 | Adaptive only | On | `"enabled"`, `"disabled"` (with xhigh/max effort) |
| Claude Opus 4.8 / 4.7 | Adaptive only | Off | `"enabled"` |
| Claude Sonnet 5.5 | Adaptive, `between_tools` | On | `"enabled"`, `"disabled"` |
| Claude Sonnet 5 | Adaptive only | On | `"enabled"` |
| Claude Haiku 5.5 | Adaptive only | On | `"enabled"`, `"disabled"` (with xhigh/max effort, or a per-message effort that differs from the level in effect) |
| Claude Opus 4.6 / Sonnet 4.6 | Adaptive, extended (deprecated) | Off | None |
| Claude Opus 4.5 / Haiku 4.5 / Sonnet 4.5 | Extended only | Off | `"adaptive"` |

## Notes

- `"thinking.type.enabled" is not supported` → model dropped extended thinking; switch to `thinking: {type: "adaptive"}` + `output_config.effort`.
- `"thinking.type.disabled" is not supported` → model's thinking is always on (Fable 5, Mythos 5, Mythos Preview); omit `thinking`, or use `display: "omitted"` to hide the text instead. Opus 5 also rejects `"disabled"` combined with `xhigh`/`max` effort.
- `adaptive thinking is not supported on this model` → model supports only extended thinking; use `budget_tokens`.
- `thinking or redacted_thinking blocks in the latest assistant message cannot be modified` → you altered/filtered/rebuilt the assistant message when echoing it back; echo verbatim including `redacted_thinking`.
- `messages.{i}.content.{j}: Invalid `signature` in `thinking` block. The block is bound to a different conversation. Remove the block, or set `thinking.block_binding.prefix_mismatch_behavior` to "drop_block".` (400 `invalid_request_error` on Fable 5.1 / Opus 5.5 / Sonnet 5.5 / Haiku 5.5) → the prefix check failed because earlier history (`system`, `tools`, or a preceding message) changed. Keep history append-only, or send beta header `thinking-binding-controls-2026-08-01` with `thinking.block_binding.prefix_mismatch_behavior: "drop_block"`. Retrying the same body doesn't clear it. The check is enforced for accounts created on or after August 31, 2026 and for any request that sets `prefix_mismatch_behavior`; server-side compaction and context editing never trigger it. If the message stops after ``Invalid `signature` in `thinking` block``, the signature itself didn't verify (truncated, altered, empty) and `prefix_mismatch_behavior` doesn't apply.
- Sending `block_binding` without the `thinking-binding-controls-2026-08-01` header: the message adds ``That setting requires the `thinking-binding-controls-2026-08-01` value in the `anthropic-beta` header.``
- A block from a model the target model can't read is dropped, not rejected (no error); under the beta header it is reported in the response `input_transformations`.
- On Sonnet 5.5 and Haiku 5.5, `block_binding` works only with `thinking: {"type": "adaptive"}` (not `between_tools` / `disabled`).
- Empty `thinking` field with populated `signature` → `display` defaulted to `"omitted"`; set `display: "summarized"` to see text.
- No thinking block on some turns → normal in adaptive mode when Claude judges the request simple; raise `effort` or steer with prompting if unwanted.
- Tool calls or `<thinking>` XML tags leaking into visible text → happens on Opus 5 with thinking disabled, especially tool-heavy workloads; re-enable thinking and use lower `effort` instead of disabling it.
- `stop_reason: "max_tokens"` → thinking consumed the budget; raise `max_tokens` or lower `effort`.
- Cache hits drop to zero after changing thinking settings → thinking config/effort is part of the cached prefix; keep both constant across a cached conversation.
- Changing `effort` has no visible effect → effort only drives thinking depth in adaptive mode; on extended-thinking-only models, adjust `budget_tokens` instead (except Opus 4.5, where both compose).

## Related

- [thinking.md](./thinking.md)
- [extended-thinking.md](./extended-thinking.md)
- [preserved-thinking.md](./preserved-thinking.md)
