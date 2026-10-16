# Realtime Limits

Plan limits for concurrent Realtime subscriber connections and daily published messages.

## Signature / Usage

| Plan | Concurrent connections | Messages per day |
| --- | --- | --- |
| Free | 50 | 250,000 |
| Pro | 1,000 | 1,000,000 |
| Business | 5,000 | 5,000,000 |
| Enterprise | Custom | Custom |

`useRealtime` settings that bound browser memory and rendering:

```tsx
const { messages } = useRealtime({
  channel,
  topics: ["tokens"] as const,
  token,
  historyLimit: null, // default 100; null keeps every message
  bufferInterval: 50, // default 0 ms; batches renders
});
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `historyLimit` | number \| null | Latest 100 messages kept in `messages.all` by default. Raise it, or set `null` to keep every message, when the UI rebuilds text from a stream. |
| `bufferInterval` | number (ms) | 0 ms by default, so every message triggers a render. Set a larger interval to batch renders for fast streams. |
| `pauseOnHidden` | boolean | Default `true`. Pauses in hidden tabs. |
| `autoCloseOnTerminal` | boolean | Default `true`. Closes when the run finishes, freeing the connection. |

## Notes

- Connection limits apply to Realtime subscribers only. Worker connections and step concurrency have separate limits.
- Every publish counts as one message. Streaming model output token by token can publish thousands of messages per answer; multiply by expected runs per day and compare with the plan.
- To reduce volume, publish meaningful state changes rather than every small tick, or batch several tokens into one message before publishing.
- The hook settings run in the browser; they do not change plan limits or add server-side replay.

## Related

- [Stream AI Responses](./stream-ai-responses.md)
- [useRealtime](./use-realtime.md)
- [Realtime Troubleshooting](./troubleshooting.md)
