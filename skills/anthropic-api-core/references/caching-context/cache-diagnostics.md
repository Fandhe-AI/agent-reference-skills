<!-- source: https://platform.claude.com/docs/en/build-with-claude/cache-diagnostics / last verified: 2026-08-07 -->

# Cache diagnostics

Diagnose unexpected prompt-cache misses by comparing consecutive requests and identifying exactly where the prompt prefix diverged. Beta, Claude API only.

## Signature / Usage

```python
r1 = client.beta.messages.create(
    model="claude-opus-5", max_tokens=1024,
    cache_control={"type": "ephemeral"}, system=SYSTEM,
    messages=[{"role": "user", "content": "Summarize section 1."}],
    diagnostics={"previous_message_id": None},
    betas=["cache-diagnosis-2026-04-07"],
)

r2 = client.beta.messages.create(
    model="claude-opus-5", max_tokens=1024,
    cache_control={"type": "ephemeral"}, system=SYSTEM,
    messages=[
        {"role": "user", "content": "Summarize section 1."},
        {"role": "assistant", "content": r1.content},
        {"role": "user", "content": "Now summarize section 2."},
    ],
    diagnostics={"previous_message_id": r1.id},
    betas=["cache-diagnosis-2026-04-07"],
)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `diagnostics.previous_message_id` | string \| null | The `id` of the previous response to compare against. `null` opts in on the first turn. |
| `diagnostics` (response) | object \| null | `null` = no divergence found; `{"cache_miss_reason": null}` = comparison still pending; `{"cache_miss_reason": {...}}` = divergence found. |

`cache_miss_reason.type`: `model_changed`, `system_changed`, `tools_changed`, `messages_changed`, `previous_message_not_found`, `unavailable`. The four `*_changed` types carry `cache_missed_input_tokens` (an estimate).

## Notes

- Beta header required: `cache-diagnosis-2026-04-07`. Streaming: `diagnostics` appears on the `message_start` event.
- Fingerprints contain only hashes and token-count estimates (never raw prompt content); ZDR eligible; scoped to org/workspace; expire after a short period.
- Reading alongside `usage.cache_read_input_tokens`: `diagnostics: null` + high cache-read = working as expected; `diagnostics: null` + low/zero cache-read = cache entry expired, not a request bug; a `*_changed` reason + low cache-read = your bug, fix the cause; a `*_changed` reason + high cache-read = rare, low-impact late divergence.
- Not available on Amazon Bedrock or Google Cloud.

## Related

- [prompt-caching.md](./prompt-caching.md)
