---
source: https://modelcontextprotocol.io/docs/2026-07-28/develop/build-with-agent-skills
---

# Build with Agent Skills

Use agent skills (portable instruction sets, agentskills.io) to guide AI coding assistants through MCP server design and implementation.

## Signature / Usage

A reference set is available as the `mcp-server-dev` plugin (github.com/anthropics/claude-plugins-official, `plugins/mcp-server-dev`). To install it in Claude Code:

```bash
/plugin marketplace add anthropics/claude-plugins-official
/plugin install mcp-server-dev
```

For other agents, clone the skill directories (`SKILL.md` plus `references/`) into the agent's skills location.

## Options / Props

| Skill | Purpose |
| --- | --- |
| `build-mcp-server` | Entry point. Interrogates the use case, picks a deployment model and tool-design pattern, routes to specialized skills |
| `build-mcp-app` | Adds interactive UI widgets (forms, pickers, dashboards) rendered inline in chat |
| `build-mcpb` | Packages a local stdio server with its runtime so users can install it without Node or Python |

Deployment paths recommended after discovery:

| Path | When |
| --- | --- |
| Remote Streamable HTTP | Default for anything wrapping a cloud API; scaffolds for Cloudflare Workers and portable Express/FastMCP |
| MCP apps | Interactive widgets when elicitation's flat-form constraints do not fit; hands off to `build-mcp-app` |
| MCP Bundles (MCPB) | Local server packaged with runtime as a `.mcpb` archive; hands off to `build-mcpb` |
| Local stdio | Prototyping, with an upgrade path to MCPB |

## Notes

- The discovery phase asks about: what it connects to, who will use it, action surface size, user interaction needs (plain text, elicitation, rich UI widgets), and upstream auth (API keys, OAuth 2.0, or none).
- These "agent skills" are coding-assistant guidance for building MCP servers, not a protocol feature. The SKILL.md format and plugin installation are covered by anthropic-claude-code-extend and anthropic-api-tools-mcp.

## Related

- [MCP Inspector](./inspector.md)
- [Client Best Practices](./client-best-practices.md)
