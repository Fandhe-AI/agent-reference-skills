# Stream AI Responses

Show a model's answer in the UI as it is generated, then publish the final result as a durable step so a retry does not repeat it.

## Signature / Usage

Define a channel with one topic per kind of update (`status`, `tokens`, `result`):

```ts
import { realtime, staticSchema } from "inngest";
import { z } from "zod";

export const aiChannel = realtime.channel({
  // `threadId` is your own conversation identifier, not an Inngest run ID.
  // The client passes the same value when it subscribes.
  name: ({ threadId }: { threadId: string }) => `ai-thread:${threadId}`,
  topics: {
    status: {
      schema: z.object({ message: z.string(), progress: z.number() }),
    },
    // Token payloads are tiny and very high volume, so skip runtime
    // validation and keep the types only.
    tokens: {
      schema: staticSchema<{ token: string }>(),
    },
    result: {
      schema: staticSchema<{
        output: string;
        model: string;
        outputTokens: number;
      }>(),
    },
  },
});
```

Publish from the function: durable `step.realtime.publish()` for status and result, non-durable `inngest.realtime.publish()` per token inside `step.run()`:

```ts
import { OpenAI } from "openai";
import { inngest } from "../client";
import { aiChannel } from "../channels";

const openai = new OpenAI();
const MODEL = "gpt-5";

export default inngest.createFunction(
  { id: "generate-response", triggers: [{ event: "app/prompt.submitted" }] },
  async ({ event, step }) => {
    // One channel instance per conversation thread.
    const ch = aiChannel({ threadId: event.data.threadId });

    // Durable: a retry won't send this status again.
    await step.realtime.publish("start", ch.status, {
      message: "Generating response...",
      progress: 0,
    });

    const generated = await step.run("stream-model", async () => {
      const stream = await openai.responses.create({
        model: MODEL,
        input: [{ role: "user", content: event.data.prompt }],
        stream: true,
      });

      let text = "";
      let outputTokens = 0;

      for await (const chunk of stream) {
        if (chunk.type === "response.output_text.delta") {
          text += chunk.delta;

          // Non-durable on purpose: one publish per token, and a replay on
          // retry is cheaper than making each token a durable step.
          await inngest.realtime.publish(ch.tokens, { token: chunk.delta });
        }

        if (chunk.type === "response.completed") {
          outputTokens = chunk.response.usage?.output_tokens ?? 0;
        }
      }

      return { text, outputTokens };
    });

    // Durable: memoized as a step, so retrying past this point will not
    // publish the result a second time.
    await step.realtime.publish("send-result", ch.result, {
      output: generated.text,
      model: MODEL,
      outputTokens: generated.outputTokens,
    });
  }
);
```

Mint a subscription token on the server after checking the user may read the thread (Next.js Server Action):

```ts
"use server";

import { getClientSubscriptionToken } from "inngest/react";
import { inngest } from "@/inngest/client";
import { aiChannel } from "@/inngest/channels";
import { getSession } from "@/lib/session";

export async function fetchAIToken(threadId: string) {
  // A token is a capability. Check the caller may read this thread first.
  const { userId } = await getSession();
  await assertUserOwnsThread(userId, threadId);

  return getClientSubscriptionToken(inngest, {
    channel: aiChannel({ threadId }),
    topics: ["status", "tokens", "result"],
  });
}
```

Render the stream with `useRealtime`:

```tsx
"use client";

import { useRealtime } from "inngest/react";
import { aiChannel } from "@/inngest/channels";
import { fetchAIToken } from "../actions";

export function AIStream({ threadId }: { threadId: string }) {
  const { messages, connectionStatus } = useRealtime({
    channel: aiChannel({ threadId }),
    topics: ["status", "tokens", "result"] as const,
    token: () => fetchAIToken(threadId),
    enabled: !!threadId,
    // `messages.all` keeps only the last 100 messages by default, which would
    // silently drop the start of a long response. Disable the cap so every
    // token is retained.
    historyLimit: null,
    // Batch re-renders instead of rendering once per token.
    bufferInterval: 50,
  });

  // Skip `run` messages first: they are run lifecycle updates with untyped data.
  let streamed = "";
  for (const message of messages.all) {
    if (message.kind === "run") continue;
    if (message.topic === "tokens") {
      streamed += message.data.token;
    }
  }

  const status = messages.byTopic.status?.data;
  const result = messages.byTopic.result?.data;

  return (
    <div>
      <p>Connection: {connectionStatus}</p>
      {status && !result && <p>{status.message} ({status.progress}%)</p>}
      {streamed && !result && <div>{streamed}</div>}
      {result && <div>{result.output}</div>}
    </div>
  );
}
```

Start the workflow once the connection is open so the first tokens are not missed:

```ts
const threadId = crypto.randomUUID();

await inngest.send({
  name: "app/prompt.submitted",
  data: { threadId, prompt: "Summarize the key points of this document..." },
});
```

## Notes

- Channels and topics are plain strings in Python and Go. Python uses `realtime.publish(client=, channel=, topic=, data=)` and `realtime.get_subscription_token()` from `inngest.experimental`; Go uses `realtime.Publish(ctx, channel, topic, data)` with payloads encoded yourself (for example `json.Marshal`). Python has no durable publish step, so one-time publishes are wrapped in `ctx.step.run()`. Mint tokens with the TypeScript or Python SDK.
- `inngest.realtime.publish()` sends each token immediately. If the step retries, some tokens can repeat. This costs less than making every token a durable step. Call it inside `step.run()` for streamed output so Inngest retries the stream as one unit.
- The UI example above (verbatim from the official guide) concatenates every `tokens` message, so after a stream-model retry the partial output of the failed attempt stays visible next to the new attempt until the durable result arrives and replaces it. To avoid showing mixed text, include an attempt marker in the token payload yourself and reset the buffer when it changes (not part of the official example).
- `step.realtime.publish()` sends status and the final result as durable steps, so a retry never sends them twice.
- Each token counts as one Realtime message; check the plan's daily message allowance before streaming long responses at high volume.
- Run `message.kind === "run"` check before `message.topic`: run lifecycle messages share the list and carry an untyped payload, so skipping them lets TypeScript narrow `message.data`.
- `historyLimit: null` keeps every token (default is 100); `bufferInterval: 50` batches renders.
- Source: https://www.inngest.com/docs-markdown/realtime/guides/stream-ai-responses (fetched 2026-10).

## Related

- [Channels & Topics](./channels.md)
- [Publishing](./publishing.md)
- [Subscription Tokens](./subscription-tokens.md)
- [useRealtime](./use-realtime.md)
- [Realtime Limits](./limits.md)
