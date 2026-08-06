# Orchestration

Multi-agent orchestration and operations: delegation patterns, guardrails, tracing, background mode, human-in-the-loop approvals. Note: `multi-agent.md` documents the OpenAI Responses API's hosted `multi_agent` feature (distinct from the `hermes-agent` skill), and `tracing.md` documents the Agents SDK's run-tracing feature (distinct from the `pino` logging skill).

| Name | Description | Path |
|------|-------------|------|
| Handoffs and agents as tools | Choosing between ownership-transfer handoffs and manager-style agents-as-tools | [handoffs-and-agents-as-tools.md](./handoffs-and-agents-as-tools.md) |
| Multi-agent | Hosted Responses API orchestration: `spawn_agent` / `send_message` / `followup_task` / `wait_agent` / `interrupt_agent` / `list_agents` | [multi-agent.md](./multi-agent.md) |
| Guardrails and human review | Input/output/tool guardrails and approval-gated human review | [guardrails-and-human-review.md](./guardrails-and-human-review.md) |
| Background mode | Long-running tasks via `background: true`, polling, cancellation, resumable streaming | [background-mode.md](./background-mode.md) |
| Tracing | Automatic run tracing (model calls, tool calls, handoffs, guardrails, custom spans) | [tracing.md](./tracing.md) |
