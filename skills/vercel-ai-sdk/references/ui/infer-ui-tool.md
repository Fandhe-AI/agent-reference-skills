---
source: https://ai-sdk.dev/docs/reference/ai-sdk-ui/infer-ui-tool
---

# InferUITool

Type helper that infers the input and output types of a single tool, for type-safe tool inputs and outputs in `UIMessage`s.

## Signature / Usage

```tsx
import { InferUITool } from 'ai';
import { z } from 'zod';

const weatherTool = {
  description: 'Get the current weather',
  inputSchema: z.object({
    location: z.string().describe('The city and state'),
  }),
  execute: async ({ location }) => {
    return `The weather in ${location} is sunny.`;
  },
};

// Infer the types from the tool
type WeatherUITool = InferUITool<typeof weatherTool>;
// { input: { location: string }; output: string }
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| TOOL (type parameter) | `Tool` | The tool to infer types from. |

The resulting type has the shape:

```typescript
{
  input: InferToolInput<TOOL>;
  output: InferToolOutput<TOOL>;
}
```

## Related

- [InferUITools](./infer-ui-tools.md)
- [UIMessage](./ui-message.md)
