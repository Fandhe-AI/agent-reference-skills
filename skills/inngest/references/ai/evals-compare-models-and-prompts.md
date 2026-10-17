# Compare Models and Prompts

Split production traffic between two answer strategies and compare them by the feedback each one earns.

## Signature / Usage

```typescript
import { experiment } from "inngest";
import { inngest } from "./client";
import { feedbackScorer } from "./scorers";

export const answerTicket = inngest.createFunction(
  { id: "answer-ticket", triggers: { event: "support/ticket.created" } },
  async ({ event, step, group, defer }) => {
    const { result: answerText, experimentRef } = await group.experiment(
      "answer-style",
      {
        variants: {
          concise: () =>
            step.run("answer-concise", () =>
              answer({ prompt: CONCISE_PROMPT, ticket: event.data })
            ),
          detailed: () =>
            step.run("answer-detailed", () =>
              answer({ prompt: DETAILED_PROMPT, ticket: event.data })
            ),
        },
        select: experiment.bucket(event.data.accountId, {
          weights: { concise: 50, detailed: 50 },
        }),
      }
    );

    await step.run("send-answer", () => sendReply(event.data.ticketId, answerText));

    // Immediate check, credited to the variant.
    await inngest.score.experiment({
      name: "answer-valid",
      value: isValidAnswer(answerText),
      experiment: experimentRef,
    });

    // Later outcome, credited to the same variant.
    defer("score-feedback", {
      function: feedbackScorer,
      data: { ticketId: event.data.ticketId },
      experiment: experimentRef,
    });

    return answerText;
  }
);
```

The feedback scorer waits for the rating and returns a score:

```typescript
export const feedbackScorer = createScorer(
  inngest,
  { id: "feedback-scorer", schema: z.object({ ticketId: z.string() }) },
  async ({ event, step }) => {
    const feedback = await step.waitForEvent("wait-for-feedback", {
      event: "support/feedback.received",
      timeout: "7d",
      if: "async.data.ticketId == event.data.ticketId",
    });
    if (!feedback) return null;
    return { name: "customer-helpful", value: feedback.data.helpful };
  }
);
```

## Notes

- `experiment.bucket()` keeps an account on the same strategy across tickets. To compare models instead of prompts, change the model in each callback; to compare providers, call a different SDK. Change one thing at a time.
- Because `defer()` received the `experimentRef`, the scorer's returned score is credited to the variant that served the answer.
- Compare in the dashboard experiment view (run counts and score aggregates per variant) or with the `get_experiment` tool in the Inngest MCP server. Compare `customer-helpful` only after both variants have had the same seven days to collect feedback, and keep the count of runs still waiting beside every average.
- Ramp in stages, for example `{ concise: 20, detailed: 80 }` then `{ concise: 0, detailed: 100 }`. Changing bucket weights can move an account to the other variant; store assignments in your database and select them with `experiment.custom()` if an account must never switch back. Pin the safe variant quickly with `experiment.fixed("concise")`.
- Python (release after 0.5.19): `ctx.group.experiment()` with `experiment.bucket(str(ticket["accountId"]), weights={...})`; `inngest_client.score_experiment(..., run_id=ctx.run_id)`; scorer via `create_defer()` reading `ctx.parents[0]`.
- The official TypeScript example binds the result to `answer`, shadowing the `answer()` generator (TDZ ReferenceError); this page renames the result to `answerText`, matching the Python example's `reply`.
- The official example interpolates the ID into the `if` expression; compare `async.data.X == event.data.X` instead so IDs containing quotes cannot alter the expression.
- Source: https://www.inngest.com/docs-markdown/agent-evals/guides/compare-models-and-prompts (fetched 2026-10).

## Related

- [Agent Evals Experiments](./agent-evals-experiments.md)
- [Group Experiment](./group-experiment.md)
- [Deferred Scoring](./deferred-scoring.md)
- [Score with an LLM Judge](./evals-llm-judge.md)
- [Read Results and Roll Out](./evals-interpreting-results.md)
