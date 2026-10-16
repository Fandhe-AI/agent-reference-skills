<!-- source: https://platform.claude.com/docs/en/build-with-claude/thinking-steering-and-cost / last verified: 2026-08-07 -->

# Steering thinking

Steer how often and how deeply Claude thinks with effort levels, system-prompt guidance, and per-message steering; how thinking is priced.

## Signature / Usage

```json
{
  "model": "claude-opus-5-5",
  "max_tokens": 4096,
  "output_config": { "effort": "medium" },
  "messages": [{ "role": "user", "content": "..." }]
}
```

System-prompt steering (reduce thinking):

```text
Extended thinking adds latency and should only be used when it will meaningfully improve
answer quality, typically for problems that require multistep reasoning. When in doubt,
respond directly.
```

## Options / Props

| Effort level | Thinking behavior |
|---|---|
| `max` | Always thinks, no depth constraints. |
| `xhigh` | Always thinks deeply, extended exploration. |
| `high` (default on every model except Opus 5.5 and Haiku 5.5) | Almost always thinks; deep reasoning on complex tasks. |
| `medium` (default on Opus 5.5 and Haiku 5.5) | Moderate thinking; may skip for simple queries. |
| `low` | Minimizes thinking; skips for simple tasks. |

## Notes

- Effort (`output_config.effort`) is the primary lever for how often Claude thinks; lower effort before reaching for prompt-based steering.
- Two steering levers beyond effort: system-prompt guidance (shifts the threshold for the whole conversation) and per-message steering (appended to a single user turn, e.g. "Please think hard before responding." / "Answer directly without deliberating.").
- On Haiku 5.5, a discouraging system-prompt phrase doesn't reliably reduce thinking. On the Claude API and Google Cloud, run routine turns on that model with less thinking via a per-message effort change (beta), which also keeps the prompt cache.
- Assistant turns don't need to start with a thinking block in adaptive mode; history assembled from mixed sources (with/without thinking) is valid without reinserting blocks.
- Consecutive requests that keep the same thinking config and effort level preserve prompt caching; changing either invalidates cache breakpoints. Setting effort explicitly to the model default is equivalent to omitting it (no cache break).
- Cost control: `max_tokens` is a hard cap on total output (thinking + text); `effort` is soft guidance on how much of that goes to thinking. If you see `stop_reason: "max_tokens"`, either raise `max_tokens` or lower `effort`.
- Pricing: billed output tokens for thinking are the full internal reasoning count (`usage.output_tokens_details.thinking_tokens`), not the visible summarized text — this holds regardless of the `display` setting. When streaming, this breakdown appears only on the final `message_delta` event.

## Related

- [thinking.md](./thinking.md)
- [effort.md](./effort.md)
- [thinking-tool-workflows.md](./thinking-tool-workflows.md)
