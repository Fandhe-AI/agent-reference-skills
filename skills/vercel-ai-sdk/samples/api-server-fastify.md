---
source: https://ai-sdk.dev/cookbook/api-servers/fastify
---

# API Server: Fastify

Send `streamText` output from a Fastify route by converting it with `toUIMessageStream` and passing the stream to `reply.send`.

```ts
// index.ts
import { streamText, toUIMessageStream } from 'ai';
import Fastify from 'fastify';

const fastify = Fastify({ logger: true });

fastify.post('/', async function (request, reply) {
  const result = streamText({
    model: 'openai/gpt-6-astra',
    prompt: 'Invent a new holiday and describe its traditions.',
  });

  reply.header('Content-Type', 'text/plain; charset=utf-8');

  return reply.send(toUIMessageStream({ stream: result.stream }));
});

fastify.listen({ port: 8080 });
```

```ts
// index.ts (custom data)
import { createUIMessageStream, streamText, toUIMessageStream } from 'ai';
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
      // Error messages are masked by default for security reasons.
      // If you want to expose the error message to the client, you can do so here:
      return error instanceof Error ? error.message : String(error);
    },
  });

  reply.header('Content-Type', 'text/plain; charset=utf-8');

  return reply.send(stream);
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

- The Fastify cookbook passes the stream to `reply.send` with a `text/plain; charset=utf-8` header instead of using a `pipe*ToResponse` helper; examples use the AI Gateway (`AI_GATEWAY_API_KEY`).
- This covers only the AI SDK calls; Fastify routing, reply and hooks belong to the fastify skill.
- Test with `curl -X POST http://localhost:8080`; for proxied-streaming problems see `references/operations/troubleshooting.md`.
