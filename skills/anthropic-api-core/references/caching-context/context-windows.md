<!-- source: https://platform.claude.com/docs/en/build-with-claude/context-windows / last verified: 2026-08-07 -->

# Context windows

How the context window works, how thinking and tool use count toward it, per-model sizes, context awareness, and overflow behavior.

## Signature / Usage

Context-awareness tags the API injects automatically (Sonnet 5, Sonnet 4.6, Sonnet 4.5, Haiku 4.5 only — never sent by you):

```xml
<budget:token_budget>200000</budget:token_budget>
...
<system_warning>Token usage: 35000/200000; 165000 remaining</system_warning>
```

## Options / Props

| Model group | Context window |
|---|---|
| Opus 5, Opus 4.8, Opus 4.7, Opus 4.6, Sonnet 5, Sonnet 4.6, Mythos Preview, Fable 5, Mythos 5 | 1M tokens (default, no beta header, standard pricing) |
| Other models (e.g. Sonnet 4.5) | 200k tokens |

Max output per request on 1M-context models: 128k tokens. Max images/PDF pages per request: 600 (1M-context models) / 100 (200k-context models).

## Notes

- Everything in the request counts: system prompt, all of `messages` (tool results, images, documents), tool definitions, plus the output Claude generates (including thinking).
- Cached prompt prefixes still occupy the context window — caching changes what you pay, not whether tokens count.
- Thinking and the window: current-turn thinking always counts toward `max_tokens`/output tokens. Prior-turn thinking counts only on "keep-all" models (Opus 4.5+, Sonnet 4.6+, Fable 5, Mythos 5, Mythos Preview); on other models the API strips prior thinking blocks automatically when you pass them back.
- Tool result handling with thinking: when returning a `tool_result`, the accompanying thinking block from that turn must be sent back unmodified — the only case where you're required to return thinking blocks.
- Overflow: if input alone exceeds the context window, the API returns a 400 `invalid_request_error` ("prompt is too long"). If input + `max_tokens` exceeds the window, Claude 4.5+ models accept the request and may stop with `stop_reason: "model_context_window_exceeded"` instead of erroring (earlier models need the `model-context-window-exceeded-2025-08-26` beta header to opt into this behavior).
- For long-running conversations, prefer server-side [compaction](./compaction.md) over manual context management.

## Related

- [compaction.md](./compaction.md)
- [context-editing.md](./context-editing.md)
