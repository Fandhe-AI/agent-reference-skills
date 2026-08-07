# Deferred Scoring

Evaluates function outcomes that aren't known until after execution completes — user feedback, ticket resolution, delayed conversions — using a separate scorer function triggered via `defer()`. Beta feature, TypeScript SDK v4+.

## Signature / Usage

```ts
import { createScorer } from "inngest/experimental";
import { z } from "zod";

export const feedbackScorer = createScorer(
  inngest,
  { id: "support-feedback-scorer", schema: z.object({ ticketId: z.string() }) },
  async ({ event, step }) => {
    const feedback = await step.waitForEvent("wait-for-feedback", {
      event: "support/feedback.received",
      timeout: "7d",
      if: `async.data.ticketId == '${event.data.ticketId}'`,
    });

    return { name: "user-feedback", value: feedback?.data.helpful ? 1 : 0 };
  }
);

export default inngest.createFunction(
  { id: "answer-support-ticket", triggers: { event: "support/ticket.created" } },
  async ({ event, step, defer }) => {
    const answer = await step.run("generate-answer", () => generateAnswer(event.data.ticket));

    defer("score-feedback", {
      function: feedbackScorer,
      data: { ticketId: event.data.ticketId },
    });

    return { answer };
  }
);
```

## Options / Props

**`createScorer(client, config, handler)`** — creates a reusable deferred scorer function

| Name | Type | Description |
|------|------|-------------|
| `client` | `Inngest` | Your Inngest client instance |
| `config.id` | `string` | Unique identifier for the scorer function |
| `config.schema` | `StandardSchema` | Optional Zod (or compatible) schema validating the `defer()` payload |
| `handler` | `(ctx) => Promise<{ name, value } \| null>` | Receives `event`, `step`, `parents`; return the score or `null`/`undefined` to write nothing |

**`defer(id, options)`** — fire-and-forget trigger of a deferred scorer from inside a function

| Name | Type | Description |
|------|------|-------------|
| `id` | `string` | Deterministic identifier for this deferred call |
| `options.function` | `ScorerFunction` | The scorer created with `createScorer()` |
| `options.data` | `object` | Input data matching the scorer's schema |
| `options.experiment` | `ExperimentRef` | Optional; attributes the scorer's result to the served experiment variant |

## Notes

- Scorers run independently in the background; the parent function never waits for or depends on the scorer's lifecycle.
- Even if no signal arrives within the timeout window, the scorer completes with a default score.
- `defer()` returns `void` — there is nothing to `await`.
- The SDK automatically threads the parent run's ID through, attributing scores to the originating run; `ctx.parents[0]` exposes the parent run and served experiment (if any) inside the handler.
- Requires the TypeScript SDK v4 and `inngest/experimental` imports; beta API.

## Related

- [Scoring](./scoring.md)
- [Group Experiment](./group-experiment.md)
- [Agent Evals](./agent-evals.md)
