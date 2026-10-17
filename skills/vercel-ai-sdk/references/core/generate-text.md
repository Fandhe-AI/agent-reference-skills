---
source: https://ai-sdk.dev/docs/reference/ai-sdk-core/generate-text
---

# generateText

Generates text and calls tools for a given prompt using a language model. Ideal for non-interactive use cases such as automation tasks (drafting email, summarizing web pages) and for agents that use tools.

## Signature / Usage

```ts
import { generateText } from 'ai';

const { text } = await generateText({
  model,
  prompt: 'Invent a new holiday and describe its traditions.',
});

console.log(text);
```

## Options / Props

Top-level parameters (nested message-part and tool-definition schemas are summarized; see the official page for the full nested tables).

| Name | Type | Description |
| --- | --- | --- |
| model | `LanguageModel` | The language model to use. Example: `openai('gpt-6-astra')` |
| instructions | `Instructions` | Instructions that specify the behavior of the model. |
| prompt | `string \| Array<SystemModelMessage \| UserModelMessage \| AssistantModelMessage \| ToolModelMessage>` | The input prompt to generate the text from. |
| messages | `Array<SystemModelMessage \| UserModelMessage \| AssistantModelMessage \| ToolModelMessage>` | A list of messages that represent a conversation. Automatically converts UI messages from the useChat hook. (Message shapes: see ModelMessage page.) |
| allowSystemInMessages | `boolean` (Optional) | Whether system messages are allowed in `prompt` or `messages`. Defaults to false. System messages in `instructions` are always allowed. Enabling this for user-controlled messages can create a prompt injection risk. |
| tools | `ToolSet` | Tools accessible to and callable by the model. The model needs to support calling tools. Each `Tool` has `description` (string, or function of `{ context, experimental_sandbox? }`), `inputSchema` (Zod Schema \| JSON Schema), and `execute` (`async (parameters: T, options: ToolExecutionOptions) => RESULT`, optional; `ToolExecutionOptions` has `toolCallId`, `messages`, `abortSignal`). |
| toolChoice | `"auto" \| "none" \| "required" \| { "type": "tool", "toolName": string }` (Optional) | How tools are selected. Default `"auto"`. `"none"` disables tool execution, `"required"` requires tools to be executed. |
| maxOutputTokens | `number` (Optional) | Maximum number of tokens to generate. |
| temperature | `number` (Optional) | Passed through to the provider. Set either `temperature` or `topP`, but not both. |
| topP | `number` (Optional) | Nucleus sampling. Set either `temperature` or `topP`, but not both. |
| topK | `number` (Optional) | Only sample from the top K options for each subsequent token. Advanced use only. |
| presencePenalty | `number` (Optional) | Likelihood of repeating information already in the prompt. |
| frequencyPenalty | `number` (Optional) | Likelihood of repeatedly using the same words or phrases. |
| stopSequences | `string[]` (Optional) | Sequences that stop generation. |
| seed | `number` (Optional) | Integer seed for random sampling. |
| reasoning | `'provider-default' \| 'none' \| 'minimal' \| 'low' \| 'medium' \| 'high' \| 'xhigh' \| 'max'` (Optional) | How much reasoning the model performs. When omitted the provider default is used. Providers that do not support reasoning emit a warning. Provider-specific settings take precedence over corresponding mapped fields. |
| maxRetries | `number` (Optional) | Maximum number of retries. Set to 0 to disable retries. Default: 2. |
| abortSignal | `AbortSignal` (Optional) | Cancel the call. |
| timeout | `number \| { totalMs?: number; stepMs?: number; toolMs?: number; tools?: Partial<Record<`${toolName}Ms`, number>> }` (Optional) | Timeout in milliseconds. `totalMs` for the entire call, `stepMs` per step (model generation, retries, local tool execution), `toolMs` default for all tool executions, `tools` per-tool overrides (e.g. `weatherMs`). A timed-out tool aborts and returns a tool-error. Can be used alongside `abortSignal`. |
| headers | `Record<string, string \| undefined>` (Optional) | Additional HTTP headers. Only applicable for HTTP-based providers. |
| telemetry | `TelemetryOptions` (Optional) | `isEnabled` (enabled by default; `false` to opt out), `recordInputs`, `recordOutputs`, `functionId`, `includeRuntimeContext`, `includeToolsContext` (excluded unless explicitly `true`), `integrations` (`Telemetry \| Telemetry[]`; replaces globally registered integrations for this call). |
| providerOptions | `Record<string,JSONObject> \| undefined` (Optional) | Provider-specific options. Outer key is the provider name. |
| activeTools | `ActiveTools<TOOLS>` (Optional) | Limits the tools available for the model to call without changing tool call and result types. All tools active by default. |
| toolOrder | `ToolOrder<TOOLS>` (Optional) | Order in which tools are sent to the provider. Partial list allowed; unlisted tools follow alphabetically. |
| toolCallConcurrency | `number` (Optional) | Maximum number of tool calls executed concurrently within a step. `1` executes sequentially in model-generated order. Positive integer. By default all execute concurrently. |
| toolApproval | `ToolApprovalConfiguration<TOOLS, RUNTIME_CONTEXT>` (Optional) | Approval configuration for this call. A `GenericToolApprovalFunction` handling all tool calls, or a per-tool object whose keys are a status (`'not-applicable'`, `'approved'`, `'denied'`, `'user-approval'`), an object form such as `{ type: 'denied', reason: 'blocked by policy' }`, or a `SingleToolApprovalFunction`. Takes precedence over a tool's `needsApproval` default. A function may return `undefined` for the same effect as `'not-applicable'`. |
| experimental_toolCallers | `Experimental_ToolCallers<TOOLS>` (Optional) | Configures which caller tools may invoke each tool; keyed by callee tool name; include `'direct'` to keep a tool directly callable by the model. |
| experimental_refineToolInput | `ToolInputRefinement<TOOLS>` (Optional) | Mapping of tool names to functions that refine parsed tool inputs; the refined input is used for execution, output parts, lifecycle callbacks, and telemetry. |
| stopWhen | `StopCondition<TOOLS> \| Array<StopCondition<TOOLS>>` (Optional) | Condition for stopping when there are tool results in the last step. With an array, any condition stops generation. Default: `isStepCount(1)`. |
| prepareStep | `(options: PrepareStepOptions) => PrepareStepResult<TOOLS> \| Promise<PrepareStepResult<TOOLS>>` (Optional) | Provide different settings for a step. See below. |
| runtimeContext | `CONTEXT` (Optional) | User-defined shared runtime context passed to `prepareStep` and lifecycle callbacks. |
| toolsContext | `InferToolSetContext<TOOLS>` | Per-tool context map keyed by tool name. Required when at least one tool defines `contextSchema`; not accepted when no tools need context. |
| experimental_sandbox | `Experimental_SandboxSession` (Optional) | Experimental sandbox passed through to `prepareStep`, tool description functions, and tool execution. |
| experimental_download | `(requestedDownloads: Array<{ url: URL; isUrlSupportedByModel: boolean }>) => Promise<Array<null \| { data: Uint8Array; mediaType?: string }>>` (Optional) | Custom download function for URLs in prompts. Return `null` to pass the URL directly to the model (when supported). Experimental. |
| include | `{ requestBody?: boolean; requestMessages?: boolean; responseBody?: boolean }` (Optional) | Request bodies, request messages, and response bodies are excluded from step results by default to reduce memory usage; set to `true` to include. |
| repairToolCall | `(options: ToolCallRepairOptions) => Promise<LanguageModelV4ToolCall \| null>` (Optional) | Attempt to repair a tool call that failed to parse. Options: `instructions`, `system` (deprecated, use `instructions`), `messages`, `toolCall`, `tools`, `inputSchema({ toolName })`, `error` (`NoSuchToolError \| InvalidToolInputError`), `abortSignal`. Return a repaired tool call or `null`. |
| output | `Output` (Optional) | Specification for parsing structured outputs: `Output.text()` (default), `Output.object({ schema, name?, description? })`, `Output.array({ element, minItems?, maxItems?, name?, description? })` (`maxItems` must be >= `minItems`), `Output.choice({ options, name?, description? })`, `Output.json({ name?, description? })`. |
| onStart | `(event: GenerateTextStartEvent) => PromiseLike<void> \| void` (Optional) | Called when the operation begins, before any LLM calls. Errors thrown in this callback are silently caught. |
| onStepStart | callback (Optional) | Called before each step. |
| onLanguageModelCallStart | `(event: LanguageModelCallStartEvent) => ...` (Optional) | Called immediately before the provider model call. |
| onLanguageModelCallEnd | `(event: LanguageModelCallEndEvent) => ...` (Optional) | Called after the model response is normalized and parsed. |
| onToolExecutionStart | `(event: ToolExecutionStartEvent) => ...` (Optional) | Called before a tool's `execute` runs. |
| onToolExecutionEnd | `(event: ToolExecutionEndEvent) => ...` (Optional) | Called after a tool's `execute` completes or errors. |
| experimental_onToolCallStart | `(event: ToolExecutionStartEvent) => ...` (Optional) | Deprecated. Use `onToolExecutionStart`. Fallback only when `onToolExecutionStart` is not provided. |
| experimental_onToolCallFinish | `(event: ToolExecutionEndEvent) => ...` (Optional) | Deprecated. Use `onToolExecutionEnd`. Fallback only when `onToolExecutionEnd` is not provided. |
| onStepEnd | `(stepResult: StepResult<TOOLS>) => Promise<void> \| void` (Optional) | Called when a step ends. Receives a `StepResult`. |
| onStepFinish | `GenerateTextOnStepFinishCallback<TOOLS>` (Optional) | Deprecated. Use `onStepEnd`. Fallback only when `onStepEnd` is not provided. |
| onEnd | `(event: GenerateTextEndEvent<TOOLS>) => PromiseLike<void> \| void` (Optional) | Called when the entire generation completes. Includes the final step result properties (excluding direct `performance`) plus aggregated data; use `event.steps` for per-step performance. |
| onFinish | callback (Optional) | Deprecated alias for `onEnd`. |

