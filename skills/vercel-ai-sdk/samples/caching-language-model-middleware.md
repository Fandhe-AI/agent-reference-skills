---
source: https://ai-sdk.dev/cookbook/next/caching-middleware
---

# Caching Language Model Middleware

Cache `generateText` / `streamText` responses in a KV store by wrapping the model with a `LanguageModelMiddleware` (`wrapGenerate` + `wrapStream`).

```tsx
// ai/middleware.ts
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

    redis.set(cacheKey, result);

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

    const transformStream = new TransformStream<
      LanguageModelV4StreamPart,
      LanguageModelV4StreamPart
    >({
      transform(chunk, controller) {
        fullResponse.push(chunk);
        controller.enqueue(chunk);
      },
      flush() {
        // Store the full response in the cache after streaming is complete
        redis.set(cacheKey, fullResponse);
      },
    });

    return {
      stream: stream.pipeThrough(transformStream),
      ...rest,
    };
  },
});
```

```tsx
// app/api/chat/route.ts
import { createCacheMiddleware } from '@/ai/middleware';
import {
  wrapLanguageModel,
  streamText,
  tool,
  createUIMessageStreamResponse,
  toUIMessageStream,
} from 'ai';
import { z } from 'zod';

const wrappedModel = wrapLanguageModel({
  model: 'openai/gpt-6-luna',
  middleware: createCacheMiddleware('openai/gpt-6-luna'),
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: wrappedModel,
    messages,
    tools: {
      weather: tool({
        description: 'Get the weather in a location',
        inputSchema: z.object({
          location: z.string().describe('The location to get the weather for'),
        }),
        execute: async ({ location }) => ({
          location,
          temperature: 72 + Math.floor(Math.random() * 21) - 10,
        }),
      }),
    },
  });
  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  });
}
```

## Notes

- Official warning on this cookbook page: "This example is not yet updated to v5" (its client snippet still uses the old `input` / `handleSubmit` / `m.content` `useChat` shape, so it is omitted here). Verify the middleware types against the installed version; language model middleware is experimental per the versioning policy.
- This is a language model middleware that wraps the model (`wrapGenerate` for `generateText`, `wrapStream` for `streamText`), not HTTP middleware in hono / fastify / nextjs-app / go-echo.
- Streams are cached as an array of stream parts and replayed with `simulateReadableStream` (`initialDelayInMs`, `chunkDelayInMs`). The page uses `@upstash/redis`, but any KV store works; Upstash itself is covered by the upstash skill.
- Modified from the official example: the cookbook keys both `wrapGenerate` and `wrapStream` on `JSON.stringify(params)`, so the stored shapes (result object vs. chunk array) can collide and the model is not part of the key. This version keys on `{ mode, model, params }` via a factory taking the model identifier.
- References: `references/providers/language-model-middleware.md`, `references/providers/wrap-language-model.md`, `references/core/simulate-readable-stream.md`.
