# Streaming Agent Output

Stream an Agent's response token by token instead of waiting for the full result.

```python
import asyncio
from openai.types.responses import ResponseTextDeltaEvent
from agents import Agent, Runner

async def main():
    agent = Agent(
        name="Joker",
        instructions="You are a helpful assistant.",
    )

    result = Runner.run_streamed(agent, input="Please tell me 5 jokes.")
    async for event in result.stream_events():
        if event.type == "raw_response_event" and isinstance(event.data, ResponseTextDeltaEvent):
            print(event.data.delta, end="", flush=True)

if __name__ == "__main__":
    asyncio.run(main())
```

## Notes

- `Runner.run_streamed` returns immediately with a streaming result object; iterate `result.stream_events()` to consume events as they arrive.
- `raw_response_event` carries low-level model deltas (e.g. `ResponseTextDeltaEvent`); other event types report higher-level Agent SDK events such as tool calls and handoffs.
- Use this instead of `Runner.run` when the caller needs incremental output (e.g. a chat UI) rather than a single final result.
