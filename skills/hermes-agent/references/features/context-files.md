# Context Files

Hermes recognises several context file types. Only one project context type loads per session (first-match priority). `SOUL.md` is global to the Hermes instance and always loads independently as slot #1 from `HERMES_HOME` only.

## Supported File Types

| File | Purpose | Discovery Scope |
|------|---------|----------------|
| `.hermes.md` / `HERMES.md` | Highest-priority project instructions | Walks to git root |
| `AGENTS.override.md` | Personal, per-directory override of `AGENTS.md` (typically gitignored) | CWD at startup + subdirectories progressively |
| `AGENTS.md` | Project instructions, conventions, architecture | CWD at startup + subdirectories progressively |
| `CLAUDE.md` | Claude Code context files (also detected) | CWD at startup + subdirectories progressively |
| `SOUL.md` | Global personality / tone for this Hermes instance | `HERMES_HOME/SOUL.md` only |
| `.cursorrules` | Cursor IDE conventions | CWD only |
| `.cursor/rules/*.mdc` | Cursor IDE rule modules | CWD only |

## Loading Priority

Project context files are resolved with first-match logic:

```
.hermes.md → AGENTS.override.md → AGENTS.md → CLAUDE.md → .cursorrules
```

If an `AGENTS.override.md` exists next to an `AGENTS.md`, the override is loaded instead of the committed file. `SOUL.md` is always loaded as slot #1 independent of this order.

## AGENTS.md Directory Chain

When the working directory is inside a git repository, Hermes loads a merged chain of `AGENTS.md` files at session start: the git-root file first, then every intermediate directory down to the working directory. Deeper files appear later and take precedence; each gets its own provenance header, and identical copies are deduplicated. Outside a git repository only the working directory itself is checked (parents are never consulted).

## Progressive Subdirectory Discovery

As the agent navigates into subdirectories (via `read_file`, `terminal`, `search_files`, etc.) it discovers context files there and injects them into the tool result when they become relevant.

- Each subdirectory is checked at most once per session.
- The directory and up to 5 parent directories are checked (stopping at already-visited directories).
- First match per directory among `AGENTS.md`, `CLAUDE.md`, `.cursorrules`.
- Keeps the system prompt small and the prompt cache stable.

## Security: Prompt Injection Protection

All context files are scanned before inclusion for: instruction overrides ("ignore previous instructions"), deception patterns ("do not tell the user"), system prompt overrides, hidden HTML comments and hidden div elements, credential exfiltration (`curl ... $API_KEY`), secret file access (`cat .env`), and invisible characters (zero-width spaces, bidirectional overrides, word joiners).

A flagged project context file (`.hermes.md`, `AGENTS.md`, `CLAUDE.md`, `.cursorrules`) is blocked entirely:

```
[BLOCKED: AGENTS.md contained potential prompt injection (prompt_injection). Content not loaded.]
```

Your own `SOUL.md` in `HERMES_HOME` is the exception: a scanner hit logs a warning and the file still loads (`/context` shows a warning). A `SOUL.md` shipped by a profile distribution (`hermes profile install <git-url>` / `hermes profile update`) is still blocked on a hit.

## Size Limits

| Limit | Value |
|-------|-------|
| Max chars per startup file | `context_file_max_chars` when set; otherwise dynamic (scales with the model's context window, floor 20,000, ceiling 500,000) |
| Subdirectory hint files | Fixed cap of 32,000 characters per file (not changed by `context_file_max_chars`) |
| Read timeout per file | `context_file_read_timeout` (default 5 seconds); slower files (iCloud Drive, OneDrive, NFS) are skipped with a warning |
| Truncation | 70% head, 20% tail, 10% marker (shows char counts and suggests file tools) |

```
[...truncated AGENTS.md: kept 14000+4000 of 25000 chars. Use file tools to read the full file.]
```

## Best Practices

- Keep `AGENTS.md` concise with structured headers, concrete examples, explicit prohibitions, and key paths/ports; the agent reads it every turn.
- For monorepos, use nested `AGENTS.md` files per subdirectory rather than one large root file.
- Reserve `SOUL.md` for stable, instance-wide personality, not project-specific instructions.
- Update context files as the project evolves; stale context is worse than none.

## Notes

- The v0.22.2 docs do not mention an `/init` command for generating `AGENTS.md` on this page; it is therefore not documented here.

## Related

- [Personality](./personality.md)
- [Memory](./memory.md)
- [Skills](./skills.md)
