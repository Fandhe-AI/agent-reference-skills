# Read Results and Roll Out

Read variant assignments and outcome scores together to see whether a change helped users before sending more traffic to it.

## Signature / Usage

Attribution check: a later function must supply both the `experimentRef` and the original `runId`.

```typescript
await inngest.score.experiment({
  name: "customer-helpful",
  value: true,
  experiment: saved.experimentRef,
  runId: saved.runId,
});
```

## Options / Props

Compare these facts per variant for the same function, experiment, eligible audience, and assignment period:

| Question | What to check |
|----------|---------------|
| How much traffic did it receive? | Count runs assigned to the variant. Relative weights describe the intended split; a small sample can look uneven. |
| How many outcomes are known? | Count runs with the chosen score. Keep this separate from assigned runs. |
| What did users experience? | Compare the chosen score only across runs whose outcomes are known. Check range and direction. |
| What is still unresolved? | Count outcomes that have not arrived or whose scorer is still waiting. |
| Did the work stay healthy? | Inspect failures, latency, and steps in traces alongside the product outcome. |

## Notes

- Choose one outcome before comparing; use the same score name, definition, range, and direction for every variant. Booleans aggregate as 1 or 0; numeric scores need a documented scale.
- A score average covers only runs that have the score; if one variant has much less feedback, its lead may reflect who responded. Keep assignment and outcome counts beside every comparison.
- Let later outcomes catch up: compare runs only after each had a comparable chance to receive the outcome (for example the same seven-day window). **No score** means unknown or nothing written; **zero** means a recorded negative result. A scorer returning `null` / `undefined` writes no score.
- Investigate surprises in the run trace (selected variant, steps, errors, scores). Use a session to find related runs; sessions do not select a variant. Dashboard: choose the environment, open **AI -> Sessions** (asynchronous index). The Inngest Cloud MCP also exposes a `get_experiment` read tool for run counts and score aggregates.
- Decide the outcome, operational limits, and required evidence before inspecting the comparison; there is no universal run count that makes a result conclusive. A small canary proves the path runs but may give too little outcome data.
- Roll out in stages while watching new runs and later scores. Runs that already selected a variant keep it on retries and replays; changing bucket weights can change a user's future assignment (use `experiment.custom()` with stored assignment to prevent it). On quality regression, route new runs to the safe variant via the existing assignment strategy.
- If the comparison looks wrong: few or no scores (scorer waiting, timed out, or missed the event); wrong run or outside the experiment (check saved `experimentRef` and original `runId`); uneven split (check assigned counts and strategy); missing session runs (check environment, session key/ID, indexing delay).
- Source: https://www.inngest.com/docs-markdown/agent-evals/guides/interpreting-results (fetched 2026-10).

## Related

- [Agent Evals Experiments](./agent-evals-experiments.md)
- [Agent Evals Troubleshooting](./agent-evals-troubleshooting.md)
- [Manage Eval Costs](./evals-cost-management.md)
- [Compare Models and Prompts](./evals-compare-models-and-prompts.md)
- [Deferred Scoring](./deferred-scoring.md)
