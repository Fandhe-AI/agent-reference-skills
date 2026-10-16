# Cloudflare

Cloudflare Containers as a self-hosted sandbox provider using webhook-managed provisioning with Cloudflare's reference Worker. A session-specific Container runs `codex exec-server` and connects outbound to OpenAI.

## Signature / Usage

Generate the cleanup secret, check Worker health, and clean up a session's sandbox:

```bash
openssl rand -hex 32

curl --fail-with-body "$WORKER_URL/health"

curl --fail-with-body \
  --request DELETE \
  --header "Authorization: Bearer $EXECUTOR_CLIENT_SECRET" \
  "$WORKER_URL/executors/$SESSION_ID"
```

## Options / Props

Worker deployment variables:

| Variable | Value |
|----------|-------|
| `OPENAI_API_KEY` | Key used by the Worker to retrieve session state |
| `OPENAI_EXECUTOR_API_KEY` | Environment key passed to the executor as `CODEX_API_KEY` |
| `OPENAI_AGENT_ID` | Agent ID served by this Worker |
| `OPENAI_WEBHOOK_SECRET` | `pending-webhook-registration` for the first deployment |
| `EXECUTOR_CLIENT_SECRET` | Secret generated for cleanup |

Webhook events to enable for `$WORKER_URL/webhook`: `agent.session.created`, `agent.session.action_required`, `agent.session.in_progress`, `agent.session.idle`, `agent.session.failed`.

## Notes

- Flow: your application creates an Agents API session and sends input; OpenAI sends session webhooks to a Worker in your Cloudflare account; the Worker starts or reconnects the Container.
- Requires a Cloudflare account with Containers access. Create an agent (saved agent) and save its ID as `OPENAI_AGENT_ID`; use the same ID in your application and the Worker. Reference Worker: `cloudflare/sandbox-sdk` `openai/agents-api`.
- After deploying, save the Worker URL as `WORKER_URL`, register `$WORKER_URL/webhook`, replace `OPENAI_WEBHOOK_SECRET` with the returned signing secret, and redeploy. The health response should contain `"configured": true` and `"webhook_configured": true`.
- An `environment_connection` required action is the signal to reconnect an offline executor; an idle event alone is not a safe shutdown signal.
- New input to an offline executor requests an environment connection and waits for the Worker. Reconnection does not restore files from a previous Container.
- Cloudflare's basic Worker application (`openai/agents-api/basic`) uses the `@openai/agents-api` TypeScript SDK; its `POST /demo` runs the workflow and also uses webhook-managed provisioning.
- Cleanup: call the Worker's authenticated cleanup endpoint and delete the Agents API session separately (deletion emits no webhook). Retrieve needed files first.
- Advanced: application-managed provisioning via the Cloudflare Sandbox SDK; use one provisioning controller per session.
- Source: https://developers.openai.com/api/docs/guides/agents-api/environments/providers/cloudflare (fetched 2026-10).

## Related

- [Sandbox Lifecycle](./sandbox-lifecycle.md)
- [Session Webhooks](./session-webhooks.md)
- [Self-hosted Sandboxes](./self-hosted-sandboxes.md)
