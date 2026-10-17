# automation

| Name | Description | Path |
|------|-------------|------|
| Batch Processing | Run the Hermes agent across hundreds or thousands of prompts in parallel to generate structured trajectories (ShareGPT-format, with tool usage statistics), mainly for training-data generation and evaluation. | [batch-processing.md](./batch-processing.md) |
| Code Execution | The `execute_code` tool lets the agent write Python scripts that call Hermes tools programmatically (programmatic tool calling), collapsing multi-step workflows into one LLM turn. | [code-execution.md](./code-execution.md) |
| Cron Jobs | Schedule tasks to run automatically with natural language or cron expressions. | [cron.md](./cron.md) |
| Delegation | The `delegate_task` tool spawns child AIAgent instances with isolated context, inherited tool access and their own terminal sessions. | [delegation.md](./delegation.md) |
| Persistent Goals | `/goal` gives Hermes a standing objective that survives across turns. | [goals.md](./goals.md) |
| Session Heartbeats | `/heartbeat` gives the current session one recurring instruction. | [heartbeat.md](./heartbeat.md) |
| Hooks | Hermes has four hook systems that run custom code at lifecycle points: gateway hooks, plugin hooks, shell hooks and outbound webhooks. | [hooks.md](./hooks.md) |
| Kanban Multi-Gateway Deployment | Hermes supports several gateway processes running concurrently, one per profile (default, writer, admin, coder, researcher). | [kanban-multi-gateway.md](./kanban-multi-gateway.md) |
| Kanban Tutorial | A walkthrough of the four use-cases the Hermes Kanban system was designed for, with the dashboard open. | [kanban-tutorial.md](./kanban-tutorial.md) |
| Kanban worker lanes | A worker lane is a class of process the kanban dispatcher can route tasks to: an identity (the assignee string), a spawn mechanism, and a lifecycle-termination contract. | [kanban-worker-lanes.md](./kanban-worker-lanes.md) |
| Kanban Multi-Agent | Hermes Kanban is a durable, SQLite-backed task board shared across all Hermes profiles (`~/.hermes/kanban.db`). | [kanban.md](./kanban.md) |
| Recurring Loops | `/loop` re-runs a prompt (or a slash command) on a recurring cadence inside the current session. | [loops.md](./loops.md) |
