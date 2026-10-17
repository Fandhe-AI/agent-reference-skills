# Sandbox

The boundary that lets Codex act autonomously without unrestricted machine access. Applies to spawned commands (`git`, package managers, test runners), not just built-in file operations, and works together with the separate approval-policy control.

## Signature / Usage

```toml
# config.toml
sandbox_mode    = "workspace-write"   # read-only | workspace-write | danger-full-access
approval_policy = "on-request"        # on-request | never  (untrusted is no longer selectable)
approvals_reviewer = "user"           # user | auto_review
```

```bash
# Equivalent CLI flags for the low-friction local automation preset
codex --sandbox workspace-write --ask-for-approval on-request
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `read-only` | sandbox mode | Agent can inspect files; edits and commands need approval. |
| `workspace-write` | sandbox mode | Agent can read, edit within the workspace, and run routine commands in that boundary (default low-friction mode). |
| `danger-full-access` | sandbox mode | No filesystem/network restrictions; use only when full access is intended. |
| `untrusted` | approval policy | Asks before running commands outside its trusted set. No longer selectable in Codex or ChatGPT Work; existing configs using it need migration. |
| `on-request` | approval policy | Works inside the sandbox by default, asks when it must go beyond it. |
| `never` | approval policy | Never stops for approval prompts. |
| `sandbox_workspace_write.writable_roots` | table | Extends writable directories beyond the workspace without disabling the sandbox entirely. |

## Notes

- Prerequisites: macOS works out of the box (Seatbelt). Linux/WSL2 need `bubblewrap` installed (`apt install bubblewrap` / `dnf install bubblewrap`); Codex falls back to a bundled helper requiring unprivileged user-namespace support if no `bwrap` binary is on `PATH`. Native Windows uses the Windows sandbox; WSL2 uses the Linux sandbox implementation. A startup warning appears if `bwrap` is missing or the namespace can't be created. On Ubuntu 24.04 you may need the `bwrap-userns-restrict` AppArmor profile (load with `apparmor_parser -r`); disabling `kernel.apparmor_restrict_unprivileged_userns` via sysctl is a fallback. Ubuntu 25.04 works after installing `bubblewrap`.
- Full access = `sandbox_mode = "danger-full-access"` + `approval_policy = "never"`. The lower-risk automation preset is `workspace-write` + `on-request` (or `--sandbox workspace-write --ask-for-approval on-request`).
- For a workflow-specific exception, prefer command-prefix rules over broadly expanding sandbox access.
- **This page describes the older `sandbox_mode`/`approval_policy` model.** It does not compose with the newer permission-profile system (`default_permissions` / `[permissions.<name>]`) — see the mutual-exclusion note in `permission-profiles.md`.
- The sandbox applies to spawned commands (`git`, package managers, test runners), not just built-in file operations. Platform-native enforcement differs between macOS, Linux, WSL2, and native Windows.
- Permissions control: in the desktop app and IDE extension, use the control beneath the composer (**Ask for approval**, **Approve for me** for eligible requests, **Full access**, and named or custom permissions profiles); in the CLI, `/permissions` opens the permissions picker to change the active profile. When an approval offers scopes (once vs. session), choose the narrowest; use separate projects or worktrees instead of broadening access across unrelated repositories.
- Configure defaults in `config.toml` (`sandbox_mode`, `approval_policy`, `approvals_reviewer`, `sandbox_workspace_write.writable_roots`); for workflow-specific exceptions, use rules (allow / prompt / forbid command prefixes outside the sandbox).
- ChatGPT Work on the web runs code in a managed, isolated environment and doesn't expose the local sandbox or approval-mode selector.
- `approvals_reviewer = "auto_review"` only changes who reviews requests that already need approval; it never changes the sandbox boundary itself.

## Related

- [Agent approvals & security](./agent-approvals-security.md)
- [Auto-review](./auto-review.md)
- [Permission profiles](./permission-profiles.md)
- [Windows sandbox](./windows-sandbox.md)
