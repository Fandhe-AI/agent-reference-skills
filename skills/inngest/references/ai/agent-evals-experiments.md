# Agent Evals Experiments

Compare prompts, models, or whole workflow paths on production traffic and credit each outcome to the variant that served it with `group.experiment()`.

## Signature / Usage

```typescript
import { experiment } from "inngest";

export default inngest.createFunction(
  { id: "summarize-document", triggers: { event: "docs/summary.requested" } },
  async ({ event, step, group }) => {
    const { result, variant, experimentRef } = await group.experiment(
      "summary-model",
      {
        variants: {
          current: () =>
            step.run("summarize-current", () =>
              summarize({ model: "current-model", text: event.data.text })
            ),
          candidate: () =>
            step.run("summarize-candidate", () =>
              summarize({ model: "candidate-model", text: event.data.text })
            ),
        },
        select: experiment.weighted({ current: 90, candidate: 10 }),
      }
    );

    await inngest.score.experiment({
      name: "summary-under-limit",
      value: result.length <= 500,
      experiment: experimentRef,
    });

    return { variant, summary: result };
  }
);
```

## Options / Props

| Name (`group.experiment()` return value) | Type | Description |
|------|------|-------------|
| `result` | callback return type | The selected callback's return value |
| `variant` | `string` | Selected variant name, for logging or analytics |
| `experimentRef` | `{ experimentName, variant }` | Pass with a score to credit that variant |

Assignment strategies:

| Goal | Strategy |
|------|----------|
| Canary a change or ramp traffic gradually | `experiment.weighted()` |
| Keep a user or account on one variant across runs | `experiment.bucket()` |
| Read the assignment from a feature flag or database | `experiment.custom()` |
| Pin one variant for an override or test | `experiment.fixed()` |

```typescript
select: experiment.bucket(event.data.accountId, {
  weights: { current: 80, candidate: 20 },
})

select: experiment.custom(async () => {
  const assignment = await rolloutTable.get(event.data.accountId);
  return assignment ?? "current";
})

select: experiment.fixed("candidate")
```

Credit a variant from a later run or another service by storing `experimentRef` and the original run ID:

```typescript
await inngest.score.experiment({
  name: "invoice-paid",
  value: true,
  experiment: saved.experimentRef,
  runId: saved.runId,
});
```

## Notes

- Requires TypeScript SDK v4.8.0 or later; scoring is a beta API.
- Only the selected callback runs. Every callback must call at least one `step.*` tool, or the run fails with a `NonRetriableError`. Keep the experiment ID unique within the function and variant names stable; both appear in traces and aggregates.
- `weighted` assigns each new run independently by relative weights (`{ current: 9, candidate: 1 }` equals `{ current: 90, candidate: 10 }`). Selection is seeded by the run, so a run keeps its variant on retries; new weights affect only new runs.
- `bucket` hashes a stable key; a `null` or `undefined` key hashes as an empty string, so all those runs land in one bucket and the trace shows a warning. Changing bucket weights can move a key to a different variant.
- `custom` must return a declared variant name or the run fails; its result is memoized for the run.
- Use the same score name and definition for every variant. Call `inngest.score.experiment()` in the function body, outside `step.run()`; inside `step.run()` without a `runId` it writes a step score that the experiment view does not show. Without the original `runId`, a later score attaches to the later run and does not appear under the experiment.
- A score written without the ref (for example plain `step.score()`) still appears on the run and in function score trends but does not count toward a variant.
- `group.experiment()` saves the selection as one durable step; steps in the selected callback count separately. Place a body-level `inngest.score.experiment()` after your last step so a replay does not send it again.
- Python (release after 0.5.19): `ctx.group.experiment()` with `experiment.bucket(ctx.run_id, weights={...})` (no weighted selector) and `inngest_client.score_experiment(..., run_id=...)`.

## Related

- [Group Experiment](./group-experiment.md)
- [Scoring](./scoring.md)
- [Deferred Scoring](./deferred-scoring.md)
- [Compare Models and Prompts](./evals-compare-models-and-prompts.md)
- [Roll Out a Workflow Rewrite](./evals-workflow-rewrite.md)
- [Read Results and Roll Out](./evals-interpreting-results.md)
