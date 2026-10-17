# Agents

The `@upstash/workflow` Agents API enables building durable AI agent pipelines — individual agents or multi-agent collaborations — with built-in reliability, observability, and integration with AI SDK and LangChain.

## Signature / Usage

```bash
npm i @upstash/workflow @upstash/workflow-agents ai zod
```

```typescript
import { serve } from "@upstash/workflow/nextjs";
import { agentWorkflow } from "@upstash/workflow-agents";

export const { POST } = serve<{ prompt: string }>(async (context) => {
  const prompt = context.requestPayload.prompt
  const agents = agentWorkflow(context)
  const model = agents.openai('gpt-3.5-turbo')

  const communicatorAgent = agents.agent({
    model,
    name: 'communicatorAgent',
    maxSteps: 2,
    tools: { /* AI SDK / LangChain / WorkflowTool tools */ },
    background: 'Answer questions directed towards you.',
  })

  const task = agents.task({ agent: communicatorAgent, prompt })
  const { text } = await task.run()
})
```

## Options / Props

| Feature | Description |
|---------|-------------|
| `agents.openai(model, { baseURL, apiKey, callSettings })` | OpenAI model; `baseURL` / `apiKey` select an OpenAI-compatible provider; `callSettings` (`timeout`, `retries`, `flowControl`) configure the `context.call` made to the LLM API |
| `agents.AISDKModel({ context, provider, providerParams })` | Any AI SDK provider via its `create<Provider>` function (e.g. `createAnthropic` from `@ai-sdk/anthropic`); takes `agentCallParams` for the same call settings |
| Tools | AI SDK `tool()`, LangChain tools, Agentic toolkits, or `new WorkflowTool({ description, schema, invoke, executeAsStep })` |
| `agents.agent({ model, name, maxSteps, tools, background })` | An LLM with tools and background (system prompt); `name` is used for the agent's `context.call` step names |
| `agents.task({ agent, prompt })` | Single-agent task |
| `agents.task({ model, maxSteps, agents: [...], prompt })` | Multi-agent task; a manager LLM decides which agents run and in what order |

**Supported architectural patterns**

| Pattern | Description |
|---------|-------------|
| Prompt Chaining | Sequential LLM calls where each output feeds into the next |
| Evaluator-Optimizer | Iterative feedback loops that refine LLM outputs |
| Parallelization | Distributing tasks across multiple LLMs simultaneously |
| Orchestrator-Workers | A coordinator directing multiple worker agents |

## Notes

- Key features: tool integration with Vercel AI SDK or LangChain; reliable agent invocation without serverless timeout concerns; enhanced debuggability via Upstash Console logs; durable execution (agent steps survive crashes and retries)
- Agents API is JavaScript/TypeScript only; not yet available in `workflow-py`
- By default tool `execute` / `invoke` is wrapped in `context.run` as a step; pass `executeAsStep: false` to `WorkflowTool` to use `context.call` etc. inside the tool
- Migration (0.x → 1.0.0): `context.agents.*` moved to the separate `@upstash/workflow-agents` package (`const agents = agentWorkflow(context)`), removing the AI SDK dependency from the core package
- Agent steps use the same `context.run()`, `context.call()`, and `context.invoke()` primitives as standard workflows
- Source: fetched 2026-10 from https://upstash.com/docs/workflow/agents/overview (and sibling pages getting-started, features, patterns/* under agents/)

## Related

- [overview](./overview.md)
- [context.run](./context-run.md)
- [context.invoke](./context-invoke.md)
- [serve-many](./serve-many.md)
