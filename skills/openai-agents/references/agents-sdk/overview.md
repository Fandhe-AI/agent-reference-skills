# Agents SDK Overview

Agents can plan and complete tasks using tools, work with other agents, and maintain context across steps. This page is the entry point into the OpenAI Agents SDK docs: where to get the SDK, which guide to read next, and the typical reading order.

## Signature / Usage

```bash
# TypeScript
npm install @openai/agents zod

# Python
pip install openai-agents
```

- TypeScript SDK repository: https://github.com/openai/openai-agents-js
- Python SDK repository: https://github.com/openai/openai-agents-python
- Start with the [Quickstart](./quickstart.md) to install the SDK, define one agent, and run it; then return here to choose the next capability.

### Choose your starting point

| If you want to | Start here | Why |
| --- | --- | --- |
| Build a code-first agent app | Quickstart (`/api/docs/guides/agents/quickstart`) | Shortest path to a working SDK integration. |
| Define one specialist cleanly | Agent definitions (`/api/docs/guides/agents/define-agents`) | Use while still shaping the contract for a single agent. |
| Choose models, defaults, and transport | Models and providers (`/api/docs/guides/agents/models`) | Model choice, provider setup, or transport strategy affects the workflow. |
| Understand the runtime loop and state | Running agents (`/api/docs/guides/agents/running-agents`) | Agent loop, streaming, and continuation strategies. |
| Run work in a container-based environment | Sandbox agents (`/api/docs/guides/agents/sandboxes`) | The agent needs files, commands, packages, snapshots, mounts, or provider links. |
| Design specialist ownership | Orchestration and handoffs (`/api/docs/guides/agents/orchestration`) | More than one agent; decide who owns the reply. |
| Add validation or human review | Guardrails and human review (`/api/docs/guides/agents/guardrails-approvals`) | Block or pause before risky work continues. |
| Understand what a run returns | Results and state (`/api/docs/guides/agents/results`) | Final output, resumable state, and next-turn surfaces. |
| Add hosted tools, function tools, or MCP | Using tools (`/api/docs/guides/tools#usage-in-the-agents-sdk`) and Integrations and observability (`/api/docs/guides/agents/integrations-observability`) | Tool semantics live in the platform tools docs; SDK-specific MCP and tracing live in the integrations page. |
| Inspect and improve runs | Integrations and observability and evaluate agent workflows (`/api/docs/guides/agent-evals`) | Use traces for debugging first, then move into evaluation loops. |
| Build a voice-first workflow | Voice agents (`/api/docs/guides/voice-agents`) | SDK voice pipeline and realtime agent patterns. |

### Reading order

Use the SDK track when your server owns deployment, tool implementations, state storage, and approval decisions, while the SDK runs the agent loop and invokes those tools. It fits when you want typed application code in TypeScript or Python, direct control over tools / MCP servers / runtime behavior, custom storage or server-managed conversation strategies, and tight integration with existing product logic.

1. [Quickstart](./quickstart.md) — get one working run on screen
2. [Agent definitions](./define-agents.md) and [Models and providers](./models-and-providers.md) — shape one specialist cleanly
3. [Running agents](./running-agents.md), orchestration / handoffs, and guardrails and human review — as the workflow grows more complex
4. [Results and state](./results-and-state.md) and integrations and observability — when application logic depends on the run object or deeper visibility into behavior

## Notes

- Source: https://developers.openai.com/api/docs/guides/agents/sdk (fetched 2026-11-14).
- Comparing the Agents SDK, Agents API, and Responses API now lives in the Agents overview (`/api/docs/guides/agents#compare-agent-runtimes`): the Agents SDK runs in your application, while the Agents API runs a managed harness in OpenAI's service. The Agents API is covered by the `agents-api` category of this skill.
- This is the official OpenAI Agents SDK (developers.openai.com), unrelated to Nous Research's `hermes-agent` (a third-party AI CLI). Do not confuse the `Agent` class here with that project.
- Built-in tools (web search, file search, computer use, code interpreter, MCP) are covered by the `tools` and `mcp` categories of this skill, not here. Multi-agent orchestration, guardrails, human review, and tracing are covered by the `orchestration` category.

## Related

- [Quickstart](./quickstart.md)
- [Agent definitions](./define-agents.md)
- [Models and providers](./models-and-providers.md)
- [Running agents](./running-agents.md)
- [Results and state](./results-and-state.md)
