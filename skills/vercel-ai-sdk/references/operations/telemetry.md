---
source: https://ai-sdk.dev/docs/ai-sdk-core/telemetry
---

# Telemetry

The AI SDK uses OpenTelemetry to collect telemetry data. Integrations are registered with `registerTelemetry`; the `@ai-sdk/otel` package provides the `OpenTelemetry` and `LegacyOpenTelemetry` integrations.

## Signature / Usage

Register the OpenTelemetry integration once at application startup (requires the `@ai-sdk/otel` package):

```ts
import { registerTelemetry } from 'ai';
import { OpenTelemetry } from '@ai-sdk/otel';

registerTelemetry(new OpenTelemetry());
```

Next.js: create `instrumentation.ts` in the project root and register the integration alongside your OpenTelemetry provider setup. For Node.js (without Next.js), register at the top level of your entry file.

```ts
import { registerOTel } from '@vercel/otel';
import { registerTelemetry } from 'ai';
import { OpenTelemetry } from '@ai-sdk/otel';

export function register() {
  registerOTel({
    serviceName: 'my-ai-app',
  });

  registerTelemetry(new OpenTelemetry());
}
```

Once an integration is registered, supported calls emit telemetry events by default (text and object generation, embeddings, reranking, speech generation, and non-streaming and streaming transcription). Pass `telemetry` to attach metadata or opt out of a call:

```ts
const result = await generateText({
  model,
  prompt: 'Write a short story about a cat.',
  runtimeContext: {
    userId: 'user_123',
    requestId: 'req_abc',
  },
  telemetry: {
    functionId: 'my-awesome-function',
    includeRuntimeContext: {
      requestId: true,
    },
  },
});
```

Opt out for one call:

```ts
const result = await generateText({
  model,
  prompt: 'Write a short story about a cat.',
  telemetry: { isEnabled: false },
});
```

## Options / Props

`telemetry` call settings (as shown on the page):

| Name | Type | Description |
| --- | --- | --- |
| `isEnabled` | boolean | Set `false` to disable telemetry (including tracing-channel events) for the call. |
| `functionId` | string | Identifies the function the telemetry data is for. |
| `recordInputs` | boolean | Defaults to recording inputs; set `false` to disable. |
| `recordOutputs` | boolean | Defaults to recording outputs; set `false` to disable. |
| `includeRuntimeContext` | object | Marks top-level `runtimeContext` properties (`{ key: true }`) to include in telemetry. If omitted, no runtime context properties are included. Supported by `generateText`, `streamText`, `ToolLoopAgent`, `embed`, `embedMany`, `rerank`, and `experimental_decide`. |
| `includeToolsContext` | object | Marks top-level properties of a tool's `context` (`{ toolName: { key: true } }`) to include in telemetry. Supported by `generateText`, `streamText`, and `ToolLoopAgent`. |
| `integrations` | Telemetry[] | Per-call integrations. When provided, they replace the globally registered integrations for that call. |

`OpenTelemetry` constructor options shown on the page:

| Name | Type | Description |
| --- | --- | --- |
| `tracer` | Tracer | Custom `Tracer` when you want a `TracerProvider` other than the `@opentelemetry/api` singleton. |
| `enrichSpan` | function | Callback `({ spanType, operationId, callId, runtimeContext })` returning custom attributes merged into spans at creation. AI SDK-owned attributes take precedence on the same key. |
| `usage` | boolean | Supplemental: detailed usage attributes not covered by GenAI usage attributes (uncached input tokens, output text/reasoning token details). |
| `providerMetadata` | boolean | Supplemental: `ai.response.providerMetadata` on operation, step, and model-call spans. |
| `embedding` | boolean | Supplemental: embedding inputs and outputs. |
| `reranking` | boolean | Supplemental: rerank input documents and ranking output. |
| `experimental_decision` | boolean | Supplemental: experimental decision state, questions, and answers (`ai.decision.*`). |
| `runtimeContext` | boolean | Supplemental: `ai.settings.context.*`. |
| `headers` | boolean | Supplemental: `ai.request.headers.*`. |
| `toolChoice` | boolean | Supplemental: `ai.prompt.toolChoice`. |
| `schema` | boolean | Supplemental: object generation schema and output mode attributes. |

