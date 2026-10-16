# Runloop

Runloop Devboxes as a self-hosted sandbox provider using application-managed provisioning: your application starts the Devbox, connects its executor, and shuts it down.

## Signature / Usage

Application / provisioning side (outside the Devbox):

```bash
export RUNLOOP_API_KEY=...
export OPENAI_API_KEY=...
export OPENAI_EXECUTOR_API_KEY=...   # environment key
```

Inside the Devbox (executor process only):

```bash
CODEX_API_KEY="<environment key (value of OPENAI_EXECUTOR_API_KEY)>" codex exec-server \
  --remote "<session.environment.remote_url>" \
  --environment-id "<session.environment.id>"
```

## Notes

- Keep your application's `OPENAI_API_KEY` outside the Devbox; pass only the environment key as `CODEX_API_KEY`.
- Use the Runloop SDK or API to manage a Devbox and HTTP requests to manage Agents API sessions.
- Flow: (1) create a self-hosted session and save its environment ID; (2) create a Devbox with the session's working directory and install the Codex CLI; (3) start the executor in the background; (4) send input and inspect the result (file task: create `brief.txt` in the workspace and ask for a migration plan in `plan.md`); (5) check the turn completed, retrieve files, shut down the Devbox, and delete the session.
- Use bounded setup and execution timeouts plus a Devbox lifetime limit as a fallback. Keep the session and Devbox alive for follow-up turns. Use one provisioning owner per session; do not attach a provisioning webhook handler to sessions your application manages directly.
- Source: https://developers.openai.com/api/docs/guides/agents-api/environments/providers/runloop (fetched 2026-10). Cookbook: `examples/agents_api/sandboxes/runloop/application_managed`.

## Related

- [Self-hosted Sandboxes](./self-hosted-sandboxes.md)
- [Sandbox Lifecycle](./sandbox-lifecycle.md)
