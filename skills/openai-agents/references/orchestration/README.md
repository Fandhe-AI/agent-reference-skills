# Orchestration

| Name | Description | Path |
|------|-------------|------|
| Background Mode | Runs long-running tasks on the Responses API asynchronously so requests are not bound by client-side timeouts; applications poll (or stream) the response object for status until it reaches a terminal state. | [background-mode.md](./background-mode.md) |
| Guardrails and Human Review | Guardrails perform automatic validation checks on inputs, outputs, or tool behavior; human review creates interruption points where explicit approval is required before a sensitive action runs. | [guardrails-and-human-review.md](./guardrails-and-human-review.md) |
| Handoffs and Agents as Tools | Two orchestration patterns for multi-agent workflows: handoffs transfer full ownership of a conversation to a specialist agent, while agents-as-tools keep a manager agent in charge and call specialists as bounded helpers. | [handoffs-and-agents-as-tools.md](./handoffs-and-agents-as-tools.md) |
| Multi-agent (Responses API) | Hosted orchestration mode where a root agent spawns and coordinates subagents working in parallel, using six hosted orchestration actions on the Responses API. | [multi-agent.md](./multi-agent.md) |
| Tracing | Server-side SDK tracing that automatically records a structured trace of model calls, tool calls, handoffs, guardrails, and custom spans for a workflow run, viewable in the Traces dashboard. | [tracing.md](./tracing.md) |
