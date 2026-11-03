---
source: https://developers.cloudflare.com/agents/model-context-protocol/cloudflare/servers-for-cloudflare/community-mcp-server/
---

# Cloudflare Community MCP Server

Use the Discourse MCP server (`@discourse/mcp`) to search topics, read posts, and filter content on the Cloudflare Community forum.

## Signature / Usage

```bash
npx @discourse/mcp@latest
```

Claude Desktop (`claude_desktop_config.json`) or Cursor (`.cursor/mcp.json`):

```json
{
  "mcpServers": {
    "discourse": {
      "command": "npx",
      "args": ["-y", "@discourse/mcp@latest"]
    }
  }
}
```

OpenCode (`~/.config/opencode/opencode.jsonc`, inside the `"mcp"` block):

Adapted (not in the official docs): the source shows only the `"discourse"` entry, which is not valid JSON on its own; it is wrapped in the enclosing `"mcp"` object. See Notes.

```jsonc
{
  "mcp": {
    "discourse": {
      "type": "local",
      "command": ["npx", "-y", "@discourse/mcp@latest"],
      "enabled": true
    }
  }
}
```

After configuring, call `discourse_select_site` with `https://community.cloudflare.com`.

### Available tools

| Tool | Description |
|------|-------------|
| `discourse_select_site` | Connect to community.cloudflare.com |
| `discourse_search` | Full-text search across topics and posts |
| `discourse_filter_topics` | Filter by category, tags, status, dates |
| `discourse_read_topic` | Read a topic's posts and metadata |
| `discourse_read_post` | Read a specific post |
| `discourse_get_user` | Look up a user's profile |
| `discourse_list_user_posts` | List posts by a user |

## Notes

- Adapted from the official docs: the OpenCode snippet is a bare `"discourse": { ... }` member meant to be pasted inside the `"mcp"` block; it is shown inside that block so the fence is a complete JSON object.
- No API key is needed to read public data; an API key is required only for write operations (posting, moderation). If you set one, keep it in an environment variable or secret store, never in a committed config file.
- This is a local (stdio) MCP server run with `npx`, powered by the official Discourse MCP package. It is not a Workers-hosted server.
- Machine-readable discovery on community.cloudflare.com: `/.well-known/mcp.json` (MCP Server Card), `/llms.txt`, `/.well-known/agent.json` (A2A Agent Card).
- Distance lines: the protocol spec is mcp-spec; Claude Code MCP setup is anthropic-claude-code-extend; Claude API MCP connector is anthropic-api-tools-mcp; OpenAI Agents SDK MCP is openai-agents; ChatGPT MCP apps are openai-apps-sdk.

## Related

- [Cloudflare's own MCP servers](./servers-for-cloudflare.md)
