---
source: https://ai-sdk.dev/docs/agents/overview
---

# Agents

Agents are **large language models (LLMs)** that use **tools** in a **loop** to accomplish tasks.

## Signature / Usage

```ts
import { ToolLoopAgent, tool } from 'ai';
import { z } from 'zod';

const weatherAgent = new ToolLoopAgent({
  model,
  tools: {
    weather: tool({
      description: 'Get the weather in a location (in Fahrenheit)',
      inputSchema: z.object({
        location: z.string().describe('The location to get the weather for'),
      }),
      execute: async ({ location }) => ({
        location,
        temperature: 72 + Math.floor(Math.random() * 21) - 10,
      }),
    }),
    convertFahrenheitToCelsius: tool({
      description: 'Convert temperature from Fahrenheit to Celsius',
      inputSchema: z.object({
        temperature: z.number().describe('Temperature in Fahrenheit'),
      }),
      execute: async ({ temperature }) => {
        const celsius = Math.round((temperature - 32) * (5 / 9));
        return { celsius };
      },
    }),
  },
});

const result = await weatherAgent.generate({
  prompt: 'What is the weather in San Francisco in celsius?',
});

console.log(result.text); // agent's final answer
console.log(result.steps); // steps taken by the agent
```

The agent automatically:

1. Calls the `weather` tool to get the temperature in Fahrenheit
2. Calls `convertFahrenheitToCelsius` to convert it
3. Generates a final text response with the result

### Components

- **LLMs** process input and decide the next action
- **Tools** extend capabilities beyond text generation (reading files, calling APIs, writing to databases)
- **Loop** orchestrates execution through:
  - **Context management** - Maintaining conversation history and deciding what the model sees (input) at each step
  - **Stopping conditions** - Determining when the loop (task) is complete

### Agent State and Context

Agents often need server-side state that should not be placed directly in the prompt, such as tenant settings, request IDs, feature flags, credentials, or progress through a task.

Use `runtimeContext` as the agent's shared runtime state. It flows through the agent loop, is available in `prepareStep` and lifecycle callbacks, and can be updated between steps. Use `toolsContext` for per-tool values such as API keys or scoped permissions; each tool receives only its own typed `context` based on its `contextSchema`.

### ToolLoopAgent vs core functions

The ToolLoopAgent is the recommended approach for building agents with the AI SDK because it:

- **Reduces boilerplate** - Manages loops and message arrays
- **Improves reusability** - Define once, use throughout your application
- **Simplifies maintenance** - Single place to update agent configuration

For most use cases, start with the ToolLoopAgent. Use core functions (`generateText`, `streamText`) when you need explicit control over each step for complex structured workflows.

### HarnessAgent

Use `HarnessAgent` when you want to run a preconfigured established harness, such as Claude Code, Codex, or Pi, instead of building the loop yourself around a language model. Harnesses are a separate abstraction from providers and models, but stream into AI SDK-compatible result and UI primitives.

### Terminal UI

Use `@ai-sdk/tui` to run a `ToolLoopAgent` in an interactive terminal UI. It is useful for local agent development, demos, and internal tools where you want prompt input, streamed responses, tool cards, reasoning sections, scrolling, and tool approval prompts without building a custom interface.

```ts
import { runAgentTUI } from '@ai-sdk/tui';

await runAgentTUI({
  title: 'Weather Agent',
  agent: weatherAgent,
});
```

### Structured Workflows

Agents are flexible and powerful, but non-deterministic. When you need reliable, repeatable outcomes with explicit control flow, use core functions with structured workflow patterns combining:

- Conditional statements for explicit branching
- Standard functions for reusable logic
- Error handling for robustness
- Explicit control flow for predictability

## Notes

- `model` in the snippets stands for any provider model (the official page uses a model/provider placeholder).
- Distinct from other skills: this page describes the AI SDK `ToolLoopAgent` abstraction (`ai` package, provider-agnostic). The OpenAI Agents SDK is covered by openai-agents, the Claude Agent SDK by anthropic-agent-sdk, hosted Managed Agents by anthropic-managed-agents, Hermes by hermes-agent, and Claude Code subagents / skills by anthropic-claude-code-extend.
- `HarnessAgent` and `@ai-sdk/tui` belong to separate packages; see the workflow-harnesses category.

## Related

- [Building Agents](./building-agents.md)
- [Workflow Patterns](./workflows.md)
- [Loop Control](./loop-control.md)
- [ToolLoopAgent](./tool-loop-agent.md)
