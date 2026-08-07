<!-- source: https://platform.claude.com/docs/en/api/beta/webhooks.md / last verified: 2026-08-07 -->

# Webhooks

Managed Agents webhooks deliver a `BetaWebhookEvent` payload (`{id, created_at, data, type: "event"}`) for lifecycle changes across resources. This is a domain-type reference (event catalog), not a request/response endpoint — there is no page hierarchy under `/api/beta/webhooks/*`.

## Signature / Usage

`data` is a discriminated union on its own `type` field, one variant per resource lifecycle transition. All variants share the shape `{id, organization_id, type, workspace_id}` (session-thread events additionally carry `session_thread_id`).

```json
{
  "id": "evt_...",
  "created_at": "2026-03-15T10:00:00Z",
  "data": {
    "id": "agent_011CZkYpogX7uDKUyvBTophP",
    "organization_id": "org_...",
    "type": "agent.created",
    "workspace_id": "ws_..."
  },
  "type": "event"
}
```

## Options / Props

### Event `type` values by resource

| Resource | Event types |
|----------|-------------|
| `agent` | `agent.created`, `agent.updated`, `agent.archived`, `agent.deleted` |
| `deployment` | `deployment.created`, `deployment.updated`, `deployment.paused`, `deployment.unpaused`, `deployment.archived`, `deployment.deleted` |
| `deployment_run` | `deployment_run.started`, `deployment_run.succeeded`, `deployment_run.failed` |
| `environment` | `environment.created`, `environment.updated`, `environment.archived`, `environment.deleted` |
| `memory_store` | `memory_store.created`, `memory_store.archived`, `memory_store.deleted` |
| `session` | `session.created`, `session.updated`, `session.pending`, `session.running`, `session.idled`, `session.requires_action`, `session.archived`, `session.deleted`, `session.outcome_evaluation_ended` |
| `session` (status, fine-grained) | `session.status_rescheduled`, `session.status_run_started`, `session.status_idled`, `session.status_terminated` |
| `session` (thread) | `session.thread_created`, `session.thread_idled`, `session.thread_terminated` (each also carries `session_thread_id`) |
| `vault` | `vault.created`, `vault.archived`, `vault.deleted` |
| `vault_credential` | `vault_credential.created`, `vault_credential.archived`, `vault_credential.deleted`, `vault_credential.refresh_failed` (each also carries `vault_id`) |

### `BetaWebhookEvent` fields

| Name | Type | Description |
|------|------|-------------|
| `id` | `string` | Unique event identifier for idempotency. |
| `created_at` | `string` (RFC 3339) | When the event occurred. |
| `type` | `"event"` | Always `"event"` for the webhook envelope. |
| `data` | union (see table above) | Resource-specific payload; every variant has `id` (the triggering resource's ID), `organization_id`, `type`, `workspace_id`; thread/credential variants add `session_thread_id`/`vault_id`. |

### `UnwrapWebhookEvent`

Same shape as `BetaWebhookEvent` — the unwrapped form used when a webhook payload has already been signature-verified and JSON-parsed by an SDK helper.

## Notes

- Beta; requires header `anthropic-beta: managed-agents-2026-04-01` (or a superset covering the resource, e.g. `dreaming-2026-04-21` is not needed here since Dreams has no webhook events) to configure/manage webhook subscriptions via the platform.
- No documented sub-endpoints exist under `/api/beta/webhooks/*` for creating/listing webhook subscriptions on this page — the page is purely the event/data-type catalog.
- All `data` variants are flat (`id`/`organization_id`/`type`/`workspace_id` plus at most one extra ID field); there is no nested resource body in the event payload — fetch the full resource via its REST endpoint (agents.md / deployments.md) if needed.

## Related

- [agents.md](./agents.md) — `agent.*` events
- [deployments.md](./deployments.md) — `deployment.*`, `deployment_run.*`, `environment.*` events
- [dreams.md](./dreams.md) — memory-store lifecycle backing `memory_store.*` events
