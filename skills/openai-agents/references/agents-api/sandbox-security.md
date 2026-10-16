# Sandbox Security

Agent-generated code can access the files, credentials, and network available to its environment. Isolate, restrict, separate credentials, and broker third-party access.

## Signature / Usage

Permissions for the application key and the executor key:

```text
Application key (OPENAI_API_KEY):  api.agents.read, api.agents.write, api.responses.write
                                   (+ api.vaults.read, api.vaults.write to manage vaults)
Executor key (CODEX_API_KEY):      environment key; only permits connecting environments
```

## Notes

- Isolate workloads: run in isolated compute such as virtual machines; use separate environments for users or workloads that must not share data; create a dedicated OpenAI project for your application or workload.
- Restrict network: allow outbound traffic only to approved endpoints, including the executor's required hosts. Executor MCPs connect from your environment (allow the servers they need); remote MCPs connect from OpenAI's service (endpoints must be reachable from it).
- Separate credentials: agent-generated code can read the environment key; keep the application API key outside the environment. Do not embed keys in images, source code, or logs; rotate or revoke when needed.
- Broker third-party access: keep third-party credentials outside the environment. For OpenAI-hosted sandboxes use vault secrets as environment variables (sandbox code uses a placeholder; a network proxy supplies the real secret for approved hosts). For self-hosted environments configure a trusted proxy or server (infrastructure you provide). For function tools keep credentials in the application handling the call and return only the result.
- Store long-lived credentials in a secrets manager; injecting a stored secret into the environment still exposes it to agent-generated code. Rotate regularly and revoke on suspected exposure.
- Source: https://developers.openai.com/api/docs/guides/agents-api/environments/security (fetched 2026-10).

## Related

- [Self-hosted Sandboxes](./self-hosted-sandboxes.md)
- [Vaults](./vaults.md)
- [MCP Connections](./mcp-connections.md)
- [Functions](./functions.md)
