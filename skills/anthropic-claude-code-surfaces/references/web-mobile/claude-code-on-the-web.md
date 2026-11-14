<!-- source: https://code.claude.com/docs/en/claude-code-on-the-web.md / last verified: 2026-11-14 -->

# Use Claude Code in the cloud

Run Claude Code sessions in the cloud from your browser, phone, Desktop app, or terminal, move them with `--cloud` and `--teleport`, and auto-fix pull requests. Available on Pro, Max, Ultra, and Team plans, plus Enterprise users with premium seats or Chat + Claude Code seats. If custom roles govern your access, you also need a role with the cloud sessions permission (Owner adds it at Organization settings > Roles). Sessions run on Anthropic-managed infrastructure or on an organization self-hosted environment, and can start from the browser (claude.ai/code), mobile, Desktop (select Cloud), the terminal (`claude --cloud`), or routines.

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
| `/compact`, `/context`, `/clear` | Work in cloud sessions for context management (`/clear` starts a fresh conversation in the same cloud session; `/compact` accepts focus instructions) |
| `/autocompact` | With a token count, changes the auto-compact window in a session where `CLAUDE_CODE_AUTO_COMPACT_WINDOW` isn't set |
| `/plugin`, `/resume` | Terminal-only commands; not available in cloud sessions |
| `/model`, `/effort`, `/color`, `/rename` | Take the value as an argument (for example `/model sonnet`) instead of opening the terminal picker |
| `/fast` | Toggles fast mode for the session when available on your account (v2.1.271+ in the session's environment) |
| `/config` | In the browser at claude.ai/code, opens **Settings > Code** or **Settings > Claude Code** instead of setting a value. To change a setting for a cloud session, set an environment variable on the environment, or commit the key to the repository's `.claude/settings.json` (single repository outside a project) |

## Notes

- `--cloud` requires an Anthropic account (claude.ai sign-in via `claude auth login`); not available when configured for Amazon Bedrock, Google Cloud's Agent Platform, or another third-party provider. An LLM gateway configured only via `ANTHROPIC_BASE_URL` doesn't count as a third-party provider, but you still need to sign in. The org `allow_remote_sessions` policy must be enabled (Owner: claude.ai/admin-settings/claude-code). The CLI shows a live setup checklist while the container starts and queues messages typed during provisioning. `--cloud` works with a single repository at a time.
- CLI handoff is one-way: `--teleport` pulls cloud sessions into the terminal, but an existing terminal session can't be pushed to the cloud (the Desktop app can, from its **Open in** menu). The cloud VM clones your current directory's GitHub remote at the current branch, so push first; if the branch isn't on GitHub the CLI prints `Branch <name> is not on GitHub` and the session starts from a pushed commit or the default branch instead.
- GitHub access: the **Claude GitHub App** (browser onboarding) reaches any public repo plus private repos where the App is installed; `/web-setup` (syncs your local `gh` token) reaches any repo that token can access. Auto-fix needs the GitHub App on the repository; threads in a Project need it too, whichever method you used. In Anthropic-hosted environments GitHub credentials stay encrypted on Anthropic's servers and never enter the VM; operations go through the GitHub proxy.
- Quick setup (Team and Enterprise, off by default; an Owner toggles it at Organization settings > Claude Code): makes `/web-setup` available, skips the GitHub App install prompt in onboarding, and creates the **Default** environment for members.
- Bundled repositories (no git remote, or a github.com repo without the Claude GitHub App) must be a git repo with at least one commit. A bundle over 100 MB falls back to the current branch only, then to a single squashed snapshot of the working tree, and fails if that is still too large. Untracked files are not included.
- Bundle and sensitive files: on macOS, Linux, and WSL, uncommitted changes to credential-like files (`.env`, `*.tfvars`, `id_rsa`, `*.pem`) and to files managed by a git filter such as Git LFS are left out, with a `Left on this machine:` notice. Native Windows uploads uncommitted changes to tracked files as they are. The upload needs git 2.31+ and a supported checkout layout on macOS, Linux, and WSL; otherwise it prints an error containing `Not uploading this working tree:`.
- Bundle sessions can push to a GitHub remote when your GitHub connection has push access to that repository. Non-GitHub hosts (GitLab, Bitbucket) can't receive pushes; send them as a bundle with `CCR_FORCE_BUNDLE=1`.
- Teleport requires: clean local git state (it prompts to stash), a checkout of the same repository (not a fork), the session's branch already pushed, and the same claude.ai account. Other entry points: `/tasks` then `t`, **Open in > Terminal** at claude.ai/code, and `/teleport` inside a cloud session, which prints the exact `claude --teleport <session-id>` command. `--resume` doesn't list cloud sessions. Teleport fetches never wait for input: password, passphrase, or new-SSH-host prompts make the fetch fail. A compacted cloud session continues in the terminal from its summary, and new work in the terminal stays local (start `/remote-control` to keep steering from your phone).
- Bundle uploads: `Branch ... is not on GitHub`, `Not uploading this working tree:` and the refusal for unsupported git settings (such as `core.attributesFile` in an included config) are the common failure messages. Linked worktrees with sparse checkout (including those created with `worktree.sparsePaths`), submodules, `--separate-git-dir` / `--shared` / `--reference` clones, `core.worktree`, reftable repos, and git config that includes a file inside the working tree aren't uploaded on macOS, Linux, and WSL; start from a plain main checkout. A partial clone made with `git clone --filter` uploads as a snapshot without history if it holds every tracked file.
- Diffs are computed from raw git blob content, so diff drivers and `textconv` filters don't apply. With the base-branch comparison, changes made by commands Claude ran (such as a formatter) or made after the last push can be missing; ask Claude to commit and push.
- Permission modes are chosen from the mode dropdown at task creation and during the session; a session resumes in the mode it was in after an expired environment or a self-hosted runner release.
- Plugin suggestions: Claude may show a card with an **Add** button (enables the plugin for your claude.ai account). To turn off, deny `SearchPlugins` and `SuggestPluginInstall` under `permissions.deny` in the repository's `.claude/settings.json`; this is ignored when managed settings set `allowManagedPermissionRulesOnly`.
- Subagents work as locally (repo `.claude/agents/` loads outside a project's threads); agent teams are off by default and enabled with `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` in the environment variables.
- Environment expired: sessions stop after inactivity (including while waiting on MCP connector approval or sign-in). Reopening provisions a fresh VM and restores conversation history, but not running shell commands, subagents (some can be resumed), session-scoped scheduled tasks, or a waiting `/loop`.
- Sharing: Enterprise and Team sessions are **Private** or **Team** (repository access verification on by default; Claude in Slack sessions are shared with Team visibility); Max, Ultra, and Pro sessions are **Private** or **Public** (verification off by default). Archived sessions are at claude.ai/code/sessions (**Archived** tab, **Unarchive**); delete is permanent.
- Auto-fix is enabled from the **⋮** menu next to the PR in the **Changes** card, via `/autofix-pr` on the PR's branch (spawns a cloud session), by telling Claude in the mobile app, or by pasting a PR URL. Replies posted on GitHub use your account but are labeled as Claude Code, and can trigger comment-triggered automation (Atlantis, Terraform Cloud, `issue_comment` Actions).
- Errors sending to a cloud session (`claude -p ... --cloud <id>`): provider not supported (unset e.g. `CLAUDE_CODE_USE_BEDROCK`, run `claude auth login`), `Cloud sessions are disabled by your organization's policy`, `Couldn't verify your organization's policy for cloud sessions` (retry on a working network), `Attaching to an existing cloud session is not enabled for your account` (use `-p`), `Session not found: <id>`, and `cloud session <id> is archived and cannot accept new messages`. `Unable to get organization UUID` and similar mean a non-claude.ai sign-in: run `claude auth login`. Rewind to an older message fails on self-hosted runners older than v2.1.246.
- Limits: shared rate limits with all Claude usage; command / SessionStart hook timeouts are configurable and a setup script is cached only when it finishes in roughly five minutes. Repository cloning and PR creation in Anthropic-hosted environments require GitHub (GitHub Enterprise Server is supported on Team and Enterprise); GitLab/Bitbucket repos can be sent as a bundle with `CCR_FORCE_BUNDLE=1` but can't be pushed back.
- Source: https://code.claude.com/docs/en/claude-code-on-the-web.md (fetched 2026-11-14)
- The diff view compares against the session's base branch by default; use **Compare against** to pick another branch. Click the ✕ on a queued message to take it back into the message box.
- Cloud sessions set `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` themselves, overriding one you add to the environment; use `CLAUDE_CODE_AUTO_COMPACT_WINDOW` or `/autocompact` to change the auto-compact window instead.
- Many cloud sessions for one body of work: see the Projects page (`claude-projects.md`), where Claude starts and tracks them for you.
- Auto-fix reacts to CI failures and review comments but not to merge conflicts (GitHub emits no webhook for those); ask Claude to rebase instead.
- Organizations with ZDR or the HIPAA configuration can't use `/web-setup` or cloud sessions; organizations using customer-managed encryption keys (CMEK) can't start cloud sessions either.

## Related

- [web-quickstart](./web-quickstart.md)
- [mobile](./mobile.md)
