<!-- source: https://platform.claude.com/docs/en/build-with-claude/compaction / last verified: 2026-08-07 -->

# Compaction

Server-side context compaction: automatically summarizes older conversation content when input tokens reach a trigger threshold, replacing it with a `compaction` block so long-running conversations/agentic tasks can continue past context-window limits. Beta; Anthropic's recommended strategy for long-context management.

## Signature / Usage

```python
messages = [{"role": "user", "content": "Help me build a website"}]

response = client.beta.messages.create(
    betas=["compact-2026-01-12"],
    model="claude-opus-5",
    max_tokens=4096,
    messages=messages,
    context_management={"edits": [{"type": "compact_20260112"}]},
)

messages.append({"role": "assistant", "content": response.content})
```

## Options / Props

| Parameter | Type | Default | Description |
|---|---|---|---|
| `type` | string | required | `"compact_20260112"` |
| `trigger` | object | `{"type": "input_tokens", "value": 150000}` | When compaction triggers; `value` >= 50,000. |
| `pause_after_compaction` | boolean | `false` | Pause with `stop_reason: "compaction"` right after the summary so you can insert/preserve messages before continuing. |
| `instructions` | string | `null` | Custom summarization prompt; completely replaces (not supplements) the default. |

Supported models: `claude-fable-5`, `claude-mythos-5`, `claude-mythos-preview`, `claude-opus-5`, `claude-opus-4-8`, `claude-opus-4-7`, `claude-opus-4-6`, `claude-sonnet-5`, `claude-sonnet-4-6`. Beta header: `compact-2026-01-12`.

## Notes

- On subsequent requests, append the response (including the `compaction` block) to `messages`; the API automatically drops all content blocks before the last `compaction` block.
- Streaming: the `compaction` block sends `content_block_start`, one `content_block_delta` with the complete summary (no incremental streaming), then `content_block_stop`.
- Add a `cache_control` breakpoint at the end of the system prompt to keep it cached separately, so only the compaction summary needs re-caching after each compaction event.
- Usage reporting changes: `usage.iterations` lists per-sampling-step usage (a `compaction` entry plus the main `message` entry); top-level `usage.input_tokens`/`output_tokens` exclude compaction-iteration usage — sum `usage.iterations` for true total cost.
- `pause_after_compaction` + a compaction counter lets you estimate cumulative token spend and gracefully wrap up a task once a budget is reached.
- Token counting endpoint applies existing compaction blocks but does not trigger new ones; use it to check the effective post-compaction token count.

## Related

- [context-editing.md](./context-editing.md)
- [context-windows.md](./context-windows.md)