#### prepareStep

`PrepareStepOptions`: `steps` (executed so far), `stepNumber`, `model`, `instructions` (an instructions override carries forward to later steps), `initialInstructions`, `messages` (a messages override carries forward), `runtimeContext`, `toolsContext`, `experimental_sandbox`.

`PrepareStepResult<TOOLS>` (all optional; omitted values use the top-level value): `model`, `maxOutputTokens`, `temperature`, `topP`, `topK`, `presencePenalty`, `frequencyPenalty`, `stopSequences`, `seed`, `reasoning`, `toolChoice`, `activeTools`, `toolOrder`, `instructions`, `messages`, `runtimeContext` (affects this step and all subsequent steps), `toolsContext` (affects this and subsequent steps), `experimental_sandbox` (this step only), `providerOptions` (e.g. container IDs for Anthropic code execution).

### Returns

| Name | Type | Description |
| --- | --- | --- |
| content | `Array<ContentPart<TOOLS>>` | Content generated in all steps. Text parts can include an optional `citations` array. |
| text | `string` | Concatenation of all text parts of the final step; empty string if none. Inspect `finalStep.content` to distinguish. |
| reasoning | `Array<ReasoningOutput \| ReasoningFileOutput>` | Deprecated. Use `finalStep.reasoning`. |
| reasoningText | `string \| undefined` | Deprecated. Use `finalStep.reasoningText`. |
| sources | `Array<Source>` | Sources used as input; accumulated from all steps. `Source` has `sourceType: 'url'`, `id`, `url`, `title?`, `providerMetadata?`. |
| files | `Array<GeneratedFile>` | Files generated in all steps (`base64`, `uint8Array`, `mediaType`). |
| toolCalls | `ToolCallArray<TOOLS>` | Tool calls made in all steps. |
| toolResults | `ToolResultArray<TOOLS>` | Results of the tool calls from all steps. |
| staticToolCalls / dynamicToolCalls | `Array<StaticToolCall<TOOLS>>` / `Array<DynamicToolCall>` | Static / dynamic tool calls executed in all steps. |
| staticToolResults / dynamicToolResults | `Array<StaticToolResult<TOOLS>>` / `Array<DynamicToolResult>` | Static / dynamic tool results generated in all steps. |
| finishReason | `'stop' \| 'length' \| 'content-filter' \| 'tool-calls' \| 'error' \| 'other'` | Why the model finished. |
| rawFinishReason | `string \| undefined` | Raw finish reason from the provider. |
| usage | `LanguageModelUsage` | Total token usage of all steps: `inputTokens`, `inputTokenDetails` (`noCacheTokens`, `cacheReadTokens`, `cacheWriteTokens`), `outputTokens`, `outputTokenDetails` (`textTokens`, `reasoningTokens`), `totalTokens`, `raw`. |
| totalUsage | `LanguageModelUsage` | Deprecated. Use `usage`. |
| request | `LanguageModelRequestMetadata` | Deprecated. Use `finalStep.request` (`messages?` undefined unless `requestMessages` is true, `body?`). |
| response | `LanguageModelResponseMetadata` | Deprecated. Use `finalStep.response` (`id`, `modelId`, `timestamp`, `headers?`, `body?`, `messages`). |
| warnings | `Warning[] \| undefined` | Warnings from the model provider in all steps. |
| responseMessages | `Array<ResponseMessage>` | Accumulated response messages of all steps. |
| providerMetadata | `ProviderMetadata \| undefined` | Deprecated. Use `finalStep.providerMetadata`. |
| output | `InferCompleteOutput<OUTPUT>` | Output per the `output` specification. Accessing it throws `NoOutputGeneratedError` when no output is available (e.g. final step does not finish with `stop`). |
| steps | `Array<StepResult<TOOLS>>` | Response information for every step. |
| finalStep | `StepResult<TOOLS>` | The final step; shortcut for `steps.at(-1)`. |

### Types

```ts
type ActiveTools<TOOLS extends ToolSet> =
  | ReadonlyArray<keyof TOOLS & string>
  | undefined;
```

`undefined` means no tool restriction is applied.

## Notes

- Several result properties (`reasoning`, `reasoningText`, `request`, `response`, `providerMetadata`, `totalUsage`) and callbacks (`onStepFinish`, `onFinish`, `experimental_onToolCallStart`, `experimental_onToolCallFinish`) are deprecated; replacements are listed above.
- `experimental_*` options (`experimental_toolCallers`, `experimental_refineToolInput`, `experimental_sandbox`, `experimental_download`) are experimental and may change in incremental package releases.
- For `runtimeContext`, `toolsContext`, tool `context`, and sensitive context filtering, see the Runtime and Tool Context guide.

## Related

- [streamText](./stream-text.md)
- [Generating Text](./generating-text.md)
- [Lifecycle Callbacks](./lifecycle-callbacks.md)
- [Output](./output.md)
- [ModelMessage](./model-message.md)
