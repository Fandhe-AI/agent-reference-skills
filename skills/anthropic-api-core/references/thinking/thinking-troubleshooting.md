<!-- source: https://platform.claude.com/docs/en/build-with-claude/thinking-troubleshooting / last verified: 2026-08-07 -->

# Troubleshooting thinking

Diagnose and fix common thinking failures: configuration 400 errors, empty/missing thinking blocks, `max_tokens` stops, and cache misses.

## Options / Props

Per-model supported thinking types (values not listed as rejected are accepted):

| Model | Thinking types | Default | Rejected with 400 |
|---|---|---|---|
| Claude Fable 5 | Adaptive only | Always on | `"enabled"`, `"disabled"` |
| Claude Mythos 5 | Adaptive only | Always on | `"enabled"`, `"disabled"` |
| Claude Mythos Preview | Adaptive, extended | Always on | `"disabled"` |
| Claude Opus 5 | Adaptive only | On | `"enabled"`, `"disabled"` (with xhigh/max effort) |
| Claude Opus 4.8 / 4.7 | Adaptive only | Off | `"enabled"` |
| Claude Sonnet 5 | Adaptive only | On | `"enabled"` |
| Claude Opus 4.6 / Sonnet 4.6 | Adaptive, extended (deprecated) | Off | None |
| Claude Opus 4.5 / Haiku 4.5 / Sonnet 4.5 | Extended only | Off | `"adaptive"` |

## Notes

- `"thinking.type.enabled" is not supported` → model dropped extended thinking; switch to `thinking: {type: "adaptive"}` + `output_config.effort`.
- `"thinking.type.disabled" is not supported` → model's thinking is always on (Fable 5, Mythos 5, Mythos Preview); omit `thinking`, or use `display: "omitted"` to hide the text instead. Opus 5 also rejects `"disabled"` combined with `xhigh`/`max` effort.
- `adaptive thinking is not supported on this model` → model supports only extended thinking; use `budget_tokens`.
- `thinking or redacted_thinking blocks in the latest assistant message cannot be modified` → you altered/filtered/rebuilt the assistant message when echoing it back; echo verbatim including `redacted_thinking`.
- Empty `thinking` field with populated `signature` → `display` defaulted to `"omitted"`; set `display: "summarized"` to see text.
- No thinking block on some turns → normal in adaptive mode when Claude judges the request simple; raise `effort` or steer with prompting if unwanted.
- Tool calls or `<thinking>` XML tags leaking into visible text → happens on Opus 5 with thinking disabled, especially tool-heavy workloads; re-enable thinking and use lower `effort` instead of disabling it.
- `stop_reason: "max_tokens"` → thinking consumed the budget; raise `max_tokens` or lower `effort`.
- Cache hits drop to zero after changing thinking settings → thinking config/effort is part of the cached prefix; keep both constant across a cached conversation.
- Changing `effort` has no visible effect → effort only drives thinking depth in adaptive mode; on extended-thinking-only models, adjust `budget_tokens` instead (except Opus 4.5, where both compose).

## Related

- [thinking.md](./thinking.md)
- [extended-thinking.md](./extended-thinking.md)
