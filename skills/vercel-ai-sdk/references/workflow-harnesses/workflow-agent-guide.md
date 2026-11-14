---
source: https://ai-sdk.dev/docs/agents/workflow-agent
---

# WorkflowAgent

The `WorkflowAgent` from `@ai-sdk/workflow` builds durable, resumable agents that run inside a workflow. It runs a tool loop like `ToolLoopAgent` and adds automatic state persistence, tool schema serialization, and tool approval flows that survive workflow step boundaries.

## Signature / Usage

```bash
npm install @ai-sdk/workflow workflow@5
```

```ts
import { WorkflowAgent, type ModelCallStreamPart } from '@ai-sdk/workflow';
import { convertToModelMessages, tool, type UIMessage } from 'ai';
import { getWritable } from 'workflow';
import { z } from 'zod';

export async function chat(messages: UIMessage[]) {
  'use workflow';

  const modelMessages = await convertToModelMessages(messages);

  const agent = new WorkflowAgent({
    model: 'anthropic/claude-sonnet-5.5',
    instructions: 'You are a flight booking assistant.',
    tools: {
      searchFlights: tool({
        description: 'Search for available flights',
        inputSchema: z.object({
          origin: z.string(),
          destination: z.string(),
          date: z.string(),
        }),
        execute: searchFlightsStep,
      }),
    },
  });

  const result = await agent.stream({
    messages: modelMessages,
    writable: getWritable<ModelCallStreamPart>(),
  });

  return { messages: result.messages };
}
```

Route handler that starts the workflow and converts raw model stream parts to UI chunks:

```ts
import { createModelCallToUIChunkTransform } from '@ai-sdk/workflow';
import { createUIMessageStreamResponse, type UIMessage } from 'ai';
import { start } from 'workflow/api';
import { chat } from '@/workflow/agent-chat';

export async function POST(request: Request) {
  const { messages }: { messages: UIMessage[] } = await request.json();

  const run = await start(chat, [messages]);

  return createUIMessageStreamResponse({
    stream: run.readable.pipeThrough(createModelCallToUIChunkTransform()),
  });
}
```

Agent-level approval with `toolApproval`:

```ts
const agent = new WorkflowAgent({
  model: 'anthropic/claude-sonnet-5.5',
  tools: {
    bookFlight: tool({
      description: 'Book a flight',
      inputSchema: z.object({ flightId: z.string() }),
      execute: bookFlightStep,
    }),
  },
  toolApproval: {
    bookFlight: 'user-approval',
  },
});
```

## Options / Props

Key integration points described by the guide:

| Name | Type | Description |
| --- | --- | --- |
| model | string \| provider instance | AI Gateway model ID string (e.g. `'anthropic/claude-sonnet-5.5'`) or a provider instance (e.g. `openai('gpt-6-astra')`) |
| writable | `getWritable<ModelCallStreamPart>()` | `stream()` writes raw `ModelCallStreamPart` chunks to it; convert at the response boundary with `createModelCallToUIChunkTransform()` |
| needsApproval | boolean \| (input) => Promise<boolean> | Tool-level human approval; the workflow suspends until approved or denied |
| toolApproval | per-tool map or function | Agent-level approval configuration; takes precedence over `needsApproval`. `'approved'` runs in the same step, `'denied'` sends the model an `execution-denied` tool result, `'user-approval'` suspends the workflow |
| experimental_toolApprovalSecret | `{ environmentVariable: string }` | HMAC-signs approval requests; only the env var name crosses workflow boundaries |
| stopWhen | StopCondition | No default step limit for `stream()`; `generate()` defaults to a maximum of 20 steps |
| runtimeContext | serializable data | Shared agent state through `prepareStep`, lifecycle callbacks and `onEnd` |
| toolsContext | per-tool map | Each tool's `execute` sees only its own validated entry as `context` |
| experimental_sandbox | sandbox session | Live runtime handle available to tools and `prepareStep`; not durable context |
| prepareCall | callback | Called once before the loop starts |
| prepareStep | callback | Called before each step (LLM call); also accepted per call in `generate()` and `stream()` (`prepareCall` is a constructor option only) |
| toolCallConcurrency | number | Positive integer limiting concurrent local tool calls per step; `1` = sequential; default unlimited |

