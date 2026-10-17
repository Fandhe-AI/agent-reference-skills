# Memory

Hermes provides a two-file persistent memory system (`MEMORY.md` and `USER.md`) that injects into every session, plus a full-text session search index and optional external provider plugins.

## Core Memory Files

| File | Char Limit | ~Tokens | Stores |
|------|-----------|---------|--------|
| `MEMORY.md` | 2,200 | ~800 | Environment facts, project conventions, tool quirks, completed work, techniques |
| `USER.md` | 1,375 | ~500 | User name/role/timezone, communication preferences, skill level, pet peeves |

Both files are stored in `~/.hermes/memories/` and injected as a frozen snapshot at session start. There is no explicit read action — content appears automatically in context.

## How Memory Appears in the System Prompt

Entries are rendered into the system prompt as a frozen block, with a header (MEMORY or USER PROFILE), a usage percentage and character count, and entries separated by `§` delimiters:

```
MEMORY (your personal notes) [67% — 1,474/2,200 chars]
User's project is a Rust web service at ~/code/myapi using Axum + SQLx
§
This machine runs Ubuntu 22.04, has Docker and Podman installed
```

The snapshot is captured once at session start so the prefix cache is preserved. Writes persist to disk immediately but only appear in the system prompt in the next session; tool responses always show the live state.

## Memory Needs Session Boundaries

Memory pays off when a session ends. On messaging platforms a chat is one continuous session that survives restarts, so run `/new` at natural boundaries (a finished task, a topic change, the start of a day) so the agent re-reads the updated snapshot and uses `session_search` for history. On the CLI every invocation is a new session.

## Troubleshooting: "I told it to remember, and the next session it forgot"

1. Check the write actually happened (`cat ~/.hermes/memories/MEMORY.md`); memory persists only when the model calls the `memory` tool. Small local models (roughly under 30B parameters) often claim a save they never made.
2. With `write_approval: true`, writes outside the interactive CLI are staged; run `/memory pending` and `/memory approve all`.
3. Memory is per profile (`hermes -p work` reads `~/.hermes/profiles/work/memories/`).
4. Check memory is enabled. Setting both `memory.memory_enabled: false` and `memory.user_profile_enabled: false` (or listing `memory` under `agent.disabled_toolsets`) removes the tool; with only `memory_enabled: false` the tool stays but advertises only the `user` target and rejects `MEMORY.md` writes.
5. The snapshot is frozen at session start; start a new session after the write.

`.env` variables are not memory. For a location needed on every run of a recurring task, a skill is often a better home than a memory entry.

## Memory Tool Actions

| Action | Description |
|--------|-------------|
| `add` | Create a new entry |
| `replace` | Update existing content via substring match on `old_text` |
| `remove` | Delete an entry via substring match |

## What to Save vs. Avoid

**Save:**
- User preferences and corrections
- Environment configuration details
- Project conventions discovered during work
- Completed milestones
- Explicit user requests

**Avoid:**
- Trivial or commonly-known facts
- Large code blocks
- Temporary file paths
- Data already present in context files

## Capacity Management

When a file exceeds its character limit the agent receives an error listing current entries. The agent must consolidate or remove entries before adding new ones. Best practice: consolidate when usage reaches 80% of the limit.

## Session Search

The `session_search` tool queries a SQLite database at `~/.hermes/state.db` using FTS5 full-text search across all past sessions. In v0.22.2 docs, queries return the actual messages from the DB with no LLM summarization and no truncation (~20ms FTS5 query, ~1ms scroll), and the agent can scroll forward/backward inside any session it finds. Persistent memory holds ~1,300 tokens of always-present facts; session search is unlimited and on-demand.

## Duplicate Prevention and Security Scanning

- Exact duplicate entries are rejected (success with a "no duplicate added" message).
- Entries are scanned for injection and exfiltration patterns (prompt injection, credential exfiltration, SSH backdoors) and invisible Unicode characters before being accepted, since they enter the system prompt.

## Learning Journey (`/journey`)

