---
source: https://opencode.ai/docs/mcp-servers/#names
---

# MCP servers: Names, Permissions, Resources

How MCP tools and prompts are named, how Code Mode and permissions apply, and how resources are read.

## Signature / Usage

### Names

OpenCode names a tool `<server>_<tool>`. It replaces characters other than letters, numbers, `_`, and `-` with `_`:

```text
server: context 7
tool:   resolve.library/id
name:   context_7_resolve_library_id
```

MCP prompts become commands named `<server>:<prompt>` with the same normalization. For example:

```text
/context_7:find_docs
```

Command text fills the prompt's arguments in order. Separate them with spaces and quote values that contain spaces:

```text
/context_7:find_docs react "server components"
```

Choose short server names that remain unique after normalization. Under the default Code Mode, tools are grouped by the normalized server name:

```text
tools.context_7.resolve_library_id(...)
```

### Permissions

Code Mode is the default. Set `codemode` to `false` when a server's tools must stay on the provider's native tool list:

```jsonc
{
  "mcp": {
    "servers": {
      "context7": {
        "type": "remote",
        "url": "https://mcp.context7.com/mcp",
        "codemode": false,
      },
    },
  },
}
```

Use permission actions to hide or deny tools without disconnecting their server. Match the normalized `<server>_<tool>` name:

```jsonc
{
  "permissions": [
    {
      "action": "context7_*",
      "resource": "*",
      "effect": "deny",
    },
  ],
}
```

### Resources

Agents read MCP resources through two built-in tools, `list_mcp_resources` and `read_mcp_resource`. Control them with the permission actions below. For example, allow every read from the `docs` server:

```jsonc
{
  "permissions": [
    {
      "action": "opencode_read_mcp_resource",
      "resource": "docs:*",
      "effect": "allow",
    },
  ],
}
```

## Options / Props

| Action | Resource |
| --- | --- |
| `opencode_list_mcp_resources` | The server name. |
| `opencode_read_mcp_resource` | `<server>:<uri>` |

## Notes

- OpenCode permissions and commands are distinct from Claude Code (anthropic-claude-code-extend / anthropic-claude-code-admin).
- The MCP protocol spec is `mcp-spec`.

## Related

- [tools-interaction-automation.md](./tools-interaction-automation.md)
- [mcp-overview.md](./mcp-overview.md)
