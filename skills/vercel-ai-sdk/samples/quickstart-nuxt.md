---
source: https://ai-sdk.dev/docs/getting-started/nuxt
---

# Quickstart: Nuxt

Nuxt event handler with `streamText` (API key from runtime config) and a `useChat` page from `@ai-sdk/vue`.

```bash
pnpm create nuxt my-ai-app
cd my-ai-app
npm i ai @ai-sdk/vue zod
```

```env
# .env
NUXT_AI_GATEWAY_API_KEY=xxxxxxxxx
```

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  // rest of your nuxt config
  runtimeConfig: {
    aiGatewayApiKey: '',
  },
});
```

```typescript
// server/api/chat.ts
import {
  streamText,
  UIMessage,
  convertToModelMessages,
  createGateway,
  createUIMessageStreamResponse,
  toUIMessageStream,
} from 'ai';

export default defineLazyEventHandler(async () => {
  const apiKey = useRuntimeConfig().aiGatewayApiKey;
  if (!apiKey) throw new Error('Missing AI Gateway API key');
  const gateway = createGateway({
    apiKey: apiKey,
  });

  return defineEventHandler(async (event: any) => {
    const { messages }: { messages: UIMessage[] } = await readBody(event);

    const result = streamText({
      model: gateway('anthropic/claude-sonnet-5.5'),
      messages: await convertToModelMessages(messages),
    });

    return createUIMessageStreamResponse({
      stream: toUIMessageStream({ stream: result.stream }),
    });
  });
});
```

```vue
<!-- pages/index.vue -->
<script setup lang="ts">
import { useChat } from "@ai-sdk/vue";
import { ref } from "vue";

const input = ref("");
const { messages, sendMessage } = useChat();

const handleSubmit = (e: Event) => {
    e.preventDefault();
    sendMessage({ text: input.value });
    input.value = "";
};
</script>

<template>
    <div>
        <div v-for="(m, index) in messages" :key="m.id ? m.id : index">
            {{ m.role === "user" ? "User: " : "AI: " }}
            <div
                v-for="(part, index) in m.parts"
                :key="`${m.id}-${part.type}-${index}`"
            >
                <div v-if="part.type === 'text'">{{ part.text }}</div>
            </div>
        </div>

        <form @submit="handleSubmit">
            <input v-model="input" placeholder="Say something..." />
        </form>
    </div>
</template>
```

## Notes

- The `NUXT_` prefix lets Nuxt load the variable into `runtimeConfig`; the gateway provider also supports a plain `AI_GATEWAY_API_KEY`.
- If the project has `app.vue` instead of `pages/index.vue`, the official page says to delete `app.vue` and create `pages/index.vue`.
- Dev server runs at http://localhost:3000; the official page continues with a weather tool and `stopWhen`.
