---
source: https://ai-sdk.dev/docs/reference/ai-sdk-core/pipe-agent-ui-stream-to-response
---

# pipeAgentUIStreamToResponse

Runs an `Agent` and streams the resulting UI message output directly to a Node.js `ServerResponse`. Intended for real-time streaming endpoints in Node.js-based frameworks like Express, Hono, or custom Node servers.

## Signature / Usage

```ts
import { pipeAgentUIStreamToResponse } from 'ai';
```

```ts
import { pipeAgentUIStreamToResponse } from 'ai';
import { MyAgent } from './agent';

export async function handler(req, res) {
  const { messages } = JSON.parse(req.body);

  await pipeAgentUIStreamToResponse({
    response: res, // Node.js ServerResponse
    agent: MyAgent,
    uiMessages: messages, // Required: array of input UI messages
    // abortSignal: optional AbortSignal for cancellation
    // experimental_sandbox: optional experimental sandbox passed through to tool execution
    // status: 200,
    // headers: { ... },
    // ...other optional UI message stream options
  });
}
```

Returns `Promise<void>`; completes when the UI message stream has been fully sent to the provided ServerResponse.

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `response` | `ServerResponse` | — | Required. The Node.js ServerResponse object to pipe UI message stream output into. |
| `agent` | `Agent` | — | Required. An agent instance implementing `.stream({ prompt, ... })` and defining a `tools` property. |
| `uiMessages` | `unknown[]` | — | Required. Array of input UI messages sent to the agent. |
| `convertDataPart` | `(part: DataUIPart) => TextPart \| FilePart \| undefined` | — | Optional. Converts custom UI data parts into text or file parts for the model. Ignored when omitted or returns undefined. |
| `abortSignal` | `AbortSignal` | — | Optional abort signal to cancel streaming (e.g., on client disconnect). |
| `timeout` | `number \| { totalMs?: number }` | — | Timeout in milliseconds. Can be used alongside abortSignal. |
| `experimental_sandbox` | `Experimental_SandboxSession` | — | Optional experimental sandbox passed through to tool execution. |
| `options` | `CALL_OPTIONS` | — | Optional agent call options, for agents configured with generic parameter `CALL_OPTIONS`. |
| `experimental_transform` | `StreamTextTransform \| StreamTextTransform[]` | — | Optional stream text transformation(s) applied to agent output. |
| `onStepEnd` | `GenerateTextOnStepEndCallback` | — | Called after each agent step (LLM/tool call) completes. |
| `onStepFinish` | `GenerateTextOnStepFinishCallback` | — | Deprecated. Use `onStepEnd` instead. Only used as a fallback when `onStepEnd` is not provided. |
| `onUIMessageStepEnd` | `UIMessageStreamOnStepEndCallback` | — | Called after each UI message step is assembled. Receives `messages`, `isContinuation`, and the accumulated `responseMessage`. |
| `...UIMessageStreamResponseInit & AgentUIMessageStreamOptions` | `object` | — | Options for streaming headers, status, SSE stream config, and additional UI message stream control. |

## Example: Express Route Handler

```ts
import { pipeAgentUIStreamToResponse } from 'ai';
import { openaiWebSearchAgent } from './openai-web-search-agent';

app.post('/chat', async (req, res) => {
  // Use req.body.messages as input UI messages
  await pipeAgentUIStreamToResponse({
    response: res,
    agent: openaiWebSearchAgent,
    uiMessages: req.body.messages,
    // experimental_sandbox, // optional
    // abortSignal: yourController.signal
    // status: 200,
    // headers: { ... },
    // ...more options
  });
});
```

## Notes

- Node.js only: works with Node.js `ServerResponse` objects (e.g., Express, Hono's node adapter), not Edge/serverless/web Response APIs. It writes bytes directly to the ServerResponse and does not return a response object.
- Use an `AbortSignal` (for example wired to Express/Hono client disconnects) for quick cancellation of agent computation and streaming.
- The property for input messages is `uiMessages` (not `messages`).
- `onUIMessageStepEnd` is awaited before the corresponding `finish-step` chunk is piped. Use idempotent writes and protect model output, reasoning, tool inputs, and tool outputs as sensitive conversation data.
- Make sure your client (and any proxies) correctly support streaming HTTP responses. Framework-side routing is covered by hono and fastify.

## Related

- [createAgentUIStreamResponse](./create-agent-ui-stream-response.md)
- [createAgentUIStream](./create-agent-ui-stream.md)
- [Agent](./agent.md)
