---
source: https://ai-sdk.dev/docs/reference/ai-sdk-core/dynamic-tool
---

# dynamicTool

Creates tools whose input and output types are unknown at compile time (MCP tools without schemas, user-defined functions loaded at runtime, tools from external sources or databases, dynamic tool generation).

## Signature / Usage

```ts
import { dynamicTool } from 'ai';
import { z } from 'zod';

export const customTool = dynamicTool({
  description: 'Execute a custom user-defined function',
  inputSchema: z.object({ action: z.string(), parameters: z.unknown() }),
  // input is typed as 'unknown'
  execute: async input => {
    const { action, parameters } = input as any;

    // Execute your dynamic logic
    return {
      result: `Executed ${action} with ${JSON.stringify(parameters)}`,
    };
  },
});
```

Import: `import { dynamicTool } from "ai"`. Returns a `Tool<unknown, unknown>` with `type: 'dynamic'`.

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| description | `string \| ((options: { context: Context; experimental_sandbox?: Experimental_SandboxSession }) => string)` | Optional. Purpose of the tool; string or function. |
| deferLoading | boolean | Optional. Keep out of model context until `toolSearch` discovers it. Defaults to false. |
| title | string | Optional. Deprecated. Use `providerMetadata`. |
| needsApproval | boolean \| function | Optional. Deprecated; use `toolApproval`. |
| inputSchema | `FlexibleSchema<unknown>` | A schema is still required for validation; use `z.unknown()` / `z.any()` for fully dynamic inputs. |
| execute | `ToolExecuteFunction<unknown, unknown, Context>` | Called with the arguments; input is `unknown` and must be validated/cast at runtime. Options: `toolCallId`, `messages`, `abortSignal` (optional), `context` (from the matching `toolsContext` entry). |
| outputSchema | Zod Schema \| JSON Schema | Optional. For validation and type inference. |
| toModelOutput | `({ toolCallId; input: unknown; output: unknown }) => ToolResultOutput \| PromiseLike<ToolResultOutput>` | Optional. Maps the result to model output. |
| onInputStart | function | Optional. Called when input generation starts. |
| onInputDelta | function | Optional. Only in streaming contexts. |
| onInputAvailable | function | Optional. Called when a tool call can start. |
| providerOptions | ProviderOptions | Optional. Provider-specific metadata. |
| metadata | JSONObject | Optional. Metadata about the tool itself, propagated to `toolMetadata` (e.g. an MCP server identifying itself). |

## Notes

- With static and dynamic tools together, check the `dynamic` flag for type narrowing (`toolCall.dynamic` -> input/output are `unknown`; static tools keep full inference).
- With `useChat` (`UIMessage` format), dynamic tools appear as `dynamic-tool` parts (`part.toolName`, `part.input`).

```ts
onStepEnd: ({ toolCalls, toolResults }) => {
  for (const toolCall of toolCalls) {
    if (toolCall.dynamic) {
      console.log('Dynamic tool:', toolCall.toolName);
      continue;
    }
    // Static tools have full type inference
  }
},
```

## Related

- [tool](./tool.md)
- [Tool Calling](./tools-and-tool-calling.md)
- [Model Context Protocol (MCP)](./mcp-tools.md)
