# Single Agent with a Function Tool

Define one Agent and give it a custom Python function as a tool.

```python
import asyncio
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

async def main() -> None:
    result = await Runner.run(
        agent,
        "Tell me something surprising about ancient life on Earth.",
    )
    print(result.final_output)

if __name__ == "__main__":
    asyncio.run(main())
```

## Notes

- `@function_tool` derives the tool schema from the function signature and docstring; keep the docstring short and descriptive.
- The model decides whether to call the tool based on `instructions` and the user input — it is not forced unless `tool_choice` is configured.
- `Runner.run` is async; use `Runner.run_sync` for a synchronous entry point instead.
