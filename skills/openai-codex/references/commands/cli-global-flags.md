# Codex CLI global flags and command overview

Global flags of the base `codex` command and the overview of every documented CLI command with its maturity label.

## Signature / Usage

```bash
codex [OPTIONS] [PROMPT]
codex --model <MODEL> --sandbox workspace-write --ask-for-approval on-request "Tell me about this project"
```

## Options / Props

Global flags (apply to the base `codex` command; most propagate to subcommands, e.g. `codex exec --oss ...` applies `--oss` to `exec`):

| Name | Type | Description |
|------|------|-------------|
| `PROMPT` | string | Optional text instruction to start the session. Omit to launch the TUI without a pre-filled message. |
| `--image, -i` | path[,path...] | Attach image files to the initial prompt. Separate paths with commas or repeat the flag. |
| `--model, -m` | string | Override the model set in configuration. |
| `--oss` | boolean (default `false`) | Use a local open source model provider. Uses `--local-provider`, your configured `oss_provider`, or prompts you to choose between LM Studio and Ollama. |
| `--local-provider` | lmstudio \| ollama | Choose the local provider used with `--oss`, overriding `oss_provider` for this run. |
| `--profile, -p` | string | Layer `$CODEX_HOME/profile-name.config.toml` on top of the base user config. |
| `--sandbox, -s` | read-only \| workspace-write \| danger-full-access | Sandbox policy for model-generated shell commands. |
| `--ask-for-approval, -a` | on-request \| never | Control when Codex pauses for human approval before running a command. |
| `--approve-for-me, --not-so-yolo` | boolean (default `false`) | Automatic approval review with `on-request` approvals and the `workspace-write` sandbox. Conflicts with `--sandbox` and `--yolo`; the interactive CLI also rejects `--ask-for-approval`. |
| `--dangerously-bypass-approvals-and-sandbox, --yolo` | boolean (default `false`) | Run every command without approvals or sandboxing. Only use inside an externally hardened environment. |
| `--dangerously-bypass-hook-trust` | boolean (default `false`) | Run enabled hooks without requiring persisted hook trust for this invocation. Only for automation that already vets hook sources. |
| `--cd, -C` | path | Working directory for the agent before it starts processing your request. |
| `--search` | boolean (default `false`) | Enable live web search (sets `web_search = "live"` instead of the default `"cached"`). |
| `--add-dir` | path | Grant additional directories write access alongside the main workspace. Repeatable. |
| `--no-alt-screen` | boolean (default `false`) | Disable alternate screen mode for the TUI (overrides `tui.alternate_screen` for this run). |
| `--no-daemon` | boolean (default `false`) | Run the interactive CLI without the shared background server. Can't be combined with `--remote` or `codex agents`. |
| `--worktree` | boolean (default `false`) | Start in a new managed Git worktree. Supports new interactive sessions, `codex fork <SESSION_ID>`, `codex exec`, and `codex exec fork`; requires local execution. |
| `--remote` | ws://host:port \| wss://host:port \| unix:// \| unix://PATH | Connect to a remote app-server endpoint. Supported for `codex`, `codex agents`, `codex queue`, `codex resume`, `codex fork`, `codex archive`, `codex delete`, `codex unarchive`; other subcommands reject remote mode. |
| `--remote-auth-token-env` | ENV_VAR | Read a bearer token from this environment variable and send it with `--remote`. Requires `--remote`; tokens are only sent over `wss://` or local-only `ws://` URLs. |
| `--strict-config` | boolean (default `false`) | Error when `config.toml` contains fields this Codex version does not recognize. Supported by `codex`, `exec`, `review`, `resume`, `fork`, `app-server`, `exec-server`. |
| `--enable` | feature | Force-enable a feature flag (translates to `-c features.<name>=true`). Repeatable. |
| `--disable` | feature | Force-disable a feature flag (translates to `-c features.<name>=false`). Repeatable. |
| `--config, -c` | key=value | Override configuration values. Values parse as TOML if possible; otherwise the literal string is used. |

