# Micro-compaction

Micro-compaction amortizes compression cost: after each completed turn Hermes folds the single oldest un-absorbed exchange into a running summary instead of one large batch summarization. Off by default.

## Signature / Usage

```yaml
compression:
  micro_compact: true             # default: false
  micro_compact_every_n_turns: 1  # cadence — how often a pass runs
  micro_compact_defrag_threshold_tokens: 2000
```

Summarizer model is `auxiliary.compression`:

```yaml
auxiliary:
  compression:
    provider: openai-api
    model: <your choice>
    base_url: <endpoint>
```

## Options / Props

| Name | Default | Description |
|------|---------|-------------|
| `compression.micro_compact` | `false` | Enable micro-compaction |
| `compression.micro_compact_every_n_turns` | `1` | Pass cadence; values below 1 are clamped to 1. Counter advances per turn, not per committed pass |
| `compression.micro_compact_defrag_threshold_tokens` | `2000` | When the rolling summary exceeds this, the next pass re-summarizes the summary itself |

## Notes

- Per pass: `finalize_turn` finds the oldest un-summarized exchange (an assistant message with its tool results and follow-ups, up to the next user message), sends it plus the running summary to the auxiliary model, and replaces those messages with a single summary marker.
- User messages are never compacted; head (system prompt and opening messages) and tail (token-budgeted recent window) are protected. Only the middle is touched.
- A cursor tracks the first un-absorbed message; if missing it is recovered by scanning for the last summary marker. Only the newest summary marker is kept; adjacent user turns are joined into a row flagged `display_metadata.model_only`.
- Defrag re-summarizes only the summary text; no messages are absorbed and the cursor does not move.
- DB sync: each pass calls `archive_and_compact`, which atomically soft-archives active rows and inserts the compacted set.
- If the same exchange fails three times in a row the cursor advances past it; skipped messages are left for batch compaction. The `finalize_turn` call swallows any exception, so a failure leaves the conversation unchanged.
- Does not replace batch compaction; threshold-based compaction still fires if the window fills.
- Prompt-cache cost: each pass rewrites already-sent history, breaking the cached prefix every pass. There is no reclaim-size gate (unlike `compression.proactive_prune_min_reclaim_tokens`, default 4096); `micro_compact_every_n_turns` is the frequency dial.
- Choose a small, fast, non-reasoning instruct model for `auxiliary.compression`; latency is felt every turn.
- First pass usually costs tokens (~400 tokens of marker scaffolding); break-even is normally the second or third pass.
- Telemetry: one content-free JSON line per pass (`micro compaction telemetry: {...}` with `outcome`, `tokens_before`, `tokens_after`, `tokens_delta`, `occupancy_pct`, `passes_total`, `tokens_saved_total`, `duration_ms`). Summarize logs with:

```bash
python scripts/micro_compaction_report.py [--per-session] [LOGFILE ...]
```

Defaults to `$HERMES_HOME/logs/agent.log`.

## Related

- [Context Compression & Caching](./context-compression-and-caching.md)
- [Session Storage](./session-storage.md)
