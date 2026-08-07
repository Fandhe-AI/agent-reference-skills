# Tracing

Server-side SDK tracing that automatically records a structured trace of model calls, tool calls, handoffs, guardrails, and custom spans for a workflow run, viewable in the Traces dashboard.

## Signature / Usage

```typescript
import { Agent, run, withTrace } from "@openai/agents";

const agent = new Agent({
  name: "Joke generator",
  instructions: "Tell funny jokes.",
});

await withTrace("Joke workflow", async () => {
  const first = await run(agent, "Tell me a joke");
  const second = await run(agent, `Rate this joke: ${first.finalOutput}`);
});
```

```python
from agents import Agent, Runner, trace

agent = Agent(
    name="Joke generator",
    instructions="Tell funny jokes.",
)

with trace("Joke workflow"):
    first = await Runner.run(agent, "Tell me a joke")
    second = await Runner.run(agent, f"Rate this joke: {first.final_output}")
```

## Notes

- Distinct from the `pino` logging skill and from generic "trace"/"tracing" terminology used elsewhere in this repository — this page is the Agents SDK's built-in run-tracing feature (`withTrace` / `trace`), not a logging library.
- Tracing is enabled by default in the server-side SDK; no separate opt-in is required to get a basic trace per run.
- A trace covers: the overall run/workflow, each individual model call, tool execution and outputs, handoffs, guardrails, and any custom spans wrapped explicitly (as with `withTrace` / `trace`).
- Wrap multiple related `run` calls in a single `withTrace` (TypeScript) / `trace` (Python) block to group them under one workflow trace instead of one trace per run.
- Traces serve two purposes: debugging a single workflow run, and feeding stabilized examples into evaluation systems.
- MCP integration details (hosted vs. local MCP servers) live in the `mcp` scope, not here.

## Related

- [Guardrails and human review](./guardrails-and-human-review.md)
- [Multi-agent orchestration](./multi-agent.md)
