# Agent Evals Best Practices

Make experiment results useful by keeping score definitions, assignment, and run attribution consistent.

## Signature / Usage

```typescript
// Deferred outcome: keep the original runId and experimentRef with the business record,
// then credit the variant when the signal arrives.
await inngest.score.experiment({
  name: "ticket-resolved",
  value: true,
  experiment: saved.experimentRef,
  runId: saved.runId,
});
```

## Notes

- Name the outcome before the experiment and define each score's value and range; `ticket-resolved` should mean the same thing for every variant.
- Track an immediate check (format, guardrail) and a later result (feedback, resolution) when both matter. Keep missing scores distinct from negative scores; a deferred scorer can return no score.
- Use a run score for an overall outcome; attach a step score when a specific operation needs its own result.
- Add a session key such as `conversation_id` or `ticket_id` to every event contributing to one outcome. Sessions help find runs and traces; they do not decide which functions run. Do not put secrets or sensitive personal data in session IDs.
- Use `defer()` with a scorer when a result arrives after the original run or scoring takes time; set a meaningful wait timeout and decide what the scorer returns when no signal arrives. A score written from a different run without the original `runId` attaches to the later run.
- Compare one change at a time. Keep experiment IDs unique within a function and variant names stable. Every variant callback must call at least one `step.*` tool.
- Assignment: `weighted()` for independent assignment and gradual rollout; `bucket()` with a stable user/account ID for sticky users (changing weights can change future assignments); `custom()` with stored assignment when an account must never move back or a flag changes routing without a deploy; `fixed()` to pin a known path.
- The selected variant stays the same on retries and replays. Change weights gradually, keep a safe path available, and inspect errors, latency, and the outcome score while increasing traffic.
- Compare the same population: count assignments as well as scored outcomes, check how many runs still await feedback, and use the same time period and outcome definition. Inspect the session and trace behind surprising scores before declaring a winner.
- Control score volume in application code; apply the same selection rule to every variant and keep the sample and total assignment counts.

## Related

- [Agent Evals](./agent-evals.md)
- [Agent Evals Reference](./agent-evals-reference.md)
- [Agent Evals Experiments](./agent-evals-experiments.md)
- [Manage Eval Costs](./evals-cost-management.md)
