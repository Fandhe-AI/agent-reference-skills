---
source: https://ai-sdk.dev/docs/getting-started/angular
---

# Quickstart: Angular

Angular standalone app with the `Chat` class from `@ai-sdk/angular` for the UI and an Express server (`POST /api/chat`) using `streamText`, `toUIMessageStream` and `pipeUIMessageStreamToResponse`; second server version adds a weather tool and `stopWhen`.

```bash
pnpm dlx @angular/cli@latest new my-ai-app --defaults --ssr=false --package-manager=pnpm
cd my-ai-app
pnpm add ai @ai-sdk/angular express dotenv zod
pnpm add -D tsx @types/express @types/node
```

```env
# .env
AI_GATEWAY_API_KEY=xxxxxxxxx
```

```ts
// server.ts
import {
  streamText,
  type UIMessage,
  convertToModelMessages,
  pipeUIMessageStreamToResponse,
  toUIMessageStream,
} from 'ai';
import 'dotenv/config';
import express from 'express';

const app = express();
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  const { messages }: { messages: UIMessage[] } = req.body;

  const result = streamText({
    model: 'anthropic/claude-sonnet-5.5',
    messages: await convertToModelMessages(messages),
  });

  await pipeUIMessageStreamToResponse({
    response: res,
    stream: toUIMessageStream({ stream: result.stream }),
  });
});

app.listen(3000, '127.0.0.1', () => {
  console.log('Chat API listening on http://127.0.0.1:3000');
});
```

```json
// proxy.conf.json
{
  "/api/**": {
    "target": "http://127.0.0.1:3000"
  }
}
```

```ts
// src/app/app.ts
import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Chat } from '@ai-sdk/angular';

@Component({
  selector: 'app-root',
  imports: [JsonPipe],
  template: `
    <main>
      @for (message of chat.messages; track message.id) {
        <div>
          <strong>{{ message.role === 'user' ? 'User' : 'AI' }}:</strong>
          @for (part of message.parts; track $index) {
            @if (part.type === 'text') {
              <p style="white-space: pre-wrap">{{ part.text }}</p>
            } @else if (part.type.startsWith('tool-')) {
              <pre>{{ part | json }}</pre>
            }
          }
        </div>
      }

      @if (chat.status === 'submitted') {
        <p>Waiting for a response...</p>
      }

      @if (chat.error; as error) {
        <p role="alert">{{ error.message }}</p>
      }

      <form (submit)="sendMessage($event)">
        <label for="message">Your message</label>
        <input
          id="message"
          #messageInput
          [value]="input()"
          (input)="input.set(messageInput.value)"
        />
        <button
          type="submit"
          [disabled]="
            chat.status === 'submitted' || chat.status === 'streaming'
          "
        >
          Send
        </button>
        @if (chat.status === 'submitted' || chat.status === 'streaming') {
          <button type="button" (click)="chat.stop()">Stop</button>
        }
      </form>
    </main>
  `,
})
export class App {
  readonly chat = new Chat({});
  readonly input = signal('');

  sendMessage(event: Event) {
    event.preventDefault();
    const text = this.input().trim();

    if (
      !text ||
      this.chat.status === 'submitted' ||
      this.chat.status === 'streaming'
    ) {
      return;
    }

    this.chat.sendMessage({ text });
    this.input.set('');
  }
}
```

```bash
# terminal 1: Express backend
pnpm exec tsx watch server.ts
# terminal 2: Angular dev server (http://localhost:4200)
pnpm exec ng serve --proxy-config proxy.conf.json
```

```ts
// server.ts (with a weather tool and multi-step calls)
import {
  streamText,
  type UIMessage,
  convertToModelMessages,
  pipeUIMessageStreamToResponse,
  toUIMessageStream,
  tool,
  isStepCount,
} from 'ai';
import 'dotenv/config';
import express from 'express';
import * as z4 from 'zod/v4';

const app = express();
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  const { messages }: { messages: UIMessage[] } = req.body;

  const result = streamText({
    model: 'anthropic/claude-sonnet-5.5',
    messages: await convertToModelMessages(messages),
    stopWhen: isStepCount(5),
    tools: {
      weather: tool({
        description: 'Get the weather in a location (fahrenheit)',
        inputSchema: z4.object({
          location: z4.string().describe('The location to get the weather for'),
        }),
        execute: async ({ location }) => {
          const temperature = Math.round(Math.random() * (90 - 32) + 32);
          return { location, temperature };
        },
      }),
    },
  });

  await pipeUIMessageStreamToResponse({
    response: res,
    stream: toUIMessageStream({ stream: result.stream }),
  });
});

app.listen(3000, '127.0.0.1', () => {
  console.log('Chat API listening on http://127.0.0.1:3000');
});
```

## Notes

- Source: https://ai-sdk.dev/docs/getting-started/angular (ai@7.0.173; new quickstart). Needs Node.js 24.15+ (or another version supported by Angular) and a Vercel AI Gateway API key.
- `__PROVIDER_IMPORT__` and `__MODEL__` are placeholders on the official page; here `__MODEL__` is replaced with the AI Gateway model string `'anthropic/claude-sonnet-5.5'` and the provider import is removed (the Gateway provider ships with `ai`); substitute your own provider and model. Adapted (not in the official docs): the placeholder replacement only.
- The Angular project uses client-side rendering (`--ssr=false`); the chat API is a separate Express server listening on `127.0.0.1:3000`. `proxy.conf.json` forwards `/api/**` during local development (restart `ng serve` after changing it); when deploying, route `/api/chat` to the backend or configure another URL with `DefaultChatTransport`. Keep the API key on the server and add `.env` to `.gitignore`.
- `Chat` state is backed by Angular signals; read `chat.messages`, `chat.status`, `chat.error`, call `chat.sendMessage({ text })` and `chat.stop()`. The input uses its own `signal`. Older Angular projects may name the root file `app.component.ts` / class `AppComponent`; keep the existing names.
- The weather tool example imports `* as z4 from 'zod/v4'` as on the official page; `stopWhen: isStepCount(5)` lets the model answer after the tool result. No frontend change is needed: `Chat` handles `tool-weather` parts (the template renders them with `JsonPipe`).
- Angular framework behavior is outside this skill; this sample covers only the AI SDK calls.
