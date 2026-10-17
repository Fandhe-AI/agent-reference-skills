---
source: https://v2.tauri.app/security/asset-protocol/
---

# Asset Protocol

Configure `app.security.assetProtocol` so the WebView can load local files through the `asset` custom protocol (for example via `convertFileSrc` in the frontend).

## Signature / Usage

`src-tauri/tauri.conf.json` (array form, allowed paths only):

```json
{
  "app": {
    "security": {
      "assetProtocol": {
        "enable": true,
        "scope": ["$APPCACHE/**/*", "$RESOURCE/**/*"]
      }
    }
  }
}
```

Object form with `deny`:

```json
{
  "app": {
    "security": {
      "assetProtocol": {
        "enable": true,
        "scope": {
          "allow": ["$APPCACHE/**/*"],
          "deny": ["$APPCACHE/**/secrets/**"]
        }
      }
    }
  }
}
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| enable | boolean | `false` | Must be `true` to serve files through the asset protocol |
| scope | array or object | `[]` | `FsScope`: array of allowed glob patterns, or object with `allow`, optional `deny`, optional `requireLiteralLeadingDot` |
| scope.allow | string[] | `[]` | Allowed glob patterns |
| scope.deny | string[] | `[]` | Denied glob patterns; takes precedence over `allow` |
| scope.requireLiteralLeadingDot | boolean or null | `true` on Unix, `false` on Windows | When true, `*`, `?`, `**`, `[...]` do not match a path component starting with `.` |

## Notes

- Defaults from `AssetProtocolConfig` / `FsScope` in config.schema.json @ tauri-v2.12.4.
- Paths resolved at runtime must match the scope or the WebView refuses the load (often "asset protocol not configured to allow the path").
- Patterns may start with a base directory variable (`$HOME`, `$CACHE`, `$APPCACHE`, `$APPDATA`, `$RESOURCE`, ...). Resolved paths are usually absolute; a pattern like `["*/**"]` typically does not match them. Prefer `$HOME/**/*`, `/home/username/**/*`, or another form mirroring the resolved path.
- With the array form `requireLiteralLeadingDot` cannot be set; use the object form.
- On Unix, `$HOME/**` can allow `/home/user/Documents/file.png` but not `/home/user/.cache/myapp/preview.png`; `$HOME/.cache/myapp/**` matches. To widen, set `requireLiteralLeadingDot` to `false` (review carefully):

```json
{
  "app": {
    "security": {
      "assetProtocol": {
        "enable": true,
        "scope": {
          "requireLiteralLeadingDot": false,
          "allow": ["$HOME/**/*"]
        }
      }
    }
  }
}
```

- Prefer `**/*` over bare `**` for "all files under here". A maintainer-suggested highly permissive shape (`"allow": ["**/*"]` with `requireLiteralLeadingDot: false`) exposes hidden and sensitive files; prefer narrow directories (`$APPCACHE`, `$RESOURCE`, a single app subfolder).
- CSP for `asset:` sources is documented on the CSP page.
- Static config does not replace runtime workflows where the user picks paths (e.g. dialog plugin); persist those with the persisted-scope plugin and its `protocol-asset` Cargo feature, registering `tauri_plugin_fs` before `tauri_plugin_persisted_scope`:

```toml
tauri-plugin-persisted-scope = { version = "2", features = ["protocol-asset"] }
```

- Troubleshooting: "not configured to allow the path" -> check `allow` pattern, `deny` overrides `allow`, use absolute or `$VAR` patterns; fails under `.cache` / `.config` -> literal `.segment` or `requireLiteralLeadingDot: false`; blocked after restart -> persisted-scope with `protocol-asset`.
- Rust types: `AssetProtocolConfig`, `FsScope` in `crates/tauri-utils/src/config.rs`.

## Related

- [Content Security Policy (CSP)](./csp.md)
- [Command Scopes](./scope.md)