Lifecycle callbacks (constructor or `stream()`; both fire, constructor first): `onStart`, `onStepStart`, `onToolExecutionStart`, `onToolExecutionEnd`, `onStepEnd`, `onEnd`.

## Notes

- `toolOrder`: the comparison table below (as published) says "Not supported", but the official `WorkflowAgent` reference page and the `WorkflowAgent` settings type at ai@7.0.173 list `toolOrder`. See the WorkflowAgent reference page in this directory.
- Tools as steps: mark tool `execute` functions with `'use step'` for automatic retries (default: 3 attempts), persistence, and per-step observability. Tools without `'use step'` run as regular in-memory functions without durability guarantees.
- `WorkflowAgent.stream()` expects `ModelMessage[]`, not `UIMessage[]`; call `convertToModelMessages` first.
- `createModelCallToUIChunkTransform()` also forwards `reset-step` events emitted on retries; clients remove partial parts from the failed model-call step before processing the retried output.
- Resumable streaming: `WorkflowChatTransport` (`@ai-sdk/workflow/client`) requires a POST endpoint returning an `x-workflow-run-id` header and a GET endpoint at `{api}/{runId}/stream`. It counts `UIMessageChunk` objects while the durable stream stores raw `ModelCallStreamPart` objects, so replay the raw stream from index `0` and apply the non-negative UI cursor with `createModelCallToUIChunkTransform({ uiStartIndex })`. Negative start indexes require a durable stream that already stores `UIMessageChunk` objects.
- Tool approval for `WorkflowAgent` is configured with `needsApproval` on the tool or `toolApproval` on the agent; `toolApproval` takes precedence over `needsApproval`. The approval request survives restarts; the user can approve hours later. Use `toolApproval` when approval depends on the tool set, the call, or the runtime context, or when a tool does not set `needsApproval`; its functions run in workflow context, outside of the durable model steps. A call marked `'approved'` runs in the same step; a call marked `'denied'` does not run, the model receives an `execution-denied` tool result and the loop continues. Neither decision pauses the workflow, and `step.content` records both with an automatic approval request and approval response. Differences from `ToolLoopAgent`: the tool message in `step.response.messages` holds only the tool result (no approval response part), and in `stream()` the approval parts follow the tool results in `step.content`.
- Signed approvals: use a high-entropy secret of at least 32 bytes and make it available to every worker that can issue or resume an approval; changing the secret invalidates pending approvals. Do not put the secret value in `runtimeContext` or `toolsContext`. A stream-level value overrides the constructor default. Marked `experimental_`.
- Loop control: `stream()` applies no default step limit (unlike `ToolLoopAgent`); a model that repeatedly calls tools can make unlimited model calls. `generate()` stops after 20 steps by default, like `ToolLoopAgent`, and logs the same warning when it reaches that limit. Use `isStepCount(n)`; for `stream()`, `isLoopFinished()` is equivalent to omitting `stopWhen`, and it also removes the 20-step default of `generate()`.
- `prepareStep`: a `model`, `toolChoice`, `activeTools`, or generation setting returned from `prepareStep` applies to the current step only, as in `ToolLoopAgent`. Returned `messages`, `instructions`, `runtimeContext`, and `toolsContext` values stay in effect for later steps.
- `timeout` accepts a number of milliseconds (same as `totalMs`) or an object `{ totalMs, stepMs, firstChunkMs, chunkMs }`. `stepMs` limits the whole model call (dispatch, SDK retries, reading the response) without tool execution; `firstChunkMs` and `chunkMs` apply to `stream()` only and count only generated output (files, tool calls, non-empty text, reasoning or tool-input deltas). When a limit is reached the model call is aborted with a `TimeoutError` and the run ends like an aborted run: `stream()` resolves with the steps that finished, `generate()` rejects, and both call `onAbort`. Each value must be a finite number of at most 2147483647; other invalid values are rejected with an `InvalidArgumentError` before the first model call. A negative `timeout` or `totalMs` is a deadline that has already passed.
- Source: https://ai-sdk.dev/docs/agents/workflow-agent (ai@7.0.173)
- Structured output: `Output.object({ schema })` (imported from `@ai-sdk/workflow`) populates `result.output`.
- `runtimeContext` / `toolsContext` replace the previous `experimental_context` option and must be serializable (no functions, class instances, symbols, `WeakMap`, `WeakSet`, database clients, or SDK clients). Recreate non-serializable resources inside step functions.
- `experimental_sandbox` is not durable; if a tool runs as a separate step, pass serializable sandbox identifiers and reattach inside that step.
- Tool input callbacks (`onInputStart`, `onInputDelta`, `onInputAvailable`) are replayed in order after the model step completes; they do not run concurrently with generation and cannot provide in-flight cancellation or backpressure. Only configure `onInputDelta` when needed (replay data is part of the durable model-step result).
- Deprecated `experimental_onStart` and `experimental_onStepStart` remain for backwards compatibility; the stable name wins when both are given.
- Non-streaming: `agent.generate({ prompt })` uses the provider's `doGenerate()`; defaults to at most 20 steps. Use result getters inside the workflow and return selected serializable fields through `run.returnValue`; returning the whole result class is not supported. Approval requests are returned even without a writable: append `result.responseMessages` and a `tool-approval-response` tool message, using the same `experimental_toolApprovalSecret` reference.
- `timeout` sets an absolute deadline for model calls (checked before dispatch, before SDK retries, and after the provider returns) and persists across suspension. It does not cancel a tool waiting on a Workflow hook; use `run.cancel()`. Completed-step replay does not guarantee exactly-once effects for an interrupted attempt; put side effects inside steps and use idempotency.
- Migrating from `DurableAgent` (`workflow/ai`): import `WorkflowAgent` from `@ai-sdk/workflow`; write `ModelCallStreamPart` not `UIMessageChunk`; replace `maxSteps` with `stopWhen: isStepCount(n)`; replace `experimental_output` with `output` (`result.output`); use `needsApproval` instead of a Hook inside `execute`; `uiMessages` / `collectUIMessages` is gone (use `result.messages`); replace `experimental_context` with `runtimeContext` / `toolsContext`. New: `prepareCall`, `onToolExecutionStart` / `onToolExecutionEnd`.
- Distance: this is the AI SDK's durable agent class for the Workflow DevKit. Vercel platform and Workflow product settings are covered by the vercel skill. Other durable-step engines with their own `step.ai.wrap` style APIs are covered by the inngest skill. Provider-agnostic agent SDKs from model vendors are covered by openai-agents and anthropic-agent-sdk.

