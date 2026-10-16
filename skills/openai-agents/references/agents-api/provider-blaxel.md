# Blaxel

Blaxel as a self-hosted sandbox provider for the Agents API, using application-managed provisioning (your application starts and stops sandboxes).

## Signature / Usage

Application / provisioning side (outside the sandbox):

```bash
export BL_API_KEY=...
export BL_WORKSPACE=...
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
- Flow: create a self-hosted session and save its environment ID; use the Blaxel SDK or API to create an isolated sandbox with the configured working directory; install the Codex CLI; start the executor with the environment ID and environment key; send input and stream results; delete the session and stop the provider sandbox separately.
- The Blaxel Node image uses Alpine Linux, so install `ripgrep` with `apk`. Pass the environment key as `CODEX_API_KEY` only to the executor process. Set `keep_alive=True` to prevent scale-to-zero while the executor runs. Use bounded setup, executor, and sandbox timeouts. For regular use, build a Blaxel image with Codex and `ripgrep` preinstalled.
- Choose the sandbox region in your provisioning code; use `us-was-1` for the Agent Drive persistence option.
- Start the sandbox before submitting input; the turn waits for the environment to connect (`agent.session.environment.connected`). Use `agent.session.turn.completed` to identify success; a failed or cancelled turn can also be followed by `agent.session.idle`.
- Optional persistence: Blaxel Agent Drive preserves files across sandboxes and sessions (mount the same drive; requires `us-was-1`; does not transfer conversation history or session state).
- A webhook-managed mode is described in the Sandbox Lifecycle guide; Cookbook examples exist for both modes (`examples/agents_api/sandboxes/blaxel`).
- Source: https://developers.openai.com/api/docs/guides/agents-api/environments/providers/blaxel (fetched 2026-10).

## Related

- [Self-hosted Sandboxes](./self-hosted-sandboxes.md)
- [Sandbox Lifecycle](./sandbox-lifecycle.md)
- [Sandbox Security](./sandbox-security.md)
