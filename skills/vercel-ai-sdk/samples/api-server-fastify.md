---
source: https://ai-sdk.dev/cookbook/api-servers/fastify
---

# API Server: Fastify

Send `streamText` output from a Fastify route by converting it with `toUIMessageStream` and `createUIMessageStreamResponse`, then passing the response body to `reply.send`.

```ts
// index.ts
import {
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
} from 'ai';
import Fastify from 'fastify';

const fastify = Fastify({ logger: true });

fastify.post('/', async function (request, reply) {
  const result = streamText({
    model: 'openai/gpt-6-astra',
    prompt: 'Invent a new holiday and describe its traditions.',
  });

  const response = createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  });
  reply.headers(Object.fromEntries(response.headers));

  return reply.send(response.body);
});

fastify.listen({ port: 8080 });
```

```ts
// index.ts (custom data)
import {
  createUIMessageStream,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
} from 'ai';
import Fastify from 'fastify';

const fastify = Fastify({ logger: true });

fastify.post('/stream-data', async function (request, reply) {
  // immediately start streaming the response
  const stream = createUIMessageStream({
    execute: async ({ writer }) => {
      writer.write({ type: 'start' });

      writer.write({
        type: 'data-custom',
        data: {
          custom: 'initialized call',
        },
      });

      const result = streamText({
        model: 'openai/gpt-6-astra',
        prompt: 'Invent a new holiday and describe its traditions.',
      });

      writer.merge(
        toUIMessageStream({ stream: result.stream, sendStart: false }),
      );
    },
    onError: error => {
      // Error messages are masked by default; log details server-side and return a generic message to the client.
      console.error(error);
      return 'An error occurred.';
    },
  });

  const response = createUIMessageStreamResponse({ stream });
  reply.headers(Object.fromEntries(response.headers));

  return reply.send(response.body);
});

fastify.listen({ port: 8080 });
```

```ts
// index.ts (text stream)
import { streamText } from 'ai';
import Fastify from 'fastify';

const fastify = Fastify({ logger: true });

fastify.post('/', async function (request, reply) {
  const result = streamText({
    model: 'openai/gpt-6-astra',
    prompt: 'Invent a new holiday and describe its traditions.',
  });

  reply.header('Content-Type', 'text/plain; charset=utf-8');

  return reply.send(result.textStream);
});

fastify.listen({ port: 8080 });
```

## Notes

- Modified from the official cookbook: it passes `toUIMessageStream(...)` (a stream of chunk objects) directly to `reply.send` with a `text/plain` header. Here the UI message stream is converted to an SSE response with `createUIMessageStreamResponse`, and its headers and body are handed to Fastify. Only the `textStream` example (a string stream) keeps `text/plain`.
- The official page's `onError` example returns `error.message` to the client, which can leak internal details; here it is replaced with a generic message and server-side logging.
- Examples use the AI Gateway (`AI_GATEWAY_API_KEY`).
- This covers only the AI SDK calls; Fastify routing, reply and hooks belong to the fastify skill.
- Test with `curl -X POST http://localhost:8080`; for proxied-streaming problems see `references/operations/troubleshooting.md`.
