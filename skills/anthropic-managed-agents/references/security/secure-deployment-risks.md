<!-- source: https://platform.claude.com/docs/en/managed-agents/secure-deployment-risks / last verified: 2026-10-17 -->

# Security risks and sandbox boundaries

Why an agent's settings matter for security, and what the Managed Agents sandbox can and cannot do (beta header `managed-agents-2026-04-01`).

## Signature / Usage

Risk-to-control mapping (what can go wrong, example, controls):

```text
Untrusted input steers the agent        e.g. a ticket tells the agent to cancel every open order
  -> smallest tool set, untrusted input kept away from powerful tools, approvals for risky actions
Code in the sandbox can use a credential e.g. a tricked script sends the agent's key to an outside host
  -> credentials in vaults, limited networking, approvals for risky actions
An open network lets data out           e.g. a bash command posts a file to an outside host
  -> limited networking, the web_fetch domain list
Claude takes a step you did not expect  e.g. uses a reachable tool or credential to get past an obstacle
  -> the secure-deployment settings; an offline reviewer can flag it afterward
```

## Options / Props

Where each part runs and what limits it:

| Part | Where it runs | What limits it |
|------|---------------|----------------|
| Agent loop | Anthropic's servers | The tool set, permission policies, and budget you set |
| `bash` and file tools | The sandbox (cloud: each session gets its own isolated Linux container) | Environment networking, the tool set, and permission policies |
| `web_search` and `web_fetch` | Anthropic's servers | The tool's own domain list and, in a `limited` cloud environment, the environment's allowed hosts; `web_fetch` also opens only URLs that have already appeared in the session |
| Vault secret | Outside the sandbox. MCP credentials never enter it; for an environment variable credential, code sees a placeholder | MCP credential: the MCP server URL it is for. Environment variable credential: hosts the credential allows, its injection location, and the environment's allowed hosts |
| Session history | Anthropic's servers, until you delete the session | The API keys for the workspace, the Developer and Admin roles in the Claude Console, and session deletion |
| Custom tools | Your application | Your code |

## Notes

- Hidden instructions in content the agent reads can steer it (prompt injection). Claude is inherently resilient, but model behavior is not a security control; the settings limit the effect if an attempt succeeds.
- The settings lower the risk but do not remove it: do not put data in the sandbox that must never leave it (an agent can still put data it may read into its reply or tool output). Limit a key's permissions at the service that issued it. The settings do not secure your custom tools, your MCP servers, or your self-hosted infrastructure.
- The agent loop, session history, and vault secrets are kept outside the sandbox by design.
- In a cloud environment, sessions do not share filesystem state; a memory store attached to more than one session is shared between them.
- The limits do not replace each other; for example, limiting the environment's hosts does not stop the agent from using a credential on a host you allowed.

## Related

- [Secure your Managed Agents deployment](./secure-deployment.md)
- [Review and monitor agent sessions](./secure-deployment-monitoring.md)
- [Self-hosted sandboxes security model](../environments/self-hosted-sandboxes-security.md)
