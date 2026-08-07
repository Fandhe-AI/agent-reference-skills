# Scoring

Attach named scores (numbers or booleans) to function runs and steps to track how well AI workflows perform over time. Beta feature, TypeScript SDK v4+.

## Signature / Usage

```ts
import { Inngest } from "inngest";
import { scoreMiddleware } from "inngest/experimental";

export const inngest = new Inngest({
  id: "support-agent",
  middleware: [scoreMiddleware()],
});

export default inngest.createFunction(
  { id: "answer-support-ticket", triggers: { event: "support/ticket.created" } },
  async ({ event, step }) => {
    const answer = await step.run("generate-answer", () => generateAnswer(event.data.ticket));

    const passed = await step.run("check-answer", () => validateAnswer(answer));

    await step.score("score-answer-quality", { name: "answer-quality", value: passed });

    return { answer, passed };
  }
);
```

## Options / Props

**`inngest.score(options)`** — score a run or step, inside or outside a function

| Name | Type | Description |
|------|------|-------------|
| `name` | `string` | Score label; use consistent names across runs for aggregation |
| `value` | `number \| boolean` | Score value; 0-1 for percentages, integers for counts, booleans for pass/fail |
| `runId` | `string` | Run to score; required when scoring from outside a function |
| `stepId` | `string` | Optional step to attach the score to in the trace view |

**`inngest.score.experiment(options)`** — attribute a score to an experiment variant

| Name | Type | Description |
|------|------|-------------|
| `name` | `string` | Score label |
| `value` | `number \| boolean` | Score value |
| `experiment` | `ExperimentRef` | `{ experimentName, variant }` returned by `group.experiment()` |
| `runId` | `string` | Run to attach the score to; required when scoring from a different run |

**`step.score(id, options)`** — durable, memoized score write from within a step

| Name | Type | Description |
|------|------|-------------|
| `id` | `string` | Durable step ID; must be unique within the run |
| `options.name` | `string` | Score label |
| `options.value` | `number \| boolean` | Score value |

## Notes

- Scoring is in beta; requires `npm install inngest@latest` (TypeScript SDK v4).
- `step.score()` requires `scoreMiddleware()` (from `inngest/experimental`) registered on the client, and is memoized — a retry or replay does not double-record.
- Use direct scoring (`inngest.score()` / `step.score()`) for outcomes known before the function finishes; use deferred scoring for signals that arrive later.
- When scoring an experiment variant from a different run than the one that served it, pass that run's `runId` or the score won't appear under the experiment.

## Related

- [Deferred Scoring](./deferred-scoring.md)
- [Group Experiment](./group-experiment.md)
- [Agent Evals](./agent-evals.md)
