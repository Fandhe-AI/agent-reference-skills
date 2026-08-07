# Agents SDK Overview

Agents are applications that plan, call tools, collaborate across specialists, and keep enough state to complete multi-step work. This page is the entry point into the OpenAI Agents SDK docs and explains when to choose the SDK over the raw Responses API.

## Signature / Usage

```bash
# TypeScript SDK
npm install @openai/agents

# Python SDK
pip install openai-agents
```

- TypeScript SDK repository: https://github.com/openai/openai-agents-js
- Python SDK repository: https://github.com/openai/openai-agents-python

## Agents SDK vs. Responses API

| | Responses API | Agents SDK |
|---|---|---|
| Best for | Custom model-powered features and workflows | Bounded conversational/transactional workflows with recurring orchestration |
| Core abstraction | A model response | An agent run |
| Tools | Platform tools, function calling, remote MCP | Platform tools on reusable agents, tool wrappers, local MCP, agents-as-tools |
| Workflow orchestration | You manage custom loops and branching | The SDK provides the agent loop and lifecycle |
| Multi-agent workflows | Build routing/delegation yourself | Built-in agents-as-tools and handoffs |
| State | Manual history, response chaining, Conversations API | Same options, plus SDK sessions and resumable run state |
| Safety and approvals | Tool-specific approvals; build broader controls yourself | Input/output/tool guardrails plus resumable approval flows |
| Debugging and tracing | Response objects and API logs | Built-in traces across model calls, tools, agents, guardrails, handoffs |

Choose the Responses API when you want direct control over model interactions, output items, tools, state, and orchestration. Choose the Agents SDK when different specialists need different instructions/tools/policies and you want the SDK to run the loop, sessions, tracing, guardrails, and resumable approval flows.

## Reading order

1. [Quickstart](./quickstart.md) — install and run one working agent
2. [Agent definitions](./define-agents.md) and [Models and providers](./models-and-providers.md) — shape one specialist
3. Running agents, orchestration/handoffs, guardrails (orchestration/tools scope) — as the workflow grows
4. [Results and state](./results-and-state.md) — when application logic depends on the run object

## Notes

- This is the official OpenAI Agents SDK (developers.openai.com), unrelated to Nous Research's `hermes-agent` (a third-party AI CLI). Do not confuse the `Agent` class here with that project.
- Built-in tools (web search, file search, computer use, code interpreter, MCP) are covered by the `tools` and `mcp` scopes of this skill, not here.
- Multi-agent orchestration (handoffs, agents-as-tools), guardrails, human review, and tracing are covered by the `orchestration` scope.

## Related

- [Quickstart](./quickstart.md)
- [Agent definitions](./define-agents.md)
- [Models and providers](./models-and-providers.md)
- [Running agents](./running-agents.md)
- [Results and state](./results-and-state.md)