All supplemental attributes are disabled by default. `recordInputs` and `recordOutputs` are still respected for supplemental input and output attributes.

### Telemetry integration lifecycle methods

Implement the `Telemetry` interface from `ai`; all methods are optional.

| Name | Type | Description |
| --- | --- | --- |
| `onStart` | `(event: GenerateTextStartEvent) => void \| PromiseLike<void>` | Called when the generation operation begins, before any LLM calls. |
| `onStepStart` | `(event: GenerateTextStepStartEvent) => void \| PromiseLike<void>` | Called when a step (LLM call) begins, before the provider is called. |
| `onLanguageModelCallStart` | `(event: LanguageModelCallStartEvent) => void \| PromiseLike<void>` | Called immediately before the provider model call begins. Useful for model-only spans or logging. |
| `onLanguageModelCallEnd` | `(event: LanguageModelCallEndEvent) => void \| PromiseLike<void>` | Called after the model response has been normalized and parsed, but before any client-side tool execution begins. Includes provider-specific metadata when available. |
| `onToolExecutionStart` | `(event: ToolExecutionStartEvent) => void \| PromiseLike<void>` | Called when a tool's execute function is about to run. |
| `onToolExecutionEnd` | `(event: ToolExecutionEndEvent) => void \| PromiseLike<void>` | Called when a tool's execute function completes or errors. |
| `onStepEnd` | `(event: GenerateTextStepEndEvent) => void \| PromiseLike<void>` | Called when a step (LLM call) completes. |
| `onEmbedEnd` | `(event: EmbeddingModelCallEndEvent) => void \| PromiseLike<void>` | Called when an individual embedding model call completes. |
| `onRerankEnd` | `(event: RerankingModelCallEndEvent) => void \| PromiseLike<void>` | Called when an individual reranking model call completes. |
| `experimental_onDecideStart` | `(event: Experimental_DecideStartEvent) => void \| PromiseLike<void>` | Called when an experimental decision operation begins. |
| `experimental_onDecisionModelCallStart` | `(event: Experimental_DecisionModelCallStartEvent) => void \| PromiseLike<void>` | Called when the logical decision model call begins. The call includes any provider retries. |
| `experimental_onDecisionModelCallEnd` | `(event: Experimental_DecisionModelCallEndEvent) => void \| PromiseLike<void>` | Called when the logical decision model call, including any retries, completes. |
| `experimental_onDecideEnd` | `(event: Experimental_DecideEndEvent) => void \| PromiseLike<void>` | Called when an experimental decision operation completes. |
| `onEnd` | `(event: GenerateTextEndEvent) => void \| PromiseLike<void>` | Called when the entire generation completes (all steps finished). |
| `onAbort` | `(event: GenerateTextAbortEvent) => void \| PromiseLike<void>` | Called when a streaming text generation operation is aborted before it completes. |
| `onError` | `(event: { callId: string; error: unknown }) => void \| PromiseLike<void>` | Called when an unrecoverable error occurs. The event identifies the operation and contains the thrown value. |

Event types match the corresponding lifecycle callbacks (see `../core/lifecycle-callbacks.md`).

### Telemetry integrations

Register several integrations at once (they all receive the same lifecycle events):

```ts
import { registerTelemetry } from 'ai';
import { OpenTelemetry } from '@ai-sdk/otel';
import { DevToolsTelemetry } from '@ai-sdk/devtools';

registerTelemetry(new OpenTelemetry(), DevToolsTelemetry());
```

Per-call integrations:

```ts
const result = streamText({
  model,
  prompt: 'Hello!',
  telemetry: {
    integrations: [DevToolsTelemetry()],
  },
});
```

Custom integration:

