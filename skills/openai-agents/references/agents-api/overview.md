# Agents API

The Agents API gives an application access to the Codex harness through an OpenAI-managed API. OpenAI manages sessions, orchestration, context compaction, and recovery while the application provides tools and chooses its execution environment.

## Signature / Usage

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const session = await client.beta.agents.sessions.create({
  agent: {
    model: "gpt-6-astra",
    instructions:
      "Use the OpenAI documentation MCP and web search to answer technical questions accurately. Delegate independent research tasks to subagents when useful.",
    tools: [
      { type: "programmatic_tool_calling" },
      {
        type: "mcp",
        server_label: "openai_docs",
        transport: {
          type: "http",
          server_url: "https://developers.openai.com/mcp",
        },
      },
      { type: "web_search" },
    ],
    multi_agent: { enabled: true, max_concurrent_subagents: 4 },
  },
  environment: {
    type: "self_hosted",
    workspace_directory: "/workspace",
    capability_directories: ["/workspace/capabilities/skills"],
  },
  input: [
    {
      role: "user",
      content: [
        {
          type: "input_text",
          text: "Research how to connect an MCP server to an OpenAI agent, check for recent updates, and summarize the recommended setup.",
        },
      ],
    },
  ],
});
console.log(session.id);
```

Raw endpoint: `POST https://api.openai.com/v1/agents/sessions` with header `OpenAI-Beta: agents=v1`.

## Notes

- Core concepts: **Agent** (model, instructions, tools, MCP servers), **Environment** (optional sandbox or computer for files, skills, commands), **Session** (durable instance of an agent that works on tasks and responds to input), **Events and items** (inputs sent and output produced during a session).
- Session lifecycle: create a session (OpenAI provisions the environment) -> give it a task -> follow progress (stream or webhooks) -> continue or steer (send another task, or guide the current turn).
- The managed harness supports: running commands and code in a sandbox, applying skills and instructions, connecting to external data through tools or MCP, steering while it works, summarizing previous work to manage the context window, delegating to subagents, and resuming a session.
- Pricing: model usage is billed at the selected model's API rates; OpenAI tools use standard rates; OpenAI-hosted sandboxes use standard container rates.
- Data handling: session state is retained so work can continue across turns; sessions and published artifacts can be deleted. Data residency is supported only in the United States, and Zero Data Retention (ZDR) is not supported. Choosing a self-hosted sandbox does not make the Agents API ZDR-eligible.
- Distinct from the Agents SDK (`@openai/agents` / `openai-agents`) covered in this skill's `agents-sdk` category; the Agents API is the OpenAI-managed `beta.agents` endpoint family.
- Official sample apps (OpenAI Cookbook): incident response agent, Slack bot, data analyst, GitHub issue investigator, document reviewer.
- Source: https://developers.openai.com/api/docs/guides/agents-api/overview (Beta; fetched 2026-10).

### Bedrock Managed Agents

Amazon Bedrock Managed Agents, powered by OpenAI, adapts the Agents API for AWS. The OpenAI agent harness and model inference run in Amazon Bedrock; Amazon Bedrock AgentCore Runtime or self-hosted compute runs commands and tools.

| Area | OpenAI Agents API | Bedrock Managed Agents |
|------|-------------------|------------------------|
| Agent loop | Managed by OpenAI | Hosted in Amazon Bedrock |
| Model inference | OpenAI API | Amazon Bedrock |
| API endpoint | OpenAI API | Amazon Bedrock service endpoint |
| Execution environment | OpenAI-hosted sandbox, self-hosted sandbox, or no sandbox | AgentCore Runtime or self-hosted compute |
| API authentication | OpenAI project API key | AWS IAM credentials with SigV4 signing |

- Choosing a self-hosted sandbox with the OpenAI Agents API changes only where commands and tools run; the managed harness and model inference still use the OpenAI service.
- Shared concepts do not imply identical API contracts or feature availability. Before adapting OpenAI Agents API examples, check AWS guidance for the current Bedrock Managed Agents endpoint, supported models, tools, and environment configuration. Check AWS documentation for access requirements, Regions, permissions, limits, pricing, and data handling.
- The OpenAI docs page carries no code examples. For Responses and other OpenAI platform APIs on Bedrock see the separate OpenAI-on-Amazon-Bedrock guide.
- Source: https://developers.openai.com/api/docs/guides/agents-api/bedrock-managed-agents (fetched 2026-10).

## Related

- [Quickstart](./quickstart.md)
- [Architecture](./architecture.md)
- [Configuring Agents](./configuration.md)
