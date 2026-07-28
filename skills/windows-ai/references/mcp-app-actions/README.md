# MCP and App Actions on Windows

| Name | Description | Path |
|------|-------------|------|
| MCP on Windows overview | On-Device Registry (ODR), MCP server discovery/security overview | [mcp-overview.md](./mcp-overview.md) |
| Register an MCP server on Windows | Overview of the three server registration methods | [mcp-server-overview.md](./mcp-server-overview.md) |
| Register with package identity | MSIX-packaged MCP server registration via uap3:AppExtension | [mcp-windows-identity.md](./mcp-windows-identity.md) |
| Register with an MCP Bundle | MCPB-based registration for apps without package identity | [mcp-mcpb.md](./mcp-mcpb.md) |
| Manually register remote and local servers | odr.exe mcp add/remove for remote/fine-grained local registration | [mcp-manual.md](./mcp-manual.md) |
| Securely containing MCP servers | Agent-session containment, requirements, resource access | [mcp-containment.md](./mcp-containment.md) |
| Test MCP servers on Windows | MCP inspector and odr.exe list validation | [test-mcp-server.md](./test-mcp-server.md) |
| MCP Host Quickstart | Building an MCP host app with odr.exe and the MCP SDK | [quickstart-mcp-host.md](./quickstart-mcp-host.md) |
| Windows File Explorer MCP connector | Built-in file-access MCP server tools | [file-connector.md](./file-connector.md) |
| The ODR command-line tool (odr.exe) | Full odr.exe / odr mcp / odr agent-info command reference | [odr-tool.md](./odr-tool.md) |
| App Actions on Windows Overview | What an App Action is, implementation options, entities | [app-actions-overview.md](./app-actions-overview.md) |
| Get started with App Actions on Windows | ActionProvider via Microsoft.AI.Actions code generation | [actions-get-started.md](./actions-get-started.md) |
| Implement URI launch | URI-activation App Action provider implementation | [actions-uri-launch.md](./actions-uri-launch.md) |
| Manually implement IActionProvider | Direct IActionProvider.InvokeAsync implementation | [actions-iactionprovider-manual.md](./actions-iactionprovider-manual.md) |
| Detect and filter callers | allowedAppInvokers, $.Token, AUMID/PFN caller checks | [actions-filter-caller.md](./actions-filter-caller.md) |
| Return streaming text | StreamingTextEntityWriter / IAsyncEnumerable output | [actions-streaming-text.md](./actions-streaming-text.md) |
| Handle remote files | RemoteFileActionEntity for cloud-hosted files | [actions-remote-files.md](./actions-remote-files.md) |
| Toggle availability | isAvailable / ActionRuntime.SetActionAvailability | [actions-availability.md](./actions-availability.md) |
| Position App Action UI | InvokerWindowId-based UI placement | [actions-display-ui.md](./actions-display-ui.md) |
| Action definition JSON schema | actions.json, ActionEntityKind, entity properties, where clauses | [actions-json.md](./actions-json.md) |
| Action provider package manifest XML format | uap3:AppExtension registration in AppxManifest.xml | [actions-provider-manifest.md](./actions-provider-manifest.md) |
| App Actions Testing Playground app | Testing/debugging tool for registered actions | [actions-test-tool.md](./actions-test-tool.md) |
| Discover and invoke registered App Actions | ActionCatalog.GetActionsForInputs / ActionInstance.InvokeAsync | [actions-consume.md](./actions-consume.md) |
| Responsible AI and safety | contentAgeRating and content moderation guidance | [actions-rai-safety.md](./actions-rai-safety.md) |
| Agent Launchers on Windows overview | Registering discoverable, invokable AI agents | [agent-launchers-overview.md](./agent-launchers-overview.md) |
| Get started with Agent Launchers on Windows | agentName/prompt inputs, static and dynamic registration | [agents-get-started.md](./agents-get-started.md) |
| Agent definition JSON schema | Agent Launcher manifest fields | [agents-json.md](./agents-json.md) |
| Agent Workspace | Contained agent session, agent accounts, Copilot Actions | [agent-workspace.md](./agent-workspace.md) |
| Security and consent model | Cross-cutting containment, consent, and safety summary | [security-consent-model.md](./security-consent-model.md) |
