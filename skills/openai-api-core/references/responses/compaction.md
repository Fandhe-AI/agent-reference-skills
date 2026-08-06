# Compaction

Reduces context size in long-running Responses API interactions while preserving state needed for subsequent turns, via server-side auto-compaction or a standalone stateless endpoint.

## Signature / Usage

```python
response = client.responses.create(
    model="gpt-5.3-codex",
    input=conversation,
    store=False,
    context_management=[{"type": "compaction", "compact_threshold": 200000}],
)
conversation.extend(response.output)
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| context_management | array | — | Set on `responses.create`; `[{"type": "compaction", "compact_threshold": <tokens>}]` enables server-side compaction when the rendered token count crosses the threshold |

## Notes

- Server-side compaction runs inline within a normal `responses.create` call — no separate call needed; the compaction item is emitted in the same response stream. ZDR-friendly when `store=false`.
- The compaction item is opaque/encrypted and not human-interpretable; it carries forward key prior state and reasoning using fewer tokens.
- After appending output items (including the compaction item) to your next input array, you can drop items that came before the most recent compaction item to shrink requests — but do **not** manually prune when using `previous_response_id` chaining.
- The **standalone `/responses/compact` endpoint** (`client.responses.compact`) is fully stateless and ZDR-friendly: send a full context window, get back a compacted window to pass as-is into the next `/responses` call. Do not prune its output — the returned window is the canonical next context.
- Not supported when Multi-agent mode's own compaction is active on the same request (see [responses-multi-agent](./responses-multi-agent.md) limitations).

## Related

- [conversation-state](./conversation-state.md)
- [responses-multi-agent](./responses-multi-agent.md)
