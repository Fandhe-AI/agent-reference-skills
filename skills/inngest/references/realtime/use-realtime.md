# useRealtime

React hook that subscribes to realtime messages from Inngest functions, managing the WebSocket connection, reconnection, buffering, and typed access to messages by topic.

## Signature / Usage

```tsx
import { useRealtime } from "inngest/react";
import { pipelineChannel } from "../inngest/channels";

function Pipeline({ contentId }: { contentId: string }) {
  const ch = pipelineChannel({ contentId });
  const topics = ["status", "tokens"] as const;

  const { connectionStatus, runStatus, messages, result } = useRealtime({
    channel: ch,
    topics,
    token: () =>
      fetch(`/api/realtime-token?contentId=${contentId}`).then((r) => r.json()),
  });

  return (
    <div>
      <p>Connection: {connectionStatus} | Run: {runStatus}</p>
      {messages.byTopic.status && <p>{messages.byTopic.status.data.message}</p>}
      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
}
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| channel | ChannelInstance \| string | — | Channel to subscribe to. Passing a channel instance types `messages.byTopic` etc. automatically. |
| topics | string[] | — | Topics to subscribe to within the channel. Required when `token` is a `ClientSubscriptionToken` or a factory returning only a token key string. |
| token | ClientSubscriptionToken \| Token \| () => Promise<string \| ClientSubscriptionToken \| Token> | — | Auth for the subscription. Async factory recommended — it runs on mount and on reconnect. |
| key | string | — | Optional subscription identity key; changing it resets retained state and forces reconnect. |
| enabled | boolean | `true` | Whether the subscription is active. Set `false` to pause without unmounting. |
| validate | boolean | `true` | Enable subscriber-side schema validation on incoming messages. |
| historyLimit | number \| null | `100` | Max messages retained in `messages.all`. `null` for unbounded. |
| bufferInterval | number | `0` | Milliseconds to buffer incoming messages before re-render; reduces render pressure for high-frequency streams. |
| reconnect | boolean | `true` | Automatically reconnect on disconnect. |
| reconnectMinMs | number | `250` | Minimum delay between reconnect attempts. |
| reconnectMaxMs | number | `5000` | Maximum delay between reconnect attempts (exponential backoff cap). |
| pauseOnHidden | boolean | `true` | Pause the subscription when the browser tab is hidden. |
| autoCloseOnTerminal | boolean | `true` | Automatically close the subscription when the run reaches a terminal status. |

### Return value

| Name | Type | Description |
| --- | --- | --- |
| connectionStatus | `"idle" \| "connecting" \| "open" \| "paused" \| "closed" \| "error"` | WebSocket connection status. |
| runStatus | `"unknown" \| "running" \| "completed" \| "failed" \| "cancelled"` | Lifecycle status of the Inngest function run, updated from run-level messages. |
| isPaused | boolean | Convenience for `connectionStatus === "paused"`. |
| pauseReason | `"hidden" \| "disabled" \| null` | Why the hook is paused. |
| messages.byTopic | Record<string, Message \| undefined> | Latest message per subscribed topic. |
| messages.all | Message[] | All retained messages in chronological order, bounded by `historyLimit`. |
| messages.last | Message \| null | Most recently flushed message across all topics. |
| messages.delta | Message[] | Newest batch of flushed messages. |
| error | Error \| null | Most recent connection error, or `null`. |
| result | unknown | Function's return value, extracted from the terminal run message on completion. |
| reset | () => void | Clears retained messages, result, and error state; resets the hook. |

## Notes

- The token factory pattern (`token: () => Promise<...>`) is recommended: it is called on mount and on every reconnect, ensuring fresh tokens without manual expiry management. Mint tokens with `getClientSubscriptionToken()`.
- A pre-minted `ClientSubscriptionToken` intentionally contains only `key` and `apiBaseUrl`; keep `channel` and `topics` as top-level `useRealtime` options to preserve typed message inference.
- When `autoCloseOnTerminal` is `true` (default), the subscription closes automatically once `runStatus` reaches `completed`, `failed`, or `cancelled`.
- This is the v4 TypeScript SDK realtime API (`inngest/react`).

## Related

- [Channels & Topics](./channels.md)
- [Subscribing](./subscribing.md)
- [Subscription Tokens](./subscription-tokens.md)
