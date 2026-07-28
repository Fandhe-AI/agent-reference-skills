# MCP Host Quickstart

Walkthrough of building an MCP host app that lists, connects to, and interacts with MCP servers registered on Windows via `odr.exe`.

## Signature / Usage

```js
// List registered servers
const { stdout } = await execFileAsync('odr.exe', ['list']);
const servers = JSON.parse(stdout);

// Connect via stdio transport using the server's manifest command/args
const transport = new StdioClientTransport({
  command: server.manifest?.server?.mcp_config?.command,
  args: server.manifest?.server?.mcp_config?.args || [],
  stderr: 'ignore'
});
const client = new Client({ name: 'mcp-client', version: '1.0.0' }, { capabilities: {} });
await client.connect(transport);

// List and call tools
const { tools } = await client.listTools();
const result = await client.callTool({ name: tool.name, arguments: parameters });
```

## Notes

- Sample repo: `github.com/microsoft/mcp-on-windows-samples` (`mcp-client-js/`).
- Host apps should have package identity (this is not yet enforced in public preview but will be in the stable release).
- Uses the standard MCP TypeScript SDK client classes (`Client`, `StdioClientTransport`) combined with `odr.exe list` for Windows-side discovery.

## Related

- [MCP on Windows overview](./mcp-overview.md)
- [The ODR command-line tool](./odr-tool.md)
- [Register an MCP server on Windows](./mcp-server-overview.md)
