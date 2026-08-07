<!-- source: https://platform.claude.com/docs/en/build-with-claude/context-editing / last verified: 2026-08-07 -->

# Context editing

Server-side strategies to selectively clear specific content from conversation history as it grows: tool result clearing and thinking block clearing. Also covers client-side (SDK) compaction, which Anthropic now recommends replacing with server-side compaction (see compaction.md).

## Signature / Usage

```python
response = client.beta.messages.create(
    model="claude-opus-5",
    max_tokens=4096,
    messages=[{"role": "user", "content": "Create a calculator app using Python"}],
    tools=[
        {"type": "text_editor_20250728", "name": "str_replace_based_edit_tool", "max_characters": 10000},
        {"type": "web_search_20250305", "name": "web_search", "max_uses": 3},
    ],
    betas=["context-management-2025-06-27"],
    context_management={
        "edits": [
            {
                "type": "clear_tool_uses_20250919",
                "trigger": {"type": "input_tokens", "value": 30000},
                "keep": {"type": "tool_uses", "value": 3},
                "clear_at_least": {"type": "input_tokens", "value": 5000},
                "exclude_tools": ["web_search"],
            }
        ]
    },
)
```

## Options / Props

`clear_tool_uses_20250919`:

| Option | Default | Description |
|--------|---------|-------------|
| `trigger` | 100,000 input tokens | When clearing activates (`input_tokens` or `tool_uses`). |
| `keep` | 3 tool uses | How many recent tool use/result pairs to preserve. |
| `clear_at_least` | none | Minimum tokens to clear each time. |
| `exclude_tools` | none | Tool names never cleared. |
| `clear_tool_inputs` | `false` | Also clear tool call parameters, not just results. |

`clear_thinking_20251015`:

| Option | Default | Description |
|--------|---------|-------------|
| `keep` | model-specific | `{type: "thinking_turns", value: N}` to keep last N turns, or `"all"`. Opus 4.5+/Sonnet 4.6+ default to keeping all prior thinking; Opus 4.1-/Sonnet 4.5-/Haiku default to last-turn-only. |

Combine both: list `clear_thinking_20251015` first in `edits`.

## Notes

- Beta header: `context-management-2025-06-27`.
- Response includes `context_management.applied_edits` reporting `cleared_tool_uses`/`cleared_thinking_turns` and `cleared_input_tokens`.
- Token counting endpoint (`/v1/messages/count_tokens`) supports `context_management` to preview savings without sending the real request.
- Tool result clearing invalidates cached prompt prefixes when content is cleared; thinking block clearing preserves cache when blocks are kept.
- Combine with the memory tool to have Claude persist essential info to memory files before tool results are cleared.
- Client-side compaction (`tool_runner` in Python/TypeScript/Ruby SDKs, `compaction_control: {enabled, context_token_threshold, model, summary_prompt}`) is available but Anthropic recommends server-side compaction instead — see compaction.md.

## Related

- [compaction.md](./compaction.md)
- [context-windows.md](./context-windows.md)
