<!-- source: https://platform.claude.com/docs/en/managed-agents/session-observability / last verified: 2026-10-17 -->

# Inspect sessions and track usage

Inspect a session in the Claude Console session viewer, read its token usage and list cost, and debug unexpected agent behavior. Beta header: `managed-agents-2026-04-01`.

## Signature / Usage

The session object carries cumulative `usage`; fetch it after the session goes idle.

```json
{
  "id": "sesn_01...",
  "status": "idle",
  "usage": {
    "input_tokens": 5000,
    "output_tokens": 3200,
    "cache_read_input_tokens": 20000,
    "cache_creation": {
      "ephemeral_5m_input_tokens": 2000,
      "ephemeral_1h_input_tokens": 0
    },
    "list_cost": {
      "amount": "187",
      "currency": "USD"
    },
    "active_seconds": 342.5,
    "server_tool_use": {
      "web_search_requests": 3,
      "web_fetch_requests": 0
    }
  }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `input_tokens` | number | Uncached input tokens across all model calls in the session |
| `output_tokens` | number | Total output tokens across all model calls |
| `cache_read_input_tokens` | number | Tokens read from the prompt cache |
| `cache_creation` | object | Cache-creation tokens by lifetime (`ephemeral_5m_input_tokens`, `ephemeral_1h_input_tokens`) |
| `list_cost` | object | Cumulative consumption at public list rates; whole cents in a string, with a currency code |
| `active_seconds` | number | Cumulative time with at least one thread running; overlapping concurrent activity counted once; runtime cost is priced on this |
| `server_tool_use` | object | Server-executed tool request counts, for pricing |

Console Inspector tabs: **Session** (details, metadata, cumulative cost over time, spend against budget), **Events** (raw events on the current thread; **Deltas** view for streamed messages), **Tools** (configured tools, call counts, failures, median duration), **Resources** (mounted files, repositories, memory stores, files in `/mnt/session/outputs`, attached skills), **Threads** (status, context size, cost per thread).

## Notes

- The session viewer is only accessible to Developers and Admins: Console `platform.claude.com/sessions`. The list shows status, agent, token usage, cost, and creation time. The viewer has a timeline minimap (one lane per thread in multiagent sessions) and a transcript (filterable, copy or download as JSON).
- Append `?event={event_id}` to a session URL to open at a specific event. `ant beta:sessions connect` opens the same viewer or follows the session in the terminal.
- Web search requests are priced into list cost per request; web fetch requests carry no per-request charge and are not metered, so `web_fetch_requests` reads `0`.
- Cache entries use a 5-minute TTL by default, so back-to-back turns within that window benefit from cache reads.
- The session's `stats` object has its own `active_seconds`, which sums each thread's own active time instead of counting overlap once.
- Per-thread `usage` carries `list_cost` and `active_seconds`, rounded independently and excluding the session's running-time cost, so they do not sum exactly to the session `list_cost`; the session figure is authoritative.
- The `session.usage` event carries the same cumulative snapshot (the `usage` object plus `budget` if set) on the stream and in event history. It is emitted immediately before the session goes idle (any stop reason) and when a thread pauses at a session budget.
- To enforce a spend limit, set a session budget instead of polling usage.
- Debugging: check `session.error` events; review tool results (Inspector Tools tab shows failures); add logging instructions to the system prompt; for event deltas problems see Troubleshoot previews in the event deltas docs.

## Related

- [Session budgets](./budgets.md)
- [Session operations](./session-operations.md)
- [Start a session](./sessions.md)
