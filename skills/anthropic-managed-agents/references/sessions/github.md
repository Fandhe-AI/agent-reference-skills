<!-- source: https://platform.claude.com/docs/en/managed-agents/github / last verified: 2026-08-07 -->

# Accessing GitHub

Mount a GitHub repository into the session sandbox and connect to the GitHub MCP server for cloning, reading, and creating pull requests. Repositories are cached, so later sessions using the same repository start faster.

## Signature / Usage

```python
session = client.beta.sessions.create(
    agent=agent.id,
    environment_id=environment.id,
    resources=[{
        "type": "github_repository",
        "url": "https://github.com/org/repo",
        "mount_path": "/workspace/repo",
        "authorization_token": "ghp_your_github_token",
    }],
)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `resources[].type` | string | `"github_repository"` |
| `resources[].url` | string | Repository URL |
| `resources[].mount_path` | string | Sandbox path to clone into |
| `resources[].authorization_token` | string | Authenticates the clone; not echoed in API responses |

## Notes

- Requires an agent declaring the GitHub MCP server (`mcp_servers: [{"type": "url", "name": "github", "url": "https://api.githubcopilot.com/mcp/"}]`) plus a matching `mcp_toolset` entry in `tools`; the MCP toolset defaults to `always_ask` permission policy.
- Use fine-grained personal access tokens with minimum scopes: `repo` for private clone/PR/issues, `public_repo` for public read/create issues.
- Repositories are attached for the session's lifetime; to change mounted repos, create a new session. Tokens can be rotated on a running session via `sessions.resources.update`.

## Related

- [Adding files](./files.md)
- [MCP connector](./mcp-connector.md)
