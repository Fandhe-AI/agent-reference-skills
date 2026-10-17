---
source: https://ai-sdk.dev/cookbook/api-servers/hono
---

# API Server: Hono

Return `streamText` output from a Hono route as a UI message stream, a text stream, or a stream with custom data.

```ts
// index.ts
import { serve } from '@hono/node-server';
import {
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
} from 'ai';
import { Hono } from 'hono';

const app = new Hono();

app.post('/', async c => {
  const result = streamText({
    model: 'openai/gpt-6-astra',
    prompt: 'Invent a new holiday and describe its traditions.',
  });
  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  });
});

serve({ fetch: app.fetch, port: 8080 });
```

```ts
// index.ts (text stream)
import { serve } from '@hono/node-server';
import { createTextStreamResponse, streamText, toTextStream } from 'ai';
import { Hono } from 'hono';

const app = new Hono();

app.post('/text', async c => {
  const result = streamText({
    model: 'openai/gpt-6-astra',
    prompt: 'Write a short poem about coding.',
  });
  return createTextStreamResponse({
    stream: toTextStream({ stream: result.stream }),
  });
});

serve({ fetch: app.fetch, port: 8080 });
```

```ts
// index.ts (custom data)
import { serve } from '@hono/node-server';
import {
  createUIMessageStream,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
} from 'ai';
import { Hono } from 'hono';

const app = new Hono();

app.post('/stream-data', async c => {
  // immediately start streaming the response
  const stream = createUIMessageStream({
    execute: ({ writer }) => {
      writer.write({ type: 'start' });

      writer.write({
        type: 'data-custom',
        data: {
          custom: 'Hello, world!',
        },
      });

      const result = streamText({
        model: 'openai/gpt-6-astra',
        prompt: 'Invent a new holiday and describe its traditions.',
      });

      writer.merge(
        toUIMessageStream({
          stream: result.stream,
          sendStart: false,
          onError: error => {
            // Error messages are masked by default; log details server-side and return a generic message to the client.
            console.error(error);
            return 'An error occurred.';
          },
        }),
      );
    },
  });
  return createUIMessageStreamResponse({ stream });
});

serve({ fetch: app.fetch, port: 8080 });
```

## Notes

- Hono handlers return a Web `Response`, so use `createUIMessageStreamResponse` / `createTextStreamResponse` rather than the `pipe*ToResponse` Node helpers.
- This covers only the AI SDK calls; Hono routing, middleware and streaming helpers (`streamSSE` etc.) belong to the hono skill. Examples use the AI Gateway (`AI_GATEWAY_API_KEY`).
- The official page's example returns `error.message` to the client, which can leak internal details; here it is replaced with a generic message and server-side logging.
- Test with `curl -X POST http://localhost:8080`; for proxied-streaming problems see `references/operations/troubleshooting.md`.
