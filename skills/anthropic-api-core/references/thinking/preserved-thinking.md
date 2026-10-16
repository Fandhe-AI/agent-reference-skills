<!-- source: https://platform.claude.com/docs/en/build-with-claude/preserved-thinking / last verified: 2026-10-17 -->

# Preserved thinking

Preserved thinking is a property of newer Claude models that guards against distillation. When a `thinking` or `redacted_thinking` block is sent back, the API checks its `signature` to decide whether the current model can read it and whether anything before it has changed.

## Signature / Usage

Opt into the controls with the beta header `thinking-binding-controls-2026-08-01` and set `thinking.block_binding.prefix_mismatch_behavior`:

```bash
curl https://api.anthropic.com/v1/messages \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "anthropic-beta: thinking-binding-controls-2026-08-01" \
  -H "content-type: application/json" \
  -d '{
    "model": "claude-fable-5-1",
    "max_tokens": 16000,
    "thinking": {
      "type": "adaptive",
      "block_binding": {
        "prefix_mismatch_behavior": "drop_block"
      }
    },
    "messages": [
      {
        "role": "user",
        "content": "What is the greatest common divisor of 1071 and 462?"
      }
    ]
  }'
```

Each dropped block is listed in a top-level `input_transformations` array on the response (on the `message_start` event when streaming):

