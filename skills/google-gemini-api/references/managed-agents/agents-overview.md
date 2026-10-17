---
source: https://ai.google.dev/gemini-api/docs/agents
---

# Agents overview

Managed agents on the Gemini API give you a configurable agent harness. A single API call provisions a Linux sandbox where the agent reasons, executes code, manages files, and browses the web autonomously.

## Signature / Usage

Pricing, limits and the available agents are listed on this page. A minimal call (from the quickstart page of the same guide) names an `agent` and requests a fresh sandbox with `environment="remote"`:

```python
from google import genai

client = genai.Client()

interaction = client.interactions.create(
    agent="antigravity-preview-09-2026",
    input="Write a Python script that generates the first 20 Fibonacci numbers and saves them to fibonacci.txt. Then read the file and print its contents.",
    environment="remote",
)
print(f"Output: {interaction.output_text}")
```

## Options / Props

Available managed agents:

| Agent | Description |
|-------|-------------|
| Antigravity agent | General-purpose managed agent built with Gemini 3.8 Flash. Runs code, manages files, and searches the web inside a secure Linux sandbox hosted by Google. The underlying model (such as Gemini 3.6 Flash or Gemini 3.5 Flash-Lite) is configurable via `agent_config`; extend it with your own instructions, skills, and data to build a custom agent |
| Deep Research | Autonomous research agent that plans, executes, and synthesizes multi-step research tasks (market analysis, due diligence, literature reviews) |

Limits:

| Limit | Description |
|-------|-------------|
| Environment Lifetime | Environments are permanently deleted after 7 days of inactivity |
| VM Spin-down | VMs shut down after a brief period of inactivity. The next request restores the state (with a cold start) |
| Pre-installed Software | Ubuntu-based environment with Python 3.12 and Node.js 22 |
| Max agents | Up to 1,000 managed agents |

## Notes

- Managed agents are in **Public Preview**. Review the agent's actions and outputs before relying on them in sensitive workflows.
- Every agent runs in a sandbox isolated at the OS level. Outbound network access is unrestricted by default; restrict or disable it with a `network` allowlist (see `environments.md`).
- Store secrets as managed credentials and reference them by ID so the egress proxy injects them at request time and they are never exposed inside the sandbox (see `credentials.md`). Use least-privilege service accounts or API keys, prefer short-lived tokens, rotate credentials on a schedule.
- Always verify outputs (generated code, data transformations, configuration changes) before deploying them.
- Pricing: pay-as-you-go based on Gemini model tokens and tool usage. A single interaction can trigger multiple reasoning loops, typically consuming 100k to 3M tokens. Environment compute is **not billed** during the preview. Also available on the free tier with a free rate limit and usage quota.
- Other ways to build agents with Gemini listed on the page: LangChain / LangGraph, LlamaIndex, CrewAI, Vercel AI SDK, Google ADK, Antigravity SDK.
- API surface: Interactions API (`agent` parameter). REST examples in this guide use the `v1beta` path.
- Distinct from other skills: Claude-hosted agents are in anthropic-managed-agents, the self-hosted Claude Agent SDK is in anthropic-agent-sdk, the OpenAI Agents SDK is in openai-agents, and hermes-agent is a separate agent product. These Gemini managed agents run in a Google-hosted Linux sandbox via the Interactions API.
- Docs fetched 2026-10-16.

## Related

- [Managed agents quickstart](./quickstart.md)
- [Antigravity agent](./antigravity-agent.md)
- [Building managed agents](./custom-agents.md)
- [Environments in managed agents](./environments.md)
- [Credentials in managed agents](./credentials.md)
- [Gemini Deep Research agent](./deep-research.md)
