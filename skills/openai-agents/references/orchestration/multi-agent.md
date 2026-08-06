# Multi-agent (Responses API)

Hosted orchestration mode where a root agent spawns and coordinates subagents working in parallel, using six hosted orchestration actions on the Responses API.

## Signature / Usage

```typescript
import OpenAI from "openai";

const client = new OpenAI();

const response = await client.beta.responses.create({
  model: "gpt-5.6-sol",
  input:
    "Review the pull-request diff below with three agents: one for " +
    "correctness, one for security, and one for missing tests. " +
    "Reconcile duplicate or conflicting findings, then return a " +
    "prioritized review with file and line references.",
  multi_agent: {
    enabled: true,
    max_concurrent_subagents: 3,
  },
  betas: ["responses_multi_agent=v1"],
});
```

```python
from openai import OpenAI

client = OpenAI()

response = client.beta.responses.create(
    model="gpt-5.6-sol",
    input="Review the pull-request diff with three agents in parallel...",
    multi_agent={
        "enabled": True,
        "max_concurrent_subagents": 3,
    },
    betas=["responses_multi_agent=v1"],
)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `multi_agent.enabled` | boolean | Turns on hosted multi-agent orchestration for the request. |
| `multi_agent.max_concurrent_subagents` | number | Limits simultaneously active subagents across the entire tree (default: 3). No fixed upper bound on total subagents or tree depth. |
| `betas` | string[] | Must include `"responses_multi_agent=v1"` to opt in to the beta. |

## Orchestration actions

| Action | Purpose |
|--------|---------|
| `spawn_agent` | Create a subagent and assign its initial task. |
| `send_message` | Queue a message for an existing agent without starting a new turn. |
| `followup_task` | Assign more work to an existing non-root agent and start or resume its turn. |
| `wait_agent` | Wait for an update in the calling agent's mailbox. |
| `interrupt_agent` | Interrupt another agent's active turn without deleting its context. |
| `list_agents` | Return the current agent tree, statuses, and each agent's `last_task_message`. |

## When to use Multi-agent

| Use Multi-agent when | Prefer one agent when |
|-----------------------|------------------------|
| Work can be split into independent, bounded tasks | Each step depends directly on the previous step |
| Separate context improves focus | The task is small enough to complete in one short run |
| Parallel exploration can reduce wall-clock time | Agents would contend over the same mutable resource |
| Comparing independent findings improves coverage | You require a fixed, deterministic execution graph |

## Notes

- Distinct from the `hermes-agent` skill and from generic "agent" terminology elsewhere in this repository — this page is the OpenAI Responses API's hosted `multi_agent` orchestration feature (`spawn_agent` / `send_message` / `followup_task` / `wait_agent` / `interrupt_agent` / `list_agents`), not a general multi-agent framework.
- Agents are addressed with hierarchical names, e.g. `/root/researcher/tester`.
- WebSocket is recommended for tool-heavy or long-running workflows because the persistent connection reduces latency; with HTTP, the response completes once all active agents finish or pause for a function call, and the application submits tool results in a new request.
- The `/responses/compact` endpoint is not supported when Multi-agent is enabled; `reasoning.summary` and `max_tool_calls` are also unavailable in this mode.
- Function-call results can be injected mid-stream over WebSocket via a `response.inject` event; injection can fail with `response_already_completed` if the response finished before the injection arrived.

## Related

- [Handoffs and agents as tools](./handoffs-and-agents-as-tools.md)
- [Background mode](./background-mode.md)
- [Tracing](./tracing.md)
