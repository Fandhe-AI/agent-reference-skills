<!-- source: https://platform.claude.com/docs/en/build-with-claude/thinking-tool-workflows / last verified: 2026-08-07 -->

# Thinking in tool and multi-turn workflows

A worked two-turn tool-use round trip that preserves thinking blocks correctly, and how interleaved thinking changes the flow.

## Signature / Usage

```python
weather_tool = {
    "name": "get_weather",
    "description": "Get current weather for a location",
    "input_schema": {
        "type": "object",
        "properties": {"location": {"type": "string"}},
        "required": ["location"],
    },
}

response = client.messages.create(
    model="claude-opus-4-8", max_tokens=16000,
    thinking={"type": "adaptive"}, tools=[weather_tool],
    messages=[{"role": "user", "content": "What's the weather in Paris?"}],
)
tool_use_block = next(b for b in response.content if b.type == "tool_use")

continuation = client.messages.create(
    model="claude-opus-4-8", max_tokens=16000,
    thinking={"type": "adaptive"}, tools=[weather_tool],
    messages=[
        {"role": "user", "content": "What's the weather in Paris?"},
        {"role": "assistant", "content": response.content},  # echoed verbatim, thinking block included
        {"role": "user", "content": [{
            "type": "tool_result", "tool_use_id": tool_use_block.id,
            "content": "Current temperature: 88°F",
        }]},
    ],
)
```

## Notes

- Rules applied: `tool_choice` must be `auto`/`none` in manual thinking mode (adaptive supports forced tool use); keep one thinking config per assistant turn (a tool-use loop is one turn); pass thinking blocks back complete and unmodified with the tool result; echo the assistant message exactly as received (rebuilding it, or filtering out `redacted_thinking` blocks, triggers a 400 error).
- Without interleaved thinking, Claude thinks once at the start of the turn; with it, Claude can think again after each tool result before deciding the next action (automatic in adaptive mode, no beta header).

## Related

- [thinking.md](./thinking.md)
- [extended-thinking.md](./extended-thinking.md)
