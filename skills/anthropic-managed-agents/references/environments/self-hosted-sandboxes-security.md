<!-- source: https://platform.claude.com/docs/en/managed-agents/self-hosted-sandboxes-security / last verified: 2026-08-07 -->

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
| Log retention / session content | responsibility | Conversation content and tool outputs pass through your worker; you own retention/redaction/deletion policy |

## Notes

- Anthropic cannot know your key leaked, cannot verify your worker build (supply-chain compromise is undetectable from the control plane), cannot isolate tools inside your sandbox, and cannot enforce your data retention once content reaches your worker.

## Related

- [Self-hosted sandboxes](./self-hosted-sandboxes.md)
