<!-- source: https://platform.claude.com/docs/en/api/beta/dreams/create.md, https://platform.claude.com/docs/en/api/beta/dreams/list.md, https://platform.claude.com/docs/en/api/beta/dreams/retrieve.md, https://platform.claude.com/docs/en/api/beta/dreams/cancel.md, https://platform.claude.com/docs/en/api/beta/dreams/archive.md / last verified: 2026-08-07 -->

# Dreams API

A `dream` is an asynchronous memory-consolidation job: it reads a memory store plus a set of session transcripts and writes consolidated memories into a new output memory store.

## Signature / Usage

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/dreams` | Create a Dream |
| GET | `/v1/dreams` | List Dreams (filters: `statuses[]`, `created_at[gt/lt]`, `include_archived`) |
| GET | `/v1/dreams/{dream_id}` | Get a Dream |
| POST | `/v1/dreams/{dream_id}/cancel` | Cancel a Dream |
| POST | `/v1/dreams/{dream_id}/archive` | Archive a Dream |

```http
curl https://api.anthropic.com/v1/dreams \
    -H 'Content-Type: application/json' \
    -H 'anthropic-version: 2023-06-01' \
    -H 'anthropic-beta: dreaming-2026-04-21' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY" \
    -d '{
          "inputs": [
            { "memory_store_id": "memstore_011...", "type": "memory_store" },
            { "session_ids": ["sess_011..."], "type": "sessions" }
          ],
          "model": "claude-opus-4-7"
        }'
```

## Options / Props

### Body parameters (Create)

| Name | Type | Description |
|------|------|-------------|
| `inputs` | `array<MemoryStoreInput \| SessionsInput>` | `{memory_store_id, type:"memory_store"}` (read-only, never mutated) or `{session_ids: [...], type:"sessions"}`. |
| `model` | `string \| {id, speed?}` | Model applied to every pipeline stage. `speed` optional `"standard"`\|`"fast"`. |
| `instructions` | `optional string` | Guidance for the consolidation process. |

### List Dreams query parameters

| Name | Type | Description |
|------|------|-------------|
| `statuses` | `optional array<"pending"\|"running"\|"completed"\|"failed"\|"canceled">` | Repeat param to match multiple. |
| `created_at[gt]` / `created_at[lt]` | `optional string` | Exclusive bounds (RFC 3339). |
| `include_archived` | `optional boolean` | |
| `limit` | `optional number` | |
| `page` | `optional string` | Cursor. |

### Response object `BetaDream`

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | |
| `type` | `"dream"` | |
| `status` | `"pending"\|"running"\|"completed"\|"failed"\|"canceled"` | |
| `inputs` | `array<MemoryStoreInput \| SessionsInput>` | Echoes request. |
| `outputs` | `array<{memory_store_id, type:"memory_store"}>` | Consolidated-memory output store(s), populated on completion. |
| `instructions` | `string` | |
| `model` | `{id, speed?}` | |
| `session_id` | `string` | Internal session the dream pipeline runs in. |
| `error` | `{message, type} \| null` | Set when `status` is `failed`. |
| `usage` | `{cache_creation_input_tokens, cache_read_input_tokens, input_tokens, output_tokens}` | Cumulative across every pipeline stage. |
| `archived_at`, `created_at`, `ended_at` | `string` (RFC 3339) | |

List endpoint wraps in `{data: array<Dream>, next_page}`.

## Notes

- Beta; requires header `anthropic-beta: dreaming-2026-04-21` (or a superset) on every request.
- **Research preview**: request/response shapes are volatile and may change without the deprecation period that applies to GA endpoints.
- `session_id` in the response is the dream's own internal processing session, distinct from the `session_ids` supplied as input.

## Related

- [deployments.md](./deployments.md) — `memory_store` resource attachment for agent sessions
- [webhooks.md](./webhooks.md) — `memory_store.created` / `memory_store.archived` / `memory_store.deleted` events
