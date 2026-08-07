# Multi-Agent Orchestration with Handoffs

Delegate a conversation branch from a triage Agent to a specialist Agent using handoffs.

```python
from agents import Agent, handoff

billing_agent = Agent(name="Billing agent")
refund_agent = Agent(name="Refund agent")

triage_agent = Agent(
    name="Triage agent",
    handoffs=[billing_agent, handoff(refund_agent)],
)
```

## Notes

- Handoffs transfer control of the conversation to the target Agent, unlike a tool call which returns a result to the calling Agent.
- An Agent can be passed directly in `handoffs` (default configuration) or wrapped with `handoff()` for custom options (e.g. input filters, `on_handoff` callbacks).
- Use handoffs when a specialist should own the rest of that branch of work, not just perform a single lookup.
- This is OpenAI's own Agents SDK multi-agent pattern — unrelated to Nous Research's hermes-agent.
