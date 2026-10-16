<!-- source: https://platform.claude.com/docs/en/build-with-claude/compaction-on-demand / last verified: 2026-10-17 -->

# Compaction on demand

Your application decides when a conversation is summarized: send one request with the `compaction` parameter and Claude returns a `compaction` block (summary text plus signature) in place of a reply. Beta; beta header `compact-2026-09-04`.

## Signature / Usage

```python
response = client.beta.messages.create(
    model="claude-opus-5-5",
    # max_tokens caps the whole call, including any thinking, so allow several thousand tokens.
    max_tokens=4096,
    betas=["compact-2026-09-04"],
    messages=history,
    compaction={"type": "summarize"},
)
# response.stop_reason == "compaction"; content holds a single compaction block
history = [{"role": "assistant", "content": response.content}]
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `compaction.type` | `"summarize"` | Summarizes every message in the request once; no reply is generated. |
| `compaction.instructions` | string | Optional. Non-blank string (up to 16,384 characters) replaces the API's default summarization prompt entirely. |

Response block: `{"type": "compaction", "content": "<summary>", "signature": "..."}` with `stop_reason: "compaction"`.

### Failure `stop_reason` values (response is still 200 with empty `content`)

| `stop_reason` | Cause | What to do |
|---|---|---|
| `max_tokens` | Summary was cut off | Resend with larger `max_tokens` |
| `model_context_window_exceeded` | No room for the summarization prompt | Shorter `instructions` or fewer messages |
| `tool_use` | Model called a tool instead of summarizing | `instructions` telling it not to call tools |
| `refusal` | Request declined | Continue without a summary |
| `end_turn` | No text returned | Continue without a summary |

### Errors

| Error | Cause |
|---|---|
| 529 `compaction_unavailable` | Transient server problem; retry |
| 400 `compaction_block_misplaced` | Summarized messages remain in front of the block |
| 400 `compaction_signature_invalid` / `compaction_content_mismatch` | Block `signature` or `content` was changed |
| 400 `compaction_nothing_to_summarize` | `messages` has no `user` or `assistant` content |
| 400 (no code) | More than one `compaction` block; last `assistant` turn ends in an unanswered tool call; beta header missing; block sent back with extra fields such as `citations: null` |

## Notes

- Send the beta header on the compaction request and on every later request that carries the block. You can't combine `compaction` with `context_management` on one request.
- Send the same `system` and `tools` as the rest of the conversation. The summarizer reads them but never runs a tool; the response carries no thinking.
- Rejected on a compaction request: unanswered trailing tool call, `stop_sequences`, structured-output `output_config.format`, and `tool_choice` of type `any` or `tool`. The conversation must still fit the context window.
- Continue from the summary: replace the sent messages with the returned assistant message, unmodified (including `signature`). The block must come first in `messages` (as its own `assistant` message or the first content block of the first message), no summarized messages may remain before it, and exactly one block per request. Two silent mistakes: leaving summarized messages after the block (Claude sees them again) and omitting the block on a later request (Claude gets no summary).
- Compact again by sending `compaction` on a conversation that already starts with a block; the new block summarizes the old summary and everything after it. Then send only the newest block.
- Streaming: the block arrives whole, one `content_block_start` then `content_block_stop`, no `content_block_delta`.
- Usage: `usage.input_tokens` / `output_tokens` are zero; the call is reported as a `compaction` entry in `usage.iterations`. Sum `usage.iterations` for true cost. Sending the block back adds no compaction cost.
- Estimating when to compact: add `input_tokens` and `output_tokens` from the last response (plus `cache_read_input_tokens` / `cache_creation_input_tokens` when prompt caching is used), or use the token counting endpoint (it ignores the `compaction` parameter).
- Python: use `client.beta.messages`; when serializing blocks yourself use `to_dict()` or `model_dump(exclude_none=True)` (plain `model_dump()` adds `citations: null` / `text: null` and is rejected).
- The SDK tool runner can send the compaction request: call `compact_before_next_turn()` (TypeScript / Java / PHP: `compactBeforeNextTurn()`; C# / Go: `CompactBeforeNextTurn()`). Create the runner with the `compact-2026-09-04` beta. The runner refuses to compact while its `context_management` has a compaction edit. SDKs before Python 1.8.0, TypeScript 0.128.0, C# 12.50.0, Go 1.75.0, Java 2.65.0 send disallowed parameters on the compaction request (400).
- Interactions: threshold compaction (`compact_20260112`) can't run on a request that carries a signed block; `cache_control` on the block places a breakpoint after the summary; `role: "system"` messages inside the summarized range are summarized too (restate instructions / per-message effort in a new `system` message after the next `user` turn); do not send `output_config.task_budget.remaining` with `compaction` or with the block (400); images, documents, `container_upload` blocks and fetched URLs in summarized messages are lost.
- Supported models (per the page's feature metadata): `claude-fable-5-1`, `claude-mythos-5-1`, `claude-fable-5`, `claude-mythos-5`, `claude-mythos-preview`, `claude-opus-5-5`, `claude-opus-5`, `claude-opus-4-8`, `claude-opus-4-7`, `claude-opus-4-6`, `claude-sonnet-5-5`, `claude-sonnet-5`, `claude-sonnet-4-6`, `claude-haiku-5-5`. Check per model via the Models API `capabilities.compaction` (with the beta header). Platforms (beta): Claude API, Claude Platform on AWS, Google Cloud, Microsoft Foundry.
- Distinct from threshold compaction (`compact-2026-01-12`, `context_management.edits`): there the API summarizes automatically and the block follows the messages it summarizes (the API drops earlier content for you); here the block goes first and you remove the summarized messages.

## Related

- [compaction.md](./compaction.md)
- [compaction-threshold.md](./compaction-threshold.md)
- [compaction-keep-recent-turns.md](./compaction-keep-recent-turns.md)
- [compaction-background.md](./compaction-background.md)
- [compaction-thinking-blocks.md](./compaction-thinking-blocks.md)
