<!-- source: https://platform.claude.com/docs/en/build-with-claude/effort / last verified: 2026-08-07 -->

# Effort

Control how many tokens Claude spends when responding (text, tool calls, and thinking) via `output_config.effort`, trading off thoroughness against cost/latency.

## Signature / Usage

```python
response = client.messages.create(
    model="claude-opus-5",
    max_tokens=4096,
    messages=[{"role": "user", "content": "Analyze microservices vs monolith trade-offs"}],
    output_config={"effort": "medium"},
)
```

## Options / Props

| Level | Description | Typical use case |
|---|---|---|
| `max` | No constraints on token spending. | Deepest reasoning/analysis. |
| `xhigh` | Extended capability for long-horizon work. | 30+ min agentic/coding tasks, million-token budgets. |
| `high` (default) | High capability; same as omitting the parameter. | Complex reasoning, hard coding, agentic tasks. |
| `medium` | Balanced, moderate token savings. | Agentic tasks needing speed/cost/perf balance. |
| `low` | Most efficient. | Simple tasks, subagents. |

Supported models: `claude-fable-5`, `claude-mythos-5`, `claude-mythos-preview`, `claude-opus-5`, `claude-opus-4-8`, `claude-opus-4-7`, `claude-opus-4-6`, `claude-sonnet-5`, `claude-sonnet-4-6`, `claude-opus-4-5-20251101`. Not all models support `xhigh`.

## Notes

- Affects **all tokens** in the response: text, tool calls/arguments, and thinking (when active) — doesn't require thinking to be enabled.
- Lower effort with tool use: fewer/combined tool calls, less preamble, terser confirmations. Higher effort: more calls, more explanation, more detailed summaries.
- Per-model recommended starting points differ significantly (e.g. Opus 4.7/4.8 recommend starting at `xhigh` for coding/agentic work; Sonnet 4.6 recommends explicit `medium` to avoid unexpected latency at the `high` default). Consult the model-specific guidance sections on this page before shipping a default.
- On Claude Opus 5, thinking cannot be disabled at `xhigh`/`max` effort (400 error); effort does not reliably shorten visible response length — prompt for length instead.
- `output_config.effort` is a request-level setting; changing it between requests does not preserve cached prefixes.

## Related

- [thinking.md](./thinking.md)
- [thinking-steering-and-cost.md](./thinking-steering-and-cost.md)
- [mid-conversation-effort-example.md](./mid-conversation-effort-example.md)
