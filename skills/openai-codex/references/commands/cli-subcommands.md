# Codex CLI subcommands

Per-command details and options for `codex exec`, `review`, `cloud`, `mcp`, `plugin`, `sandbox`, `agents`, `queue`, `app-server`, `resume`, `fork`, `login`, `update` and others.

## Signature / Usage

```bash
codex queue --thread <SESSION_ID> --message "Run the remaining checks"
codex exec --worktree "implement the next step"
codex exec fork <SESSION_ID> --worktree "try an alternative approach"
codex archive <SESSION>
codex delete <SESSION_UUID> --force
codex completion zsh > "${fpath[1]}/_codex"
```

## Options / Props

`codex exec` (alias `codex e`):

| Name | Type | Description |
|------|------|-------------|
| `PROMPT` | string \| `-` | Initial instruction; `-` pipes the prompt from stdin. |
| `--image, -i` | path[,path...] | Attach images to the first message. |
| `--model, -m` | string | Override the configured model. |
| `--oss` / `--local-provider` | boolean / lmstudio \| ollama | Local open source provider; exits with an error if neither `--local-provider` nor `oss_provider` is set. |
| `--sandbox, -s` | read-only \| workspace-write \| danger-full-access | Sandbox policy; defaults to configuration. |
| `--profile, -p` | string | Layer `$CODEX_HOME/profile-name.config.toml`. |
| `--approve-for-me, --not-so-yolo` | boolean | Automatic approval review; conflicts with `--sandbox` and `--yolo`. |
| `--dangerously-bypass-approvals-and-sandbox, --yolo` | boolean | Bypass approvals and sandboxing; only in an isolated runner. |
| `--dangerously-bypass-hook-trust` | boolean | Run enabled hooks without persisted hook trust. |
| `--cd, -C` | path | Set the workspace root. |
| `--worktree` | boolean | Managed Git worktree; local only; can't combine with `resume`, `review`, `--ephemeral`, `--ignore-user-config`. |
| `--skip-git-repo-check` | boolean | Allow running outside a Git repository. |
| `--ephemeral` | boolean | Don't persist session rollout files. |
| `--ignore-user-config` | boolean | Don't load `$CODEX_HOME/config.toml` (auth still uses `CODEX_HOME`). |
| `--ignore-rules` | boolean | Don't load user or project execpolicy `.rules` files. |
| `--output-schema` | path | JSON Schema file describing the expected final response shape. |
| `--color` | always \| never \| auto (default `auto`) | ANSI color in stdout. |
| `--json, --experimental-json` | boolean | Newline-delimited JSON events instead of formatted text. |
| `--output-last-message, -o` | path | Write the final assistant message to a file. |
| `-c, --config` | key=value | Inline config override (repeatable). |

`codex exec resume [SESSION_ID]`: `--last` (most recent session in cwd), `--all` (any directory), `--image, -i`, optional follow-up `PROMPT` (`-` reads stdin). `codex exec fork <SESSION_ID> [PROMPT]` copies a saved session (UUID or name); with no prompt the fork is created without starting a turn. A prompt is required with images, `--output-schema`, `--output-last-message`, or `--ephemeral`.

`codex review`:

| Name | Type | Description |
|------|------|-------------|
| `PROMPT` | string \| `-` | Custom review instructions; `-` reads stdin. |
| `--uncommitted` | boolean | Review staged, unstaged, and untracked changes. |
| `--base` | branch | Review changes against the base branch. |
| `--commit` | SHA | Review the changes introduced by a commit. |
| `--title` | string | Commit title shown in the review summary; requires `--commit`. |
| `--strict-config` | boolean | Error on unrecognized `config.toml` fields. |

`--uncommitted`, `--base`, `--commit`, and a custom `PROMPT` conflict with one another.

`codex resume`: `SESSION_ID` (uuid or name), `--last`, `--all`, `--include-non-interactive`. Accepts model and sandbox overrides but not `--worktree`. `codex fork`: `SESSION_ID` (uuid), `--last`, `--all`; fork into a managed worktree with `codex fork <SESSION_ID> --worktree` (explicit session ID required, no `--last`/picker). When the cwd differs from the session's saved directory Codex asks which to use; `tui.resume_cwd` = `"current"` or `"session"` skips the prompt, and an explicit `--cd` takes precedence.

`codex archive` / `codex unarchive` / `codex delete`: `SESSION` (ID or name; IDs take precedence), `--remote`, `--remote-auth-token-env`; `delete` also has `--force` (UUID only; names still prompt).

`codex cloud`: default opens an interactive picker. `codex cloud exec`: `QUERY`, `--env ENV_ID` (required), `--attempts 1-4` (default 1). `codex cloud list`: `--env`, `--limit 1-20` (default 20), `--cursor`, `--json` (payload has `tasks` array and optional `cursor`; each task has `id`, `url`, `title`, `status`, `updated_at`, `environment_id`, `environment_label`, `summary`, `is_review`, `attempt_total`).

