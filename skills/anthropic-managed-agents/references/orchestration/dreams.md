<!-- source: https://platform.claude.com/docs/en/managed-agents/dreams / last verified: 2026-08-07 -->

# Dreams

Dreaming is a research preview feature (request access separately) that lets Claude reflect on past sessions to curate an agent's memory. Agents write to memory stores incrementally as they work, accumulating duplicates, contradictions, and stale entries over time; a dream reads an existing memory store alongside past session transcripts and produces a new, reorganized memory store: duplicates merged, stale/contradicted entries replaced, new insights surfaced. The input store is never modified.

## How it works

A dream is an asynchronous job that takes:

- a pre-existing **memory store** — the store Claude verifies, deduplicates, and reorganizes
- 1 to 100 **sessions** — past transcripts Claude mines for patterns and insights

It produces a separate **output memory store**; the ID appears in `outputs[]` shortly after the dream starts `running`.

## Signature / Usage

```python
dream = client.beta.dreams.create(
    inputs=[
        {"type": "memory_store", "memory_store_id": store_id},
        {"type": "sessions", "session_ids": [session_a, session_b]},
    ],
    model="claude-opus-4-8",
    instructions="Focus on coding-style preferences; ignore one-off debugging notes.",
)
print(dream.id)  # drm_01...
```

Requires both `managed-agents-2026-04-01` and `dreaming-2026-04-21` beta headers (session/memory-store calls need only `managed-agents-2026-04-01`).

## Options / Props

| Field | Description |
|-------|-------------|
| `inputs` | Array combining exactly one `memory_store` input and one `sessions` input (1-100 session IDs). |
| `model` | One of `claude-opus-5`, `claude-fable-5`, `claude-opus-4-8`, `claude-opus-4-7`, `claude-sonnet-5`, `claude-sonnet-4-6`. |
| `instructions` | Optional, max 4,096 chars. High-level synthesis guidance (focus areas, what to preserve, output conventions) — not an imperative line-editor; targeted edits use the Memory Stores API directly on the output store. |

If you only have session transcripts and no existing store, create an empty memory store first and pass it as the `memory_store` input.

## Lifecycle

| `status` | Meaning |
|----------|---------|
| `pending` | Dream created and queued. |
| `running` | Pipeline processing; `usage` updates as work progresses. |
| `completed` | Finished; `outputs[]` has the new memory store. |
| `failed` | Ended with an error; output store left as-is with partial contents. |
| `canceled` | Canceled; output store left as-is. |

Poll `client.beta.dreams.retrieve(dream.id)` until `status` leaves `pending`/`running`. Once `running`, `dream.session_id` points at the underlying session running the pipeline — stream its events to watch it work live; the session is archived (not deleted) at terminal state.

## Use the output

```python
output_store_id = next(o.memory_store_id for o in dream.outputs if o.type == "memory_store")
session = client.beta.sessions.create(
    agent=agent_id, environment_id=environment_id,
    resources=[{"type": "memory_store", "memory_store_id": output_store_id}],
)
```

Either attach the output store to future sessions, or delete/archive it if unsatisfactory. Archiving or deleting an *input* memory store (or deleting an input session) mid-run causes the dream to fail with `input_memory_store_unavailable` / `input_session_unavailable`.

## Cancel / archive

```python
client.beta.dreams.cancel(dream.id)   # pending/running -> canceled, idempotent
client.beta.dreams.archive(dream.id)  # terminal-state only; sets archived_at; no unarchive
```

## Errors

| `error.type` | When |
|---------------|------|
| `timeout` | Pipeline exceeded its runtime budget. |
| `internal_error` | Unclassified pipeline failure. |
| `memory_store_org_limit_exceeded` | Org hit its memory-store cap during provisioning. |
| `input_memory_store_too_large` | Input memory store exceeds the pipeline's size limit. |
| `input_memory_store_unavailable` | Input store archived/deleted after dream creation. |
| `input_session_unavailable` | Input session deleted after dream creation. |

## Notes

- Billed at standard API token rates for the selected model; `usage` reports exact totals. Start with a small batch of sessions before scaling up.
- Limits: 100 sessions/dream, 4,096-char `instructions`.

## Related

- [Session Event Stream](./events-and-streaming.md)
