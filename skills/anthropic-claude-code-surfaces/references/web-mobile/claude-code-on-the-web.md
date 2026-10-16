<!-- source: https://code.claude.com/docs/en/claude-code-on-the-web.md / last verified: 2026-10-17 -->

# Use Claude Code in the cloud

Run Claude Code sessions in the cloud from your browser, phone, Desktop app, or terminal, move them with `--cloud` and `--teleport`, and auto-fix pull requests. Available on Pro, Max, and Team plans, plus Enterprise users with premium seats or Chat + Claude Code seats. Sessions run on Anthropic-managed infrastructure or on an organization self-hosted environment, and can start from the browser (claude.ai/code), mobile, Desktop (select Cloud), the terminal (`claude --cloud`), or routines.

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

```bash
# Send a follow-up to a running cloud session from any logged-in machine (posts one message and exits)
claude -p "your message" --cloud <session-id>
echo "your message" | claude -p --cloud <session-id>
claude -p "your message" --cloud <session-id> --output-format json   # {ok, session_id, url}
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
| `claude -p "<msg>" --cloud <session-id>` | Queue a follow-up message into an existing cloud session. `<session-id>` is `session_...`, `cse_...`, or a `claude.ai/code/<id>` URL; message may come from stdin; `--output-format json` returns `{ok, session_id, url}` (`{ok: false, session_id, error}` on failure); `stream-json` is unsupported. Requires the org `allow_remote_sessions` policy |
| `/compact`, `/context` | Work in cloud sessions for context management |
| `/clear` | Not available in cloud sessions; start a new session from the sidebar instead |
| `/model`, `/effort`, `/color`, `/rename` | Take the value as an argument (for example `/model sonnet`) instead of opening the terminal picker |
| `/fast` | Toggles fast mode for the session when available on your account (v2.1.271+ in the session's environment) |
| `/config` | In the browser, opens the Claude Code section of your settings; text after the command is ignored |

## Notes

- Cloud sessions require claude.ai account authentication; not available via Amazon Bedrock, Google Cloud's Agent Platform, or Microsoft Foundry.
- GitHub access can come from the Claude GitHub App (browser onboarding) or `/web-setup` syncing a local `gh` token; either grants access to any repo the connecting GitHub account can see. The GitHub App is additionally required for Auto-fix's PR webhooks.
- Bundled repositories (no git remote, or a github.com repo without the Claude GitHub App) must be a git repo with at least one commit. A bundle over 100 MB falls back to the current branch only, then to a single squashed snapshot of the working tree, and fails if that is still too large. Untracked files are not included.
- Bundle and sensitive files: on macOS, Linux, and WSL, uncommitted changes to credential-like files (`.env`, `*.tfvars`, `id_rsa`, `*.pem`) and to files managed by a git filter such as Git LFS are left out, with a `Left on this machine:` notice. Native Windows uploads uncommitted changes to tracked files as they are. The upload needs git 2.31+ and a supported checkout layout on macOS, Linux, and WSL; otherwise it prints an error containing `Not uploading this working tree:`.
- Bundle sessions can push to a GitHub remote when your GitHub connection has push access to that repository. Non-GitHub hosts (GitLab, Bitbucket) can't receive pushes; send them as a bundle with `CCR_FORCE_BUNDLE=1`.
- Teleport requires: clean local git state, a checkout of the same repository, the session's branch already pushed, and the same claude.ai account. Inside a cloud session, `/teleport` prints the exact `claude --teleport <session-id>` command (v2.1.223+ in the session's environment).
- The diff view compares against the session's base branch by default; use **Compare against** to pick another branch. Click the ✕ on a queued message to take it back into the message box.
- Cloud sessions set `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` themselves, overriding one you add to the environment; use `CLAUDE_CODE_AUTO_COMPACT_WINDOW` or `/autocompact` to change the auto-compact window instead.
- Many cloud sessions for one body of work: see the Projects page (`claude-projects.md`), where Claude starts and tracks them for you.
- Auto-fix reacts to CI failures and review comments but not to merge conflicts (GitHub emits no webhook for those); ask Claude to rebase instead.
- Session sharing visibility: Private/Team for Enterprise and Team accounts, Private/Public for Max and Pro accounts.
- Cloud sessions on Anthropic-hosted environments fail authentication if the organization has IP allowlisting enabled, since traffic originates from Anthropic-managed infrastructure. Sessions in a self-hosted environment call the API from your own network.
- Organizations with ZDR or the HIPAA configuration can't use `/web-setup` or cloud sessions; organizations using customer-managed encryption keys (CMEK) can't start cloud sessions either.

## Related

- [web-quickstart](./web-quickstart.md)
- [mobile](./mobile.md)
