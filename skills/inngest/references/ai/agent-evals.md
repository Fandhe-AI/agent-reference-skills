# Agent Evals

Production evaluation workflow for AI agents built from Inngest functions, scoring, deferred scoring, sessions, traces, step experiments, and Insights — not a separate SDK package.

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

## Notes

- A production eval has four parts: run the workflow inside functions/steps, preserve context (traces, sessions, OpenTelemetry), attach scores (direct or deferred), and compare changes via step experiments.
- Add `meta.sessions` on the triggering event to group related runs (conversation, ticket, task) for easier inspection; sessions do not change which functions run.
- Use direct scoring (`step.score()` / `inngest.score()`) for outcomes known during the run (guardrails, JSON validity, model confidence); use deferred scoring for signals that arrive later (feedback, resolution).
- Use step experiments (`group.experiment()`) to split traffic across prompt/model/tool variants and attribute scores via `experimentRef`.
- Scoring and deferred scoring require the TypeScript SDK v4 and are currently beta APIs.
- Use stable score names across runs — changing a score name creates a separate metric.

## Related

- [Scoring](./scoring.md)
- [Deferred Scoring](./deferred-scoring.md)
- [Group Experiment](./group-experiment.md)
- [step.ai.infer()](./step-ai-infer.md)
