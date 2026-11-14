---
source: https://developers.cloudflare.com/agents/, https://developers.cloudflare.com/agents/concepts/what-are-agents/
---

# What are agents?

An agent is an AI system that autonomously executes tasks by deciding which tools to use and how to proceed. On Cloudflare, each agent is a Durable Object with the Agents SDK Lifecycle installed, plus capabilities, a harness, tools, and communication channels.

## Signature / Usage

Install the Pi harness packages (optional peer dependencies of `agents`):

```sh
npm i agents @earendil-works/pi-durable @earendil-works/pi-ai @earendil-works/chord
```

## Options / Props

The four parts of an agent on Cloudflare:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Runtime | Durable Object + Lifecycle + capabilities | — | Each agent is a Durable Object; routing sends each request to the right one; the Lifecycle starts the capabilities added with `.use()` (`WebSockets`, `State`, `Scheduler`, `MCPClientManager`). |
| Harness | capability | — | Runs the agent loop (calls models, runs tools, handles results, streams, decides whether to continue). Harnesses: Pi, OpenCode, Think. |
| Tools | — | — | Workspace (durable file system and code execution via Cloudflare Computer), web fetch, web search, browser automation, sandboxed code execution, AI Search, MCP servers, payments, Code Mode. |
| Communication channels | — | — | Chat, voice, email, Slack, webhooks; the guides use the `Agent` class preset. |

Agents vs workflows vs co-pilots:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Agents | — | — | Non-linear, non-deterministic (can change from run to run). |
| Workflows | — | — | Linear, deterministic execution paths. |
| Co-pilots | — | — | Augmentative AI assistance requiring human intervention. |

Components of agent systems: decision engine (usually an LLM), tool integration (APIs, functions, services, often via MCP), memory system. The loop: observe, plan, execute, learn.

## Notes

- Platform properties: each agent has a durable identity, local SQL storage (own SQLite database), real-time connections (state changes broadcast over WebSockets), scheduled work, recoverable execution, hibernation when idle, and global edge deployment.
- The Pi harness runs the Pi agent loop durably in a Durable Object and uses the Lifecycle's job queue so a run continues after eviction. The Pi packages are optional peer dependencies of `agents` at `~1.5.0`; Pi Durable is experimental and its API can change in minor releases, so each `agents` release supports one Pi minor version. Examples use Workers AI through the `AI` binding (no API keys).
- The `Agent` class is a preset Durable Object with the Lifecycle and a set of capabilities already installed. Example agents: Pi, chat, Slack, voice, browser, email.
- "Agent" here is the Cloudflare `agents` package; it is not the OpenAI Agents SDK (openai-agents skill) nor the Claude Agent SDK (anthropic-agent-sdk skill). Durable Object concepts: cloudflare-stateful; Workers AI and AI Gateway: cloudflare-ai skill (workers-ai, ai-gateway; https://developers.cloudflare.com/ai-gateway/).

## Related

- [Runtime overview](../runtime/overview.md)
- [Tools](./tools.md)
- [Getting started](./getting-started.md)
- [Limits](./limits.md)
