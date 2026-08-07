# Getting started

Claude Managed Agents（Anthropic ホストのエージェント実行基盤）の入門。Messages API 直接呼び出しは anthropic-api-core、自前ホストの Agent SDK は anthropic-agent-sdk を参照。

| Name | Description | Path |
|------|-------------|------|
| Define your agent | Create a reusable, versioned agent configuration that bundles model, system prompt, tools, MCP servers, and skills. | [agent-setup.md](./agent-setup.md) |
| Define outcomes | Tell the agent what done looks like and let it iterate until it gets there via rubric-based evaluation. | [define-outcomes.md](./define-outcomes.md) |
| Migration | Move existing agents built on the Messages API or Claude Agent SDK to Claude Managed Agents. | [migration.md](./migration.md) |
| Prototype in Console | Create and test agents visually in Console without writing API calls, then promote to code. | [onboarding.md](./onboarding.md) |
| Claude Managed Agents overview | Pre-built, configurable agent harness running in Anthropic-managed infrastructure for long-running async tasks. | [overview.md](./overview.md) |
| Get started with Claude Managed Agents | Create your first autonomous agent: define an agent, set up environment, start session, stream responses. | [quickstart.md](./quickstart.md) |
