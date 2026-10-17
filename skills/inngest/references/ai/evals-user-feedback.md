# Score User Feedback

Grade an agent on what actually happened (a thumbs-up, a resolved ticket, ground truth) by attaching the outcome to the original run whenever it arrives.

## Signature / Usage

Score directly when your app receives the outcome and knows the run ID. Return the run ID with the answer:

```typescript
export const answerQuestion = inngest.createFunction(
  { id: "answer-question", triggers: { event: "agent/question.asked" } },
  async ({ event, step, runId }) => {
    const answer = await step.run("answer", () => runAgent(event.data.question));
    await step.run("save-answer", () =>
      db.answers.insert({ id: event.data.answerId, runId, answer })
    );
    return { answer, runId };
  }
);

export const scoreRating = inngest.createFunction(
  { id: "score-rating", triggers: { event: "agent/response.rated" } },
  async ({ event, step }) => {
    const { runId } = await step.run("load-answer", () =>
      db.answers.get(event.data.answerId)
    );

    await inngest.score({
      name: "human-feedback",
      value: event.data.rating === "up",
      runId,
    });
  }
);
```

Defer a scorer when the outcome needs waiting, matching, or computing:

```typescript
export const triageScorer = createScorer(
  inngest,
  {
    id: "triage-localization-scorer",
    schema: z.object({ incidentId: z.string(), cited: z.array(z.string()) }),
  },
  async ({ event, step }) => {
    const fix = await step.waitForEvent("wait-for-fix", {
      event: "incident/fix.shipped",
      timeout: "30d",
      if: "async.data.incidentId == event.data.incidentId",
    });

    if (!fix) return null; // No fix yet: the outcome is unknown.
    return {
      name: "localization",
      value: jaccard(event.data.cited, fix.data.fixFiles),
    };
  }
);

// In the triage function, after posting the RCA:
defer("score-localization", {
  function: triageScorer,
  data: { incidentId: event.data.incidentId, cited: rca.citedFiles },
});
```

## Notes

- Situation to approach: app receives the outcome and knows the run ID -> `inngest.score({ runId })`; outcome needs waiting, matching, or computing -> `createScorer()` + `defer()`.
- Pass the **original** `runId`; without it the score attaches to the `score-rating` run instead of the answer. `inngest.score()` can also be called from an API route outside any function.
- Register both the scorer and the originating function in `serve()`. The triage run finishes right away while the scorer waits up to 30 days; the `localization` score then appears on the triage run. Set overlap (Jaccard) gives partial credit.
- Scores attach to a run or step, not to a session. To score a conversation outcome, score the run that produced the final answer and add a session to every event in the conversation.
- Tips: score the outcome, not a proxy; returning `null` on timeout records nothing while `0` records a failure (treat silence as unknown); keep names and ranges stable (pass/fail as `1`/`0`, graded results as a fraction); credit experiment variants with `experiment: experimentRef` on `defer()` or `inngest.score.experiment()`.
- Python (release after 0.5.19): `inngest_client.score(name=..., value=..., run_id=...)`, `create_defer()` and `ctx.defer()`; the scorer reads `ctx.parents[0].run_id`.
- The official example interpolates the ID into the `if` expression; compare `async.data.X == event.data.X` instead so IDs containing quotes cannot alter the expression.
- Source: https://www.inngest.com/docs-markdown/agent-evals/guides/user-feedback (fetched 2026-10).

## Related

- [Scoring](./scoring.md)
- [Deferred Scoring](./deferred-scoring.md)
- [Score with an LLM Judge](./evals-llm-judge.md)
- [Compare Models and Prompts](./evals-compare-models-and-prompts.md)
- [Read Results and Roll Out](./evals-interpreting-results.md)
