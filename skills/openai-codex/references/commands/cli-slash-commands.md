# Slash commands in Codex CLI

Keyboard-first in-session controls. Type `/` in the composer to open the slash popup and filter by name.

## Signature / Usage

```text
/model
/plan Propose a migration plan for this service
/goal Finish the migration and keep tests green
/export session.md
/usage daily
```

While a chat is running, type a slash command and press `Tab` to queue it for the next turn; queued commands are parsed when they run.

## Options / Props

| Command | Purpose |
|---------|---------|
| `/permissions` | Set what Codex can do without asking first (e.g. Auto vs Read Only; custom permission profiles appear when active). |
| `/ide` | Include open files, current selection, and IDE context in the next prompt. |
| `/keymap` | Remap TUI shortcuts; persists to `tui.keymap` (names like `ctrl-a`, `shift-enter`, `page-down`). |
| `/vim` | Toggle Vim mode for the composer (default via `tui.vim_mode_default = true`). |
| `/setup-default-sandbox` | Windows only, when using the degraded restricted-token sandbox: set up the elevated sandbox. |
| `/agents` | Open the agent command center (needs a shared local or remote server). |
| `/subagents` | Switch the active subagent thread. |
| `/apps` | Browse apps (connectors); inserts `$app-slug` into the composer. |
| `/plugins` | Browse installed and discoverable plugins; Space toggles an installed plugin. |
| `/hooks` | View and manage lifecycle hooks; trust, disable, or re-enable non-managed hooks. |
| `/clear` | Clear the terminal and start a fresh chat (`/clear <name>` names it). Ctrl+L only clears the view. |
| `/rename` | Rename the current chat (`/rename <name>`). |
| `/archive` | Archive the current session (restore with `codex unarchive <SESSION>`). |
| `/delete` | Permanently delete the current session and descendant sessions; unavailable while running or in a side chat. |
| `/compact` | Summarize the visible chat to free context. |
| `/copy` | Copy the latest completed output (also Ctrl+O). |
| `/diff` | Show the Git diff, including untracked files. |
| `/exit`, `/quit` | Exit the CLI. |
| `/experimental` | Toggle experimental features (e.g. Network proxy, Prevent sleep while running). |
| `/approve` | Approve one retry of a recent auto-review denial. |
| `/memories` | Configure memory use and generation. |
| `/skills` | Browse and use skills. |
| `/import` | Import Claude Code or Cursor setup, projects, chats (up to 50 chats from the last 30 days). Local TUI only; unavailable while a task runs, in remote sessions, and while connected to the local app-server daemon. |
| `/feedback` | Send logs to the Codex maintainers. |
| `/init` | Generate an `AGENTS.md` scaffold in the current directory. |
| `/logout` | Sign out of Codex. |
| `/mcp` | List configured MCP tools; `/mcp verbose` for diagnostics; `/mcp login <name>`. |
| `/mention` | Attach a file to the chat (`/mention src/lib/api.ts`). |
| `/model` | Choose the active model (and reasoning effort when available). |
| `/fast` | Toggle a Fast service tier when the model catalog exposes one. |
| `/plan` | Switch to plan mode, optionally with inline prompt text. Unavailable while Codex is working. |
| `/goal` | `/goal <objective>` sets; `/goal` views; `edit`, `pause`, `resume`, `clear`. Objective non-empty, max 4,000 characters. |
| `/ps` | Show background terminals and up to three recent output lines (when `unified_exec` is in use). |
| `/stop` | Stop all background terminals (`/clean` is an alias). |
| `/fork` | Fork the current chat into a new chat. |
| `/app` | Continue the session in the ChatGPT desktop app (macOS, Windows). |
| `/side`, `/btw` | Start an ephemeral side chat; unavailable in another side chat and during review mode. |
| `/raw` | Toggle raw scrollback (`/raw on` / `/raw off`; Alt+R; `tui.raw_output_mode = true`). |
| `/resume` | Resume a saved chat from the session picker. |
| `/new` | Start a new chat in the same CLI session (`/new <name>`). Unlike `/clear`, doesn't clear the terminal view. |
| `/review` | Review the working tree; uses the session model unless `review_model` is set in `config.toml`. |
| `/status` | Show active model, approval policy, writable roots, token usage (plus remote address and server version when remote). |
| `/usage` | Usage menu; `/usage daily`, `/usage weekly`, `/usage cumulative`. |
| `/debug-config` | Print config layer order (lowest precedence first) and policy diagnostics. |
| `/statusline` | Configure footer items; persists to `tui.status_line`. |
| `/title` | Configure terminal title items; persists to `tui.terminal_title`. |
| `/theme` | Choose a syntax theme; persists to `tui.theme`. |
| `/pets`, `/pet` | Choose or hide a terminal pet (`/pets off`). |
| `/tui` | Choose scrollback or fullscreen terminal mode for the next launch (`--no-alt-screen` overrides still apply). |
| `/export` | Export the conversation as Markdown (clipboard or file). |
| `/recap` | Summarize the conversation without compacting, even if `tui.auto_recap = false`. |
| `/cd`, `/pwd`, `/cwd` | Change / show the working directory (idle primary session, no queued input or background terminals). |
| `/worktree` | Start or continue a chat in a managed Git worktree; unavailable while a task runs. |
| `/daemon` | Open background server controls; confirming an update exits Codex. |
| `/warnings` | View retained warnings and diagnostics. |

## Notes

- `/copy` is unavailable before the first completed output and right after a rollback; `/clear` and Ctrl+L are disabled while a task is in progress.
- `/fast` is catalog-driven and hidden if the current model doesn't advertise a Fast tier.
- The `/model` picker only lists models available to your account and workspace.
- Use `/quit` and `/exit` only after saving or committing important work.
- Source: https://learn.chatgpt.com/docs/developer-commands?surface=cli (fetched 2026-10).

## Related

- [cli-global-flags.md](./cli-global-flags.md)
- [cli-subcommands.md](./cli-subcommands.md)
- [ide-slash-commands.md](./ide-slash-commands.md)
