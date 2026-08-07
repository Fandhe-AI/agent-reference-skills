<!-- source: https://code.claude.com/docs/en/web-quickstart.md / last verified: 2026-08-07 -->

# Get started with Claude Code on the web

Run Claude Code in the cloud from your browser or phone at [claude.ai/code](https://claude.ai/code). Connect a GitHub repository, submit a task, and review the PR without local setup.

## Signature / Usage

```bash
# Connect from your terminal instead of the browser
gh auth login
claude   # then run /login, then /web-setup

# Start a cloud task from the terminal
claude --cloud "Fix the authentication bug in src/auth/login.ts"
```

Sessions run on an Anthropic-managed VM: clone and prepare (runs the environment's setup script), configure network per the environment's access level, work (Claude edits, runs tests), then push a branch to GitHub. The session stays open after the branch is pushed so you can keep iterating or create a PR.

## Options / Props

| Name | Description |
| --- | --- |
| `prompt` (query param, alias `q`) | Prefill the prompt text in the new-session form |
| `prompt_url` | URL to fetch prompt text from (ignored if `prompt` is set) |
| `repositories` (alias `repo`) | Comma-separated `owner/repo` slugs to preselect |
| `environment` | Name or ID of the cloud environment to preselect |

## Notes

- Onboarding creates a **Default** cloud environment with `Trusted` network access (reaches common package registries and allowlisted domains only).
- `/web-setup` requires the Claude Code CLI signed in via `/login` with a claude.ai account; API-key auth doesn't count.
- Organizations with Zero Data Retention enabled cannot use `/web-setup` or other cloud session features.
- Permission modes available in a new cloud session: Accept edits (default) and Plan. Manual and Bypass permissions are not offered.

## Related

- [claude-code-on-the-web](./claude-code-on-the-web.md)
- [mobile](./mobile.md)
