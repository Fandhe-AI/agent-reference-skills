# Self-hosted Sandboxes

Connect your own environment (laptop, container, or remote sandbox) for more control or trusted compute. OpenAI runs the agent harness; you run the executor `codex exec-server` inside the environment.

## Signature / Usage

Prepare the environment:

```bash
mkdir -p /workspace
npm install -g @openai/codex@alpha
```

Create a session (run in your application, outside the environment):

```python
from openai import OpenAI

client = OpenAI()

session = client.beta.agents.sessions.create(
    agent={
        "model": "gpt-6-astra",
        "instructions": "You are a helpful coding assistant. Write clean code and verify that it works.",
    },
    environment={"type": "self_hosted", "workspace_directory": "/workspace"},
)
print(session.to_json())
```

Start the executor inside the environment (with `CODEX_API_KEY` set to the environment key):

```bash
codex exec-server \
  --remote "<session.environment.remote_url>" \
  --environment-id "<session.environment.id>"
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `environment.type` | `self_hosted` | Your own environment |
| `workspace_directory` | string | Working directory (e.g. `/workspace`) |
| `capability_directories` | string[] | Skill / plugin roots |
| `agent.session.environment.pending` | event | Waiting for the executor to connect |
| `agent.session.environment.connected` | event | Environment ready |
| `agent.session.environment.failed` | event | Connection failed; check environment error and executor logs |

Sandbox providers (each has a setup guide in this category): Modal, Cloudflare, Vercel, Daytona, Blaxel, E2B, Runloop, DigitalOcean, AWS Lambda MicroVMs, Oracle Cloud Infrastructure (OCI).

## Notes

- The executor registers with the API using an environment ID and a restricted API key, then connects over WebSocket to receive commands and return results. All connections are outbound; the executor reconnects if dropped. It runs shell commands, reads/writes files, and uses local MCP servers at the harness's request.
- Isolate environments by user or workload; agents sharing an environment can access the same files and credentials.
- Network: allow outbound `https://api.openai.com` (registration) and `wss://codex-cloud-environments.chatgpt.com` (commands and results).
- Authentication: `OPENAI_API_KEY` for the application with `api.agents.read`, `api.agents.write`, `api.responses.write` (plus `api.vaults.read` / `api.vaults.write` for vaults). Create a separate environment key on the Agents tab of the platform dashboard (same organization, project, and user/service account as the session; every other permission **None**); set it as `OPENAI_EXECUTOR_API_KEY` in your application and pass it into the sandbox as `CODEX_API_KEY`. Agent-generated code can read the environment key, which only permits connecting environments. Keep `OPENAI_API_KEY` outside the sandbox.
- Pass `session.environment.id` and `session.environment.remote_url` to the executor; use the remote URL unchanged, including on reconnect. Each session has its own environment ID and needs its own executor. The image, `workspace_directory`, and `capability_directories` can be reused; API environment templates apply only to OpenAI-hosted environments.
- The agent needs both a connected environment and user input to start work. Keep the event stream open.
- Source: https://developers.openai.com/api/docs/guides/agents-api/environments/self-hosted (fetched 2026-10).

## Related

- [Sandbox Lifecycle](./sandbox-lifecycle.md)
- [Session Webhooks](./session-webhooks.md)
- [Sandbox Security](./sandbox-security.md)
- [OpenAI-hosted Sandboxes](./openai-hosted-sandboxes.md)
- [Modal](./provider-modal.md)
