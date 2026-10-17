---
source: https://ai-sdk.dev/docs/reference/ai-sdk-core/tool-loop-agent
---

# ToolLoopAgent

Creates a reusable AI agent capable of generating text, streaming responses, and using tools over multiple steps (a reasoning-and-acting loop). Unlike single-step calls like `generateText()`, an agent can iteratively invoke tools, collect tool results, and decide next actions until completion or user approval is required.

## Signature / Usage

```ts
import { ToolLoopAgent } from 'ai';

const agent = new ToolLoopAgent({
  model,
  instructions: 'You are a helpful assistant.',
  tools: {
    weather: weatherTool,
    calculator: calculatorTool,
  },
});

const result = await agent.generate({
  prompt: 'What is the weather in NYC?',
});

console.log(result.text);
```

For agents, `runtimeContext` is the shared runtime state that flows through the loop. Pass `experimental_sandbox` to `generate()` or `stream()` when tools need access to a command or code execution environment.

## Options / Props

Constructor parameters:

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `model` | `LanguageModel` | — | Required. The language model instance to use (e.g., from a provider). |
| `instructions` | `Instructions` | — | Optional. Instructions for the agent, usually used for system prompt/context. |
| `allowSystemInMessages` | `boolean` | — | Optional. Whether `role: "system"` messages are allowed in the `prompt` or `messages` fields. When unset, system messages are rejected because they can create a prompt injection attack risk. Ideally, use `instructions`. Set to `true` to allow, or `false` to explicitly reject. |
| `tools` | `Record<string, Tool>` | — | Optional. A set of tools the agent can call. Keys are tool names. Tools require the underlying model to support tool calling. |
| `toolChoice` | `ToolChoice` | `'auto'` | Optional. Tool call selection strategy: `'auto' \| 'none' \| 'required' \| { type: 'tool', toolName: string }`. |
| `stopWhen` | `StopCondition \| StopCondition[]` | `isStepCount(20)` | Optional. Condition(s) for ending the agent loop. Use `isLoopFinished()` to let the agent run until all tool calls have completed, but beware of potential runaway loops. |
| `activeTools` | `ActiveTools<TOOLS>` | — | Optional. Limits the tools available for the model to call without changing the tool call and result types in the result. All tools are active by default. |
| `toolOrder` | `ToolOrder<TOOLS>` | — | Optional. Controls the order in which tools are sent to the provider. The list can be partial; unlisted tools are sent after the listed tools, sorted alphabetically. |
| `toolCallConcurrency` | `number` | — | Optional. Maximum number of tool calls that the SDK executes concurrently within an agent step. Set to `1` to execute sequentially in model-generated order. Must be a positive integer. By default, all tool calls execute concurrently. |
| `toolApproval` | `ToolApprovalConfiguration<TOOLS, RUNTIME_CONTEXT>` | — | Optional. Approval configuration. A `GenericToolApprovalFunction` handles all tool calls (`toolCall`, `tools`, `toolsContext`, `messages`, `runtimeContext`), or a per-tool object whose keys are a status (`'not-applicable'`, `'approved'`, `'denied'`, `'user-approval'`), an object form such as `{ type: 'denied', reason: 'blocked by policy' }`, or a `SingleToolApprovalFunction` receiving the tool input and `toolCallId`, `messages`, `toolContext`, `runtimeContext`. Either function may return `undefined` (same as `'not-applicable'`). Object statuses can include a `reason`: automatic approvals and denials forward it to the approval response, manual user approvals forward it to the approval request. Takes precedence over a tool's `needsApproval` default. |
| `experimental_toolCallers` | `Experimental_ToolCallers<TOOLS>` | — | Optional. Configures which caller tools may invoke each tool. Object keyed by callee tool name whose values list caller-capable tool names. Include `DIRECT_TOOL_CALL` from `@ai-sdk/code-mode` to keep a configured tool directly callable by the model. Local-only callees are hidden from direct model calls and bound to their local caller for each agent step. |
| `output` | `Output` | — | Optional. Structured output specification, for parsing responses into typesafe data. |
| `prepareStep` | `PrepareStepFunction` | — | Optional. Mutate step settings or inject state for each agent step, including per-step model call settings (temperature, maxOutputTokens, sampling controls, penalties, stop sequences, seed, reasoning). Overrides apply only to the current step. |
| `include` | `{ requestBody?: boolean; requestMessages?: boolean; responseBody?: boolean; rawChunks?: boolean }` | — | Optional. What data is included in step results. `requestBody`, `requestMessages`, `responseBody` apply to `generate()`; `requestBody`, `requestMessages`, `rawChunks` apply to `stream()`. |
| `repairToolCall` | `ToolCallRepairFunction` | — | Optional. Callback to attempt automatic recovery when a tool call cannot be parsed. |
| `experimental_refineToolInput` | `ToolInputRefinement<TOOLS>` | — | Optional. Mapping of tool names to functions that refine parsed tool inputs (must return the same input type shape). The refined input is used for tool execution, output parts, lifecycle callbacks, and telemetry in both `generate()` and `stream()`. |
| `onStart` | `GenerateTextOnStartCallback` | — | Optional. Called when the agent operation begins, before any LLM calls. If also specified in `generate()` or `stream()`, both are called (constructor first). |
| `onStepStart` | `GenerateTextOnStepStartCallback` | — | Optional. Called when a step begins, before the provider is called. Each step includes a model generation and any associated local tool execution; provider retries remain within the same step. |
| `onToolExecutionStart` | `OnToolExecutionStartCallback` | — | Optional. Called right before a tool's execute function runs. |
| `onToolExecutionEnd` | `OnToolExecutionEndCallback` | — | Optional. Called right after a tool's execute function completes (or errors). `toolOutput` is a discriminated union: `'tool-result'` with `output`, or `'tool-error'` with `error`. |
| `onStepEnd` | `GenerateTextOnStepEndCallback` | — | Optional. Called after each agent step (LLM/tool call) completes. |
| `onStepFinish` | `GenerateTextOnStepFinishCallback` | — | Deprecated. Use `onStepEnd`. Only used as a fallback when `onStepEnd` is not provided. |
| `onEnd` | `GenerateTextOnEndCallback` | — | Optional. Called when all agent steps are finished and the response is complete. Receives step results, total usage, shared `runtimeContext`, and `toolsContext`. |
| `onFinish` | `GenerateTextOnEndCallback` | — | Deprecated alias for `onEnd`. |
| `runtimeContext` | `CONTEXT` | — | Optional. User-defined shared runtime context object passed to `prepareStep` and lifecycle callbacks. |
| `toolsContext` | `InferToolSetContext<TOOLS>` | — | Per-tool context map keyed by tool name. Required when at least one tool defines `contextSchema`; not accepted when no tools need context. |
| `telemetry` | `TelemetryOptions` | — | Optional. Telemetry configuration. |
| `telemetry.includeRuntimeContext` | `{ [KEY in keyof CONTEXT]?: boolean }` | — | Optional. Top-level runtime context properties to include in telemetry. Excluded unless explicitly set to `true`. Lifecycle callbacks and results still receive the full `runtimeContext`. |
| `telemetry.includeToolsContext` | `{ [TOOL_NAME in keyof InferToolSetContext<TOOLS>]?: { [KEY in keyof ...]?: boolean } }` | — | Optional. Top-level tool context properties to include in telemetry, per tool. Excluded unless explicitly set to `true`. |
| `experimental_download` | `DownloadFunction \| undefined` | — | Optional. Experimental custom download function for fetching files/URLs for tool or model use. By default, files are downloaded if the model does not support the URL for a given media type. |
| `maxOutputTokens` | `number` | — | Optional. Maximum number of tokens the model is allowed to generate. |
| `temperature` | `number` | — | Optional. Sampling temperature, controls randomness. Passed through to the model. |
| `topP` | `number` | — | Optional. Top-p (nucleus) sampling parameter. |
| `topK` | `number` | — | Optional. Top-k sampling parameter. |
| `presencePenalty` | `number` | — | Optional. Presence penalty parameter. |
| `frequencyPenalty` | `number` | — | Optional. Frequency penalty parameter. |
| `stopSequences` | `string[]` | — | Optional. Custom token sequences which stop the model output. |
| `seed` | `number` | — | Optional. Seed for deterministic generation (if supported). |
| `maxRetries` | `number` | `2` | Optional. How many times to retry on failure. |
| `providerOptions` | `ProviderOptions` | — | Optional. Additional provider-specific configuration. |
| `headers` | `Record<string, string \| undefined>` | — | Optional. Additional HTTP headers to be sent with the request. Only applicable for HTTP-based providers. |
| `callOptionsSchema` | `FlexibleSchema<CALL_OPTIONS>` | — | Optional. Schema for custom call options that can be passed when calling `generate()` or `stream()`. |
| `prepareCall` | `PrepareCallFunction` | — | Optional. Prepare call-specific settings based on the call options. |
| `id` | `string` | — | Optional. Custom agent identifier. |

