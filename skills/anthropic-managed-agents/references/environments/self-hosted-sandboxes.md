<!-- source: https://platform.claude.com/docs/en/managed-agents/self-hosted-sandboxes / last verified: 2026-10-17 -->

# Self-hosted sandboxes

Overview and quickstart. Run Managed Agents sessions with tool execution, files, and network egress kept in your own infrastructure. Anthropic keeps orchestration on its side (where Claude runs); tool inputs/outputs still flow to the control plane, but the filesystem, processes, and network reach stay under your control.

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
- The worker downloads the agent's skills and the session's memory stores when it claims a work item. Anthropic stores skills and memory stores; your sandbox holds a copy for the session. Self-hosted sandboxes support every Claude model available in Managed Agents (the model is configured on the agent, not the environment).
- Quickstart prerequisites: an agent, a Linux host with `/bin/bash` at that exact path (the worker needs only outbound HTTPS), and a Claude API key kept on your own machine and off the worker host. On Claude Platform on AWS the worker authenticates with AWS IAM (SigV4) or an API key generated in the AWS Console, not an environment key (Console-generated environment keys don't work with that endpoint).
- Session resources: self-hosted sandboxes support `memory_store` resources only. A session on a self-hosted environment that includes a `file` or `github_repository` resource is rejected with a 400 error (`resources` are not supported with self-hosted environments). Deployments that target a self-hosted environment follow the same rule. To give a session input files, stage them yourself in the working directory (see the workers page).
- Custom tools and MCP servers reachable only from your network can be served by the worker itself (SDK worker required; the `ant` CLI worker cannot register custom tool implementations) — see the custom tools page.
- `ant beta:environments:work stats --environment-id ...` reports `workers_polling`, `depth`, `pending`; `work.stop` gracefully stops a session's work item (`force: true` marks it stopped immediately without waiting for worker confirmation). See the operations page.
- Self-hosted sandboxes and MCP tunnels are independent: self-hosting controls where the agent's code executes, while MCP tunnels control how Anthropic reaches MCP servers in your network. A session in Anthropic's cloud sandboxes can reach private MCP servers through a tunnel; a self-hosted session can use either tunneled or public MCP servers. To skip the tunnel, wrap the MCP server as custom tools that your worker serves.
- Platform guides (external sites, names only): AWS Lambda MicroVMs, Blaxel, Cloudflare, Daytona, E2B, Fly.io, GKE Agent Sandbox, Modal, Namespace, Superserve, Vercel.
- See the security model page for the shared-responsibility boundary (sandbox hardening, egress controls, key rotation are the caller's responsibility).

## Related

- [Security model](./self-hosted-sandboxes-security.md)
- [Cloud environment setup](./environments.md)
- [Choosing an environment](./choosing-an-environment.md)
- [Deploy workers](./self-hosted-sandboxes-workers.md)
- [Custom tools and MCP servers](./self-hosted-sandboxes-custom-tools.md)
- [Memory stores on self-hosted](./self-hosted-sandboxes-memory.md)
- [Monitor and troubleshoot](./self-hosted-sandboxes-operations.md)
- [Worker reference](./self-hosted-sandboxes-reference.md)
