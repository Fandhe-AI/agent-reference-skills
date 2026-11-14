# Databricks Sandbox

Databricks Sandbox as a self-hosted sandbox provider: run an agent's shell commands and work with files in your Databricks workspace. Your application manages the sandbox; its executor, `codex exec-server`, opens an outbound connection to OpenAI using the session's `environment.id` and `environment.remote_url`.

## Signature / Usage

Run the Cookbook example from the root of the OpenAI Cookbook repository with `uv` and Python 3.11 or later. Choose an unused sandbox ID because the example deletes the sandbox during cleanup.

```bash
uv run examples/agents_api/sandboxes/databricks/application_managed/main.py \
  --profile my-workspace --sandbox-id "openai-agent-$(date +%s)"
```

## Options / Props

| Name | Description |
|------|-------------|
| `--profile` | Authenticated Databricks profile for your workspace (`my-workspace` in the example) |
| `--sandbox-id` | Unused sandbox ID; the example deletes the sandbox during cleanup |
| `OPENAI_API_KEY` | Application key |
| `OPENAI_EXECUTOR_API_KEY` | Separate environment key from the same organization, project, and user or service account; only this key enters the sandbox, as `CODEX_API_KEY` |

## Notes

- Databricks Sandbox is in beta. Check that the workspace is in a supported region, then enable Databricks Sandbox on the workspace's Previews page.
- If your OpenAI organization enforces an IP allowlist, keep it up to date as sandbox outbound IPs change. For workspaces in the serverless compute firewall preview, follow the Databricks guidance for regional IP ranges.
- The example creates a self-hosted session, starts the executor in the sandbox, and asks the agent to write a greeting to a file. It reads the file back and prints `Verified the agent's file write.` on success, then stops the executor and deletes the session and sandbox.
- Cookbook: `examples/agents_api/sandboxes/databricks` (application-managed example).
- Source: https://developers.openai.com/api/docs/guides/agents-api/environments/providers/databricks (fetched 2026-11-14).

## Related

- [Self-hosted Sandboxes](./self-hosted-sandboxes.md)
- [Sandbox Lifecycle](./sandbox-lifecycle.md)
