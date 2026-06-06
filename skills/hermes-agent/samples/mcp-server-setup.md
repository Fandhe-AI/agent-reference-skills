# MCP Server Setup

Connect external MCP servers (filesystem, GitHub, internal APIs) and control which tools are exposed.

```yaml
# ~/.hermes/config.yaml

mcp_servers:
  # Stdio server — local filesystem access
  project_fs:
    command: "npx"
    args: ["-y", "@modelcontextprotocol/server-filesystem", "/home/user/my-project"]

  # Stdio server — GitHub with tool whitelist
  github:
    command: "npx"
    args: ["-y", "@modelcontextprotocol/server-github"]
    env:
      GITHUB_PERSONAL_ACCESS_TOKEN: "ghp_..."
    tools:
      include: [list_issues, create_issue, search_code]
      prompts: false
      resources: false

  # HTTP server — remote API with token blacklist
  stripe:
    url: "https://mcp.stripe.com"
    headers:
      Authorization: "Bearer sk_..."
    tools:
      exclude: [delete_customer, refund_payment]
```

```bash
# Reload after config changes (inside a session)
/reload-mcp

# Expose Hermes itself as an MCP server
hermes mcp serve
```

## Notes

- MCP tools are prefixed to prevent name collisions: `mcp_<server_name>_<tool_name>`.
- Prefer whitelists (`tools.include`) for financial or destructive operations.
- Set `enabled: false` to preserve a config block without connecting.
- Ensure `npx` (JS servers) and `uvx` (Python servers) are available in `$PATH`.
