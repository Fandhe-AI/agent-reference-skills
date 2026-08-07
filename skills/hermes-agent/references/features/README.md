# Features

| Name | Description | Path |
|------|-------------|------|
| Context Files | Hermes recognises five context file types. Only one project context type loads per session (first-match priority). `SOUL.md` always loads independently as a separate slot. | [context-files.md](./context-files.md) |
| Memory | Hermes provides a two-file persistent memory system (`MEMORY.md` and `USER.md`) that injects into every session, plus a full-text session search index and optional external provider plugins. | [memory.md](./memory.md) |
| MCP (Model Context Protocol) | MCP lets Hermes connect to external tool servers — GitHub, databases, file systems, APIs — without requiring native integrations. Hermes can also expose itself as an MCP server for other agents. | [mcp.md](./mcp.md) |
| Personality | Hermes uses a three-layer personality system. `SOUL.md` sets the persistent baseline identity; `AGENTS.md` provides project-specific context; `/personality` applies temporary session overlays. | [personality.md](./personality.md) |
| Skills | Skills are on-demand knowledge documents following the agentskills.io open standard. They live in `~/.hermes/skills/` and are loaded progressively to minimise token usage. | [skills.md](./skills.md) |
| Tools & Toolsets | Hermes organizes its capabilities into eight tool categories and exposes them through named toolsets. Terminals can run locally, in containers, or on remote infrastructure. | [tools.md](./tools.md) |
| Voice Mode | Hermes supports hands-free voice interaction in the CLI and through gateway platforms (Telegram, Discord). Both STT and TTS are pluggable with local or cloud providers. | [voice-mode.md](./voice-mode.md) |
