# Permissions

Permissions control how ChatGPT (in the desktop app) and Codex (in the CLI or IDE) handle local actions, such as editing files, running commands, and using the internet. The mode you choose sets the boundary for what can happen on its own and what needs review.

## Signature / Usage

Use the permissions control below the composer in the ChatGPT desktop app or IDE extension, or run `/permissions` in the CLI.

## Options / Props

| Name | Description |
|------|-------------|
| Ask for approval | Recommended starting point. Works within the current workspace and pauses before reaching beyond that boundary. |
| Approve for me | Sends eligible approval requests to automatic review (called Auto-review elsewhere). Keeps the same workspace boundary as "Ask for approval". Check that it's selected for the current chat; having it available doesn't mean it's selected. |
| Full access | Removes the workspace boundary. |

## Notes

- Two controls work together: the **sandbox** defines which files and network resources can be accessed, and **approvals** determine when the client pauses before an action or sends the request to automatic review. Changing who reviews a request (e.g. Approve for me) doesn't expand the sandbox.
- Available modes depend on your app version, execution environment, local configuration, and your organization's requirements. A mode can be disabled or omitted when unavailable, and managed requirements can also restrict Ask for approval. If **Approve for me** is missing or disabled, see the permission troubleshooting section of the reference troubleshooting page.
- This page describes the product-level mode selector (desktop app, CLI, IDE). For the underlying config keys, see [Sandbox](./sandbox.md) and [Permission profiles](./permission-profiles.md) (`default_permissions`, `[permissions.<name>]`, `approval_policy`, `sandbox_mode`) and [Auto-review](./auto-review.md).

## Related

- [Sandbox](./sandbox.md)
- [Permission profiles](./permission-profiles.md)
- [Auto-review](./auto-review.md)
- [Agent approvals & security](./agent-approvals-security.md)
