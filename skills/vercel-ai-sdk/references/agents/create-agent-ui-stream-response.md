---
source: https://ai-sdk.dev/docs/reference/ai-sdk-core/create-agent-ui-stream-response
---

# createAgentUIStreamResponse

Executes an `Agent`, runs its streaming output as a UI message stream, and returns an HTTP `Response` whose body is the live UI message output. Designed for API routes that deliver real-time agent results (chat endpoints, streaming tool-use).

## Signature / Usage

```ts
import { createAgentUIStreamResponse } from 'ai';
```

```ts
import { ToolLoopAgent, createAgentUIStreamResponse } from 'ai';

const agent = new ToolLoopAgent({
  model,
  instructions: 'You are a helpful assistant.',
  tools: { weather: weatherTool, calculator: calculatorTool },
});

export async function POST(request: Request) {
  const { messages } = await request.json();

  return createAgentUIStreamResponse({
    agent,
    uiMessages: messages,
    abortSignal: request.signal, // optional: aborts when the client disconnects
    // experimental_sandbox, // optional: passed through to tool execution
    // ...other UIMessageStreamOptions like sendSources, experimental_transform, etc.
  });
}
```

Returns `Promise<Response>` whose `body` is a streaming UI message output from the agent.

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `agent` | `Agent` | — | Required. The agent instance to stream responses from. Must implement `.stream({ prompt, ... })` and define the `tools` property. |
| `uiMessages` | `unknown[]` | — | Required. Array of input UI messages provided to the agent. |
| `convertDataPart` | `(part: DataUIPart) => TextPart \| FilePart \| undefined` | — | Optional. Converts custom UI data parts into text or file parts for the model. Ignored when omitted or returns undefined. |
| `abortSignal` | `AbortSignal` | — | Optional abort signal to cancel streaming, e.g., on client disconnect. |
| `timeout` | `number \| { totalMs?: number }` | — | Timeout in milliseconds. Can be used alongside abortSignal. |
| `experimental_sandbox` | `Experimental_SandboxSession` | — | Optional experimental sandbox passed through to tool execution. |
| `options` | `CALL_OPTIONS` | — | Optional agent call options, for agents with generic parameter `CALL_OPTIONS`. |
| `experimental_transform` | `StreamTextTransform \| StreamTextTransform[]` | — | Optional stream transforms to post-process text output. |
| `onStepEnd` | `GenerateTextOnStepEndCallback` | — | Called after each agent step (LLM/tool call) completes. |
| `onStepFinish` | `GenerateTextOnStepFinishCallback` | — | Deprecated. Use `onStepEnd` instead. Only used as a fallback when `onStepEnd` is not provided. |
| `onUIMessageStepEnd` | `UIMessageStreamOnStepEndCallback` | — | Called after each UI message step is assembled. Receives `messages`, `isContinuation`, and the accumulated `responseMessage` for intermediate persistence. |
| `...UIMessageStreamOptions` | `UIMessageStreamOptions` | — | Other UI message output options, including message IDs, metadata, final callbacks, sources, and reasoning. |
| `headers` | `HeadersInit` | — | Optional HTTP headers to include in the Response object. |
| `status` | `number` | — | Optional HTTP status code. |
| `statusText` | `string` | — | Optional HTTP status text. |
| `consumeSseStream` | `(options: { stream: ReadableStream<string> }) => PromiseLike<void> \| void` | — | Optional function to consume the SSE stream. When provided, called with the SSE stream to handle consumption. |

### Example: Next.js API Route Handler

```ts
import { createAgentUIStreamResponse } from 'ai';
import { MyCustomAgent } from '@/agent/my-custom-agent';

export async function POST(request: Request) {
  const { messages } = await request.json();

  return createAgentUIStreamResponse({
    agent: MyCustomAgent,
    uiMessages: messages,
    // experimental_sandbox, // optional
    sendSources: true, // (optional)
    // headers, status, abortSignal, and other UIMessageStreamOptions also supported
  });
}
```

## Notes

- Your agent must implement `.stream({ prompt, ... })` and define a `tools` property (even if just `{}`).
- Server only: call from backend contexts (API routes, edge/serverless/server route handlers). Not for browser use.
- Use `onUIMessageStepEnd` to persist the accumulated UI response after every agent step; it is awaited before the corresponding `finish-step` chunk continues. Use idempotent writes and protect model output, reasoning, tool inputs, and tool outputs as sensitive conversation data. `onStepEnd` remains the low-level generation callback (usage, finish reasons, raw step details).
- Relies on `ReadableStream`; your platform/client must support HTTP streaming consumption.
- Works in serverless, Next.js, Express, Hono, or edge runtime contexts. HTTP framework routing itself is covered by nextjs-app, hono, fastify, tanstack-start.

## Related

- [Agent](./agent.md)
- [ToolLoopAgent](./tool-loop-agent.md)
- [createAgentUIStream](./create-agent-ui-stream.md)
- [pipeAgentUIStreamToResponse](./pipe-agent-ui-stream-to-response.md)
