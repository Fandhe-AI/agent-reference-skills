<!-- source: https://platform.claude.com/docs/en/managed-agents/webhooks / last verified: 2026-08-07 -->

# Subscribe to webhooks

Get notified of major session/resource state changes without polling. Sessions are long-running interactions; real-time turn-by-turn interaction happens through the SSE event stream (see events-and-streaming.md), while webhooks notify you of major state changes. Webhook events carry only the event `type` and `id`, not the full object — fetch the object with a `GET` call to avoid stale data and keep deliveries small.

## Supported event types

| Category | Key events |
|----------|------------|
| Session | `session.status_run_started`, `session.status_idled`, `session.status_rescheduled`, `session.status_terminated`, `session.thread_created`, `session.thread_idled`, `session.thread_terminated`, `session.outcome_evaluation_ended`, `session.updated`, `session.deleted` |
| Vault | `vault.created`, `vault.archived`, `vault.deleted`, `vault_credential.created`, `vault_credential.archived`, `vault_credential.deleted`, `vault_credential.refresh_failed` |
| Agent | `agent.created`, `agent.updated`, `agent.archived`, `agent.deleted` |
| Deployment | `deployment.created`, `deployment.updated`, `deployment.paused`, `deployment.unpaused`, `deployment.archived`, `deployment.deleted` |
| Deployment run | `deployment_run.started`, `deployment_run.succeeded`, `deployment_run.failed` (scheduled runs only; manual runs via the `run` endpoint don't emit these) |
| Environment | `environment.created`, `environment.updated`, `environment.archived`, `environment.deleted` |
| Memory store | `memory_store.created`, `memory_store.archived`, `memory_store.deleted` (individual memories/versions emit no events) |

## Register an endpoint

Register in **Manage > Webhooks** in the Claude Console. An endpoint has: a public HTTPS URL on port 443, a list of subscribed event types (`data.type` values), and a 32-byte `whsec_`-prefixed signing secret shown only once at creation.

## Signature / Usage

Every delivery carries `webhook-id`, `webhook-timestamp`, and `webhook-signature` headers. Use the SDK's `unwrap()` helper to verify and parse in one step (throws if invalid or older than 5 minutes). Set `ANTHROPIC_WEBHOOK_SIGNING_KEY` to the `whsec_`-prefixed secret.

```python
from flask import Flask, request
import anthropic

client = anthropic.Anthropic()  # reads ANTHROPIC_WEBHOOK_SIGNING_KEY from env
app = Flask(__name__)

@app.route("/webhook", methods=["POST"])
def webhook():
    try:
        event = client.beta.webhooks.unwrap(
            request.get_data(as_text=True), headers=dict(request.headers),
        )
    except Exception:
        return "invalid signature", 400

    if event.data.type == "session.status_idled":
        session = client.beta.sessions.retrieve(event.data.id)
        notify_user(session)

    return "", 204
```

Payload shape:

```json
{
  "type": "event",
  "id": "whe_9d5c1f7e...",
  "created_at": "2026-03-18T14:05:22Z",
  "data": {
    "type": "session.status_idled",
    "id": "sesn_01XYZ...",
    "organization_id": "8a3d2f1e-...",
    "workspace_id": "c7b0e4d9-..."
  }
}
```

Return any `2xx` to acknowledge; other responses count against the endpoint (see Delivery behavior).

## Delivery behavior

- **Duplicates**: the same `event.id` (= `webhook-id` header) can be delivered more than once; deduplicate on it.
- **Subscription scope**: an event is delivered only to endpoints subscribed to its type at emission time; subscribing later does not backfill it.
- **Ordering is not guaranteed**: drive state from the resource you fetch, not from event arrival order.
- **Retries**: up to three delivery attempts with jittered exponential backoff (5-120s); after the last failed attempt the event is dropped with no durable log — reconcile by listing/fetching the resource if you need every transition.
- **Timestamps**: `webhook-timestamp` is the delivery-attempt clock and is regenerated on every retry; use the payload's `created_at` for when the event occurred.
- **Auto-disable**: an endpoint is set to `disabled` (with a machine-readable `disabled_reason`) if it returns a `3xx` (redirects are never followed), if its URL resolves to a non-public IP, or after sustained continuous delivery failures. A single `2xx` resets the failure window. All cases are reversible by re-enabling in Console; events emitted while disabled are not replayed.

## Notes

- Managed Agents API requests require the `managed-agents-2026-04-01` beta header, except memory store endpoints (`agent-memory-2026-07-22`).

## Related

- [Session Event Stream](./events-and-streaming.md)
- [Scheduled deployments](./scheduled-deployments.md)
