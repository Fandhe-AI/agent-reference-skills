<!-- source: https://platform.claude.com/docs/en/build-with-claude/extended-thinking / last verified: 2026-08-07 -->

# Extended thinking

Manual (legacy) thinking mode with a fixed `budget_tokens` budget, for Claude models that don't support adaptive thinking.

## Signature / Usage

```python
response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=16000,
    thinking={"type": "enabled", "budget_tokens": 10000},
    messages=[{"role": "user", "content": "Are there infinitely many primes n mod 4 == 3?"}],
)
```

Migrating to adaptive thinking:

```json
// before
{"thinking": {"type": "enabled", "budget_tokens": 10000}}
// after
{"thinking": {"type": "adaptive"}, "output_config": {"effort": "high"}}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `thinking.type` | `"enabled"` | Turns on manual extended thinking. |
| `thinking.budget_tokens` | integer | Target token budget for reasoning. Minimum 1,024; must be less than `max_tokens` (exception: interleaved thinking, where the budget can span the whole assistant turn). A soft target, not a strict cap. |

## Notes

- Deprecated on Claude 4.6 models (still works); Claude 4.7+ reject `type: "enabled"` with a 400 error. Claude 4.5 and earlier that support thinking only have this mode. Where both modes exist, prefer adaptive thinking (thinking.md).
- No cache pre-warming (`max_tokens: 0`) possible together with extended thinking, since `budget_tokens < max_tokens` is required.
- Interleaved thinking in manual mode needs the `interleaved-thinking-2025-05-14` beta header on Opus 4.5/Sonnet 4.5/earlier Claude 4 models; Sonnet 4.6 accepts but deprecates it (adaptive thinking interleaves automatically); Opus 4.6 has no manual-mode interleaving at all. Claude Haiku 4.5 does not support interleaved thinking.
- The final assistant turn of a thinking-enabled request must begin with a thinking block (adaptive thinking drops this requirement).
- Changing `budget_tokens` between requests invalidates prompt-cache breakpoints, same as switching thinking modes.
- For thinking budgets above ~32k tokens, use batch processing to avoid request timeouts.
- On Claude Opus 4.5 (the only extended-thinking-only model that also supports `effort`), effort and `budget_tokens` compose: effort shapes the whole response, `budget_tokens` sets thinking depth.

## Related

- [thinking.md](./thinking.md)
- [effort.md](./effort.md)
