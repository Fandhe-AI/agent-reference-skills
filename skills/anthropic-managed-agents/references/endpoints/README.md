# Endpoints

| Name | Description | Path |
|------|-------------|------|
| Agents API | Managed Agents agent resource: reusable agent configurations (model, system prompt, tools, skills, MCP servers). | [agents.md](./agents.md) |
| Deployments API | Bind an agent to environment, credentials, initial events, and optional cron schedule for autonomous runs. | [deployments.md](./deployments.md) |
| Dreams API | Asynchronous memory-consolidation job: read memory store and session transcripts, write consolidated memories. | [dreams.md](./dreams.md) |
| Environments API | Define container configuration (cloud or self-hosted) where sessions run; includes work queue for self-hosted. | [environments.md](./environments.md) |
| Memory Stores API | Named, workspace-scoped containers of hierarchical text memories with immutable version history. | [memory-stores.md](./memory-stores.md) |
| Sessions API | Running instance of an agent: holds conversation state, resources, and thread structure for multiagent. | [sessions.md](./sessions.md) |
| User Profiles API | Represent end-user/company/platform entity for trust and identity purposes in API usage. | [user-profiles.md](./user-profiles.md) |
| Vaults API | Named container for credentials (OAuth, bearer tokens, secrets) accessible to sessions via vault_ids. | [vaults.md](./vaults.md) |
| Webhooks | Lifecycle event notifications for resources; discriminated union over agent, deployment, session, etc. | [webhooks.md](./webhooks.md) |
