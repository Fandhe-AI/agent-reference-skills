# Test MCP servers on Windows

Ways to validate registration and functionality of an MCP server implementation on Windows.

## Signature / Usage

```powershell
# Test server functionality directly (requires NodeJS)
npx @modelcontextprotocol/inspector <path to your .exe>

# Verify Windows registration
odr.exe list
```

## Notes

- The MCP inspector is a browser-based tool for manually exercising a server's functionality; install NodeJS first with `winget install OpenJS.NodeJS`.
- If the server appears in the `odr.exe list` output, it registered successfully with Windows.

## Related

- [Register an MCP server on Windows](./mcp-server-overview.md)
- [The ODR command-line tool](./odr-tool.md)
- [App Actions Testing Playground app](./actions-test-tool.md)
