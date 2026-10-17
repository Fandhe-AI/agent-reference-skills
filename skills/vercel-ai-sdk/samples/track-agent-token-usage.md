---
source: https://ai-sdk.dev/cookbook/next/track-agent-token-usage
---

# Track Agent Token Usage

Attach per-step usage to message metadata for a `ToolLoopAgent` and feed the last input token count back via call options and `prepareStep`.

```typescript
// ai/agent.ts
import {
  type InferAgentUIMessage,
  type LanguageModelUsage,
  ToolLoopAgent,
  tool,
} from 'ai';
import { z } from 'zod';

type TContext = {
  lastInputTokens: number;
};

export const agent = new ToolLoopAgent({
  model: 'anthropic/claude-haiku-5.5',
  callOptionsSchema: z.object({
    lastInputTokens: z.number(),
  }),
  tools: {
    greet: tool({
      description: 'Greets a person by their name.',
      inputSchema: z.object({ name: z.string() }),
      execute: async ({ name }) => `Greeted ${name}`,
    }),
  },
  prepareCall: ({ options, ...settings }) => {
    return {
      ...settings,
      context: { lastInputTokens: options.lastInputTokens },
    };
  },
  prepareStep: ({ steps, context }) => {
    const lastStep = steps.at(-1);
    const lastStepUsage =
      lastStep?.usage?.inputTokens ??
      (context as TContext)?.lastInputTokens ??
      0;
    console.log('Last step input tokens:', lastStepUsage);
    // You can use this to implement context compaction strategies
    return {
      context: {
        ...context,
        lastStepUsage,
      },
    };
  },
});

type AgentMetadata = { usage: LanguageModelUsage };
export type AgentUIMessage = InferAgentUIMessage<typeof agent, AgentMetadata>;
```

```tsx
// app/api/chat/route.ts
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  toUIMessageStream,
  type ToolSet,
} from 'ai';
import { type AgentUIMessage, agent } from '@/ai/agent';

export async function POST(req: Request) {
  const { messages }: { messages: AgentUIMessage[] } = await req.json();

  const lastInputTokens =
    messages.filter(m => m.role === 'assistant').at(-1)?.metadata?.usage
      ?.inputTokens ?? 0;

  const result = await agent.stream({
    messages: await convertToModelMessages(messages),
    options: {
      lastInputTokens,
    },
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream<ToolSet, AgentUIMessage>({
      stream: result.stream,
      messageMetadata: ({ part }) => {
        if (part.type === 'finish-step') {
          return { usage: part.usage };
        }
      },
    }),
  });
}
```

```tsx
// app/page.tsx
'use client';

import { type AgentUIMessage } from '@/ai/agent';
import { useChat } from '@ai-sdk/react';
import { useState } from 'react';

export default function Chat() {
  const [input, setInput] = useState('');
  const { messages, sendMessage } = useChat<AgentUIMessage>();

  return (
    <div>
      {messages.map((m) => (
        <div key={m.id}>
          <strong>{m.role}:</strong>
          {m.parts.map((p, i) => p.type === 'text' && <span key={i}>{p.text}</span>)}
          {m.metadata?.usage && (
            <div>Input tokens: {m.metadata.usage.inputTokens}</div>
          )}
        </div>
      ))}
      <form onSubmit={(e) => {
        e.preventDefault();
        sendMessage({ text: input });
        setInput('');
      }}>
        <input value={input} onChange={(e) => setInput(e.target.value)} />
      </form>
    </div>
  );
}
```

## Notes

- `prepareStep` only sees steps of the current run, so the previous request's usage is passed in through `callOptionsSchema` + `prepareCall` (placed on `context`); this is how you build context compaction on token limits.
- `InferAgentUIMessage<typeof agent, AgentMetadata>` gives typed tool parts and metadata on the client; `messageMetadata` reads usage from the `finish-step` part.
- `ToolLoopAgent` is the AI SDK agent abstraction (`references/agents/tool-loop-agent.md`). It is distinct from the agent runtimes in openai-agents, anthropic-agent-sdk and hermes-agent.
