# Agent Definitions

An `Agent` is the core unit of an SDK-based workflow. It packages a model, instructions, and optional runtime behavior such as tools, guardrails, MCP servers, handoffs, and structured outputs.

## Signature / Usage

```typescript
import { Agent, tool } from "@openai/agents";
import { z } from "zod";

const getWeather = tool({
  name: "get_weather",
  description: "Return the weather for a given city.",
  parameters: z.object({ city: z.string() }),
  async execute({ city }) {
    return `The weather in ${city} is sunny.`;
  },
});

const agent = new Agent({
  name: "Weather bot",
  instructions: "You are a helpful weather bot.",
  model: "gpt-6-astra",
  tools: [getWeather],
});
```

```python
from agents import Agent, function_tool

@function_tool
def get_weather(city: str) -> str:
    """Return the weather for a given city."""
    return f"The weather in {city} is sunny."

agent = Agent(
    name="Weather bot",
    instructions="You are a helpful weather bot.",
    model="gpt-6-astra",
    tools=[get_weather],
)
```

## Options / Props

| Name | Use it for |
|------|-------------|
| `name` | Human-readable identity in traces and tool/handoff surfaces |
| `instructions` | The job, constraints, and style for that agent (static string or dynamic callback) |
| `prompt` | Stored prompt configuration for Responses-based runs |
| `model` / model settings | Choosing the model and tuning behavior |
| `tools` | Capabilities the agent can call directly |
| `handoffDescription` (TS) / `handoff_description` (Python) | Hints another agent when to delegate here |
| `handoffs` | Delegating to another agent |
| `outputType` (TS) / `output_type` (Python) | Returning structured output instead of plain text (e.g. Zod schema / Pydantic `BaseModel`) |
| Guardrails and approvals | Validation, blocking, and review flows |
| MCP servers / hosted MCP tools | Attaching MCP-backed capabilities |

### Structured output example

```typescript
import { Agent, run } from "@openai/agents";
import { z } from "zod";

const calendarEvent = z.object({
  name: z.string(),
  date: z.string(),
  participants: z.array(z.string()),
});

const agent = new Agent({
  name: "Calendar extractor",
  instructions: "Extract calendar events from text.",
  outputType: calendarEvent,
});
```

```python
from pydantic import BaseModel
from agents import Agent

class CalendarEvent(BaseModel):
    name: str
    date: str
    participants: list[str]

agent = Agent(
    name="Calendar extractor",
    instructions="Extract calendar events from text.",
    output_type=CalendarEvent,
)
```

### Local context vs. conversation history

The SDK lets you pass application state and dependencies into a run without sending them to the model (e.g. authenticated user info, database clients, loggers). Boundary:

- Conversation history is what the model sees.
- Run context is what your code sees (accessed via `RunContext` in TS / `RunContextWrapper` in Python inside tools).

If the model needs a fact, put it in instructions, input, retrieval, or a tool. If only your runtime needs it, keep it in local context.

```typescript
import { Agent, run, tool, type RunContext } from "@openai/agents";
import { z } from "zod";

const fetchUserAge = tool({
  name: "fetch_user_age",
  description: "Return the age of the current user.",
  parameters: z.object({}),
  async execute(
    _args: unknown,
    runContext: RunContext<{ name: string; uid: number }> | undefined
  ) {
    return `User ${runContext?.context.name} is 47 years old`;
  },
});

const agent = new Agent({
  name: "Assistant",
  tools: [fetchUserAge],
});

const result = await run(agent, "What is the age of the user?", {
  context: { name: "John", uid: 123 },
});

console.log(result.finalOutput);
```

```python
import asyncio
from dataclasses import dataclass

from agents import Agent, RunContextWrapper, Runner, function_tool


@dataclass
class UserInfo:
    name: str
    uid: int


@function_tool
async def fetch_user_age(wrapper: RunContextWrapper[UserInfo]) -> str:
    """Fetch the age of the current user."""
    return f"The user {wrapper.context.name} is 47 years old."


agent = Agent[UserInfo](
    name="Assistant",
    tools=[fetch_user_age],
)


async def main() -> None:
    result = await Runner.run(
        agent,
        "What is the age of the user?",
        context=UserInfo(name="John", uid=123),
    )
    print(result.final_output)


if __name__ == "__main__":
    asyncio.run(main())
```

### When to split one agent into several

Split when a specialist needs a different tool/MCP surface, a different approval policy or guardrail, a different model or output style, or when explicit routing in traces is preferred over a single large prompt.

## Notes

- Source: https://developers.openai.com/api/docs/guides/agents/define-agents (fetched 2026-11-14).
- Start with static `instructions`; switch to a dynamic instructions callback when guidance depends on the current user, tenant, or runtime context. Keep `handoffDescription` / `handoff_description` short and concrete so routing agents know when to pick the specialist. Use `prompt` to reference a stored prompt configuration from the Responses API instead of embedding the whole system prompt in code.
- Start with the smallest single agent that owns a clear task; add agents only when ownership, instructions, tools, or approval policy genuinely diverge.
- Handoff/orchestration mechanics belong to this skill's `orchestration` scope; tool semantics belong to `tools`.
- This is the official OpenAI `Agent` class (developers.openai.com), distinct from the third-party `hermes-agent` CLI.

## Related

- [Models and providers](./models-and-providers.md)
- [Running agents](./running-agents.md)
- [Results and state](./results-and-state.md)
