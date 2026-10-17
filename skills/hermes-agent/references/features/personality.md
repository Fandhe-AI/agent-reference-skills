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

## How SOUL.md works now

- Hermes seeds a default `SOUL.md` automatically in the current instance's `HERMES_HOME` (`~/.hermes/SOUL.md`, or `$HERMES_HOME/SOUL.md` for a custom home). That is the file to edit.
- It replaces the hardcoded default identity in slot #1 and is not duplicated in the context files section.
- Loaded only from `HERMES_HOME`, never the working directory, so the personality belongs to the Hermes instance rather than changing between projects.
- If the file is empty, whitespace-only, unreadable, or `skip_context_files` is set (e.g. subagent/delegation contexts), Hermes falls back to a built-in default identity.

## What Hermes injects into the prompt

`SOUL.md` content goes into slot #1 with no wrapper language, after prompt-injection scanning and truncation if too large (the same scanning as other context-bearing files). Prompt stack order: SOUL.md, tool-aware behavior guidance, memory/user context, skills guidance, context files (`AGENTS.md`, `.cursorrules`), timestamp, platform-specific formatting hints, then optional overlays such as `/personality`.

## SOUL.md vs AGENTS.md vs `/personality`

- If it should follow you everywhere (identity, tone, style, communication defaults), it belongs in `SOUL.md`; if it belongs to a project (architecture, coding conventions, tool preferences, commands, ports, paths), it belongs in `AGENTS.md`.
- `SOUL.md` is the durable baseline; `/personality` is a session-level overlay (e.g. keep a pragmatic SOUL, then `/personality teacher` for a tutoring conversation).

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

Activate via `/personality codereviewer`. Built-in personalities are available on every surface (CLI, messaging, TUI, desktop); a custom entry with a built-in name overrides it. A top-level `personalities:` block also works, but `agent.personalities` wins on a name clash. The selection is stored as a name in `display.personality`; personalities never touch `agent.system_prompt` (reserved for a manual system prompt, applied only when no personality is selected).

## Resetting to the default

`/personality none`, `/personality default`, or `/personality neutral` clear `display.personality` (effective next message), returning to your `SOUL.md` persona plus `agent.system_prompt` if set. `/personality` with no arguments lists `none` with the presets and marks the active one. On the first run after upgrading from older versions, any saved personality selection is reset to `none` once.

## CLI appearance vs conversational personality

`SOUL.md`, `agent.system_prompt`, and `/personality` affect how Hermes speaks; `display.skin` and `/skin` affect how it looks in the terminal.

## Recommended Workflow

1. Maintain a thoughtful global `SOUL.md` for stable voice.
2. Place project-specific instructions in `AGENTS.md`.
3. Use `/personality` only for temporary shifts within a session.

## Related

- [Context Files](./context-files.md)
