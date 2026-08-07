<!-- source: https://platform.claude.com/docs/en/build-with-claude/task-budgets / last verified: 2026-08-07 -->

# Task budgets

Give Claude an advisory token budget for a full agentic loop (thinking, tool calls, tool results, output) so it self-regulates and finishes gracefully as the budget depletes, instead of being cut off mid-action.

## Signature / Usage

```python
with client.beta.messages.stream(
    model="claude-opus-5",
    max_tokens=128000,
    output_config={
        "effort": "high",
        "task_budget": {"type": "tokens", "total": 64000},
    },
    messages=[{"role": "user", "content": "Review the codebase and propose a refactor plan."}],
    betas=["task-budgets-2026-03-13"],
) as stream:
    response = stream.get_final_message()
```

Set `output_config.task_budget` with beta header `anthropic-beta: task-budgets-2026-03-13`.

## Options / Props

| `task_budget` field | Description |
|---|---|
| `type` | Always `"tokens"` |
| `total` | Tokens Claude can spend across the whole agentic loop (thinking + tool calls + tool results + output). Minimum 20,000 tokens (400 error below) |
| `remaining` (optional) | Budget remainder carried over from a prior request/compaction; defaults to `total` if omitted |

Supported models (beta, `task-budgets-2026-03-13` header): Claude Opus 5, Claude Fable 5, Claude Mythos 5, Claude Opus 4.8, Claude Opus 4.7. Not supported: Claude Sonnet 5, Claude Opus 4.6, Claude Sonnet 4.6, Claude Haiku 4.5, Claude Code, Cowork.

## Notes

- **Countdown is model-visible only** — no `task_budget` info appears in response `usage`; the server injects a budget-countdown marker into what Claude sees, updated as it generates/processes content. Track spend client-side by summing `usage.output_tokens` across loop requests.
- The countdown reflects tokens **Claude has seen this turn**, not your full resent request payload — resent history from prior turns isn't recounted; only new content (new tool results, new generation) counts against the budget. Don't try to mirror the countdown client-side by decrementing on every resend; let the model self-regulate.
- **Advisory, not enforced** — Claude may exceed the budget if mid-action interruption would be worse than finishing. `max_tokens` remains the hard per-request ceiling (`stop_reason: "max_tokens"`). Combine both: `task_budget` paces the whole loop, `max_tokens` caps each individual request — the two are independent (neither must be ≤ the other).
- **Too-small budgets cause refusal-like behavior**: Claude may decline, scope down aggressively, or stop early if the budget is clearly insufficient for the task. If you see unexpected refusals/premature stops after setting a budget, raise it before debugging other parameters.
- **Choosing a value:** measure per-task token spend without `task_budget` set (sum `usage.output_tokens` across the loop) over a representative task sample, then start near the p99.
- **Carrying across compaction:** pass `remaining = total - tokens_spent_so_far` (tracked client-side) when your loop compacts/rewrites context, so the countdown continues instead of resetting.
- **Prompt caching:** the countdown marker is injected per-turn and doesn't match across requests; if you mutate `task_budget.remaining` on follow-ups, it invalidates any cache prefix containing it — set the budget once on the initial request and let the server-side countdown handle the rest to preserve caching.
- Complementary to `effort` (depth per step) and adaptive thinking (thinking tokens count against the budget, so it naturally scales down as budget depletes).
- `task_budget` is request-level — to change budget mid-conversation, set a new value in `output_config` on the next request (this changes the rendered prompt and misses cache).

## Related

- [Streaming](./streaming.md)
- [Fast mode](./fast-mode.md)
- [Working with messages](./working-with-messages.md)
