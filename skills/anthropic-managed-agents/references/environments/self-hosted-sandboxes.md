<!-- source: https://platform.claude.com/docs/en/managed-agents/self-hosted-sandboxes / last verified: 2026-08-07 -->

# Self-hosted sandboxes

Run Managed Agents sessions with tool execution, files, and network egress kept in your own infrastructure. Anthropic keeps orchestration on its side (where Claude runs); tool inputs/outputs still flow to the control plane, but the filesystem, processes, and network reach stay under your control.

## Signature / Usage

```bash
export ANTHROPIC_ENVIRONMENT_KEY="sk-ant-oat01-..."
export ANTHROPIC_ENVIRONMENT_ID="env_..."
ant beta:worker poll --workdir "/workspace"
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `config.type` | string | `"self_hosted"` on `environments.create` |
| `ANTHROPIC_ENVIRONMENT_KEY` / `ANTHROPIC_ENVIRONMENT_ID` | env var | Authenticate the worker to its work queue (Console-generated key) |
| `EnvironmentWorker` | SDK helper | Out-of-the-box worker: `.run()` (indefinite) or `.handle_item()` (single claimed work item) |
| `work.poller()` | SDK helper | Polls the work queue yourself, e.g. to launch a per-session sandbox; options: `drain`, `block_ms`, `reclaim_older_than_ms`, `auto_stop` |
| `sessions.events.tool_runner()` | SDK helper | Runs tool calls for a single already-claimed session |

## Notes

- A `self_hosted` environment is a work queue; your worker claims items, downloads the agent's skills, runs tool calls in the working directory, and posts results back. `/workspace` is the system default working directory; skills download to `<workdir>/skills/<name>/`.
- Sessions on self-hosted environments cannot include `resources` (files/GitHub/memory stores are rejected) — pass file references via session `metadata` and stage them yourself in the working directory.
- Custom tools and MCP servers reachable only from your network can be served by the worker itself (SDK worker required; the `ant` CLI worker cannot register custom tool implementations) — see "Wrap an MCP server as custom tools" in the source page.
- `ant beta:environments:work stats --environment-id ...` reports `workers_polling`, `depth`, `pending`; `work.stop` gracefully stops a session's work item (`force: true` marks it stopped immediately without waiting for worker confirmation).
- See the security model page for the shared-responsibility boundary (sandbox hardening, egress controls, key rotation are the caller's responsibility).

## Related

- [Security model](./self-hosted-sandboxes-security.md)
- [Cloud environment setup](./environments.md)
