<!-- source: https://platform.claude.com/docs/en/managed-agents/github / last verified: 2026-10-17 -->

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
        "authorization_token": GITHUB_TOKEN,  # a GitHub token read from your environment
    }],
)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `resources[].type` | string | `"github_repository"` |
| `resources[].url` | string | Required. HTTPS URL in the form `https://github.com/<owner>/<repo>`, without a `.git` suffix; other forms, including SSH URLs, are rejected with an `invalid_request_error` |
| `resources[].mount_path` | string | Optional. Directory under `/workspace` to clone into; defaults to `/workspace/<repo-name>` |
| `resources[].checkout` | object | Optional. A branch (`{"type": "branch", "name": "main"}`) or commit (`{"type": "commit", "sha": "..."}`) to check out; defaults to the repository's default branch |
| `resources[].authorization_token` | string | Required. Authenticates the clone; not echoed in API responses |

## Notes

- Requires an agent declaring the GitHub MCP server (`mcp_servers: [{"type": "url", "name": "github", "url": "https://api.githubcopilot.com/mcp/"}]`) plus a matching `mcp_toolset` entry in `tools`; the MCP toolset defaults to `always_ask` permission policy.
- With a `limited` environment, session creation fails with a 400 error when the agent declares an MCP server (here the GitHub MCP host) that is not in the environment's `allowed_hosts`. Setting `allow_mcp_servers` to `true` in the environment's networking turns this check off.
- Mounting a repository also loads any skills stored in its root `.claude/skills` directory. Skills are discovered once per session, from the repository state checked out at session start (see the Skills page).
- Use fine-grained personal access tokens with minimum scopes: `repo` for private clone/PR/issues, `public_repo` for public read/create issues.
- Repositories are attached for the session's lifetime; to change mounted repos, create a new session. Tokens can be rotated on a running session via `sessions.resources.update`.

## Related

- [Adding files](./files.md)
- [MCP connector](./mcp-connector.md)
- [Skills](./skills.md)
