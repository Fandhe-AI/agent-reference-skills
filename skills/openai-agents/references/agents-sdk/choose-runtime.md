# Agents: Choose an Agent Runtime

Agents can plan and complete tasks using tools, work with other agents, and maintain context across steps. Choose a runtime based on where you want orchestration to run and who should manage the state between tasks.

## Signature / Usage

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

## Notes

- The Agents API runs the Codex harness and manages the underlying agent infrastructure so you can focus on what your agents do. It includes automatic context compaction, multi-agent orchestration, programmatic tool calling, and support for MCP servers.
- The Agents SDK gives your application control over deployment, storage, approvals, and runtime integration. Its runner handles the agent loop and handoffs.
- Tool design, reusable skills, and prompt caching apply across agent workflows, but their configuration and lifecycle can differ by API. Official starting points: Using tools (`/api/docs/guides/tools`), Programmatic Tool Calling (`/api/docs/guides/tools-programmatic-tool-calling`), Skills (`/api/docs/guides/tools-skills`), Prompt caching (`/api/docs/guides/prompt-caching`), Agents API observability and usage (`/api/docs/guides/agents-api/observability`).
- An Agents API session, an SDK session, a Responses conversation, and a sandbox are different resources. Follow the state and cleanup instructions for the runtime you choose.
- The "Skills" mentioned here are OpenAI API reusable instructions, distinct from Claude Code Agent Skills (SKILL.md).
- Source: https://developers.openai.com/api/docs/guides/agents (fetched 2026-10; the page has no version pin).

## Related

- [Agents SDK Overview](./overview.md)
- [Quickstart](./quickstart.md)
- [Running agents](./running-agents.md)
