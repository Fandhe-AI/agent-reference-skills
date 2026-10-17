---
source: https://v2.tauri.app/reference/acl/permission/
---

# Permission (ACL reference)

Descriptions of explicit privileges of commands. It can enable commands to be accessible in the frontend of the application; if a scope is defined it fine-grain controls access of individual or multiple commands.

## Signature / Usage

```toml
[[permission]]
identifier = "allow-mkdir"
description = "This enables the mkdir command."
commands.allow = [
    "mkdir"
]
```

## Options / Props

Required: `identifier`.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| version | integer (uint64, min 1) or null | — | The version of the permission |
| identifier | string | — | A unique identifier for the permission |
| description | string or null | — | Human-readable description. Tauri internal convention is to use `<h4>` headings in markdown content for documentation generation |
| commands | Commands | `{ "allow": [], "deny": [] }` | Allowed or denied commands when using this permission |
| scope | Scopes | — | Allowed or denied scopes when using this permission |
| platforms | Target[] or null | all platforms | Target platforms this permission applies to |

Definitions:

| Definition | Shape |
| --- | --- |
| Commands | object `{ allow: string[] (default []), deny: string[] (default [], takes priority) }`. If two commands clash inside `allow` and `deny`, it is denied by default |
| Scopes | object `{ allow?: Value[] or null, deny?: Value[] or null }`. Any serde serializable type; passed to the command and enforced by the command implementation. `deny` should be prioritized by validation logic |
| Value | null, boolean, Number (int64 or double), string, array of Value, or map of string to Value |
| Target | one of `macOS`, `windows`, `linux`, `android`, `iOS` |

Scopes example from the schema:

```json
{
  "allow": [{ "path": "$HOME/**" }],
  "deny": [{ "path": "$HOME/secret.txt" }]
}
```

## Notes

- Tauri permissions (ACL) for commands exposed to the WebView; unrelated to anthropic-claude-code-admin / anthropic-claude-code-extend permissions or mcp-spec capabilities.
- Source: `tauri-apps/tauri@tauri-v2.12.4` `crates/tauri-schema-generator/schemas/permission.schema.json`

## Related

- [Permissions](./permissions.md)
- [Capability (ACL reference)](./acl-capability-schema.md)
- [Scope (ACL reference)](./acl-scope-schema.md)
