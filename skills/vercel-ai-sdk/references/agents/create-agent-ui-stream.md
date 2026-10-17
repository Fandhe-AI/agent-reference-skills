---
source: https://ai-sdk.dev/docs/reference/ai-sdk-core/create-agent-ui-stream
---

# createAgentUIStream

Executes an `Agent`, consumes an array of UI messages, and streams the agent's output as UI message chunks via an async iterable. Suited to chat APIs, dashboards, or bots powered by agents in your own runtime.

## Signature / Usage

```ts
import { createAgentUIStream } from 'ai';
```

```ts
import { ToolLoopAgent, createAgentUIStream } from 'ai';

const agent = new ToolLoopAgent({
  model,
  instructions: 'You are a helpful assistant.',
  tools: { weather: weatherTool, calculator: calculatorTool },
});

export async function* streamAgent(
  uiMessages: unknown[],
  abortSignal?: AbortSignal,
) {
  const stream = await createAgentUIStream({
    agent,
    uiMessages,
    abortSignal,
    // experimental_sandbox, // optional: pass an experimental sandbox through to tool execution
    // ...other options (see below)
  });

  for await (const chunk of stream) {
    yield chunk; // Each chunk is a UI message output from the agent.
  }
}
```

Returns `Promise<AsyncIterableStream<UIMessageChunk>>`; each chunk is a UI message output from the agent. It can be consumed with any async iterator loop, or piped to a streaming HTTP response, socket, or any other sink.

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `agent` | `Agent` | — | Required. The agent to run. Must define its `tools` and implement `.stream({ prompt, ... })`. |
| `uiMessages` | `unknown[]` | — | Required. Array of input UI message objects (e.g., user/assistant/chat history). These will be validated and converted for the agent. |
| `convertDataPart` | `(part: DataUIPart) => TextPart \| FilePart \| undefined` | — | Optional. Converts custom UI data parts into text or file parts for the model. Data parts are ignored when this callback is omitted or returns undefined. |
| `abortSignal` | `AbortSignal` | — | Optional abort signal to cancel the stream early (for example, if the client disconnects). |
| `timeout` | `number \| { totalMs?: number }` | — | Timeout in milliseconds. The call will be aborted if it takes longer than the specified timeout. Can be used alongside abortSignal. |
| `experimental_sandbox` | `Experimental_SandboxSession` | — | Optional experimental sandbox environment passed through to tool execution. |
| `options` | `CALL_OPTIONS` | — | Optional agent call options, only needed if your agent expects extra configuration. |
| `experimental_transform` | `StreamTextTransform \| StreamTextTransform[]` | — | Optional transformations to apply to the agent output stream (experimental). |
| `onStepEnd` | `GenerateTextOnStepEndCallback` | — | Called after each agent step (LLM/tool call) completes. |
| `onStepFinish` | `GenerateTextOnStepFinishCallback` | — | Deprecated. Use `onStepEnd` instead. Only used as a fallback when `onStepEnd` is not provided. |
| `onUIMessageStepEnd` | `UIMessageStreamOnStepEndCallback` | — | Called after each UI message step is assembled. Receives `messages`, `isContinuation`, and the accumulated `responseMessage`. |
| `...UIMessageStreamOptions` | `UIMessageStreamOptions` | — | Additional options to control the UI message stream, including message IDs, metadata, final callbacks, sources, and reasoning. |

### Persisting the UI Message After Each Step

```ts
const stream = await createAgentUIStream({
  agent,
  uiMessages,
  generateMessageId: () => crypto.randomUUID(),
  onUIMessageStepEnd: async ({ messages, responseMessage, isContinuation }) => {
    await upsertConversation({
      messages,
      responseMessage,
      isContinuation,
    });
  },
  onEnd: async ({ responseMessage }) => {
    // Save final metadata and any partial message when the stream ends.
    await upsertMessage(responseMessage);
  },
});

for await (const chunk of stream) {
  // Consume or forward the stream so the callback can run.
}
```

### How It Works

1. UI Message Validation: the input `uiMessages` array is validated and normalized using the agent's `tools` definition. Invalid messages cause an error.
2. Conversion to Model Messages.
3. Agent Streaming: the agent's `.stream({ prompt, ... })` method is invoked with the converted model messages, optional call options, abort signal, experimental_sandbox, and any experimental transforms.
4. UI Message Stream Building: exposed as a streaming async iterable of UI message chunks.

## Notes

- The parameter is named `uiMessages`, not `messages`.
- `onStepEnd` receives the low-level generation step result (usage, finish reason, tool call details); `onUIMessageStepEnd` runs after that step has been converted to UI message parts and receives the response message accumulated so far.
- `onUIMessageStepEnd` runs as the UI stream is consumed and is awaited before the `finish-step` chunk continues. This delays UI stream delivery; it does not guarantee the next model call has not started. If it throws, the error is passed to `onError` and streaming continues. Use idempotent writes (each callback contains a growing snapshot of the same response message). UI messages can contain model output, reasoning, tool inputs, and tool outputs, so apply the same access controls and sensitive-data handling as for final conversation persistence.
- For HTTP responses, see `createAgentUIStreamResponse` (Web) or `pipeAgentUIStreamToResponse` (Node.js).

## Related

- [Agent](./agent.md)
- [ToolLoopAgent](./tool-loop-agent.md)
- [createAgentUIStreamResponse](./create-agent-ui-stream-response.md)
- [pipeAgentUIStreamToResponse](./pipe-agent-ui-stream-to-response.md)
