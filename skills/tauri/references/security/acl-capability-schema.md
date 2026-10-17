---
source: https://v2.tauri.app/reference/acl/capability/
---

# Capability (ACL reference)

A grouping and boundary mechanism developers can use to isolate access to the IPC layer. It controls application windows' and webviews' fine grained access to the Tauri core, application, or plugin commands.

## Signature / Usage

```json
{
  "identifier": "main-user-files-write",
  "description": "This capability allows the `main` window on macOS and Windows access to `filesystem` write related commands and `dialog` commands to enable programmatic access to files selected by the user.",
  "windows": [
    "main"
  ],
  "permissions": [
    "core:default",
    "dialog:open",
    {
      "identifier": "fs:allow-write-text-file",
      "allow": [{ "path": "$HOME/test.txt" }]
    }
  ],
  "platforms": ["macOS","windows"]
}
```

## Options / Props

Required: `identifier`, `permissions`.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| identifier | string | — | Identifier of the capability, e.g. `main-user-files-write` |
| description | string | `""` | What the capability is intended to allow on associated windows |
| remote | CapabilityRemote or null | not set | Remote URLs that can use the capability permissions. Understand the security implications of giving remote sources local system access |
| local | boolean | `true` | Whether this capability is enabled for local app URLs |
| windows | string[] | — | Windows affected by this capability; can be a glob pattern (e.g. `["main"]`). If a window label matches, the capability is enabled on all webviews of that window regardless of `webviews`. On multiwebview windows prefer `webviews` and omit `windows` |
| webviews | string[] | — | Webviews affected; can be a glob pattern. Enabled on every webview whose label matches, regardless of its window label |
| permissions | PermissionEntry[] (unique) | — | Permissions attached to this capability. Plugin permissions use `${plugin-name}:${permission-name}`; app commands only need `${permission-name}` |
| platforms | Target[] or null | all platforms | Limit which target platforms this capability applies to, e.g. `["macOS","windows"]` |

Definitions:

| Definition | Shape |
| --- | --- |
| CapabilityRemote | object, required `urls: string[]` — remote domains using the URLPattern standard, e.g. `"https://*.mydomain.dev"` (subdomains), `"https://mydomain.dev/api/*"` (any subpath) |
| PermissionEntry | either an `Identifier` string, or object `{ identifier, allow?: Value[] or null, deny?: Value[] or null }` referencing a permission and extending its scope |
| Identifier | string |
| Value | null, boolean, Number (int64 or double), string, array of Value, or map of string to Value |
| Target | one of `macOS`, `windows`, `linux`, `android`, `iOS` |

## Notes

- If a webview or its window does not match any capability it has no access to the IPC layer at all. Windows can be added by exact name (e.g. `main-window`) or glob patterns like `*` or `admin-*`; a window can have none, one or multiple capabilities.
- Tauri capabilities / permissions (ACL) for the WebView IPC layer; unrelated to anthropic-claude-code-admin permissions or mcp-spec capabilities.
- Source: `tauri-apps/tauri@tauri-v2.12.4` `crates/tauri-schema-generator/schemas/capability.schema.json`

- The Capabilities guide states that app commands registered with `Builder::invoke_handler` are allowed for all windows and webviews unless `AppManifest::commands` is set in build.rs; see Capabilities.

## Related

- [Capabilities](./capabilities.md)
- [Permission (ACL reference)](./acl-permission-schema.md)
- [Scope (ACL reference)](./acl-scope-schema.md)
