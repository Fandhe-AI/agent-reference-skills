# API deployment checklist

Checklist of high-value, commonly underused Responses API design choices that improve deployment quality, speed, cost, and reliability.

## Signature / Usage

```javascript
const response = await openai.responses.create({
  model: "gpt-6-astra",
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
| Choose a model for the workload (GPT-6) | Quality, cost, latency | `gpt-6-astra` (highest capability), `gpt-6.1-sol` (complex coding/professional work at lower cost), `gpt-6-luna` (efficient, repeatable work) instead of routing everything to the top tier; preserve effective reasoning effort and use Responses for tools (GPT-6 Astra / GPT-6.1 Sol) |
| `reasoning.effort` | Quality, cost, latency | `none`/`low`/`medium`(default)/`high`/`xhigh`/`max` (model-dependent); low for extraction/routing, higher for diagnosis/planning |
| Change reasoning effort mid-conversation | Quality, cost, latency | Append a `configuration_update` input item instead of changing request-level `reasoning.effort`, preserving the prompt-cache prefix (GPT-6 family) |
| `text.verbosity` | Quality, cost, latency | Controls output length independent of prompt instructions |
| assistant `phase` | Quality, cost | `commentary` vs `final_answer` label on assistant messages; resend on follow-ups for `gpt-5.3-codex`+ to reduce early stopping |
| `tool_search` | Cost, latency | Defer expensive tool definitions with `defer_loading: true`; model loads only what it needs |
| Programmatic Tool Calling | Quality, cost, latency | Model writes JS to filter/join/reduce tool results in a hosted runtime before returning to the model |
| Multi-agent | Quality, cost, latency | Beta; root agent delegates bounded parallel workstreams to subagents (`multi_agent.enabled: true`) |
| Async tool calling | Latency | On GPT-6 models set `async: true` on a function or custom tool so the model keeps working while your app runs it; return the result with the original `call_id`. Not for built-in tools or programmatic tool calls; in Multi-agent mode do not combine with parallel tool calls |
| Built-in tools | Quality | Prefer web search, file search, code interpreter, shell, computer use, image generation, MCP/connectors, skills, apply patch over custom tools |
| Compaction | Cost | Server-side via `context_management`/`compact_threshold`, or manual `client.responses.compact()` |
| Prompt caching / `prompt_cache_key` | Latency, cost | GPT-5.6+ supports explicit `prompt_cache_breakpoint`; the key is optional there (separate cache accounting per customer/user). Before GPT-5.6, use a stable key per shared prefix and keep traffic per key to ~15 req/min. Migrating from GPT-5.5 or earlier: replace `prompt_cache_retention` with `prompt_cache_options.ttl: "30m"` |
| `reasoning.encrypted_content` | Quality, latency | Preserve reasoning across stateless turns via `reasoning.context: "all_turns"` and `encrypted_content` when ZDR disallows storage |
| Image `detail` | Quality, cost, latency | Omitted/`auto` behaves like `original` on GPT-5.6 (no resize); set `low`/`high`/`original` intentionally |
| `safety_identifier` | Safety, reliability | Stable, privacy-preserving hash of user identity (or session ID) sent per request |
| Handle misalignment monitoring | Safety, reliability | For GPT-6 Astra agent workflows, a `403` with `misalignment_policy_violation` means stop dispatching actions for that conversation and do not auto-retry; handle mid-stream errors; optional `safety.alert.created` webhook (details belong to the openai-platform-ops skill) |
| Handle rapid traffic increases and model overload | Reliability | `429` + `slow_down`: follow `Retry-After`, reduce traffic, ramp gradually. `503` + `server_is_overloaded`: follow `Retry-After`, then retry. Billing/spend/quota errors need action first. See [rate-limits](../webhooks-errors/rate-limits.md) |
| `background=True` | Resumability | Async job + polling for long-running requests; combinable with `stream=True` |
| WebSocket mode | Latency | Persistent connection reusing `previous_response_id` for tool-heavy workflows with 20+ tool calls (~40% faster); 60-minute connection cap; `stream_id` lanes multiplex one connection (up to 16 in-flight responses) |
| Mid-turn steering | Quality | If users add requirements while a GPT-6 model works, send `response.steer` over WebSocket with the active response ID in `previous_response_id`; `response.steer.accepted` means queued. It does not undo output already sent or tools already started |

## Notes

- This is a summary checklist page; each item links to its own dedicated guide in the official docs for full detail.
- Multi-agent (beta) does not support `/responses/compact`, `reasoning.summary`, or `max_tool_calls`; the server auto-compacts root and subagent contexts instead.
- The assistant `phase` row follows this checklist page (`gpt-5.3-codex` and later); the reasoning guide separately scopes `phase` to GPT-5.5 / GPT-5.4 (see [reasoning](./reasoning.md)). The two official pages differ; check the model page.
- On GPT-5.6+, cache writes cost 1.25x the uncached input token rate — log `cached_tokens` and `cache_write_tokens` to measure net cost.

## Related

- [reasoning](./reasoning.md)
- [reasoning-best-practices](./reasoning-best-practices.md)
- [prompt-caching](./prompt-caching.md)
- [background](./background.md)
- [compaction](./compaction.md)
- [responses-multi-agent](./responses-multi-agent.md)
