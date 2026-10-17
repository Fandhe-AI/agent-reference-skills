---
source: https://ai-sdk.dev/cookbook/api-servers/express
---

# API Server: Express

Stream `streamText` output from an Express route using `pipeUIMessageStreamToResponse`, with custom data parts or a plain text stream.

```ts
// index.ts
import {
  pipeUIMessageStreamToResponse,
  streamText,
  toUIMessageStream,
} from 'ai';
import express, { Request, Response } from 'express';

const app = express();

app.post('/', async (req: Request, res: Response) => {
  const result = streamText({
    model: 'openai/gpt-6-astra',
    prompt: 'Invent a new holiday and describe its traditions.',
  });

  pipeUIMessageStreamToResponse({
    response: res,
    stream: toUIMessageStream({ stream: result.stream }),
  });
});

app.listen(8080, () => {
  console.log(`Example app listening on port ${8080}`);
});
```

```ts
// index.ts (custom data parts)
import {
  createUIMessageStream,
  pipeUIMessageStreamToResponse,
  streamText,
  toUIMessageStream,
} from 'ai';
import express, { Request, Response } from 'express';

const app = express();

app.post('/custom-data-parts', async (req: Request, res: Response) => {
  pipeUIMessageStreamToResponse({
    response: res,
    stream: createUIMessageStream({
      execute: async ({ writer }) => {
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
          toUIMessageStream({ stream: result.stream, sendStart: false }),
        );
      },
    }),
  });
});

app.listen(8080, () => {
  console.log(`Example app listening on port ${8080}`);
});
```

```ts
// index.ts (text stream)
import { pipeTextStreamToResponse, streamText, toTextStream } from 'ai';
import express, { Request, Response } from 'express';

const app = express();

app.post('/', async (req: Request, res: Response) => {
  const result = streamText({
    model: 'openai/gpt-6-astra',
    prompt: 'Invent a new holiday and describe its traditions.',
  });

  pipeTextStreamToResponse({
    response: res,
    stream: toTextStream({ stream: result.stream }),
  });
});

app.listen(8080, () => {
  console.log(`Example app listening on port ${8080}`);
});
```

## Notes

- Test with `curl -X POST http://localhost:8080`; examples use the Vercel AI Gateway (`AI_GATEWAY_API_KEY`).
- Express exposes a Node `ServerResponse`, so the `pipe*ToResponse` helpers apply. Express itself is not covered by a dedicated skill; Web-standards frameworks use `createUIMessageStreamResponse` instead (see the hono sample).
- If streaming fails behind a proxy, see `references/operations/troubleshooting.md`.
