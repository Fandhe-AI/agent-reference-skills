# CLI Interface

Overview of the Hermes Agent interactive CLI — startup modes, status bar, key bindings, slash commands, session management, context compression, and background sessions.

## Signature / Usage

```bash
# Interactive mode (default)
hermes

# Single query (non-interactive)
hermes chat -q "Hello"

# Specific model
hermes chat --model "anthropic/claude-sonnet-4"

# Provider selection
hermes chat --provider nous
hermes chat --provider openrouter

# Enable toolsets
hermes chat --toolsets "web,terminal,skills"

# Preload skills
hermes -s hermes-agent-dev,github-auth

# Resume most recent session
hermes --continue
hermes -c

# Resume specific session
hermes --resume <session_id>
hermes --resume "refactoring auth"

# Isolated git worktree
hermes -w

# Verbose / debug output
hermes chat --verbose
```

## Status Bar

The persistent status bar is displayed above the input area and updates in real time.

| Element | Description |
|---------|-------------|
| Model name | Currently active model |
| Token count | Tokens used / context maximum |
| Context fill indicator | Color-coded fill percentage |
| Session cost | Estimated cost so far |
| Elapsed duration | Time since session start |

The layout adapts to terminal width: full → compact → minimal.

**Context color thresholds:**

| Color | Range | Meaning |
|-------|-------|---------|
| Green | < 50% | Plenty of room |
| Yellow | 50–80% | Getting full |
| Orange | 80–95% | Approaching limit |
| Red | ≥ 95% | Near overflow |

## Key Bindings

| Key | Action |
|-----|--------|
| `Enter` | Send message |
| `Alt+Enter` / `Ctrl+J` / `Shift+Enter` | Insert newline (multi-line input) |
| `Alt+V` | Paste image from clipboard |
| `Ctrl+V` | Paste text and clipboard images |
| `Ctrl+B` | Start / stop voice recording |
| `Ctrl+G` | Open input buffer in external editor |
| `Ctrl+X Ctrl+E` | Alternate binding for the external editor (same as `Ctrl+G`) |
| `Ctrl+S` | Stash the prompt: parks the current draft; press again on an empty composer to restore it (repeated presses build a stack; 2+ stashed opens a browse panel; in-memory only) |
| `Ctrl+C` | Clear a typed draft first (even while the agent works); with an empty prompt, interrupt the agent (double-press within 2s to force exit) |
| `Ctrl+T` / `F6` | Open the full-screen live work monitor (subagents and background processes) without losing the draft; arrows select, `Enter` shows log, `s` steers a worker, `x` requests stop |
| `Ctrl+R` / `F7` | Toggle the live work dock between multi-row preview and a single summary line (fallback when macOS reserves the function-key row) |
| `Ctrl+D` | Exit |
| `Ctrl+Z` | Suspend to background (Unix; `fg` resumes; not supported on Windows) |
| `Tab` | Accept auto-suggestion or autocomplete |
| `!<command>` | Shell mode: run a shell command without spending a model turn (see below) |

On Windows Terminal, `Alt+Enter` is captured by the terminal (fullscreen toggle); use `Ctrl+Enter` or `Ctrl+J` for a newline. On macOS, `F6`/`F7` need Fn (globe) or "Use F1, F2, etc. keys as standard function keys"; `Ctrl+T` / `Ctrl+R` are the reliable fallbacks.

### `!` Shell Mode

```
> !git status
> !pytest -x tests/hermes_cli
```

- The model is never invoked (no tokens); the command and output are not added to conversation history.
- Runs on the host where Hermes itself runs, in the session working directory; a remote or sandboxed `terminal.backend` is not used.
- Dangerous commands still go through the same approval prompt; non-zero exits print `! exited <code>`.
- CLI-only; gateway platforms and cron ignore it.

## Slash Commands

Type `/` to open the autocomplete dropdown. Commands are case-insensitive.

| Command | Description |
|---------|-------------|
| `/help` | Show command help |
| `/model` | Show or change the current model |
| `/tools` | List available tools |
| `/skills browse` | Browse the skills hub |
| `/bg <prompt>` (also `/background`) | Run a separate background session |
| `/btw <question>` | Ask a side question without interrupting the current conversation |
| `/status` | Session info followed by a local Session recap block (no LLM call) |
| `/context [all]` | Context-usage breakdown by category (`all` adds per-skill and per-toolset costs) |
| `/skin` | Switch CLI skin |
| `/voice on` | Enable voice mode |
| `/voice tts` | Toggle spoken playback |
| `/reasoning high` | Increase reasoning effort |
| `/title <name>` | Name the current session |
| `/sessions` | Open interactive session picker |
| `/compress` | Manually trigger context compression |
| `/rollback` | Restore to a previous filesystem checkpoint |
| `/verbose` | Cycle tool display mode (off → new → all → verbose) |

Installed skills automatically register as additional slash commands. The full list of built-in CLI and messaging slash commands is in the Slash Commands reference.

## Quick Commands

Custom commands that run shell commands instantly without invoking the LLM; they work in both the CLI and messaging platforms. Defined in `~/.hermes/config.yaml`:

```yaml
quick_commands:
  status:
    type: exec
    command: systemctl status hermes-agent
  gpu:
    type: exec
    command: nvidia-smi --query-gpu=utilization.gpu,memory.used --format=csv,noheader
  restart:
    type: alias
    target: /gateway restart
```

Then type `/status`, `/gpu`, or `/restart` in any chat.

