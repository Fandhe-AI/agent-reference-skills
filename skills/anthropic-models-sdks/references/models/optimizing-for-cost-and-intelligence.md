<!-- source: https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence / last verified: 2026-10-17 -->

# Optimizing for cost and intelligence

Balance cost and intelligence on the Claude Platform, with measured results for prompt caching, effort, model choice, output caps, and multi-model strategies. Results are Anthropic-internal and directional; measure on your own workload.

## Signature / Usage

Price one request at list prices from its `usage` (five priced counts: uncached input, 5m and 1h cache writes at 1.25x and 2x input, cache reads, output). Example at Claude Opus 5.5 list prices; change the three prices for another model:

```python
INPUT_PER_MTOK = 4.00  # Claude Opus 5.5
# 0.05x the input price on Claude Opus 5.5; the multiplier differs by model
CACHE_READ_PER_MTOK = 0.20
OUTPUT_PER_MTOK = 20.00

client = anthropic.Anthropic()
response = client.messages.create(
    model="claude-opus-5-5",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Hello, Claude"}],
)
usage = response.usage
cache_writes = usage.cache_creation
writes_1h = cache_writes.ephemeral_1h_input_tokens if cache_writes else 0
writes_5m = cache_writes.ephemeral_5m_input_tokens if cache_writes else 0
cost = (
    usage.input_tokens * INPUT_PER_MTOK
    # 1-hour cache writes bill at 2x the input price, 5-minute at 1.25x; reads at the cache-read price.
    + writes_1h * INPUT_PER_MTOK * 2.0
    + writes_5m * INPUT_PER_MTOK * 1.25
    + (usage.cache_read_input_tokens or 0) * CACHE_READ_PER_MTOK
    + usage.output_tokens * OUTPUT_PER_MTOK
) / 1_000_000
print(f"Request cost: ${cost:.6f}")
```

## Options / Props

Levers, in two groups. Free wins cut spend without touching quality; tradeoffs exchange cost for intelligence.

| Lever | Group | Guidance |
| --- | --- | --- |
| Prompt caching | Free win | Turn on first; usually the largest lever. Cache reads cost about 0.1x input (0.05x Opus 5.5 / Sonnet 5.5, 0.025x Fable 5.1 / Mythos 5.1). Healthy agent loops read a median 84% of input from cache; below about 80% look for something breaking the cache |
| Cache duration | Free win | 5-minute default when turns are seconds apart; 1-hour once about 1 turn in 20 follows a pause between 5 minutes and an hour (break-even about 1 in 30) |
| Token hygiene | Free win | Dynamic filtering, image resizing, tool search with `defer_loading`, programmatic tool calling, upload data files via Files API plus code execution instead of pasting; context editing / compaction pay only on long sessions |
| Batch processing | Free win | 50% off every token (cached included), results within 24 hours; not for Claude Managed Agents sessions |
| Prompt audit | Free win | Re-audit prompts for each model generation (`/claude-api prompt-audit` in Claude Code) |
| Upgrade the model | Tradeoff | Compare on cost per completed task, not per token (same text is about 30% more tokens on Claude 4.7 and later) |
| Tune effort | Tradeoff | Sweep two or three levels on own traffic, each in a separate session (changing top-level effort mid-session invalidates the cache). Default is `high` on most models, `medium` on Opus 5.5 and Haiku 5.5 |
| Re-run failures at higher effort | Tradeoff | With a checkable outcome: `low` then failures at `high` was about 97% solved at about $0.17 per task vs 95.3% at $0.29 for everything at `high` (Opus 5.5, SWE-bench Pro subset) |
| Budgets and caps | Tradeoff | Managed Agents session budget (`stop_reason: budget_reached`); `max_tokens` 64,000 for agentic work (128,000 maximum); treat `stop_reason: max_tokens` as a failure |
| Elapsed time | Tradeoff | Tell the model time matters and show elapsed time on every request: 47% less time, 60% less cost on typical DRACO task for Opus 5.5 at `medium`, 4.1 points lower score |
| Advisor strategy | Tradeoff | Smaller executor escalates to a stronger advisor; helps only when the executor consults it; measure consult rate |
| Orchestrator strategy | Tradeoff | Frontier model delegates bulk work; paid off only for routine work with a long cost tail or work larger than one context window |

## Notes

- Current models, lowest to highest cost and capability: Claude Haiku 5.5, Claude Sonnet 5.5, Claude Opus 5.5, Claude Fable 5.1 (frontier). For most agent workloads start with Opus 5.5 at default effort (`medium`); try Haiku 5.5 first for high-volume work with checkable outputs.
- Measured examples (SWE-bench Pro subset): Sonnet 5.5 at `high` solved 87.6% at $0.11 per solved task; Opus 5.5 at `low` 87.4% at $0.12; Opus 5.5 at `medium` 92.8% at $0.22; Fable 5.1 at `high` 92.3% (single run) at $1.19.
- Effort sweep on Opus 5.5 (SWE-bench Pro subset): `low` 87.4% / $0.11, `medium` 92.8% / $0.21, `high` 95.3% / $0.29, `xhigh` 96.7% (single run) / $0.74 per task.
- Output tokens cost five times input tokens on Haiku 5.5, Sonnet 5.5, Opus 5.5, and Fable 5.1; in an agent loop every written token is re-read as input on later turns.
- On Haiku 5.5, a request whose prompt exceeds 100,000 tokens (cache reads and writes count) pays 5x per token, output included; compact long sessions at a task boundary.
- A break in the cache re-writes the prefix at 1.25x input: on a 100,000-token prefix one broken turn costs $1.25 (Fable 5.1 / Mythos 5.1, 50x the read), $0.50 (Opus 5.5, 25x), $0.25 (Sonnet 5.5, 25x). Put per-request text in the newest user turn after the last breakpoint; use mid-conversation system messages instead of editing `system`.
- Keep-alive: re-send the previous request with `max_tokens: 0` (drop `stream`, same headers incl. `anthropic-beta`) within 4 minutes of the previous request's start. Rejected with `thinking.type: "enabled"`, structured outputs, forced tool choice, or the top-level `compaction` parameter.
- On Fable 5.1, Opus 5.5, Sonnet 5.5, and Haiku 5.5, rewriting an earlier tool result invalidates every later thinking block; use server-side context editing or compaction (these don't invalidate thinking blocks) rather than client-side pruning.
- Measure on your own workload in four steps: sample production tasks with outcome checks and record cost per task; baseline model tiers across effort levels and plot score against spend; add a multi-model strategy only if the curve shows a gap effort can't close; shadow-run the winner before cutover.
- This page was captured from a truncated local source: sections after "Measure on your own workload" (including the "Benchmarks referenced" list) are not transcribed here.

## Related

- [Choosing a model](./choosing-a-model.md)
- [Models overview](./overview.md)
- [What's new in Claude Opus 5.5](./whats-new-opus-5-5.md)
- [What's new in Claude Fable 5.1](./whats-new-fable-5-1.md)
