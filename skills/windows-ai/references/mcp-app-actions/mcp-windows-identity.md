# Register an MCP server from an app with package identity

How an app with MSIX package identity registers an MCP server so the OS automatically registers/unregisters it on install/uninstall.

## Signature / Usage

```xml
<Extensions>
  <uap3:Extension Category="windows.appExtension">
    <uap3:AppExtension
      Name="com.microsoft.windows.ai.mcpServer"
      Id="WindowsMCPServerSampleApp"
      DisplayName="Windows Sample MCP Server"
      PublicFolder="Assets">
      <uap3:Properties>
        <Registration>mcpServerConfig.json</Registration>
      </uap3:Properties>
    </uap3:AppExtension>
  </uap3:Extension>
  <uap5:Extension Category="windows.appExecutionAlias">
    <uap5:AppExecutionAlias>
      <uap5:ExecutionAlias Alias="WindowsMCPServerSampleApp.exe"/>
    </uap5:AppExecutionAlias>
  </uap5:Extension>
</Extensions>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Name | attribute | Must be `com.microsoft.windows.ai.mcpServer` to register an MCP server extension. |
| Registration | element | Package-relative path to the MCP bundle (MCPB) `manifest.json` describing the server. |
| uap5:AppExecutionAlias | element | Declares the executable alias the system launches for the MCP server. |

## Notes

- Steps: add an MCP Bundle `manifest.json` (schema from the MCPB GitHub repo) describing the server, then add a `uap3:AppExtension` entry to `AppxManifest.xml`.
- The `_meta` section values in the MCPB manifest must match what the server returns at runtime (`initialize`, `tools/list`) for the server to run in contained mode. See [Register with an MCP Bundle](./mcp-mcpb.md).
- Requires Windows build 26220.7262+, SignTool.exe 10.0.26100.4188+, and (for production) a certificate from the Microsoft Trusted Root Program.
- Servers request access to protected resources (documentsLibrary, downloadsFolder, picturesLibrary, musicLibrary, videosLibrary) via app manifest capabilities; the system prompts the user to grant access.
- Sample: `github.com/microsoft/mcp-on-windows-samples` (`msix-app-with-server/`).

## Related

- [Register an MCP server on Windows](./mcp-server-overview.md)
- [Register with an MCP Bundle](./mcp-mcpb.md)
- [Securely containing MCP servers on Windows](./mcp-containment.md)
- [Test MCP servers on Windows](./test-mcp-server.md)
