<!-- source: https://platform.claude.com/docs/en/managed-agents/quickstart / last verified: 2026-10-17 -->

# Get started with Claude Managed Agents

Create your first autonomous agent: create an agent, set up an environment, start a session, and stream agent responses.

## Prerequisites

- A Claude Console account (platform.claude.com)
- An API key

Install the `ant` CLI (`brew install anthropics/tap/ant`) and an SDK (`pip install anthropic` / `npm install @anthropic-ai/sdk`), then set `ANTHROPIC_API_KEY`.

### Install the CLI

- Homebrew (macOS): `brew install anthropics/tap/ant`
- Linux/WSL: download the release binary from the `anthropics/anthropic-cli` GitHub releases (the source's example sets `VERSION=1.42.0`, builds `ant_${VERSION}_${OS}_${ARCH}.tar.gz` for `amd64` / `arm64`, and extracts `ant` into `/usr/local/bin`).
- Go (1.25 or later): `go install github.com/anthropics/anthropic-cli/cmd/ant@latest`; the binary is placed in `$(go env GOPATH)/bin`, which must be on `PATH`.
- Check with `ant --version`.

### Install the SDK

`pip install anthropic` (Python) or `npm install @anthropic-ai/sdk` (TypeScript); the source also provides SDKs for Go, Java, C#, Ruby, and PHP.

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

## Limited networking

The source's quickstart creates the environment with `limited` networking and package managers allowed, so code in the sandbox can reach public package registries and code hosts:

```python
environment = client.beta.environments.create(
    name="quickstart-env",
    config={"type": "cloud", "networking": {"type": "limited", "allow_package_managers": True}},
)
```

Web search and web fetch run outside the sandbox, and with `limited` networking the environment's `allowed_hosts` list applies to them too. They return no pages or search results in an environment that lists no hosts, so list the hosts your agent needs in `allowed_hosts`.

## Build a complete app

The source links three quickstarts in `anthropics/claude-quickstarts` (`managed-agents/chat-sdk`, `managed-agents/assistant-ui`, `managed-agents/copilot-kit-ag-ui`). Each pairs Claude Managed Agents with a chat framework (Vercel's Chat SDK, assistant-ui, CopilotKit with the AG-UI adapter): the framework renders the chat surface while a managed session runs the agent loop server-side, holds the transcript, runs tools in a sandbox, and streams events that the front end renders.

## Notes

- The `ant` CLI itself is covered by the `ant` page in the anthropic-models-sdks skill.
- Console's [Prototype in Console](https://platform.claude.com/workspaces/default/agent-quickstart/) provides a visual interface to iterate on model, system prompt, MCP servers, tools, and skills before writing code, and shows the equivalent API request.
- Run `/claude-api managed-agents-onboard` in the latest Claude Code for a guided interactive setup (see onboarding.md).

## Related

- [Prototype in Console](./onboarding.md)
- [Define your agent](./agent-setup.md)
- [Session Event Stream](../orchestration/events-and-streaming.md)
- [Scheduled deployments](../orchestration/scheduled-deployments.md)
