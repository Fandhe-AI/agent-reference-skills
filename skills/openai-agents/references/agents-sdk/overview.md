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

The official docs now compare three runtimes ("Compare agent runtime options"): the Agents SDK runs inside your application, while the Agents API has OpenAI run a managed Codex harness on its own service.

Choose your starting point:

| You want to | Start here |
| --- | --- |
| Run an agent with the Codex harness managed by OpenAI | Agents API (`/api/docs/guides/agents-api/quickstart`) |
| Control the agent loop in your application with reusable agents, tools, and handoffs | Agents SDK (`/api/docs/guides/agents/quickstart`) |
| Work directly with model responses and control your integration | Responses API (`/api/docs/guides/migrate-to-responses`) |
| Add an embedded chat experience | ChatKit (`/api/docs/guides/chatkit`) |

Compare agent runtime options:

| | Agents API | Agents SDK | Responses API |
| --- | --- | --- | --- |
| Use for | Long-running tasks where OpenAI manages the agent and saves its progress | Building agents with custom tools and workflows in your application | Calling models directly or building an agent from scratch |
| Where the agent runs | OpenAI runs a managed Codex harness | The SDK runs inside your application | Your application, with optional hosted orchestration |
| Agent integration effort | Low | Medium | High |
| State between tasks | Saved session configuration, turns, and items | Your storage and SDK sessions, or Responses conversation state | Manual history, response chaining, or Conversations |
| Tool execution | Service-connected tools, application function handlers, and an optional sandbox | Tools and integrations configured in your application | Hosted tools and tools your application runs |
| Execution environment | OpenAI hosted sandbox, self-hosted sandbox, or no sandbox | Your runtime and sandbox provider integrations | Your own execution environment |
| Start here | Agents API overview (`/api/docs/guides/agents-api/overview`) | Agents SDK overview (`/api/docs/guides/agents/sdk`) | Responses guide (`/api/docs/guides/migrate-to-responses`) |

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
- The two-way "Agents SDK vs. Responses API" table above is moved to the Agents overview (3-way comparison: Agents API / Agents SDK / Responses API) in the current official docs; it is kept here as a quick SDK-vs-Responses contrast.
- The Agents API (OpenAI-managed Codex harness, hosted or self-hosted sandbox) is covered by the `agents-api` category of this skill, not by this SDK page.
- The Agents API runs the Codex harness and manages the underlying agent infrastructure so you can focus on what your agents do. It includes automatic context compaction, multi-agent orchestration, programmatic tool calling, and support for MCP servers.
- The Agents SDK gives your application control over deployment, storage, approvals, and runtime integration. Its runner handles the agent loop and handoffs.
- Tool design, reusable skills, and prompt caching apply across agent workflows, but their configuration and lifecycle can differ by API. Official starting points: Using tools (`/api/docs/guides/tools`), Programmatic Tool Calling (`/api/docs/guides/tools-programmatic-tool-calling`), Skills (`/api/docs/guides/tools-skills`), Prompt caching (`/api/docs/guides/prompt-caching`), Agents API observability and usage (`/api/docs/guides/agents-api/observability`).
- An Agents API session, an SDK session, a Responses conversation, and a sandbox are different resources. Follow the state and cleanup instructions for the runtime you choose.
- The "Skills" mentioned in the runtime comparison are OpenAI API reusable instructions, distinct from Claude Code Agent Skills (SKILL.md).
- Runtime comparison source: https://developers.openai.com/api/docs/guides/agents (fetched 2026-10; the page has no version pin).

## Related

- [Quickstart](./quickstart.md)
- [Agent definitions](./define-agents.md)
- [Models and providers](./models-and-providers.md)
- [Running agents](./running-agents.md)
- [Results and state](./results-and-state.md)
