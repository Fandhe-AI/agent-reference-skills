# Personality

Hermes uses a three-layer personality system. `SOUL.md` sets the persistent baseline identity; `AGENTS.md` provides project-specific context; `/personality` applies temporary session overlays.

## SOUL.md

`SOUL.md` is located at `~/.hermes/SOUL.md` (or `$HERMES_HOME/SOUL.md`). It occupies **slot #1** in the system prompt — the first thing injected before any other context.

**Behaviour:**
- Auto-created with a starter template if it does not exist.
- User files are **never** overwritten by Hermes.
- Empty or unreadable files trigger fallback to the built-in identity.
- Content is injected verbatim after security scanning.
- Loaded **only** from `HERMES_HOME`, never from the current working directory.

**What to include:**
- Tone and communication style
- Directness level
- How to handle uncertainty
- Stylistic preferences
- Default interaction patterns

**What to avoid (use AGENTS.md instead):**
- One-off project instructions
- File paths or repository conventions
- Temporary workflow details

## Three-Layer System

| Layer | File | Scope | Persistence |
|-------|------|-------|-------------|
| Baseline identity | `SOUL.md` | Instance-wide | Persistent |
| Project behaviour | `AGENTS.md` | Context-specific | Per working directory |
| Session overlay | `/personality` | Current session | Temporary |

## Built-In Personalities

14 presets ship with Hermes:

`helpful`, `concise`, `technical`, `creative`, `teacher`, `kawaii`, `catgirl`, `pirate`, `shakespeare`, `surfer`, `noir`, `uwu`, `philosopher`, `hype`

Activate with `/personality <name>`.

## Custom Personalities

```yaml
# ~/.hermes/config.yaml
agent:
  personalities:
    codereviewer: "You are a meticulous code reviewer..."
    docs-writer: "You write clear, concise technical documentation..."
```

Activate via `/personality codereviewer`.

## Recommended Workflow

1. Maintain a thoughtful global `SOUL.md` for stable voice.
2. Place project-specific instructions in `AGENTS.md`.
3. Use `/personality` only for temporary shifts within a session.

## Related

- [Context Files](./context-files.md)