Lifecycle event payloads (see the official page for the full per-field descriptions):

| Callback | Event type | Fields |
| --- | --- | --- |
| `onStart` | `GenerateTextStartEvent` | `provider`, `modelId`, `instructions`, `messages`, `tools`, `toolChoice`, `activeTools`, `toolOrder`, `maxOutputTokens`, `temperature`, `topP`, `topK`, `presencePenalty`, `frequencyPenalty`, `stopSequences`, `seed`, `maxRetries`, `timeout` (`number \| { totalMs?, stepMs?, firstChunkMs?, chunkMs? }`), `headers`, `providerOptions`, `output`, `abortSignal`, `include`, `runtimeContext`, `toolsContext` |
| `onStepStart` | `GenerateTextStepStartEvent` | `provider`, `modelId`, `instructions`, `messages`, `tools`, `toolChoice`, `activeTools`, `toolOrder`, `steps` (results of previous steps, empty for the first step), `providerOptions`, `timeout`, `headers`, `stopWhen`, `output`, `abortSignal`, `include`, `runtimeContext` (may be updated from `prepareStep`), `toolsContext` (may be updated from `prepareStep`) |
| `onToolExecutionStart` | `ToolExecutionStartEvent` | `callId` (unique per generation call, correlates events), `toolCall`, `messages` (not including the system prompt nor the assistant response that contained the tool call), `toolContext` (narrowed to the individual tool) |
| `onToolExecutionEnd` | `ToolExecutionEndEvent` | `callId`, `toolCall`, `toolExecutionMs` (wall-clock duration), `messages`, `toolContext`, `toolOutput` |

