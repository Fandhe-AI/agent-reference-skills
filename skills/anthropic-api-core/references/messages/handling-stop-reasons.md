<!-- source: https://platform.claude.com/docs/en/build-with-claude/handling-stop-reasons / last verified: 2026-08-07 -->

# Stop reasons and fallback

Every Messages API response includes a `stop_reason` field explaining why Claude stopped generating. Check it to decide whether to use, continue, retry, or fall back.

## Signature / Usage

```python
response = client.messages.create(
    model="claude-opus-5",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Hello!"}],
)
if response.stop_reason == "end_turn":
    for block in response.content:
        if block.type == "text":
            print(block.text)
```

## Options / Props

| stop_reason | When it occurs | What to do |
|-------------|----------------|-----------|
| `end_turn` | Claude finished naturally | Use the response |
| `max_tokens` | Hit the `max_tokens` limit | Raise `max_tokens` or continue the response; if an incomplete `tool_use` block, retry with higher `max_tokens` |
| `stop_sequence` | Emitted a custom stop sequence | Read `stop_sequence` to see which fired |
| `tool_use` | Claude is calling a tool | Run the tool and return the result |
| `pause_turn` | Server-tool loop reached its iteration limit (default 10) | Send the assistant content back as-is to continue |
| `refusal` | Claude declined to respond (HTTP 200, not an error) | Read `stop_details` for the policy category; retry on a fallback model |
| `model_context_window_exceeded` | Response filled the model's context window | Treat the response as truncated |

## Notes

- Sometimes Claude returns an empty response (2-3 tokens) with `end_turn`, typically after adding text blocks immediately following `tool_result` blocks or resending Claude's completed response unchanged; send tool results directly and use continuation prompts in new user messages instead.
- A `tool_use` response can contain a `server_tool_use` block with no matching result block yet — check each `server_tool_use` block's `id` for a matching result.
- `pause_turn` continuation: resend `messages` with the prior user message plus `{"role": "assistant", "content": response.content}`, then call again with the same `tools`.
- Stop reasons (successful, in the response body) are distinct from errors (HTTP 4xx/5xx, request failures) — handle each separately (e.g. catch `anthropic.APIStatusError` for actual errors).
- While streaming, `stop_reason` is `null` in `message_start`, populated only in `message_delta`, and absent from all other events.

## Related

- [Streaming](./streaming.md)
- [Refusals and fallback](./refusals-and-fallback.md)
- [Fallback credit](./fallback-credit.md)