### Differences from ToolLoopAgent

`WorkflowAgent` and [`ToolLoopAgent`](/docs/agents/building-agents) both run a tool loop, but they are separate implementations with separate APIs. `WorkflowAgent` does not implement the [`Agent`](/docs/reference/ai-sdk-core/agent) interface, so you cannot pass it to `createAgentUIStream`, `createAgentUIStreamResponse`, or `pipeAgentUIStreamToResponse`. Code written for one class usually needs changes before it runs on the other.

#### Options that only ToolLoopAgent supports

TypeScript rejects these options on `WorkflowAgent`. If you pass them anyway, for example from JavaScript, they are ignored without an error unless the table says otherwise.

| ToolLoopAgent option                                            | With WorkflowAgent                                                                                                                                                       |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `toolOrder`                                                     | Not supported. Tools are sent in the order of the `tools` object.                                                                                                        |
| `callOptionsSchema` and the `options` call parameter            | Not supported. Pass settings to `generate()` or `stream()` directly.                                                                                                     |
| `experimental_toolCallers`                                      | Not supported.                                                                                                                                                           |
| `experimental_steering`                                         | Not supported. To add messages between steps, return `messages` from `prepareStep`.                                                                                      |
| `experimental_transform`                                        | Not supported. Transform `run.readable` with `pipeThrough()` where you create the response.                                                                              |
| `onStepError`                                                   | Not supported. Use `onError`.                                                                                                                                            |
| `onLanguageModelCallStart`, `onLanguageModelCallEnd`            | Not supported.                                                                                                                                                           |
| `include` in the constructor                                    | Pass `include` to `generate()`. `stream()` has no `include` option and does not record request data in its steps. Use `includeRawChunks` to receive raw provider chunks. |
| `timeout` in the constructor                                    | Pass `timeout` to `generate()` or `stream()`.                                                                                                                            |
| `experimental_telemetry`                                        | Use `telemetry`.                                                                                                                                                         |
| `experimental_onToolCallStart`, `experimental_onToolCallFinish` | Use `onToolExecutionStart` and `onToolExecutionEnd`.                                                                                                                     |

