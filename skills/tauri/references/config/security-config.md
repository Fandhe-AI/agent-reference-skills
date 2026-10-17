---
source: https://v2.tauri.app/reference/config/#securityconfig
---

# SecurityConfig

Security configuration (`app.security`), plus `Csp`, `CspDirectiveSources`, `DisabledCspModificationKind`, `AssetProtocolConfig`, `FsScope`, `PatternKind`, `CapabilityEntry` (and the inline `Capability`), and `HeaderConfig`.

## Signature / Usage

```json
{
  "app": {
    "security": {
      "capabilities": [
        "main-window",
        {
          "identifier": "drag-window",
          "windows": ["main"],
          "permissions": ["core:window:allow-start-dragging"]
        }
      ]
    }
  }
}
```

## Options / Props

`additionalProperties: false`.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `csp` | Csp \| null | — | The Content Security Policy injected on all HTML files of the built application. If `devCsp` is not specified, this value is also injected on dev. |
| `devCsp` | Csp \| null | — | The Content Security Policy injected on all HTML files in development. |
| `freezePrototype` | boolean | `false` | Whether `Object.freeze(Object.prototype)` is run as an initialization script on every webview. Hardens the frontend against prototype pollution. Runs before any frontend code, on every webview. Frontend libraries that extend built-in prototypes (polyfills, some older frameworks) stop working when enabled, so test before shipping. |
| `dangerousDisableAssetCspModification` | boolean \| string[] | `false` | Disables the Tauri-injected CSP sources. At compile time Tauri parses frontend assets and changes the CSP to only allow your own scripts and styles by injecting nonce and hash sources. `true` disables all CSP injections; a list of strings names the CSP directives Tauri cannot inject. WARNING: only disable this if you know what you are doing; your application might be vulnerable to XSS attacks without this protection. |
| `assetProtocol` | AssetProtocolConfig | `{"enable": false, "scope": []}` | Custom protocol config. |
| `pattern` | PatternKind | `{"use": "brownfield"}` | The application pattern, which defines how the frontend communicates with the Rust core. |
| `capabilities` | CapabilityEntry[] | `[]` | List of capabilities enabled on the application. By default (not set or empty list) all capability files from `./capabilities/` are included; setting values gives fine grained control. Each entry is a capability file identifier (string) or an inlined capability. |
| `headers` | HeaderConfig \| null | — | The headers added to every http response from tauri to the web view. Doesn't include IPC messages and error responses. |

### Supporting types

| Type | Definition |
| --- | --- |
| Csp | Either the entire CSP policy as a single string, or an object mapping a directive name to `CspDirectiveSources`. |
| CspDirectiveSources | Either an inline string of sources (concatenated with a space separator) or a list of strings (concatenated with a space separator). |
| DisabledCspModificationKind | `boolean` (`true` disables all CSP modification; `false` default lets Tauri control the CSP) or `string[]` (disables modification for the given directives). |
| AssetProtocolConfig | `{ scope?: FsScope (default []), enable?: boolean (default false) }`. `enable` enables the asset protocol; `scope` is the access scope. |
| FsScope | Either `string[]` (list of allowed paths) or an object `{ allow?: string[] (default []), deny?: string[] (default [], takes precedence over allow), requireLiteralLeadingDot?: boolean \| null }`. `requireLiteralLeadingDot`: whether paths with components starting with `.` require that `.` to appear literally in the pattern (`*`, `?`, `**`, `[...]` will not match); defaults to `true` on Unix and `false` on Windows. Patterns can start with a base directory variable: `$AUDIO`, `$CACHE`, `$CONFIG`, `$DATA`, `$LOCALDATA`, `$DESKTOP`, `$DOCUMENT`, `$DOWNLOAD`, `$EXE`, `$FONT`, `$HOME`, `$PICTURE`, `$PUBLIC`, `$RUNTIME`, `$TEMPLATE`, `$VIDEO`, `$RESOURCE`, `$TEMP`, `$APPCONFIG`, `$APPDATA`, `$APPLOCALDATA`, `$APPCACHE`, `$APPLOG`. |
| PatternKind | `{ "use": "brownfield" }` (default: the frontend talks to the core directly) or `{ "use": "isolation", "options": { "dir": string } }` (every IPC message is routed through a secure JavaScript application hosted in a sandboxed `<iframe>`, which can validate or reject messages; `dir` must point at a directory containing the isolation application's `index.html`). |
| CapabilityEntry | An inlined `Capability` object, or a string referencing a capability identifier. |
| HeaderConfig | Object with optional keys (each a `HeaderSource`): `Access-Control-Allow-Credentials`, `Access-Control-Allow-Headers`, `Access-Control-Allow-Methods`, `Access-Control-Expose-Headers`, `Access-Control-Max-Age`, `Cross-Origin-Embedder-Policy`, `Cross-Origin-Opener-Policy`, `Cross-Origin-Resource-Policy`, `Permissions-Policy`, `Service-Worker-Allowed`, `Timing-Allow-Origin`, `X-Content-Type-Options`, `Tauri-Custom-Header` (not intended for production use). |
| HeaderSource | `string` (header value as is); `string[]` (items joined by ", "); `object` of string to string (items composed as key + space + value, joined by "; "). |

### Capability (inline)

Required: `identifier`, `permissions`.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `identifier` | string | — | Identifier of the capability, e.g. `main-user-files-write`. |
| `description` | string | `""` | Description of what the capability is intended to allow on associated windows. |
| `remote` | CapabilityRemote \| null | — | Remote URLs that can use the capability permissions: `{ "urls": string[] }` (required), using the URLPattern standard, e.g. `https://*.mydomain.dev`, `https://mydomain.dev/api/*`. |
| `local` | boolean | `true` | Whether this capability is enabled for local app URLs. |
| `windows` | string[] | — | Windows affected by this capability; glob patterns allowed. A matching window enables the capability on all its webviews regardless of `webviews`. On multiwebview windows prefer `webviews` and omit `windows`. |
| `webviews` | string[] | — | Webviews affected by this capability; glob patterns allowed. Enabled on all webviews whose label matches, regardless of `windows`. |
| `permissions` | PermissionEntry[] (unique) | — | Permissions attached to this capability. Must include the plugin name as prefix: `${plugin-name}:${permission-name}`. For app-implemented commands only `${permission-name}` is required. |
| `platforms` | Target[] \| null | — | Limit target platforms: `macOS`, `windows`, `linux`, `android`, `iOS`. By default all platforms. |

`PermissionEntry` is an identifier string, or an object `{ identifier: string (required), allow?: Value[] \| null, deny?: Value[] \| null }` that extends the permission's scope (`Value` is any ACL value: null, boolean, number, string, list, or map; `deny` should be prioritized by validation logic).

## Notes

- Tauri capabilities / permissions (ACL) detail pages live in the security category; this page covers only the config-file surface. Not related to Claude Code permissions or MCP capabilities.
- The `"windows": ["main"]` line in the inline capability example above was added to the official config reference example, which omits it; an inline capability with neither `windows` nor `webviews` matches no window.
- A webview or window not matching any capability has no access to the IPC layer at all.
- `remote` capabilities: make sure you understand the security implications of providing remote sources with local system access.
- Isolation pattern: see the isolation reference in the getting-started category.
- Source: `tauri-apps/tauri@tauri-v2.12.4` `crates/tauri-schema-generator/schemas/config.schema.json` (`definitions.SecurityConfig` and referenced types).

## Related

- [AppConfig](./app-config.md)
- [Configuration (root Config)](./overview.md)
