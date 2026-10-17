# Realtime

| Name | Description | Path |
|------|-------------|------|
| Channels & Topics | Channels are the top-level scope for realtime messages. | [channels.md](./channels.md) |
| Realtime Limits | Plan limits for concurrent Realtime subscriber connections and daily published messages. | [limits.md](./limits.md) |
| Publishing | Publish realtime messages to a channel topic from inside or outside an Inngest function, using either a non-durable client publish or a durable, memoized step publish. | [publishing.md](./publishing.md) |
| Server-side Subscriptions | Read Realtime messages in server code, forward them over Server-Sent Events, or react to them in a worker. | [server-side-subscriptions.md](./server-side-subscriptions.md) |
| Stream AI Responses | Show a model's answer in the UI as it is generated, then publish the final result as a durable step so a retry does not repeat it. | [stream-ai-responses.md](./stream-ai-responses.md) |
| Subscribing | Server-side subscription to realtime channels: mint client-safe tokens with `getClientSubscriptionToken()`, or consume message streams directly on the server with `subscribe()` / `inngest.realtime.subscribe()`. | [subscribing.md](./subscribing.md) |
| Subscription Tokens | Clients cannot subscribe to a realtime channel directly. | [subscription-tokens.md](./subscription-tokens.md) |
| Realtime Troubleshooting | Find why a live update did not reach the client, then fix the channel, token, connection, or publish call. | [troubleshooting.md](./troubleshooting.md) |
| useRealtime | React hook that subscribes to realtime messages from Inngest functions, managing the WebSocket connection, reconnection, buffering, and typed access to messages by topic. | [use-realtime.md](./use-realtime.md) |
