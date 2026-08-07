<!-- source: https://platform.claude.com/docs/en/managed-agents/environments / last verified: 2026-08-07 -->

# Cloud environment setup

Environments define the sandbox configuration where an agent runs. Create one, then reference its ID from any session; each session gets its own isolated sandbox (a fresh Linux container) even when environments are shared. This page covers `type: cloud`; for your own infrastructure see self-hosted sandboxes.

## Signature / Usage

```python
environment = client.beta.environments.create(
    name="python-dev",
    config={"type": "cloud", "networking": {"type": "unrestricted"}},
)
session = client.beta.sessions.create(agent=agent.id, environment_id=environment.id)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `config.packages.{apt,cargo,gem,go,npm,pip}` | array | Packages pre-installed before the agent starts, cached across sessions sharing the environment; installed alphabetically by manager; pin versions optionally |
| `config.networking.type` | string | `unrestricted` (default; full outbound access minus a safety blocklist) or `limited` |
| `config.networking.allowed_hosts` | array | `limited` mode only: bare hostnames or wildcard patterns (`*.example.com`), no scheme/port/path |
| `config.networking.allow_mcp_servers` | boolean | `limited` mode: allow outbound access to agent-configured MCP endpoints beyond `allowed_hosts` (default `false`) |
| `config.networking.allow_package_managers` | boolean | `limited` mode: allow outbound access to public package registries beyond `allowed_hosts` (default `false`) |

## Notes

- Environments persist until archived/deleted and are not versioned — keep your own record of config changes to know which config a session used.
- For production, use `limited` networking with an explicit `allowed_hosts` list (least privilege).
- API-created environments default to `unrestricted` networking; sandboxes provisioned through Claude Studio default to `limited`.

## Related

- [Cloud sandbox reference](./cloud-sandboxes-reference.md)
- [Self-hosted sandboxes](./self-hosted-sandboxes.md)
