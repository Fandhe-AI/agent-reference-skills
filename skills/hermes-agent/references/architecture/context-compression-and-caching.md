# Context Compression & Caching

Hermes uses a dual compression system (gateway session hygiene + agent `ContextCompressor`) and Anthropic prompt caching to manage the context window across long conversations.

## Signature / Usage

Source files: `agent/context_engine.py` (ABC), `agent/context_compressor.py` (default engine), `agent/prompt_caching.py`, `gateway/run_turn.py` (session hygiene), `agent/compression_facade.py`.

```yaml
compression:
  enabled: true              # Enable/disable compression (default: true)
  threshold: 0.50            # Fraction of context window (default: 0.50 = 50%)
  target_ratio: 0.20         # How much of threshold to keep as tail (default: 0.20)
  tail_mode: lean            # Tail retention policy: lean | legacy (default: lean)
  protect_last_n: 20         # Minimum protected tail messages (default: 20)
  min_tail_user_messages: 1  # Real user messages guaranteed in the tail (default: 1)
  in_place: true             # Compact on the same session id, no rotation (default: true)

# Summarization model/provider configured under auxiliary:
auxiliary:
  compression:
    model: null              # Override model for summaries (default: auto-detect)
    provider: auto           # Provider: "auto", "openrouter", "nous", "main", etc.
    base_url: null           # Custom OpenAI-compatible endpoint
```

Pluggable engine selection:

```yaml
context:
  engine: "compressor"    # default — built-in lossy summarization
  engine: "lcm"           # example — plugin providing lossless context
```

Prompt caching TTL:

```yaml
prompt_caching:
  cache_ttl: "5m"   # "5m", "1h", or "auto"
```

## Options / Props

| Parameter | Default | Description |
|-----------|---------|-------------|
| `threshold` | `0.50` | Compression triggers when prompt tokens >= `threshold x context_length` (floored at 0.75 below 512K windows) |
| `threshold_tokens` | `null` | Optional absolute cap on the trigger; fires at the lower of ratio trigger and this count |
| `model_thresholds` | `{}` | Per-model overrides; substring match against model name, longest key wins; `"<provider>:<substring>"` keys are provider-scoped |
| `target_ratio` | `0.20` | Tail token budget = `threshold_tokens x target_ratio` (legacy mode only) |
| `tail_mode` | `lean` | `legacy` keeps a `target_ratio`-sized verbatim tail; `lean` keeps a clamped tail of 2.5% of the window (10K floor, 25K cap) and carries continuity in the summary |
| `protect_last_n` | `20` | Minimum number of recent messages always preserved |
| `min_tail_user_messages` | `1` | Minimum REAL user messages kept in the uncompressed tail |
| `protect_first_n` | `3` | (hardcoded) System prompt + first exchange always preserved |
| `idle_compact_after_seconds` | `0` | Opt-in: compact up front when a session resumes after this many idle seconds |
| `codex_gpt55_autoraise` | `true` | Raise trigger to 85% for gpt-5.4/5.5/5.6 and gpt-6 Astra on the ChatGPT Codex OAuth route |
| `codex_gpt55_autoraise_notice` | `true` | Show the one-time autoraise notice |
| `codex_app_server_auto` | `native` | `native`, `hermes`, `off`: thread-compaction mode for Codex app-server sessions |
| `codex_responses_native` | `false` | Opt in to OpenAI server-side compaction on the Responses API (gpt-5.6 family; `gpt-6-astra` on official Codex OAuth) |
| `codex_responses_compact_threshold` | `null` | Server compaction trigger; read only when `codex_responses_native: true` |
| `in_place` | `true` | Compact on the same session id (soft-archive old rows, `active=0, compacted=1`); `false` restores rotating sessions linked by `parent_session_id` |

## Notes

- Source: https://hermes-agent.nousresearch.com/docs/developer-guide/context-compression-and-caching (pinned to v0.22.2)
- Two layers: gateway session hygiene (fixed 85% of context, pre-agent safety net, only when `len(history) >= 4`) and agent `ContextCompressor` (50% default, in-loop with real token counts). Hygiene is higher on purpose: 50% caused premature compression on every turn.
- Token accounting uses a usage anchor (`agent/usage_anchor.py`): provider's last prompt/completion tokens plus a rough estimate of only newly appended messages. Not an exact-count-only policy; several local-estimate fallbacks remain.
- Failure cooldown after a failed or stalled summary escalates 60s -> 300s -> 900s (persisted in `state.db`). Manual `/compress` clears it; provider-proven context overflow ignores it for one bounded attempt.
- Every compression attempt logs one content-free INFO line, `context compression attempt telemetry: {...}` (`trigger_source`, `route`, `commit_status`, `method`, token counts).
- Algorithm (`ContextCompressor.compress()`): Phase 1 prune old tool results (>200 chars, replaced with `[Old tool output cleared to save context space]`); Phase 2 determine boundaries (head protected, middle summarized, token-budget tail; tool_call/tool_result groups kept intact); Phase 3 structured summary via auxiliary LLM (Goal / Constraints & Preferences / Progress / Key Decisions / Relevant Files / Next Steps / Critical Context); Phase 4 assemble and `_sanitize_tool_pairs()`. Re-compression updates the previous summary (`_previous_summary`).
- The summary model's context window must be at least as large as the main model's, otherwise the middle turns are dropped without a summary.
- Summary budget: `content_tokens x 0.20`, min 2,000, max `min(context_length x 0.05, 12,000)`.
- Prompt caching strategy `system_and_3`: breakpoints on the system prompt plus the last three non-system messages (Anthropic max 4). Marker: `{"type": "ephemeral"}` or `{"type": "ephemeral", "ttl": "1h"}`. Enabled automatically for Claude models on native Anthropic or OpenRouter.
- Model identity is part of the provider cache key: any mid-conversation model, fallback or credential change yields zero cache hits on the next request.
- `"auto"` TTL resolves once per session: `1h` for human-paced sources, `5m` for machine-paced sources (subagent, cron, oneshot, webhook, kanban, api, tool, batch).
- Intermediate context-pressure warnings were removed because they made models give up prematurely.
- Bedrock context-window cache (`context_length_cache.yaml`): explicit overrides win, provider-confirmed limits persist, failed probes cool down 5 minutes.

## Related

- [Agent Loop](./agent-loop.md)
- [Prompt Assembly](./prompt-assembly.md)
- [Micro-compaction](./micro-compaction.md)
- [Session Storage](./session-storage.md)
