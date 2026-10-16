# Manage Eval Costs

Control eval spend by tracking scores, scoring executions, and external service costs separately.

## Signature / Usage

Choose in application code which runs get an expensive score, before calling `defer()` or writing a score:

```typescript
// Same eligibility rule for every variant; record how cases were selected.
if (shouldJudge(event.data)) {
  defer("score-feedback", {
    function: feedbackScorer,
    data: { ticketId: event.data.ticketId },
    experiment: experimentRef,
  });
}
```

(`shouldJudge` is an application-defined predicate, not an Inngest API.)

## Options / Props

| Usage | What to count |
|-------|---------------|
| Inngest executions | The original function run and its steps. `group.experiment()` adds one selection step; only the selected variant runs and its steps count separately. Each `step.score()` is one step. A deferred scorer is a separate function run with its own steps, plus one step for its score write. |
| Inngest scores | Each score ingested (during the run, from another service, or from a deferred scorer). Pricing includes a monthly score quantity; ingestion continues under usage-based billing beyond it. |
| Your services | Model tokens or requests, other paid APIs, and infrastructure. A model judge is a separate model call even when it records one Inngest score. |

## Notes

- The pricing page defines current plans, allowances, and metered units. Its execution estimate is **runs x (steps + 1)** for a function whose runs take the same number of steps; add deferred scorer runs and their steps.
- When the outcome arrives during the run, score that run; when another service receives it later and has the original `runId`, it can score the run directly, which can avoid a separate scorer. Use a deferred scorer when evaluation needs independent work or must wait for a later signal; it adds a function run, its steps, and any model/API calls.
- If sampling in the application, choose the sample before the expensive call and keep the rule stable; do not present a sampled score as a measure of all traffic. Track the share of eligible runs that received a score. A cheap observed-outcome score may be worth recording on every eligible run even when costly model judgments are sampled.
- `experiment.weighted()` sends a small share of new runs to a more expensive candidate; it controls the candidate's usage but does not remove the selection step or reduce score ingestion if every run is scored.
- Concurrency or throttling keeps scorer runs within provider rate limits but does not reduce runs, scores, or model calls. To reduce usage, narrow eligibility, avoid duplicate work, or stop sending traffic to a costly variant.
- Estimate per cohort: monthly original runs, average steps per run, experiment selections, scores per scored run, deferred scorer runs and steps, model/API calls. Recheck after rollout.
- Agent Evals does not sample scores or cap score spend for you.

## Related

- [Agent Evals Limits](./agent-evals-limits.md)
- [Deferred Scoring](./deferred-scoring.md)
- [Score with an LLM Judge](./evals-llm-judge.md)
- [Agent Evals Best Practices](./agent-evals-best-practices.md)
