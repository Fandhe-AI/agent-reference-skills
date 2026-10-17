---
source: https://ai-sdk.dev/docs/getting-started/svelte
---

# Quickstart: SvelteKit

SvelteKit endpoint with `streamText` and a `Chat` class from `@ai-sdk/svelte` for the UI.

```bash
npx sv create my-ai-app
cd my-ai-app
npm i -D ai @ai-sdk/svelte zod
```

```ts
// src/routes/api/chat/+server.ts
import {
  streamText,
  type UIMessage,
  convertToModelMessages,
  createGateway,
  createUIMessageStreamResponse,
  toUIMessageStream,
} from 'ai';

import { AI_GATEWAY_API_KEY } from '$env/static/private';

const gateway = createGateway({
  apiKey: AI_GATEWAY_API_KEY,
});

export async function POST({ request }) {
  const { messages }: { messages: UIMessage[] } = await request.json();

  const result = streamText({
    model: gateway('anthropic/claude-sonnet-5.5'),
    messages: await convertToModelMessages(messages),
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  });
}
```

```svelte
<!-- src/routes/+page.svelte -->
<script lang="ts">
  import { Chat } from '@ai-sdk/svelte';

  let input = '';
  const chat = new Chat({});

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    chat.sendMessage({ text: input });
    input = '';
  }
</script>

<main>
  <ul>
    {#each chat.messages as message, messageIndex (messageIndex)}
      <li>
        <div>{message.role}</div>
        <div>
          {#each message.parts as part, partIndex (partIndex)}
            {#if part.type === 'text'}
              <div>{part.text}</div>
            {/if}
          {/each}
        </div>
      </li>
    {/each}
  </ul>
  <form onsubmit={handleSubmit}>
    <input bind:value={input} />
    <button type="submit">Send</button>
  </form>
</main>
```

## Notes

- Vite does not load env vars onto `process.env`, so the key is imported from `$env/static/private` and passed to `createGateway`; set `AI_GATEWAY_API_KEY` in `.env.local`.
- `Chat` from `@ai-sdk/svelte` mirrors React's `useChat` (`messages`, `sendMessage`); dev server runs at http://localhost:5173.
- The official page continues with a weather tool and `stopWhen`, same shape as `quickstart-nextjs-app-router.md`.
