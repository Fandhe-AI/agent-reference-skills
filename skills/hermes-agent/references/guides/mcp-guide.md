# Using MCP with Hermes Agent

Guide for integrating Model Context Protocol (MCP) servers with Hermes, including setup, filtering strategies, and common patterns.

## When to Use MCP

**Use MCP when:**
- A tool already exists in MCP form and you do not want to build a native Hermes tool
- Operating against local/remote systems through an RPC layer is needed
- Fine-grained per-server exposure control matters
- Connecting to internal APIs without modifying Hermes core

**Avoid MCP when:**
- Built-in tools already solve the problem effectively
- The server exposes dangerous functionality without adequate filtering capability
- A single narrow integration would be simpler via native tooling

## Signature / Usage

### Installation

If installed via standard script, MCP is included. To add separately:

```bash
cd ~/.hermes/hermes-agent
uv pip install -e ".[mcp]"
```

Ensure Node.js/`npx` (for JavaScript servers) and `uvx` (for Python servers) are available.

### Setup Progression

**Step 1 — Add a single safe server** (filesystem access to a bounded directory):

```yaml
mcp_servers:
  project_fs:
    command: "npx"
    args: ["-y", "@modelcontextprotocol/server-filesystem", "/home/user/my-project"]
```

**Step 2 — Verify loading:**
- Check the Hermes banner for MCP integration status
- Query available tools: "Tell me which MCP-backed tools are available right now"
- Use `/reload-mcp` after configuration changes

**Step 3 — Implement filtering:**

Whitelist approach (recommended for sensitive systems):

```yaml
mcp_servers:
  github:
    command: "npx"
    args: ["-y", "@modelcontextprotocol/server-github"]
    env:
      GITHUB_PERSONAL_ACCESS_TOKEN: "***"
    tools:
      include: [list_issues, create_issue, search_code]
```

Blacklist approach (for excluding specific actions):

```yaml
mcp_servers:
  stripe:
    url: "https://mcp.stripe.com"
    headers:
      Authorization: "Bearer ***"
    tools:
      exclude: [delete_customer, refund_payment]
```

Disable utility wrappers:

```yaml
mcp_servers:
  docs:
    url: "https://mcp.docs.example.com"
    tools:
      prompts: false
      resources: false
```

## Options / Props

### Filtering Keys

| Key | Scope | Description |
|-----|-------|-------------|
| `tools.include` | Server-native tools | Whitelist — only listed tools are exposed |
| `tools.exclude` | Server-native tools | Blacklist — listed tools are hidden |
| `tools.resources` | Hermes utility wrappers | Enable/disable `list_resources` and `read_resource` |
| `tools.prompts` | Hermes utility wrappers | Enable/disable `list_prompts` and `get_prompt` |
| `enabled` | Entire server | Set `false` to disable without removing config |
| `env` | Server process | Environment variables passed to the server process |
| `headers` | HTTP servers | HTTP headers for remote MCP endpoints |

## Notes

- Prefer whitelists (`tools.include`) for financial, customer-facing, or destructive operations
- Scope servers narrowly: restrict filesystem servers to specific directories, git servers to single repositories
- Disable unused utilities (`resources: false`, `prompts: false`) to reduce tool surface
- Execute `/reload-mcp` after modifying include/exclude lists, flags, or authentication
- Use `enabled: false` to preserve configuration without connecting

### Common Patterns

**Local project assistant:**

```yaml
mcp_servers:
  fs:
    command: "npx"
    args: ["-y", "@modelcontextprotocol/server-filesystem", "/home/user/project"]
  git:
    command: "uvx"
    args: ["mcp-server-git", "--repository", "/home/user/project"]
```

**GitHub triage:**

```yaml
mcp_servers:
  github:
    command: "npx"
    args: ["-y", "@modelcontextprotocol/server-github"]
    env:
      GITHUB_PERSONAL_ACCESS_TOKEN: "***"
    tools:
      include: [list_issues, create_issue, update_issue, search_code]
      prompts: false
      resources: false
```

**Internal API assistant:**

```yaml
mcp_servers:
  internal_api:
    url: "https://mcp.internal.example.com"
    headers:
      Authorization: "Bearer ***"
    tools:
      include: [list_customers, get_customer, list_invoices]
      resources: false
      prompts: false
```

### Troubleshooting

| Issue | Possible Causes |
|-------|-----------------|
| Server connects but tools missing | Filtered via `include`, excluded via `exclude`, or utility wrappers disabled |
| Server configured but won't load | `enabled: false`; missing runtime; unreachable endpoint; incorrect auth |
| Fewer tools than advertised | Expected — Hermes respects per-server policy and capabilities |

### Recommended First Servers

Good starting choices: filesystem, git, GitHub, documentation servers, narrow internal APIs.

Avoid initially: large enterprise systems with destructive actions and no filtering options.

## Related

- [MCP Feature Reference](../features/mcp.md)
- [Configuration](../configuration/configuration.md)
- [Security](../security/security.md)
