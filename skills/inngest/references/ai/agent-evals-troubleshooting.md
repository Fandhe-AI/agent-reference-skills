# Agent Evals Troubleshooting

Find missing scores and feedback by tracing them back to the original run and experiment variant. Examples use TypeScript SDK v4 beta scoring APIs.

## Signature / Usage

```typescript
import { Inngest } from "inngest";
import { scoreMiddleware } from "inngest/experimental";

// Required for step.score()
const inngest = new Inngest({ id: "support-agent", middleware: [scoreMiddleware()] });
```

## Notes

- Setup errors: `step.score()` missing or throwing means `scoreMiddleware()` is not registered; experiments or scoring unavailable means upgrade to TypeScript SDK v4.8.0 or later; a rejected score means the value is not a finite number/boolean or the name exceeds 128 bytes / has control characters or single quotes.
- Score not on the run: a successful run does not create a score by itself. Call `inngest.score()`, `inngest.score.experiment()`, or `step.score()` explicitly; pass the original `runId` from another process or later run; give `step.score()` a unique step ID. Selective scoring in application code may leave runs unscored by design.
- Deferred scorer wrote no score: confirm the app serves the scorer function, the run called `defer()`, and the data matches the scorer schema. Returning `null` / `undefined` writes no score; a timeout path returning `null` means unknown, not zero. Check the wait's event name, match expression, and timeout.
- Score on the wrong run or outside the experiment: a direct score without `runId` attaches to the current run. A later function must use the original run's ID and the `experimentRef`. Calling `inngest.score.experiment()` inside `step.run()` without `runId` writes a step score the experiment view does not show; call it in the function body, outside steps. When using `defer()`, pass `experiment: experimentRef`.
- Related runs missing from a session: select the environment that received the events and open **AI -> Sessions**; each triggering event needs the same key and ID in top-level `meta.sessions`. Automatic propagation to child events starts in TypeScript SDK v4.18.0; `meta.sessions` on sent events starts in v4.7.0. An explicit child value can replace or clear a propagated value; a batched run combines sessions from its events, while child events inherit only sessions shared by every triggering event. The index is asynchronous.
- Variant did not run or split looks wrong: only the selected callback runs; each callback must call at least one `step.*` tool or the SDK raises `NonRetriableError`. `weighted()` splits can look uneven in small cohorts; `bucket()` needs a present, stable key (a missing key hashes an empty string and adds a warning). Changing weights affects only future assignments.
- Results look late or incomplete: separate assigned runs, scored runs, and runs awaiting outcomes; a score average covers only runs with a score. Compare variants over the same assignment window.
- Score usage rises faster than expected: count score writes separately from runs, experiment selection steps, deferred scorer runs, and model/API calls. Apply a consistent eligibility rule in application code; the monthly allowance does not reject additional score writes.
- Source: https://www.inngest.com/docs-markdown/agent-evals/troubleshooting (fetched 2026-10).

## Related

- [Agent Evals Reference](./agent-evals-reference.md)
- [Agent Evals Experiments](./agent-evals-experiments.md)
- [Deferred Scoring](./deferred-scoring.md)
- [Read Results and Roll Out](./evals-interpreting-results.md)
- [Manage Eval Costs](./evals-cost-management.md)
