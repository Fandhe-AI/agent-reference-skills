# The ODR command-line tool (odr.exe)

`odr.exe` provides discovery and management for on-device agents on Windows, including registered MCP servers and Agent Launchers.

## Signature / Usage

```cmd
odr [command] [options]
odr mcp [command] [options]
odr agent-info [command] [options]
```

## Options / Props

| Command / Option | Description |
|------|-------------|
| mcp | Commands related to Model Context Protocol servers |
| -?, -h, --help | Show help and usage information |
| --version | Show version information |
| --verbose | Enable verbose logging |
| mcp run | Run MCP server |
| mcp list | List registered MCP servers |
| mcp add `<manifest file path>` | Register an MCP server |
| mcp remove `<server id>` | Unregister an MCP server |
| mcp configure `<server id>` | Configure an MCP server |
| agent-info add `<path to agentDefinition.json>` | Register an Agent Launcher dynamically |
| agent-info remove `<path to agentDefinition.json>` | Remove a dynamically registered Agent Launcher |
| agent-info list | List all registered Agent Launchers |

## Notes

- `agent-info add` / `agent-info remove` require package identity and must be run from within the packaged app that also contains the associated App Action; they cannot be used from unpackaged apps. See [Get started with Agent Launchers on Windows](./agents-get-started.md).

## Related

- [MCP on Windows overview](./mcp-overview.md)
- [Manually register remote and local servers](./mcp-manual.md)
- [Get started with Agent Launchers on Windows](./agents-get-started.md)
