<!-- source: https://code.claude.com/docs/en/cli-reference.md / last verified: 2026-08-07 -->

# CLI reference

Complete reference for the Claude Code command-line interface: commands and flags. `claude --help` doesn't list every flag, so absence from `--help` doesn't mean unavailable.

## Signature / Usage

```bash
claude "explain this project"
claude -p "explain this function"
cat logs.txt | claude -p "explain"
claude --continue
claude --resume auth-refactor
```

## CLI commands

| Command | Description |
| --- | --- |
| `claude` | Start interactive session |
| `claude "query"` | Start interactive session with initial prompt |
| `claude -p "query"` | Query via SDK, then exit |
| `cat file \| claude -p "query"` | Process piped content |
| `claude -c` / `claude -c -p "query"` | Continue most recent conversation in current directory |
| `claude -r "<session>" "query"` | Resume session by ID or name |
| `claude update` | Update to latest version |
| `claude gateway` | Start the self-hosted Claude apps gateway server (`--config gateway.yaml` required) |
| `claude install [version]` | Install/reinstall the native binary (`stable`, `latest`, or a version like `2.1.118`) |
| `claude auth login` | Sign in (`--email`, `--sso`, `--console`) |
| `claude auth logout` | Log out |
| `claude auth status` | Auth status as JSON (`--text` for readable); exit 0 logged in / 1 not |
| `claude agents` | Open agent view for background sessions (`--cwd`, `--json`, `--json --all`, `--permission-mode`, `--model`, `--effort`, `--agent`, `--settings`, `--add-dir`, `--plugin-dir`, `--mcp-config`) |
| `claude attach <id>` | Attach to a background session in this terminal |
| `claude auto-mode defaults` | Print built-in auto mode classifier rules as JSON (`--label <prefix>`, v2.1.208+) |
| `claude auto-mode reset` | Restore default auto mode config, removing `autoMode` from user settings (`-y`/`--yes`; v2.1.212+) |
| `claude daemon status` | Print background-session supervisor state/version/socket dir/worker count |
| `claude daemon stop --any` | Stop the supervisor and its sessions (`--keep-workers` to leave sessions running) |
| `claude doctor` | Read-only install/settings diagnostics without starting a session |
| `claude logs <id>` | Print recent output from a background session |
| `claude mcp` | Configure MCP servers |
| `claude mcp login <name>` | Run an MCP server's OAuth flow (`--no-browser` for SSH; v2.1.186+) |
| `claude mcp logout <name>` | Clear stored OAuth credentials for an MCP server (v2.1.186+) |
| `claude plugin` (alias `claude plugins`) | Manage plugins |
| `claude project purge [path]` | Delete local state for a project (`--dry-run`, `-y`/`--yes`, `-i`/`--interactive`, `--all`) |
| `claude remote-control` | Start a Remote Control server (server mode, no local interactive session) |
| `claude respawn <id>` | Restart a background session, keeping conversation intact (`--all`) |
| `claude rm <id>` | Remove a background session from the list (transcript stays on disk) |
| `claude setup-token` | Generate a long-lived OAuth token for CI/scripts |
| `claude stop <id>` (alias `claude kill`) | Stop a background session |
| `claude ultrareview [target]` | Run ultrareview non-interactively (`--json`, `--timeout <minutes>`, default 30) |

Mistyped subcommands get a "Did you mean" suggestion instead of starting a session. As of v2.1.199, a **leading** `--dangerously-skip-permissions`/`--allow-dangerously-skip-permissions` flag routes `daemon <subcommand>` correctly instead of being swallowed as the prompt text.

## CLI flags

