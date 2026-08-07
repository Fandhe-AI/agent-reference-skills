<!-- source: https://platform.claude.com/docs/en/build-with-claude/fast-mode / last verified: 2026-08-07 -->

# Fast mode (research preview)

Up to 2.5x higher output tokens per second from supported Claude Opus models, at premium pricing. Same model weights/behavior — a faster inference configuration, not a different model.

## Signature / Usage

```python
response = client.beta.messages.create(
    model="claude-opus-5",
    max_tokens=4096,
    speed="fast",
    betas=["fast-mode-2026-02-01"],
    messages=[{"role": "user", "content": "Refactor this module to use dependency injection"}],
)
print(response.usage.speed)  # "fast" or "standard"
```

Set `speed: "fast"` with beta header `anthropic-beta: fast-mode-2026-02-01`.

## Options / Props

| Model | Fast mode support |
|---|---|
| Claude Opus 5 / Claude Opus 4.8 | Supported |
| Claude Opus 4.7 | Not available — `speed: "fast"` returns an error, no fallback |
| Claude Opus 4.6 | Not available — silently runs at standard speed, billed standard, `usage.speed: "standard"` (no error) |

| Field | Description |
|---|---|
| `speed` | `"fast"` or omit for standard |
| `usage.speed` | Response field reporting which speed actually ran (`"fast"`/`"standard"`) |

Pricing: Opus 5 / Opus 4.8 fast mode = $10/MTok input, $50/MTok output (stacks with prompt-caching and data-residency multipliers).

Rate-limit headers: `anthropic-fast-input-tokens-limit/remaining/reset`, `anthropic-fast-output-tokens-limit/remaining/reset` — separate pool from standard Opus limits; exceeding returns 429 with `retry-after`.

## Notes

- Benefits target output tokens/sec (OTPS), not time-to-first-token (TTFT); gains are most visible with streaming.
- Research preview — requires account manager access or waitlist signup; Claude API (including Claude Managed Agents) only — not Amazon Bedrock, Google Cloud, Microsoft Foundry, or Claude Platform on AWS.
- Not available with the Batch API or with a Priority Tier commitment.
- SDKs auto-retry 429s up to `max_retries` (default varies) waiting the server `retry-after` delay. To fall back to standard speed instead of waiting, set `max_retries: 0` on the fast request, catch the rate-limit error, and resend without `speed: "fast"`.
- Switching speed (fast ↔ standard) invalidates the prompt cache — different speeds don't share cached prefixes.

## Related

- [Effort](./effort.md)
- [Streaming](./streaming.md)
- [Task budgets](./task-budgets.md)
