<!-- source: https://platform.claude.com/docs/en/build-with-claude/working-with-messages / last verified: 2026-08-07 -->

# Using the Messages API

Practical patterns for the Messages API: basic requests, multi-turn conversations, prefill, and vision.

## Signature / Usage

```python
message = anthropic.Anthropic().messages.create(
    model="claude-opus-5",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Hello, Claude"}],
)
print(message)
```

```typescript
const anthropic = new Anthropic();
const message = await anthropic.messages.create({
  model: "claude-opus-5",
  max_tokens: 1024,
  messages: [{ role: "user", content: "Hello, Claude" }]
});
```

```json
{
  "id": "msg_01XFDUDYJgAACzvnptvVoYEL",
  "type": "message",
  "role": "assistant",
  "content": [{ "type": "text", "text": "Hello!" }],
  "model": "claude-opus-5",
  "stop_reason": "end_turn",
  "stop_sequence": null,
  "usage": { "input_tokens": 12, "output_tokens": 6 }
}
```

Two ways to build with Claude: the Messages API (direct model prompting, custom agent loops, fine-grained control) or Claude Managed Agents (pre-built agent harness for long-running async tasks). This page covers the Messages API.

## Multi-turn conversations

The API is stateless — always send the full conversation history in `messages`. Earlier turns don't need to originate from Claude; synthetic `assistant` messages are valid.

### System role mid-conversation

On supported models (Claude Fable 5, Claude Mythos 5, Claude Opus 4.8, Claude Opus 5), a `"role": "system"` message can be inserted after a user turn to add a new system instruction partway through a conversation (subject to placement rules). It cannot be the first entry in `messages` — use the top-level `system` field for from-the-start instructions. A mid-conversation system message has the same authority as the top-level `system` field but, being appended at the end, does not invalidate any cached prefix before it. See Mid-conversation system messages for the full guide and combination with prompt caching.

## Prefilling Claude's response

Pre-fill part of Claude's response as the last entry in `messages` (role `assistant`) to shape output, e.g. forcing a single-character multiple-choice answer with `"max_tokens": 1`.

```json
{
  "messages": [
    {"role": "user", "content": "What is latin for Ant? (A) Apoidea, (B) Rhopalocera, (C) Formicidae"},
    {"role": "assistant", "content": "The answer is ("}
  ]
}
```

Not supported on Claude 4.6+ and Claude Mythos Preview — returns a 400 error. Use structured outputs or system prompt instructions instead on those models.

## Vision

Claude reads text and images in requests. Image `source` types: `base64`, `url`, or `file` (references an upload via the Files API). Supported media types: `image/jpeg`, `image/png`, `image/gif`, `image/webp`.

```json
{
  "role": "user",
  "content": [
    {"type": "image", "source": {"type": "url", "url": "https://example.com/image.jpg"}},
    {"type": "text", "text": "What is in the above image?"}
  ]
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `temperature`, `top_p`, `top_k` | number | Not supported on Claude 4.7+ and Claude Mythos Preview — 400 error if set to a non-default value; use prompting instead |

## Notes

- Refusal responses (`stop_reason: "refusal"`) include a `stop_details` object identifying the policy category; see Handling stop reasons.
- Tool use・Agent Skills・MCP の詳細は anthropic-api-tools-mcp スキルを参照。

## Related

- [Handling stop reasons](./handling-stop-reasons.md)
- [Streaming](./streaming.md)
- [Vision](./vision.md)
- [Structured outputs](./structured-outputs.md)
- [Task budgets](./task-budgets.md)
