<!-- source: https://code.claude.com/docs/en/agent-sdk/streaming-output.md / last verified: 2026-08-07 -->

# Stream responses in real-time

By default, the Agent SDK yields complete `AssistantMessage` objects after Claude finishes generating each response. Setting `include_partial_messages` (Python) / `includePartialMessages` (TypeScript) to `true` enables incremental updates as text and tool calls are generated.

## Signature / Usage

```python
options = ClaudeAgentOptions(
    include_partial_messages=True,
    allowed_tools=["Bash", "Read"],
)

async for message in query(prompt="List the files in my project", options=options):
    if isinstance(message, StreamEvent):
        event = message.event
        if event.get("type") == "content_block_delta":
            delta = event.get("delta", {})
            if delta.get("type") == "text_delta":
                print(delta.get("text", ""), end="", flush=True)
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `include_partial_messages` / `includePartialMessages` | boolean | Enables `StreamEvent` (Python) / `SDKPartialAssistantMessage` (`type: "stream_event"`, TypeScript) messages wrapping raw Claude API stream events. |

| Event Type | Description |
| --- | --- |
| `message_start` | Start of a new message |
| `content_block_start` | Start of a new content block (text or tool use) |
| `content_block_delta` | Incremental update to content (`text_delta` or `input_json_delta`) |
| `content_block_stop` | End of a content block |
| `message_delta` | Message-level updates (stop reason, usage) |
| `message_stop` | End of the message |

## Notes

- Both wrapper types carry raw, non-accumulated API events; text must be accumulated by your code. Python's `StreamEvent` has `uuid`, `session_id`, `event`, `parent_tool_use_id` (always `None`); TypeScript's `SDKPartialAssistantMessage` additionally exposes `ttft_ms` on `message_start` events.
- `parent_tool_use_id` is always `null`/`None` on stream events — token-level deltas from subagents aren't forwarded. Use complete messages (which do carry `parent_tool_use_id`) to attribute output to a subagent.
- Message flow with streaming enabled: `StreamEvent`s for `message_start` → `content_block_start`/`delta`/`stop` (per block) → `message_delta` → `message_stop`, then the complete `AssistantMessage`, then tool execution, then more events for the next turn, then `ResultMessage`.
- Tool call streaming: `content_block_start` (tool begins, `content_block.type === "tool_use"`) → `content_block_delta` with `input_json_delta` (accumulate `partial_json`) → `content_block_stop` (tool call complete).
- **Known limitation**: structured output JSON appears only in the final `ResultMessage.structured_output`, not as streaming deltas.

## Related

- [streaming-vs-single-mode](./streaming-vs-single-mode.md)
- [structured-outputs](./structured-outputs.md)
