# Windows sandbox

The native sandbox used when Codex runs directly on Windows (ChatGPT desktop app, CLI, or IDE extension) without WSL — blocks filesystem writes outside the working folder and prevents network access without explicit approval.

## Signature / Usage

```toml
[windows]
sandbox = "elevated"  # or "unelevated"
# sandbox_private_desktop = true  # default
```

```text
/sandbox-add-read-dir C:\absolute\directory\path
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `windows.sandbox` | `elevated` \| `unelevated` | `elevated` (preferred): dedicated lower-privilege sandbox users, filesystem permission boundaries, firewall rules. `unelevated` (fallback): restricted Windows token derived from the current user, ACL-based filesystem boundaries, weaker network isolation; useful when administrator-approved setup is blocked. |
| `windows.allowed_sandbox_implementations` (managed `requirements.toml`) | array | Restricts which native sandbox implementations are permitted, e.g. `["elevated"]`. Codex prefers `elevated` when unset. |
| `windows.sandbox_private_desktop` | boolean (default `true`) | Uses a private desktop for stronger UI isolation; set `false` only for `Winsta0\Default` compatibility. |
| `/sandbox-add-read-dir <path>` | slash command | Grants sandbox read access to an absolute directory for the rest of the session when a command fails due to a directory it can't read. |

## Notes

- If both modes are available, use `elevated`; fall back to `unelevated` only while troubleshooting.
- Windows version support: Windows 11 recommended; recent fully-updated Windows 10 (1809+, needs ConPTY) is best-effort; older Windows 10 builds are not recommended. `winget` should be available.
- The IDE extension on Windows can instead run inside WSL2 (`chatgpt.runCodexInWindowsSubsystemForLinux: true` in VS Code settings), inheriting Linux sandbox semantics.
- Common failures: UAC/administrator prompt declined, blocked local user/group creation, blocked firewall changes, or blocked sandbox-user logon rights fall back to `unelevated`. Windows error `1385` means Windows denies the logon type the sandbox user needs — check device policy / group policy. A warning about folders writable by `Everyone` means folder ACLs are too broad for the sandbox to fully protect.
- Diagnostics: send `CODEX_HOME/.sandbox/sandbox.log`; never send the contents of `CODEX_HOME/.sandbox-secrets/`.
- For general sandbox/approval concepts (not Windows-specific), see `agent-approvals-security.md` and `sandbox.md`.

## Related

- [Sandbox](./sandbox.md)
- [Agent approvals & security](./agent-approvals-security.md)
