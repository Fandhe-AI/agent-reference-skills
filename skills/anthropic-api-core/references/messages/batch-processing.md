<!-- source: https://platform.claude.com/docs/en/build-with-claude/batch-processing / last verified: 2026-08-07 -->

# Batch processing

Process large volumes of Messages requests asynchronously with the Message Batches API, at 50% of standard cost, with most batches finishing under an hour.

## Signature / Usage

```python
client = anthropic.Anthropic()
message_batch = client.messages.batches.create(
    requests=[
        {
            "custom_id": "my-first-request",
            "params": {"model": "claude-opus-5", "max_tokens": 1024,
                       "messages": [{"role": "user", "content": "Hello"}]},
        },
    ]
)

# Poll
while True:
    batch = client.messages.batches.retrieve(message_batch.id)
    if batch.processing_status == "ended":
        break
    time.sleep(60)

# Stream results
for result in client.messages.batches.results(message_batch.id):
    if result.result.type == "succeeded":
        print(f"Success! {result.custom_id}")
```

Each request needs a unique `custom_id` (1-64 chars, `^[a-zA-Z0-9_-]{1,64}$`) and a `params` object with standard Messages API parameters.

## Options / Props

| Result type | Description |
|---|---|
| `succeeded` | Includes the message result |
| `errored` | Invalid request or internal server error; not billed |
| `canceled` | Batch canceled before send; not billed |
| `expired` | Batch hit 24h expiration before send; not billed |

| Batch limits | Value |
|---|---|
| Max requests / size | 100,000 requests or 256MB, whichever first |
| Processing window | Most complete <1h; results available at completion or 24h, whichever first; unfinished requests expire at 24h |
| Result availability | 29 days from batch `created_at` |
| Scope | Workspace-isolated |

**Unsupported parameters** (validation error if included): `stream: true`, `speed` (Fast mode), `store`/`previous_thread_event_id` (Threads), `cache_hint`/`context_hint`, `max_tokens: 0` (cache pre-warming), `research_preview_2026_02: "active"`.

## Notes

- Supports vision, tool use (including all server tools: web search, web fetch, code execution, MCP connectors, advisor, tool search), system messages, multi-turn conversations, extended thinking, most beta features. All active models supported.
- Server tools in batch: the batch worker runs the same agentic loop but with **more iterations per turn** than synchronous (no open connection to maintain) before returning `stop_reason: "pause_turn"`; continue paused turns by resubmitting the assistant content (batch or sync). `web_search` is throttled per-org with automatic retry.
- **Extended output (beta):** `anthropic-beta: output-300k-2026-03-24` raises `max_tokens` cap to 300,000 for Opus 5/4.8/4.7/4.6 and Sonnet 5/4.6 — batch-only, not on synchronous Messages API; Claude API and Claude Platform on AWS only (not Bedrock/Google Cloud/Microsoft Foundry).
- Prompt caching works but cache hits are best-effort since requests process concurrently/out-of-order — consider the 1-hour cache duration for better hit rates on long-running batches.
- `results_url` points to a streamable `.jsonl` file; prefer streaming over full download for large result sets.
- List endpoint supports pagination (SDKs/CLI auto-paginate).
- Data retention: stores request/response data up to 29 days from creation; delete anytime post-processing via `DELETE /v1/messages/batches/{batch_id}` (cancel first if in-progress).
- Cannot modify a submitted batch — cancel and resubmit instead (cancellation may not be immediate).
- Pricing is 50% of standard per-model input/output rates across the board.

## Related

- [Working with messages](./working-with-messages.md)
- [PDF support](./pdf-support.md)
- [Fast mode](./fast-mode.md)

Tool use・Agent Skills・MCP の詳細は anthropic-api-tools-mcp スキルを参照（server tools のバッチ内挙動を含む）。
