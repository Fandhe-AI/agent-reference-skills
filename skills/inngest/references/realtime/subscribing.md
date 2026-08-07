# Subscribing

Server-side subscription to realtime channels: mint client-safe tokens with `getClientSubscriptionToken()`, or consume message streams directly on the server with `subscribe()` / `inngest.realtime.subscribe()`.

## Signature / Usage

```ts
import { getClientSubscriptionToken } from "inngest/react";
import { subscribe } from "inngest/realtime";
import { inngest } from "./client";
import { pipelineChannel } from "./channels";

const ch = pipelineChannel({ contentId: "abc123" });

// Mint a client-safe token (server-side)
const token = await getClientSubscriptionToken(inngest, {
  channel: ch,
  topics: ["status", "tokens"],
});
// token.key, token.apiBaseUrl

// Consume a stream on the server
const stream = await subscribe({ app: inngest, channel: ch, topics: ["status", "tokens"] });
const reader = stream.getReader();
while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  console.log(value.topic, value.data);
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `getClientSubscriptionToken(app, options)` app | Inngest | Your Inngest client instance. |
| `getClientSubscriptionToken` options.channel | ChannelInstance \| string | Channel to authorize. |
| `getClientSubscriptionToken` options.topics | string[] | Topics the token grants access to; the client can only subscribe to these. Returns `Promise<Realtime.Subscribe.ClientToken>` (`{ key, apiBaseUrl }`, aliased as `ClientSubscriptionToken` in `inngest/react`). |
| `subscribe(options)` app | Inngest | Client used to resolve connection details. |
| `subscribe(options)` channel | ChannelInstance \| string | Channel to subscribe to. |
| `subscribe(options)` topics | string[] | Topics to subscribe to. |
| `subscribe(options)` key | string | Pre-minted JWT token key; if omitted, `app` mints a token automatically. |
| `subscribe(options)` validate | boolean | Enable schema validation on incoming messages. Default `true`. |
| `subscribe(options)` onMessage | (message: Message) => void | Switches to callback-subscription mode; called per incoming message. |
| `subscribe(options)` onError | (error: unknown) => void | Called on connection error (callback mode). Returns `Promise<{ close, unsubscribe }>`. |

## Notes

- Without `onMessage`, `subscribe()` returns a `ReadableStream`-based subscription with `getReader()`, plus helpers: `getJsonStream()` (parsed JSON messages), `getEncodedStream()` (SSE-formatted `Uint8Array` chunks), `close(reason?)`, and `unsubscribe(reason?)` (alias of `close`).
- With `onMessage`, `subscribe()` returns `{ close, unsubscribe }` for an event-driven pattern instead of a stream.
- `inngest.realtime.subscribe({ channel, topics })` is equivalent to `subscribe({ app: inngest, ... })` but omits `app` since the client is already known; it authenticates with the client's signing key directly (no token needed).
- Message shape: `topic` (string), `channel` (resolved name), `data` (typed per topic schema), `kind` (`"data" | "run" | "datastream-start" | "datastream-end" | "chunk"`), `runId`, `fnId`, `createdAt`.
- For minting a full (non-client-safe) token server-side, use `inngest.realtime.token({ channel, topics })` or `getSubscriptionToken()` from `inngest/realtime` — these include channel and topics and should not be sent to a browser as-is.
- This is the v4 TypeScript SDK realtime API.

## Related

- [Channels & Topics](./channels.md)
- [Publishing](./publishing.md)
- [useRealtime](./use-realtime.md)
- [Subscription Tokens](./subscription-tokens.md)
