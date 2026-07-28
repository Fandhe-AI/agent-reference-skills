# Register an MCP server on Windows

Overview of the ways to register an MCP server with Windows so agents can discover and connect to it.

## Signature / Usage

Registration methods, depending on packaging:

- Apps with package identity (MSIX) — automatic registration/unregistration on install/uninstall.
- Apps without identity (.exe, MSI, standalone MCP bundle) — install an MCP bundle directly with the installer.
- Manual registration — use the on-device agent registry command-line tool for remote servers or fine-grained local control.

## Notes

- To build an MCP server itself, use the MCP C# SDK or MCP TypeScript SDK (or another SDK listed at modelcontextprotocol.io/docs/sdk); this article only covers Windows-side registration.
- By default, MCP servers accessed through the ODR run in a securely contained agent session with access limited to approved resources. See [Securely containing MCP servers on Windows](./mcp-containment.md).
- MCP bundles installed directly (without package identity) cannot run in the contained agent process and are not accessible from the ODR unless the user enables "Reduce protections for agent connectors".

## Related

- [MCP on Windows overview](./mcp-overview.md)
- [Register with package identity](./mcp-windows-identity.md)
- [Register with an MCP Bundle](./mcp-mcpb.md)
- [Manually register remote and local servers](./mcp-manual.md)
- [Securely containing MCP servers](./mcp-containment.md)
- [Test MCP servers on Windows](./test-mcp-server.md)
