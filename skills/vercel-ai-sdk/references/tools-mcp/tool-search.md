---
source: https://ai-sdk.dev/docs/reference/ai-sdk-core/tool-search
---

# toolSearch

Creates a tool that searches the surrounding generation's deferred tools (`deferLoading: true`), using keyword matching by default or a custom `search` callback. Works with `generateText`, `streamText`, `ToolLoopAgent`, or `WorkflowAgent` from `@ai-sdk/workflow`. `WorkflowAgent` supports direct tool calling; the others also support code mode configured with `toolDiscovery: 'conversation'`.

## Signature / Usage

```ts
import { toolSearch } from 'ai';

const search = toolSearch();
const limited = toolSearch({ maxResults: 10 });
```

Custom search callback signature:

```ts
search?: (options: {
  query: string;
  tools: Array<{ name: string; description?: string }>;
}) => string[] | PromiseLike<string[]>;
```

Model input: `{ "query": "weather forecast" }` (`query` required, nonempty string). Output:

```ts
{
  tools: [
    { name: 'getForecast', description: 'Get the weather forecast for a city.' },
  ],
}
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| maxResults | number | 5 | Maximum matching tools returned and discovered per search; positive safe integer, otherwise `InvalidArgumentError` at creation. Applies to default and custom search. Discovered tools accumulate across searches. |
| search | callback (above) | keyword search | Selects and ranks tools. `tools` contains all eligible deferred tools (respecting `activeTools` and caller routing) with descriptions resolved from the current tool context and sandbox; no schemas. Return names in ranked order. |

## Notes

- Default search is local and case-insensitive over tool names and descriptions; camel-case names are split into words; name matches rank above description matches; ties keep registration order. No embedding service or extra model call (a custom callback may use either).
- The SDK ignores unknown or ineligible names and removes duplicates preserving order. An empty array discovers no tools. Callback errors follow normal tool-execution error handling; there is no fallback to keyword search.
- Results exclude schemas; no matches returns `{ tools: [] }`. Newly discovered tools can only be called on the **next** model step; a parallel call in the same response cannot use them. For code mode, finish the current execution and wait for the capability update.
- Direct calling: the provider receives updated tool definitions. Code mode: the SDK appends a user message with the updated capability catalog while the provider-visible code mode definition stays unchanged; the latest catalog describes the complete available tool set. Code mode search requires `toolDiscovery: 'conversation'`; description discovery and provider callers are not supported. Prompt-cache reuse depends on the provider.
- Discovered tools stay loaded for the rest of the generation (subject to `activeTools`), and discovery state is isolated between generation calls. Set a multi-step `stopWhen` with `generateText` / `streamText`.

## Related

- [Tool Search (guide)](./tool-search-guide.md)
- [Code Mode](./code-mode.md)
- [tool](./tool.md)
- [filterActiveTools](./filter-active-tools.md)