A timeline of saved skills and memory entries over time. `hermes journey` (aliases `hermes learning`, `hermes memory-graph`; flags `--play`, `--fps`, `--width`/`--height`, `--no-color`, `--json`), `/journey` in the TUI and Desktop (Star Map panel).

| Command | What it does |
|---------|--------------|
| `hermes journey list` | List node ids (skill names and `memory:<source>:<index>:<fingerprint>` ids) |
| `hermes journey delete <node> [-y]` | Delete a node; skills are archived (restorable), memory chunks removed |
| `hermes journey edit <node>` | Open the node's content in `$EDITOR` |

## External Memory Providers

Hermes ships with two bundled external provider plugins, RetainDB and ByteRover. Honcho, Hindsight, Supermemory, Mem0, OpenViking and Holographic moved to the plugin catalog in v0.22.0: install with `hermes plugins install <name>` (existing users are migrated automatically, data intact). Providers run alongside built-in memory (never replacing it); only one external provider can be active at a time.

| Plugin | Capability | Distribution |
|--------|-----------|--------------|
| Honcho | Dialectic user behavioral modeling | Catalog plugin |
| OpenViking | Knowledge graph with `viking://` URI browsing | Catalog plugin |
| Mem0 | Fast semantic search; automatic capture | Catalog plugin |
| Hindsight | Knowledge graph, entity resolution, multi-strategy retrieval | Catalog plugin |
| Holographic | Local SQLite FTS5, trust scoring, HRR algebraic queries | Catalog plugin |
| RetainDB | Cloud hybrid search (Vector + BM25 + Reranking), 7 memory types | Bundled |
| ByteRover | Structured markdown context tree, LLM-powered curation | Bundled |
| Supermemory | Semantic search, automatic fact extraction, cross-session modeling | Catalog plugin |

```bash
hermes memory setup      # pick a provider and configure it
hermes memory status     # check what's active
```

Per-provider details are on the Memory Providers feature page.

## Configuration

```yaml
memory:
  memory_enabled: true
  user_profile_enabled: true
  memory_char_limit: 2200   # ~800 tokens
  user_char_limit: 1375     # ~500 tokens
  write_approval: false     # false = write freely (default) | true = require approval
  prefetch_spill_enabled: false
```

- Setting both `memory_enabled` and `user_profile_enabled` to `false` turns the built-in stores off and drops the `memory` tool from the schema; an external provider set via `memory.provider` is unaffected. Listing `memory` under `agent.disabled_toolsets` also hides external provider tools.
- With only `memory_enabled: false` (user profile still on), the tool stays because it backs the profile store; the tool schema advertises only the `user` target and writes to `MEMORY.md` are rejected. The inverse configuration advertises only `memory` and rejects `USER.md` writes. (Source: https://hermes-agent.nousresearch.com/docs/user-guide/features/memory, pinned to v0.22.2 — troubleshooting step 4 and Configuration section.)
- `memory.prefetch_spill_enabled: true` replaces oversized external recall with a head/tail preview and file path (restart after changing).

## Controlling memory writes (`write_approval`)

With `memory.write_approval: true`, interactive CLI foreground writes prompt inline; everywhere else (messaging, scripts, background review) writes are staged:

```
/memory pending             # list staged writes
/memory approve <id|all>    # apply
/memory reject <id|all>     # drop
/memory approval on|off     # toggle and persist
```

Approval applies to exactly the entry targeted when staged; if it changed since, the write is refused and stays pending.

## Background review

- `display.memory_notifications: off | on (default) | verbose` controls the `💾 Memory updated` line after the background self-improvement review.
- `auxiliary.background_review.provider` / `.model` runs the review on a cheaper model (`auto` = main model; ~3-5x cheaper in benchmarks). A same-model review always inherits the parent's reasoning effort.
- Skill writes use a similar gate: `skills.write_approval: true` stages all skill writes; review with `/skills pending`, `/skills diff <id>`, `/skills approve <id|all>`, `/skills reject <id|all>`, `/skills approval on|off`.

## Related

- [Context Files](./context-files.md)
- [Tools](./tools.md)
