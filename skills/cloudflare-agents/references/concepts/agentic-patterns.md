---
source: https://developers.cloudflare.com/agents/concepts/agentic-patterns/
---

# Agentic patterns

Common patterns for implementing AI agents, based on Anthropic's "building effective agents" patterns, with AI SDK code samples running in Durable Objects.

## Signature / Usage

Prompt chaining (each LLM call processes the output of the previous one):

```ts
import { openai } from "@ai-sdk/openai";
import { generateText, generateObject } from "ai";
import { z } from "zod";

export default async function generateMarketingCopy(input: string) {
  const model = openai("gpt-4o");

  // First step: Generate marketing copy
  const { text: copy } = await generateText({
    model,
    prompt: `Write persuasive marketing copy for: ${input}. Focus on benefits and emotional appeal.`,
  });

  // Perform quality check on copy
  const { object: qualityMetrics } = await generateObject({
    model,
    schema: z.object({
      hasCallToAction: z.boolean(),
      emotionalAppeal: z.number().min(1).max(10),
      clarity: z.number().min(1).max(10),
    }),
    prompt: `Evaluate this marketing copy for:
    1. Presence of call to action (true/false)
    2. Emotional appeal (1-10)
    3. Clarity (1-10)

    Copy to evaluate: ${copy}`,
  });

  // If quality check fails, regenerate with more specific instructions
  if (
    !qualityMetrics.hasCallToAction ||
    qualityMetrics.emotionalAppeal < 7 ||
    qualityMetrics.clarity < 7
  ) {
    const { text: improvedCopy } = await generateText({
      model,
      prompt: `Rewrite this marketing copy with:
      ${!qualityMetrics.hasCallToAction ? "- A clear call to action" : ""}
      ${qualityMetrics.emotionalAppeal < 7 ? "- Stronger emotional appeal" : ""}
      ${qualityMetrics.clarity < 7 ? "- Improved clarity and directness" : ""}

      Original copy: ${copy}`,
    });
    return { copy: improvedCopy, qualityMetrics };
  }

  return { copy, qualityMetrics };
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Prompt chaining | pattern | — | Decomposes a task into a sequence of steps; each LLM call processes the previous output. |
| Routing | pattern | — | Classifies input (`generateObject` with an enum schema) and directs it to specialized follow-up tasks (model and system prompt per class). |
| Parallelization | pattern | — | Simultaneous processing through sectioning or voting; aggregate results with another model call. |
| Orchestrator-workers | pattern | — | A central LLM plans (`generateObject`), delegates each planned item to worker LLMs with `Promise.all`, and synthesizes. |
| Evaluator-optimizer | pattern | — | One LLM generates, another evaluates and gives feedback in a bounded loop (the sample uses `MAX_ITERATIONS = 3`, a small model first and a larger one to evaluate/improve). |

## Notes

- Only the prompt-chaining sample is reproduced verbatim; the other four patterns are summarized (the official page has full samples for each). The samples use `@ai-sdk/openai` models (`gpt-4o`, `o1`, ...) as in the official page; the AI SDK itself is covered by the vercel-ai-sdk skill.
- Interpolating user-supplied text into prompts (as these samples do) allows prompt injection; do not give such calls privileged tools.
- Related durable patterns: human-in-the-loop, long-running agents, workflows.

## Related

- [Human-in-the-loop](./human-in-the-loop.md)
- [Long-running agents](./long-running-agents.md)
- [Workflows](./workflows.md)
- [Calling LLMs](./calling-llms.md)
