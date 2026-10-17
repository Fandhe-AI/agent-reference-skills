---
source: https://ai-sdk.dev/docs/agents/configuring-call-options
---

# Configuring Call Options

Call options allow you to pass type-safe structured inputs to your agent. Use them to dynamically modify any agent setting based on the specific request.

## Signature / Usage

Define call options in three steps: define the schema with `callOptionsSchema`, configure with `prepareCall`, and pass `options` at runtime to `generate()` or `stream()`.

```ts
import { ToolLoopAgent } from 'ai';
import { z } from 'zod';

const supportAgent = new ToolLoopAgent({
  model,
  callOptionsSchema: z.object({
    userId: z.string(),
    accountType: z.enum(['free', 'pro', 'enterprise']),
  }),
  instructions: 'You are a helpful customer support agent.',
  prepareCall: ({ options, ...settings }) => ({
    ...settings,
    instructions:
      settings.instructions +
      `\nUser context:
- Account type: ${options.accountType}
- User ID: ${options.userId}

Adjust your response based on the user's account level.`,
  }),
});

// Call the agent with specific user context
const result = await supportAgent.generate({
  prompt: 'How do I upgrade my account?',
  options: {
    userId: 'user_123',
    accountType: 'free',
  },
});
```

The `options` parameter is now required and type-checked. If you don't provide it or pass incorrect types, TypeScript will error.

### Modifying Agent Settings

Use `prepareCall` to modify any agent setting. The returned object replaces the call settings, so spread the incoming settings and override only the ones you want to change.

Dynamic model selection:

```ts
const agent = new ToolLoopAgent({
  model, // Default model
  callOptionsSchema: z.object({
    complexity: z.enum(['simple', 'complex']),
  }),
  prepareCall: ({ options, ...settings }) => ({
    ...settings,
    model:
      options.complexity === 'simple'
        ? 'openai/gpt-6-luna'
        : 'openai/gpt-6-astra',
  }),
});
```

Dynamic tool configuration:

```ts
import { openai } from '@ai-sdk/openai';

const newsAgent = new ToolLoopAgent({
  model,
  callOptionsSchema: z.object({
    userCity: z.string().optional(),
    userRegion: z.string().optional(),
  }),
  tools: {
    web_search: openai.tools.webSearch(),
  },
  prepareCall: ({ options, ...settings }) => ({
    ...settings,
    tools: {
      web_search: openai.tools.webSearch({
        searchContextSize: 'low',
        userLocation: {
          type: 'approximate',
          city: options.userCity,
          region: options.userRegion,
          country: 'US',
        },
      }),
    },
  }),
});
```

Provider-specific options:

```ts
import { OpenAILanguageModelResponsesOptions } from '@ai-sdk/openai';

const agent = new ToolLoopAgent({
  model: 'openai/gpt-6-astra',
  callOptionsSchema: z.object({
    taskDifficulty: z.enum(['low', 'medium', 'high']),
  }),
  prepareCall: ({ options, ...settings }) => ({
    ...settings,
    providerOptions: {
      openai: {
        reasoningEffort: options.taskDifficulty,
      } satisfies OpenAILanguageModelResponsesOptions,
    },
  }),
});
```

### Advanced Patterns

Retrieval Augmented Generation (`prepareCall` can be async):

```ts
const ragAgent = new ToolLoopAgent({
  model,
  callOptionsSchema: z.object({
    query: z.string(),
  }),
  prepareCall: async ({ options, ...settings }) => {
    // Fetch relevant documents (this can be async)
    const documents = await vectorSearch(options.query);

    return {
      ...settings,
      instructions: `Answer questions using the following context:

${documents.map(doc => doc.content).join('\n\n')}`,
    };
  },
});
```

Combining multiple modifications (model, `activeTools`, `instructions`):

```ts
prepareCall: ({ options, ...settings }) => ({
  ...settings,
  // Upgrade model for urgent requests
  model: options.urgency === 'high' ? model : settings.model,
  // Limit tools based on user role
  activeTools:
    options.userRole === 'admin'
      ? ['readDatabase', 'writeDatabase']
      : ['readDatabase'],
  // Adjust instructions
  instructions: `You are a ${options.userRole} assistant.
${options.userRole === 'admin' ? 'You have full database access.' : 'You have read-only access.'}`,
}),
```

### Using with createAgentUIStreamResponse

```ts
import { createAgentUIStreamResponse } from 'ai';
import { myAgent } from '@/ai/agents/my-agent';

export async function POST(request: Request) {
  const { messages, userId, accountType } = await request.json();

  return createAgentUIStreamResponse({
    agent: myAgent,
    uiMessages: messages,
    options: {
      userId,
      accountType,
    },
  });
}
```

## Notes

- The official guide page passes `messages` here; the `createAgentUIStreamResponse` API reference and Building Agents use `uiMessages`, which this example follows.

## Related

- [ToolLoopAgent](./tool-loop-agent.md)
- [createAgentUIStreamResponse](./create-agent-ui-stream-response.md)
- [Loop Control](./loop-control.md)
- [Workflow Patterns](./workflows.md)
