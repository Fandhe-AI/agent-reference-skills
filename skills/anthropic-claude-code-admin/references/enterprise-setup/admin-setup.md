<!-- source: https://code.claude.com/docs/en/admin-setup.md / last verified: 2026-08-07 -->

# Set up Claude Code for your organization

A decision map for administrators deploying Claude Code, covering API providers, managed settings, policy enforcement, usage monitoring, and data handling.

## Signature / Usage

Deployment decisions in order:

1. Choose your API provider (Teams/Enterprise, Console, Bedrock, Vertex/Agent Platform, Foundry)
2. Decide how settings reach devices (server-managed vs endpoint-managed)
3. Decide what to enforce (permission rules, sandboxing, MCP/plugin control, hooks, login enforcement, model restrictions)
4. Set up usage visibility (analytics dashboard, monitoring, spend controls)
5. Review data handling (data usage policy, ZDR, security)

```text
Server-managed settings (claude.ai admin console) > plist/registry policy > File-based managed settings > Windows user registry (HKCU)
```

## Options / Props

| Mechanism | Delivery | Priority | Platforms |
| --- | --- | --- | --- |
| Server-managed | claude.ai admin console, or self-hosted Claude apps gateway | Highest | All |
| plist / registry policy | macOS `com.anthropic.claudecode` plist, Windows `HKLM\SOFTWARE\Policies\ClaudeCode` | High | macOS, Windows |
| File-based managed | `managed-settings.json` at OS-specific paths | Medium | All |
| Windows user registry | `HKCU\SOFTWARE\Policies\ClaudeCode` | Lowest | Windows only |

## Notes

- Managed values take precedence over user/project settings apart from documented precedence exceptions (`fallbackModel`, `availableModels` replace rather than merge).
- Array settings like `permissions.allow`/`permissions.deny` merge across sources; developers can extend but not remove managed entries.
- A configured `policyHelper` preempts all four managed-settings sources; its output becomes the only managed configuration for the run.
- WSL by default reads only the Linux file path (`/etc/claude-code`); `wslInheritsWindowsSettings: true` extends Windows registry/file policy to WSL.
- Verify with `/status` — the `Setting sources` line shows the active managed source: `(remote)`, `(plist)`, `(HKLM)`, `(HKCU)`, or `(file)`.

## Related

- [server-managed-settings](./server-managed-settings.md)
- [network-config](./network-config.md)
- [authentication](./authentication.md)
