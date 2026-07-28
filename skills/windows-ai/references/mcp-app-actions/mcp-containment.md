# Securely containing MCP servers on Windows

Security requirements and access restrictions for MCP servers that run contained in a separate agent session on Windows, and how to grant agents access to additional resources.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| manifest_version, name, version, description, author, server | fields | Minimum required fields in a contained server's `manifest.json`. |
| `_meta.com.microsoft.windows` | object | Must define both `static_responses` and `tools/list` for the server to run contained. |

## Notes

- Contained servers run in a separate Windows session under a separate agent user account, so they have no direct access to the user's session (user files, settings, registry, credentials, running apps) unless the user grants permission.
- A contained server can: access the internet, read/write the agent's own files/registry, run executables in the agent user environment/session, and access certain user files with user consent.
- To run contained, a server must: be a binary (.exe) server, have package identity registered via an MSIX package extension, and provide a valid `manifest.json` with the required fields above.
- Servers packaged as MCP bundles (.mcpb) currently cannot run contained; see [Register with an MCP Bundle](./mcp-mcpb.md).
- A host app (the app the user interacts with directly) proxies between the user and one or more MCP servers; user-file-access consent is granted per host, not per server — once granted, all servers used by that host gain access.
- `Settings > System > Advanced > AI components > Reduce protections for agent connectors` lets unpackaged apps (including .mcpb) run with reduced containment for testing; this exposes the device to additional security threats.

## Related

- [Register an MCP server on Windows](./mcp-server-overview.md)
- [Register an MCP server from an app with package identity](./mcp-windows-identity.md)
- [Register an MCP server with an MCP bundle](./mcp-mcpb.md)
