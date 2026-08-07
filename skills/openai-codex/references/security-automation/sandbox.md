# Sandbox

The boundary that lets Codex act autonomously without unrestricted machine access. Applies to spawned commands (`git`, package managers, test runners), not just built-in file operations, and works together with the separate approval-policy control.

## Signature / Usage

```toml
# config.toml
sandbox_mode    = "workspace-write"   # read-only | workspace-write | danger-full-access
approval_policy = "on-request"        # untrusted | on-request | never
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
| `untrusted` | approval policy | Asks before running commands outside its trusted set. |
| `on-request` | approval policy | Works inside the sandbox by default, asks when it must go beyond it. |
| `never` | approval policy | Never stops for approval prompts. |
| `sandbox_workspace_write.writable_roots` | table | Extends writable directories beyond the workspace without disabling the sandbox entirely. |

## Notes

- Prerequisites: macOS works out of the box (Seatbelt). Linux/WSL2 need `bubblewrap` installed (`apt install bubblewrap` / `dnf install bubblewrap`); Codex falls back to a bundled helper requiring unprivileged user-namespace support if no `bwrap` binary is on `PATH`. Native Windows uses the Windows sandbox; WSL2 uses the Linux sandbox implementation.
- Full access = `sandbox_mode = "danger-full-access"` + `approval_policy = "never"`. The lower-risk automation preset is `workspace-write` + `on-request` (or `--sandbox workspace-write --ask-for-approval on-request`).
- For a workflow-specific exception, prefer command-prefix rules over broadly expanding sandbox access.
- **This page describes the older `sandbox_mode`/`approval_policy` model.** It does not compose with the newer permission-profile system (`default_permissions` / `[permissions.<name>]`) — see the mutual-exclusion note in `permission-profiles.md`.
- `approvals_reviewer = "auto_review"` only changes who reviews requests that already need approval; it never changes the sandbox boundary itself.

## Related

- [Agent approvals & security](./agent-approvals-security.md)
- [Auto-review](./auto-review.md)
- [Permission profiles](./permission-profiles.md)
- [Windows sandbox](./windows-sandbox.md)
