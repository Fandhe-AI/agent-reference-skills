---
source: https://v2.tauri.app/security/permissions/
---

# Permissions

Tauri permissions (ACL) are descriptions of explicit privileges of commands. They can enable or deny commands, define scopes, or combine both.

## Signature / Usage

```toml
[[permission]]
identifier = "my-identifier"
description = "This describes the impact and more."
commands.allow = [
    "read_file"
]

[[permission.scope.allow]]
my-scope = "$HOME/*"

[[permission.scope.deny]]
my-scope = "$HOME/secret"
```

Extending plugin permissions in an app with a permission set (`my-app/src-tauri/permissions/home-read-extends.toml`):

```toml
[[set]]
identifier = "allow-home-read-extended"
description = """ This allows non-recursive read access to files and to create directories
in the `$HOME` folder.
"""
permissions = [
    "fs:read-files",
    "fs:scope-home",
    "fs:allow-mkdir"
]
```

## Notes

- To grant or deny a permission to a window or webview, reference it in a capability.
- Permissions can be grouped as a set (`[[set]]`) under a new identifier, combining scope-related with command-related permissions and bundling OS-specific permissions.
- Plugin developers can ship multiple pre-defined, well named permissions for all exposed commands. Application developers can extend plugin permissions or define permissions for their own commands.
- **Identifier**: `<name>:default` is the default permission for a plugin or application; `<name>:<command-name>` is the permission for an individual command. `<name>` is the plugin crate name without the `tauri-plugin-` prefix (not needed for the application's own permissions); the prefix is prepended automatically at compile time.
- Identifiers are limited to ASCII lower case alphabetic characters `[a-z]` and a maximum length of `116`:

```rust
const IDENTIFIER_SEPARATOR: u8 = b':';
const PLUGIN_PREFIX: &str = "tauri-plugin-";

// https://doc.rust-lang.org/cargo/reference/manifest.html#the-name-field
const MAX_LEN_PREFIX: usize = 64 - PLUGIN_PREFIX.len();
const MAX_LEN_BASE: usize = 64;
const MAX_LEN_IDENTIFIER: usize = MAX_LEN_PREFIX + 1 + MAX_LEN_BASE;
```

- Despite the `[a-z]` wording, official identifiers also use `-` within names and `:` as the plugin separator (e.g. `fs:allow-mkdir`).
- Plugin layout: `permissions/<identifier>.json/toml` and `permissions/default.json/toml`. The default permission is added automatically to the application configuration when plugins are added via the Tauri CLI.
- Application layout: `src-tauri/permissions/<identifier>.toml` and `src-tauri/capabilities/<identifier>.json/.toml`. Capability files can be `json`/`json5` or `toml`; the official page states that application permissions can only be defined in `toml` (the plugin layout above accepts `.json/toml`).
- The official page restricts application permission files to TOML while allowing JSON/TOML for plugins; TOML is the documented format for app permissions.
- Plugin permission examples (File System plugin): `scope-home` (`[[permission.scope.allow]] path = "$HOME/*"`), `read-files` (`commands.allow = ["read_file", "read", "open", "read_text_file", "read_text_file_lines", "read_text_file_lines_next"]`), `allow-mkdir` (`commands.allow = ["mkdir"]`).
- Distinct from other tools' permissions: this is Tauri's ACL for commands exposed to the WebView, unrelated to anthropic-claude-code-admin / anthropic-claude-code-extend permissions or mcp-spec capabilities.

## Related

- [Capabilities](./capabilities.md)
- [Command Scopes](./scope.md)
- [Permission (ACL reference)](./acl-permission-schema.md)
- [Core Permissions](./core-permissions.md)
