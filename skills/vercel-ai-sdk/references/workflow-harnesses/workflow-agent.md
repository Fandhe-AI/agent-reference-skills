---
source: https://ai-sdk.dev/docs/reference/ai-sdk-workflow/workflow-agent
---

# WorkflowAgent

Creates a durable, resumable AI agent for use inside a workflow. `WorkflowAgent` handles the agent loop, tool schema serialization across workflow step boundaries, and built-in tool approval flows.

## Signature / Usage

```ts
import { WorkflowAgent } from '@ai-sdk/workflow';
import { tool } from 'ai';
import { z } from 'zod';

const agent = new WorkflowAgent({
  model: 'anthropic/claude-sonnet-5.5',
  instructions: 'You are a helpful assistant.',
  tools: {
    weather: tool({
      description: 'Get the weather in a location',
      inputSchema: z.object({
        location: z.string(),
      }),
      execute: async ({ location }) => ({
        location,
        temperature: 72,
      }),
    }),
  },
});

const result = await agent.stream({
  messages: [
    {
      role: 'user',
      content: [{ type: 'text', text: 'What is the weather in NYC?' }],
    },
  ],
});

console.log(result.messages);
```

`WorkflowAgent` does not implement the `Agent` interface, and its options, callbacks, and results differ from `ToolLoopAgent`; see the WorkflowAgent guide (Differences from ToolLoopAgent).

Methods: `generate()`, `stream()`. Utilities: `createModelCallToUIChunkTransform(options?)`, `toUIMessageChunk()`. Types: `ActiveTools`, `WorkflowAgentTimeoutConfiguration`, `InferWorkflowAgentUIMessage`, `InferWorkflowAgentTools`.

## Options / Props

Constructor parameters (all optional unless noted):

