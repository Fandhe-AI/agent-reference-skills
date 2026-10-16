# Score with an LLM Judge

Grade agent answers against a rubric with a model and record the 0 to 1 verdict as a score on the run, plus a deterministic tool-use check.

## Signature / Usage

```typescript
import Anthropic from "@anthropic-ai/sdk";
import type { GetStepTools } from "inngest";
import { inngest } from "./client";

const anthropic = new Anthropic();
const MODEL = process.env.JUDGE_MODEL!; // the model that grades answers

type Step = GetStepTools<typeof inngest>;

// Ask the model to grade against a rubric and reply with
// {"score": <0-1>, "reason": "..."}. Normalize to { name, value }.
async function judge(step: Step, name: string, rubric: string) {
  const text = await step.run(`judge-${name}`, async () => {
    const res = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 512,
      messages: [{ role: "user", content: rubric }],
    });
    const block = res.content.find((b) => b.type === "text");
    return block?.type === "text" ? block.text : "{}";
  });

  const { score } = JSON.parse(text) as { score: number };
  return { name, value: score };
}
```

Record the verdicts with `step.score()` after the agent finishes:

```typescript
export const runAgentFn = inngest.createFunction(
  { id: "run-agent", triggers: { event: "agent/run.requested" } },
  async ({ event, step }) => {
    const { prompt } = event.data;
    const { answer, toolCalls } = await runAgent(step, prompt);

    await step.score("score-conciseness", await scoreConciseness(step, prompt, answer));
    await step.score("score-helpfulness", await scoreHelpfulness(step, prompt, answer));
    await step.score("score-tool-efficiency", scoreToolEfficiency(toolCalls));

    return answer;
  }
);
```

Deterministic check (no model cost):

```typescript
export function scoreToolEfficiency(
  toolCalls: { name: string; input: unknown }[]
) {
  const keys = toolCalls.map((c) => `${c.name}(${JSON.stringify(c.input)})`);
  const value = toolCalls.length === 0 ? 1 : new Set(keys).size / keys.length;
  return { name: "tool-efficiency", value };
}
```

## Notes

- Prerequisites: complete the Agent Evals quick start or register `scoreMiddleware()` on the client. The example uses `npm install @anthropic-ai/sdk`; any model provider works. `JUDGE_MODEL` is read from the environment rather than hard-coded.
- The judge runs the model call as a durable step, so a retry reuses the verdict instead of paying for a new one. Each judge adds a model call and two steps to the run.
- Each rubric (`scoreConciseness`, `scoreHelpfulness`) is the shared `judge()` with a different prompt that defines what `1` and `0` mean so the scale stays fixed. Watch conciseness and helpfulness together: rising helpfulness with falling conciseness can mean padding.
- A judge measures a model's opinion. When the real outcome is observable (for example a resolved ticket), prefer that signal and use a judge to explain it.
- With ground truth, score accuracy directly: exact match for a single label, set overlap (Jaccard) for lists, a tolerance band for numbers. Keep accuracy and judge scores under separate names.
- Keep judges cheap and fair: judge a sample when costly (choose the sample in code, same rule for every variant); move slow judges to a deferred scorer; keep the rubric and judge model fixed while comparing variants; control provider rate limits on a deferred judge with concurrency or throttling.
- Python: no `step.score()`; write each score in its own step via `inngest_client.score(name=..., value=..., run_id=ctx.run_id)` (requires the inngest release after 0.5.19).

## Related

- [Scoring](./scoring.md)
- [Deferred Scoring](./deferred-scoring.md)
- [Score User Feedback](./evals-user-feedback.md)
- [Compare Models and Prompts](./evals-compare-models-and-prompts.md)
- [Manage Eval Costs](./evals-cost-management.md)
