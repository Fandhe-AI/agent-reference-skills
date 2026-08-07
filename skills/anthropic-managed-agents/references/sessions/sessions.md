<!-- source: https://platform.claude.com/docs/en/managed-agents/sessions / last verified: 2026-08-07 -->

# Start a session

A session is an agent instance within an environment. It references an `agent` and an `environment` (both created separately) and maintains conversation history across interactions. Sessions follow a two-step lifecycle: create the session, then send a `user.message` event to start work — or collapse both into one call with `initial_events`.

Managed Agents API requests require the `managed-agents-2026-04-01` beta header (memory store endpoints use `agent-memory-2026-07-22` instead). SDKs set this automatically.

## Signature / Usage

```bash
session=$(curl -fsSL https://api.anthropic.com/v1/sessions \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "anthropic-beta: managed-agents-2026-04-01" \
  -H "content-type: application/json" \
  -d '{"agent": "'"$AGENT_ID"'", "environment_id": "'"$ENVIRONMENT_ID"'"}')
SESSION_ID=$(jq -r '.id' <<< "$session")
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `agent` | string \| object | Agent ID (latest version), a pinned-version object (`type: "agent"`, `id`, `version`), or an overrides object (`type: "agent_with_overrides"`) for `model`/`system`/`tools`/`mcp_servers`/`skills` on this session only |
| `environment_id` | string | The environment the session's sandbox runs in |
| `initial_events` | array | Up to 50 initial events (`user.message`, `user.define_outcome` only), processed in order; a non-empty list starts the session directly in `running` |
| `vault_ids` | array | Vault IDs supplying MCP credentials for the session |
| `resources` | array | Files, GitHub repos, or memory stores mounted at session creation |

## Notes

- Creating a session without `initial_events` registers it but does not start work; send a `user.message` event (or use `initial_events`) to begin. See `session-operations.md` for status transitions.
- Overrides in `agent` (`type: "agent_with_overrides"`) never merge with the agent's stored config — a `tools` override must list every tool the session should have. `model` can never be cleared (`null` returns 400); clearing `tools` fails if effective `skills` is non-empty (skills require the `read` tool).
- `vault_ids` supplies MCP OAuth/bearer credentials matched by `mcp_server_url`; see `vaults.md`.

## Related

- [Session operations](./session-operations.md)
- [Skills](./skills.md)
- [MCP connector](./mcp-connector.md)