| Name | Type | Description |
| --- | --- | --- |
| id | string | The id of the agent. |
| model (required) | LanguageModel | A string compatible with the Vercel AI Gateway (e.g. `'anthropic/claude-sonnet-5.5'`) or a provider instance (e.g. `openai('gpt-6-astra')`). |
| instructions | Instructions | System prompt. Supports provider-specific options (e.g. caching) when using the `SystemModelMessage` form. |
| tools | Record<string, Tool> | Tools the agent can call. Serialized to JSON Schema across workflow step boundaries and validated with Ajv at runtime. |
| toolChoice | ToolChoice | `'auto' \| 'none' \| 'required' \| { type: 'tool', toolName: string }`. Default: `'auto'`. |
| stopWhen | StopCondition \| StopCondition[] | Default stop condition. When omitted, generate defaults to 20 steps, while stream has no maximum step count. Per-call values override. |
| toolCallConcurrency | number | Max local tool calls executing concurrently within a step, including approved calls. Positive integer; `1` = sequential in model order. Default unlimited. Can be changed by `prepareCall`; explicit call options take precedence. Provider-executed tools unaffected. |
| activeTools | ActiveTools<TTools> | Default set of active tools; limits which tools the model can call without changing tool call and result types. |
| toolOrder | ToolOrder<TTools> | Controls the order in which tools are sent to the provider. The list can be partial. Tools not listed in `toolOrder` are sent after the listed tools, sorted alphabetically. Tool names are restricted to the string keys of the tool set. |
| output | OutputSpecification | Default structured output specification. |
| repairToolCall | ToolCallRepairFunction | Repairs tool calls that fail to parse. Mark the function with `'use step'` in a workflow. |
| experimental_refineToolInput | ToolInputRefinement<TTools> | Optional mapping of tool names to functions that refine parsed tool inputs. Each function receives the typed input for its tool and must return the same input type shape. The refined input is used for tool execution, output parts, lifecycle callbacks, and telemetry in both `generate()` and `stream()`. Per-stream values override this default. |
| experimental_download | DownloadFunction | Default custom download function for URLs. Mark the function with `'use step'` when used in a workflow and create any fetch transport inside the step rather than passing it across workflow boundaries. Per-stream values override this default. For untrusted URLs, see Secure URL Fetching (`/docs/advanced/secure-url-fetching#core-file-downloads`). |
| experimental_sandbox | Experimental_SandboxSession | Default sandbox session passed to tool descriptions and execution as `experimental_sandbox`, and exposed to `prepareStep`. |
| toolApproval | ToolApprovalConfiguration<TTools, TRuntimeContext> | Default approval configuration for tool calls. Pass a `GenericToolApprovalFunction` to handle all tool calls in one callback with `toolCall`, `tools`, `toolsContext`, `messages`, and `runtimeContext`, or pass a per-tool object where each key can be a status (`'not-applicable'`, `'approved'`, `'denied'`, or `'user-approval'`), an object form such as `{ type: 'denied', reason: 'blocked by policy' }`, or a `SingleToolApprovalFunction` that receives the tool input and options `toolCallId`, `messages`, `toolContext`, and `runtimeContext`. This setting takes precedence over a tool's `needsApproval` default. The functions in the configuration run in workflow context, outside of the durable model steps, and are never passed across a step boundary. Per-stream values override this default. |
| experimental_toolApprovalSecret | WorkflowToolApprovalSecret | Workflow-safe reference to the environment variable holding the secret used to HMAC-sign tool approval requests and verify approved message history before tool execution. Only the env var name crosses workflow boundaries. |
| prepareStep | PrepareStepCallback | Called before each step; modify settings, manage context, inject messages, or override `experimental_sandbox` for the step. |
| prepareCall | PrepareCallCallback | Called once before the loop starts; transform model, instructions, tools configuration or other settings. Cannot override `tools`. |
| runtimeContext | Context | Default shared runtime context; flows through `prepareStep`, lifecycle callbacks, step results. Must be serializable. |
| toolsContext | InferToolSetContext<TTools> | Default per-tool context map; each tool receives only its own validated entry as `context`. Must be serializable. |
| telemetry | TelemetryOptions | Telemetry configuration. |
| onStart | WorkflowAgentOnStartCallback | Called when the agent starts streaming, before any LLM calls. Event: `model`, `messages`, `runtimeContext`, `toolsContext`. Takes precedence over `experimental_onStart`. |
| experimental_onStart | WorkflowAgentOnStartCallback | Deprecated alias for `onStart`. |
| onStepStart | WorkflowAgentOnStepStartCallback | Before each step. Event: `model`, `messages`, `steps`, `runtimeContext`, `toolsContext`. |
| experimental_onStepStart | WorkflowAgentOnStepStartCallback | Deprecated alias for `onStepStart`. |
| onToolExecutionStart | WorkflowAgentOnToolExecutionStartCallback | Right before a tool's execute runs. Event: `toolCall`, `stepNumber`, `messages`, `toolContext`. Experimental (can break in patch releases). |
| onToolExecutionEnd | WorkflowAgentOnToolExecutionEndCallback | Right after a tool's execute completes or errors. Event: `toolCall`, `stepNumber`, `durationMs`, `messages`, `toolContext`, `success`, `output` (when success), `error` (when failure). Experimental. |
| onStepEnd | WorkflowAgentOnStepEndCallback | After each step completes. |
| onStepFinish | WorkflowAgentOnStepFinishCallback | Deprecated. Use `onStepEnd`. |
| onEnd | WorkflowAgentOnEndCallback | When all steps are finished. Receives steps, messages, text, finish reason, total usage, and context. |
| onError | WorkflowAgentOnErrorCallback | Called when an error occurs. Aborts are not reported. If also specified in `generate()` or `stream()`, both callbacks fire (constructor first). Errors thrown by the callback are ignored. |
| onAbort | WorkflowAgentOnAbortCallback | Called when the operation is aborted. Receives all previously finished steps. If also specified in `generate()` or `stream()`, both callbacks fire (constructor first). Errors thrown by the callback are ignored. |
| maxOutputTokens | number | Maximum tokens to generate. |
| temperature | number | Sampling temperature. |
| topP | number | Top-p sampling. |
| topK | number | Top-k sampling. |
| presencePenalty | number | Presence penalty. |
| frequencyPenalty | number | Frequency penalty. |
| stopSequences | string[] | Custom stop sequences. |
| seed | number | Seed for deterministic generation (if supported). |
| maxRetries | number | Retries of retryable model-call failures; `0` disables. Retry-After headers are respected; durable workflow step retries are not stacked. Default: 2. |
| headers | Record<string, string \| undefined> | Additional HTTP headers (HTTP-based providers only). |
| providerOptions | ProviderOptions | Additional provider-specific configuration. |
| reasoning | LanguageModelV4CallOptions['reasoning'] | Reasoning effort for the model. Controls how much reasoning the model performs before it generates a response. |
| abortSignal | AbortSignal | Default abort signal for every call on this agent. An `abortSignal` passed to `generate()` or `stream()` overrides it. |
| allowSystemInMessages | boolean | Whether system messages are allowed in the `prompt` or `messages` fields. When `false`, system messages in `prompt` or `messages` are rejected and must be provided through `instructions`. Default: false. |

Read-only properties: `id` (`string | undefined`), `tools` (`Record<string, Tool>`).

`stream()` parameters:

