---
source: https://ai-sdk.dev/docs/reference/ai-sdk-ui/infer-ui-tools
---

# InferUITools

Type helper that infers the input and output types of a `ToolSet`, for type-safe tool inputs and outputs in `UIMessage`s.

## Signature / Usage

```tsx
import { InferUITools, tool } from 'ai';
import { z } from 'zod';

const tools = {
  weather: tool({
    description: 'Get the current weather',
    inputSchema: z.object({
      location: z.string().describe('The city and state'),
    }),
    execute: async ({ location }) => {
      return `The weather in ${location} is sunny.`;
    },
  }),
};

// Infer the types from the tool set
type MyUITools = InferUITools<typeof tools>;
// { weather: { input: { location: string }; output: string } }
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| TOOLS (type parameter) | `ToolSet` | The tool set to infer types from. |

The resulting type has the shape:

```typescript
{
  [NAME in keyof TOOLS & string]: {
    input: InferToolInput<TOOLS[NAME]>;
    output: InferToolOutput<TOOLS[NAME]>;
  };
}
```

## Notes

- The official example uses plain object literals; each is wrapped in `tool()` here so that `execute` arguments are inferred (see tool.md).

## Related

- [InferUITool](./infer-ui-tool.md)
- [useChat](./use-chat.md)
- [UIMessage](./ui-message.md)
