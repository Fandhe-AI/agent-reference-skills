<!-- source: https://platform.claude.com/docs/en/agents-and-tools/remote-mcp-servers / last verified: 2026-08-07 -->

# Remote MCP servers

Directory of third-party remote MCP servers that developers can connect to through the Anthropic MCP connector API. These servers are not owned, operated, or endorsed by Anthropic.

## Signature / Usage

```text
1. Review the documentation for the specific server you want to use.
2. Ensure you have the necessary authentication credentials.
3. Follow the server-specific connection instructions provided by each company.
```

## Notes

- The example-server table itself is rendered by a dynamic `<MCPServersTable>` component on the live page and is not reproducible as static markdown; consult the live page for the current list, or browse [github.com/modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers) for more servers.
- Once connected, remote MCP tools follow the same triggering behavior as any other tool (see mcp-connector.md).
- Users should only connect to remote MCP servers they trust and should review each server's security practices and terms before connecting.
- This is the Claude API's consumption-side directory. Claude Code's MCP server configuration is covered by `anthropic-claude-code-extend`.

## Related

- [mcp-connector.md](./mcp-connector.md)
