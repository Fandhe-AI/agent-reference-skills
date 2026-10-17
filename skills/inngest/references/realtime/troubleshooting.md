# Realtime Troubleshooting

Find why a live update did not reach the client, then fix the channel, token, connection, or publish call.

## Signature / Usage

Checklist when the client receives no messages (the five places to check: publish call, token, channel name, topic list, connection):

```tsx
const { messages, connectionStatus, error } = useRealtime({
  channel: jobChannel({ jobId }), // must resolve to the publisher's channel name
  topics: ["status", "result"] as const, // must include the published topic
  token: () => fetchToken(jobId), // token factory refreshes on reconnect
});
// Wait for connectionStatus === "open" before starting the work that publishes.
```

## Notes

- **No messages**: (1) confirm publishing ran; `step.realtime.publish()` appears as a step in the run trace, and for `inngest.realtime.publish()` check the code path ran and the awaited call did not throw. (2) Compare resolved channel names across publisher, token, and `useRealtime` (`job:123` does not reach `job:124`). (3) Publisher, token, and `useRealtime({ topics })` must all include the topic; a token grants only its listed topics. (4) Messages are delivered only to clients connected when published, so wait for `connectionStatus` to be `open`; a hidden (paused) tab also misses messages. (5) `messages.byTopic.status` holds only the latest `status` message; `messages.all` keeps up to `historyLimit` (100 by default); `bufferInterval` delays renders.
- **Schema error on publish**: compare the payload with the topic's fields and types and import the same channel definition in publisher and subscriber. A runtime validator such as Zod rejects mismatches at publish; `staticSchema<T>()` checks types only at compile time, so a mismatch can reach the subscriber, which logs a validation error. If only the subscriber errors, check for differing deployed schema versions.
- **Cannot connect / authorization error**: mint on the server with `getClientSubscriptionToken()` and send the `{ key, apiBaseUrl }` object to the browser (the signing key stays on the server). Token channel and topics must cover what `useRealtime` requests, and `channel` and `topics` must also be passed to the hook. Match `apiBaseUrl` with the publisher's environment; locally set `INNGEST_DEV=1` on the token-minting server. Pass a token factory so reconnects get a fresh token. Never mint a token for an unchecked channel ID from the browser.
- **Connection closes or keeps reconnecting**: inspect `connectionStatus` and `error`. `paused` comes from `enabled: false` or a hidden tab while `pauseOnHidden` is `true` (`pauseReason` says which). `closed` follows a completed, failed, or cancelled run while `autoCloseOnTerminal` is `true`. The hook reconnects by default; if that fails check the token factory, the user's access, and `apiBaseUrl`. When the job or channel ID changes, pass the new channel or change the hook's `key`. `reset()` clears retained messages, result, and error.
- **Repeated progress or tokens**: `inngest.realtime.publish()` is not memoized, so it publishes again when surrounding work retries; a call outside any step can also repeat when the function resumes after a wait. Use `step.realtime.publish(id, topic, data)` with a stable, unique step ID for state changes and final results, move immediate publishes inside `step.run()`, and for token streams let the UI tolerate repeats (for example reset streamed text when the step restarts).
- **Server-side subscriber receives nothing**: check `channel` and `topics` passed to `subscribe({ app: inngest, ... })` or `inngest.realtime.subscribe()`. Read the returned stream or pass `onMessage`; creating a subscription alone does not process messages. Pass `onError` to see connection errors, and subscribe before the work publishes.
- **When asking for help**, include the resolved channel name, topic, function run ID, publish method, `connectionStatus`, `error`, the token route's response status, and whether the tab was hidden. Do not include token keys or signing keys.
- Source: https://www.inngest.com/docs-markdown/realtime/troubleshooting (fetched 2026-10).

## Related

- [Publishing](./publishing.md)
- [Subscription Tokens](./subscription-tokens.md)
- [useRealtime](./use-realtime.md)
- [Server-side Subscriptions](./server-side-subscriptions.md)
- [Realtime Limits](./limits.md)