`codex app-server`:

| Name | Type | Description |
|------|------|-------------|
| `--stdio` | boolean | Alias for `--listen stdio://`; mutually exclusive with `--listen`. |
| `--listen` | stdio:// \| ws://IP:PORT \| unix:// \| unix://PATH \| off (default `stdio://`) | Transport listener URL. |
| `--code-mode-host` | ws://HOST/PATH \| wss://HOST/PATH | Connect to a remote Code Mode host; separate from `--listen`, shared across threads. Use `ws://` only for localhost or SSH-forwarded hosts. |
| `--ws-auth` | capability-token \| signed-bearer-token | WebSocket client auth mode; disabled if omitted (non-local listeners warn at startup). |
| `--ws-token-file` / `--ws-token-sha256` | absolute path / hex SHA-256 | Capability-token source / expected digest. |
| `--ws-shared-secret-file` | absolute path | HMAC secret for signed JWT bearer tokens; required with `signed-bearer-token`. |
| `--ws-issuer` / `--ws-audience` | string | Expected `iss` / `aud` claims. |
| `--ws-max-clock-skew-seconds` | number (default 30) | Clock skew allowance for `exp`/`nbf`. |
| `--analytics-default-enabled` | boolean | Default analytics to enabled for first-party clients unless the user opts out. |

`codex remote-control`: bare command starts remote control via the managed background server (foreground fallback); `--no-daemon` forces foreground (bare command only); `start` / `stop` / `pair` (prints a short-lived pairing code; JSON has `pairingCode`, `manualPairingCode`, `environmentId`, `expiresAt`); `--json` on any. `codex agents`: `--remote <URL>`, `--cd <DIR>`; no `--no-daemon`. `codex queue`: `--thread` (UUID or exact name), `--message`, `--remote`, `--remote-auth-token-env`; no image attachments.

`codex app [PATH]` (default `.`; `--download-url` installer override). `codex debug models [--bundled]`; `codex debug prompt-input [PROMPT] [--image]`; `codex debug app-server send-message-v2 <USER_MESSAGE>` (initializes with `experimentalApi: true`). `codex apply <TASK_ID>` (exits non-zero if `git apply` fails). `codex completion [SHELL]` (bash default; bash \| zsh \| fish \| power-shell \| elvish). `codex doctor`: `--json`, `--summary`, `--all`, `--no-color`, `--ascii`. `codex features`: `list` / `enable <feature>` / `disable <feature>` (persist in `$CODEX_HOME/config.toml`; no `--profile`). `codex execpolicy check`: `--rules, -r` (repeatable), `--pretty`, `COMMAND...`.

`codex login`: `--with-api-key`, `--with-access-token` (read from stdin), `--device-auth`, `codex login status` (exit 0 when logged in). `codex logout` has no flags.

`codex mcp`: `list [--json]`, `get <name> [--json]`, `add <name> (-- <command...> | --url <value>)`, `remove <name>`, `login <name> [--scopes a,b]`, `logout <name>`. `add` options: `--env KEY=VALUE` (stdio, repeatable), `--url`, `--bearer-token-env-var`, `--oauth-client-id`, `--oauth-resource` (the last two require `--url`). OAuth actions work only for streamable HTTP servers that support OAuth.

`codex plugin`: `add <plugin[@marketplace]> [--marketplace, -m NAME] [--json]`, `list [--marketplace NAME] [--available --json] [--json]`, `remove <plugin[@marketplace]>`, `marketplace`. `codex plugin marketplace`: `add <source> [--ref REF] [--sparse PATH] [--json]` (GitHub `owner/repo[@ref]`, HTTP(S)/SSH Git URL, or local root; `--sparse` Git only, repeatable), `list`, `upgrade [name]`, `remove <name>`.

`codex sandbox` (macOS Seatbelt / Linux bubblewrap + seccomp / native Windows): `--profile, -p NAME`, `--permission-profile, -P NAME`, `--cd, -C DIR` (requires `--permission-profile`), `--include-managed-config` (requires `--permission-profile`), `--config, -c`, `COMMAND...` after `--`. macOS only: `--allow-unix-socket PATH` (repeatable), `--log-denials`.

## Notes

- `codex execpolicy` is in preview. `codex app-server` is mainly for development and debugging and may change without notice.
- `codex update` applies only when the installed release supports self-update; debug builds print a message to install a release build.
- Pair `--json` with `--output-last-message` in CI to capture machine-readable progress plus a final summary.
- Source: https://learn.chatgpt.com/docs/developer-commands?surface=cli (fetched 2026-10).

## Related

- [cli-global-flags.md](./cli-global-flags.md)
- [cli-slash-commands.md](./cli-slash-commands.md)
