<!-- source: https://platform.claude.com/docs/en/build-with-claude/prompt-caching / last verified: 2026-08-07 -->

# Prompt caching

Cache prompt prefixes with `cache_control` to cut cost and latency, via automatic caching (one top-level breakpoint that auto-advances) or explicit breakpoints on individual content blocks (5-minute default TTL, optional 1-hour TTL).

## Signature / Usage

```python
response = client.messages.create(
    model="claude-opus-5",
    max_tokens=1024,
    system=[{
        "type": "text",
        "text": "You are an expert software engineer.",
        "cache_control": {"type": "ephemeral"},
    }],
    messages=[{"role": "user", "content": "How do I implement a binary search tree?"}],
)
```

1-hour cache:

```json
"cache_control": {"type": "ephemeral", "ttl": "1h"}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `cache_control` | `{"type": "ephemeral", "ttl"?: "5m" \| "1h"}` | Marks a breakpoint. Default TTL 5 minutes (refreshed free on each hit); `"1h"` costs 2x base input price for writes. |

Minimum cacheable prompt length by model: 512 tokens (Opus 5, Fable 5, Mythos 5), 1,024 tokens (Opus 4.8, Sonnet 5, Sonnet 4.6, Sonnet 4.5), 2,048 tokens (Mythos Preview, Opus 4.7, Haiku 3.5), 4,096 tokens (Opus 4.6, Opus 4.5, Haiku 4.5).

Pricing multipliers: 5-min cache write 1.25x base input; 1-hour cache write 2x base input; cache read 0.1x base input.

## Notes

- Up to 4 cache breakpoints per request. Cache hierarchy: `tools` → `system` → `messages`. Cache writes happen only at the exact breakpoint; cache reads look backward up to 20 blocks per breakpoint.
- Cacheable: tool definitions, system content blocks, message text/image/document blocks, tool_use/tool_result blocks. Not cacheable: thinking blocks explicitly (though cached alongside other assistant-turn content), citation sub-blocks, empty text blocks.
- `usage.cache_creation_input_tokens` + `cache_read_input_tokens` + `input_tokens` = total input tokens.
- Invalidation: tool definition changes invalidate tools/system/messages caches; web search/citations/speed toggle invalidate only the tools cache; tool_choice invalidates tools+system; images invalidate tools+system; thinking parameter changes are model-specific and always invalidate the messages cache.
- Pre-warm a cache with `max_tokens: 0` before real traffic arrives (response has empty `content` and `stop_reason: "max_tokens"`).
- Use [cache diagnostics](./cache-diagnostics.md) to identify exactly where a prompt prefix diverged instead of guessing.

## Related

- [cache-diagnostics.md](./cache-diagnostics.md)
- [context-editing.md](./context-editing.md)
- [compaction.md](./compaction.md)
