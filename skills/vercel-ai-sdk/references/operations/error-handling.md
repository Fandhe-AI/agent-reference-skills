---
source: https://ai-sdk.dev/docs/ai-sdk-core/error-handling
---

# Error Handling

How errors surface from AI SDK Core calls: regular errors are thrown, `streamText` reports errors as stream parts, and provider errors after streaming starts can be retried with `streamRetries`.

## Signature / Usage

```ts
import { generateText } from 'ai';

try {
  const { text } = await generateText({
    model,
    prompt: 'Write a vegetarian lasagna recipe for 4 people.',
  });
} catch (error) {
  // handle error
}
```

Streaming with `error` part support (`stream` result):

```ts
import { StreamProviderError, streamText } from 'ai';

try {
  const { stream } = streamText({
    model,
    prompt: 'Write a vegetarian lasagna recipe for 4 people.',
  });

  for await (const part of stream) {
    switch (part.type) {
      // ... handle other part types

      case 'error': {
        const error = part.error;

        if (StreamProviderError.isInstance(error)) {
          console.error(error.message, {
            type: error.type,
            code: error.code,
            statusCode: error.statusCode,
            isRetryable: error.isRetryable,
          });
        }
        break;
      }

      case 'abort': {
        // handle stream abort
        break;
      }

      case 'tool-error': {
        const error = part.error;
        // handle error
        break;
      }
    }
  }
} catch (error) {
  // handle error
}
```

Retrying provider errors after streaming starts:

```ts
const { textStream } = streamText({
  model,
  prompt: 'Write a vegetarian lasagna recipe for 4 people.',
  streamRetries: 2,
});
```

Callback-directed recovery (set `streamRetries` explicitly; `0` makes a retry callback-directed only):

```ts
const result = streamText({
  model,
  prompt: 'Write a vegetarian lasagna recipe for 4 people.',
  streamRetries: 0,
  onError: ({ error }) => {
    if (isTransientProviderError(error)) {
      return { retry: true };
    }
  },
});
```

Aborts:

```ts
const { textStream } = streamText({
  model,
  prompt: 'Write a vegetarian lasagna recipe for 4 people.',
  onAbort: ({ steps }) => {
    console.log('Stream aborted after', steps.length, 'steps');
  },
  onEnd: ({ steps, totalUsage }) => {
    console.log('Stream completed normally');
  },
});
```

## Notes

- Regular errors (`generateText`, simple streams that do not support error chunks) are thrown and handled with `try/catch`. See `errors.md` for the error types.
- `maxRetries` retries failures that happen while starting a model call. `streamRetries` retries well-formed provider error events received after response streaming has begun.
- Stream retries rerun only the failed model step with the same accumulated conversation and generation context. Earlier completed steps, including their tool calls and tool results, are not replayed. Tool input, tool calls, approval requests, tool callbacks, and client-side tool execution from a failed attempt are discarded; they are only exposed or executed after an attempt reaches a successful model-call finish.
- Well-formed provider error events are normalized into `StreamProviderError` instances. The same instance is supplied to `onError` and, if recovery is not requested or retries are exhausted, to the `error` part in the full stream. Use its `isRetryable` metadata when deciding whether to request recovery.
- A retry remains part of the same logical step. `onStepStart` runs once for that step. `onLanguageModelCallStart` runs for each provider call attempt, while `onLanguageModelCallEnd` runs only for attempts that reach a model-call finish.
- Callback-directed recovery is limited to one retry per logical step. When automatic retries are configured, `onError` can request one additional retry after the automatic retry budget is exhausted, bounding the total recovery calls for a step to `streamRetries + 1`.
- When `streamRetries` is omitted, all stream retry behavior is disabled and an existing logging-only `onError` callback retains incremental tool streaming. An `onError` return value other than `{ retry: true }` keeps its previous behavior and does not request recovery. Recovered provider error events are not emitted as final `error` parts.
- Warning: non-tool output emitted before a provider error cannot be retracted. A retried model step may append repeated or divergent partial text, reasoning, files, or sources to consumer streams. Open text and reasoning parts are ended before recovered output begins. Failed-attempt output is excluded from the recovered step result, structured output parsing, response messages, and subsequent model steps. Final request and response metadata come from the recovered attempt. Retries add latency and may incur additional provider usage and cost.
- Warning: failed-attempt isolation prevents AI SDK client-side tools from executing, but it cannot undo work already performed by provider-executed tools. Retrying a step after provider-side work may repeat that work or its cost. Use idempotency controls for provider-executed side effects.
- `onAbort` is called when a stream is aborted via `AbortSignal`, but `onEnd` is not called. `onAbort` receives `steps`: an array of all completed steps before the abort.

## Related

- [AI SDK Errors](./errors.md)
- [Stopping Streams](./stopping-streams.md)
- [Troubleshooting](./troubleshooting.md)
- [streamText](../core/stream-text.md)
- [Lifecycle Callbacks](../core/lifecycle-callbacks.md)
