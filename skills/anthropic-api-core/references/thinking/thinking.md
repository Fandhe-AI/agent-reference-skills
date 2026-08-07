<!-- source: https://platform.claude.com/docs/en/build-with-claude/thinking / last verified: 2026-08-07 -->

# Thinking

Overview of Claude's thinking (reasoning) feature: turning it on, reading output, and how it interacts with tools, caching, effort, and the context window. On current models thinking runs as `thinking: {type: "adaptive"}` (Claude decides whether/how deeply to think per request); some earlier models instead use the legacy manual `extended-thinking` mode (see `extended-thinking.md`).

## Signature / Usage

```python
client = anthropic.Anthropic()

response = client.messages.create(
    model="claude-opus-4-8",
    max_tokens=16000,
    thinking={"type": "adaptive", "display": "summarized"},
    messages=[{"role": "user", "content": "What is the GCD of 1071 and 462?"}],
)

for block in response.content:
    if block.type == "thinking":
        print(f"\nThinking: {block.thinking}")
    elif block.type == "text":
        print(f"\nResponse: {block.text}")
```

Response shape:

```json
{
  "content": [
    {"type": "thinking", "thinking": "Let me break this down...", "signature": "WaUjzk..."},
    {"type": "text", "text": "Based on my analysis..."}
  ]
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `thinking.type` | `"adaptive"` \| `"disabled"` \| `"enabled"` (legacy) | On Opus 5, Sonnet 5, Fable 5, Mythos 5, Mythos Preview thinking is on by default (no config needed). On Opus 4.8/4.7/4.6 and Sonnet 4.6, set `type: "adaptive"` to enable. `"disabled"` turns thinking off where allowed. |
| `thinking.display` | `"summarized"` \| `"omitted"` | `"summarized"` returns readable summary text; `"omitted"` (default on newest models) returns thinking blocks with empty `thinking` field but populated `signature`, for faster time-to-first-text-token. Billing is identical either way. |
| `effort` (`output_config.effort`) | `low` \| `medium` \| `high` \| `xhigh` \| `max` | Controls how much Claude thinks in adaptive mode; see effort.md. |

## Notes

- Thinking tokens are billed as output tokens and count toward `max_tokens`, even when not returned to you.
- **Configuring thinking**: models differ in default and rejected `thinking.type` values — see thinking-troubleshooting.md's per-model configuration table for the authoritative list.
- **Summarized thinking**: the `thinking` text is always a *summary* of Claude's reasoning, never the raw chain of thought; summarization is done by a different model and is billed at the full underlying thinking-token count.
- **Streaming**: thinking streams as `thinking_delta` events inside `content_block_delta`, followed by one `signature_delta` before `content_block_stop`. With `display: "omitted"`, no `thinking_delta` events are emitted.
- **Thinking and effort**: `thinking` controls *whether* Claude thinks; `effort` (`output_config.effort`, not inside `thinking`) controls how much work goes into the whole response, including thinking depth. Never pass `"adaptive"` as an effort value.
- **Thinking with tool use**: manual extended thinking only supports `tool_choice: "auto"` or `"none"` (adaptive thinking supports forced tool use). A tool-use loop (calls + results) counts as one assistant turn; thinking mode can't be toggled mid-turn. When returning tool results, you must pass back every `thinking`/`redacted_thinking` block from the assistant message complete and unmodified — modified blocks are rejected with a 400 error.
- **Interleaved thinking**: automatic in adaptive mode on every model that supports it (no beta header needed); lets Claude think between tool calls. Claude Haiku 4.5 does not support it.
- **Thinking block preservation by model**: Opus 4.5+, Sonnet 4.6+, Fable 5, Mythos 5, Mythos Preview keep all prior turns' thinking blocks in context (billed as input on later turns); earlier Opus/Sonnet and all Haiku models keep only the last turn and the API strips older blocks automatically when you pass them back.
- **Prompt caching**: thinking config and resolved `effort` are rendered into the prompt, so changing either invalidates cache breakpoints (see caching-context/prompt-caching.md).
- **Redacted thinking blocks**: `redacted_thinking` blocks (safety-redacted reasoning) must also be passed back unmodified; filtering by `block.type == "thinking"` alone silently drops them and breaks the round trip.
- Non-default `temperature`/`top_p`/`top_k` return a 400 error on the newest models regardless of thinking; on older models this restriction applies only while thinking is on.
- Claude Fable 5 / Claude Mythos 5 never return the raw chain of thought; both models can refuse (`stop_details.category: "reasoning_extraction"`) if a request tries to elicit internal reasoning as response text.

## Related

- [extended-thinking.md](./extended-thinking.md)
- [thinking-steering-and-cost.md](./thinking-steering-and-cost.md)
- [thinking-tool-workflows.md](./thinking-tool-workflows.md)
- [thinking-troubleshooting.md](./thinking-troubleshooting.md)
- [effort.md](./effort.md)
