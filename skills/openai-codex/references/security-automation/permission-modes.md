# Permission modes

The high-level modes exposed in the ChatGPT desktop app, IDE extension, and CLI (`/permissions`) that set the boundary for what Codex can do on its own versus what needs review — the user-facing counterpart to the `sandbox_mode`/`approval_policy` or `default_permissions`/`[permissions]` config systems.

## Signature / Usage

Use the permissions control below the composer in the ChatGPT desktop app or IDE extension, or run `/permissions` in the CLI.

## Options / Props

| Name | Description |
|------|-------------|
| Ask for approval | Recommended starting point. Codex works within the current workspace and pauses before reaching beyond that boundary. |
| Approve for me | Called **Auto-review** in settings. Keeps the same workspace boundary as "Ask for approval"; sends requests that would cross that boundary to automatic review instead of pausing for a human. |
| Full access | Removes the workspace boundary; available only after being enabled. |

## Notes

- Two controls work together: the **sandbox** defines which files/network resources Codex can access, and **approvals** determine when Codex pauses or sends a request to automatic review. Changing who reviews a request (e.g. selecting Approve for me) does not by itself expand the sandbox.
- **Ask for approval** is always available. To add **Approve for me** or **Full access** to the menu, turn them on under **Settings > General > Permissions** in the ChatGPT desktop app first — this makes the mode available, it doesn't select it or change an existing chat.
- Available modes can depend on local configuration and organization-managed requirements; a disallowed mode appears disabled.
- This page describes the product-level mode selector. For the underlying config keys, see [Sandbox](./sandbox.md) (`sandbox_mode`/`approval_policy`) and [Permission profiles](./permission-profiles.md) (`default_permissions`/`[permissions.<name>]`) — the two config systems do not compose with each other.

## Related

- [Sandbox](./sandbox.md)
- [Permission profiles](./permission-profiles.md)
- [Auto-review](./auto-review.md)
- [Agent approvals & security](./agent-approvals-security.md)
