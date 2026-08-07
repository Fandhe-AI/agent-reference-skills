# Step Experiments (`group.experiment()`)

Compares multiple versions of a step's logic on live production traffic — different models, prompts, or workflow rewrites — judged on execution data (latency, retries, cost) that feature flags and eval tools can't reach. TypeScript SDK v4+, no separate package required.

## Signature / Usage

```ts
import { experiment } from "inngest";

const { result, experimentRef } = await group.experiment("answer-style", {
  variants: {
    concise: () => step.run("answer-concise", () => answerConcise(event.data)),
    detailed: () => step.run("answer-detailed", () => answerDetailed(event.data)),
  },
  select: experiment.bucket(event.data.accountId, {
    weights: { concise: 50, detailed: 50 },
  }),
});

defer("score-answer-feedback", {
  function: feedbackScorer,
  data: { ticketId: event.data.ticketId },
  experiment: experimentRef,
});

return result;
```

## Options / Props

**`group.experiment(id, options)`**

| Name | Type | Description |
|------|------|-------------|
| `id` | `string` | Experiment identifier; appears in traces and analytics |
| `options.variants` | `Record<string, () => Promise<unknown>>` | Named variant implementations; names should stay stable |
| `options.select` | `SelectionStrategy` | Determines which variant runs; see selection strategies below |

**Selection strategies (`experiment.*`)**

| Strategy | Description |
|----------|--------------|
| `experiment.weighted({ ... })` | Fresh random assignment per run based on relative probability ratios |
| `experiment.bucket(id, { weights })` | Hash-based bucketing on a stable identifier so the same user/account always gets the same variant |
| Custom | Pull assignments from your own systems (feature flags, database) |
| Fixed | Force a single variant, e.g. for manual testing or gradual rollout |

**Return value**

| Name | Type | Description |
|------|------|-------------|
| `result` | `unknown` | The output of whichever variant was selected and run |
| `experimentRef` | `{ experimentName, variant }` | Handle for attributing a later score to the served variant |

## Notes

- The selection mechanism itself counts as one step toward billing metrics.
- For AI model or prompt experiments, `experimentRef` is the cleanest way to attribute a score back to the variant, including from a separate later run — pass it to `defer()` or `inngest.score.experiment()`.
- Weights are relative: `{ control: 9, candidate: 1 }` and `{ control: 90, candidate: 10 }` produce the same split.
- Part of the Agent Evals workflow: run → preserve context → attach scores → compare changes via experiments.

## Related

- [Scoring](./scoring.md)
- [Deferred Scoring](./deferred-scoring.md)
- [Agent Evals](./agent-evals.md)
