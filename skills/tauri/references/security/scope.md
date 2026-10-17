---
source: https://v2.tauri.app/security/scope/
---

# Command Scopes

A scope is a granular way to define (dis)allowed behavior of a Tauri command. Scopes are `allow` or `deny`; `deny` always supersedes `allow`.

## Signature / Usage

Example from the `Fs` plugin permissions (scope type is a string containing a `glob` compatible path):

```toml
[[permission]]
identifier = "scope-applocaldata-recursive"
description = '''
This scope recursive access to the complete `$APPLOCALDATA` folder,
including sub directories and files.
'''

[[permission.scope.allow]]
path = "$APPLOCALDATA/**"
```

Merging scopes into sets:

```toml
[[set]]
identifier = "deny-default"
description = '''
This denies access to dangerous Tauri relevant files and
folders by default.
'''
permissions = ["deny-webview-data-linux", "deny-webview-data-windows"]
```

```toml
[[set]]
identifier = "scope-applocaldata-reasonable"
description = '''
This scope set allows access to the `APPLOCALDATA` folder and
subfolders except for linux,
while it denies access to dangerous Tauri relevant files and
folders by default on windows.
'''
permissions = ["scope-applocaldata-recursive", "deny-default"]
```

```toml
[[set]]
identifier = "read-files-applocaldata"
description = '''
This set allows file read access to the `APPLOCALDATA` folder and
subfolders except for linux,
while it denies access to dangerous Tauri relevant files and
folders by default on windows.'''
permissions = ["scope-applocaldata-reasonable", "allow-read-file"]
```

## Notes

- The scope type must be any `serde` serializable type. Types are generally plugin-specific; for scoped commands in an app, the scope type is defined in the app and enforced in the command implementation.
- The `Fs` plugin uses scopes to allow or deny directories and files; the `http` plugin uses scopes to filter reachable URLs.
- The scope is passed to the command; handling and enforcement is implemented by the command itself. Command developers must ensure no scope bypasses are possible and should audit the scope validation implementation.
- A deny permission can carry `platforms = ["linux"]` / `["windows"]` (e.g. `deny-webview-data-linux` denies `$APPLOCALDATA/**`; `deny-webview-data-windows` denies `$APPLOCALDATA/EBWebView/**` because webview data and configuration are stored there).
- Scopes can apply to all commands by extending the global scope of the plugin, or to selected commands when combined with an enabled command inside a permission.
- Distinct from other tools' scope/permission concepts: this is Tauri's ACL scope for command arguments, not related to anthropic-claude-code-admin permissions or mcp-spec capabilities.

## Related

- [Permissions](./permissions.md)
- [Capabilities](./capabilities.md)
- [Scope (ACL reference)](./acl-scope-schema.md)
- [Asset Protocol](./asset-protocol.md)
