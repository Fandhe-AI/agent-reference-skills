# Agent Evals Reference

Connect runs to sessions, score outcomes, and compare variants with TypeScript SDK v4 APIs. Scoring and deferred scorers are beta APIs.

## Signature / Usage

```typescript
await inngest.send({
  name: "support/ticket.created",
  data: { ticketId: "ticket_123" },
  meta: { sessions: { ticket_id: "ticket_123" } },
});

await inngest.score({ name: "resolved", value: true });
await inngest.score({ name: "resolved", value: true, runId: originalRunId });
```

## Options / Props

| Need | API | Key rule |
|------|-----|----------|
| Find related runs | `event.meta.sessions` | Set named session IDs on the event that starts the runs. Sessions organize investigation; they do not alter triggers. |
| Score a run or step | `inngest.score(options)` | Pass `runId` when writing outside the run. Pass `stepId` to place the score on a step. |
| Write a durable score | `step.score(id, options)` | Add `scoreMiddleware()` to the client. Use a unique step ID in the run. |
| Score an experiment variant | `inngest.score.experiment(options)` | Pass the `experimentRef`. Call it outside `step.run()`, or pass the original `runId`. |
| Score later | `createScorer()` and `defer()` | Register a scorer function and trigger it from the originating run. |
| Choose one variant | `group.experiment(id, options)` | Each variant callback must call a `step.*` tool. The selection survives retries. |

Other signatures:

| Name | Description |
|------|-------------|
| `inngest.score({ name, value, runId?, stepId? })` | Named score. Omit `runId` inside the run being scored. Inside `step.run()` it scores that step. |
| `step.score(id, { name, value, stepId? })` | Memoized score written as its own step. Requires `scoreMiddleware()` from `inngest/experimental`, else `NonRetriableError`. |
| `createScorer(client, { id, schema?, ...options }, handler)` | Defines a scorer function (from `inngest/experimental`). `retries` and `concurrency` work as for any function; `onFailure` and `batchEvents` are not supported. |
| `defer(id, { function, data, experiment? })` | Starts the scorer separately; returns `void`. Pass `experimentRef` via `experiment` to credit a variant. |
| `group.experiment(id, { variants, select })` | Runs one variant and returns `{ result, variant, experimentRef }`. |
| `experiment.weighted(weights)` / `bucket(value, { weights? })` / `custom(fn)` / `fixed(variantName)` | Selectors, imported from `inngest`. |
| `inngest.score.experiment({ name, value, experiment, runId?, stepId? })` | Credits a score to a variant. |

## Notes

- Score validation: `name` is a non-empty string of at most 128 bytes (UTF-8) with no control characters or single quotes; `value` is a finite number or boolean (strings, objects, `NaN`, `Infinity` are rejected; aggregates count `true` as 1 and `false` as 0); `runId` / `stepId`, when given, are non-empty strings.
- `meta.sessions`: TypeScript SDK v4.7.0 and later; up to five session entries per event; IDs must be strings or finite numbers; session search is indexed asynchronously.
- The scorer handler receives `event`, `step`, and `parents`; it may return `{ name, value, stepId? }` (written in a step named `score` for the parent run and, with an experiment ref, its variant) or `null` / `undefined` for no score. `parents[0]` carries the original run and experiment context.
- `group.experiment()` selection is memoized; experiments require TypeScript SDK v4.8.0 or later. When a later function writes a variant score, pass the original `runId`.
- Availability: signatures describe TypeScript SDK v4. The Python SDK release after 0.5.19 adds `meta={"sessions": ...}`, `inngest_client.score()` and `score_experiment()` (both take `run_id`), `ctx.group.experiment()` with `experiment.bucket()` / `experiment.fixed()`, and `create_defer()` / `ctx.defer()`; it has no `step.score()`, `createScorer()`, `experiment.weighted()`, or `experiment.custom()`. The Go SDK does not support Agent Evals.
- Application code decides which runs to score; Agent Evals does not sample scores or cap score spend.

## Related

- [Agent Evals](./agent-evals.md)
- [Scoring](./scoring.md)
- [Deferred Scoring](./deferred-scoring.md)
- [Group Experiment](./group-experiment.md)
- [Agent Evals Limits](./agent-evals-limits.md)
- [Agent Evals Troubleshooting](./agent-evals-troubleshooting.md)
