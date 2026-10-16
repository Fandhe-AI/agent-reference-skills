# Daytona

Daytona as a self-hosted sandbox provider for the Agents API, with application-managed or webhook-managed provisioning.

## Signature / Usage

Application / provisioning side (outside the sandbox):

```bash
export DAYTONA_API_KEY=...
export OPENAI_API_KEY=...
export OPENAI_EXECUTOR_API_KEY=...   # environment key
```

Inside the sandbox (executor process only):

```bash
CODEX_API_KEY="<environment key (value of OPENAI_EXECUTOR_API_KEY)>" codex exec-server \
  --remote "<session.environment.remote_url>" \
  --environment-id "<session.environment.id>"
```

## Options / Props

| Name | Value / guidance |
|------|------------------|
| `auto_stop_interval` | `0`, so the Sandbox is not stopped while the agent works (the executor's long-lived outbound connection is not observed by Daytona's inactivity tracking) |

## Notes

- Keep your application's `OPENAI_API_KEY` outside the sandbox; pass only the environment key as `CODEX_API_KEY`.
- Application-managed: create a self-hosted session and save its environment ID; use the Daytona SDK or API to create an isolated sandbox with the configured working directory; install the Codex CLI; start the executor; run the session; delete the session and stop the provider sandbox separately. Configure a lifetime limit so interrupted runs do not leave compute running. For regular use put Codex and `ripgrep` in a Daytona snapshot.
- Webhook-managed: a controller verifies webhook deliveries and queues provisioning, kept separate from the worker sandbox that runs each session's executor. Handle `environment_connection` requests by starting or reconnecting the worker and release it when the session fails; configure worker and controller timeouts explicitly. Stopping compute on idle requires a policy coordinated with incoming work.
- Start the Sandbox before submitting input; the turn waits for connection (`agent.session.environment.connected`). Use `agent.session.turn.completed` to identify success; an idle session is not proof. A session retrieval right after an event can briefly return the prior status.
- Source: https://developers.openai.com/api/docs/guides/agents-api/environments/providers/daytona (fetched 2026-10). Cookbook: `examples/agents_api/sandboxes/daytona`.

## Related

- [Self-hosted Sandboxes](./self-hosted-sandboxes.md)
- [Sandbox Lifecycle](./sandbox-lifecycle.md)
- [Session Webhooks](./session-webhooks.md)
