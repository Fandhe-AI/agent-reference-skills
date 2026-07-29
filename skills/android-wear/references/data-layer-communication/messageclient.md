# MessageClient

Sends one-way or request/response messages between connected nodes (phone/watch), suited to remote procedure calls such as triggering an action in the companion app. Unlike `DataClient`, messages require the target node to be currently connected — they are best-effort with no persistence and no built-in retry.

## Signature / Usage

```kotlin
import com.google.android.gms.wearable.Wearable

Wearable.getMessageClient(this)
    .sendMessage(nodeId, "/data-item-received", payload)
```

Listening for messages in a background service:

```kotlin
import com.google.android.gms.wearable.MessageEvent
import com.google.android.gms.wearable.WearableListenerService

class MyMessageListenerService : WearableListenerService() {
    override fun onMessageReceived(messageEvent: MessageEvent) {
        when (messageEvent.path) {
            "/data-item-received" -> handlePayload(messageEvent.data)
        }
    }
}
```

## Options / Props

| Member | Type | Description |
| --- | --- | --- |
| `sendMessage(nodeId: String, path: String, data: ByteArray?)` | `Task<Int>` | One-way, best-effort send; returns `TARGET_NODE_NOT_CONNECTED` if the node disconnects before transfer starts. |
| `sendRequest(nodeId: String, path: String, data: ByteArray?)` | `Task<ByteArray>` | Request/response RPC — awaits a reply payload from the target node. |
| `addListener(listener)` / `removeListener(listener)` | `Task<Void>` | Registers/unregisters a foreground `OnMessageReceivedListener`. |
| `MessageEvent.getPath()` / `getData()` / `getSourceNodeId()` | — | Accessors on the event delivered to `onMessageReceived`. |

## Notes

- No offline support and no persistence: if the destination node is unreachable when `sendMessage` is called, the call fails rather than queuing.
- Prefers Bluetooth, falling back to Wi-Fi when Bluetooth is unavailable; to conserve battery, only send messages to nearby (directly Bluetooth-connected) nodes rather than any reachable node.
- For payloads that must persist or arrive later, use `DataClient`; for continuous byte streams (e.g. large files or audio), use `ChannelClient` (not covered here).

## Related

- [DataClient](./dataclient.md)
- [WearableListenerService](./wearablelistenerservice.md)
- [NodeClient](./nodeclient.md)
