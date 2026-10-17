---
source: https://ai-sdk.dev/cookbook/api-servers/nest
---

# API Server: Nest.js

Stream `streamText` output from a Nest.js controller using `pipeUIMessageStreamToResponse`, with custom data or a text stream.

```ts
// app.controller.ts
import { Controller, Post, Res } from '@nestjs/common';
import {
  pipeUIMessageStreamToResponse,
  streamText,
  toUIMessageStream,
} from 'ai';
import { Response } from 'express';

@Controller()
export class AppController {
  @Post('/')
  async root(@Res() res: Response) {
    const result = streamText({
      model: 'openai/gpt-6-astra',
      prompt: 'Invent a new holiday and describe its traditions.',
    });

    pipeUIMessageStreamToResponse({
      response: res,
      stream: toUIMessageStream({ stream: result.stream }),
    });
  }
}
```

```ts
// app.controller.ts (custom data)
import { Controller, Post, Res } from '@nestjs/common';
import {
  createUIMessageStream,
  streamText,
  pipeUIMessageStreamToResponse,
  toUIMessageStream,
} from 'ai';
import { Response } from 'express';

@Controller()
export class AppController {
  @Post('/stream-data')
  async streamData(@Res() response: Response) {
    const stream = createUIMessageStream({
      execute: ({ writer }) => {
        // write some data
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
    pipeUIMessageStreamToResponse({ stream, response });
  }
}
```

```ts
// app.controller.ts (text stream)
import { Controller, Post, Res } from '@nestjs/common';
import { pipeTextStreamToResponse, streamText, toTextStream } from 'ai';
import { Response } from 'express';

@Controller()
export class AppController {
  @Post()
  async example(@Res() res: Response) {
    const result = streamText({
      model: 'openai/gpt-6-astra',
      prompt: 'Invent a new holiday and describe its traditions.',
    });

    pipeTextStreamToResponse({
      response: res,
      stream: toTextStream({ stream: result.stream }),
    });
  }
}
```

## Notes

- The controller injects the Express `Response` (`@Res()`), so the Node `pipe*ToResponse` helpers apply. Set `AI_GATEWAY_API_KEY` for the Vercel AI Gateway model ids used in the page.
- If streaming fails behind a proxy, see `references/operations/troubleshooting.md`; the page links a full example at `examples/nest` in the vercel/ai repository.