Properties:

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `tools` | `Record<string, Tool>` | — | The tool set configured for this agent. Read-only. |
| `id` | `string \| undefined` | — | The agent identifier, if one was provided in the constructor. |

### Methods

#### `generate()`

Generates a response and triggers tool calls as needed, running the agent loop and returning the final result. Returns a promise resolving to a `GenerateTextResult`.

```ts
const result = await agent.generate({
  prompt: 'What is the weather like?',
});
```

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `prompt` | `string \| Array<ModelMessage>` | — | A text prompt or message array. |
| `messages` | `Array<ModelMessage>` | — | A full conversation history as a list of model messages. |
| `abortSignal` | `AbortSignal` | — | Optional. Cancel the call. |
| `timeout` | `number \| { totalMs?: number; stepMs?: number; firstChunkMs?: number; chunkMs?: number }` | — | Optional. `stepMs` limits each complete step, including model generation, retries, and local tool execution. `firstChunkMs` and `chunkMs` have no effect on `generate()`; they are streaming-only and are enforced by `stream()`. Can be used alongside `abortSignal`. |
| `experimental_sandbox` | `Experimental_SandboxSession` | — | Optional. Passed through to `prepareStep`, tool description functions, and tool execution. |
| `options` | `CALL_OPTIONS` | — | Optional. Custom call options when the agent is configured with a `callOptionsSchema`. |
| `onStart`, `onStepStart`, `onToolExecutionStart`, `onToolExecutionEnd`, `onStepEnd`, `onEnd` | callbacks | — | Optional. If also specified in the constructor, both are called (constructor first). |
| `onStepFinish`, `onFinish` | callbacks | — | Deprecated aliases for `onStepEnd` and `onEnd`. |

#### `stream()`

Streams a response from the agent, including agent reasoning and tool calls, as they occur. Returns a `StreamTextResult`.

