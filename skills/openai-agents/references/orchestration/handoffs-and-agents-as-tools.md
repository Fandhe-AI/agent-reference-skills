# Handoffs and Agents as Tools

Two orchestration patterns for multi-agent workflows: handoffs transfer full ownership of a conversation to a specialist agent, while agents-as-tools keep a manager agent in charge and call specialists as bounded helpers.

## Signature / Usage

```typescript
import { Agent, handoff } from "@openai/agents";

const billingAgent = new Agent({ name: "Billing agent" });
const refundAgent = new Agent({ name: "Refund agent" });

const triageAgent = Agent.create({
  name: "Triage agent",
  handoffs: [billingAgent, handoff(refundAgent)],
});
```

```python
from agents import Agent, handoff

billing_agent = Agent(name="Billing agent")
refund_agent = Agent(name="Refund agent")

triage_agent = Agent(
    name="Triage agent",
    handoffs=[billing_agent, handoff(refund_agent)],
)
```

Agents as tools, when the manager should synthesize the final answer instead of transferring ownership:

```typescript
import { Agent } from "@openai/agents";

const summarizer = new Agent({
  name: "Summarizer",
  instructions: "Generate a concise summary of the supplied text.",
});

const mainAgent = new Agent({
  name: "Research assistant",
  tools: [
    summarizer.asTool({
      toolName: "summarize_text",
      toolDescription: "Generate a concise summary of the supplied text.",
    }),
  ],
});
```

```python
from agents import Agent

summarizer = Agent(
    name="Summarizer",
    instructions="Generate a concise summary of the supplied text.",
)

main_agent = Agent(
    name="Research assistant",
    tools=[
        summarizer.as_tool(
            tool_name="summarize_text",
            tool_description="Generate a concise summary of the supplied text.",
        )
    ],
)
```

## Notes

- Choose handoffs when "a specialist should take over the conversation for that branch of the work". Choose agents-as-tools when "the main agent should stay responsible for the final answer".
- Start with a single agent. Add specialists only when they materially improve capability isolation, policy isolation, prompt clarity, or trace legibility.
- Keep the routing surface legible: give each specialist a narrow job, and keep `handoffDescription` (TypeScript) / `handoff_description` (Python) short and concrete.
- Agents-as-tools fits better when the manager should synthesize the final answer, the specialist does a bounded task like summarization or classification, or you want one stable outer workflow with nested specialist calls instead of ownership transfer.
- Core `Agent` / `Runner` API is covered by the agents-sdk scope; this page covers orchestration decisions only.

## Related

- [Multi-agent orchestration](./multi-agent.md)
- [Guardrails and human review](./guardrails-and-human-review.md)
