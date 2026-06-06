# Memory

Hermes provides a two-file persistent memory system (`MEMORY.md` and `USER.md`) that injects into every session, plus a full-text session search index and optional external provider plugins.

## Core Memory Files

| File | Char Limit | ~Tokens | Stores |
|------|-----------|---------|--------|
| `MEMORY.md` | 2,200 | ~800 | Environment facts, project conventions, tool quirks, completed work, techniques |
| `USER.md` | 1,375 | ~500 | User name/role/timezone, communication preferences, skill level, pet peeves |

Both files are stored in `~/.hermes/memories/` and injected as a frozen snapshot at session start. There is no explicit read action — content appears automatically in context.

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

The `session_search` tool queries a SQLite database at `~/.hermes/state.db` using FTS5 full-text search across all past sessions. Results include Gemini Flash summaries to help locate specific discussions.

## External Memory Providers

Eight plugins extend (never replace) the built-in memory system. Only one external provider can be active at a time.

| Plugin | Capability |
|--------|-----------|
| Honcho | Dialectic user behavioral modeling |
| OpenViking | Knowledge graph with `viking://` URI browsing |
| Mem0 | Fast semantic search; automatic capture |
| Hindsight | Knowledge graph, entity resolution, multi-strategy retrieval |
| Holographic | Local SQLite FTS5, trust scoring, HRR algebraic queries |
| RetainDB | Cloud hybrid search (Vector + BM25 + Reranking), 7 memory types |
| ByteRover | Structured markdown context tree, LLM-powered curation |
| Supermemory | Semantic search, automatic fact extraction, cross-session modeling |

## Configuration

```yaml
memory:
  memory_enabled: true
  user_profile_enabled: true
  memory_char_limit: 2200
  user_char_limit: 1375
```

## Related

- [Context Files](./context-files.md)
- [Tools](./tools.md)
