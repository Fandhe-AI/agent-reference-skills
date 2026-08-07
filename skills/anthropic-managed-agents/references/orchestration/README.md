# Orchestration

Managed Agents のオーケストレーション（deployments / dreams / webhooks / イベントストリーム）。Claude Code CLI の routines / scheduled tasks は anthropic-claude-code-extend を参照。

| Name | Description | Path |
|------|-------------|------|
| Dreams | Reflect on past sessions to curate agent memory by deduplicating, consolidating, and reorganizing memory stores. | [dreams.md](./dreams.md) |
| Session Event Stream | Send user events to the agent and receive session/span/agent events to track status and stream responses. | [events-and-streaming.md](./events-and-streaming.md) |
| Multiagent orchestration | Coordinate multiple agents within a single session with isolated context and parallel execution. | [multiagent-orchestration.md](./multiagent-orchestration.md) |
| Scheduled deployments | Run agent sessions autonomously on a predictable cadence via cron schedule or manual trigger. | [scheduled-deployments.md](./scheduled-deployments.md) |
| Subscribe to webhooks | Receive notifications of major session/resource state changes without polling. | [webhooks.md](./webhooks.md) |
