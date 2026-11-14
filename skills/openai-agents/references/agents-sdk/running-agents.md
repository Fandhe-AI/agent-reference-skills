# Running Agents

Defining an agent is the setup step; running it is the runtime question. One SDK run is one application-level turn, driven by the agent loop.

## Signature / Usage

### Sessions

```typescript
import { Agent, MemorySession, run } from "@openai/agents";

const agent = new Agent({ name: "Tour guide", instructions: "Answer with compact travel facts." });
const session = new MemorySession();

const firstTurn = await run(agent, "What city is the Golden Gate Bridge in?", { session });
const secondTurn = await run(agent, "What state is it in?", { session });
```

```python
from agents import Agent, Runner, SQLiteSession

agent = Agent(name="Tour guide", instructions="Answer with compact travel facts.")
session = SQLiteSession("conversation_123")

first_turn = await Runner.run(agent, "What city is the Golden Gate Bridge in?", session=session)
second_turn = await Runner.run(agent, "What state is it in?", session=session)
```

### Server-managed state (response ID chaining)

```typescript
import { Agent, run } from "@openai/agents";
import OpenAI from "openai";

const agent = new Agent({
  name: "Assistant",
  instructions: "Reply very concisely.",
});

const client = new OpenAI();
const { id: conversationId } = await client.conversations.create({});

const first = await run(agent, "What city is the Golden Gate Bridge in?", {
  conversationId,
});
console.log(first.finalOutput);

const second = await run(agent, "What state is it in?", {
  conversationId,
});
console.log(second.finalOutput);
```

```python
import asyncio

from agents import Agent, Runner

agent = Agent(
    name="Assistant",
    instructions="Reply very concisely.",
)

async def main() -> None:
    first = await Runner.run(
        agent,
        "What city is the Golden Gate Bridge in?",
    )
    print(first.final_output)

    second = await Runner.run(
        agent,
        "What state is it in?",
        previous_response_id=first.last_response_id,
    )
    print(second.final_output)

if __name__ == "__main__":
    asyncio.run(main())
```

Use `conversationId` when multiple systems should share one named conversation; use `previousResponseId`/`previous_response_id` for the cheapest response-to-response continuation.

### Streaming

```typescript
import { Agent, run } from "@openai/agents";

const agent = new Agent({
  name: "Planet guide",
  instructions: "Answer with short facts.",
});

const stream = await run(agent, "Give me three short facts about Saturn.", {
  stream: true,
});

for await (const event of stream) {
  if (
    event.type === "raw_model_stream_event" &&
    event.data.type === "output_text_delta"
  ) {
    process.stdout.write(event.data.delta);
  }
}

await stream.completed;
console.log("\nFinal:", stream.finalOutput);
```

```python
import asyncio

from openai.types.responses import ResponseTextDeltaEvent

from agents import Agent, Runner

agent = Agent(
    name="Planet guide",
    instructions="Answer with short facts.",
)

async def main() -> None:
    stream = Runner.run_streamed(
        agent,
        "Give me three short facts about Saturn.",
    )

    async for event in stream.stream_events():
        if event.type == "raw_response_event" and isinstance(
            event.data, ResponseTextDeltaEvent
        ):
            print(event.data.delta, end="", flush=True)

    print(f"\nFinal: {stream.final_output}")

if __name__ == "__main__":
    asyncio.run(main())
```

Streaming uses the same agent loop and state strategies; you just consume events while the run is happening.

## Notes

### The agent loop

The runner keeps looping until it reaches a real stopping point:

1. Call the current agent's model with the prepared input.
2. Inspect the model output.
3. If the model produced tool calls, execute them and continue.
4. If the model handed off to another specialist, switch agents and continue.
5. If the model produced a final answer with no more tool work, return a result.

Tools, handoffs, approvals, and streaming all build on top of this loop rather than replacing it.

### Choose one conversation strategy

| Strategy | Where state lives | Best for | What you pass on the next turn |
|---|---|---|---|
| `result.history` (TS) / `result.to_input_list()` (Python) | Your application | Small chat loops, maximum control | The replay-ready history |
| `session` | Your storage + the SDK | Persistent chat state, resumable runs, storage you control | The same session |
| `conversationId` | OpenAI Conversations API | Shared server-managed state across workers/services | The same conversation ID and only the new turn |
| `previousResponseId` (TS) / `previous_response_id` (Python) | OpenAI Responses API | Lightest server-managed continuation | The last response ID and only the new turn |

Pick one strategy per conversation; mixing local replay with server-managed state can duplicate context.

- Source: https://developers.openai.com/api/docs/guides/agents/running-agents (fetched 2026-11-14).
- In the official snippets the TypeScript example uses `conversationId` (created via `client.conversations.create({})`) while the Python example for the same section uses `previous_response_id`.
- Wait for the stream to finish before treating the run as settled.
- If the run pauses for approval, resolve `interruptions` and resume from `state` rather than starting a fresh user turn; if you cancel a stream mid-turn, resume the unfinished turn from `state`.
- Two non-happy-path classes: runtime/validation failures (max-turn limits, guardrail exceptions, tool errors) and expected pauses (human approval requests). Treat approvals as paused runs, not new turns, to keep turn counts and continuation IDs consistent.
- Handoff mechanics and guardrail/approval design live in this skill's `orchestration` scope.

## Related

- [Results and state](./results-and-state.md)
- [Agent definitions](./define-agents.md)
- [Models and providers](./models-and-providers.md)
