<!-- source: https://platform.claude.com/docs/en/models/fable-5-1/migration-guide / last verified: 2026-10-17 -->

# Claude Fable 5.1 and Claude Mythos 5.1 migration guide

Migrating Messages API code to `claude-fable-5-1` / `claude-mythos-5-1` from Claude Fable 5, Claude Mythos 5, Claude Opus 5, or Claude Opus 4.8. Claude Managed Agents users only need to update the model name.

## Signature / Usage

```python
model = "claude-fable-5"  # Before
model = "claude-fable-5-1"  # After

# Or, for Claude Mythos 5.1, which offers the same capabilities to verified organizations:
model = "claude-mythos-5-1"  # After
```

Forced tool choice replacement: keep `tool_choice` at `auto`, name the tool in the instruction, and set `strict: true`.

```python
record_summary_tool = {
    "name": "record_summary",
    "description": "Record the structured summary of the document.",
    "strict": True,
    "input_schema": {
        "type": "object",
        "properties": {"summary": {"type": "string"}},
        "required": ["summary"],
        "additionalProperties": False,
    },
}

response = client.messages.create(
    model="claude-fable-5-1",
    max_tokens=16000,
    tools=[record_summary_tool],
    tool_choice={"type": "auto"},
    messages=[
        {
            "role": "user",
            "content": "Summarize: The meeting moved to Thursday. Call the record_summary tool with your result.",
        }
    ],
)
```

## Notes

- **Baseline (both models):** adaptive thinking always on (`disabled` and `budget_tokens` return 400); prefill returns 400; 1M context window default, up to 128k output; $10 / $50 per MTok with cache reads $0.25 (a quarter of Fable 5); 30-day data retention required, not available under ZDR unless expressly authorized, Covered Models (a request from an organization or workspace without 30-day retention returns 400 `invalid_request_error`). Neither is on Priority Tier (Fable 5 is).
- **From Fable 5, mostly drop-in.** Breaking changes: (1) forced `tool_choice` returns 400 on the Messages API, Message Batches API, and token counting; (2) only Fable 5.1 and Mythos 5.1 read Fable 5.1 thinking blocks (reason `model_binding_mismatch` in `input_transformations` with header `thinking-binding-controls-2026-08-01`); (3) editing earlier turns invalidates thinking blocks.
- **Forced tool alternative:** if the application must require a tool call on the current turn, append a mid-conversation `{"role": "system", ...}` message after the latest user turn (no beta header) naming the tool, and keep it in history on later requests. In a CMEK organization `strict: true` is not available on Claude Fable models; rely on the instruction alone.
- **History-editing check:** error text is `Invalid signature in thinking block. The block is bound to a different conversation.`; enforced by default for accounts created on or after August 31, 2026 (older accounts opt in by setting `thinking.block_binding.prefix_mismatch_behavior`). The error is permanent for that request body. Options: strip thinking blocks and retry once, or send header `thinking-binding-controls-2026-08-01` with `prefix_mismatch_behavior: "drop_block"` (default `"error"`); drops report `reason: "prefix_binding_mismatch"`. Patterns that keep working: append-only histories, removing thinking blocks oldest first, changing `effort` / `max_tokens` / `cache_control` markers, server-side compaction and context editing. Three-step check: capture consecutive request bodies and diff `system` / `tools` / shared `messages` prefix; run a session with `drop_block` and log `input_transformations`; choose a production setting. Use `"error"` in CI.
- **Compaction:** simple compaction (replace history with one summary message plus new user turn) is recommended; keep-tail compaction needs thinking blocks stripped from kept turns or `drop_block`; background compaction needs `drop_block` on requests that still carry pre-swap blocks. Do not snip turns from the middle.
- **Behavior changes:** fewer parallel tool calls in long agent loops (add a one-sentence batching instruction, ideally as a turn-scoped system message with `clear_at: "next_user_message"`); fewer progress messages (set `thinking.display` to `"updates"` (beta) or `"summarized"`); fewer search / retrieval calls at `low` effort.
- **Recommended:** per-message effort (beta, header `mid-conversation-output-config-2026-07-01`) via an effort-only `role: "system"` message; `fallbacks: "default"` (beta) for refusals.
- **From Opus 5:** thinking can no longer be disabled (400 at any effort); forced tool choice returns 400; Fable 5.1 reads Opus 5 blocks but not the reverse; text between tool calls arrives as `thinking` blocks; broader safety classifiers (e.g. `"bio"`); pricing $10 / $50 vs $5 / $25 (cache reads half the Opus 5 rate); 30-day retention, not ZDR (Opus 5 is available under ZDR).
- **From Opus 4.8 or earlier:** also read content blocks by `type` (responses can start with `thinking` blocks); minimum cacheable prompt 512 tokens (1,024 on Opus 4.8); integrations that truncate old turns or refresh `system` each request invalidate later thinking blocks. Opus 4.7 or earlier: start with the Claude Opus 5.5 migration guide sections.
- **Mythos 5.1 from Mythos 5:** same API-level delta, except Mythos 5.1 does not run the conversation check (edits do not invalidate its thinking blocks, though the prompt cache still restarts). Mythos 5.1 reads Mythos 5 blocks, not the reverse. Cache reads cost a quarter of the Mythos 5 rate.
- Claude Code: `/claude-api migrate this project to claude-fable-5-1` applies model ID swaps and parameter changes and produces a verification checklist.

## Related

- [What's new in Claude Fable 5.1](./whats-new-fable-5-1.md)
- [Migration Guide](./migration-guide.md)
- [Models overview](./overview.md)
