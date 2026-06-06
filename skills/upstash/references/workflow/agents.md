# Agents

The `@upstash/workflow` Agents API enables building durable AI agent pipelines — individual agents or multi-agent collaborations — with built-in reliability, observability, and integration with AI SDK and LangChain.

## Signature / Usage

```typescript
// Agents are built on top of the workflow context
// Refer to the Upstash Agents documentation for full setup:
// https://upstash.com/docs/workflow/agents/overview
```

## Supported Architectural Patterns

| Pattern | Description |
|---------|-------------|
| Prompt Chaining | Sequential LLM calls where each output feeds into the next |
| Evaluator-Optimizer | Iterative feedback loops that refine LLM outputs |
| Parallelization | Distributing tasks across multiple LLMs simultaneously |
| Orchestrator-Workers | A coordinator directing multiple worker agents |

## Key Features

- Tool integration with Vercel AI SDK or LangChain
- Reliable agent invocation without serverless timeout concerns
- Enhanced debuggability via Upstash Console logs
- Durable execution: agent steps survive crashes and retries

## Notes

- Agents API is available in `@upstash/workflow` (JavaScript/TypeScript only; not yet available in `workflow-py`)
- Agent steps use the same `context.run()`, `context.call()`, and `context.invoke()` primitives as standard workflows

## Related

- [overview](./overview.md)
- [context.run](./context-run.md)
- [context.invoke](./context-invoke.md)
- [serve-many](./serve-many.md)
