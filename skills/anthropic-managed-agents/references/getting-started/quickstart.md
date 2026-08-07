<!-- source: https://platform.claude.com/docs/en/managed-agents/quickstart / last verified: 2026-08-07 -->

# Get started with Claude Managed Agents

Create your first autonomous agent: create an agent, set up an environment, start a session, and stream agent responses.

## Prerequisites

- A Claude Console account (platform.claude.com)
- An API key

Install the `ant` CLI (`brew install anthropics/tap/ant`) and an SDK (`pip install anthropic` / `npm install @anthropic-ai/sdk`), then set `ANTHROPIC_API_KEY`.

Managed Agents API requests require the `managed-agents-2026-04-01` beta header, except memory store endpoints, which use `agent-memory-2026-07-22` instead. SDKs set the correct beta header automatically.

## Signature / Usage

```python
from anthropic import Anthropic

client = Anthropic()

# 1. Create an agent
agent = client.beta.agents.create(
    name="Coding Assistant",
    model="claude-opus-5",
    system="You are a helpful coding assistant. Write clean, well-documented code.",
    tools=[{"type": "agent_toolset_20260401"}],
)

# 2. Create an environment (cloud sandbox)
environment = client.beta.environments.create(
    name="quickstart-env",
    config={"type": "cloud", "networking": {"type": "unrestricted"}},
)

# 3. Start a session
session = client.beta.sessions.create(
    agent=agent.id,
    environment_id=environment.id,
    title="Quickstart session",
)

# 4. Open the stream first, then send the user message
with client.beta.sessions.events.stream(session.id) as stream:
    client.beta.sessions.events.send(
        session.id,
        events=[{
            "type": "user.message",
            "content": [{"type": "text", "text": "Create a Python script that generates the first 20 Fibonacci numbers and saves them to fibonacci.txt"}],
        }],
    )
    for event in stream:
        match event.type:
            case "agent.message":
                for block in event.content:
                    print(block.text, end="")
            case "agent.tool_use":
                print(f"\n[Using tool: {event.name}]")
            case "session.status_idle":
                print("\n\nAgent finished.")
                break
```

The `agent_toolset_20260401` tool type enables the full set of pre-built agent tools (bash, file operations, web search, and more).

## What's happening

1. **Provisions a sandbox** — your environment configuration determines how it's built.
2. **Runs the agent loop** — Claude determines which tools to use based on your message.
3. **Runs tools** — file writes, bash commands, and other tool calls run inside the sandbox.
4. **Streams events** — you receive real-time updates as the agent works.
5. **Goes idle** — the agent emits a `session.status_idle` event when it has nothing more to do.

## Notes

- Console's [Prototype in Console](https://platform.claude.com/workspaces/default/agent-quickstart/) provides a visual interface to iterate on model, system prompt, MCP servers, tools, and skills before writing code, and shows the equivalent API request.
- Run `/claude-api managed-agents-onboard` in the latest Claude Code for a guided interactive setup (see onboarding.md).

## Related

- [Prototype in Console](./onboarding.md)
- [Define your agent](./agent-setup.md)
- [Session Event Stream](../orchestration/events-and-streaming.md)
- [Scheduled deployments](../orchestration/scheduled-deployments.md)