```json
{
  "input_transformations": [
    {
      "type": "thinking_dropped",
      "path": "messages.1.content.0",
      "reason": "prefix_binding_mismatch"
    }
  ]
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `thinking.block_binding.prefix_mismatch_behavior` | `"error"` \| `"drop_block"` | `"error"` (default): 400 `invalid_request_error` naming the first failing block. `"drop_block"`: drop each failing block and every thinking block after it; request succeeds, dropped blocks are not billed, prompt cache restarts at the edit. Setting either value opts the request into enforcement. |
| `input_transformations[].type` | `thinking_dropped` \| `thinking_mismatch_allowed` | `thinking_dropped`: block removed before the model reads it (not billed). `thinking_mismatch_allowed`: block fails the prefix check but the API does not enforce it for this request, so it reaches the model and is billed. |
| `input_transformations[].reason` | string | `prefix_binding_mismatch`, `model_binding_mismatch`, `organization_binding_mismatch`. Ignore unrecognized `type` / `reason` values; later checks add values. |
| `input_transformations[].path` | string | Location of the block, e.g. `messages.1.content.0`. |

What counts as an edit (consecutive requests; the prefix is top-level `system`, `tools`, and `messages` before the block):

| Change between requests | Later thinking blocks |
|---|---|
| Append messages at the end | Valid |
| Add a tool with `defer_loading: true` that nothing has referenced yet | Valid |
| Remove `thinking` blocks from the start, the end, or all | Valid (model loses that reasoning) |
| Change request parameters outside `system` / `tools` / `messages` (`effort`, `max_tokens`, `output_config`, `tool_choice`, `metadata`, `thinking.display`) | Valid |
| Add, move, or remove `cache_control` markers | Valid |
| Rotating signed URL returning the same bytes | Valid |
| Server-side compaction or context editing | Valid (check compares what you sent) |
| Edit, reorder, or delete any earlier `user` / `assistant` / `system` message | Invalid (except the signed block from on-demand compaction under its conditions for kept thinking) |
| Re-render context in the first user message with a changed value | Invalid for every thinking block |
| Clear or shorten an earlier `tool_result`, re-encode an earlier image, change an earlier `tool_use` input | Invalid for every later thinking block |
| Add/remove a text block in an earlier user turn | Invalid |
| Change top-level `system` | Invalid |
| Add, remove, rename, or edit a tool in `tools` | Invalid |
| Remove a thinking block from the middle and keep later ones | Invalid for every later thinking block |
| Put back a thinking block removed earlier | Invalid for blocks produced while it was gone |
| Image/document URL returning different bytes | Invalid |

Replacements that leave the prefix unchanged:

| Instead of | Use | Beta header |
|---|---|---|
| Rebuilding top-level `system` | Mid-conversation `role: "system"` message | None |
| Re-rendering context in the first user message | Render once; put changes in the newest turn | None |
| Clearing/shortening old `tool_result`, re-encoding images in place | Shorten before first send, or server-side `clear_tool_uses_20250919` | `context-management-2025-06-27` |
| Injecting then deleting a reminder | Turn-scoped system message (`clear_at: "next_user_message"`) | `mid-conversation-system-clear-at-2026-08-21` |
| Adding/removing entries in `tools` | `tool_addition` / `tool_removal` blocks | `inline-tools-2026-09-15` (plus `mcp-client-2026-09-15` for MCP connector tools), or older `mid-conversation-tool-changes-2026-07-01` |
| Changing top-level `output_config.effort` | Per-message `output_config` | `mid-conversation-output-config-2026-07-01` |
| Dropping/summarizing old turns on the client | On-demand compaction, server-side compaction / context editing, or client-side compaction that keeps no stale thinking | `compact-2026-09-04` |
| Image/document URL whose bytes change | `file_id` from the Files API, or base64 | None |

Mid-conversation system message example:

```json
{
  "role": "system",
  "content": "The user switched the workspace to read-only mode. Do not write files until told otherwise."
}
```

Turn-scoped reminder (requires `mid-conversation-system-clear-at-2026-08-21`); place after the `tool_result` user message:

```json
{
  "role": "system",
  "clear_at": "next_user_message",
  "content": "Request every independent read in one turn."
}
```

Withdraw a tool without editing `tools`:

```json
{
  "role": "system",
  "content": [
    { "type": "tool_removal", "tool": { "type": "tool_reference", "name": "delete_branch" } },
    { "type": "text", "text": "Branch deletion is disabled for the rest of this session." }
  ]
}
```

Per-message effort (requires `mid-conversation-output-config-2026-07-01`):

```json
{ "role": "system", "content": [], "output_config": { "effort": "low" } }
```

## Notes

- Model check: each model reads its own thinking blocks and those of a fixed set of other models. Claude Fable 5.1 reads blocks from Claude Opus 5 and, on the Claude API, Claude Opus 5.5; neither Opus 5 nor Opus 5.5 reads Fable 5.1 blocks. Unreadable blocks are dropped (not rejected, not billed, not counted in `input_tokens`) with `reason: "model_binding_mismatch"`; `prefix_mismatch_behavior` has no effect on this. Keep sending the full history; the API never edits your `messages` array, so blocks become readable again when the history returns to a model that can read them.
- Claude Fable 5.1 and Claude Mythos 5.1 read each other's blocks and earlier Claude models' blocks; no other model reads theirs. Claude Mythos 5.1 and models before Claude Fable 5.1 do not run the prefix check.
- The prefix check applies on Claude Fable 5.1, Claude Opus 5.5, Claude Sonnet 5.5, and Claude Haiku 5.5. Blocks from Claude Sonnet 5.5 and Claude Haiku 5.5 are also account-bound: another account's request drops them silently (`reason: "organization_binding_mismatch"` visible with the beta header on the Claude API and Google Cloud).
- Enforcement: default `"error"` for accounts created on or after August 31, 2026, 00:00 UTC. Older accounts are enforced only on requests that set `prefix_mismatch_behavior`; otherwise failing blocks reach the model and, with the beta header, appear as `thinking_mismatch_allowed`. Make the integration append-only regardless of account age.
- Thinking blocks form a chain: you may remove blocks from the start (oldest first), the end, or all, but a gap in the middle invalidates later blocks. Once removed, leave a block out.
- On Claude Sonnet 5.5 and Claude Haiku 5.5, `block_binding` works only with `thinking: {"type": "adaptive"}`; sending it with `between_tools` on Sonnet 5.5 or `thinking: {"type": "disabled"}` on Haiku 5.5 returns 400. Sending `block_binding` without the beta header returns 400 ending `block_binding: Extra inputs are not permitted`.
- `"drop_block"` is a stopgap: Claude re-creates dropped reasoning, raising output tokens. Anthropic's multi-turn coding benchmark estimates (wide error bars): dropping once per session +2.5% (low) / +3.9% (medium) / +4.5% (high) / +20.1% (max); dropping on every turn after the first +4.6% / +9.7% / +10.3% / +67.1%. In the Message Batches API an item with the field unset does not fail; where enforcement is default it drops failing blocks instead (set `"error"` explicitly to fail items).
- The 400 message begins `messages.1.content.0: Invalid \`signature\` in \`thinking\` block. The block is bound to a different conversation. ...` and usually ends naming what changed. A tampered or undecryptable signature always returns 400 and is not affected by `prefix_mismatch_behavior`.
- Send assistant turns back exactly as returned, including `thinking` blocks with an empty `thinking` field (on these models the `signature` carries the reasoning). A block sent with an empty `signature` fails. When parsing streams, keep the block even if no thinking text arrives (it receives its `signature` via `signature_delta`).
- Compaction: with server-side compaction the checked prefix starts at the most recent compaction block. Client-written keep-tail summaries invalidate kept turns' thinking; use on-demand compaction, send `"drop_block"`, or strip thinking from kept turns. Simple compaction (one summary user message plus the next instruction) is recommended. Do not cut turns from the middle or compact between a `tool_use` and its `tool_result`.
- Per-message system messages and tool changes are not available on every model; keep editing top-level `system` for models that do not accept them. Place system messages after the `tool_result` user message, never between `tool_use` and `tool_result`; once sent they join the prefix and must stay in place.
- With `inline-tools-2026-09-15`, `tool_addition` can carry `{"type": "tool_definition", "definition": {...}}`; keep at least one non-deferred tool in `tools` or the first inline tool costs one full prompt cache miss. Token counting runs the same prefix check and returns the same 400.
- Libraries/proxies: pass through `anthropic-beta` and `thinking.block_binding`, return `input_transformations`, leave `role: "system"` messages in place, use `tool_choice: {"type": "none"}` instead of removing `tools`, and log any retry that strips thinking.
- Nothing changes if Claude Code, claude.ai, Claude Managed Agents, or the Claude Agent SDK builds the requests. To audit an integration, log `input_transformations` each turn and run sessions with `"error"` set in CI; the bundled Claude API skill command `/claude-api preserved-thinking-migration` automates the check.

## Related

- [thinking.md](./thinking.md)
- [thinking-troubleshooting.md](./thinking-troubleshooting.md)
- [thinking-tool-workflows.md](./thinking-tool-workflows.md)
- [effort.md](./effort.md)