```ts
import type { Telemetry } from 'ai';

class MyIntegration implements Telemetry {
  async onStart(event) {
    console.log('Generation started:', event.modelId);
  }

  async onStepEnd(event) {
    console.log(
      `Step ${event.stepNumber} done:`,
      event.usage.totalTokens,
      'tokens',
    );
  }

  async onToolExecutionEnd(event) {
    if (event.toolOutput.type === 'tool-result') {
      console.log(
        `Tool "${event.toolCall.toolName}" took ${event.toolExecutionMs}ms`,
      );
    } else {
      console.error(
        `Tool "${event.toolCall.toolName}" failed:`,
        event.toolOutput.error,
      );
    }
  }

  async onEnd(event) {
    console.log('Done. Total tokens:', event.usage.totalTokens);
  }

  async onAbort(event) {
    console.log('Stream aborted after', event.steps.length, 'finished steps');
  }

  async onError(event) {
    console.error('Generation failed:', event.callId, event.error);
  }
}

export function myIntegration(): Telemetry {
  return new MyIntegration();
}
```

Node.js tracing channel (`ai:telemetry`):

```ts
import { tracingChannel } from 'node:diagnostics_channel';
import {
  AI_SDK_TELEMETRY_TRACING_CHANNEL,
  type TelemetryTracingChannelMessage,
} from 'ai';

tracingChannel(AI_SDK_TELEMETRY_TRACING_CHANNEL).subscribe({
  start(message) {
    const telemetryMessage = message as TelemetryTracingChannelMessage;

    if (telemetryMessage.type === 'onStart') {
      // Inspect telemetryMessage.event and forward it to your provider.
    }
  },
});
```

Custom span attributes and supplemental attributes:

```ts
registerTelemetry(
  new OpenTelemetry({
    enrichSpan: ({ spanType, operationId, callId, runtimeContext }) => {
      return {
        ...getCustomAttributes(runtimeContext, spanType),
        'my_app.operation_id': operationId,
        'my_app.call_id': callId,
      };
    },
    usage: true,
    providerMetadata: true,
    runtimeContext: true,
  }),
);
```

### Collected data

#### GenAI semantic conventions (`OpenTelemetry`, recommended)

Spans follow the OpenTelemetry Semantic Conventions for GenAI; attributes use the `gen_ai.*` prefix and provider names are mapped to well-known values (e.g. `openai`, `anthropic`, `gcp.vertex_ai`).

| Operation | Spans |
| --- | --- |
| `generateText` / `streamText` | `invoke_agent {modelId}` (root, `INTERNAL`, whole operation incl. all steps and tool calls); `chat {modelId}` (step, `CLIENT`, one per provider call); `execute_tool {toolName}` (tool, `INTERNAL`, nested under the step span) |
| `embed` / `embedMany` | `embeddings {modelId}` root span plus one inner `embeddings {modelId}` span per provider request (`embedMany`: one per provider batch call); usage recorded only on inner spans |
| `rerank` | `rerank {modelId}` root span plus one inner `rerank {modelId}` span per provider rerank call |
| `generateSpeech` / `transcribe` / `experimental_streamTranscribe` | single `CLIENT` span `{operationId} {modelId}` with `operationId` `ai.generateSpeech`, `ai.transcribe`, or `ai.streamTranscribe` |
| `experimental_decide` | `decide {modelId}` root span plus one child `decide {modelId}` span (`gen_ai.operation.name: "decide"`); token usage on the child span |

Root `invoke_agent` span attributes: `gen_ai.operation.name` (`"invoke_agent"`), `gen_ai.provider.name`, `gen_ai.request.model`, `gen_ai.agent.name` (the `functionId`), `gen_ai.system_instructions` and `gen_ai.input.messages` (when `recordInputs`), `gen_ai.request.{temperature,max_tokens,top_p,top_k,frequency_penalty,presence_penalty,stop_sequences,seed}`; on finish `gen_ai.response.finish_reasons`, `gen_ai.usage.input_tokens`, `gen_ai.usage.output_tokens`, `gen_ai.usage.cache_read.input_tokens`, `gen_ai.usage.cache_creation.input_tokens`, `gen_ai.output.messages` (when `recordOutputs`).

