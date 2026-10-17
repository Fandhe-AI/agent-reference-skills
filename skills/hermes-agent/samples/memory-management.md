# Memory Management

Persist facts across sessions using the two-file memory system and search past sessions with full-text indexing.

```yaml
# ~/.hermes/config.yaml
memory:
  memory_enabled: true
  user_profile_enabled: true
  memory_char_limit: 2200    # ~800 tokens — environment facts, project conventions
  user_char_limit: 1375      # ~500 tokens — user name, preferences, skill level
```

```bash
# Both files are stored here and injected automatically at session start
ls ~/.hermes/memories/
# MEMORY.md  USER.md
```

```
# Example prompts to the agent during a session

"Remember that this project uses pnpm, not npm."
"Save that the staging DB is at postgres://staging.internal:5432/app."
"Remember this for next time."

"Search past sessions for the Docker Compose fix we did last week."
# → uses session_search tool against ~/.hermes/state.db (FTS5)

"Clean up your memory — it seems full."
# → agent consolidates or removes entries before adding new ones
```

```bash
# Optional external memory provider (one active at a time; built-in memory stays active)
hermes plugins install honcho   # catalog plugin; RetainDB / ByteRover are bundled but leave core on 2026-10-15 (see Notes)
hermes memory setup             # select the provider
```

## Notes

- Memory files are injected as frozen snapshots at session start — there is no explicit read action needed.
- `MEMORY.md` stores environment facts, conventions, completed milestones; `USER.md` stores user preferences and communication style.
- When either file exceeds its character limit, the agent must consolidate before adding new entries; consolidate proactively at ~80% capacity.
- Avoid storing large code blocks, temporary paths, or data already present in context files.
- External memory providers such as Honcho, Hindsight, Supermemory and Holographic are installed from the plugin catalog (`hermes plugins install <name>`) before setting `memory.provider`; Honcho is no longer bundled. Memory pays off at session boundaries, so run `/new` at natural breakpoints.
- Deprecation (v0.22.2): RetainDB and ByteRover leave core on October 15, 2026, and their standalone repositories are unmaintained; prefer a catalog provider (e.g. honcho) for new setups. See references/features/memory-providers.md and references/features/memory.md.
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/features/memory (pinned to v0.22.2)
