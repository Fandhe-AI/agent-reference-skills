---
source: https://ai-sdk.dev/cookbook/guides/slackbot
---

# Slackbot Agent

Answer Slack mentions and direct messages with an AI SDK `ToolLoopAgent` and a weather tool, connected to Slack through Chat SDK (`chat`, `@chat-adapter/slack`, `@chat-adapter/state-redis`) in a Next.js webhook route; replies stream into the thread.

```bash
pnpm create next-app@latest my-slackbot
cd my-slackbot
pnpm add ai chat @chat-adapter/slack @chat-adapter/state-redis zod
```

```yaml
# manifest.yaml (Slack app, created "From a manifest")
display_information:
  name: My Bot
  description: A bot built with the AI SDK and Chat SDK

features:
  agent_view:
    agent_description: A bot built with the AI SDK and Chat SDK
  bot_user:
    display_name: My Bot
    always_online: true

oauth_config:
  scopes:
    bot:
      - app_mentions:read
      - assistant:write
      - channels:history
      - channels:read
      - chat:write
      - groups:history
      - groups:read
      - im:history
      - im:read
      - mpim:history
      - mpim:read
      - reactions:read
      - reactions:write
      - users:read

settings:
  event_subscriptions:
    request_url: https://your-domain.com/api/webhooks/slack
    bot_events:
      - app_mention
      - message.channels
      - message.groups
      - message.im
      - message.mpim
      - member_joined_channel
      - app_home_opened
      - app_context_changed
      - agent_session_stopped
      - agent_session_title_changed
  interactivity:
    is_enabled: true
    request_url: https://your-domain.com/api/webhooks/slack
```

```env
# .env.local
SLACK_BOT_TOKEN=your_slack_bot_token
SLACK_SIGNING_SECRET=your_slack_signing_secret
REDIS_URL=your_redis_url
AI_GATEWAY_API_KEY=your_ai_gateway_api_key
```

```ts
// lib/agent.ts
import { ToolLoopAgent, tool } from 'ai';
__PROVIDER_IMPORT__;
import { z } from 'zod';

export const agent = new ToolLoopAgent({
  model: __MODEL__,
  instructions: `You are a Slack bot assistant. Keep your responses concise and to the point.
  - Do not tag users.
  - Current date is: ${new Date().toISOString().split('T')[0]}`,
  tools: {
    getWeather: tool({
      description: 'Get the current weather at a location',
      inputSchema: z.object({
        latitude: z.number(),
        longitude: z.number(),
        city: z.string(),
      }),
      execute: async ({ latitude, longitude, city }) => {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weathercode,relativehumidity_2m&timezone=auto`,
        );

        const weatherData = await response.json();
        return {
          temperature: weatherData.current.temperature_2m,
          weatherCode: weatherData.current.weathercode,
          humidity: weatherData.current.relativehumidity_2m,
          city,
        };
      },
    }),
  },
});
```

```ts
// lib/bot.ts
import { Chat, type Thread } from 'chat';
import { toAiMessages } from 'chat/ai';
import { createSlackAdapter } from '@chat-adapter/slack';
import { createRedisState } from '@chat-adapter/state-redis';
import { agent } from './agent';

export const bot = new Chat({
  userName: 'mybot',
  adapters: {
    // Match the manifest's `agent_view` (Slack's Agent messaging experience).
    slack: createSlackAdapter({ agentView: true }),
  },
  state: createRedisState(),
});

async function respond(thread: Thread) {
  await thread.startTyping();

  // Load recent messages and convert them to AI SDK messages.
  const { messages } = await bot.history.thread.list(thread.id, {
    limit: 20,
  });

  const result = await agent.stream({
    messages: await toAiMessages(messages),
    abortSignal: thread.signal,
  });

  // Stream the reply into the Slack thread.
  await thread.post(result.fullStream);
}

// A mention or a new direct message starts a conversation.
bot.onNewMention(async thread => {
  await thread.subscribe();
  await respond(thread);
});

// Later messages in a subscribed thread continue it.
bot.onSubscribedMessage(async thread => {
  await respond(thread);
});
```

```ts
// app/api/webhooks/slack/route.ts
import { after } from 'next/server';
import { bot } from '@/lib/bot';

export async function POST(request: Request): Promise<Response> {
  return bot.webhooks.slack(request, {
    waitUntil: task => after(() => task),
  });
}
```

## Notes

- Rewritten in ai@7.0.173: the cookbook guide now uses Chat SDK (`chat`) with the Slack adapter and a Redis state adapter instead of the `vercel-labs/ai-sdk-slackbot` starter (`@slack/web-api` handlers, `generateText`, Exa, `OPENAI_API_KEY`). Source: https://ai-sdk.dev/cookbook/guides/slackbot (ai@7.0.173).
- `__PROVIDER_IMPORT__` and `__MODEL__` are placeholders on the official page; substitute your own provider import and model (or a plain model id string through AI Gateway, with `AI_GATEWAY_API_KEY`).
- Slack app: create it from the manifest above, install it to the workspace, then replace `your-domain.com` in both `request_url` fields with the deployment URL (`https://<your-vercel-url>/api/webhooks/slack`) after deploying. Env vars: `SLACK_BOT_TOKEN` (Bot User OAuth Token), `SLACK_SIGNING_SECRET`, `REDIS_URL` (e.g. a Redis integration on the Vercel Marketplace), `AI_GATEWAY_API_KEY`; the Slack and Redis adapters read them automatically. Add the same variables in the Vercel project settings and redeploy (`vercel deploy` is a platform task covered by the vercel skill).
- `agentView: true` must match `agent_view` in the manifest (Slack's Agent messaging experience; each top-level DM starts its own thread). Without it the adapter uses the older `assistant_view` mapping and top-level DMs fail to load history.
- `onNewMention` fires for mentions in unsubscribed threads (DMs count as mentions); `thread.subscribe()` routes later messages to `onSubscribedMessage`. `bot.history.thread.list()` + `toAiMessages` convert the thread to `ModelMessage[]` (bot messages become `assistant`). `thread.post(result.fullStream)` streams the reply (step boundaries become paragraph breaks, markdown is converted to Slack formatting); `thread.signal` aborts generation on Slack's stop button.
- Slack expects a response within three seconds; the route returns right away and `waitUntil: task => after(() => task)` (`next/server`) keeps the function alive until the reply finishes.
- `ToolLoopAgent` feeds tool results back and keeps calling tools until a final answer (up to 20 steps by default). Extensions on the page: Chat SDK tools to read the channel or react (`/docs/agents/chat-platforms#give-the-agent-chat-tools`), more platforms via adapters, more tools.
