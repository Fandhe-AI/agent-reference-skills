# Tracing (Agents API)

A session keeps conversation and work together; a session has several turns; a trace shows the steps within one turn (model responses, tool calls, delegated work). Tracing is enabled by default for new sessions.

## Signature / Usage

Download a page of session traces as OTLP JSON:

```bash
curl --fail-with-body \
  "https://api.openai.com/v1/agents/sessions/sess_123/traces?limit=20&order=asc" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "OpenAI-Beta: agents=v1" \
  --output trace-page.json && \
jq '{resourceSpans: [.data[].otlp.resourceSpans[]]}' trace-page.json > traces.otlp.json
```

Find sessions for an agent (to export across an agent's sessions):

```bash
curl --fail-with-body \
  "https://api.openai.com/v1/agents/sessions?agent_id=agent_123&limit=100&order=asc" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "OpenAI-Beta: agents=v1"
```

## Options / Props

| Span | What you can inspect |
|------|----------------------|
| Agent | Agent type (`root` or `subagent`), ID, name, model, instructions when recorded, that agent's token usage (excludes its subagents), duration, outcome status |
| Generation | Recorded input and output for a model response, model when recorded; a turn can have several generations |
| Tool | Tool call (name and arguments), result when available, outcome status and error; covers functions, MCP tools, web searches, command execution |

## Notes

- Dashboard: Logs -> Agents (platform.openai.com/logs?api=agents); search logs, filter by model, status, or date; the session summary shows status, model, start time, last activity, number of turns, token usage.
- For an MCP tool call, **Call** contains `server_label`, `name`, `arguments`, and the response/error as `output` / `error`; the separate **Result** panel can be empty (`null`).
- Agent span duration includes child steps; steps can overlap (two parallel subagents running 10 seconds cover about 10 seconds elapsed).
- Token usage can arrive after the turn ends; blank or `null` means unknown, not zero; counts are not a final bill.
- Traces are built after a turn ends, so the answer can appear before its trace or usage is ready.
- Export: `GET /v1/agents/sessions/{session_id}/traces` returns a page of OTLP JSON traces. Trace export must be enabled for your organization; use a key for the session's project with `api.traces.read` or `api.agents.read`. Page with `last_id` as `after`, keeping the same `order`, until `has_more` is `false`. Exports include only traces available at request time and do not set up automatic delivery. Send the OTLP payload to your provider's OTLP/HTTP endpoint with its authentication.
- Agent-wide export: list sessions with the `agent_id` filter (matches the session's root agent), export each session's traces; keep the session-list cursor separate from each trace cursor.
- Distinct from Agents SDK tracing (this skill's `orchestration` category).
- Source: https://developers.openai.com/api/docs/guides/agents-api/tracing (fetched 2026-10).

## Related

- [Observability and Usage](./observability.md)
- [Multi-agent (Agents API)](./multi-agent.md)
- [Errors and Recovery](./errors.md)