| Name | Type | Description |
| --- | --- | --- |
| prompt | string \| Array<ModelMessage> | Use either `prompt` or `messages`, not both. |
| messages | Array<ModelMessage> | Conversation messages. |
| writable | WritableStream<ModelCallStreamPart> | Receives raw model stream parts in real time. Convert with `createModelCallToUIChunkTransform()`. |
| instructions | Instructions | Override the agent instructions for this call. |
| system | string | Deprecated. Use `instructions`. |
| stopWhen | StopCondition \| StopCondition[] | When omitted and no constructor-level condition, no maximum step count. |
| toolChoice | ToolChoice | Override for this call. Default: `'auto'`. |
| toolCallConcurrency | number | Override local tool concurrency; takes precedence over constructor and `prepareCall`. |
| activeTools | ActiveTools<TTools> | Limits tools for this call. |
| toolOrder | ToolOrder<TTools> | Controls the order in which tools are sent to the provider. The list can be partial. Tools not listed in `toolOrder` are sent after the listed tools, sorted alphabetically. Tool names are restricted to the string keys of the tool set. |
| output | OutputSpecification | `Output.object({ schema })` or `Output.text()`. |
| timeout | WorkflowAgentTimeoutConfiguration | Timeout for model calls. A number, or `totalMs` in the object form, is one deadline in milliseconds for the whole run. Inside a workflow, the absolute deadline is checked at dispatch and retry and remains in effect across suspension. `stepMs` limits each model call. `firstChunkMs` limits the wait for the first output of each model call, and `chunkMs` limits the wait between two outputs. A timeout does not cancel a tool waiting on a Workflow hook; use run.cancel() to stop the suspended run. |
| sendFinish | boolean | Send a `finish` chunk to the writable when done. Default: true. |
| preventClose | boolean | Prevent the writable from being closed after streaming. Default: false. |
| includeRawChunks | boolean | Include raw provider chunks. Default: false. |
| repairToolCall | ToolCallRepairFunction | Mark with `'use step'` in a workflow. |
| experimental_refineToolInput | ToolInputRefinement<TTools> | Optional mapping of tool names to functions that refine parsed tool inputs. Each function receives the typed input for its tool and must return the same input type shape. The refined input is used for tool execution, output parts, lifecycle callbacks, and telemetry in both `generate()` and `stream()`. Overrides the constructor default. |
| experimental_download | DownloadFunction | Custom download function for fetching files/URLs. Mark the function with `'use step'` when used in a workflow. For untrusted URLs, see Secure URL Fetching (`/docs/advanced/secure-url-fetching#core-file-downloads`). |
| experimental_sandbox | Experimental_SandboxSession | Overrides the constructor default. |
| toolApproval | ToolApprovalConfiguration<TTools, TRuntimeContext> | Approval configuration for tool calls. Pass a `GenericToolApprovalFunction` to handle all tool calls in one callback with `toolCall`, `tools`, `toolsContext`, `messages`, and `runtimeContext`, or pass a per-tool object where each key can be a status (`'not-applicable'`, `'approved'`, `'denied'`, or `'user-approval'`), an object form such as `{ type: 'denied', reason: 'blocked by policy' }`, or a `SingleToolApprovalFunction` that receives the tool input and options `toolCallId`, `messages`, `toolContext`, and `runtimeContext`. This setting takes precedence over a tool's `needsApproval` default. The functions in the configuration run in workflow context, outside of the durable model steps, and are never passed across a step boundary. Overrides the constructor default. |
| experimental_toolApprovalSecret | WorkflowToolApprovalSecret | Overrides the constructor default. |
| telemetry | TelemetryOptions | Per-call telemetry. |
| runtimeContext / toolsContext | Context / InferToolSetContext<TTools> | Override constructor defaults; must be serializable. |
| prepareStep | PrepareStepCallback | Per-call override. |
| onStart / experimental_onStart / onStepStart / experimental_onStepStart / onToolExecutionStart / onToolExecutionEnd / onStepEnd / onStepFinish / onEnd | callbacks | Per-call callbacks; both constructor and per-call fire (constructor first). |
| onError | WorkflowAgentOnErrorCallback | Invoked when an error occurs. Aborts are not reported. If also specified in the constructor, both callbacks fire (constructor first). Errors thrown by the callback are ignored. |
| onAbort | WorkflowAgentOnAbortCallback | Invoked when the operation is aborted. Receives all previously finished steps. If also specified in the constructor, both callbacks fire (constructor first). Errors thrown by the callback are ignored. |

