<!-- source: https://platform.claude.com/docs/en/build-with-claude/compaction-threshold / last verified: 2026-10-17 -->

# Compaction at a token threshold

Automatic compaction: set a token threshold in `context_management.edits` on ordinary requests and the API summarizes older context mid-request once input tokens reach it, emitting a `compaction` block. Beta; beta header `compact-2026-01-12`. Supported alongside on-demand compaction.

## Signature / Usage

```python
messages = [{"role": "user", "content": "Help me build a website"}]

response = client.beta.messages.create(
    betas=["compact-2026-01-12"],
    model="claude-opus-5-5",
    max_tokens=4096,
    messages=messages,
    context_management={"edits": [{"type": "compact_20260112"}]},
)

# Append the response (including any compaction block) to continue the conversation
messages.append({"role": "assistant", "content": response.content})
```

## Options / Props

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `type` | string | Required | Must be `"compact_20260112"` |
| `trigger` | object | `{"type": "input_tokens", "value": 150000}` | `input_tokens` is the only supported trigger type. `value` must be at least 50,000 tokens. |
| `pause_after_compaction` | boolean | `false` | Pause after generating the compaction summary (`stop_reason: "compaction"`) |
| `instructions` | string | `null` | Custom summarization prompt. Completely replaces the default prompt when provided. |

## Notes

- Flow: API detects the trigger, generates a summary, creates a `compaction` block, continues the response with compacted context. On later requests, append the whole response; the API drops all content blocks prior to the last `compaction` block (or you may drop them yourself).
- The response places the `compaction` block at the start of the assistant content (`{"type": "compaction", "content": "Summary of the conversation: ..."}`), followed by normal blocks. A long conversation may compact multiple times; the last block reflects the final prompt state.
- Default summarization prompt varies by model; each asks for a summary inside `<summary></summary>` tags. Custom `instructions` replace it, they don't supplement it. On Claude 5.1 and later models, a request with custom `instructions` summarizes from the visible conversation only (earlier thinking blocks are not summarizer input).
- On Claude Fable 5.1, Claude Mythos 5.1, Claude Opus 5.5, Claude Sonnet 5.5, and Claude Haiku 5.5, thinking blocks from before a `compaction` block aren't carried forward; the summary is all the model has of that earlier work, so tell the model in `instructions` what to retain.
- `pause_after_compaction`: after the pause, append the block and call again (optionally adding preserved messages first). Combine with a compaction counter to estimate cumulative spend (compactions x trigger value) and prompt a wrap-up once a total budget is reached.
- Usage reporting: `usage.iterations` lists per-sampling-iteration usage (a `compaction` entry, then the main `message` entry). Top-level `usage.input_tokens` / `output_tokens` exclude compaction-iteration usage, so sum across all `usage.iterations` entries for the total billed tokens. With the compaction beta enabled every response includes `usage.iterations`, even if no compaction occurred. A `compaction` entry appears only when a new compaction is triggered during the request. Re-applying a previous `compaction` block incurs no additional compaction cost, and the top-level usage fields remain accurate in that case.
- Token counting: `/v1/messages/count_tokens` applies existing `compaction` blocks in the prompt but does not trigger new compactions. Use it to check the effective token count after previous compactions.
- Streaming: the block sends `content_block_start`, one `content_block_delta` (`compaction_delta`) with the complete summary, then `content_block_stop`.
- Prompt caching: `cache_control` on the `compaction` block, plus a `cache_control` breakpoint at the end of the system prompt, keeps the system prompt cache valid so only the summary is written as a new cache entry.
- Python: use `client.beta.messages`; plain `model_dump()` adds `text: null` / `citations: null` to the block and the API rejects it (400 `Extra inputs are not permitted`). Use `to_dict()` or `model_dump(exclude_none=True)`.
- Limitations: the request's model is used for summarization (no cheaper-model option). With `tools` defined, the model occasionally calls a tool during summarization, yielding a `compaction` block with `content: null`; set `instructions` that say not to call tools, for example: `Summarize the transcript inside <summary></summary> tags. Include relevant information in the summary for continuing the task in the next context window. Do not call any tools while writing this summary; respond with text only.`
- Supported models (per the page's feature metadata): `claude-fable-5-1`, `claude-mythos-5-1`, `claude-fable-5`, `claude-mythos-5`, `claude-mythos-preview`, `claude-opus-5-5`, `claude-opus-5`, `claude-opus-4-8`, `claude-opus-4-7`, `claude-opus-4-6`, `claude-sonnet-5-5`, `claude-sonnet-5`, `claude-sonnet-4-6`, `claude-haiku-5-5`. Platforms (beta): Claude API, Claude Platform on AWS, Amazon Bedrock, Google Cloud, Microsoft Foundry. ZDR eligible, excluding Covered Models.
- Can't be combined with `compaction` (on-demand) on one request; threshold compaction can't run on a request that carries a signed on-demand block. The two page families use different beta headers (`compact-2026-01-12` vs `compact-2026-09-04`).

## Related

- [compaction.md](./compaction.md)
- [compaction-on-demand.md](./compaction-on-demand.md)
- [context-editing.md](./context-editing.md)
- [context-windows.md](./context-windows.md)
