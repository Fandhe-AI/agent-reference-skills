<!-- source: https://platform.claude.com/docs/en/managed-agents/overview / last verified: 2026-08-07 -->

# Claude Managed Agents overview

Pre-built, configurable agent harness that runs in Anthropic-managed infrastructure. Best for long-running, asynchronous agentic tasks — Claude reads files, runs commands, browses the web, and runs code securely without you building your own agent loop, sandbox, or tool execution layer.

## Messages API vs Claude Managed Agents

| | Messages API | Claude Managed Agents |
|---|---|---|
| What it is | Direct model prompting access | Pre-built, configurable agent harness running in managed infrastructure |
| Best for | Custom agent loops and fine-grained control | Long-running tasks and asynchronous work |

## Core concepts

| Concept | Description |
|---------|-------------|
| Agent | The model, system prompt, tools, MCP servers, and skills |
| Environment | Configuration for where sessions run: an Anthropic-managed cloud sandbox, or a self-hosted sandbox on your own infrastructure |
| Session | A running agent instance within an environment, performing a specific task and generating outputs |
| Events | Messages exchanged between your application and the agent (user turns, tool results, status updates) |

## How it works

1. **Create an agent** — define model, system prompt, tools, MCP servers, and skills; reference it by ID across sessions.
2. **Create an environment** — configure where the agent runs (cloud sandbox or self-hosted sandbox).
3. **Start a session** — launch a session that references your agent and environment configuration.
4. **Send events and stream responses** — send user messages as events; Claude autonomously runs tools and streams results back over SSE. Event history is persisted server-side and can be fetched in full.
5. **Steer or interrupt** — send additional user events to guide the agent mid-execution, or interrupt it to change direction.

## When to use Claude Managed Agents

- Long-running execution: tasks that run for minutes or hours with multiple tool calls
- Cloud infrastructure: secure sandboxes with pre-installed packages and network access
- Self-hosted execution: sandboxes on infrastructure you control for compliance or data-residency requirements
- Minimal infrastructure: no need to build your own agent loop, sandbox, or tool execution layer
- Stateful sessions: persistent filesystems and conversation history across multiple interactions
- Scheduled execution: recurring agent runs on a cron schedule through scheduled deployments

## Supported tools

- Bash: run shell commands in the sandbox
- File operations: read, write, edit, glob, and grep files in the sandbox
- Web search and fetch: search the web and retrieve content from URLs
- MCP servers: connect to external tool providers

## Beta access

Claude Managed Agents is in beta. All Managed Agents endpoints require the `managed-agents-2026-04-01` beta header (SDKs set it automatically). To get started you need a Claude API key and access to Claude Managed Agents (enabled by default for all API accounts). MCP tunnels and dreaming are in a more limited research preview and require requesting access separately.

## Notes

- Claude Managed Agents is stateful by design (persisted conversation history, sandbox state, and outputs server-side), so it is not currently eligible for Zero Data Retention (ZDR) or HIPAA BAA coverage.
- Also available on Claude Platform on AWS, with some differences in feature availability and session behavior.
- For direct Messages API calls, see anthropic-api-core. For the self-hosted Claude Agent SDK, see anthropic-agent-sdk.

## Related

- [Get started with Claude Managed Agents](./quickstart.md)
- [Define your agent](./agent-setup.md)
- [Migration](./migration.md)
