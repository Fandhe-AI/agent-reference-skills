<!-- source: https://platform.claude.com/docs/en/api/beta/memory_stores/create, /list, /retrieve, /update, /delete, /archive, /memories/create, /memories/list, /memories/retrieve, /memories/update, /memories/delete, /memory_versions/list, /memory_versions/retrieve, /memory_versions/redact / last verified: 2026-08-07 -->

# Memory Stores API

A `memory_store` is a named, workspace-scoped container of hierarchical text `memories` (a virtual filesystem). Attach it to a session (`resources[]`, `type:"memory_store"`) to mount it under `/mnt/memory/<slug>/` where the agent reads/writes files. Every mutation to a `memory` appends an immutable `memory_version` row.

## Signature / Usage

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/memory_stores` | Create a memory store |
| GET | `/v1/memory_stores` | List memory stores (paginated, `created_at` range, `include_archived`) |
| GET | `/v1/memory_stores/{memory_store_id}` | Retrieve a memory store |
| POST | `/v1/memory_stores/{memory_store_id}` | Update name/description/metadata |
| DELETE | `/v1/memory_stores/{memory_store_id}` | Permanently delete a store (and all memories/versions) |
| POST | `/v1/memory_stores/{memory_store_id}/archive` | Archive a store |
| POST | `/v1/memory_stores/{memory_store_id}/memories` | Create a memory (text document at a path) |
| GET | `/v1/memory_stores/{memory_store_id}/memories` | List/browse memories (`ls`/`find`-style via `depth`) |
| GET | `/v1/memory_stores/{memory_store_id}/memories/{memory_id}` | Retrieve a memory |
| POST | `/v1/memory_stores/{memory_store_id}/memories/{memory_id}` | Update content and/or rename (path) a memory |
| DELETE | `/v1/memory_stores/{memory_store_id}/memories/{memory_id}` | Delete a memory (history persists) |
| GET | `/v1/memory_stores/{memory_store_id}/memory_versions` | List version history (filterable by memory/session/api_key/operation) |
| GET | `/v1/memory_stores/{memory_store_id}/memory_versions/{memory_version_id}` | Retrieve a version |
| POST | `/v1/memory_stores/{memory_store_id}/memory_versions/{memory_version_id}/redact` | Redact a version's content (GDPR-style erasure) |

```bash
curl https://api.anthropic.com/v1/memory_stores/$MEMORY_STORE_ID/memories \
  -H 'Content-Type: application/json' \
  -H 'anthropic-version: 2023-06-01' \
  -H 'anthropic-beta: agent-memory-2026-07-22' \
  -H "X-Api-Key: $ANTHROPIC_API_KEY" \
  -d '{"content": "User prefers dark mode.", "path": "/preferences/ui.md"}'