| Flag | Description |
| --- | --- |
| `--add-dir` | Add additional working directories (file access only, not config discovery); persist via `permissions.additionalDirectories` |
| `--advisor <model>` | Enable the server-side advisor for this session (`opus`/`sonnet`/full ID; not `fable`) |
| `--agent` | Specify an agent for the session (overrides `agent` setting) |
| `--agents` | Define custom subagents via JSON (same fields as frontmatter, plus `prompt`) |
| `--allow-dangerously-skip-permissions` | Add `bypassPermissions` to the Shift+Tab cycle without starting in it |
| `--allowedTools`, `--allowed-tools` | Tools that execute without prompting |
| `--append-subagent-system-prompt` | Append text to every subagent's system prompt (print mode only; v2.1.205+) |
| `--append-system-prompt` | Append text to the default system prompt |
| `--append-system-prompt-file` | Append system prompt text from a file |
| `--autocompact <auto\|tokens>` | Set the auto-compact window for this session (v2.1.221+) |
| `--ax-screen-reader` | Screen-reader friendly flat-text output; forces classic renderer (v2.1.181+) |
| `--bare` | Minimal mode: skip hooks/skills/plugins/MCP/auto memory/CLAUDE.md discovery; sets `CLAUDE_CODE_SIMPLE` |
| `--betas` | Beta headers for API requests (API key users only) |
| `--bg`, `--background` | Start as a background agent, print session ID and return immediately; combine with `--exec` or `--agent`; cannot combine with `-p` |
| `--channels` | (Research preview) MCP servers whose channel notifications to listen for |
| `--chrome` / `--no-chrome` | Enable/disable Chrome browser integration |
| `--cloud` | Create a new web session on claude.ai |
| `--continue`, `-c` | Load the most recent conversation in the current directory |
| `--dangerously-load-development-channels` | Enable non-allowlisted channels for local development |
| `--dangerously-skip-permissions` | Skip permission prompts; equivalent to `--permission-mode bypassPermissions` |
| `--debug` | Debug mode with optional category filter, e.g. `--debug='mcp,startup'` or `--debug='!1p'` |
| `--debug-file <path>` | Write debug logs to a specific path; implicitly enables debug mode |
| `--disable-slash-commands` | Disable all skills and commands for this session |
| `--disallowedTools`, `--disallowed-tools` | Deny rules; bare tool name removes the tool, `"*"` removes all, `"mcp__*"` removes MCP tools |
| `--effort` | Effort level for the session: `low`/`medium`/`high`/`xhigh`/`max`/`ultracode` |
| `--exclude-dynamic-system-prompt-sections` | Move per-machine system-prompt sections into the first user message (improves cache reuse) |
| `--exec` | Run a shell command as a PTY-backed background job instead of a Claude session (use with `--bg`) |
| `--fallback-model` | Comma-separated fallback model chain, tried in order |
| `--fork-session` | On resume, create a new session ID instead of reusing the original |
| `--forward-subagent-text` | Emit subagent text/thinking as `assistant`/`user` messages with `parent_tool_use_id` (needs `--print --output-format stream-json`; v2.1.211+) |
| `--from-pr` | Open the session picker filtered to sessions linked to a PR/MR |
| `--ide` | Auto-connect to IDE on startup if exactly one is available |
| `--init` | Run Setup hooks with the `init` matcher before the session (print mode only) |
| `--init-only` | Run Setup and `SessionStart` hooks, then exit without starting a conversation |
| `--include-hook-events` | Include hook lifecycle events in the output stream (`--output-format stream-json`) |
| `--include-partial-messages` | Include partial streaming events (`--print --output-format stream-json`) |
| `--input-format` | `text` or `stream-json` (print mode) |
| `--json-schema` | Get JSON output matching a JSON Schema after the workflow completes (print mode only) |
| `--maintenance` | Run Setup hooks with the `maintenance` matcher before the session (print mode only) |
| `--max-budget-usd` | Max USD spend on API calls before stopping (print mode only; subagent spend counts) |
| `--max-turns` | Limit agentic turns (print mode only); errors when reached |
| `--mcp-config` | Load MCP servers from JSON files/strings (space-separated) |
| `--model` | Model alias (`sonnet`/`opus`/`haiku`/`fable`) or full name for this session |
| `--name`, `-n` | Set a display name for the session (shown in `/resume`, terminal title) |
| `--no-session-persistence` | Disable session persistence (print mode only) |
| `--output-format` | `text`, `json`, or `stream-json` (print mode) |
| `--permission-mode` | `default`/`acceptEdits`/`plan`/`auto`/`dontAsk`/`bypassPermissions`/`manual` (alias for `default`, v2.1.200+); overrides `defaultMode` |
| `--permission-prompt-tool` | MCP tool to handle permission prompts in non-interactive mode |
| `--plugin-dir` | Load a plugin from a directory or `.zip` for this session only (repeatable) |
| `--plugin-url` | Fetch a plugin `.zip` from a URL for this session only (repeatable) |
| `--print`, `-p` | Print response without interactive mode |
| `--prompt-suggestions` | Emit a `prompt_suggestion` message after each turn (needs `--print --output-format stream-json --verbose`) |
| `--remote` | Deprecated alias for `--cloud` |
| `--remote-control`, `--rc` | Start an interactive session with Remote Control enabled |
| `--remote-control-session-name-prefix <prefix>` | Prefix for auto-generated Remote Control session names (default: hostname) |
| `--replay-user-messages` | Re-emit stdin user messages on stdout for acknowledgment |
| `--resume`, `-r` | Resume a session by ID/name, or show a picker |
| `--safe-mode` | Disable all customizations to troubleshoot a broken configuration; sets `CLAUDE_CODE_SAFE_MODE` |
| `--session-id` | Use a specific session ID (must be a valid UUID) |
| `--setting-sources` | Comma-separated setting sources to load: `user`, `project`, `local` |
| `--settings` | Path to a settings JSON file or inline JSON string (max 2 MiB); overrides matching keys for this session |
| `--strict-mcp-config` | Only use MCP servers from `--mcp-config`, ignoring all other MCP configuration |
| `--system-prompt` | Replace the entire system prompt |
| `--system-prompt-file` | Load system prompt from a file, replacing the default |
| `--teleport` | Resume a web session in the local terminal |
| `--teammate-mode` | Agent-team teammate display: `in-process` (default), `auto`, `tmux`, `iterm2` |
| `--tmux` | Create a tmux session for the worktree (requires `--worktree`; `--tmux=classic` for traditional tmux) |
| `--tools` | Restrict which built-in tools Claude can use (`""` disables all, `"default"` all, or a comma list) |
| `--verbose` | Full turn-by-turn output; overrides `viewMode` setting |
| `--version`, `-v` | Output the version number |
| `--worktree`, `-w` | Start in an isolated git worktree at `<repo>/.claude/worktrees/<name>`; accepts `#<number>` or a PR URL |

## Notes

- `--enable-auto-mode` was removed in v2.1.111; use `--permission-mode auto` instead.
- Session-scoped flags (`--model`, `--effort`, `--fallback-model`) apply only to the session launched with them and don't persist as a saved default; use `/model`, `/effort`, or the corresponding settings key to persist.

## Related

- [settings.md](./settings.md): the settings-file equivalents of many flags (`model`, `effortLevel`, `fallbackModel`, `defaultMode`)
- [env-vars.md](./env-vars.md): env vars behind several flags (`CLAUDE_CODE_SAFE_MODE`, `CLAUDE_CODE_SIMPLE`)
- [errors.md](./errors.md): the `--bg and --print conflict` and other command-line errors
