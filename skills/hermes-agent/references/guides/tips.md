# Tips & Best Practices

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
| Multi-line input | `Alt+Enter` or `Ctrl+J` to add lines without sending |
| Paste code/text | CLI auto-buffers multi-line pastes as a single message |
| Stop and redirect | `Ctrl+C` once to interrupt and redirect execution |
| Force exit | Double-press `Ctrl+C` within 2 seconds |
| Resume previous session | `hermes -c` (full history) or `hermes -r "project-name"` |
| Paste clipboard image | `Ctrl+V` to paste screenshots for vision-based analysis |
| Discover commands | Type `/` then `Tab` to autocomplete slash commands and skills |

## Context Files

**`AGENTS.md` (project-level):** Store architecture decisions, coding conventions, and project-specific rules. Injected automatically into every session. In monorepos, all `AGENTS.md` files at every directory level are discovered and concatenated.

**`SOUL.md` (global, `~/.hermes/SOUL.md`):** Customize the agent's default behavior globally — communication style, technical preferences, response patterns.

**`.cursorrules` / `.cursor/rules/*.mdc`:** Hermes reads these automatically, eliminating duplication across tools.

## Memory & Skills

- **Memory for facts**: Store environment details, preferences, project locations.
- **Skills for procedures**: Use skills for multi-step workflows that recur (5+ steps is a good threshold).
- **Creating skills**: Ask the agent to save a task as a skill; invoke later with `/skill-name`.
- **Memory capacity**: MEMORY.md is bounded (~2,200 characters) and USER.md (~1,375 characters). Request consolidation when full: "clean up your memory."
- **Persistent learning**: After productive sessions, ask the agent to "remember this for next time."

## Performance & Cost

- **Prompt cache stability**: Keep system prompts and context files consistent within sessions to maximize provider cache hits.
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

## Security

- **Docker for untrusted code**: Set `TERMINAL_BACKEND=docker` in `.env` when handling unfamiliar repositories to contain destructive commands.
- **Command approval caution**: When dangerous commands trigger approval prompts, choose "session" scope before considering "always" allowlisting.
- **Command safety checks**: Hermes validates commands against dangerous patterns (recursive deletes, SQL drops, shell piping). Never disable in production.
- **Container security exception**: Dangerous command checks are skipped in container backends (Docker, Singularity, Modal) since the container provides the security boundary.
- **Messaging bot allowlists**: Never enable `GATEWAY_ALLOW_ALL_USERS=true` for bots with terminal access. Use `TELEGRAM_ALLOWED_USERS`, `DISCORD_ALLOWED_USERS`, or DM pairing instead.
- **Windows UTF-8**: Explicitly open files with UTF-8 encoding to avoid `UnicodeEncodeError` on Windows systems using default encodings.

## Related

- [CLI Interface](../cli/interface.md)
- [Configuration](../configuration/configuration.md)
- [Memory](../features/memory.md)
- [Skills](../features/skills.md)
- [Context Files](../features/context-files.md)
- [Security](../security/security.md)
