# Agent Evals Quick Start

Build an online eval that links immediate checks and later feedback to the response variant that served a user. Uses fixed responses, so no AI provider is required.

## Signature / Usage

```typescript
import express from "express";
import { randomUUID } from "node:crypto";
import { Inngest, experiment } from "inngest";
import { serve } from "inngest/express";
import { createScorer, scoreMiddleware } from "inngest/experimental";
import { z } from "zod";

const inngest = new Inngest({
  id: "support-evals-example",
  middleware: [scoreMiddleware()],
});

const feedbackScorer = createScorer(
  inngest,
  {
    id: "score-support-feedback",
    schema: z.object({ ticketId: z.string() }),
  },
  async ({ event, step }) => {
    const feedback = await step.waitForEvent("wait-for-feedback", {
      event: "support/feedback.received",
      timeout: "10m",
      if: "async.data.ticketId == event.data.ticketId",
    });

    if (!feedback) return null;
    return { name: "user-helpful", value: feedback.data.helpful };
  }
);

const answerTicket = inngest.createFunction(
  { id: "answer-support-ticket", triggers: { event: "support/ticket.created" } },
  async ({ event, step, group, defer }) => {
    const { result: answer, variant, experimentRef } =
      await group.experiment("answer-style", {
        variants: {
          current: () => step.run("answer-current", () => "We received your request. Our team will reply soon."),
          rewrite: () => step.run("answer-rewrite", () => `Thanks for writing about ${event.data.message}. We'll help you resolve it.`),
        },
        select: experiment.weighted({ current: 50, rewrite: 50 }),
      });

    await step.score("score-response-length", {
      name: "under-120-characters",
      value: answer.length <= 120,
    });

    defer("score-user-feedback", {
      function: feedbackScorer,
      data: { ticketId: event.data.ticketId },
      experiment: experimentRef,
    });

    return { ticketId: event.data.ticketId, variant, answer };
  }
);

const app = express();
app.use(express.json());
app.use(
  "/api/inngest",
  serve({ client: inngest, functions: [answerTicket, feedbackScorer] })
);

app.post("/ticket", async (req, res) => {
  const ticketId = randomUUID();
  const message = String(req.body.message ?? "I cannot sign in");
  await inngest.send({
    name: "support/ticket.created",
    data: { ticketId, message },
    meta: { sessions: { ticket_id: ticketId } },
  });
  res.json({ ticketId });
});

app.post("/feedback", async (req, res) => {
  const ticketId = String(req.body.ticketId);
  const helpful = req.body.helpful === true;
  await inngest.send({
    name: "support/feedback.received",
    data: { ticketId, helpful },
    meta: { sessions: { ticket_id: ticketId } },
  });
  res.json({ ticketId, helpful });
});

app.listen(3000);
```

Run locally (app and Dev Server in separate terminals):

```bash
INNGEST_DEV=1 npx tsx index.ts
npx --ignore-scripts=false inngest-cli@latest dev --no-discovery -u http://localhost:3000/api/inngest
```

Send the triggering event with a session so related runs group together:

```typescript
await inngest.send({
  name: "support/ticket.created",
  data: { ticketId, message },
  meta: { sessions: { ticket_id: ticketId } },
});
```

## Notes

- Prerequisites: Node.js and the latest TypeScript SDK; experiments and scoring require v4.8.0 or later; scoring and deferred scoring are beta APIs. Install with `npm install inngest@latest express zod` and `npm install -D tsx @types/express`.
- The session ID links events and runs for one ticket; `under-120-characters` is an immediate check; the deferred scorer waits separately for feedback so the support function can finish; `experimentRef` credits the feedback to the selected variant.
- The scorer writes `user-helpful` for the original run and its variant. Sessions can take a short time to appear in **AI -> Sessions** because the index updates asynchronously.
- A small number of test runs demonstrates attribution; it does not establish which variant is better.
- To keep a user or account on the same response across runs, replace `experiment.weighted(...)` with `experiment.bucket(accountId, { weights: { current: 50, rewrite: 50 } })` and supply a stable `accountId` in event data.
- Python: requires the inngest release after 0.5.19. It has no weighted selector; use `experiment.bucket(ctx.run_id, weights={...})` for a per-run split, `create_defer()` / `ctx.defer()` for deferred scorers, and `inngest_client.score_experiment(...)` for variant scores.
- The official example interpolates the ID into the `if` expression; compare `async.data.X == event.data.X` instead so IDs containing quotes cannot alter the expression.
- Source: https://www.inngest.com/docs-markdown/agent-evals/quick-start (fetched 2026-10).

## Related

- [Agent Evals](./agent-evals.md)
- [Scoring](./scoring.md)
- [Deferred Scoring](./deferred-scoring.md)
- [Group Experiment](./group-experiment.md)
- [Agent Evals Experiments](./agent-evals-experiments.md)
- [Read Results and Roll Out](./evals-interpreting-results.md)
