---
source: https://ai-sdk.dev/docs/reference/ai-sdk-core/tool
---

# tool

Helper that infers the tool input and context types for `execute` and lifecycle callbacks. It has no runtime behavior.

## Signature / Usage

```ts
import { tool } from 'ai';
import { z } from 'zod';

export const weatherTool = tool({
  description: 'Get the weather in a location',
  inputSchema: z.object({
    location: z.string().describe('The location to get the weather for'),
  }),
  // location below is inferred to be a string:
  execute: async ({ location }) => ({
    location,
    temperature: 72 + Math.floor(Math.random() * 21) - 10,
  }),
});
```

Import: `import { tool } from "ai"`. Returns the tool that was passed in. The `Tool` type is a union of `FunctionTool`, `DynamicTool`, `ProviderDefinedTool` (provider-defined, your code executes), and `ProviderExecutedTool` (provider executes).

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| description | `string \| ((options: { context: CONTEXT; experimental_sandbox?: Experimental_SandboxSession }) => string)` | Optional. Purpose of the tool; string or function derived from tool context and optional sandbox before each model call. |
| deferLoading | boolean | Optional. Keep out of model context until `toolSearch` discovers it. Supports direct calling or code mode with `toolDiscovery: 'conversation'`; discovered tools are available on the next model step. Defaults to false. |
| title | string | Optional. Deprecated. Use `providerMetadata` for source-specific display metadata. |
| needsApproval | `boolean \| ((input, options: { toolCallId; messages; context }) => boolean \| Promise<boolean>)` | Optional. Deprecated; use `toolApproval` on `generateText` / `streamText` / `ToolLoopAgent`. Still works as a fallback. |
| inputSchema | Zod Schema \| JSON Schema | Input schema; used by the model and to validate. Use `jsonSchema` for JSON schema. |
| inputExamples | `Array<{ input: INPUT }>` | Optional. Example inputs shown to the model. |
| contextSchema | Zod Schema \| JSON Schema | Optional. Tool-specific context; infers `context` type in `execute`, `needsApproval` and input lifecycle callbacks; value comes from the tool's `toolsContext` entry. |
| strict | boolean | Optional. Strict mode; always produces valid inputs but may limit supported schemas. |
| execute | `async (input: INPUT, options: ToolExecutionOptions<CONTEXT>) => RESULT \| Promise<RESULT> \| AsyncIterable<RESULT>` | Optional. With an iterable, all but the last result are preliminary. Without it the tool is not executed automatically. |
| execute options: toolCallId | string | ID of the tool call. |
| execute options: messages | ModelMessage[] | Messages sent to the model to initiate the response containing the tool call (without system prompt or the assistant tool-call response). |
| execute options: abortSignal | AbortSignal | Optional. Overall operation abort signal. |
| execute options: context | CONTEXT | Tool-specific context from the matching `toolsContext` entry. |
| execute options: experimental_sandbox | Experimental_SandboxSession | Optional. Sandbox passed from the generation or agent call. |
| outputSchema | Zod Schema \| JSON Schema | Optional. Output schema; used for type inference. |
| toModelOutput | `({ toolCallId; input; output }) => ToolResultOutput \| PromiseLike<ToolResultOutput>` | Optional. Maps the result to model output (default: JSON object). Invoked on the server by `convertToModelMessages`; pass the same `tools` to both it and `streamText`. |
| onInputStart | `(options: ToolExecutionOptions<CONTEXT>) => void \| PromiseLike<void>` | Optional. Called when input generation starts; in non-streaming contexts, immediately before `onInputAvailable`. |
| onInputDelta | `(options: { inputTextDelta: string } & ToolExecutionOptions<CONTEXT>) => ...` | Optional. Only called in streaming contexts. |
| onInputAvailable | `(options: { input: INPUT } & ToolExecutionOptions<CONTEXT>) => ...` | Optional. Called when a tool call can start, even without `execute`. |
| providerOptions | ProviderOptions | Optional. Provider-specific metadata passed through. |
| metadata | JSONObject | Optional. Metadata about the tool itself (e.g. source); propagated to the tool call's `toolMetadata`. |
| type | `'function' \| 'dynamic' \| 'provider'` | Optional. Defaults to `"function"`. |
| id | `` `${string}.${string}` `` | Optional. Provider tool ID `<provider-name>.<unique-tool-name>`; required when `type` is `"provider"`. |
| isProviderExecuted | boolean | Optional. `false` for `ProviderDefinedTool`, `true` for `ProviderExecutedTool`; required when `type` is `"provider"`. |
| args | Record<string, unknown> | Optional. Provider tool arguments; required when `type` is `"provider"`. |
| supportsDeferredResults | boolean | Optional. Only for `ProviderExecutedTool`: results may arrive without a matching call in the current response. |

## Notes

- Without this helper TypeScript cannot connect `inputSchema` / `contextSchema` to the callbacks, so argument types are not inferred.
- `needsApproval` and `title` are deprecated.

## Related

- [Tool Calling](./tools-and-tool-calling.md)
- [Runtime and Tool Context](./runtime-and-tool-context.md)
- [dynamicTool](./dynamic-tool.md)
- [jsonSchema](./json-schema.md)
