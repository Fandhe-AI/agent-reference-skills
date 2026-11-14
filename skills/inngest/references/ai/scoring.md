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
- Source: https://github.com/inngest/inngest-js/releases/tag/inngest@4.26.0 (retrieved 2026-11-14)
### Changes in SDK 4.26.0

- `inngest.score.experiment()` no longer accepts `stepId`; experiment scores must be run-scoped (the REST API already enforces this). `createScorer()` ignores, and warns about, a returned `stepId` when the parent was deferred with an experiment, so the score lands on the run where the experiment view reads it.
- Scores are sent as one `inngest.score.<name>` metadata kind per score name (values `{ value }`), and SDK warnings as one `inngest.warning.<code>` kind per warning code, both sent as `set`.
- This requires an Inngest server (self-hosted or Dev Server) that accepts per-name score and warning kinds (inngest/inngest#4992). Older servers reject these kinds with a 400 when sent through the API, or with a checkpointed step, so those scores and warnings are lost.
- The official Agent Evals reference page (https://www.inngest.com/docs-markdown/agent-evals/reference, retrieved 2026-11-14) still lists `stepId?` for `inngest.score.experiment()`; this page follows the 4.26.0 release notes.

## Related

- [Deferred Scoring](./deferred-scoring.md)
- [Group Experiment](./group-experiment.md)
- [Agent Evals](./agent-evals.md)
