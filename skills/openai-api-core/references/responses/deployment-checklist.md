# API deployment checklist

Checklist of high-value, commonly underused Responses API design choices that improve deployment quality, speed, cost, and reliability.

## Signature / Usage

```javascript
const response = await openai.responses.create({
  model: "gpt-5.6",
  reasoning: { effort: "medium" },
  text: { verbosity: "low" },
  prompt_cache_key: "tenant-acme-support-agent",
  safety_identifier: "hashed-user-id",
  input: "Summarize the current escalation for the on-call lead.",
});
```

## Options / Props

| Item | Expected impact | Description |
| --- | --- | --- |
| Use the Responses API | Quality, cost, latency, reliability | Start here instead of Chat Completions for newest model behavior, built-in tools, stateful workflows |
| Choose a GPT-5.6 model | Quality, cost, latency | `gpt-5.6`/`gpt-5.6-sol` (frontier), `gpt-5.6-terra` (balanced), `gpt-5.6-luna` (high-volume) instead of routing everything to the top tier |
| `reasoning.effort` | Quality, cost, latency | `none`/`low`/`medium`(default)/`high`/`xhigh`/`max`; low for extraction/routing, higher for diagnosis/planning |
| `text.verbosity` | Quality, cost, latency | Controls output length independent of prompt instructions |
| assistant `phase` | Quality, cost | `commentary` vs `final_answer` label on assistant messages; resend on follow-ups for `gpt-5.3-codex`+ to reduce early stopping |
| `tool_search` | Cost, latency | Defer expensive tool definitions with `defer_loading: true`; model loads only what it needs |
| Programmatic Tool Calling | Quality, cost, latency | Model writes JS to filter/join/reduce tool results in a hosted runtime before returning to the model |
| Multi-agent | Quality, cost, latency | Beta; root agent delegates bounded parallel workstreams to subagents (`multi_agent.enabled: true`) |
| Built-in tools | Quality | Prefer web search, file search, code interpreter, shell, computer use, image generation, MCP/connectors, skills, apply patch over custom tools |
| Compaction | Cost | Server-side via `context_management`/`compact_threshold`, or manual `client.responses.compact()` |
| `prompt_cache_key` | Latency, cost | Stable key per shared prefix; keep traffic per key to ~15 req/min; GPT-5.6+ also supports explicit `prompt_cache_breakpoint` |
| `reasoning.encrypted_content` | Quality, latency | Preserve reasoning across stateless turns via `reasoning.context: "all_turns"` and `encrypted_content` when ZDR disallows storage |
| Image `detail` | Quality, cost, latency | Omitted/`auto` behaves like `original` on GPT-5.6 (no resize); set `low`/`high`/`original` intentionally |
| `safety_identifier` | Safety, reliability | Stable, privacy-preserving hash of user identity (or session ID) sent per request |
| `background=True` | Resumability | Async job + polling for long-running requests; combinable with `stream=True` |
| WebSocket mode | Latency | Persistent connection reusing `previous_response_id` for tool-heavy workflows with 20+ tool calls (~40% faster); 60-minute connection cap; one in-flight response per connection |

## Notes

- This is a summary checklist page; each item links to its own dedicated guide in the official docs for full detail.
- Multi-agent (beta) does not support `/responses/compact`, `reasoning.summary`, or `max_tool_calls`; the server auto-compacts root and subagent contexts instead.
- On GPT-5.6+, cache writes cost 1.25x the uncached input token rate — log `cached_tokens` and `cache_write_tokens` to measure net cost.

## Related

- [reasoning](./reasoning.md)
- [reasoning-best-practices](./reasoning-best-practices.md)
- [prompt-caching](./prompt-caching.md)
- [background](./background.md)
- [compaction](./compaction.md)
- [responses-multi-agent](./responses-multi-agent.md)
