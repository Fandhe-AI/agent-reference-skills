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

Methods: `generate()`, `stream()`. Utilities: `createModelCallToUIChunkTransform(options?)`, `toUIMessageChunk()`. Types: `ActiveTools`, `InferWorkflowAgentUIMessage`, `InferWorkflowAgentTools`.

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
| output | OutputSpecification | Default structured output specification. |
| repairToolCall | ToolCallRepairFunction | Repairs tool calls that fail to parse. Mark the function with `'use step'` in a workflow. |
| experimental_download | DownloadFunction | Default custom download function for URLs. Mark with `'use step'` in a workflow. |
| experimental_sandbox | Experimental_SandboxSession | Default sandbox session passed to tool descriptions and execution as `experimental_sandbox`, and exposed to `prepareStep`. |
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
| output | OutputSpecification | `Output.object({ schema })` or `Output.text()`. |
| timeout | number | Model-call deadline in ms; checked at dispatch and retry and kept across suspension. Does not cancel a tool waiting on a Workflow hook. |
| sendFinish | boolean | Send a `finish` chunk to the writable when done. Default: true. |
| preventClose | boolean | Prevent the writable from being closed after streaming. Default: false. |
| includeRawChunks | boolean | Include raw provider chunks. Default: false. |
| repairToolCall | ToolCallRepairFunction | Mark with `'use step'` in a workflow. |
| experimental_transform | StreamTextTransform \| Array<StreamTextTransform> | Factories applied in order to raw provider events; each must synchronously return a `TransformStream` and be marked `'use step'` in a workflow. |
| experimental_download | DownloadFunction | Custom download function. |
| experimental_sandbox | Experimental_SandboxSession | Overrides the constructor default. |
| experimental_toolApprovalSecret | WorkflowToolApprovalSecret | Overrides the constructor default. |
| telemetry | TelemetryOptions | Per-call telemetry. |
| runtimeContext / toolsContext | Context / InferToolSetContext<TTools> | Override constructor defaults; must be serializable. |
| prepareStep | PrepareStepCallback | Per-call override. |
| onStart / experimental_onStart / onStepStart / experimental_onStepStart / onToolExecutionStart / onToolExecutionEnd / onStepEnd / onStepFinish / onEnd | callbacks | Per-call callbacks; both constructor and per-call fire (constructor first). |
| onError | WorkflowAgentOnErrorCallback | Invoked when an error occurs during streaming. |
| onAbort | WorkflowAgentOnAbortCallback | Invoked when aborted; receives all previously finished steps. |

`stream()` returns `Promise<WorkflowAgentStreamResult>`:

| Name | Type | Description |
| --- | --- | --- |
| messages | Array<ModelMessage> | Final messages including all tool calls and results. |
| steps | Array<StepResult> | Details for all steps. |
| toolCalls | Array<ToolCall> | Tool calls from the last step, including unexecuted ones (e.g. requiring approval). |
| toolResults | Array<ToolResult> | Tool results from the last step (executed tools only). |
| error | unknown \| undefined | Original value from a model stream error part; use `'error' in result` to distinguish an undefined value. |
| output | OUTPUT | Structured output if an `output` specification was provided. |

`generate()` accepts `WorkflowAgentGenerateOptions` (shares prompt/messages, instructions, generation settings, tools and runtime context, preparation, stopping, output and lifecycle options with `stream()`; does not accept `writable`, `includeRawChunks`, `experimental_transform`, `sendFinish`, or `preventClose`). `include` accepts `requestBody`, `responseBody`, `requestMessages` booleans (all default `false`). Returns `Promise<WorkflowAgentGenerateResult>` with `GenerateTextResult` semantics: `text` / `finishReason` / `rawFinishReason` / `finalStep` describe the final step; `content`, `files`, `sources`, `warnings`, tool calls and results cover all steps; `usage` / `totalUsage` sum all steps; `responseMessages` includes generated messages; `output` defaults to text and throws `NoOutputGeneratedError` when unavailable.

## Notes

- Use the result API inside workflow code and return selected serializable fields (e.g. `text`, `usage`) through `run.returnValue`; returning the whole result class is not supported. Performance data currently measures the model response; complete tool/step timing is not yet reported.
- `generate()` rejects on failure; the end callback runs before complete-output parsing, so a parsing failure can reject after `onEnd` has run.
- Approval requests appear in `content` and `responseMessages` without requiring a writable. To continue, append `responseMessages` to the original history and add a tool message with the user's `tool-approval-response`; preserve the request signature and tool-call input and use the same `experimental_toolApprovalSecret` reference.
- `repairToolCall` runs inside the model step; define it as a function with a `'use step'` directive (set on the constructor or `stream()`). An ordinary inline callback causes a serialization error. Return the repaired tool call, or `null` if repair cannot be completed.
- `experimental_transform` factories must also use `'use step'` and return a `TransformStream` synchronously; keep captured values serializable.
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
