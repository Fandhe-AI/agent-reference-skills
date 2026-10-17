---
source: https://ai-sdk.dev/docs/agents/subagents
---

# Subagents

A subagent is an agent that a parent agent can invoke. The parent delegates work via a tool, and the subagent executes autonomously before returning a result.

## Signature / Usage

1. Define a subagent with its own model, instructions, and tools
2. Create a tool that calls it for the main agent to use
3. The subagent runs independently with its own context window
4. Return a result (optionally streaming progress to the UI)
5. Control what the model sees using `toModelOutput` to summarize

```ts
import { ToolLoopAgent, tool } from 'ai';
import { z } from 'zod';

// Define a subagent for research tasks
const researchSubagent = new ToolLoopAgent({
  model,
  instructions: `You are a research agent.
Summarize your findings in your final response.`,
  tools: {
    read: readFileTool, // defined elsewhere
    search: searchTool, // defined elsewhere
  },
});

// Create a tool that delegates to the subagent
const researchTool = tool({
  description: 'Research a topic or question in depth.',
  inputSchema: z.object({
    task: z.string().describe('The research task to complete'),
  }),
  execute: async ({ task }, { abortSignal }) => {
    const result = await researchSubagent.generate({
      prompt: task,
      abortSignal,
    });
    return result.text;
  },
});

// Main agent uses the research tool
const mainAgent = new ToolLoopAgent({
  model,
  instructions: 'You are a helpful assistant that can delegate research tasks.',
  tools: {
    research: researchTool,
  },
});
```

### When to Use Subagents

| Use Subagents When | Avoid Subagents When |
| --- | --- |
| Tasks require exploring large amounts of tokens | Tasks are simple and focused |
| You need to parallelize independent research | Sequential processing suffices |
| Context would grow beyond model limits | Context stays manageable |
| You want to isolate tool access by capability | All tools can safely coexist |

Subagents add latency and complexity. Common motivations: offloading context-heavy tasks (a subagent may use hundreds of thousands of tokens and return only a focused summary), parallelizing independent work, and specialized orchestration (e.g. read-only exploration subagent, coding subagent, integration subagent).

### Handling Cancellation

When the user cancels a request, the `abortSignal` propagates to the subagent. Always pass it through. If you abort the signal, the subagent stops executing and throws an `AbortError`; the main agent's tool execution fails, which stops the main loop. To avoid errors about incomplete tool calls in subsequent messages, use `convertToModelMessages` with `ignoreIncompleteToolCalls`:

```ts
import { convertToModelMessages } from 'ai';

const modelMessages = await convertToModelMessages(messages, {
  ignoreIncompleteToolCalls: true,
});
```

### Streaming Subagent Progress

Use preliminary tool results: change `execute` to an async generator (`async function*`); each `yield` sends a preliminary result and **replaces** the previous output entirely (it does not append). `readUIMessageStream` builds an ever-growing `UIMessage` from the stream:

```ts
import { readUIMessageStream, toUIMessageStream, tool } from 'ai';
import { z } from 'zod';

const researchTool = tool({
  description: 'Research a topic or question in depth.',
  inputSchema: z.object({
    task: z.string().describe('The research task to complete'),
  }),
  execute: async function* ({ task }, { abortSignal }) {
    // Start the subagent with streaming
    const result = await researchSubagent.stream({
      prompt: task,
      abortSignal,
    });

    // Each iteration yields a complete, accumulated UIMessage
    for await (const message of readUIMessageStream({
      stream: toUIMessageStream({ stream: result.stream }),
    })) {
      yield message;
    }
  },
});
```

### Controlling What the Model Sees

The full `UIMessage` with all the subagent's work is stored in the message history and displayed in the UI. `toModelOutput` maps the tool's output to the tokens sent to the model:

```ts
const researchTool = tool({
  // description, inputSchema, execute as above
  toModelOutput: ({ output: message }) => {
    // Extract just the final text as a summary
    const lastTextPart = message?.parts.findLast(p => p.type === 'text');
    return {
      type: 'text',
      value: lastTextPart?.text ?? 'Task completed.',
    };
  },
});
```

Users see the full subagent execution; the model sees just the final summary text. For `toModelOutput` to extract a useful summary, give the subagent explicit instructions to write a clear summary of its findings as its final response (otherwise it might simply say "Done").

### Rendering Subagents in the UI (with useChat)

Check the tool part's `state` and `preliminary` flag.

| State | Description |
| --- | --- |
| `input-streaming` | Tool input being generated |
| `input-available` | Tool ready to execute |
| `output-available` | Tool produced output (check `preliminary`) |
| `output-error` | Tool execution failed |

```tsx
const hasOutput = part.state === 'output-available';
const isStreaming = hasOutput && part.preliminary === true;
const isComplete = hasOutput && !part.preliminary;
```

Type safety with `InferAgentUIMessage`:

```ts
import { ToolLoopAgent, InferAgentUIMessage } from 'ai';

export const mainAgent = new ToolLoopAgent({
  // ... configuration with researchTool
});

// Export the main agent message type for the chat UI
export type MainAgentMessage = InferAgentUIMessage<typeof mainAgent>;
```

```tsx
'use client';

import { useChat } from '@ai-sdk/react';
import type { MainAgentMessage } from '@/lib/agents';

export function Chat() {
  const { messages } = useChat<MainAgentMessage>();
  // render message.parts; for part.type === 'tool-research' read part.output.parts
}
```

### Passing conversation history

Each subagent invocation starts with a fresh context window. If you need to give a subagent access to the conversation history, `messages` is available in the tool's `execute` options alongside `abortSignal`:

```ts
execute: async ({ task }, { abortSignal, messages }) => {
  const result = await researchSubagent.generate({
    messages: [
      ...messages, // The main agent's conversation history
      { role: 'user', content: task }, // The specific task for this invocation
    ],
    abortSignal,
  });
  return result.text;
},
```

## Notes

- Subagent tools cannot use approval flows such as `toolApproval` (or the deprecated `needsApproval`). All tools must execute automatically without user confirmation.
- Passing full history defeats some of the context isolation benefits; use sparingly.
- Streaming adds complexity; only add it when you need to show real-time progress in the UI.
- Distinct from other skills: subagents here are plain `ToolLoopAgent` instances invoked from a tool (provider-agnostic AI SDK pattern). Claude Code subagents (`.claude/agents`) are covered by anthropic-claude-code-extend, the OpenAI Agents SDK handoffs by openai-agents, the Claude Agent SDK by anthropic-agent-sdk, and hosted Managed Agents by anthropic-managed-agents.

## Related

- [ToolLoopAgent](./tool-loop-agent.md)
- [Tool Approvals](./tool-approvals.md)
- [Building Agents](./building-agents.md)
