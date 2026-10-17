---
source: https://ai-sdk.dev/docs/reference/ai-sdk-core/filter-active-tools
---

# filterActiveTools

Filters a tool set to only the string tool names listed in `activeTools`. Useful for limiting which tools are sent to a model in a particular step.

## Signature / Usage

```ts
import { experimental_filterActiveTools as filterActiveTools, tool } from 'ai';
import { z } from 'zod';

const tools = {
  weather: tool({
    description: 'Get the weather for a city',
    inputSchema: z.object({ city: z.string() }),
  }),
  time: tool({
    description: 'Get the current time for a city',
    inputSchema: z.object({ city: z.string() }),
  }),
};

const activeTools = ['weather'] as const;

const filteredTools = filterActiveTools({
  tools,
  activeTools,
});
```

Import: `import { experimental_filterActiveTools as filterActiveTools } from "ai"`.

```ts
type ActiveTools<TOOLS extends ToolSet> =
  | ReadonlyArray<keyof TOOLS & string>
  | undefined;
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| tools | `ToolSet \| undefined` | The tool set to filter. |
| activeTools | `ActiveTools<TOOLS>` | Names of tools that remain active. When omitted, all tools are returned. |

Returns the filtered tool set, or `undefined` when `tools` is `undefined`. With a literal array such as `["weather"] as const`, TypeScript narrows the return type to that subset.

## Notes

- Experimental: `filterActiveTools` is an experimental feature (imported with the `experimental_` prefix).
- `ActiveTools` only accepts string keys of the tool set because tool names are strings at runtime.

## Related

- [Tool Calling](./tools-and-tool-calling.md)
- [toolSearch](./tool-search.md)