```ts
const stream = await agent.stream({
  prompt: 'Tell me a story about a robot.',
});

for await (const chunk of stream.textStream) {
  console.log(chunk);
}
```

`stream()` accepts the same parameters as `generate()` plus:

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `experimental_transform` | `StreamTextTransform \| Array<StreamTextTransform>` | — | Optional. Stream transformation(s), applied in the order provided; must maintain the stream structure. |
| `timeout` | `number \| { totalMs?, stepMs?, firstChunkMs?, chunkMs? }` | — | `firstChunkMs` limits the wait for the first content-bearing output in each model-call step. `chunkMs` starts with the first meaningful model output and limits gaps between subsequent meaningful output chunks. Both output timers stop when the model response finishes and start fresh for each retry or later model call; they exclude retry backoff and local tool execution. Tool results, including preliminary results, do not reset them. |

### Types

`ActiveTools` limits an agent step to the listed tool names (`undefined` means no restriction):

```ts
type ActiveTools<TOOLS extends ToolSet> =
  | ReadonlyArray<keyof TOOLS & string>
  | undefined;
```

`InferAgentUIMessage` infers the UI message type for the given agent instance; a second type argument customizes message metadata.

```ts
import { ToolLoopAgent, InferAgentUIMessage } from 'ai';

const weatherAgent = new ToolLoopAgent({
  model,
  tools: { weather: weatherTool },
});

type WeatherAgentUIMessage = InferAgentUIMessage<typeof weatherAgent>;

// With metadata
type MetadataAgentUIMessage = InferAgentUIMessage<
  typeof metadataAgent,
  ExampleMetadata
>;
```

### Examples

Approved tool execution:

```ts
import { ToolLoopAgent, ModelMessage, ToolApprovalResponse, tool } from 'ai';
import { z } from 'zod';

const agent = new ToolLoopAgent({
  model,
  instructions: 'You are an agent with access to a weather API.',
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
  toolApproval: {
    weather: 'user-approval',
  },
});

const messages: ModelMessage[] = [
  { role: 'user', content: 'Is it raining in Paris today?' },
];

const result = await agent.generate({ messages });
const approvals: ToolApprovalResponse[] = [];

for (const part of result.content) {
  if (part.type === 'tool-approval-request') {
    approvals.push({
      type: 'tool-approval-response',
      approvalId: part.approvalId,
      approved: true,
    });
  }
}

messages.push(...result.responseMessages);
messages.push({ role: 'tool', content: approvals });

const approvedResult = await agent.generate({ messages });
console.log(approvedResult.text);
```

Output parsing (as shown on the reference page):

```ts
import { ToolLoopAgent, Output } from 'ai';

const analysisAgent = new ToolLoopAgent({
  model,
  output: Output.object({
    schema: z.object({
      sentiment: z.enum(['positive', 'negative', 'neutral']),
      score: z.number(),
      summary: z.string(),
    }),
  }),
});
```

## Notes

- `generate()` returns a `GenerateTextResult` and `stream()` a `StreamTextResult`; see generateText / streamText in the core category.
- `experimental_` options (`experimental_toolCallers`, `experimental_refineToolInput`, `experimental_download`, `experimental_sandbox`, `experimental_transform`) can change in patch releases.
- The official page's example passes a plain `{ schema }` object; this page uses `Output.object({ schema })` as in Building Agents and the Output reference.
- The official ToolLoopAgent reference shows `agent.stream()` without `await`; `stream()` returns `PromiseLike<StreamTextResult>` per the Agent interface, so it is awaited here as in Building Agents.
- Distinct from other skills: `ToolLoopAgent` is the AI SDK agent class (`ai` package, provider-agnostic). For the OpenAI Agents SDK see openai-agents, for the Claude Agent SDK anthropic-agent-sdk, for hosted Managed Agents anthropic-managed-agents, for Hermes hermes-agent, and for Claude Code subagents anthropic-claude-code-extend.

## Related

- [Agent](./agent.md)
- [Building Agents](./building-agents.md)
- [Loop Control](./loop-control.md)
- [Tool Approvals](./tool-approvals.md)
- [Configuring Call Options](./configuring-call-options.md)
- [Experimental_SandboxSession](./sandbox.md)
