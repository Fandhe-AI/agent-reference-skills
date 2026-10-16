<!-- source: https://platform.claude.com/docs/en/managed-agents/memory / last verified: 2026-10-17 -->

# Using agent memory

Memory stores give agents persistent memory across sessions: a workspace-scoped collection of text documents, mounted as a directory in the sandbox, that the agent reads/writes with normal file tools.

## Signature / Usage

```python
store = client.beta.memory_stores.create(
    name="User Preferences",
    description="Per-user preferences and project context.",
)
session = client.beta.sessions.create(
    agent=agent.id,
    environment_id=environment.id,
    resources=[{
        "type": "memory_store",
        "memory_store_id": store.id,
        "access": "read_write",
        "instructions": "Check before starting any task.",
    }],
)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `resources[].memory_store_id` | string | Store ID (`memstore_...`); attach up to 8 stores per session, only at session creation (cannot add/remove from a running session) |
| `resources[].access` | string | `read_write` (default) or `read_only` |
| `resources[].instructions` | string | Optional session-specific guidance shown to the agent alongside the store's `name`/`description`; max 4,096 chars |
| `memories.list(path_prefix, depth)` | method | `GET /v1/memory_stores/{memory_store_id}/memories`; stable, server-defined order. `path_prefix` scopes to one directory: it must end with `/` and matches whole path segments (`/notes/` returns `/notes/todo.md` but not `/notes-archive/todo.md`). `depth`: omit or `0` lists the whole subtree, `1` lists only immediate children; other values return 400 |
| `memory_stores.list(include_archived)` | method | Archived stores are excluded by default; set `include_archived` to `true` to include them |
| `memories.create(path, content)` | method | Create a memory (path-addressed); does not overwrite — use `memories.update` for that |
| `memories.update(precondition)` | method | Optimistic concurrency via `content_sha256` precondition |

## Notes

- The `agent_toolset_20260401` toolset (with the `read` tool) is required for the agent to interact with mounted memory; enable it on the agent.
- Memory stores use the `agent-memory-2026-07-22` beta header — do not combine it with `managed-agents-2026-04-01` on memory store requests (400 error). Session endpoints (including attaching a store) still use `managed-agents-2026-04-01`.
- Individual memories are capped at 100 kB (~25k tokens); a store holds max 10,000 memories (the source's earlier figure of 2,000 is superseded). Writes to unmapped paths under `/mnt/memory/` land in local scratch and are lost.
- `read_write` is the default access; use `read_only` for reference material to reduce prompt-injection blast radius (untrusted input could otherwise write malicious content that later sessions read as trusted memory).
- Every memory mutation creates an immutable memory version (`memver_...`); versions belong to the store, survive memory deletion, and are retained 30 days (recent versions kept longer). Redact a version to scrub content while preserving the audit trail (cannot redact a live memory's current head — write a new version or delete the memory first).
- Archiving a store is one-way (no unarchive) and makes it read-only.
- Best practices for memory management: when a store reaches its 10,000-memory limit, writes to new memories fail (both direct `POST .../memories` calls and the agent's file writes to unmapped paths); existing memories stay readable and editable.
  - Use focused stores (one per user, one for shared domain knowledge, one per project); each has its own limit.
  - Condense or prune before the store fills: delete stale memories with `DELETE .../memories/{memory_id}`, or run a dream, which consolidates into a separate output store; switch sessions to the output store, then archive or delete the original.
  - Attach a fresh store when one outgrows its scope, and attach the original with `read_only` access.
  - Limit write access: sessions that only read shared reference material don't need `read_write`.
- Memory stores can also be attached to sessions on self-hosted environments (the only resource type those support); see the self-hosted memory page.

## Related

- [Adding files](./files.md)
- [Memory stores on self-hosted sandboxes](../environments/self-hosted-sandboxes-memory.md)
