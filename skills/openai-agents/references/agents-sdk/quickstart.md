# Quickstart

The shortest path to a working SDK-based agent: install the SDK, define an agent, run it, then add tools and specialist agents as the workflow grows.

## Signature / Usage

```bash
# TypeScript
npm install @openai/agents zod

# Python
pip install openai-agents

export OPENAI_API_KEY=sk-...
```

```typescript
import { Agent, run } from "@openai/agents";

const agent = new Agent({
  name: "History tutor",
  instructions: "You answer history questions clearly and concisely.",
  model: "gpt-5.6",
});

const result = await run(agent, "When did the Roman Empire fall?");
console.log(result.finalOutput);
```

```python
import asyncio
from agents import Agent, Runner

agent = Agent(
    name="History tutor",
    instructions="You answer history questions clearly and concisely.",
    model="gpt-5.6",
)

async def main() -> None:
    result = await Runner.run(agent, "When did the Roman Empire fall?")
    print(result.final_output)

if __name__ == "__main__":
    asyncio.run(main())
```

## Carry state into the next turn

| If you want | Start with |
|---|---|
| Keep the full history in your application | `result.history` (TS) / `result.to_input_list()` (Python) |
| Let the SDK load and save history for you | A session |
| Let OpenAI manage continuation state | A server-managed continuation ID (`conversationId` / `previousResponseId`) |
| Resume a run that paused for approval or interruption | `result.state` (TS) / `result.to_state()` (Python), with `interruptions` |

After handoffs, reuse `lastAgent` (TS) / `last_agent` (Python) for the next turn when that specialist should stay in control.

## Add a function tool

```typescript
import { Agent, run, tool } from "@openai/agents";
import { z } from "zod";

const historyFunFact = tool({
  name: "history_fun_fact",
  description: "Return a short history fact.",
  parameters: z.object({}),
  async execute() {
    return "Sharks are older than trees.";
  },
});

const agent = new Agent({
  name: "History tutor",
  instructions: "Answer history questions clearly. Use history_fun_fact when it helps.",
  tools: [historyFunFact],
});
```

```python
from agents import Agent, Runner, function_tool

@function_tool
def history_fun_fact() -> str:
    """Return a short history fact."""
    return "Sharks are older than trees."

agent = Agent(
    name="History tutor",
    instructions="Answer history questions clearly. Use history_fun_fact when it helps.",
    tools=[history_fun_fact],
)
```

## Add specialist agents (handoffs)

```typescript
const triageAgent = Agent.create({
  name: "Homework triage",
  instructions: "Route each homework question to the right specialist.",
  handoffs: [historyTutor, mathTutor],
});

const result = await run(triageAgent, "Who was the first president of the United States?");
console.log(result.lastAgent?.name);
```

```python
triage_agent = Agent(
    name="Homework triage",
    instructions="Route each homework question to the right specialist.",
    handoffs=[history_tutor, math_tutor],
)

result = await Runner.run(triage_agent, "Who was the first president of the United States?")
print(result.last_agent.name)
```

## Notes

- The normal server-side SDK path includes tracing (Traces dashboard at platform.openai.com/traces).
- Handoffs, agents-as-tools, and multi-agent orchestration detail live in this skill's `orchestration` scope; hosted/function tools live in the `tools` scope.
- This is the official OpenAI Agents SDK, unrelated to the third-party `hermes-agent` CLI.

## Related

- [Agent definitions](./define-agents.md)
- [Running agents](./running-agents.md)
- [Results and state](./results-and-state.md)
