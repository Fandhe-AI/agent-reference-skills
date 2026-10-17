---
source: https://ai-sdk.dev/docs/agents/building-agents
---

# Building Agents

The ToolLoopAgent provides a structured way to encapsulate LLM configuration, tools, and behavior into reusable components. It handles the agent loop for you, allowing the LLM to call tools multiple times in sequence to accomplish complex tasks. Define agents once and use them across your application.

## Signature / Usage

```ts
import { ToolLoopAgent } from 'ai';

const myAgent = new ToolLoopAgent({
  model,
  instructions: 'You are a helpful assistant.',
  tools: {
    // Your tools here
  },
});
```

The ToolLoopAgent accepts all the same settings as `generateText` and `streamText`.

### Configuration

#### Context and Agent State

Use `runtimeContext` as the agent's shared runtime state. It flows through the agent loop and is available in `prepareStep`, lifecycle callbacks, and final results. If a tool needs server-side values such as credentials, scoped permissions, or default settings, pass them through `toolsContext` and declare them with the tool's `contextSchema`. Set both in the `ToolLoopAgent` constructor.

```ts
import { ToolLoopAgent, tool } from 'ai';
import { z } from 'zod';

const agent = new ToolLoopAgent({
  model,
  tools: {
    searchTickets: tool({
      description: 'Search support tickets',
      inputSchema: z.object({
        query: z.string(),
      }),
      contextSchema: z.object({
        apiKey: z.string(),
        accountId: z.string(),
      }),
      execute: async ({ query }, { context }) =>
        searchTickets(query, context.accountId, context.apiKey),
    }),
  },
  runtimeContext: {
    requestId: 'req_abc',
    escalated: false,
  },
  toolsContext: {
    searchTickets: {
      apiKey: process.env.SUPPORT_API_KEY!,
      accountId: 'acct_123',
    },
  },
  prepareStep: async ({ runtimeContext }) => {
    if (runtimeContext.escalated) {
      return { temperature: 0.1 };
    }

    return {};
  },
});
```

For context that changes with each invocation, use `callOptionsSchema` and `prepareCall`. Model call settings returned from `prepareStep`, such as `temperature`, apply only to the current step. Later steps use the agent's top-level setting unless they return another override.

#### Tools That Use Experimental Sandboxes

Pass `experimental_sandbox` when an agent tool needs a command or code execution environment. The experimental sandbox is a per-call value, so provide it to `generate()`, `stream()`, or the agent UI stream helper that invokes the agent.

```ts
const agent = new ToolLoopAgent({
  model,
  instructions: 'You are a coding assistant. Use the shell tool when needed.',
  tools: {
    shell: tool({
      description: 'Execute shell commands in the experimental sandbox.',
      inputSchema: z.object({
        command: z.string(),
        workingDirectory: z.string().optional(),
      }),
      execute: async (
        { command, workingDirectory },
        { abortSignal, experimental_sandbox },
      ) => {
        if (!experimental_sandbox) {
          throw new Error('Experimental sandbox is not available');
        }

        return experimental_sandbox.run({
          command,
          workingDirectory,
          abortSignal,
        });
      },
    }),
  },
});

const result = await agent.generate({
  prompt: `Run the tests.\n\nSandbox:\n${experimental_sandbox.description}`,
  experimental_sandbox,
});
```

#### Tool approval

Configure approval on the `ToolLoopAgent` with `toolApproval`:

```ts
const agent = new ToolLoopAgent({
  model,
  tools: {
    runCode: tool({
      description: 'Execute Python code',
      inputSchema: z.object({
        code: z.string(),
      }),
      execute: async ({ code }) => ({ output: code }),
    }),
  },
  toolApproval: {
    runCode: 'user-approval',
  },
});
```

#### Loop Control

By default, agents run for 20 steps (`stopWhen: isStepCount(20)`). In each step, the model either generates text or calls a tool. If it generates text, the agent completes. If it calls a tool, the AI SDK executes that tool.

```ts
import { ToolLoopAgent, isStepCount } from 'ai';

const agent = new ToolLoopAgent({
  model,
  stopWhen: [
    isStepCount(20), // Maximum 20 steps
    yourCustomCondition(), // Custom logic for when to stop
  ],
});
```

Each step represents one generation (which results in either text or a tool call). The loop continues until:

- A finish reasoning other than tool-calls is returned, or
- A tool that is invoked does not have an execute function, or
- A tool call needs approval, or
- A stop condition is met

#### Tool Choice

```ts
const agent = new ToolLoopAgent({
  model,
  tools: {
    weather: weatherTool,
    cityAttractions: attractionsTool,
  },
  toolChoice: {
    type: 'tool',
    toolName: 'weather', // Force the weather tool to be used
  },
});
// toolChoice: 'required' forces tool use, 'none' disables tools, 'auto' (default) lets the model decide
```

#### Structured Output

```ts
import { ToolLoopAgent, Output } from 'ai';
import { z } from 'zod';

const analysisAgent = new ToolLoopAgent({
  model,
  output: Output.object({
    schema: z.object({
      sentiment: z.enum(['positive', 'neutral', 'negative']),
      summary: z.string(),
      keyPoints: z.array(z.string()),
    }),
  }),
});

const { output } = await analysisAgent.generate({
  prompt: 'Analyze customer feedback from the last quarter',
});
```

