<!-- source: https://platform.claude.com/docs/en/managed-agents/sessions / last verified: 2026-10-17 -->

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
| `budget` | object | Optional spend ceiling: `{type: "limit", max_list_cost: {amount, currency}}` (see Set a session budget) |

## Override agent configuration for a session

- A `model` override replaces the agent's `model` object in full, so the agent's own `effort` isn't carried over. To run the session at a specific effort level, set `effort` inside the override's `model` object; a level the model doesn't support returns 400, and an override without `effort` runs at that model's default effort level.
- The same replacement sets or clears the model's inference geo pin: an override that includes `inference_geo` pins the geography serving the session's model requests; one that omits it clears the agent's pin so the session follows the workspace's `default_inference_geo`. The value is validated against the workspace's `allowed_inference_geos` at creation.

```json
{"agent": {"type": "agent_with_overrides", "id": "agent_...", "model": {"id": "claude-opus-5-5", "effort": "high", "inference_geo": "us"}}, "environment_id": "env_..."}
```

## Set a session budget

Pass the optional `budget` object at creation to cap what a session can spend. A budget is a hard ceiling on the session's list cost: the platform prices everything the session consumes at public list rates, and the session stops issuing new model requests once the running total reaches `max_list_cost`. Set `type` to `limit` and give `max_list_cost` an `amount` and a `currency`. `amount` is a whole number of US cents written as a string (`"125"` is $1.25; a string so no floating-point rounding applies). `USD` is the only currency currently supported.

```json
{"agent": "agent_...", "environment_id": "env_...", "budget": {"type": "limit", "max_list_cost": {"amount": "125", "currency": "USD"}}}
```

- At the cap the session pauses and goes idle with the stop reason `budget_reached`. The cap is enforced between model requests, so the request that crosses it finishes first and the final list cost can land a fraction past the cap.
- A budget can only be attached at creation: you can change or remove it later, but you can't add one to a session created without it.
- Models without a public list price are rejected with `model_not_budgetable`.

## Notes

- Creating a session without `initial_events` registers it but does not start work; send a `user.message` event (or use `initial_events`) to begin. See `session-operations.md` for status transitions.
- Overrides in `agent` (`type: "agent_with_overrides"`) never merge with the agent's stored config — a `tools` override must list every tool the session should have. `model` can never be cleared (`null` returns 400); clearing `tools` fails if effective `skills` is non-empty (skills require the `read` tool).
- `vault_ids` supplies MCP OAuth/bearer credentials matched by `mcp_server_url`; see `vaults.md`.
- A session's `initial_events` accept only `user.message` and `user.define_outcome`; unlike `initial_events` on a scheduled deployment, they don't accept `system.message`. Send `system.message` afterwards with the events endpoint.

## Related

- [Session operations](./session-operations.md)
- [Skills](./skills.md)
- [MCP connector](./mcp-connector.md)
- [Session budgets](./budgets.md)
