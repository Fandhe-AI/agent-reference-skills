---
source: https://ai-sdk.dev/docs/reference/ai-sdk-core/get-realtime-tool-definitions
---

# experimental_getRealtimeToolDefinitions

Converts an AI SDK `ToolSet` into provider-neutral realtime tool definitions that can be passed to a realtime session setup request. Use it in the server-side setup endpoint that creates a short-lived realtime provider token.

## Signature / Usage

```ts
import { openai } from '@ai-sdk/openai';
import { experimental_getRealtimeToolDefinitions, tool } from 'ai';
import { z } from 'zod';

const tools = {
  getWeather: tool({
    description: 'Get the current weather for a city',
    inputSchema: z.object({
      city: z.string(),
    }),
  }),
};

const toolDefinitions = await experimental_getRealtimeToolDefinitions({
  tools,
});

const token = await openai.experimental_realtime.getToken({
  model: 'gpt-realtime',
  sessionConfig: {
    tools: toolDefinitions,
  },
});
```

Import:

```ts
import { experimental_getRealtimeToolDefinitions } from 'ai';
```

## Options / Props

Parameter `options` (`Object`): the options for converting tools.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| options.tools | `ToolSet` | — | The AI SDK tools to expose to the realtime model. Function and dynamic tools are converted to realtime function definitions. Provider tools are skipped. |
| options.toolsContext | `InferToolSetContext<TOOLS>` | Optional | Per-tool context used when resolving dynamic tool descriptions. |

### Returns

A `Promise<Experimental_RealtimeToolDefinition[]>`. Each returned definition contains:

| Name | Type | Description |
| --- | --- | --- |
| type | `'function'` | The realtime tool definition type. |
| name | `string` | The tool name from the input ToolSet. |
| description | `string \| undefined` | The tool description sent to the realtime model. |
| parameters | `JSONSchema7` | The JSON schema converted from the tool inputSchema. The realtime model uses this schema to generate tool call arguments. |

## Notes

- Experimental: part of the experimental realtime API and may change in patch releases.
- Tool execution is not handled by `experimental_getRealtimeToolDefinitions`. Use `experimental_useRealtime` `onToolCall` and `addToolOutput` to execute tools and return results.
- Provider tools are skipped because realtime providers expect regular function definitions in the session config.
- Dynamic tool descriptions are resolved with the matching value from `toolsContext` before the definitions are returned.
- The example uses a zod schema; zod itself is covered by the zod skill.

## Related

- [Realtime](./realtime.md)
- [useRealtime](../ui/use-realtime.md)
- [tool](../tools-mcp/tool.md)
