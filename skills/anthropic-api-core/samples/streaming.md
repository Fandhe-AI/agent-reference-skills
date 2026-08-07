<!-- source: https://platform.claude.com/docs/en/build-with-claude/streaming / last verified: 2026-08-07 -->

# Streaming Messages

Set `stream: true` (or use the SDK's `.stream()` helper) to receive a Message incrementally via server-sent events, and branch on each event's `type`.

```python
client = anthropic.Anthropic()

with client.messages.stream(
    model="claude-opus-5",
    messages=[{"role": "user", "content": "Hello"}],
    max_tokens=256,
) as stream:
    for text in stream.text_stream:
        print(text, end="", flush=True)
```

```typescript
const client = new Anthropic();

const stream = client.messages.stream({
  model: "claude-opus-5",
  messages: [{ role: "user", content: "Hello" }],
  max_tokens: 256
});

for await (const event of stream) {
  if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
    process.stdout.write(event.delta.text);
  }
}
```

Raw SSE event flow for the same request:

```text
event: message_start
data: {"type": "message_start", "message": {"id": "msg_1nZdL29xx5MUA1yADyHTEsnR8uuvGzszyY", "type": "message", "role": "assistant", "content": [], "model": "claude-opus-5", "stop_reason": null, "stop_sequence": null, "usage": {"input_tokens": 25, "output_tokens": 1}}}

event: content_block_start
data: {"type": "content_block_start", "index": 0, "content_block": {"type": "text", "text": ""}}

event: content_block_delta
data: {"type": "content_block_delta", "index": 0, "delta": {"type": "text_delta", "text": "Hello"}}

event: content_block_delta
data: {"type": "content_block_delta", "index": 0, "delta": {"type": "text_delta", "text": "!"}}

event: content_block_stop
data: {"type": "content_block_stop", "index": 0}

event: message_delta
data: {"type": "message_delta", "delta": {"stop_reason": "end_turn", "stop_sequence": null}, "usage": {"output_tokens": 15}}

event: message_stop
data: {"type": "message_stop"}
```

## Notes

- Event flow: one `message_start`, then per content block a `content_block_start` / one-or-more `content_block_delta` / `content_block_stop` triplet, then one-or-more `message_delta` events, then a final `message_stop`. `ping` events may appear anywhere.
- `usage` on `message_delta` is cumulative, not incremental.
- Use `.get_final_message()` (Python) / `.finalMessage()` (TypeScript) after the stream loop to obtain the same complete `Message` object `.create()` would return, without hand-accumulating events — required for large `max_tokens` values to avoid HTTP timeouts.
- Streaming with thinking or tool use adds `thinking_delta` / `signature_delta` or `input_json_delta` deltas respectively; see the extended-thinking and structured-outputs samples in this skill. Tool-call streaming loops belong to the tool-use/MCP surface, covered by the `anthropic-api-tools-mcp` skill, not here.
- Example from the Claude API (platform.claude.com) `build-with-claude/streaming` page.
