# MCP on Windows overview

MCP on Windows provides the Windows On-Device Agent Registry (ODR), a secure, manageable interface to discover and use agent connectors from local apps and remote servers using Model Context Protocol (MCP).

## Signature / Usage

```
odr.exe list
odr.exe mcp add <manifest-or-uri>
```

## Notes

- The Windows ODR (On-Device Registry) lets apps and agents securely discover and access MCP servers on Windows.
- Benefits: broad standardized MCP support (local apps and remote servers), discoverability, security (servers contained in a separate environment by default), user/admin control via Windows Settings and Microsoft Intune, logging/auditability, and built-in Windows connectors (for example the File Explorer MCP server).
- `odr.exe` is the command-line tool for viewing and managing MCP servers. See [The ODR command-line tool](./odr-tool.md).
- Known agents that use MCP servers on Windows include the Windows Settings connector, Visual Studio GitHub Copilot agent mode, and Visual Studio Code GitHub Copilot agent mode. Frameworks like Microsoft Agent Framework can build custom agents that use the ODR.

## Related

- [Register an MCP server on Windows](./mcp-server-overview.md)
- [Securely containing MCP servers on Windows](./mcp-containment.md)
- [Windows File Explorer MCP connector](./file-connector.md)
- [The ODR command-line tool](./odr-tool.md)
- [MCP Host Quickstart](./quickstart-mcp-host.md)
