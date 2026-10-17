---
source: https://v2.tauri.app/security/capabilities/
---

# Capabilities

Tauri capabilities (ACL) granularly enable and constrain the core exposure to the application frontend running in the system WebView. A capability defines which permissions are granted or denied for which windows or webviews.

## Signature / Usage

`src-tauri/capabilities/default.json`:

```json
{
  "$schema": "../gen/schemas/desktop-schema.json",
  "identifier": "main-capability",
  "description": "Capability for the main window",
  "windows": ["main"],
  "permissions": [
    "core:path:default",
    "core:event:default",
    "core:window:default",
    "core:app:default",
    "core:resources:default",
    "core:menu:default",
    "core:tray:default",
    "core:window:allow-set-title"
  ]
}
```

Reference capability files by identifier, or inline them, in `tauri.conf.json`:

```json
{
  "app": {
    "security": {
      "capabilities": [
        {
          "identifier": "my-capability",
          "description": "My application capability used for all windows",
          "windows": ["*"],
          "permissions": ["fs:default", "allow-home-read-extended"]
        },
        "my-second-capability"
      ]
    }
  }
}
```

## Notes

- Capabilities can affect multiple windows and webviews, and these can be referenced in multiple capabilities. Windows and WebViews which are part of more than one capability effectively merge the security boundaries and permissions of all involved capabilities.
- Capability files are JSON or TOML files inside the `src-tauri/capabilities` directory. All capabilities inside the `capabilities` directory are automatically enabled by default; once capabilities are explicitly enabled in `tauri.conf.json`, only these are used in the application build.
- It is good practice to use individual files and only reference them by identifier in `tauri.conf.json`, but they can also be defined directly in the `capabilities` field (inline and identifier references can be mixed).
- By default, all commands registered with `tauri::Builder::invoke_handler` are allowed to be used by all windows and webviews of the app. To change that, use `AppManifest::commands` in `build.rs`:

```rust
fn main() {
    tauri_build::try_build(
        tauri_build::Attributes::new()
            .app_manifest(tauri_build::AppManifest::new().commands(&["your_command"])),
    )
    .unwrap();
}
```

- **Target platform**: the `platforms` array limits a capability to a subset of `linux`, `macOS`, `windows`, `iOS` and `android` (default: all targets):

```json
{
  "$schema": "../gen/schemas/mobile-schema.json",
  "identifier": "mobile-capability",
  "windows": ["main"],
  "platforms": ["iOS", "android"],
  "permissions": [
    "nfc:allow-scan",
    "biometric:allow-authenticate",
    "barcode-scanner:allow-scan"
  ]
}
```

- **Remote API access**: by default the API is only accessible to bundled code. Remote sources can be allowed via `remote.urls`:

```json
{
  "$schema": "../gen/schemas/remote-schema.json",
  "identifier": "remote-tag-capability",
  "windows": ["main"],
  "remote": {
    "urls": ["https://*.tauri.app"]
  },
  "platforms": ["iOS", "android"],
  "permissions": ["nfc:allow-scan", "barcode-scanner:allow-scan"]
}
```

- Caution: on Linux and Android, Tauri is unable to distinguish between requests from an embedded `<iframe>` and the window itself. Consider remote access very carefully.
- **What it protects against**: minimizes impact of frontend compromise; prevents or reduces (accidental) exposure of local system interfaces and data; prevents or reduces possible privilege escalation from frontend to backend/system.
- **What it does not protect against**: malicious or insecure Rust code; too lax scopes and configuration; incorrect scope checks in the command implementation; intentional bypasses from Rust code; anything written in the Rust core of an application; 0-days or unpatched 1-days in the system WebView; supply chain attacks or compromised developer systems.
- Security boundaries depend on window labels (**not titles**). Only expose window creation functionality to higher privileged windows.
- **Schema files**: `tauri-build` generates JSON schemas with all permissions available to the app (autocompletion). Set `$schema` to a platform-specific schema in `gen/schemas`, usually `../gen/schemas/desktop-schema.json` or `../gen/schemas/mobile-schema.json`.
- A list of all core permissions is in Core Permissions.
- Distinct from other tools' permissions/capabilities: this is Tauri's ACL for the WebView-to-Rust IPC layer, unrelated to anthropic-claude-code-admin / anthropic-claude-code-extend permissions or mcp-spec capabilities.

## Related

- [Permissions](./permissions.md)
- [Command Scopes](./scope.md)
- [Runtime Authority](./runtime-authority.md)
- [Capability (ACL reference)](./acl-capability-schema.md)
- [Core Permissions](./core-permissions.md)
