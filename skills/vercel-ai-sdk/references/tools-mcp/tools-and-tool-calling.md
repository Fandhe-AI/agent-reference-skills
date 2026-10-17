---
source: https://ai-sdk.dev/docs/ai-sdk-core/tools-and-tool-calling
---

# Tool Calling

Tools are objects the model can call to perform a specific task. The `tools` parameter of `generateText` and `streamText` is an object keyed by tool name. Multi-step calls are enabled with `stopWhen`.

## Signature / Usage

```ts
import { z } from 'zod';
import { generateText, tool, isStepCount } from 'ai';

const result = await generateText({
  model: __MODEL__,
  tools: {
    weather: tool({
      description: 'Get the weather in a location',
      inputSchema: z.object({
        location: z.string().describe('The location to get the weather for'),
      }),
      execute: async ({ location }) => ({
        location,
        temperature: 72 + Math.floor(Math.random() * 21) - 10,
      }),
    }),
  },
  stopWhen: isStepCount(5),
  prompt: 'What is the weather in San Francisco?',
});
```

Core tool elements (function tools and dynamic tools):

| Name | Type | Description |
| --- | --- | --- |
| description | string \| function | Optional. Can be a function deriving the description from the tool `context` and `experimental_sandbox`; resolved before each generation step. |
| inputSchema | Zod schema \| JSON schema | Defines the input parameters; consumed by the LLM and used to validate tool calls. |
| execute | async function | Optional. Called with the tool-call inputs. Optional so calls can be forwarded to the client or a queue. |
| strict | boolean | Optional. Enables strict tool calling when supported by the provider (default disabled; ignored by unsupported providers). |
| inputExamples | Array<{ input }> | Optional. Example inputs; only the Anthropic providers support them natively, others ignore. |

Call-level settings covered by the page: `toolChoice` (`auto` default / `required` / `none` / `{ type: 'tool', toolName }`), `activeTools` (names of active tools; default all), `toolOrder` (partial list sent first, rest alphabetical; `activeTools` filters first), `toolCallConcurrency` (positive integer; default concurrent execution), `toolApproval`, `repairToolCall`, `prepareStep`, `onStepEnd`, `onToolExecutionStart` / `onToolExecutionEnd`, `toolsContext`, `runtimeContext`, `experimental_sandbox`.

## Multi-step calls (stopWhen)

Built-in stop conditions: `isStepCount(count)` (default `isStepCount(1)` for `generateText` / `streamText`), `hasToolCall(...toolNames)`, `isLoopFinished()` (never triggers). `stopWhen` is only evaluated when the last step contains tool results. Access intermediate results via `steps`:

```ts
const { steps } = await generateText({
  model: __MODEL__,
  stopWhen: isStepCount(10),
  // ...
});

// extract all tool calls from the steps:
const allToolCalls = steps.flatMap(step => step.toolCalls);
```

## Tool execution approval

Configure approval with `toolApproval` on `generateText`, `streamText`, or `ToolLoopAgent`. Per-tool statuses: `'not-applicable'` (default; also `undefined` from a function), `'approved'`, `'denied'`, `'user-approval'`; object form `{ type, reason }`. A `GenericToolApprovalFunction` receives `toolCall`, `tools`, `toolsContext`, `messages`, `runtimeContext`; a `SingleToolApprovalFunction` receives the tool input and `toolCallId`, `messages`, `toolContext`, `runtimeContext`.

```ts
const result = await generateText({
  model: __MODEL__,
  tools: { runCommand },
  toolApproval: {
    runCommand: 'user-approval',
  },
  prompt: 'Remove the most recent file in the downloads folder',
});
```

Manual approval flow: the call returns `tool-approval-request` parts in `result.content`; add a `tool-approval-response` (`{ type, approvalId, approved, reason? }`) to a `role: 'tool'` message and call again.

```ts
const response: ToolApprovalResponse = {
  type: 'tool-approval-response',
  approvalId: part.approvalId,
  approved: true, // or false to deny
  reason: 'User confirmed the command', // Optional
};
messages.push({ role: 'tool', content: [response] });
```

## Other patterns

Dynamic tools and `TypedToolCall` / `TypedToolResult`:

```ts
import { dynamicTool } from 'ai';
import { z } from 'zod';

const customTool = dynamicTool({
  description: 'Execute a custom function',
  inputSchema: z.object({}),
  execute: async input => {
    const { action, parameters } = input as any;
    return { result: `Executed ${action}` };
  },
});
```

Preliminary tool results (async generator `execute`; last yielded value is the final result):

```ts
tool({
  description: 'Get the current weather.',
  inputSchema: z.object({ location: z.string() }),
  async *execute({ location }) {
    yield { status: 'loading' as const, text: `Getting weather for ${location}`, weather: undefined };
    const temperature = 72 + Math.floor(Math.random() * 21) - 10;
    yield { status: 'success' as const, text: `The weather in ${location} is ${temperature}°F`, temperature };
  },
});
```

Tool execution options (second `execute` parameter): `toolCallId`, `messages`, `abortSignal`, `context`, `experimental_sandbox`. Input lifecycle hooks: `onInputStart`, `onInputDelta` (streaming only), `onInputAvailable`. Multi-modal results use `toModelOutput`. Tool call repair uses `repairToolCall` (return `null` to skip repair):

```ts
repairToolCall: async ({ toolCall, tools, inputSchema, error }) => {
  if (NoSuchToolError.isInstance(error)) {
    return null; // do not attempt to fix invalid tool names
  }
  // ... generate repaired input, then:
  return { ...toolCall, input: JSON.stringify(repairedArgs) };
},
```

## Notes

- Tool errors: `NoSuchToolError`, `InvalidToolInputError`, `ToolCallRepairError`, `ToolChoiceViolationError` are thrown by `generateText`; errors thrown inside `execute` become `tool-error` content parts. `streamText` sends them in the stream (`tool-error` / `error` parts).
- Errors thrown inside `onToolExecutionStart` / `onToolExecutionEnd` are silently caught.
- `needsApproval` on `tool()` is deprecated; move approval logic to `toolApproval`. Provider-executed tools ignore `toolApproval`.
- When a tool is denied, consider a system instruction such as "When a tool execution is not approved, do not retry it". The approval `reason` is not a channel for passing data to an approved tool.
- `toolCallConcurrency` only limits SDK-executed local tools; provider options such as `parallelToolCalls` control model generation. On abort, queued tool calls are not started.
- `experimental_sandbox` is experimental and can change in patch releases; passing it does not sandbox the tool itself. `Experimental_SandboxSession` is only a contract; local `child_process.exec` is not a security boundary.
- Multi-modal tool results are experimental (Anthropic, OpenAI, Google Gemini 3 models).
- `telemetry.includeToolsContext` filters only telemetry; execution still receives the full tool context.
- The page also compares AI SDK tools vs MCP tools: prefer your own AI SDK tools for production (type safety, same-process execution, schema control); MCP tools suit rapid iteration and user-provided tools.

## Related

- [tool](./tool.md)
- [dynamicTool](./dynamic-tool.md)
- [Runtime and Tool Context](./runtime-and-tool-context.md)
- [Model Context Protocol (MCP)](./mcp-tools.md)
- [filterActiveTools](./filter-active-tools.md)
- [Loop Control](../agents/loop-control.md)
