---
source: https://ai-sdk.dev/docs/ai-sdk-core/lifecycle-callbacks
---

# Lifecycle Callbacks

Event callbacks run your own code at important points in an AI SDK call. Attach them directly to `generateText`, `streamText`, `embed`, `embedMany`, `rerank`, and `experimental_decide` to log, record usage, debug multi-step generations, and monitor tool execution.

## Signature / Usage

```ts
import { generateText } from 'ai';

const result = await generateText({
  model,
  prompt: 'What is the weather in San Francisco?',

  onStart({ callId, modelId }) {
    console.log('Generation started', { callId, modelId });
  },

  onEnd({ callId, usage, finishReason }) {
    console.log('Generation finished', {
      callId,
      finishReason,
      totalTokens: usage.totalTokens,
    });
  },
});
```

Callbacks can be synchronous or asynchronous. If a callback throws, the error is caught internally and the AI SDK call continues. Keep callbacks fast or enqueue expensive work in a background system.

### Available callbacks

`generateText` and `streamText`:

| Name | Type | Description |
| --- | --- | --- |
| onStart | `(event: GenerateTextStartEvent) => void \| Promise<void>` | Called once when the generation operation begins, before any model calls. |
| onStepStart | `(event: GenerateTextStepStartEvent) => void \| Promise<void>` | Called before each generation step. Each step represents one model call and any SDK-managed work around it. |
| onLanguageModelCallStart | `(event: LanguageModelCallStartEvent) => void \| Promise<void>` | Called immediately before the provider model call begins. Scoped to model work only. |
| onLanguageModelCallEnd | `(event: LanguageModelCallEndEvent) => void \| Promise<void>` | Called after the model response has been normalized and parsed, before local tool execution begins. |
| onToolExecutionStart | `(event: ToolExecutionStartEvent) => void \| Promise<void>` | Called before a local tool's `execute` function runs. |
| onToolExecutionEnd | `(event: ToolExecutionEndEvent) => void \| Promise<void>` | Called after a local tool's `execute` function completes or errors. |
| onStepEnd | `(event: GenerateTextStepEndEvent) => void \| Promise<void>` | Called after each generation step completes. Receives the step result, including usage and performance. |
| onEnd | `(event: GenerateTextEndEvent) => void \| Promise<void>` | Called once when the full generation completes. Receives final output and aggregated usage across all steps. |

`embed` / `embedMany`: `onStart(EmbedStartEvent)` (before the embedding model is called), `onEnd(EmbedEndEvent)` (after it returns).
`rerank`: `onStart(RerankStartEvent)`, `onEnd(RerankEndEvent)`.
`experimental_decide`: `onStart(Experimental_DecideStartEvent)`, `onEnd(Experimental_DecideEndEvent)` (called when the decision operation completes successfully).

### Generation lifecycle order

Single-step: `onStart`, `onStepStart`, `onLanguageModelCallStart`, `onLanguageModelCallEnd`, `onStepEnd`, `onEnd`.

Multi-step with local tool execution: `onStart`, `onStepStart`, `onLanguageModelCallStart`, `onLanguageModelCallEnd`, `onToolExecutionStart`, `onToolExecutionEnd`, `onStepEnd`, repeat step callbacks until the stop condition is met, `onEnd`.

`onStepStart` / `onStepEnd` describe the full step; `onLanguageModelCallStart` / `onLanguageModelCallEnd` describe only the model call inside it, so step duration can be longer than model response duration when local tools run.

### Event data (text generation)

| Callback | Fields |
| --- | --- |
| onStart | `callId: string`, `operationId: string` (e.g. `'ai.generateText'` / `'ai.streamText'`), `provider`, `modelId`, `messages: Array<ModelMessage>`, `instructions: Instructions \| undefined`, `tools: ToolSet \| undefined`, `toolChoice: ToolChoice \| undefined`, `activeTools: ActiveTools<TOOLS>`, `maxRetries: number`, `timeout: TimeoutConfiguration \| undefined`, `headers`, `providerOptions`, `runtimeContext: CONTEXT`, `toolsContext: InferToolSetContext<TOOLS>` |
| onStepStart | `callId`, `stepNumber` (zero-based), `provider`, `modelId`, `messages` (to be sent for this step), `tools`, `activeTools`, `steps: ReadonlyArray<StepResult>` (previous steps, empty for first), `providerOptions`, `runtimeContext` (may be updated from `prepareStep`), `toolsContext` (may be updated from `prepareStep`) |
| onLanguageModelCallStart | `callId`, `provider`, `modelId`, `instructions`, `messages`, `tools: ReadonlyArray<Record<string, unknown>> \| undefined` (prepared tool definitions) |
| onLanguageModelCallEnd | `callId`, `provider`, `modelId` (provider-returned), `finishReason: FinishReason`, `usage: LanguageModelUsage`, `content: ReadonlyArray<ContentPart<TOOLS>>`, `responseId: string`, `providerMetadata`, `performance: LanguageModelCallPerformance` (response time, tokens per second, streaming timing when available) |
| onToolExecutionStart | `callId`, `toolCall: TypedToolCall` (`toolCallId`, `toolName`, `input`), `messages` (sent to the model to initiate the response containing the tool call; excludes the system prompt and the assistant response containing the tool call), `toolContext: InferToolContext<TOOLS[toolName]>` |
| onToolExecutionEnd | `callId`, `toolCall`, `toolExecutionMs: number`, `messages`, `toolContext`, `toolOutput: { type: 'tool-result'; output: unknown } \| { type: 'tool-error'; error: unknown }` |
| onStepEnd | The full `StepResult`: `callId`, `stepNumber`, `model: { provider; modelId }`, `content`, `text`, `toolCalls`, `toolResults`, `finishReason`, `usage`, `performance: StepResultPerformance`, `warnings`, `request: LanguageModelRequestMetadata`, `response: LanguageModelResponseMetadata`, `runtimeContext`, `toolsContext` |
| onEnd | `callId`, `steps: Array<StepResult>`, `finalStep` (shortcut for `steps.at(-1)`), `responseMessages: Array<ResponseMessage>`, `content`, `text` (final step), `toolCalls`, `toolResults`, `finishReason` (final step), `usage` (aggregated across all steps), `warnings` |