```

## Options / Props

### Create/Update Memory Store body

| Name | Type | Description |
|------|------|-------------|
| `name` | string (create: required, 1-255 chars) | Mount-path slug under `/mnt/memory/` is derived (lowercased, non-alphanumeric collapsed to `-`); need not be unique in a workspace; renaming changes the slug for sessions created after |
| `description` | optional string (≤1024 chars) | Rendered into the agent's system prompt when attached |
| `metadata` | optional map[string] (≤16 pairs) | Not visible to the agent; update uses patch semantics (value `null` deletes a key) |

Delete returns `{id, type:"memory_store_deleted"}`. List query: `created_at[gte/lte]`, `include_archived` (default false), `limit` (1-100, default 20), `page`.

### Memory (`BetaManagedAgentsMemory`)

| Name | Type | Description |
|------|------|-------------|
| `id` (`mem_...`) | string | Stable across renames; use for read/update/delete, not path |
| `path` | string | Starts with `/`, ≤1024 bytes, case-sensitive, unique per store; no `.`/`..`/empty segments, NFC-normalized |
| `content` | optional string (≤100 kB) | Populated only when `view=full`; `null` under `view=basic` (default) |
| `content_sha256`, `content_size_bytes` | string / number | Always populated regardless of `view`, for diff without fetching content |
| `memory_version_id` | string (`memver_...`) | Head pointer to the current `memory_version` — the authoritative "latest"; `memory_version` rows carry no `is_latest` flag |
| `memory_store_id`, `created_at`, `updated_at` | | |

Create body: `content` (required, `""` allowed, ≤100 kB), `path` (required). Query `view: "basic"|"full"` on create/retrieve/update/list (`full` populates `content`).

Update body: `content?`, `path?` (rename; `id` unchanged), `precondition?: {type:"content_sha256", content_sha256}` — optimistic concurrency; mismatch → 409 `memory_precondition_failed_error` unless the stored state already matches the request, in which case 200. Delete accepts query `expected_content_sha256?` and returns `{id, type:"memory_deleted"}` (history persists).

### List Memories query

| Name | Type | Description |
|------|------|-------------|
| `path_prefix` | optional string, must end `/` | Filter |
| `depth` | optional number | `0`/omitted = recursive (`find`-like); `1` = immediate children only, deeper entries roll up as `memory_prefix` items (`ls`-like) |
| `view` | `"basic"\|"full"` | `full` caps `limit` at 20 |
| `limit` (1-100, default 20), `page` | | Both `memory` and `memory_prefix` items count toward `limit` |

Response `data[]` items are `BetaManagedAgentsMemory` or `BetaManagedAgentsMemoryPrefix{path, type:"memory_prefix"}` (a listing-time rollup marker, no ID/lifecycle).

### Memory Version (`BetaManagedAgentsMemoryVersion`)

| Name | Type | Description |
|------|------|-------------|
| `id` (`memver_...`) | string | Immutable, attributed row; append-only per memory |
| `operation` | `"created"\|"modified"\|"deleted"` | One row per non-no-op mutation |
| `content`, `content_sha256`, `content_size_bytes` | optional | `null` when `view=basic`, `operation:"deleted"`, or `redacted_at` set |
| `path` | optional string | `null` iff `redacted_at` is set |
| `created_by` / `redacted_by` | `Actor` union: `SessionActor{session_id,type:"session_actor"}` \| `APIActor{api_key_id,type:"api_actor"}` \| `UserActor{user_id,type:"user_actor"}` | Attribution captured at write/redact time; agent writes via a session are **not** attributed to the API key that created the session — look up session provenance separately |
| `redacted_at` | optional timestamp | Retrieving a redacted version returns HTTP 200 with content/path/hash/size nulled — branch on `redacted_at`, not status code |

List query: `memory_id?`, `session_id?`, `api_key_id?`, `operation?`, `created_at[gte/lte]?`, `view?`, `limit?`, `page?`; ordered newest-first (`created_at` desc, `id` tiebreak). Versions persist and remain listable after the parent memory is deleted; pass `memory_id` to retrieve full lineage including the `deleted` row.

Redact (`POST .../memory_versions/{id}/redact`) takes no body; returns the version with `content`/`path`/hash/size nulled and `redacted_at`/`redacted_by` set.

## Notes

- All memory-store endpoints use `anthropic-beta: agent-memory-2026-07-22` — **not** `managed-agents-2026-04-01` (which covers sessions/environments/vaults). Attaching a memory store to a session (via `sessions` create/update `resources[]`) still requires `managed-agents-2026-04-01` on that call.
- The agent accesses memories as a mounted filesystem at `/mnt/memory/<store-slug>/`, not via this API directly; this API is for the client-side management/sync/audit surface.
- Redaction is a version-level content erasure, distinct from deleting a memory or the whole store — deletion of the store is the only operation that removes version history entirely.

## Related

- [sessions.md](./sessions.md) — `memory_store` resource type mounted via `resources[]`, and `memory_store_id` filter on List Sessions