## Preloading Skills at Launch

```bash
hermes -s hermes-agent-dev,github-auth
hermes chat -s github-pr-workflow -s github-auth
```

Each named skill is loaded into the session prompt before the first turn (interactive and single-query mode). To load skills at the start of every new session (CLI, TUI, gateway, cron, API), set `skills.auto_load` in `config.yaml`:

```yaml
skills:
  auto_load:
    - hermes-agent-dev
    - github-pr-workflow
```

The list is resolved once when the system prompt is first built (prompt caching stays intact); missing or disabled skills log a warning and are skipped. `--ignore-rules` / `HERMES_IGNORE_RULES=1` skips auto-load, but explicit `-s` skills still load. The setting is profile-scoped.

## Skill Slash Commands

Every installed skill in `~/.hermes/skills/` is registered as a slash command named after the skill (e.g. `/gif-search funny cats`). The bare skill name (`/excalidraw`) loads it and lets the agent ask what you need.

## Session Management

### Resuming Sessions

```bash
hermes --continue              # Most recent CLI session
hermes -c                      # Short form
hermes --resume <session_id>   # Specific session by ID
hermes --resume "auth fix"     # Session by title
hermes sessions list           # Browse past sessions
hermes sessions rename <id> <title>
```

Resuming restores full conversation history (messages, tool calls) from SQLite.

### Session Storage

Sessions are stored in `~/.hermes/state.db` (SQLite). The database holds session metadata, message history, lineage tracking, and full-text search indexes.

## Context Compression

Long conversations are automatically summarized when approaching the context limit. Configuration:

```yaml
compression:
  enabled: true
  threshold: 0.50
auxiliary:
  compression:
    model: ""   # empty = main chat model; or pin a cheap fast model
```

The first 3 turns and last 20 turns are preserved; middle content is summarized.

## Background Sessions

Run isolated prompts as separate daemon threads without blocking the foreground session.

```
/background Analyze the logs in /var/log and summarize any errors from today
```

| Property | Behavior |
|----------|----------|
| Isolation | Completely separate agent session |
| Context | Receives only the provided prompt — no access to session history |
| Inheritance | Inherits model, provider, and configuration settings |
| Blocking | Non-blocking; foreground session remains interactive |
| Concurrency | Multiple tasks can execute simultaneously |
| Results | Displayed as terminal panels when complete |
| History | Tasks do not appear in the main conversation history |

## Input and Interruption

**Multi-line input:**
- `Alt+Enter` / `Ctrl+J` — insert newline
- End a line with `\` to continue on the next line

## Redirecting the Agent Mid-Turn

- Type a new message and press `Enter` to redirect the active turn; completed tool work and reasoning already shown stay in context, and a running tool reaches its safe boundary before the correction applies.
- `Ctrl+C` interrupts the current operation (twice within 2s to force exit); if the prompt holds a draft, the first press clears it and the turn keeps running.
- `/stop` cancels the turn and its foreground work.

The `display.busy_input_mode` config (also `/busy queue|steer|interrupt|status`) controls what Enter does while the agent is working:

| Value | Behavior |
|-------|----------|
| `"interrupt"` (default) | Message redirects the active turn; a running foreground terminal command is moved to the background (not killed) |
| `"queue"` | Message is silently queued as the next turn |
| `"steer"` | Message is injected via `/steer`, arriving after the next tool call; falls back to queue if the agent has not started or images are attached |

`/queue <prompt>` queues explicitly; `/queue list`, `/queue rm N`, `/queue edit N <new prompt>`, `/queue move A B` act on the pending queue even mid-run.

## Tool Progress Display

The CLI shows a thinking animation during API calls and a tool execution feed (`┊ 💻 terminal \`ls -la\` (0.3s)`). `/verbose` cycles `off → new → all → verbose`. `display.tool_preview_length` (default `0` = no limit) truncates tool previews.

## Quiet Mode

By default the CLI runs in quiet mode (suppresses verbose tool logging, kawaii-style feedback). Use `hermes chat --verbose` for debug output.

## Notes

- The banner shown at startup displays model, terminal backend, working directory, available tools, and installed skills.
- `display.tool_preview_length` controls truncation length for tool previews in the feed (default: `0` = no limit).
- Personalities (tone presets: helpful, concise, technical, creative, teacher, kawaii, pirate, etc.) can be selected or custom-defined in configuration.
- `--quiet` / `-Q` suppresses UI elements; `--verbose` enables debug output.
- `--tui` launches the terminal UI mode.
- `--ignore-user-config` skips personal config loading; `--ignore-rules` skips auto-injection of context files (AGENTS.md, SOUL.md, etc.).
- `hermes -z "<prompt>"` returns only the final response text with no cosmetic output — useful for shell script integration.
- Status bar extras: `🗜️ N` (compression count), `▶ N` (active `/bg` tasks), `📌 N` (stashed drafts), session title badge, and `⚠ YOLO` when YOLO mode is on. A `~` marks a local estimate. Layout: full at 76+ columns, compact at 52–75, minimal below 52.
- Opt-in vim keys in the prompt, a git-branch status-bar field, a bell and desktop notification when waiting, and `hermes --native` (let your own terminal handle TUI scrollback and search) were introduced in v0.22.0 per the release notes; their exact config keys are not in the CLI page, so check `hermes --help` / configuration.
- Background sessions: `/bg` is the short form; `display.bell_on_complete` rings the bell on completion.

## Related

- [CLI Commands Reference](./commands.md)
