<!-- source: https://platform.claude.com/docs/en/managed-agents/self-hosted-sandboxes-security / last verified: 2026-10-17 -->

# Security model

Shared responsibility model for self-hosted sandbox environments. Anthropic secures the control plane (session/work queue integrity, multitenant isolation, agent-context minimization); everything below the sandbox boundary is the caller's responsibility.

## Signature / Usage

```bash
# Store the key in a secrets manager, not in environment files or images.
# Rotate immediately on suspected exposure; revocation is validated on the
# worker's next request.
export ANTHROPIC_ENVIRONMENT_KEY="sk-ant-oat01-..."
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Sandbox image quality | responsibility | Anthropic does not inspect your image; drop unnecessary Linux capabilities, run as non-root, use a read-only root filesystem |
| Network egress controls | responsibility | Your VPC/firewall rules determine sandbox reach; restrict outbound traffic to only required endpoints |
| Service key storage/rotation | responsibility | `ANTHROPIC_ENVIRONMENT_KEY` authorizes queue polling and result submission; store in a secrets manager and rotate immediately on suspected exposure (revocation takes effect on the worker's next call) |
| Isolating untrusted workloads | responsibility | The key is scoped to one environment's queue; use a separate workspace/environment per trust boundary for untrusted code |
| Tool-execution blast radius | responsibility | Tools run with your process's permissions; apply least privilege and mount only required directories |
| Per-session credentials | responsibility | Each claimed work item can carry a per-session `secret`, used in place of the environment service key. Memory store endpoints require the `secret` and reject the environment key. Pass it only into the sandbox serving that session, keep it out of images and shared volumes, never log it |
| Log retention / session content | responsibility | Conversation content and tool outputs pass through your worker; you own retention/redaction/deletion policy |
| Memory store contents | responsibility | Memory stores stay hosted by Anthropic (including version history). When a session attaches one, the worker keeps a working copy under `/mnt/memory/` for the session's duration and syncs changes back, then deletes it at session end; a worker that exits without running teardown leaves it behind. Cleanup of leftover copies, permissions on that path, and isolation between sessions sharing a filesystem are yours |
| Read-only memory stores | responsibility | A store attached with `read_only` access is protected from upload, not from local modification: the worker's `write` / `edit` tools refuse to write under its directory, nothing syncs back, and the memory store endpoints reject writes made with the session's `secret`. Other processes in the sandbox (the `bash` tool, custom tools, MCP servers you serve) can still change the local copy, and later tool calls read it. To prevent even that, disable `bash` for the agent and give it no custom tool that writes to the filesystem |

## Notes

- Anthropic cannot know your key leaked, cannot verify your worker build (supply-chain compromise is undetectable from the control plane), cannot isolate tools inside your sandbox, and cannot enforce your data retention once content reaches your worker.

## Related

- [Self-hosted sandboxes](./self-hosted-sandboxes.md)
- [Memory stores on self-hosted](./self-hosted-sandboxes-memory.md)
- [Secure deployment](../security/secure-deployment.md)
- [Secure deployment risks](../security/secure-deployment-risks.md)
- [Secure deployment monitoring](../security/secure-deployment-monitoring.md)
