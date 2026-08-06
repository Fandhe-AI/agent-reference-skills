# Guardrails and Human Review

Guardrails perform automatic validation checks on inputs, outputs, or tool behavior; human review creates interruption points where explicit approval is required before a sensitive action runs.

## Signature / Usage

Input guardrail:

```typescript
import { Agent, InputGuardrailTripwireTriggered, run } from "@openai/agents";
import { z } from "zod";

const guardrailAgent = new Agent({
  name: "Homework check",
  instructions: "Detect whether the user is asking for math homework help.",
  outputType: z.object({
    isMathHomework: z.boolean(),
    reasoning: z.string(),
  }),
});

const agent = new Agent({
  name: "Customer support",
  instructions: "Help customers with support questions.",
  inputGuardrails: [
    {
      name: "Math homework guardrail",
      runInParallel: false,
      async execute({ input, context }) {
        const result = await run(guardrailAgent, input, { context });
        return {
          outputInfo: result.finalOutput,
          tripwireTriggered: result.finalOutput?.isMathHomework === true,
        };
      },
    },
  ],
});

try {
  await run(agent, "Can you solve 2x + 3 = 11 for me?");
} catch (error) {
  if (error instanceof InputGuardrailTripwireTriggered) {
    console.log("Guardrail blocked the request.");
  }
}
```

```python
from agents import (
    Agent,
    GuardrailFunctionOutput,
    InputGuardrailTripwireTriggered,
    RunContextWrapper,
    Runner,
    TResponseInputItem,
    input_guardrail,
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
```

Human review / approvals:

```typescript
import { Agent, run, tool } from "@openai/agents";
import { z } from "zod";

const cancelOrder = tool({
  name: "cancel_order",
  description: "Cancel a customer order.",
  parameters: z.object({ orderId: z.number() }),
  needsApproval: true,
  async execute({ orderId }) {
    return `Cancelled order ${orderId}`;
  },
});

const agent = new Agent({
  name: "Support agent",
  instructions: "Handle support requests and ask for approval when needed.",
  tools: [cancelOrder],
});

let result = await run(agent, "Cancel order 123.");

if (result.interruptions?.length) {
  const state = result.state;
  for (const interruption of result.interruptions) {
    state.approve(interruption);
  }
  result = await run(agent, state);
}
```

```python
from agents import Agent, Runner, function_tool


@function_tool(needs_approval=True)
async def cancel_order(order_id: int) -> str:
    return f"Cancelled order {order_id}"


agent = Agent(
    name="Support agent",
    instructions="Handle support requests and ask for approval when needed.",
    tools=[cancel_order],
)

result = await Runner.run(agent, "Cancel order 123.")

if result.interruptions:
    state = result.to_state()
    for interruption in result.interruptions:
        state.approve(interruption)
    result = await Runner.run(agent, state)
```

## Options / Props

| Use case | Start with |
|----------|-----------|
| Block disallowed user requests before the main model runs | Input guardrails |
| Validate or redact the final output before it leaves the system | Output guardrails |
| Check arguments or results around a function tool call | Tool guardrails |
| Pause before side effects like cancellations, edits, shell commands, or sensitive MCP actions | Human-in-the-loop approvals |

## Notes

- Use input guardrails when you want a fast validation step to run before the expensive or side-effecting part of the workflow starts.
- Approval lifecycle: (1) the run records an approval interruption instead of executing the tool; (2) the result returns `interruptions` plus a resumable `state`; (3) the application approves or rejects the pending items; (4) the run resumes from `state` instead of starting a new user turn.
- Agent-level guardrails don't run everywhere: input checks only apply to the first agent, output checks only to the final agent, and tool checks only to attached functions. For manager-style workflows with multiple custom tools, put validation directly on the tools creating side effects rather than relying solely on agent-level controls.
- Streaming and delayed review use the same state model as the synchronous flow above.

## Related

- [Handoffs and agents as tools](./handoffs-and-agents-as-tools.md)
- [Tracing](./tracing.md)
