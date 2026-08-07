<!-- source: https://platform.claude.com/docs/en/managed-agents/session-operations / last verified: 2026-08-07 -->

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
| `limit` / `page` / `order` | query params | Pagination on `GET /v1/sessions`; `page` cursor encodes `order`, reusing with a different `order` returns 400 |

## Notes

- `idle`: waiting for input (including tool confirmations). `running`: actively executing. `rescheduling`: transient error, auto-retrying. `terminated`: ended (unrecoverable error or archived) — a session that finishes work goes `idle`, not `terminated`.
- To update `agent.tools`/`agent.mcp_servers` mid-session, the session must be `idle`; interrupt a `running` session first. Updates are session-local, do not propagate to the underlying agent, and are full replacement (GET, modify, POST back to preserve entries).
- Archiving prevents new events while preserving history; a `running` session cannot be archived (interrupt first).
- Deleting permanently removes the session's record, events, and sandbox; a `running` session cannot be deleted. Memory stores, vaults, skills, environments, and agents are independent and unaffected. Files uploaded via the Files API are unaffected, but session-produced files are deleted with the sandbox.

## Related

- [Start a session](./sessions.md)