Command overview (maturity as labelled in the source):

| Command | Maturity | Description |
|---------|----------|-------------|
| `codex` | stable | Launch the terminal UI. |
| `codex agents` | stable | Open the agent command center on a shared local or remote server. |
| `codex queue` | stable | Queue a text message for an existing session by UUID or exact name. |
| `codex app-server` | experimental | Launch the Codex app server for development/debugging over stdio, WebSocket, or Unix socket. |
| `codex remote-control` | experimental | Run or manage remote control for the local app-server, or create a short-lived pairing code. |
| `codex app` | stable | Launch the ChatGPT desktop app on macOS or Windows. |
| `codex debug app-server send-message-v2` | experimental | Send a single V2 message through the built-in test client. |
| `codex debug models` | experimental | Print the raw model catalog Codex sees (`--bundled` for the bundled catalog only). |
| `codex debug prompt-input` | experimental | Render the model-visible prompt input list as JSON. |
| `codex apply` (alias `codex a`) | stable | Apply the latest diff from a Codex cloud chat to the local working tree. |
| `codex review` | stable | Non-interactive review of uncommitted changes, a base branch diff, a commit, or custom instructions. |
| `codex archive` / `codex unarchive` | stable | Archive or restore a saved interactive session. |
| `codex delete` | stable | Permanently delete a saved interactive session. |
| `codex cloud` (alias `codex cloud-tasks`) | experimental | Browse or execute Codex cloud chats without the TUI. |
| `codex completion` | stable | Generate shell completion scripts (Bash, Zsh, Fish, PowerShell). |
| `codex doctor` | stable | Diagnostic report for installation, config, auth, runtime, Git, terminal, app-server, thread inventory. |
| `codex features` | stable | List feature flags and persistently enable/disable them in `config.toml`. |
| `codex exec` (alias `codex e`) | stable | Run Codex non-interactively. |
| `codex execpolicy` | experimental | Evaluate execpolicy rule files. |
| `codex login` / `codex logout` | stable | Authenticate / remove stored credentials. |
| `codex mcp` | stable | Manage MCP servers. |
| `codex plugin marketplace` | stable | Add, list, upgrade, or remove plugin marketplaces. |
| `codex plugin` | stable | Install, list, and remove plugins. |
| `codex resume` | stable | Continue a previous interactive session. |
| `codex fork` | stable | Fork a previous interactive session into a new chat. |
| `codex sandbox` | stable | Run commands inside Codex-provided macOS, Linux, or Windows sandboxes. |
| `codex update` | stable | Check for and apply a CLI update when the installed release supports self-update. |

## Notes

- The CLI inherits most defaults from `~/.codex/config.toml`; `-c key=value` overrides take precedence for that invocation.
- Web search defaults to cached mode; `--search` switches to live.
- For low-friction local work: `--sandbox workspace-write --ask-for-approval on-request`.
- Prefer `--add-dir` over `--sandbox danger-full-access` to grant write access to more directories; avoid `--dangerously-bypass-approvals-and-sandbox` outside a dedicated sandbox VM.
- `codex mcp-server` and the standalone `codex-mcp-server` binary have been removed; use the Codex app server instead.
- Interactive shortcuts: `@` file search, Up/Down draft history, Ctrl+R prompt history search, Ctrl+O or `/copy` copy latest output, `!` prefix runs a local shell command under current approval/sandbox settings, Tab queues a follow-up while working, Enter injects instructions into the current turn, Esc twice with an empty composer edits the previous message and forks, Ctrl+C or `/exit` closes the session.
- Source: https://learn.chatgpt.com/docs/developer-commands?surface=cli (fetched 2026-10).

## Related

- [cli-subcommands.md](./cli-subcommands.md)
- [cli-slash-commands.md](./cli-slash-commands.md)
