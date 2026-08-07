<!-- source: https://platform.claude.com/docs/en/agents-and-tools/tool-use/parallel-tool-use / last verified: 2026-08-07 -->

# Parallel tool use

By default, Claude may return several `tool_use` blocks in one assistant turn; this page covers execution strategy, message formatting, and how to disable it.

## Signature / Usage

```json
{"tool_choice": {"type": "auto", "disable_parallel_tool_use": true}}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| tool_choice.disable_parallel_tool_use | boolean | Not a top-level param; lives inside `tool_choice`. With `auto`: at most one tool call per response (or plain text). With `any`/`tool`: exactly one tool call. |

## Notes

- The API doesn't prescribe execution order for multiple `tool_use` blocks — run concurrently, sequentially, or mixed, based on whether tools are independent/read-only vs. side-effecting/ordered.
- Always return one `tool_result` per `tool_use` block, all together in the next user message, matched by `tool_use_id`, with every `tool_result` block before any text. If a call wasn't executed (e.g. sequential batch stopped after an earlier failure), still return its `tool_result` with `is_error: true` and a brief explanation.
- Claude 4+ models call tools in parallel by default when beneficial. To increase the rate further, add to the system prompt: `"For maximum efficiency, whenever you need to perform multiple independent operations, invoke all relevant tools simultaneously rather than sequentially."` — or the stronger `<use_parallel_tool_calls>` block variant for more aggressive parallelism.
- User-message phrasing also nudges parallelism: "Check the weather in Paris and London simultaneously" outperforms "What's the weather in Paris? Also check London."
- Troubleshooting: the most common cause of Claude avoiding parallel calls is sending each `tool_result` in a separate user message instead of all together in one — this "teaches" Claude away from parallelism. Measure success via average tool_use blocks per tool-calling message (should be > 1.0).
- To reduce accidental batching of dependent calls, add: `"Only batch tool calls that are independent of each other."`
- The SDK Tool Runner handles multi-call responses and result formatting automatically — use the manual pattern on this page only when you need custom batching, ordering, or error handling.

## Related

- [handle-tool-calls](./handle-tool-calls.md)
- [tool-runner](./tool-runner.md)
- [define-tools](./define-tools.md)
