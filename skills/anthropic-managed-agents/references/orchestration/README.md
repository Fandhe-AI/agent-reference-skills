# Orchestration

| Name | Description | Path |
|------|-------------|------|
| Dreams | Dreaming is a research preview feature (request access separately) that lets Claude reflect on past sessions to curate an agent's memory. | [dreams.md](./dreams.md) |
| Preview responses with event deltas | Event deltas render the agent's response text incrementally as a live preview while the model is still generating it. | [event-deltas.md](./event-deltas.md) |
| Session Event Stream | Communication with Claude Managed Agents is event-based: you send user events to the agent, and receive session/span/agent events back to track status. | [events-and-streaming.md](./events-and-streaming.md) |
| Multiagent orchestration | Coordinate multiple agents within a single session. | [multiagent-orchestration.md](./multiagent-orchestration.md) |
| Scheduled deployments | A scheduled deployment lets an agent start sessions autonomously on a predictable cadence. | [scheduled-deployments.md](./scheduled-deployments.md) |
| Session threads | In a multiagent session, each agent works in its own **session thread**. | [session-threads.md](./session-threads.md) |
| Subscribe to webhooks | Get notified of major session/resource state changes without polling. | [webhooks.md](./webhooks.md) |
| Workflow runs | A **workflow** is a program an agent writes to run many agents and combine what they return; a **workflow run** is one execution of it. | [workflow-runs.md](./workflow-runs.md) |
