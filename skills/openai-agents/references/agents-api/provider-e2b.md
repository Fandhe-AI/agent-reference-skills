# E2B

E2B as a self-hosted sandbox provider for the Agents API, with application-managed or webhook-managed provisioning.

## Signature / Usage

Application / provisioning side (outside the sandbox):

```bash
export E2B_API_KEY=...
export OPENAI_API_KEY=...
export OPENAI_EXECUTOR_API_KEY=...   # environment key
```

Inside the sandbox (executor process only):

```bash
CODEX_API_KEY="<environment key (value of OPENAI_EXECUTOR_API_KEY)>" codex exec-server \
  --remote "<session.environment.remote_url>" \
  --environment-id "<session.environment.id>"
```

## Notes

- Keep your application's `OPENAI_API_KEY` outside the sandbox; pass only the environment key as `CODEX_API_KEY`.
- Application-managed: (1) create a self-hosted session and save its environment ID; (2) create an isolated E2B sandbox with the session's working directory and install the Codex CLI; (3) start the executor with the environment ID and environment key; (4) send input and check the turn outcome; (5) delete the session and stop the E2B sandbox.
- Configure the sandbox lifetime separately from the timeout for the executor command; a command with no timeout does not keep an expired sandbox running.
- Webhook-managed: a controller verifies OpenAI webhooks and provisions a separate E2B worker per session. Persist the session-to-sandbox mapping; on a connection request resume a paused worker or replace a deleted one (pausing preserves files; replacement does not). Set running timeouts for the controller and workers and remove the OpenAI webhook when you stop using the controller.
- Source: https://developers.openai.com/api/docs/guides/agents-api/environments/providers/e2b (fetched 2026-10). Cookbook: `examples/agents_api/sandboxes/e2b`.

## Related

- [Self-hosted Sandboxes](./self-hosted-sandboxes.md)
- [Sandbox Lifecycle](./sandbox-lifecycle.md)
- [Session Webhooks](./session-webhooks.md)
