---
source: https://ai-sdk.dev/cookbook/api-servers/node-http-server
---

# API Server: Node.js HTTP Server

Stream `streamText` output from a bare `node:http` server as a UI message stream, with custom data, or as plain text.

```ts
// index.ts
import {
  pipeUIMessageStreamToResponse,
  streamText,
  toUIMessageStream,
} from 'ai';
import { createServer } from 'http';

createServer(async (req, res) => {
  const result = streamText({
    model: 'openai/gpt-6-astra',
    prompt: 'Invent a new holiday and describe its traditions.',
  });

  pipeUIMessageStreamToResponse({
    response: res,
    stream: toUIMessageStream({ stream: result.stream }),
  });
}).listen(8080);
```

```ts
// index.ts (custom data on /stream-data)
import {
  createUIMessageStream,
  pipeUIMessageStreamToResponse,
  streamText,
  toUIMessageStream,
} from 'ai';
import { createServer } from 'http';

createServer(async (req, res) => {
  switch (req.url) {
    case '/stream-data': {
      const stream = createUIMessageStream({
        execute: ({ writer }) => {
          // write some custom data
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
                // Error messages are masked by default for security reasons.
                // If you want to expose the error message to the client, you can do so here:
                return error instanceof Error ? error.message : String(error);
              },
            }),
          );
        },
      });

      pipeUIMessageStreamToResponse({ stream, response: res });

      break;
    }
  }
}).listen(8080);
```

```ts
// index.ts (text stream)
import { pipeTextStreamToResponse, streamText, toTextStream } from 'ai';
import { createServer } from 'http';

createServer(async (req, res) => {
  const result = streamText({
    model: 'openai/gpt-6-astra',
    prompt: 'Invent a new holiday and describe its traditions.',
  });

  pipeTextStreamToResponse({
    response: res,
    stream: toTextStream({ stream: result.stream }),
  });
}).listen(8080);
```

```bash
curl -X POST http://localhost:8080
```

## Notes

- Examples use the Vercel AI Gateway; set `AI_GATEWAY_API_KEY`. Error messages are masked by default; `onError` on `toUIMessageStream` exposes them.
- Helpers: `pipeUIMessageStreamToResponse` (UI message stream), `pipeTextStreamToResponse` (plain text). If streaming does not work behind a proxy, see the troubleshooting entry "streaming not working when proxied" (`references/operations/troubleshooting.md`).
- This covers only the AI SDK response helpers; routing frameworks are in the hono / fastify / nextjs-app skills (`references/ui/pipe-ui-message-stream-to-response.md`).
