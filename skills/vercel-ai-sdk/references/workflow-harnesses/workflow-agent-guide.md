---
source: https://ai-sdk.dev/docs/agents/workflow-agent
---

# WorkflowAgent

The `WorkflowAgent` from `@ai-sdk/workflow` builds durable, resumable agents that run inside a workflow. It provides the same agent loop as `ToolLoopAgent`, plus automatic state persistence, tool schema serialization, and tool approval flows that survive workflow step boundaries.

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

## ToolLoopAgent vs WorkflowAgent

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

## Options / Props

Key integration points described by the guide:

| Name | Type | Description |
| --- | --- | --- |
| model | string \| provider instance | AI Gateway model ID string (e.g. `'anthropic/claude-sonnet-5.5'`) or a provider instance (e.g. `openai('gpt-6-astra')`) |
| writable | `getWritable<ModelCallStreamPart>()` | `stream()` writes raw `ModelCallStreamPart` chunks to it; convert at the response boundary with `createModelCallToUIChunkTransform()` |
| needsApproval | boolean \| (input) => Promise<boolean> | Tool-level human approval; the workflow suspends until approved or denied |
| experimental_toolApprovalSecret | `{ environmentVariable: string }` | HMAC-signs approval requests; only the env var name crosses workflow boundaries |
| stopWhen | StopCondition | No default step limit for `stream()`; `generate()` defaults to a maximum of 20 steps |
| runtimeContext | serializable data | Shared agent state through `prepareStep`, lifecycle callbacks and `onEnd` |
| toolsContext | per-tool map | Each tool's `execute` sees only its own validated entry as `context` |
| experimental_sandbox | sandbox session | Live runtime handle available to tools and `prepareStep`; not durable context |
| prepareCall | callback | Called once before the loop starts |
| prepareStep | callback | Called before each step (LLM call) |
| toolCallConcurrency | number | Positive integer limiting concurrent local tool calls per step; `1` = sequential; default unlimited |

Lifecycle callbacks (constructor or `stream()`; both fire, constructor first): `onStart`, `onStepStart`, `onToolExecutionStart`, `onToolExecutionEnd`, `onStepEnd`, `onEnd`.

## Notes

- Tools as steps: mark tool `execute` functions with `'use step'` for automatic retries (default: 3 attempts), persistence, and per-step observability. Tools without `'use step'` run as regular in-memory functions without durability guarantees.
- `WorkflowAgent.stream()` expects `ModelMessage[]`, not `UIMessage[]`; call `convertToModelMessages` first.
- `createModelCallToUIChunkTransform()` also forwards `reset-step` events emitted on retries; clients remove partial parts from the failed model-call step before processing the retried output.
- Resumable streaming: `WorkflowChatTransport` (`@ai-sdk/workflow/client`) requires a POST endpoint returning an `x-workflow-run-id` header and a GET endpoint at `{api}/{runId}/stream`. It counts `UIMessageChunk` objects while the durable stream stores raw `ModelCallStreamPart` objects, so replay the raw stream from index `0` and apply the non-negative UI cursor with `createModelCallToUIChunkTransform({ uiStartIndex })`. Negative start indexes require a durable stream that already stores `UIMessageChunk` objects.
- Tool approval for `WorkflowAgent` is configured with `needsApproval` on the tool; for `generateText`, `streamText`, and `ToolLoopAgent` use `toolApproval` instead. The approval request survives restarts; the user can approve hours later.
- Signed approvals: use a high-entropy secret of at least 32 bytes and make it available to every worker that can issue or resume an approval; changing the secret invalidates pending approvals. Do not put the secret value in `runtimeContext` or `toolsContext`. A stream-level value overrides the constructor default. Marked `experimental_`.
- Loop control: unlike `ToolLoopAgent`, no default step limit; a model that repeatedly calls tools can make unlimited model calls. Use `isStepCount(n)`; `isLoopFinished()` is equivalent to omitting `stopWhen`.
- Structured output: `Output.object({ schema })` (imported from `@ai-sdk/workflow`) populates `result.output`.
- `runtimeContext` / `toolsContext` replace the previous `experimental_context` option and must be serializable (no functions, class instances, symbols, `WeakMap`, `WeakSet`, database clients, or SDK clients). Recreate non-serializable resources inside step functions.
- `experimental_sandbox` is not durable; if a tool runs as a separate step, pass serializable sandbox identifiers and reattach inside that step.
- Tool input callbacks (`onInputStart`, `onInputDelta`, `onInputAvailable`) are replayed in order after the model step completes; they do not run concurrently with generation and cannot provide in-flight cancellation or backpressure. Only configure `onInputDelta` when needed (replay data is part of the durable model-step result).
- Deprecated `experimental_onStart` and `experimental_onStepStart` remain for backwards compatibility; the stable name wins when both are given.
- Non-streaming: `agent.generate({ prompt })` uses the provider's `doGenerate()`; defaults to at most 20 steps. Use result getters inside the workflow and return selected serializable fields through `run.returnValue`; returning the whole result class is not supported. Approval requests are returned even without a writable: append `result.responseMessages` and a `tool-approval-response` tool message, using the same `experimental_toolApprovalSecret` reference.
- `timeout` sets an absolute deadline for model calls (checked before dispatch, before SDK retries, and after the provider returns) and persists across suspension. It does not cancel a tool waiting on a Workflow hook; use `run.cancel()`. Completed-step replay does not guarantee exactly-once effects for an interrupted attempt; put side effects inside steps and use idempotency.
- Migrating from `DurableAgent` (`workflow/ai`): import `WorkflowAgent` from `@ai-sdk/workflow`; write `ModelCallStreamPart` not `UIMessageChunk`; replace `maxSteps` with `stopWhen: isStepCount(n)`; replace `experimental_output` with `output` (`result.output`); use `needsApproval` instead of a Hook inside `execute`; `uiMessages` / `collectUIMessages` is gone (use `result.messages`); replace `experimental_context` with `runtimeContext` / `toolsContext`. New: `prepareCall`, `onToolExecutionStart` / `onToolExecutionEnd`.
- Distance: this is the AI SDK's durable agent class for the Workflow DevKit. Vercel platform and Workflow product settings are covered by the vercel skill. Other durable-step engines with their own `step.ai.wrap` style APIs are covered by the inngest skill. Provider-agnostic agent SDKs from model vendors are covered by openai-agents and anthropic-agent-sdk.

## Related

- [WorkflowAgent API reference](./workflow-agent.md)
- [WorkflowChatTransport](./workflow-chat-transport.md)
- [Workflow utilities](./workflow-utilities.md)
- [ToolLoopAgent](../agents/tool-loop-agent.md)
- [Loop control](../agents/loop-control.md)
