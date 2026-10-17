# CLI Basics

Core interactive and session-management commands for the Codex terminal client.

## Start an interactive session

```bash
codex
```

Run from a project directory to start the interactive TUI. After authenticating, describe the task in natural language (e.g. "Tell me about this project").

## Run a single prompt non-interactively

```bash
codex exec "summarize the repository structure and list the top 5 risky areas"
```

`exec` (alias: `e`) runs Codex from scripts without the interactive interface. See `automation.md` for flags and CI usage.

## Resume a previous session

```bash
codex resume
```

Reopens recent repository chats interactively.

```bash
codex exec resume --last "fix the race conditions you found"
```

Resumes the most recent `exec` session non-interactively with a follow-up prompt.

## Review code changes

```bash
codex review
```

Reviews code changes before committing.

## Model Context Protocol (MCP) integration

```bash
codex mcp
```

Integrate external tools via MCP.

## Environment diagnostics

```bash
codex doctor
```

## Open the agents command center

```bash
codex agents
```

Opens the command center to browse chats and switch between agents on a shared server. Use `--remote <URL>` to connect to a remote server and `--cd <DIR>` to set the directory for new remote tasks. `codex agents` doesn't support `--no-daemon`.

## Queue a message for an existing session

```bash
codex queue --thread <SESSION_ID> --message "Run the remaining checks"
```

`--thread` accepts a UUID or exact session name (use a UUID when sessions share the same name). Also accepts `--remote` and `--remote-auth-token-env`; image attachments aren't supported.

## Update the CLI

```bash
codex update
```

Checks for and applies a Codex CLI update when the installed release supports self-update. Debug builds print a message telling you to install a release build instead.

## Notable CLI features

- `codex resume` — reopen recent repository chats
- `codex --image` — include screenshots or diagrams as input
- `codex --search` — enable live web search capability
- `codex mcp` — integrate external tools via Model Context Protocol
- `/permissions` (in-session slash command) — configure file editing and command execution boundaries

## Other documented subcommands

```
codex app-server
codex remote-control
codex remote-control start
codex remote-control stop
codex remote-control pair
codex app
codex debug app-server send-message-v2
codex debug models
codex debug prompt-input
codex apply
codex archive <SESSION>
codex unarchive <SESSION>
codex delete <SESSION>
codex delete <SESSION_UUID> --force
codex cloud
codex cloud exec
codex cloud list
codex completion
codex features
codex execpolicy
codex execpolicy check
codex fork
codex login
codex login status
codex logout
codex plugin
codex plugin add
codex plugin list
codex plugin remove
codex plugin marketplace
codex plugin marketplace add
codex plugin marketplace list
codex sandbox
codex update
codex agents
codex queue
```

Listed in the official command reference (see `developer-commands.md?surface=cli`); flag details are rendered as interactive `<ConfigTable>` components that are not present in the Markdown export. Run `codex <command> --help` for options. 要確認: exact flags/arguments per subcommand.

`codex mcp-server` (and the standalone `codex-mcp-server` binary) was removed — use `codex app-server` instead (see the Codex app server docs).

`codex cloud`, `codex execpolicy`, and `codex remote-control` are labeled Experimental in the command overview (`codex execpolicy` is described as in preview). `codex login`, `codex login status`, and `codex logout` are documented in detail in `auth.md` (kept here only for completeness of the subcommand list).

`codex app` (stable) launches the ChatGPT desktop app and is macOS/Windows only; the subcommand is not compiled on other platforms, where `app` instead falls through to prompt interpretation. Distinct from `codex app-server` above.

## Slash commands (in-session)

Type these during an interactive `codex` session:

```
/permissions
/ide
/keymap
/vim
/setup-default-sandbox
/agent
/subagents
/apps
/plugins
/hooks
/clear
/rename
/archive
/delete
/compact
/copy
/diff
/exit
/experimental
/approve
/memories
/skills
/import
/feedback
/init
/logout
/mcp
/mention
/model
/fast
/plan
/goal
/personality
/ps
/stop
/fork
/app
/side
/btw
/raw
/resume
/new
/quit
/review
/status
/usage
/debug-config
/statusline
/title
/theme
/pets
/pet
```
