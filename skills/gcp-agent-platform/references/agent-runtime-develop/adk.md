---
source: https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/adk
---

# Agent Development Kit (ADK) overview

ADK is an open-source agent development framework for building, debugging and deploying AI agents at enterprise scale, from simple assistants to multi-agent systems. It offers workflow agents for predictable pipelines, agent-coordinated dynamic routing, multi-agent composition, a tool ecosystem, and built-in and partner evaluation tools for testing execution trajectories.

## Signature / Usage

### Minimal ADK agent (snippet)

`get_exchange_rate` is the tool function defined in the Develop the agent step of [quickstart-adk.md](./quickstart-adk.md); the official quickstart defines it in a separate block before this one.

```python
from google.adk.agents import Agent
from vertexai import agent_engines

agent = Agent(
    model="gemini-3.5-flash",
    name='currency_exchange_agent',
    tools=[get_exchange_rate],
)

app = agent_engines.AdkApp(agent=agent)
```

## Notes

- Languages: Python, TypeScript, Go, Java
- Run targets: Local, Agent Runtime, Cloud Run, Google Kubernetes Engine
- Start building: Get started (https://adk.dev/get-started/), Tools and integrations (https://adk.dev/integrations/), Technical overview (https://adk.dev/get-started/about/)
- Snippet taken from https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/quickstart-adk (the ADK overview has no code block); `get_exchange_rate` is defined in [quickstart-adk.md](./quickstart-adk.md).
- The source shows no further detail; ADK documentation itself lives at adk.dev.
- Source: https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/adk (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [agents.md](./agents.md)
- [create-an-adk-agent.md](./create-an-adk-agent.md)
- [quickstart-adk.md](./quickstart-adk.md)