#### Options with a different shape

| Option                                                                                                                               | ToolLoopAgent                                                | WorkflowAgent                                                                                                                                                                                               |
| ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Generation settings, `instructions`, `toolChoice`, `activeTools`, `stopWhen`, `output`, `telemetry`, `prepareStep`, `repairToolCall` | Constructor only. Use `prepareCall` to change them per call. | Constructor, or per call in `generate()` and `stream()`. The per-call value overrides the constructor value.                                                                                                |
| `abortSignal`                                                                                                                        | Per call.                                                    | Constructor or per call.                                                                                                                                                                                    |
| `experimental_sandbox`                                                                                                               | Per call.                                                    | Constructor or per call.                                                                                                                                                                                    |
| `timeout`                                                                                                                            | A number or an object, in the constructor or per call.       | A number or an object, per call. The object has no tool timeouts, and `stepMs` covers the model call without tool execution. See Deadlines, cancellation, and replay. |
| `experimental_toolApprovalSecret`                                                                                                    | The secret, as a `string` or `Uint8Array`.                   | `{ environmentVariable: string }`, the name of an environment variable that holds the secret. See Signed Tool Approvals.                                                          |
| `runtimeContext`, `toolsContext`                                                                                                     | Any JavaScript value.                                        | Serializable values. See runtimeContext and toolsContext.                                                                                                               |

#### Default step limit

|                 | `generate()`                                                 | `stream()`                                                   |
| --------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `ToolLoopAgent` | 20 steps. A warning is logged when the limit stops the loop. | 20 steps. A warning is logged when the limit stops the loop. |
| `WorkflowAgent` | 20 steps. A warning is logged when the limit stops the loop. | No limit.                                                    |

#### prepareCall

In `ToolLoopAgent`, `prepareCall` receives the settings together with the `prompt` or `messages` and the typed `options` of the call, and the object it returns replaces the call settings. In `WorkflowAgent`:

- It receives `messages` and no `options`. A string `prompt` is converted to a user message first.
- The fields it returns are merged into the call. Fields you leave out keep their values, so you do not need the `({ options, ...rest }) => ({ ...rest })` pattern.
- It cannot return `tools`. The tools are fixed when the agent is created.

#### prepareStep

- `messages` uses the provider prompt format (`LanguageModelV4Prompt`) in the argument and in the return value, and it includes the system message. `ToolLoopAgent` uses `ModelMessage[]` without the system message.
- The argument has no `responseMessages`. `initialInstructions`, `instructions`, and `initialMessages` are available.
- You can return `headers`. They are merged over the headers of the call, and the request keeps the `user-agent` value that identifies the agent. `ToolLoopAgent` does not accept `headers` from `prepareStep`.

#### Callbacks

The callbacks have the same names, but most of them receive smaller event objects than in `ToolLoopAgent`:

| Callback               | Event fields in WorkflowAgent                                                                                  |
| ---------------------- | -------------------------------------------------------------------------------------------------------------- |
| `onStart`              | `model`, `messages`, `runtimeContext`, `toolsContext`                                                          |
| `onStepStart`          | `stepNumber`, `model`, `messages`, `steps`, `runtimeContext`, `toolsContext`                                   |
| `onToolExecutionStart` | `toolCall`, `stepNumber`, `messages`, `toolContext`                                                            |
| `onToolExecutionEnd`   | `toolCall`, `stepNumber`, `messages`, `toolContext`, `durationMs`, `success`, and `output` or `error`          |
| `onStepEnd`            | The step result, as in `ToolLoopAgent`                                                                         |
| `onEnd`                | `steps`, `messages`, `text`, `finishReason`, `usage`, `totalUsage`, `output`, `runtimeContext`, `toolsContext` |

`ToolLoopAgent` events also carry a `callId`, and its `onToolExecutionEnd` event uses `toolExecutionMs` and `toolOutput` where `WorkflowAgent` uses `durationMs`, `success`, `output`, and `error`.

