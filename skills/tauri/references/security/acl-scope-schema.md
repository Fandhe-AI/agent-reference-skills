---
source: https://v2.tauri.app/reference/acl/scope/
---

# Scope (ACL reference)

`Scopes`: an argument for fine grained behavior control of Tauri commands. It can be of any serde serializable type and is used to allow or prevent certain actions inside a Tauri command. The configured scope is passed to the command and enforced by the command implementation.

## Signature / Usage

```json
{
  "allow": [{ "path": "$HOME/**" }],
  "deny": [{ "path": "$HOME/secret.txt" }]
}
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| allow | Value[] or null | — | Data that defines what is allowed by the scope |
| deny | Value[] or null | — | Data that defines what is denied by the scope. This should be prioritized by validation logic |

Definitions:

| Definition | Shape |
| --- | --- |
| Value | All supported ACL values: null, boolean, Number, string, array of Value, or map of string to Value |
| Number | A valid ACL number: int64 integer or double (f64) |

## Notes

- Tauri ACL command scope schema; unrelated to anthropic-claude-code-admin permissions or mcp-spec capabilities.
- Source: `tauri-apps/tauri@tauri-v2.12.4` `crates/tauri-schema-generator/schemas/scope.schema.json`

## Related

- [Command Scopes](./scope.md)
- [Permission (ACL reference)](./acl-permission-schema.md)
- [Capability (ACL reference)](./acl-capability-schema.md)
