<!-- source: https://platform.claude.com/docs/en/build-with-claude/thinking / last verified: 2026-08-07 -->

# Thinking

Overview of Claude's thinking (reasoning) feature: turning it on, reading output, and how it interacts with tools, caching, effort, and the context window. On current models thinking runs as `thinking: {type: "adaptive"}` (Claude decides whether/how deeply to think per request); some earlier models instead use the legacy manual `extended-thinking` mode (see `extended-thinking.md`).

## Signature / Usage

```python
client = anthropic.Anthropic()

response = client.messages.create(
    model="claude-opus-5-5",
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
| `thinking.type` | `"adaptive"` \| `"disabled"` \| `"enabled"` (legacy) | On Opus 5.5, Opus 5, Sonnet 5.5, Sonnet 5, Fable 5.1, Mythos 5.1, Fable 5, Mythos 5, Mythos Preview, Haiku 5.5 thinking is on by default (no config needed). On Opus 4.8/4.7/4.6 and Sonnet 4.6, set `type: "adaptive"` to enable. `"disabled"` turns thinking off where allowed. |
| `thinking.display` | `"summarized"` \| `"omitted"` \| `"updates"` (beta) | `"summarized"` returns readable summary text (default on Opus 4.6, Sonnet 4.6 and earlier); `"omitted"` returns thinking blocks with empty `thinking` field but populated `signature`, for faster time-to-first-text-token (default on Fable 5.1, Mythos 5.1, Fable 5, Mythos 5, Opus 5.5, Opus 5, Sonnet 5.5, Sonnet 5, Opus 4.8, Opus 4.7, Mythos Preview, Haiku 5.5). `"updates"` (beta, header `thinking-display-updates-2026-08-18`): reasoning stays hidden (empty `thinking`) and only the progress updates written between tool calls come back as text; without the header the value is rejected with 400 `invalid_request_error`. Billing is identical either way. |
| `thinking.block_binding.prefix_mismatch_behavior` | `"error"` \| `"drop_block"` | Beta header `thinking-binding-controls-2026-08-01`. Chooses whether a thinking block whose earlier history changed is rejected or dropped; the response then carries an `input_transformations` array. See preserved-thinking.md. |
| `effort` (`output_config.effort`) | `low` \| `medium` \| `high` \| `xhigh` \| `max` | Controls how much Claude thinks in adaptive mode; see effort.md. |

## Notes

- Thinking tokens are billed as output tokens and count toward `max_tokens`, even when not returned to you.
- **Configuring thinking**: models differ in default and rejected `thinking.type` values — see thinking-troubleshooting.md's per-model configuration table for the authoritative list.
- **Summarized thinking**: the `thinking` text is always a *summary* of Claude's reasoning, never the raw chain of thought; summarization is done by a different model and is billed at the full underlying thinking-token count.
- **Streaming**: thinking streams as `thinking_delta` events inside `content_block_delta`, followed by one `signature_delta` before `content_block_stop`. With `display: "omitted"`, no `thinking_delta` events are emitted.
- **Thinking and effort**: `thinking` controls *whether* Claude thinks; `effort` (`output_config.effort`, not inside `thinking`) controls how much work goes into the whole response, including thinking depth. Never pass `"adaptive"` as an effort value.
- **Thinking with tool use**: manual extended thinking only supports `tool_choice: "auto"` or `"none"` (adaptive thinking supports forced tool use). A tool-use loop (calls + results) counts as one assistant turn; thinking mode can't be toggled mid-turn. When returning tool results, you must pass back every `thinking`/`redacted_thinking` block from the assistant message complete and unmodified — modified blocks are rejected with a 400 error.
- **Interleaved thinking**: automatic in adaptive mode on every model that supports it (no beta header needed); lets Claude think between tool calls. Claude Haiku 4.5 does not support it.
- **Progress updates between tool calls**: on Fable 5.1, Mythos 5.1, Opus 5.5, Sonnet 5.5, and Fable 5 the model can write a progress update before a `tool_use` / `server_tool_use` block, returned as its own `thinking` block with its own `signature`. Contents depend on `display`: `"omitted"` empty for both reasoning and updates; `"updates"` (beta) empty reasoning, summary text for updates; `"summarized"` summary text for both (indistinguishable). On Sonnet 5.5, `thinking: {type: "between_tools"}` (effort `high` or below, no other field, no beta header) turns off up-front thinking and returns progress updates with summary text.
- **Thinking block preservation by model**: Opus 4.5 and later Opus models, Sonnet 4.6 and later Sonnet models, Haiku 5.5, Fable 5.1, Mythos 5.1, Fable 5, Mythos 5, Mythos Preview keep all prior turns' thinking blocks in context (billed as input on later turns); earlier Opus/Sonnet and all Haiku models through Haiku 4.5 keep only the last turn and the API strips older blocks automatically when you pass them back. A block is readable only by the model that produced it and certain other models; the API drops (without error or billing) blocks the target model can't read.
- **Preserved thinking**: starting with Fable 5.1, the API checks each `thinking` / `redacted_thinking` block's `signature` for the producing model and for an unchanged prefix (`system`, `tools`, earlier messages). The prefix check is enforced by default for accounts created on or after 2026-08-31 00:00 UTC; on older accounts only on requests that set `thinking.block_binding.prefix_mismatch_behavior`. Keep history append-only. Sonnet 5.5 and Haiku 5.5 blocks are also tied to the producing account. See preserved-thinking.md.
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
- [preserved-thinking.md](./preserved-thinking.md)
