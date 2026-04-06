# Context Files

Hermes recognises five context file types. Only one project context type loads per session (first-match priority). `SOUL.md` always loads independently as a separate slot.

## Supported File Types

| File | Purpose | Discovery Scope |
|------|---------|----------------|
| `.hermes.md` / `HERMES.md` | Highest-priority project instructions | Walks up to git root |
| `AGENTS.md` | Project structure, conventions, architecture | CWD + subdirectories |
| `CLAUDE.md` | Claude-specific context | CWD + subdirectories |
| `SOUL.md` | Global personality / tone | `HERMES_HOME` only |
| `.cursorrules` | Cursor IDE conventions | CWD only |

## Loading Priority

Project context files are resolved with first-match logic:

```
.hermes.md → AGENTS.md → CLAUDE.md → .cursorrules
```

`SOUL.md` is always loaded as **slot #1** independent of this priority order.

## Progressive Subdirectory Discovery

As the agent navigates directories during a session it automatically discovers and injects relevant context files from subdirectories. Rules:

- Each subdirectory is checked **once per session**.
- Ancestor directories are walked up to **5 levels**.
- Files surface only when the agent enters a relevant directory, preventing system prompt bloat.
- Prompt cache stability is maintained by deferring injection until needed.

## Security Scanning

All context files are scanned for prompt injection threats before inclusion. Detected patterns:

- Instruction overrides (`"ignore previous instructions"`)
- Deception patterns (`"do not tell the user"`)
- Hidden or invisible characters
- Credential exfiltration attempts
- Commands to access secret files

Flagged files are **blocked entirely** and the user is notified.

## Size Constraints

| Scope | Limit | Truncation Strategy |
|-------|-------|---------------------|
| Root context file | 20,000 chars | 70% head + 20% tail + 10% truncation marker |
| Subdirectory files | 8,000 chars | Same strategy |

## Best Practices

- Keep `AGENTS.md` concise with structured headers, concrete examples, explicit prohibitions, and key paths/ports.
- For monorepos, use nested `AGENTS.md` files per subdirectory rather than a single large root file.
- Reserve `SOUL.md` for stable, instance-wide personality — not project-specific instructions.
- Update context files regularly as the project evolves.

## Related

- [Personality](./personality.md)
- [Memory](./memory.md)
- [Skills](./skills.md)
