# AI

| Name | Description | Path |
|------|-------------|------|
| step.ai.infer() | Offload LLM inference to Inngest's infrastructure; function pauses during API call (serverless cost saver) | [step-ai-infer.md](./step-ai-infer.md) |
| step.ai.wrap() | Wrap an existing AI SDK call as a durable step with full observability (TypeScript only) | [step-ai-wrap.md](./step-ai-wrap.md) |
| Agent Tool Loop | ReAct-style durable agent loop where every LLM call and tool execution is a retriable step | [agent-tool-loop.md](./agent-tool-loop.md) |
| Human-in-the-Loop | Insert human approval gates into AI workflows using `step.waitForEvent()` | [human-in-the-loop.md](./human-in-the-loop.md) |
| Sub-Agent Delegation | Delegate tasks to child agent functions via `step.invoke()` (sync) or `step.sendEvent()` (async) | [sub-agent-delegation.md](./sub-agent-delegation.md) |
