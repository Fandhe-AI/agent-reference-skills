# Test MCP servers on Windows

Test a Model Context Protocol (MCP) server at three levels: its protocol behavior, its Windows registration, and its behavior through the intended agent host. Passing one level doesn't establish that the others work.

## Signature / Usage

### Check Node.js

MCP Inspector requires Node.js 22.19.0 or later.

```powershell
node --version
```

### Protocol behavior: local stdio server

```powershell
$serverPath = 'C:\path\to\YourMcpServer.exe'
npx @modelcontextprotocol/inspector "$serverPath"
```

### Protocol behavior: command-line tool-list check

```powershell
npx @modelcontextprotocol/inspector --cli "$serverPath" --method tools/list
```

### Protocol behavior: remote Streamable HTTP server

```powershell
$serverUrl = 'https://your-server.example/mcp'
npx @modelcontextprotocol/inspector --server-url "$serverUrl" --transport http
```

### Windows registration

```powershell
odr.exe mcp list
```

```powershell
odr.exe --help
odr.exe mcp --help
```

## Notes

- Prerequisites: a development server and test data you can safely read or modify; Node.js (current MCP Inspector needs 22.19.0+); for Windows registration and contained execution, Windows 11 build 26220.7262 or later with the MCP feature available and enabled; an agent host that discovers servers through the Windows on-device agent registry (ODR) if testing that integration. Some information relates to pre-released product.
- Protocol checks in Inspector: initialization with expected name, version, and capabilities; tools listed with accurate descriptions and input/output schemas; expected results for valid input; actionable errors for invalid input, unauthorized requests, and unavailable dependencies without exposing credentials. Only launch executables and connect to endpoints you trust.
- For stdio servers, keep protocol messages on standard output and write diagnostic logs to standard error; other standard-output text can interrupt the MCP connection.
- Direct Inspector testing doesn't require Windows registration and doesn't test Windows discovery or contained execution. A local binary server needs package identity and registration metadata to run contained. For automation, use an approved Inspector version and follow the Inspector CLI guidance, including authentication handling for non-interactive runs.
- For remote servers: complete the authentication flow and test with permitted and restricted accounts; don't place access tokens or client secrets in examples, screenshots, or shared logs. A remote server runs on its own infrastructure and isn't inside a Windows agent session.
- Registration procedures by deployment model: package identity, MCP bundle (MCPB), or manual registration of remote and local servers (see Related). `odr.exe mcp list` verifies discovery metadata only; it doesn't prove the server can start, authenticate, or execute a tool. Preview command surfaces can differ by Windows build; inspect `odr.exe --help` and `odr.exe mcp --help`.
- For default-mode Windows registration, compare the server's runtime `initialize` and `tools/list` responses with the manifest's static responses (names, versions, capabilities, tool descriptions, schemas must match the MCPB requirements). Repeat when updating the implementation or manifest.
- Agent-host test for a local package-identity server: discover and connect through the host's Windows integration (not a separately configured executable); call a harmless read-only operation with test data and verify consent prompts; test resource access before and after consent; test denied permissions, canceled consent, expired authentication, and unavailable services; update and uninstall the package and verify registration changes.
- Directly installed MCP bundles don't run contained under the default protections. Don't reduce agent-connector protections to make a containment test pass. File-access consent applies to the host, not individually to each server. Back-end services must still authenticate and authorize each operation; test data-changing tools with non-production records.
- Troubleshooting: `node`/`npx` not found (verify install and PATH, open a new PowerShell); Inspector can't connect to a local server (check path, arguments, environment, startup errors, non-protocol text on standard output); ODR reports MCP surface isn't enabled (verify Windows build, feature availability, and organization settings); server missing in ODR (check registration procedure and help; for bundles, default-protection limitations); direct Inspector works but host fails (check launch path, manifest/runtime agreement, containment, consent, authentication).
- Source: https://learn.microsoft.com/en-us/windows/ai/mcp/servers/test-mcp-server (retrieved 2026-11-14)

## Related

- [Register an MCP server on Windows](./mcp-server-overview.md)
- [Register an MCP server from an app with package identity](./mcp-windows-identity.md)
- [Register an MCP server with an MCP bundle](./mcp-mcpb.md)
- [Manually register MCP servers](./mcp-manual.md)
- [Securely containing MCP servers on Windows](./mcp-containment.md)
- [The ODR command-line tool](./odr-tool.md)
- [App Actions Testing Playground app](./actions-test-tool.md)
