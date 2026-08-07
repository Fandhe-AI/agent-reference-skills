<!-- source: https://platform.claude.com/docs/en/build-with-claude/streaming / last verified: 2026-08-07 -->

# Streaming messages

Stream Messages API responses incrementally with server-sent events (SSE), including text, tool use, and extended thinking deltas.

## Signature / Usage

```python
client = anthropic.Anthropic()

with client.messages.stream(
    max_tokens=1024,
    messages=[{"role": "user", "content": "Hello"}],
    model="claude-opus-5",
) as stream:
    for text in stream.text_stream:
        print(text, end="", flush=True)

    # or get the accumulated final Message object
    message = stream.get_final_message()
```

```typescript
const stream = client.messages.stream({
  messages: [{ role: "user", content: "Hello" }],
  model: "claude-opus-5",
  max_tokens: 1024
});
for await (const event of stream) {
  if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
    process.stdout.write(event.delta.text);
  }
}
const message = await stream.finalMessage();
```

Set `"stream": true` on a Messages API request to receive SSE. SDKs (Python, TypeScript, C#, Go, Java, PHP, Ruby) provide helper streaming clients; use the SDK's accumulation helper (`get_final_message()` / `.finalMessage()` / `message.Accumulate(event)` / `MessageAccumulator` / `.accumulated_message`) to obtain the complete `Message` identical to a non-streaming `.create()` response. Required for very large `max_tokens` to avoid HTTP timeouts.

## Event flow

1. `message_start` — `Message` object with empty `content`.
2. Per content block: `content_block_start` → one or more `content_block_delta` → `content_block_stop`. Block `index` corresponds to the final `content` array index. During server-side fallback, a `fallback` block arrives as start/stop with no deltas.
3. One or more `message_delta` events (top-level changes; `usage` token counts are cumulative).
4. Final `message_stop` event.
5. `ping` events may appear anywhere. `error` events (e.g. `overloaded_error`) may appear in place of normal completion. Unknown event types must be handled gracefully (versioning policy).

## Content block delta types

| Type | Field | Notes |
|------|-------|-------|
| `text_delta` | `text` | Incremental text |
| `input_json_delta` | `partial_json` | Partial JSON string for `tool_use.input`; accumulate and parse on `content_block_stop`. Current models emit one complete key/value at a time. |
| `thinking_delta` | `thinking` | Requires `thinking` config; see thinking guide |
| `signature_delta` | `signature` | Sent just before `content_block_stop` on a thinking block, verifies integrity. When `display: "omitted"`, no `thinking_delta` is sent — only a single `signature_delta`. |

## Error recovery

- **Claude 4.5 and earlier:** capture partial content, then resume by placing it as the start of a new `assistant` message in a continuation request.
- **Claude 4.6 and later:** capture partial content, then add a `user` message instructing Claude to continue (e.g. "Your previous response was interrupted and ended with [previous_response]. Continue from where you left off.").
- Tool use and extended thinking blocks cannot be partially recovered; only resume from the most recent text block.

## Notes

- Fine-grained tool streaming (`eager_input_streaming` per tool) removes server-side buffering for tool parameter values — see Tool use・Agent Skills・MCP の詳細は anthropic-api-tools-mcp スキルを参照。
- Web search / server tool streaming emits `server_tool_use` and `web_search_tool_result` content blocks interleaved with text blocks.

## Related

- [Handling stop reasons](./handling-stop-reasons.md)
- [Working with messages](./working-with-messages.md)