#### System instructions

System instructions define your agent's behavior, personality, and constraints. They set the context for all interactions and guide how the agent responds to user queries and uses tools.

```ts
const agent = new ToolLoopAgent({
  model,
  instructions:
    'You are an expert data analyst. You provide clear insights from complex data.',
});
```

### Using an Agent

```ts
// Generate Text
const result = await myAgent.generate({ prompt: 'What is the weather like?' });
console.log(result.text);

// Stream Text
const streamed = await myAgent.stream({ prompt: 'Tell me a story' });
for await (const chunk of streamed.textStream) {
  console.log(chunk);
}
```

Respond to UI messages with `createAgentUIStreamResponse()`:

```ts
// In your API route (e.g., app/api/chat/route.ts)
import { createAgentUIStreamResponse } from 'ai';

export async function POST(request: Request) {
  const { messages } = await request.json();

  return createAgentUIStreamResponse({
    agent: myAgent,
    uiMessages: messages,
  });
}
```

### Lifecycle Callbacks

Agents provide lifecycle callbacks for logging, observability, debugging, and custom telemetry.

```ts
const result = await myAgent.generate({
  prompt: 'Research and summarize the latest AI trends',

  onStart({ modelId }) {
    console.log('Agent started', { modelId });
  },

  onStepStart({ stepNumber, modelId }) {
    console.log(`Step ${stepNumber} starting`, { modelId });
  },

  onToolExecutionStart({ toolCall }) {
    console.log(`Tool call starting: ${toolCall.toolName}`);
  },

  onToolExecutionEnd({ toolCall, toolExecutionMs, toolOutput }) {
    console.log(
      `Tool call finished: ${toolCall.toolName} (${toolExecutionMs}ms)`,
      {
        success: toolOutput.type === 'tool-result',
      },
    );
  },

  onStepEnd({ stepNumber, usage, performance, finishReason, toolCalls }) {
    console.log(`Step ${stepNumber} completed:`, {
      inputTokens: usage.inputTokens,
      outputTokens: usage.outputTokens,
      outputTokensPerSecond: performance.effectiveOutputTokensPerSecond,
      stepTimeMs: performance.stepTimeMs,
      finishReason,
      toolsUsed: toolCalls?.map(tc => tc.toolName),
    });
  },

  onEnd({ usage, steps }) {
    console.log('Agent finished:', {
      totalSteps: steps.length,
      totalTokens: usage.totalTokens,
    });
  },
});
```

- **`onStart`**: Called once when the agent operation begins, before any LLM calls. Receives model info, messages, settings, and `runtimeContext`.
- **`onStepStart`**: Called before each step (LLM call). Receives the step number, model, messages being sent, tools, and prior steps.
- **`onToolExecutionStart`**: Called right before a tool's `execute` function runs. Receives the tool call object, messages, and `toolContext`.
- **`onToolExecutionEnd`**: Called right after a tool's `execute` function completes or errors. Receives the tool call, `toolExecutionMs`, and a `toolOutput` discriminated union (`type: 'tool-result'` with `output`, or `type: 'tool-error'` with `error`).
- **`onStepEnd`**: Called after each step finishes. Receives step results including usage, performance, finish reason, and tool calls.
- **`onEnd`**: Called when all steps are finished and the response is complete. Receives all step results, total usage, and `runtimeContext`.

All lifecycle callbacks can be defined in the constructor for agent-wide tracking, in the `generate()`/`stream()` call for per-call tracking, or both. When both are provided, both are called (constructor first, then the method callback).

### End-to-end Type Safety

```ts
import { ToolLoopAgent, InferAgentUIMessage } from 'ai';

const myAgent = new ToolLoopAgent({
  // ... configuration
});

// Infer the UIMessage type for UI components or persistence
export type MyAgentUIMessage = InferAgentUIMessage<typeof myAgent>;
```

```tsx
'use client';

import { useChat } from '@ai-sdk/react';
import type { MyAgentUIMessage } from '@/agent/my-agent';

export function Chat() {
  const { messages } = useChat<MyAgentUIMessage>();
  // Full type safety for your messages and tools
}
```

## Notes

- `model` in the snippets stands for any provider model (the official page uses a model/provider placeholder).
- The experimental sandbox description is not added to the model prompt automatically. Include it in the prompt or instructions when the model needs to know environment details. Passing an experimental sandbox does not sandbox the tool itself; the tool must explicitly delegate operations to the experimental sandbox. `experimental_` APIs can change in patch releases.
- Distinct from other skills: `ToolLoopAgent` is the AI SDK (`ai` package) agent class. Agent frameworks from OpenAI (openai-agents), Anthropic (anthropic-agent-sdk, anthropic-managed-agents), Hermes (hermes-agent) and Claude Code subagents (anthropic-claude-code-extend) are covered by those skills.

## Related

- [Agents overview](./overview.md)
- [ToolLoopAgent](./tool-loop-agent.md)
- [Loop Control](./loop-control.md)
- [Configuring Call Options](./configuring-call-options.md)
- [Tool Approvals](./tool-approvals.md)
- [Workflow Patterns](./workflows.md)
- [Experimental_SandboxSession](./sandbox.md)
