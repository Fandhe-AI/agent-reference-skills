<!-- source: https://code.claude.com/docs/en/agent-sdk/streaming-output.md / last verified: 2026-08-07 -->

# Stream Partial Messages

Enable `include_partial_messages`/`includePartialMessages` to receive incremental `StreamEvent`/`SDKPartialAssistantMessage` wrappers around raw Claude API deltas, instead of waiting for each complete `AssistantMessage`.

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

## Notes

- Message flow with streaming enabled: `StreamEvent`s for `message_start` → `content_block_start`/`delta`/`stop` (per block) → `message_delta` → `message_stop`, then the complete `AssistantMessage`, then tool execution, then more events for the next turn, then `ResultMessage`.
- Tool call streaming: `content_block_start` (`content_block.type === "tool_use"`) → `content_block_delta` with `input_json_delta` (accumulate `partial_json`) → `content_block_stop`.
- `parent_tool_use_id` is always `null`/`None` on stream events — token-level deltas from subagents are not attributable; use the complete messages for that.
- Known limitation: structured output JSON appears only in the final `ResultMessage.structured_output`, never as streaming deltas.