In addition to the options in the table, `stream()` accepts the generation settings of the constructor (`maxOutputTokens`, `temperature`, `topP`, `topK`, `presencePenalty`, `frequencyPenalty`, `stopSequences`, `seed`, `reasoning`, `maxRetries`, `headers`, `providerOptions`) and `abortSignal`. A value passed to `stream()` overrides the constructor value.

`stream()` returns `Promise<WorkflowAgentStreamResult>`:

| Name | Type | Description |
| --- | --- | --- |
| messages | Array<ModelMessage> | Final messages including all tool calls and results. |
| steps | Array<StepResult> | Details for all steps. |
| toolCalls | Array<ToolCall> | Tool calls from the last step, including unexecuted ones (e.g. requiring approval). |
| toolResults | Array<ToolResult> | Tool results from the last step (executed tools only). |
| finishReason | FinishReason | The finish reason of the last step. |
| totalUsage | LanguageModelUsage | The token usage of all steps combined. |
| error | unknown \| undefined | Original value from a model stream error part; use `'error' in result` to distinguish an undefined value. |
| output | OUTPUT | Structured output if an `output` specification was provided. |

`generate()` accepts `WorkflowAgentGenerateOptions` (shares prompt/messages, instructions, generation settings, tools and runtime context, preparation, stopping, output and lifecycle options with `stream()`; does not accept `writable`, `includeRawChunks`, `sendFinish`, or `preventClose`). `include` accepts `requestBody`, `responseBody`, `requestMessages` booleans (all default `false`). Returns `Promise<WorkflowAgentGenerateResult>` with `GenerateTextResult` semantics: `text` / `finishReason` / `rawFinishReason` / `finalStep` describe the final step; `content`, `files`, `sources`, `warnings`, tool calls and results cover all steps; `usage` / `totalUsage` sum all steps; `responseMessages` includes generated messages; `output` defaults to text and throws `NoOutputGeneratedError` when unavailable.

## Notes

- Use the result API inside workflow code and return selected serializable fields (e.g. `text`, `usage`) through `run.returnValue`; returning the whole result class is not supported. Performance data currently measures the model response; complete tool/step timing is not yet reported.
- `generate()` rejects on failure; the end callback runs before complete-output parsing, so a parsing failure can reject after `onEnd` has run.
- Approval requests appear in `content` and `responseMessages` without requiring a writable. To continue, append `responseMessages` to the original history and add a tool message with the user's `tool-approval-response`; preserve the request signature and tool-call input and use the same `experimental_toolApprovalSecret` reference.
- `repairToolCall` runs inside the model step; define it as a function with a `'use step'` directive (set on the constructor or `stream()`). An ordinary inline callback causes a serialization error. Return the repaired tool call, or `null` if repair cannot be completed.
- `experimental_transform` was removed from `WorkflowAgent` (`generate()` and `stream()`) in ai@7.0.173, together with the official `experimental_transform` in a workflow section. The guide's Differences table says to transform `run.readable` with `pipeThrough()` where you create the response.
- `WorkflowAgentTimeoutConfiguration` is `number | { totalMs?: number; stepMs?: number; firstChunkMs?: number; chunkMs?: number }`, the `timeout` option of `generate()` and `stream()`. A number is the total deadline in milliseconds. `generate()` uses `totalMs` and `stepMs`. `stream()` uses all four values.
- Tool approval is configured on the tool definition with `needsApproval` or on the agent with `toolApproval`; `toolApproval` takes precedence over `needsApproval`.
- Source: https://ai-sdk.dev/docs/reference/ai-sdk-workflow/workflow-agent (ai@7.0.173)
- `uiStartIndex` of `createModelCallToUIChunkTransform` must be a non-negative safe integer; raw model stream parts and UI message chunks are not one-to-one, so do not pass a UI chunk index to `getReadable`. Negative tail indexes require a durable stream that already stores `UIMessageChunk` objects.
- `toUIMessageChunk()` converts one `ModelCallStreamPart` to a `UIMessageChunk`, returning `undefined` for parts that do not map to UI chunks.
- Unlike `ToolLoopAgent`, do not place functions, class instances, symbols, database clients, or SDK clients in context.
- Stability: `experimental_*` options and `onToolExecutionStart` / `onToolExecutionEnd` can break in patch releases.
- Distance: the Vercel platform side of Workflow (deployment, dashboards) is covered by the vercel skill; durable-step engines such as `step.ai.wrap` are covered by the inngest skill.

## Related

- [WorkflowAgent guide](./workflow-agent-guide.md)
- [WorkflowChatTransport](./workflow-chat-transport.md)
- [ToolLoopAgent](../agents/tool-loop-agent.md)
- [isLoopFinished](../agents/loop-finished.md)
