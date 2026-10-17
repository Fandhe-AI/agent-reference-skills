# Which File Does What?

A one-page map of the markdown files that shape the agent (SOUL.md, USER.md, MEMORY.md, AGENTS.md, .hermes.md), who writes each one, and when the agent sees it.

## Signature / Usage

| File | What it holds | Who writes it | When the agent sees it | Where it lives |
|------|---------------|---------------|------------------------|----------------|
| SOUL.md | Primary identity: personality, tone, communication style | You (a starter file is seeded if missing; existing files are never overwritten) | Slot #1 of the system prompt, at session start | `~/.hermes/SOUL.md` (or `$HERMES_HOME/SOUL.md`), never the working directory |
| USER.md | User profile: name, role, preferences | The agent, via the `memory` tool (gate with `write_approval`, edit via `hermes journey edit`) | Frozen snapshot injected at session start | `~/.hermes/memories/` |
| MEMORY.md | Agent's notes: environment facts, conventions, tool quirks | The agent, via the `memory` tool | Frozen snapshot injected at session start | `~/.hermes/memories/` |
| AGENTS.md | Project instructions, conventions, architecture | You | Loaded at startup from the working directory; nested copies discovered progressively | Project directory + subdirectories |
| .hermes.md / HERMES.md | Hermes-specific project instructions, highest priority | You | Loaded at startup (first match wins over AGENTS.md) | Project; discovery walks up to the git root |

## Notes

- Only one project context type is loaded per session, first match wins: `.hermes.md` -> `AGENTS.md` -> `CLAUDE.md` -> `.cursorrules`. `SOUL.md` is always loaded independently as the agent identity.
- Memory (MEMORY.md and USER.md) is a frozen snapshot captured once at session start: a mid-session save persists to disk immediately but appears in the system prompt from the next session (this preserves the prefix cache). The same applies to edits to `SOUL.md` or `AGENTS.md` during a running session; restart the session to pick them up.
- SOUL.md and USER.md never feed each other: SOUL.md is a personality file you edit; USER.md is part of persistent memory written by the agent. To populate USER.md, tell the agent ("remember that I prefer concise answers"). Check saved memory with `hermes journey list`.
- Quick guide: change how the agent talks -> edit `~/.hermes/SOUL.md`; make it remember a fact -> tell it; set project rules -> `AGENTS.md` or `.hermes.md`; temporary personality change -> `/personality` (session-level overlay).

## Related

- [features/memory.md](../features/memory.md)
- [features/personality.md](../features/personality.md)
- [features/context-files.md](../features/context-files.md)
