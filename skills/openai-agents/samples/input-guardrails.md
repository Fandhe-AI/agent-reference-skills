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

@input_guardrail
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
- Guardrails run concurrently with (or before) the main Agent depending on configuration, so keep the checker Agent fast and cheap.
