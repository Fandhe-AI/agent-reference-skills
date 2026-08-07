<!-- source: https://platform.claude.com/docs/en/managed-agents/quickstart / last verified: 2026-08-07 -->

# Create Agent and Start Session

Create an agent, provision a cloud environment, start a session, and stream the agent's response for a single task.

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

## Notes

- The `agent_toolset_20260401` tool type enables the full set of pre-built agent tools (bash, file operations, web search, and more).
- Open the event stream before sending the user message to avoid a race condition where early events are missed.
- The session flow is: provision sandbox → run agent loop → run tools inside the sandbox → stream events → go idle (`session.status_idle`) when nothing more to do.
- Managed Agents API requests require the `managed-agents-2026-04-01` beta header (SDKs set it automatically).
- Example from the Claude API (platform.claude.com) `managed-agents/quickstart` page.
