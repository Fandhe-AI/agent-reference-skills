---
source: https://ai-sdk.dev/docs/advanced/stopping-streams
---

# Stopping Streams

Canceling ongoing streams: `abortSignal` and `onAbort` in AI SDK Core, the `stop` helper of AI SDK UI hooks, and `consumeStream` for UI message streams.

## Signature / Usage

AI SDK Core functions have an `abortSignal` argument to cancel a stream from the server side to the LLM API, e.g. by forwarding the request signal:

```tsx
import { createTextStreamResponse, streamText, toTextStream } from 'ai';

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const result = streamText({
    model,
    prompt,
    // forward the abort signal:
    abortSignal: req.signal,
    onAbort: ({ steps }) => {
      // Handle cleanup when stream is aborted
      console.log('Stream aborted after', steps.length, 'steps');
      // Persist partial results to database
    },
  });

  return createTextStreamResponse({
    stream: toTextStream({ stream: result.stream }),
  });
}
```

AI SDK UI hooks (`useChat`, `useCompletion`) provide a `stop` helper:

```tsx
'use client';

import { useCompletion } from '@ai-sdk/react';

export default function Chat() {
  const { input, completion, stop, status, handleSubmit, handleInputChange } =
    useCompletion();

  return (
    <div>
      {(status === 'submitted' || status === 'streaming') && (
        <button type="button" onClick={() => stop()}>
          Stop
        </button>
      )}
      {completion}
      <form onSubmit={handleSubmit}>
        <input value={input} onChange={handleInputChange} />
      </form>
    </div>
  );
}
```

On Vercel, enable request cancellation per function in `vercel.json`:

```json
{
  "functions": {
    "app/api/chat/route.ts": {
      "supportsCancellation": true
    }
  }
}
```

UI message streams: pass `consumeStream` as `consumeSseStream` and read `isAborted` in `onEnd`:

```tsx
import {
  consumeStream,
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  UIMessage,
} from 'ai';

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model,
    messages: await convertToModelMessages(messages),
    abortSignal: req.signal,
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({
      stream: result.stream,
      onEnd: async ({ isAborted }) => {
        if (isAborted) {
          console.log('Stream was aborted');
          // Handle abort-specific cleanup
        } else {
          console.log('Stream completed normally');
          // Handle normal completion
        }
      },
    }),
    consumeSseStream: consumeStream,
  });
}
```

Handle abort inside the stream with the `abort` part:

```tsx
for await (const part of result.stream) {
  switch (part.type) {
    case 'text-delta':
      // Handle text delta content
      break;
    case 'abort':
      // Handle abort event directly in stream
      console.log('Stream was aborted');
      break;
    // ... other cases
  }
}
```

## Notes

- Warning: stream abort functionality is not compatible with stream resumption. With `resume: true` in `useChat`, abort breaks the resumption mechanism. Choose either abort or resume, not both.
- `stop()` aborts the HTTP request from the client. To also stop the model request on the server, the server runtime must propagate the client disconnect to the request's `AbortSignal`, and the route must forward that signal to the Core call as `abortSignal`.
- On Vercel, request cancellation is only supported in the Node.js runtime and must be enabled for each function that needs it via `supportsCancellation`. Without it, `stop()` still stops the client-side stream but server-side generation may continue.
- `onAbort` is called when a stream is aborted via `AbortSignal`; unlike `onEnd` (normal completion), it is specifically for aborts. It receives `steps`: all completed steps before the abort. Useful for persisting partial conversation history, saving partial progress, cleaning up resources, and logging abort events.
- For UI message streams (`toUIMessageStreamResponse`), the `onEnd` callback also receives an `isAborted` parameter, so both cases can be handled in one callback.
- `consumeStream` is necessary for proper abort handling in UI message streams; it ensures the stream is consumed even when aborted, preventing memory leaks or hanging connections.
- `onEnd` distinguishes consumer cancellation from an observed abort. When the consumer cancels before an outcome is declared (e.g. client disconnect), `isCancelled` is `true`, `outcome.status` remains `'unknown'`, and `isAborted` remains `false`. When an `abort` part is observed first, `outcome.status` is `'aborted'`, `isAborted` is `true`, and `isCancelled` is absent. Check both flags when the same cleanup should run for either case.
- Warning: AI SDK RSC does not currently support stopping streams.

## Related

- [Error Handling](./error-handling.md)
- [Vercel Deployment Guide](./vercel-deployment-guide.md)
- [Troubleshooting](./troubleshooting.md)
- useChat