### Event data (embedding, rerank, decision)

| Callback | Fields |
| --- | --- |
| embed / embedMany onStart | `callId`, `operationId` (`'ai.embed'` or `'ai.embedMany'`), `provider`, `modelId`, `value: string \| Array<string>`, `maxRetries`, `headers`, `providerOptions` |
| embed / embedMany onEnd | start fields plus `embedding: Embedding \| Array<Embedding>`, `usage: EmbeddingModelUsage`, `warnings`, `providerMetadata`, `response` (for `embedMany`, can be one response per chunk) |
| rerank onStart | `callId`, `operationId` (`'ai.rerank'`), `provider`, `modelId`, `documents: Array<JSONObject \| string>`, `query: string`, `topN: number \| undefined`, `maxRetries`, `headers`, `providerOptions` |
| rerank onEnd | `callId`, `operationId`, `provider`, `modelId`, `documents`, `query`, `ranking: Array<{ originalIndex: number; score: number; document }>` (sorted by relevance descending), `warnings`, `providerMetadata`, `response: { id?; timestamp: Date; modelId; headers?; body? }` |
| decide onStart | `callId`, `operationId` (`'ai.decide'`), `runtimeContext`, `provider`, `modelId`, `state: string \| object \| array`, `questions: Readonly<Record<string, Experimental_DecisionQuestion>>`, `maxRetries`, `headers`, `providerOptions` |
| decide onEnd | every `onStart` field plus `answers: Record<string, Experimental_DecisionAnswer>` (exactly one typed answer per question ID), `usage: { inputTokens; outputTokens; totalTokens }`, `warnings`, `rounding: { probabilityDecimals?; scoreDecimals? }`, `providerMetadata`, `response` |

### Runtime and tool context

Generation and step lifecycle callbacks receive the full `runtimeContext` and `toolsContext` values that flow through the call. Tool-execution callbacks receive the scoped `toolContext` for the tool being executed.

```ts
const result = await generateText({
  model,
  prompt: 'Check the order status.',
  runtimeContext: {
    requestId: 'req_123',
    tenantId: 'tenant_abc',
  },
  tools: {
    getOrderStatus: tool({
      inputSchema: z.object({ orderId: z.string() }),
      contextSchema: z.object({ region: z.string() }),
      execute: async ({ orderId }, { context }) =>
        getOrderStatus(orderId, context.region),
    }),
  },
  toolsContext: {
    getOrderStatus: {
      region: 'us-east-1',
    },
  },

  onStart({ callId, runtimeContext }) {
    logger.info('ai.request.started', {
      callId,
      requestId: runtimeContext.requestId,
      tenantId: runtimeContext.tenantId,
    });
  },

  onToolExecutionStart({ toolCall, toolContext }) {
    logger.info('ai.tool.started', {
      toolName: toolCall.toolName,
      region: toolContext.region,
    });
  },
});
```

## Notes

- `onStepFinish` is deprecated. Use `onStepEnd` for new code.
- Decision callbacks are experimental; exported types are `Experimental_DecideStartEvent` and `Experimental_DecideEndEvent`.
- Telemetry integrations can filter `runtimeContext` and `toolsContext` before exporting them. Generation and step callbacks receive the full context objects; tool-execution callbacks receive scoped tool context. Do not log secrets or sensitive user data from callbacks.
- For automatic OpenTelemetry instrumentation across the application use Telemetry; use event callbacks for custom code at a specific AI SDK call.
- `onLanguageModelCallEnd` on `streamText` also includes streaming-specific timing (time to first output, gaps between output chunks). Use model-call events to measure provider work specifically and step events for timing that includes SDK-managed work such as local tool execution.
- `toolOutput.type === 'tool-result'` exposes `toolOutput.output`; `'tool-error'` exposes `toolOutput.error`.
- On `generateText` / `streamText` pages these callbacks are labelled experimental; errors thrown inside them are silently caught.

## Related

- [generateText](./generate-text.md)
- [streamText](./stream-text.md)
- [Generating Text](./generating-text.md)
