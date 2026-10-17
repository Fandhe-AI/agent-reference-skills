---
source: https://ai-sdk.dev/docs/advanced/caching
---

# Caching

Caching AI provider responses: recommended via language model middleware (`wrapGenerate` / `wrapStream` with `simulateReadableStream`), or via lifecycle callbacks such as `onEnd`.

## Signature / Usage

Language model middleware (recommended), with `@upstash/redis` as the example store:

```ts
import { Redis } from '@upstash/redis';
import {
  type LanguageModelV4,
  type LanguageModelV4Middleware,
  type LanguageModelV4StreamPart,
  simulateReadableStream,
} from 'ai';

const redis = new Redis({
  url: process.env.KV_URL,
  token: process.env.KV_TOKEN,
});

// Pass the identifier of the model the middleware wraps (e.g. 'gpt-4o'),
// so responses from different models never share a cache entry.
export const createCacheMiddleware = (
  modelId: string,
): LanguageModelV4Middleware => ({
  specificationVersion: 'v4',
  wrapGenerate: async ({ doGenerate, params }) => {
    const cacheKey = JSON.stringify({ mode: 'generate', model: modelId, params });

    const cached = (await redis.get(cacheKey)) as Awaited<
      ReturnType<LanguageModelV4['doGenerate']>
    > | null;

    if (cached !== null) {
      return {
        ...cached,
        response: {
          ...cached.response,
          timestamp: cached?.response?.timestamp
            ? new Date(cached?.response?.timestamp)
            : undefined,
        },
      };
    }

    const result = await doGenerate();

    try {
      await redis.set(cacheKey, result, { ex: 60 * 60 });
    } catch (error) {
      console.error('cache write failed', error);
    }

    return result;
  },
  wrapStream: async ({ doStream, params }) => {
    const cacheKey = JSON.stringify({ mode: 'stream', model: modelId, params });

    // Check if the result is in the cache
    const cached = await redis.get(cacheKey);

    // If cached, return a simulated ReadableStream that yields the cached result
    if (cached !== null) {
      // Format the timestamps in the cached response
      const formattedChunks = (cached as LanguageModelV4StreamPart[]).map(p => {
        if (p.type === 'response-metadata' && p.timestamp) {
          return { ...p, timestamp: new Date(p.timestamp) };
        } else return p;
      });
      return {
        stream: simulateReadableStream({
          initialDelayInMs: 0,
          chunkDelayInMs: 10,
          chunks: formattedChunks,
        }),
      };
    }

    // If not cached, proceed with streaming
    const { stream, ...rest } = await doStream();

    const fullResponse: LanguageModelV4StreamPart[] = [];
    let hasError = false;
    let sawFinish = false;

    const transformStream = new TransformStream<
      LanguageModelV4StreamPart,
      LanguageModelV4StreamPart
    >({
      transform(chunk, controller) {
        if (chunk.type === 'error') hasError = true;
        if (chunk.type === 'finish') sawFinish = true;
        fullResponse.push(chunk);
        controller.enqueue(chunk);
      },
      async flush() {
        // Store the full response only if the stream completed without errors
        if (hasError || !sawFinish) return;
        try {
          await redis.set(cacheKey, fullResponse, { ex: 60 * 60 });
        } catch (error) {
          console.error('cache write failed', error);
        }
      },
    });

    return {
      stream: stream.pipeThrough(transformStream),
      ...rest,
    };
  },
});
```

Lifecycle callbacks (`onEnd`), caching the response text for 1 hour (Next.js route):

```tsx
import {
  convertToModelMessages,
  createTextStreamResponse,
  streamText,
  toTextStream,
  UIMessage,
} from 'ai';
import { Redis } from '@upstash/redis';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const redis = new Redis({
  url: process.env.KV_URL,
  token: process.env.KV_TOKEN,
});

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  // come up with a key based on the request:
  const key = JSON.stringify(messages);

  // Check if we have a cached response
  const cached = (await redis.get(key)) as string | null;
  if (cached != null) {
    return new Response(cached, {
      status: 200,
      headers: { 'Content-Type': 'text/plain' },
    });
  }

  // Call the language model:
  const result = streamText({
    model,
    messages: await convertToModelMessages(messages),
    async onEnd({ text }) {
      // Cache the response text:
      await redis.set(key, text);
      await redis.expire(key, 60 * 60);
    },
  });

  // Respond with a text stream, matching the cached plain text response
  return createTextStreamResponse({
    stream: toTextStream({ stream: result.stream }),
  });
}
```

## Notes

- This example uses `@upstash/redis`, but any KV storage provider can be used. Distinction: the Upstash SDK itself (Redis, Ratelimit, Vector) is covered by the upstash skill; this page only shows how AI SDK middleware and callbacks can call it.
- `LanguageModelV4Middleware` has `wrapGenerate` and `wrapStream` plus an optional `transformParams`. `wrapGenerate` is called by `generateText`; `wrapStream` is called by `streamText`.
- For `wrapStream`, cache an array of stream parts and replay them with `simulateReadableStream`, so the cached response is returned chunk by chunk as if generated by the model. Tune `initialDelayInMs` and `chunkDelayInMs`.
- This middleware caches the raw model response before AI SDK validates structured output. With structured output, cache only a response that has passed your schema validation; otherwise an invalid response can be replayed from the cache.
- Both the cached and fresh responses in the callback example use the text stream protocol, so use `TextStreamChatTransport` when calling this route with `useChat`.
- Language model middleware is a wrap around the model (not HTTP middleware); see the middleware page. Experimental per the library's versioning policy.
- Modified from the official example: the official middleware uses `JSON.stringify(params)` as the key in both `wrapGenerate` and `wrapStream`, so the stored shapes (result object vs. chunk array) can collide and the model is not part of the key. This version keys on `{ mode, model, params }` via a factory taking the model identifier. It also does not store streams that contain an `error` part or never reached `finish`, awaits the write inside try/catch so a cache failure does not break the response, and sets a 1 hour TTL (`ex: 60 * 60`) on both writes.
- In serverless environments, a cache write may not complete after the response is sent; use the runtime's `waitUntil` (or equivalent) to keep the write alive.
- In the `onEnd` example the key is `JSON.stringify(messages)` only; if the model or system prompt can vary, include them in the key as well.

## Related

- Language Model Middleware
- [simulateReadableStream](../core/simulate-readable-stream.md)
- [Rate Limiting](./rate-limiting.md)
