---
source: https://ai-sdk.dev/cookbook/guides/agent-context-compaction
---

# Compact Agent Context with prepareStep

Prune an agent's message history between steps by returning a new `messages` array from `prepareStep` (`pruneMessages`).

```ts
import {
  ToolLoopAgent,
  isStepCount,
  pruneMessages,
  tool,
  type ModelMessage,
} from 'ai';
import { z } from 'zod';
__PROVIDER_IMPORT__;

const COMPACT_AFTER_TOKENS = 100_000;

const estimateTokens = (messages: ModelMessage[]) => {
  return JSON.stringify(messages).length / 4;
};

const readDocument = tool({
  description: 'Read a document by name',
  inputSchema: z.object({
    name: z.string(),
  }),
  execute: async ({ name }) => {
    return {
      name,
      text: await loadLargeDocument(name),
    };
  },
});

const agent = new ToolLoopAgent({
  model: __MODEL__,
  tools: {
    readDocument,
  },
  stopWhen: isStepCount(10),
  prepareStep: ({ messages }) => {
    if (estimateTokens(messages) > COMPACT_AFTER_TOKENS) {
      return {
        messages: pruneMessages({
          messages,
          reasoning: 'all',
          toolCalls: 'before-last-3-messages',
          emptyMessages: 'remove',
        }),
      };
    }
  },
});

const result = await agent.generate({
  prompt: 'Read the project documents and summarize the migration plan.',
});
```

```ts
// rebuild each step from the original input plus recent responses
prepareStep: ({ initialMessages, responseMessages, stepNumber }) => {
  if (stepNumber > 0) {
    return {
      messages: [...initialMessages, ...responseMessages.slice(-10)],
    };
  }
};
```

## Notes

- `__PROVIDER_IMPORT__` and `__MODEL__` are placeholders on the official page; `loadLargeDocument` is an application placeholder.
- `prepareStep` runs before every model step; a returned `messages` array is used for that step and persists as the base for later steps. The token estimate is deliberately crude; use a real tokenizer or provider usage data for tighter accounting.
- The same `prepareStep` works with `generateText` and `streamText`. Compare `track-agent-token-usage.md` for feeding usage into the trigger.
- `ToolLoopAgent` is the AI SDK abstraction, separate from openai-agents / anthropic-agent-sdk runtimes.
