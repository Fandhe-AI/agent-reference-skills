<!-- source: https://platform.claude.com/docs/en/build-with-claude/thinking / last verified: 2026-08-07 -->

# Adaptive Thinking

Enable adaptive thinking so Claude decides when and how deeply to reason before answering, and read the resulting `thinking` and `text` content blocks.

```python
client = anthropic.Anthropic()

response = client.messages.create(
    model="claude-opus-4-8",
    max_tokens=16000,
    thinking={"type": "adaptive", "display": "summarized"},
    messages=[
        {
            "role": "user",
            "content": "What is the greatest common divisor of 1071 and 462?",
        }
    ],
)

for block in response.content:
    if block.type == "thinking":
        print(f"\nThinking: {block.thinking}")
    elif block.type == "text":
        print(f"\nResponse: {block.text}")
```

```typescript
const client = new Anthropic();

const response = await client.messages.create({
  model: "claude-opus-4-8",
  max_tokens: 16000,
  thinking: {
    type: "adaptive",
    display: "summarized"
  },
  messages: [
    {
      role: "user",
      content: "What is the greatest common divisor of 1071 and 462?"
    }
  ]
});

for (const block of response.content) {
  if (block.type === "thinking") {
    console.log(`\nThinking: ${block.thinking}`);
  } else if (block.type === "text") {
    console.log(`\nResponse: ${block.text}`);
  }
}
```

## Notes

- On Claude Opus 5, Claude Sonnet 5, Claude Fable 5, and Claude Mythos 5, thinking is already on by default with `display` defaulting to `"omitted"`; pass `thinking: {"type": "adaptive", "display": "summarized"}` to see the reasoning text. On Claude Opus 4.8 / 4.7 / 4.6 and Claude Sonnet 4.6, thinking is off until you set `thinking: {type: "adaptive"}` as shown above.
- Control reasoning depth with `output_config: {"effort": ...}` rather than a token budget; do not pass `"adaptive"` as an `effort` value — `effort` and `thinking` are separate parameters.
- Manual extended thinking (`thinking: {"type": "enabled", "budget_tokens": N}`) is deprecated on Claude 4.6 models and rejected with a 400 error on Claude 4.7 and later — use adaptive thinking (this sample) on any current model instead.
- Streaming adaptive thinking emits `thinking_delta` events followed by a `signature_delta` just before `content_block_stop`; see the streaming sample in this skill for the event shapes.
- Example adapted from the Claude API (platform.claude.com) `build-with-claude/thinking` page.
