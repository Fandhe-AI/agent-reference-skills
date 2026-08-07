# Realtime Publish/Subscribe

Push live progress updates from a running function to a React client using channels, topics, and `useRealtime` — no polling or custom WebSocket server needed.

```ts
// inngest/channels.ts — define a typed channel with topics
import { realtime } from "inngest";
import { z } from "zod";

export const pipelineChannel = realtime.channel({
  name: ({ contentId }: { contentId: string }) => `pipeline:${contentId}`,
  topics: {
    status: {
      schema: z.object({ message: z.string(), progress: z.number() }),
    },
  },
});
```

```ts
// inngest/functions.ts — publish durable updates from a function
import { inngest } from "./client";
import { pipelineChannel } from "./channels";

export const processPipeline = inngest.createFunction(
  { id: "process-pipeline" },
  { event: "pipeline/start" },
  async ({ event, step }) => {
    const ch = pipelineChannel({ contentId: event.data.contentId });

    await step.realtime.publish("publish-starting", ch.status, {
      message: "Starting...",
      progress: 0,
    });

    await step.run("do-work", async () => {
      /* ... */
    });

    await step.realtime.publish("publish-done", ch.status, {
      message: "Done",
      progress: 100,
    });
  }
);
```

```ts
// app/actions.ts — mint a short-lived subscription token on the server
"use server";
import { getClientSubscriptionToken } from "inngest/react";
import { inngest } from "@/inngest/client";
import { pipelineChannel } from "@/inngest/channels";

export async function fetchToken(contentId: string) {
  return getClientSubscriptionToken(inngest, {
    channel: pipelineChannel({ contentId }),
    topics: ["status"],
  });
}
```

```tsx
// app/page.tsx — subscribe from a client component
"use client";
import { useRealtime } from "inngest/react";
import { pipelineChannel } from "@/inngest/channels";
import { fetchToken } from "./actions";

export default function Progress({ contentId }: { contentId: string }) {
  const { messages, connectionStatus } = useRealtime({
    channel: pipelineChannel({ contentId }),
    topics: ["status"] as const,
    token: () => fetchToken(contentId),
  });

  return (
    <p>
      {connectionStatus}: {messages.byTopic.status?.data.message} (
      {messages.byTopic.status?.data.progress}%)
    </p>
  );
}
```

## Notes

- `step.realtime.publish()` is durable and memoized (won't re-fire on retry); `inngest.realtime.publish()` is non-durable and better for high-frequency streams (e.g. token-by-token AI output)
- Clients never subscribe directly — a server-minted `getClientSubscriptionToken()` result scopes access to one channel and an explicit topic list, keeping the signing key server-side
- Pass an async token **factory** (`token: () => fetchToken(...)`) rather than a pre-minted token so `useRealtime` fetches a fresh token on mount and on every reconnect
- `useRealtime` also exposes `runStatus` (`running` / `completed` / `failed` / `cancelled`) and auto-closes the subscription once the run reaches a terminal state (`autoCloseOnTerminal`, default `true`)
