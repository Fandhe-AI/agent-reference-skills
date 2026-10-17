---
source: https://ai-sdk.dev/docs/ai-sdk-core/tool-search
---

# Tool Search

`toolSearch()` lets a model find the tools it needs without loading every tool definition into its initial context. Register tools with `deferLoading: true`; search matches their names and descriptions and makes them available on the next model step.

## Signature / Usage

Works with `generateText`, `streamText`, `ToolLoopAgent`, or `WorkflowAgent` from `@ai-sdk/workflow`. `WorkflowAgent` supports direct tool calling; the other APIs also support cache-preserving code mode.

Direct tool calling (the model initially sees only `search`; matching definitions are then added to the provider's tool list, which can invalidate the cached prompt prefix):

```ts
import { generateText, isStepCount, tool, toolSearch } from 'ai';
import { z } from 'zod/v4';

const weather = tool({
  deferLoading: true,
  description: 'Get the weather forecast for a city.',
  inputSchema: z.object({ city: z.string() }),
  execute: async ({ city }) => ({ city, forecast: 'Rain tomorrow.' }),
});

const result = await generateText({
  model: __MODEL__,
  tools: { search: toolSearch(), weather },
  stopWhen: isStepCount(5),
  prompt: 'Will it rain in Bangalore tomorrow?',
});
```

Code mode (`toolDiscovery: 'conversation'` announces discovered definitions in user messages and keeps the provider-visible code tool unchanged, preserving the tool-definition cache; actual prompt-cache reuse depends on the provider):

```ts
import { experimental_codeModeTool as codeModeTool } from '@ai-sdk/code-mode';

const result = await generateText({
  model: __MODEL__,
  tools: {
    code: codeModeTool({ toolDiscovery: 'conversation' }),
    search: toolSearch(),
    weather,
  },
  experimental_toolCallers: {
    search: ['code'],
    weather: ['code'],
  },
  stopWhen: isStepCount(5),
  prompt: 'Will it rain in Bangalore tomorrow?',
});
```

Custom search:

```ts
const search = toolSearch({
  search: ({ query, tools }) => {
    const preferred = /\bgmail\b/i.test(query)
      ? ['gmail_list_messages', 'gmail_get_message']
      : [];
    return preferred.filter(name => tools.some(tool => tool.name === name));
  },
});
```

## Notes

- In both modes search loads up to five matches by default, respects `activeTools` and caller routing, and keeps discovered tools available for the rest of the generation. MCP client tools work too: add `deferLoading: true` to the tools returned by `client.tools()`.
- `maxResults` (e.g. `toolSearch({ maxResults: 10 })`) must be a positive safe integer; it does not change matching or ranking. The SDK filters unknown names and duplicates before keeping the first `maxResults`. Without a `search` callback, default keyword matching and ranking apply.
- Code mode is experimental (see the Code Mode page).

## Related

- [toolSearch](./tool-search.md)
- [Code Mode](./code-mode.md)
- [tool](./tool.md)
- [filterActiveTools](./filter-active-tools.md)