The callbacks also run at different times:

- After a failed run, `stream()` calls `onEnd` before it rejects. `generate()` and `ToolLoopAgent` do not call `onEnd` for a failed run.
- `onAbort` is called by `generate()` and by `stream()`, and its event has only `steps`. `ToolLoopAgent` calls `onAbort` only for `stream()`, with `callId`, `reason`, and `steps`.
- An aborted `stream()` call resolves with the steps that finished. An aborted `generate()` call rejects.

#### Results

`generate()` returns the same result type as `ToolLoopAgent`. If a model returns its structured output separately from its text, `generate()` still parses the text of the last step.

`stream()` works differently from `ToolLoopAgent`:

- It resolves when the run has finished, with a plain object that has `messages`, `steps`, `toolCalls`, `toolResults`, `finishReason`, `totalUsage`, and `output`, plus `error` when the model stream reported one. It has none of the streams and promises of `StreamTextResult`, such as `textStream`, `fullStream`, or `text`. Stream parts go to the `writable` you pass in. Read the final text from `result.steps.at(-1)?.text`.
- `messages` contains the input messages followed by the generated messages. `ToolLoopAgent` returns only the generated messages, as `responseMessages`.
- `toolCalls` and `toolResults` describe the last step. In `ToolLoopAgent` they cover all steps.
- `output` is `undefined` unless you set an `output` specification. `ToolLoopAgent` defaults to the generated text.
- If the structured output cannot be parsed, the `stream()` call rejects. In `ToolLoopAgent`, the call resolves and only `result.output` rejects.
- If the model call throws, the `stream()` call rejects with that error. In `ToolLoopAgent`, the call resolves and the error is reported through the stream and `onError`.
- Each step is a plain object. Its `request` is empty, and its `providerMetadata` is `{}` when the provider sends none. Steps from `generate()` match `ToolLoopAgent`.

#### Tools

- Approval is configured with `needsApproval` on the tool or `toolApproval` on the agent. Approval request IDs have the form `approval-<toolCallId>`. `ToolLoopAgent` generates random IDs.
- For a tool whose `execute` function is an async generator, the last yielded value is the tool result, as in `ToolLoopAgent`. `ToolLoopAgent` also reports the earlier values as preliminary results. `WorkflowAgent` does not send them to the `writable`.
- Tool timeouts (`toolMs` and `tools` in the `timeout` object) are not supported.
- `experimental_refineToolInput` functions run in the workflow context after the model step returns. The `tool-call` chunk that `stream()` writes to `writable` for a tool without its own runtime validator, and the input of provider-executed tool calls, keep the unrefined value.

#### Requests

Requests carry `ai-sdk-agent/workflow` in the `user-agent` header. `ToolLoopAgent` sends `ai-sdk-agent/tool-loop`.

#### Timeouts

- `stepMs` limits one model call. In `ToolLoopAgent` it also covers the tool calls of the step.
- `generate()` ignores `firstChunkMs` and `chunkMs`. `ToolLoopAgent` also logs a warning for them.
- A timeout value that is not a finite number, or that is larger than 2147483647, is rejected with an `InvalidArgumentError`. So is a negative `stepMs`, `firstChunkMs`, or `chunkMs`. `ToolLoopAgent` does not validate the values.

### ToolLoopAgent vs WorkflowAgent

| | ToolLoopAgent | WorkflowAgent |
| --- | --- | --- |
| Package | `ai` | `@ai-sdk/workflow` |
| Runtime | In-memory | Workflow |
| Durability | Lost on crash | Survives restarts |
| Tool retries | Manual | Automatic (via workflow steps) |
| Human approval | Built-in | Built-in + survives suspension |
| `generate()` method | Available | Available with durable non-streaming model calls |
| `stream()` method | Available | Primary API |
| Stream output | `streamText` return value | `writable` parameter with `ModelCallStreamPart` |

## Related

- [WorkflowAgent API reference](./workflow-agent.md)
- [WorkflowChatTransport](./workflow-chat-transport.md)
- [Workflow utilities](./workflow-utilities.md)
- [ToolLoopAgent](../agents/tool-loop-agent.md)
- [Loop control](../agents/loop-control.md)
