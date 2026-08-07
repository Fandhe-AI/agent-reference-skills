<!-- source: https://platform.claude.com/docs/en/managed-agents/onboarding / last verified: 2026-08-07 -->

# Prototype in Console

Create and test agents visually in Console (platform.claude.com) without writing API calls, then promote a working configuration to code.

## How to build an agent

The [visual interface](https://platform.claude.com/workspaces/default/agent-quickstart/) walks through each field of an agent definition:

- **Model and system prompt** — pick a model and write the system prompt in a full-width editor.
- **MCP servers** — add remote MCP servers by URL and authenticate your agent to act on your behalf.
- **Tools** — extend capabilities using a pre-built agent toolset and MCP tools.
- **Skills** — attach Anthropic or custom skills from your organization's library.

As you configure, Console shows the equivalent API request so you can copy it into your code once satisfied.

## Testing an agent

Console includes an inline session runner: after configuring your agent, start a test session directly, send messages, and watch the event stream without leaving the page.

## From prototype to code

Once your agent works as expected, copy the agent ID and environment ID from Console and reference them when creating sessions:

## Signature / Usage

```python
session = client.beta.sessions.create(
    agent="agent_01J8XkN5uT3vHpLqRfWdY2",
    environment_id="env_01K2mPsT7hNwR4jXuLvCqD8",
    title="My first session",
)
```

## Notes

- Managed Agents API requests require the `managed-agents-2026-04-01` beta header, except memory store endpoints, which use `agent-memory-2026-07-22` instead. SDKs set the correct beta header automatically.

## Related

- [Get started with Claude Managed Agents](./quickstart.md)
- [Define your agent](./agent-setup.md)
