---
source: https://ai-sdk.dev/cookbook/node/dynamic-prompt-caching
---

# Dynamic Prompt Caching (Anthropic cacheControl)

Mark the last message with Anthropic `cacheControl` inside `prepareStep` so long agent conversations reuse cached prefixes.

```ts
// add-cache-control-to-messages.ts
import type { ModelMessage, JSONValue, LanguageModel } from 'ai';

function isAnthropicModel(model: LanguageModel): boolean {
  if (typeof model === 'string') {
    return model.includes('anthropic') || model.includes('claude');
  }
  return (
    model.provider === 'anthropic' ||
    model.provider.includes('anthropic') ||
    model.modelId.includes('anthropic') ||
    model.modelId.includes('claude')
  );
}

export function addCacheControlToMessages({
  messages,
  model,
  providerOptions = {
    anthropic: { cacheControl: { type: 'ephemeral' } },
  },
}: {
  messages: ModelMessage[];
  model: LanguageModel;
  providerOptions?: Record<string, Record<string, JSONValue>>;
}): ModelMessage[] {
  if (messages.length === 0) return messages;
  if (!isAnthropicModel(model)) return messages;

  return messages.map((message, index) => {
    if (index === messages.length - 1) {
      return {
        ...message,
        providerOptions: {
          ...message.providerOptions,
          ...providerOptions,
        },
      };
    }
    return message;
  });
}
```

```ts
import { anthropic } from '@ai-sdk/anthropic';
import { generateText, tool, isStepCount } from 'ai';
import { z } from 'zod';
import { addCacheControlToMessages } from './add-cache-control-to-messages';

async function main() {
  const result = await generateText({
    model: anthropic('claude-sonnet-5-5'),
    prompt: 'Help me analyze this codebase and suggest improvements.',
    stopWhen: isStepCount(10),
    tools: {
      // your tools here
      analyzeFile: tool({
        description: 'Analyze a file in the codebase',
        inputSchema: z.object({
          path: z.string().describe('Path to the file'),
        }),
        execute: async ({ path }) => {
          // implementation
          return { analysis: `Analysis of ${path}` };
        },
      }),
    },
    prepareStep: ({ initialMessages, responseMessages, model }) => ({
      messages: addCacheControlToMessages({
        messages: [...initialMessages, ...responseMessages],
        model,
      }),
    }),
  });

  console.log(result.text);
}

main().catch(console.error);
```

## Notes

- Modified from the official cookbook example: in AI SDK 7, `messages` returned from `prepareStep` carry forward to later steps, so the cookbook's `({ messages, model })` form would accumulate `cacheControl` breakpoints on earlier messages and exceed Anthropic's limit of 4 per request. This version rebuilds from the cacheControl-free `initialMessages` + `responseMessages` each step so only the last message is marked. If you also set `cacheControl` on `tools` / `system`, those count toward the same 4.
- Message-level `providerOptions` are translated by the SDK to block-level `cache_control` on the last content block; `providerOptions` on individual content parts take priority over message-level settings. Non-Anthropic models pass through unchanged.
- Considerations from the page: Anthropic requires a minimum token threshold before caching activates, the ephemeral cache has a 5-minute TTL, and cached tokens cost 10% of input tokens while cache writes cost 25% more.
- This is the AI SDK wrapper over Anthropic prompt caching; the raw API feature belongs to anthropic-api-core. See `references/providers/anthropic.md` and `references/foundations/provider-options.md`.
