<!-- source: https://code.claude.com/docs/en/web-quickstart.md / last verified: 2026-10-17 -->

# Get started with Claude Code in the cloud

Run Claude Code in the cloud from your browser or phone at [claude.ai/code](https://claude.ai/code). Connect a GitHub repository, submit a task, and review the PR without local setup. Available on Pro, Max, and Team plans, and for Enterprise users with premium seats or Chat + Claude Code seats.

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

- Onboarding creates a **Default** cloud environment with `Trusted` network access (reaches common package registries and allowlisted domains only). Pro and Max get **Default** created automatically. On Team and Enterprise, onboarding shows a **Create your first cloud environment** form (click **Create & finish**), unless an Owner turned on Quick setup, in which case it creates **Default** for you.
- On Team and Enterprise, **Sign in with GitHub** works only after an Owner turns on the GitHub connector at Organization settings > Connectors; until then the page shows "GitHub access is required for Claude Code cloud sessions". Quick setup (Organization settings > Claude Code) is a separate, optional toggle that makes `/web-setup` available.
- `/web-setup` requires the Claude Code CLI signed in via `/login` with a claude.ai account; API-key auth doesn't count.
- Organizations with Zero Data Retention enabled, or with the HIPAA configuration applied, cannot use `/web-setup` or other cloud session features. Organizations that use customer-managed encryption keys (CMEK) can't start cloud sessions either.
- Permission modes available in a new cloud session: Auto (when your organization allows auto mode and the selected model supports it), Accept edits, and Plan. Manual and Bypass permissions are not offered.
- Troubleshooting: when an administrator has disabled cloud sessions, `/web-setup` returns `Cloud sessions are disabled by your organization's policy`; before v2.1.268 this case returned `Unknown command: /web-setup`. Run `/web-setup` inside the Claude Code CLI, not your shell.

## Related

- [claude-code-on-the-web](./claude-code-on-the-web.md)
- [mobile](./mobile.md)
