# Agent Patterns

Four architectural patterns built with the Workflow Agents API (`agentWorkflow`, `agents.agent`, `agents.task`): prompt chaining, evaluator-optimizer, parallelization and orchestrator-workers.

## Signature / Usage

Orchestrator-workers (manager LLM directs worker agents):

```ts
import { serve } from "@upstash/workflow/nextjs";
import { agentWorkflow } from "@upstash/workflow-agents";
import { WikipediaQueryRun } from "@langchain/community/tools/wikipedia_query_run";

const wikiTool = new WikipediaQueryRun({
  topKResults: 1,
  maxDocContentLength: 500,
})

export const { POST } = serve(async (context) => {
  const agents = agentWorkflow(context);
  const model = agents.openai('gpt-4o');

  // Worker agents
  const worker1 = agents.agent({
    model,
    name: 'worker1',
    tools: { wikiTool },
    maxSteps: 3,
    background: 'You are a worker agent that answers general questions about advanced physics.'
  });

  const worker2 = agents.agent({
    model,
    name: 'worker2',
    tools: { wikiTool },
    maxSteps: 3,
    background: 'You are a worker agent that answers questions about quantum mechanics.'
  });

  const worker3 = agents.agent({
    model,
    name: 'worker3',
    tools: { wikiTool },
    maxSteps: 3,
    background: 'You are a worker agent that answers questions about relativity.'
  });

  // Synthesizing results
  const task = agents.task({
    model,
    prompt: `Create a Q&A for advanced topics in physics`,
    agents: [worker1, worker2, worker3],
    maxSteps: 3,
  })
  const { text } = await task.run();

  console.log(text);
});
```

## Options / Props

| Pattern | Shape |
|---------|-------|
| Prompt chaining | Several `agents.agent` instances; the `text` of one `agents.task({ agent, prompt }).run()` result is interpolated into the next prompt. An agent that uses tools needs `maxSteps: 2` (request tools, then summarize) |
| Evaluator-optimizer | A generator agent and an evaluator agent in a loop (3 iterations in the example); the evaluator answers `PASS` or feedback, which is fed back into the generator prompt |
| Parallelization | Workers run via `Promise.all` over `agents.task(...).run()`; an aggregator agent then summarizes the results |
| Orchestrator-workers | `agents.task({ model, agents: [...], prompt, maxSteps })` with several worker agents; a manager LLM decides which workers run |

## Notes

- To use the model results manually instead of a manager LLM, use the parallelization pattern
- The examples use `gpt-3.5-turbo` / `gpt-4o`; model IDs are verbatim from the official pages and may be outdated
- Source: https://upstash.com/docs/workflow/agents/patterns/prompt-chaining (fetched 2026-11-14; no version pin on the site)
- Source: https://upstash.com/docs/workflow/agents/patterns/evaluator-optimizer (fetched 2026-11-14; no version pin on the site)
- Source: https://upstash.com/docs/workflow/agents/patterns/parallelization (fetched 2026-11-14; no version pin on the site)
- Source: https://upstash.com/docs/workflow/agents/patterns/orchestrator-workers (fetched 2026-11-14; no version pin on the site)

## Related

- [agents](./agents.md)
- [context-run](./context-run.md)
- [parallel-steps](./parallel-steps.md)
