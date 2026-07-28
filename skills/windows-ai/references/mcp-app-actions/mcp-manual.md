# Manually register remote and local MCP servers

How to register and unregister MCP servers by interacting directly with the Windows On-Device Registry (ODR) using `odr.exe`. Required for remote servers; also enables fine-grained control for local servers.

## Signature / Usage

```powershell
# Register a remote MCP server
odr.exe mcp add --uri <url-to-your-server>

# Register a local server from an mcpb manifest
odr.exe mcp add <path-to-mcpb-manifest-json>

# List installed servers
odr.exe list

# Unregister a server
odr.exe mcp remove <mcp_server_name>
```

## Notes

- For typical local-server scenarios, prefer automatic registration via [package identity](./mcp-windows-identity.md) or an [MCP bundle](./mcp-mcpb.md) instead of manual registration.
- Requires Windows build 26220.7262 or higher.

## Related

- [Register an MCP server on Windows](./mcp-server-overview.md)
- [The ODR command-line tool](./odr-tool.md)
- [Register with package identity](./mcp-windows-identity.md)
- [Register with an MCP Bundle](./mcp-mcpb.md)
