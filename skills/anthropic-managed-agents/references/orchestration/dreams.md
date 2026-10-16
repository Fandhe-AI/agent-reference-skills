<!-- source: https://platform.claude.com/docs/en/managed-agents/dreams / last verified: 2026-10-17 -->

# Dreams

Dreaming is a research preview feature (request access separately) that lets Claude reflect on past sessions to curate an agent's memory. Agents write to memory stores incrementally as they work, accumulating duplicates, contradictions, and stale entries over time; a dream reads an existing memory store alongside past session transcripts and produces a new, reorganized memory store: duplicates merged, stale/contradicted entries replaced, new insights surfaced. The input store is never modified.

## Signature / Usage

A dream is an asynchronous job that takes a pre-existing **memory store** (the store Claude verifies, deduplicates, and reorganizes) and 1 to 100 **sessions** (past transcripts Claude mines for patterns and insights). It produces a separate **output memory store**; the ID appears in `outputs[]` shortly after the dream starts `running`.

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
| `model` | One of `claude-opus-5-5`, `claude-fable-5-1`, `claude-opus-5`, `claude-fable-5`, `claude-opus-4-8`, `claude-opus-4-7`, `claude-sonnet-5-5`, `claude-sonnet-5`, `claude-sonnet-4-6`. |
| `instructions` | Optional, max 4,096 chars. High-level synthesis guidance (focus areas, what to preserve, output conventions) — not an imperative line-editor; targeted edits use the Memory Stores API directly on the output store. |

Dream `status` lifecycle:

| `status` | Meaning |
|----------|---------|
| `pending` | Dream created and queued. |
| `running` | Pipeline processing; `usage` updates as work progresses. |
| `completed` | Finished; `outputs[]` has the new memory store. |
| `failed` | Ended with an error; output store left as-is with partial contents. |
| `canceled` | Canceled; output store left as-is. |

`error.type` values (non-exhaustive):

| `error.type` | When |
|---------------|------|
| `timeout` | Pipeline exceeded its runtime budget. |
| `internal_error` | Unclassified pipeline failure. |
| `memory_store_org_limit_exceeded` | Org hit its memory-store cap during provisioning. |
| `input_memory_store_too_large` | Input memory store exceeds the pipeline's size limit. |
| `input_memory_store_unavailable` | Input store archived/deleted after dream creation. |
| `input_session_unavailable` | Input session deleted after dream creation. |

## Notes

- Steering: `instructions` is applied throughout the pipeline: what to read closely, what to merge or drop, and how to structure the output store. The pipeline is a synthesis pass over the inputs, not an editor applied to the text of the store, so imperative directives that target specific lines ("change sentence X to Y") generally produce no change. To make targeted edits to individual memories, use the Memory Stores API on the output store directly.
- Listing: `client.beta.dreams.list(limit=20)` returns all non-archived dreams in the workspace, newest first. `limit` defaults to 20 (max 100); paginate with the `page` cursor. Set `include_archived` to `true` to include archived dreams.
- Polling: call `client.beta.dreams.retrieve(dream.id)` until `status` leaves `pending`/`running`.
- Watching: once a dream is `running`, `dream.session_id` points at the underlying session running the pipeline. Stream that session's events to observe what the dream is reading and writing in real time. The session is archived (not deleted) when the dream reaches a terminal state, so the transcript remains available afterward.
- Using the output: attach the output store to future sessions via `resources=[{"type": "memory_store", "memory_store_id": output_store_id}]` at session creation, or delete/archive it if unsatisfactory. Archiving or deleting an *input* memory store (or deleting an input session) mid-run causes the dream to fail with `input_memory_store_unavailable` / `input_session_unavailable`.
- Cancel / archive: `client.beta.dreams.cancel(dream.id)` moves pending/running to canceled (idempotent); `client.beta.dreams.archive(dream.id)` works in a terminal state only, sets `archived_at`, and has no unarchive.
- If you only have session transcripts and no existing store, create an empty memory store first and pass it as the `memory_store` input.
- Billing: dreams are billed at standard API token rates for the model you select; `usage` on the resource reports the exact totals. Cost scales roughly linearly with the number and length of input sessions. Start with a small batch of sessions and scale up once you're satisfied with the curation quality.
- Limits: 100 sessions per dream; `instructions` up to 4,096 characters. Default rate limits apply to dream creation while this feature is in research preview.

## Related

- [Session Event Stream](./events-and-streaming.md)
