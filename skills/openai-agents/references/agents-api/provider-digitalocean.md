# DigitalOcean

DigitalOcean Managed Agents Runtime Services (M.A.R.S.) starts a Firecracker microVM using the `codex-agentapi` image, which includes Codex and starts the executor that connects outbound to the Agents API. DigitalOcean Managed Agents is in public preview.

## Signature / Usage

`environment.yaml` for the CLI flow:

```yaml
name: openai-codex-session
agent: codex-agentapi
config:
  agent:
    model: gpt-6.1-sol
    instructions: Work from the files in /workspace.
  environment:
    type: self_hosted
    workspace_directory: /workspace
egress:
  - api.openai.com
  - codex-cloud-environments.chatgpt.com
env:
  CODEX_ENVIRONMENT_ID: ${ENV_ID}
secrets:
  CODEX_API_KEY: ${OPENAI_EXECUTOR_API_KEY}
```

```bash
doctl auth init
doctl harness-runtime create --spec environment.yaml
doctl harness-runtime launch openai-codex-session
doctl harness-runtime remove openai-codex-session
```

## Options / Props

| Name | Description |
|------|-------------|
| `OPENAI_API_KEY` | Application or CLI requests |
| `OPENAI_EXECUTOR_API_KEY` | Environment key; pass only this into the sandbox as `CODEX_API_KEY` |
| `DIGITALOCEAN_TOKEN` | Webhook controllers and Python applications |
| `OPENAI_AGENT_ID` | Stored agent ID used by the webhook controller |

## Notes

- Prerequisites: sandbox-enabled DigitalOcean account with access to `codex-agentapi`; OpenAI project with Agents API access; for Python/controllers install PyDo 0.41.0 or later with async support (`pydo[aio]`); `doctl` 1.170.0 or later (includes `harness-runtime`) for the CLI flow.
- Webhook-managed: create a stored agent (`OPENAI_AGENT_ID`), deploy an HTTPS controller in DigitalOcean App Platform, register `/webhook` for `agent.session.action_required` and `agent.session.failed`, store the signing secret as `OPENAI_WEBHOOK_SECRET`. On an `environment_connection` request the controller verifies the signature, retrieves the session, checks its agent ID and required actions, looks up `mars-{session_id}` in DigitalOcean, and resumes a paused sandbox or creates one. On `agent.session.failed` retrieve again and delete the sandbox only if status is still `failed`. Serialize provisioning per session. Remove the webhook registration before deleting the controller.
- CLI flow: the CLI creates both resources and provisions the sandbox directly without a webhook controller; the `config` block is the OpenAI create-session request, `${ENV_ID}` is filled from the response. The create command waits up to 300 seconds for readiness by default; Ctrl+D detaches without deleting. Keep resolved manifests out of logs and source control.
- Application-managed: create the OpenAI self-hosted session, then call PyDo `client.agents.create_session` with `params.openai_session_id`, `body.manifest` (a sandbox-only `sandbox.yaml`: `agent`, `egress`, `env`, `secrets`), and `body.variables` (`ENV_ID`, `OPENAI_EXECUTOR_API_KEY`); retrieve files with `workspace_download` (relative path). Do not attach a provisioning webhook handler to sessions your application or CLI manages directly.
- Cleanup: delete the OpenAI session and destroy the DigitalOcean sandbox (`client.agents.destroy_session` or `doctl harness-runtime remove`); session deletion emits no webhook.
- Source: https://developers.openai.com/api/docs/guides/agents-api/environments/providers/digitalocean (fetched 2026-10). Cookbook: `examples/agents_api/sandboxes/digitalocean`.

## Related

- [Self-hosted Sandboxes](./self-hosted-sandboxes.md)
- [Sandbox Lifecycle](./sandbox-lifecycle.md)
- [Session Webhooks](./session-webhooks.md)
