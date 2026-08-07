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
  model: "gpt-5.6",
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
    model="gpt-5.6",
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

## Structured output example

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

## Local context vs. conversation history

The SDK lets you pass application state and dependencies into a run without sending them to the model (e.g. authenticated user info, database clients, loggers). Boundary:

- Conversation history is what the model sees.
- Run context is what your code sees (accessed via `RunContext` in TS / `RunContextWrapper` in Python inside tools).

```typescript
const agent = new Agent<UserInfo>({ name: "Assistant", tools: [fetchUserAge] });
const result = await run(agent, "What is the age of the user?", {
  context: { name: "John", uid: 123 },
});
```

```python
agent = Agent[UserInfo](name="Assistant", tools=[fetch_user_age])
result = await Runner.run(
    agent,
    "What is the age of the user?",
    context=UserInfo(name="John", uid=123),
)
```

## When to split one agent into several

Split when a specialist needs a different tool/MCP surface, a different approval policy or guardrail, a different model or output style, or when explicit routing in traces is preferred over a single large prompt.

## Notes

- Start with the smallest single agent that owns a clear task; add agents only when ownership, instructions, tools, or approval policy genuinely diverge.
- Handoff/orchestration mechanics belong to this skill's `orchestration` scope; tool semantics belong to `tools`.
- This is the official OpenAI `Agent` class (developers.openai.com), distinct from the third-party `hermes-agent` CLI.

## Related

- [Models and providers](./models-and-providers.md)
- [Running agents](./running-agents.md)
- [Results and state](./results-and-state.md)
