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
| `Alt+Enter` / `Ctrl+J` | Insert newline (multi-line input) |
| `Alt+V` | Paste image from clipboard |
| `Ctrl+V` | Paste text and clipboard images |
| `Ctrl+B` | Start / stop voice recording |
| `Ctrl+C` | Interrupt agent (double-press to exit) |
| `Ctrl+D` | Exit |
| `Ctrl+Z` | Suspend to background (Unix) |
| `Tab` | Accept auto-suggestion or autocomplete |

## Slash Commands

Type `/` to open the autocomplete dropdown. Commands are case-insensitive.

| Command | Description |
|---------|-------------|
| `/help` | Show command help |
| `/model` | Show or change the current model |
| `/tools` | List available tools |
| `/skills browse` | Browse the skills hub |
| `/background <prompt>` | Run a separate background session |
| `/skin` | Switch CLI skin |
| `/voice on` | Enable voice mode |
| `/voice tts` | Toggle spoken playback |
| `/reasoning high` | Increase reasoning effort |
| `/title <name>` | Name the current session |
| `/verbose` | Cycle tool display mode (off → new → all → verbose) |

Installed skills automatically register as additional slash commands.

## Quick Commands

Custom shell commands that execute immediately without invoking the LLM. Defined in configuration:

```yaml
quick_commands:
  status:
    type: exec
    command: systemctl status hermes-agent
  gpu:
    type: exec
    command: nvidia-smi --query-gpu=utilization.gpu,memory.used
```

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
  summary_model: "google/gemini-3-flash-preview"
```

The first 3 turns and last 4 turns are preserved; middle content is summarized.

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

**Interrupting the agent:**
- Type a new message and press `Enter` during processing
- `Ctrl+C` — interrupt the current operation
- Multiple messages sent during interrupt are combined into one prompt

The `display.busy_input_mode` config controls interrupt behavior:

| Value | Behavior |
|-------|----------|
| `"interrupt"` (default) | Process message immediately |
| `"queue"` | Silently queue the message |

## Notes

- The banner shown at startup displays model, terminal backend, working directory, available tools, and installed skills.
- `display.tool_preview_length` controls truncation length for tool previews in the feed (default: `0` = no limit).
- Personalities (tone presets: helpful, concise, technical, creative, teacher, kawaii, pirate, etc.) can be selected or custom-defined in configuration.
- `--quiet` / `-Q` suppresses UI elements; `--verbose` enables debug output.

## Related

- [CLI Commands Reference](./commands.md)
