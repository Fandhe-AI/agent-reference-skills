# Sandbox Lifecycle

An agent session can outlive its environment. Your application manages the compute and files of a `self_hosted` environment: start, reconnect, stop, clean up.

## Signature / Usage

Webhook-managed startup: the API emits `agent.session.action_required` with `required_action.type: "environment_connection"` before waiting for the executor; the handler starts or reconnects the environment.

```json
{
  "type": "agent.session.action_required",
  "data": {
    "id": "sess_abc123",
    "required_action": { "type": "environment_connection" }
  }
}
```

Start the executor with the values from the retrieved session:

```bash
codex exec-server \
  --remote "<session.environment.remote_url>" \
  --environment-id "<session.environment.id>"
```

## Notes

- Application-managed start: create a session, start compute with your provider's SDK or API, then connect the executor with the session's environment ID and an environment key. Use one component per session's environment, store the session-to-compute mapping, and prevent duplicate environments from repeated or concurrent requests.
- Webhook-managed start: register a handler for `agent.session.action_required` and `agent.session.failed`; keep its signing secret and session-read credential separate from the executor's environment key; route events to the handler that owns the session.
- Handler vs worker: (1) verify the signature and queue connection requests only when `data.required_action.type` is `environment_connection`, also queue session failures, and return success only after queuing; (2) the worker retrieves the session, ignores deleted sessions and resolved actions, starts or reconnects the executor using `session.environment.id` and `session.environment.remote_url` for a self-hosted session still needing connection, and releases compute for a still-failed session.
- The session stream reports the same request as `agent.session.requires_action`. A `function_call` required action needs a function result, not environment startup. Turn creation and `agent.session.in_progress` arrive too late to start an offline executor.
- Keep running or stop: keep compute between turns, or allow a grace period after a turn ends. Cancel a pending shutdown when a connection is requested or execution starts; recheck state before stopping. An idle event alone is not a safe shutdown signal. If shutdown cannot be coordinated with incoming work, keep the environment running.
- Reconnect: `agent.session.environment.connected` / `.disconnected` observe connections; `.pending` / `.failed` can come during setup. These events do not request compute; use the `environment_connection` required action to trigger startup and check provider health separately. A mid-turn disconnect can fail a tool even if the turn completes; it does not automatically request reconnection through a webhook or restart a killed command; later input can request reconnection.
- The API waits up to five minutes for an input-time connection (configure client and proxy timeouts). If it expires the submission fails; initial input can fail asynchronously leaving the session `failed`. Pending input is not guaranteed to survive a process crash; do not resubmit while the original request waits; a late connection does not replay timed-out input.
- Reusing the environment ID does not restore files in replacement compute; use provider storage or snapshots.
- Clean up: stop accepting new input, coordinate with startup in progress, delete the session and stop provider compute separately. Deleting a session neither stops its environment nor emits a deletion webhook.
- Cookbook examples exist for application-managed and webhook-managed sandboxes (openai/openai-cookbook `examples/agents_api/sandboxes`).
- Source: https://developers.openai.com/api/docs/guides/agents-api/environments/lifecycle (fetched 2026-10).

## Related

- [Self-hosted Sandboxes](./self-hosted-sandboxes.md)
- [Session Webhooks](./session-webhooks.md)
- [Manage Sessions](./manage-sessions.md)
