# Tips & Best Practices

Not sure which model to pick? `hermes setup --portal` gives 300+ models under one Nous Portal subscription.

Practical guidance for getting the most out of Hermes Agent across prompting, CLI usage, context files, memory/skills, performance, messaging, and security.

## Prompting

- **Be specific**: Include file paths, error messages, and expected behavior upfront rather than iterating through clarification rounds.
- **Front-load context**: Detailed prompts reduce iteration cycles significantly.
- **Use AGENTS.md**: Store recurring instructions in an `AGENTS.md` at the project root — the agent reads it automatically each session.
- **Let the agent explore**: Allow independent use of file search, terminal access, and code execution rather than directing every step manually.
- **Check existing skills**: Run `/skills` before writing lengthy procedural prompts; a pre-built skill may already exist.

## CLI Power User Tips

| Action | Method |
|--------|--------|
| Multi-line input | `Alt+Enter`, `Ctrl+J`, or `Shift+Enter` to add lines without sending |
| Paste code/text | CLI auto-buffers multi-line pastes as a single message |
| Stop and redirect | `Ctrl+C` once to interrupt and redirect execution |
| Force exit | Double-press `Ctrl+C` within 2 seconds |
| Resume previous session | `hermes -c` (full history) or `hermes -r "project-name"` |
| Paste clipboard image | `Ctrl+V` to paste screenshots for vision-based analysis |
| Discover commands | Type `/` then `Tab` to autocomplete slash commands and skills |

## Context Files

**`AGENTS.md` (project-level):** Store architecture decisions, coding conventions, and project-specific rules. The top-level file in the working directory is injected at session start; subdirectory `AGENTS.md` files are discovered lazily during tool calls and injected into tool results, not loaded upfront. Keep context files concise: they are injected into every message.

**`SOUL.md` (global, `~/.hermes/SOUL.md`):** Customize the agent's default behavior globally — communication style, technical preferences, response patterns.

**`.cursorrules` / `.cursor/rules/*.mdc`:** Hermes reads these automatically, eliminating duplication across tools.

## Memory & Skills

- **Memory for facts**: Store environment details, preferences, project locations.
- **Skills for procedures**: Use skills for multi-step workflows that recur (5+ steps is a good threshold).
- **Creating skills**: Ask the agent to save a task as a skill; invoke later with `/skill-name`.
- **Memory capacity**: MEMORY.md is bounded (~2,200 characters) and USER.md (~1,375 characters). Request consolidation when full: "clean up your memory."
- **Persistent learning**: After productive sessions, ask the agent to "remember this for next time."

## Performance & Cost

- **Prompt cache stability**: Keep system prompts and context files consistent within sessions to maximize provider cache hits. The cache is keyed to the model and account, so an explicit `/model` switch, an automatic provider fallback, or a credential-pool rotation forces the next turn to re-read the whole conversation at full input price; on long sessions it is often cheaper to start a fresh session on the other model than to bounce back and forth.
- **Fixed per-message cost**: `hermes prompt-size` shows the system prompt, skills index, memory, and tool schema byte breakdown offline.
- **Compress history**: Use `/compress` to summarize conversation history when token accumulation slows responses.
- **Parallel delegation**: Use `delegate_task` for concurrent subtasks — each subagent maintains independent context and returns only final summaries.
- **Batch operations**: Write scripts executing multiple operations atomically rather than running terminal commands sequentially.
- **Model selection**: Use `/model` to switch — frontier models (Claude Sonnet/Opus, GPT-4o) for complex reasoning; faster models for boilerplate, formatting, renaming.
- **Usage monitoring**: `/usage` for token consumption snapshots; `/insights` for 30-day usage pattern analysis.

## Messaging Tips

- **Home channel**: Use `/sethome` to designate a primary Telegram or Discord channel for cron job results and scheduled outputs.
- **Session naming**: Use `/title` to name sessions descriptively (e.g., "auth-refactor") for easy discovery via `hermes sessions list` and resumption via `hermes -r "name"`.
- **Team DM pairing**: Enable DM pairing to allow teammates to self-serve with one-time pairing codes (approve via `hermes pairing approve telegram XKGH5N7P`).
- **Verbose mode**: Use `/verbose` to cycle display modes — `all` for comprehensive live output in CLI, `new` for messaging platforms to minimize noise.
- **Session continuity**: Messaging sessions persist until an explicit `/new` or `/reset`; context compression manages long conversations without an idle or daily reset.

## Security

- **Docker for untrusted code**: Use Docker or Daytona as the terminal backend for unfamiliar repositories (`TERMINAL_ENV=docker` in `.env` per the v0.22.2 tips page; `hermes config set terminal.backend docker` is the config route) to contain destructive commands.
- **Windows encoding**: On Windows, default encodings such as `cp125x` can raise `UnicodeEncodeError`; open files with `encoding="utf-8"` and in PowerShell run `$OutputEncoding = [Console]::OutputEncoding = [Text.UTF8Encoding]::new($false)`.
- **Command approval caution**: When dangerous commands trigger approval prompts, choose "session" scope before considering "always" allowlisting.
- **Command safety checks**: Hermes validates commands against dangerous patterns (recursive deletes, SQL drops, shell piping). Never disable in production.
- **Container security exception**: Dangerous command checks are skipped in container backends (Docker, Singularity, Modal) since the container provides the security boundary.
- **Messaging bot allowlists**: Never enable `GATEWAY_ALLOW_ALL_USERS=true` for bots with terminal access. Use `TELEGRAM_ALLOWED_USERS`, `DISCORD_ALLOWED_USERS`, or DM pairing instead.
- **Windows UTF-8**: Explicitly open files with UTF-8 encoding to avoid `UnicodeEncodeError` on Windows systems using default encodings.
- **Supply-chain scanning**: Run `hermes security audit` periodically to detect vulnerable packages in venv, plugins, and MCP server dependencies.
- **Secret manager**: Use `hermes secrets setup` to pull API keys from Bitwarden at startup instead of storing them in `.env` files.

## Related

- [CLI Interface](../cli/interface.md)
- [Configuration](../configuration/configuration.md)
- [Memory](../features/memory.md)
- [Skills](../features/skills.md)
- [Context Files](../features/context-files.md)
- [Security](../security/security.md)
