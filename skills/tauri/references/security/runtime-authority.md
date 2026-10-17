---
source: https://v2.tauri.app/security/runtime-authority/
---

# Runtime Authority

The runtime authority is part of the Tauri Core. It holds all permissions, capabilities and scopes at runtime to enforce which window can access which command and passes scopes to commands.

## Signature / Usage

Request flow when a Tauri command is invoked from the webview:

```text
webview invoke
  -> runtime authority receives the invoke request
  -> checks the origin is allowed to use the requested command (origin is part of capabilities)
  -> if scopes are defined for the command and applicable, injects them into the invoke request
  -> request passed to the Tauri command
```

## Notes

- If the origin is not allowed to call the command, the runtime authority denies the request and the Tauri command is never invoked.
- This is Tauri's ACL enforcement point, not related to anthropic-claude-code-admin permissions or mcp-spec capabilities.

## Related

- [Capabilities](./capabilities.md)
- [Permissions](./permissions.md)
- [Command Scopes](./scope.md)
