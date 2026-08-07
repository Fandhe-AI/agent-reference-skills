<!-- source: https://platform.claude.com/docs/en/managed-agents/self-hosted-sandboxes / last verified: 2026-08-07 -->

# Run a Self-Hosted Sandbox Worker

Authenticate a worker to a `self_hosted` environment's work queue and start polling for session work items with the `ant` CLI, then confirm from a separate shell that it's connected.

```bash
export ANTHROPIC_ENVIRONMENT_KEY="sk-ant-oat01-..."
export ANTHROPIC_ENVIRONMENT_ID="env_..."

ant beta:worker poll --workdir "/workspace"
```

From a separate shell, with `ANTHROPIC_API_KEY` set to your Claude API key (not the environment key), confirm `workers_polling` is at least 1:

```bash
ant beta:environments:work stats --environment-id "$ANTHROPIC_ENVIRONMENT_ID"
```

## Notes

- A `self_hosted` environment (`config.type: "self_hosted"` on `environments.create`) is a work queue: your worker claims items, downloads the agent's skills to `<workdir>/skills/<name>/`, runs tool calls in the working directory, and posts results back. `/workspace` is the system default working directory.
- Sessions on self-hosted environments cannot include `resources` (files/GitHub/memory stores are rejected) — pass file references via session `metadata` and stage them yourself in the working directory.
- Custom tools and MCP servers reachable only from your network can be served by the worker itself, but this requires the SDK's `EnvironmentWorker` / `work.poller()` / `sessions.events.tool_runner()` helpers — the `ant` CLI worker cannot register custom tool implementations.
- If `workers_polling` stays at 0, confirm `ANTHROPIC_ENVIRONMENT_KEY` and `ANTHROPIC_ENVIRONMENT_ID` are set correctly on the worker host.
- Example from the Claude API (platform.claude.com) `managed-agents/self-hosted-sandboxes` page.
