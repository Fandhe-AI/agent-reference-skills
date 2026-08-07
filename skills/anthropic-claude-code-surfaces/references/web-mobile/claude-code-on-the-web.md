<!-- source: https://code.claude.com/docs/en/claude-code-on-the-web.md / last verified: 2026-08-07 -->

# Use Claude Code on the web

Move sessions between web and terminal with `--cloud` and `--teleport`, manage and share sessions, and auto-fix pull requests from Anthropic's cloud infrastructure.

## Signature / Usage

```bash
# Terminal -> web: create a new cloud session for the current repo
claude --cloud "Fix the flaky test in auth.spec.ts"

# Plan locally, execute remotely
claude --permission-mode plan
claude --cloud "Execute the migration plan in docs/migration-plan.md"

# Web -> terminal: pull a cloud session into your terminal
claude --teleport
claude --teleport <session-id>
# or inside an existing session
/teleport
```

`/tasks` lists background cloud sessions; press `t` to teleport into one. `--remote` is a deprecated alias for `--cloud`; `--remote-control` is unrelated (see Remote Control).

## Options / Props

| Command / Flag | Description |
| --- | --- |
| `claude --cloud "<prompt>"` | Create a new cloud session from the current repo's GitHub remote at the current branch |
| `CCR_FORCE_BUNDLE=1 claude --cloud "..."` | Force bundling the local repo instead of using GitHub, even when GitHub is connected |
| `claude --teleport [session-id]` | Pull a cloud session (and its branch) into the local terminal |
| `/teleport` or `/tp` | Same as `--teleport`, run inside an existing session |
| `/autofix-pr` | Turn on Auto-fix for the PR on the current branch |
| `/compact`, `/context` | Work in cloud sessions for context management |
| `/clear` | Not available in cloud sessions; start a new session from the sidebar instead |

## Notes

- Cloud sessions require claude.ai account authentication; not available via Amazon Bedrock, Google Cloud's Agent Platform, or Microsoft Foundry.
- GitHub access can come from the Claude GitHub App (browser onboarding) or `/web-setup` syncing a local `gh` token; either grants access to any repo the connecting GitHub account can see. The GitHub App is additionally required for Auto-fix's PR webhooks.
- Bundled (non-GitHub) repositories must be a git repo with a commit, under 100 MB, and cannot push back to a remote.
- Teleport requires: clean local git state, a checkout of the same repository, the session's branch already pushed, and the same claude.ai account.
- Auto-fix reacts to CI failures and review comments but not to merge conflicts (GitHub emits no webhook for those); ask Claude to rebase instead.
- Session sharing visibility: Private/Team for Enterprise and Team accounts, Private/Public for Max and Pro accounts.
- Cloud sessions fail authentication if the organization has IP allowlisting enabled, since traffic originates from Anthropic-managed infrastructure.

## Related

- [web-quickstart](./web-quickstart.md)
- [mobile](./mobile.md)
