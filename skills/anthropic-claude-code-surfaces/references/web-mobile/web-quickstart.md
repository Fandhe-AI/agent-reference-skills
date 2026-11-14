<!-- source: https://code.claude.com/docs/en/web-quickstart.md / last verified: 2026-11-14 -->

# Get started with Claude Code in the cloud

Run Claude Code in the cloud from your browser or phone at [claude.ai/code](https://claude.ai/code). Connect a GitHub repository, submit a task, and review the PR without local setup. Available on Pro, Max, Ultra, and Team plans, and for Enterprise users with premium seats or Chat + Claude Code seats. You can also start a session from the Claude mobile app, the Desktop app, or `claude --cloud`.

## Signature / Usage

```bash
# Connect from your terminal instead of the browser
gh auth login
claude   # then run /login, then /web-setup

# Start a cloud task from the terminal
claude --cloud "Fix the authentication bug in src/auth/login.ts"
```

Sessions run on an Anthropic-managed VM by default: clone and prepare (runs the environment's setup script), configure network per the environment's access level, work (Claude edits, runs tests), then push a branch to GitHub. The session stays open after the branch is pushed so you can keep iterating or create a PR. In a self-hosted environment, the clone and everything after it run on your organization's own runners, where network boundaries, setup, and push behavior are operator-configured.

## Options / Props

| Name | Description |
| --- | --- |
| `prompt` (query param, alias `q`) | Prefill the prompt text in the new-session form |
| `prompt_url` | URL to fetch prompt text from (ignored if `prompt` is set) |
| `repositories` (alias `repo`) | Comma-separated `owner/repo` slugs to preselect |
| `environment` | Name or ID of the cloud environment to preselect |

## Notes

- Onboarding creates a **Default** cloud environment with **Limited** network access (reaches common package registries and allowlisted domains only). Pro, Max, and Ultra get **Default** created automatically. On Team and Enterprise, onboarding shows a **Create your first cloud environment** form (click **Create & finish**), unless an Owner turned on Quick setup, in which case it creates **Default** for you.
- On Team and Enterprise, **Sign in with GitHub** works only after an Owner turns on the GitHub connector at Organization settings > Connectors; until then the page shows "GitHub access is required for Claude Code cloud sessions". Quick setup (Organization settings > Claude Code) is a separate, optional toggle that makes `/web-setup` available.
- `/web-setup` requires the Claude Code CLI signed in via `/login` with a claude.ai account; API-key auth doesn't count.
- Organizations with Zero Data Retention enabled, or with the HIPAA configuration applied, cannot use `/web-setup` or other cloud session features. Organizations that use customer-managed encryption keys (CMEK) can't start cloud sessions either.
- Cloud sessions require a GitHub repository unless `--cloud` bundles your local repo. Cloud sessions keep running if you disconnect.
- Permission modes available in a new cloud session: Auto (when your organization allows auto mode and the selected model supports it), Accept edits, and Plan. Manual and Bypass permissions are not offered.
- Private repositories need the Claude GitHub App installed on the owning account or organization (public repositories can be cloned without it). Installing it also enables Auto-fix. If you connected with `/web-setup`, sessions reach every repository your `gh` token can access, but threads in a project still need the Claude GitHub App. `/web-setup` sends the `gh auth token` value to Anthropic (stored encrypted with your claude.ai account) after confirmation, and prints `Connected as <your-github-username>` on success; if you connected in the browser first, it warns that continuing replaces that connection.
- Remove the token by disconnecting GitHub at claude.ai/customize/connectors (cloud sessions lose GitHub access; local `gh` stays signed in). To invalidate the token itself, revoke the **GitHub CLI** entry under GitHub **Settings > Applications > Authorized OAuth Apps**.
- Starting a task: pick repositories (several allowed) and optionally a branch, then a permission mode (Auto, Accept edits, Plan), then describe the task. Each task gets its own session and branch. `/mobile` in the CLI shows a QR code for claude.ai/mobile.
- Review: the **Changes** card (for example `+42 -18`) opens the diff view, which compares against the base branch by default (**Compare against** to change). Hover a line and click **+** for inline comments, which are bundled with your next message. **Create PR** makes a PR with a generated title and description; right-click it and select **Create draft PR** to open drafts instead. The session stays live after the PR for further iteration or Auto-fix.
- Troubleshooting: `/web-setup` warns when the `gh` token lacks the `workflow` scope (run `gh auth refresh -s workflow`); it is hidden when authenticated with an API key or third-party provider (run `/login`), when Quick setup is off on Team and Enterprise, when cloud sessions are disabled by an administrator, or when ZDR / HIPAA applies. `Could not create a cloud environment` means automatic creation failed and `No cloud environment available` means the CLI predates automatic creation; run `/web-setup` or add an environment at claude.ai/code. A failed setup script (non-zero exit) can be debugged with `set -x`, and the roughly five-minute environment-cache budget can be met by running installs in parallel with `&` and `wait` or moving large downloads into a SessionStart hook. Closing the tab doesn't stop a session; archive or delete it from the sidebar.
- Source: https://code.claude.com/docs/en/web-quickstart.md (fetched 2026-11-14)
- Troubleshooting: when an administrator has disabled cloud sessions, `/web-setup` returns `Cloud sessions are disabled by your organization's policy`; before v2.1.268 this case returned `Unknown command: /web-setup`. Run `/web-setup` inside the Claude Code CLI, not your shell.

## Related

- [claude-code-on-the-web](./claude-code-on-the-web.md)
- [mobile](./mobile.md)