`chat` step span attributes: request parameters, `gen_ai.system_instructions`, `gen_ai.input.messages`, `gen_ai.tool.definitions` (when `recordInputs`); on finish `gen_ai.response.finish_reasons`, `gen_ai.response.id`, `gen_ai.response.model`, usage attributes, `gen_ai.client.operation.duration` (seconds), `gen_ai.client.operation.time_to_first_chunk` and `gen_ai.client.operation.time_per_output_chunk` (streaming only), `gen_ai.output.messages`.

`execute_tool` span attributes: `gen_ai.operation.name` (`"execute_tool"`), `gen_ai.tool.name`, `gen_ai.tool.call.id`, `gen_ai.tool.type` (`"function"`), `gen_ai.tool.call.arguments` (when `recordInputs`), `gen_ai.execute_tool.duration` (seconds), `gen_ai.tool.call.result` (when `recordOutputs`, only on success).

GenAI messages are JSON arrays of objects with `role` and a `parts` array; part types are `text`, `reasoning`, `tool_call`, `tool_call_response`, `blob` (base64), `uri`. Output messages also include `finish_reason`.

#### Legacy AI SDK spans (`LegacyOpenTelemetry`)

Emits `ai.*` prefixed attributes: `ai.generateText` / `ai.generateText.doGenerate` / `ai.toolCall`, `ai.streamText` / `ai.streamText.doStream` (plus `ai.stream.firstChunk` and `ai.stream.finish` events), `ai.embed` / `ai.embed.doEmbed`, `ai.embedMany` / `ai.embedMany.doEmbed`. Common attributes include `operation.name`, `ai.operationId`, `ai.model.id`, `ai.model.provider`, `ai.settings.maxRetries`, `ai.telemetry.functionId`, `ai.usage.completionTokens`, `ai.usage.promptTokens`, `ai.response.*`. Usage attribute names in the legacy format are `ai.usage.*`.

## Notes

- Telemetry is opt-out: once an integration is registered, supported calls emit events unless `telemetry: { isEnabled: false }`.
- Not registering integrations with `registerTelemetry()` prevents delivery to globally registered integrations, but does not disable per-call integrations or Node.js tracing-channel subscribers. To disable telemetry events for a call, including tracing-channel events, pass `telemetry: { isEnabled: false }` on every call.
- `telemetry.includeRuntimeContext` and `telemetry.includeToolsContext` only filter telemetry integrations (including OpenTelemetry). Lifecycle callbacks, tool execution, and returned results still receive the full context.
- Per-call `telemetry.integrations` replace the globally registered integrations for that call. Errors inside integrations are caught and do not break the generation flow.
- An integration that wraps or delegates to another integration must explicitly forward the experimental streaming transcription callbacks (`experimental_onStreamTranscriptionStart` / `experimental_onStreamTranscriptionEnd`); forwarding only `onStart` and `onEnd` does not observe `experimental_streamTranscribe`.
- For `generateSpeech` and transcription, raw audio is never included in telemetry events; only byte length and media type (and text / transcript) are recorded.
- Built-in OpenTelemetry integrations record numeric provider usage by default, preserving each reported unit (`gen_ai.usage.characters`, `gen_ai.usage.seconds`, `gen_ai.usage.input_tokens`; `LegacyOpenTelemetry` uses `ai.usage.*`). Enabling `usage: true` also records the supplemental `ai.response.usage` attribute.
- Experimental decision callbacks and `experimental_decide` spans are not part of the stable `onStart` / `onEnd` event unions. `experimental_decide` does not emit a `gen_ai.evaluation.result` event.
- `generateObject` and `streamObject` are deprecated; use `generateText` / `streamText` with the `output` property. They emit the same span hierarchy with `gen_ai.output.type: "json"`.
- `LegacyOpenTelemetry` is the legacy format; the page recommends migrating to `OpenTelemetry`.
- The `@ai-sdk/otel` package is separate from `ai`; install it explicitly.

## Related

- [DevTools](./devtools.md)
- [Lifecycle Callbacks](../core/lifecycle-callbacks.md)
- [Runtime and Tool Context](../tools-mcp/runtime-and-tool-context.md)
