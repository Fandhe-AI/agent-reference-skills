---
source: https://docs.cloud.google.com/gemini-enterprise-agent-platform/agents
---

# Agent Platform agents overview

Gemini Enterprise Agent Platform ("Agent Platform") is an end-to-end environment for building, deploying and managing AI agents: low-code and code-first development tools, a managed runtime, and integrated security, governance and observability services.

## Signature / Usage

### Code-first agent with ADK (snippet)

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

- Development paths:
  - Agent Studio (Low-code): Collaborative visual workspace for discovering models, engineering prompts and building agents without writing code. Ideal for rapid prototyping and business-centric agents.
  - Managed Agents API on Agent Platform (Managed code): Config-driven, REST-first API for autonomous agents inside a fully managed sandbox environment. The **Agents API** creates and manages agent configurations and sandbox environments with mounted sources (skills, artifacts); the **Interactions API** talks to deployed agents at runtime.
  - Agent Development Kit (ADK) (Custom code): Framework for complex multi-agent orchestrations with granular control over logic, tools and environment simulation.
- Platform pillars:
  - Build: Agent Studio, Agent Garden (prebuilt agent samples), CodeMender (autonomous code security agent), Gemini Deep Research Agent, ADK, Model Garden (over 200 foundation models from Google, partners and open source communities).
  - Scale: Agent Runtime (fully managed runtime for agents built with ADK or other tools), Sessions (history of one conversation), Memory Bank (long-term, cross-session memory).
  - Govern: AI application (App Hub application that groups agent services), Agent Registry (queryable store of your own, Google and third-party agents and MCP servers), Agent Identity (unique SPIFFE-formatted ID per agent, supported in IAM), Agent Gateway (fully managed networking component and runtime enforcement point with Model Armor inspection), Application Design Center templates ("Simple Agent Platform", "Agent Platform with governance").
  - Optimize: Cloud Observability (Cloud Trace, Cloud Logging, Cloud Monitoring, Topology; OpenTelemetry; collected by default when you deploy using ADK), Gen AI evaluation service (online evaluations of agent quality using Auto SxS).
- Admin surfaces:
  - Agent Platform: Agent Registry, Agent Gateway management, policy enforcement (IAM and Model Armor policies), observability, identity (agent service accounts and permissions), security (Security Command Center threat detection), audit logging.
  - Gemini Enterprise Admin: Licenses and users, instances and data connectors, attach to Agent Gateway, add agents and tools from the Agent and Tool Registry (also existing BYO-MCP and A2A paths), agent permissions, observability for Gemini Enterprise agents.
  - Google Workspace Admin Console: Enable or disable Gemini Enterprise for Workspace users, user permissions for agents, Workspace domain policies on agent data access, Workspace audit logging for agent interactions.
- Snippet taken from https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/quickstart-adk (the overview page itself has no code block); `get_exchange_rate` is the tool defined in [quickstart-adk.md](./quickstart-adk.md).
- This is Google's Agent Development Kit and Agent Runtime, not Claude Code, the Claude Agent SDK or the OpenAI Agents SDK.
- Common use cases listed: customer support, information discovery across internal systems, business operations, sales and marketing, software development.
- Vertex AI is now Agent Platform; Vertex AI Agent Engine is now Agent Runtime.
- Source: https://docs.cloud.google.com/gemini-enterprise-agent-platform/agents (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [adk.md](./adk.md)
- [runtime.md](./runtime.md)
- [quickstart-adk.md](./quickstart-adk.md)
