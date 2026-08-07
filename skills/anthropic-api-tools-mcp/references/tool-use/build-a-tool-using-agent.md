<!-- source: https://platform.claude.com/docs/en/agents-and-tools/tool-use/build-a-tool-using-agent / last verified: 2026-08-07 -->

# Tutorial: Build a tool-using agent

A guided walkthrough building a calendar-management agent in concentric "rings," each ring a complete runnable program adding one concept, ending with the hand-written agentic loop replaced by the Tool Runner SDK abstraction.

## Signature / Usage

```text
Ring 1: single tool, single turn — one tool_use block, one tool_result, done.
Ring 2: the agentic loop — a `while stop_reason == "tool_use"` loop with a
        growing messages array appended to (not rebuilt) every turn.
Ring 3: multiple tools, parallel calls — iterate every tool_use block in
        response.content and return all tool_result blocks together in one
        user message.
Ring 4/5: error handling and the Tool Runner SDK abstraction (progression
          toward a production-ready implementation).
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| create_calendar_event | tool | Example tool with nested objects (recurrence), arrays (attendees), and optional fields |
| list_calendar_events | tool | Second example tool introduced in Ring 3 to demonstrate multi-tool, parallel `tool_use` |

## Notes

- Ring 1: request sends a `tools` array; Claude returns `stop_reason: "tool_use"` with a `tool_use` block (name, unique `id`, structured `input`); your code executes it and returns a `tool_result` whose `tool_use_id` matches.
- Ring 2: real tasks often need several sequential tool calls, so replace the one-shot request/response with a `while` loop keyed on `stop_reason`, appending to a persistent `messages` array each turn rather than rebuilding it.
- Ring 3: with multiple independent tools, Claude may return several `tool_use` blocks in one response; iterate all of them (not just the first) and send all corresponding `tool_result` blocks together in a single user message.
- Every ring is self-contained and runnable independently, so any ring can be copied into a fresh file without code from earlier rings.
- The tutorial concludes by replacing the hand-rolled loop with the Tool Runner SDK.

## Related

- [how-tool-use-works](./how-tool-use-works.md)
- [handle-tool-calls](./handle-tool-calls.md)
- [parallel-tool-use](./parallel-tool-use.md)
- [tool-runner](./tool-runner.md)
