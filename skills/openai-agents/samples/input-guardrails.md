# Input Guardrails

Run a lightweight checker Agent before the main Agent processes a request, and abort the run if a tripwire condition is met.

```python
import asyncio
from pydantic import BaseModel
from agents import (
    Agent,
    GuardrailFunctionOutput,
    InputGuardrailTripwireTriggered,
    RunContextWrapper,
    Runner,
    TResponseInputItem,
    input_guardrail,
)

class MathHomeworkOutput(BaseModel):
    is_math_homework: bool
    reasoning: str

guardrail_agent = Agent(
    name="Homework check",
    instructions="Detect whether the user is asking for math homework help.",
    output_type=MathHomeworkOutput,
)

# Validate input before starting the support agent.
@input_guardrail(run_in_parallel=False)
async def math_guardrail(
    ctx: RunContextWrapper[None],
    agent: Agent,
    input: str | list[TResponseInputItem],
) -> GuardrailFunctionOutput:
    result = await Runner.run(guardrail_agent, input, context=ctx.context)
    return GuardrailFunctionOutput(
        output_info=result.final_output,
        tripwire_triggered=result.final_output.is_math_homework,
    )

agent = Agent(
    name="Customer support",
    instructions="Help customers with support questions.",
    input_guardrails=[math_guardrail],
)

async def main() -> None:
    try:
        await Runner.run(agent, "Can you solve 2x + 3 = 11 for me?")
    except InputGuardrailTripwireTriggered:
        print("Guardrail blocked the request.")

if __name__ == "__main__":
    asyncio.run(main())
```

## Notes

- A guardrail is itself backed by an Agent with a structured `output_type`, so its verdict can be checked programmatically.
- `tripwire_triggered=True` raises `InputGuardrailTripwireTriggered` and stops the main Agent from running.
- The same pattern applies to `output_guardrails` for checking the main Agent's final output before it is returned.
- `run_in_parallel=False` (TypeScript: `runInParallel: false`) makes the guardrail blocking: it finishes before the main agent starts. Use it when the cost or risk of starting the main agent is too high; use parallel guardrails when lower latency matters more than avoiding speculative work. Keep the checker Agent fast and cheap.
- Input guardrails run only for the first agent in the chain.
