<!-- source: https://platform.claude.com/docs/en/managed-agents/session-operations / last verified: 2026-10-17 -->

# Session operations

Retrieve, list, update, archive, and delete Claude Managed Agents sessions once they exist.

## Signature / Usage

```bash
curl -fsSL "https://api.anthropic.com/v1/sessions/$SESSION_ID" \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "anthropic-beta: managed-agents-2026-04-01"
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `status` | string | `idle` \| `running` \| `rescheduling` \| `terminated` (see Notes) |
| `agent.tools` / `agent.mcp_servers` | array | Only fields updatable mid-session via `POST /v1/sessions/{id}`; full replacement, not merge; session must be `idle` |
| `agent.tools[].configs[].allowed_domains` / `blocked_domains` | array | Per-tool web settings for `web_search` / `web_fetch` can be changed mid-session as part of the `agent.tools` replacement; updated lists apply to the rest of the session |
| `budget` | object \| null | Replace the cap with a new `max_list_cost`, or remove it with `null` (see Updating the session budget) |
| `limit` / `page` / `order` | query params | Pagination on `GET /v1/sessions`; `page` cursor encodes `order`, reusing with a different `order` returns 400 |

## Notes

- `idle`: waiting for input (including tool confirmations). `running`: actively executing. `rescheduling`: transient error, auto-retrying. `terminated`: ended (unrecoverable error or archived) — a session that finishes work goes `idle`, not `terminated`.
- To update `agent.tools`/`agent.mcp_servers` mid-session, the session must be `idle`; interrupt a `running` session first. Updates are session-local, do not propagate to the underlying agent, and are full replacement (GET, modify, POST back to preserve entries).
- An `idle` session can still have an open workflow run, so `idle` alone doesn't mean the work is done. If a workflow run is open (running or paused), an `agent.tools` / `agent.mcp_servers` update returns a 400 error even when the session is `idle`; an interrupt doesn't end a run, so the update still fails after you interrupt. Send a `user.message` that asks the agent to stop its runs, or wait until every run has ended.
- Only `tools` and `mcp_servers` can change after creation; `model` (including its `inference_geo` pin), `system`, and `skills` are fixed (use agent configuration overrides at creation). On models that support it, append guidance mid-session with a `system.message` event.
- Archiving prevents new events while preserving history; a `running` session cannot be archived (interrupt first).
- Deleting permanently removes the session's record, events, and sandbox; a `running` session cannot be deleted. Memory stores, vaults, skills, environments, and agents are independent and unaffected. Files uploaded via the Files API are unaffected, but session-produced files are deleted with the sandbox.

## Updating the session budget

A session created with a budget accepts two kinds of budget update: replacing the cap with a new `max_list_cost`, and removing it by passing `"budget": null`. Both automatically resume work that paused when the session reached its cap.

```bash
curl -sS --fail-with-body "https://api.anthropic.com/v1/sessions/$SESSION_ID" \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "anthropic-beta: managed-agents-2026-04-01" \
  -H "content-type: application/json" \
  -d '{"budget": null}'
```

- A replacement cap can be higher or lower than the current one, but it must be strictly greater than the session's consumed list cost.
- Removal is one-way: a non-null `budget` is accepted only on a session that currently has one, so you can't re-add a removed budget or add one to a session created without it.

## Related

- [Start a session](./sessions.md)
- [Session budgets](./budgets.md)
