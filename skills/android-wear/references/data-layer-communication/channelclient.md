# ChannelClient

Client interface for the Wearable Channel API (`com.google.android.gms.wearable.ChannelClient`, extends `GoogleApi<Wearable.WearableOptions>`). Lets apps on a wearable device send and receive data streams to and from other wearable nodes.

## Signature / Usage

```java
public abstract class ChannelClient extends GoogleApi<Wearable.WearableOptions>

abstract Task<Channel> openChannel(String nodeId, String path)
abstract Task<OutputStream> getOutputStream(ChannelClient.Channel channel)
abstract Task<InputStream> getInputStream(ChannelClient.Channel channel)
abstract Task<Void> sendFile(ChannelClient.Channel channel, Uri uri)
abstract Task<Void> receiveFile(ChannelClient.Channel channel, Uri uri, boolean append)
abstract Task<Void> close(ChannelClient.Channel channel)
```

## Options / Props

| Member | Type | Description |
| --- | --- | --- |
| `ACTION_CHANNEL_EVENT` | `String` | `"com.google.android.gms.wearable.CHANNEL_EVENT"`; `Channel` action for use in listener filters (see `WearableListenerService`). |
| `openChannel(nodeId, path)` | `Task<Channel>` | Opens a channel to a remote node. `nodeId` comes from `CapabilityInfo` or `NodeClient.getConnectedNodes()`; `path` is an app-specific identifier. Involves a network round trip. Returns the new channel, or `null` if the connection could not be opened. |
| `getInputStream(channel)` | `Task<InputStream>` | Stream to read data from the remote node. Reads may block for a long time; throws `IOException` (possibly `ChannelIOException`) on connection errors. |
| `getOutputStream(channel)` | `Task<OutputStream>` | Stream to send data to the remote node. Writes are buffered; `flush` to send early. |
| `sendFile(channel, uri)` / `sendFile(channel, uri, startOffset, length)` | `Task<Void>` | Reads from a file into the output side of the channel. |
| `receiveFile(channel, uri, append)` | `Task<Void>` | Reads channel input into a file (`uri` must be a file URI writable by the current process; `append` appends instead of overwriting). Writing is done in a background process owned by Google Play services. |
| `close(channel)` / `close(channel, errorCode)` | `Task<Void>` | Closes a channel. With `errorCode`, the app-defined code goes to the remote `onChannelClosed` and remote reads/writes fail with `ChannelIOException`. `errorCode == 0` means no error. |
| `registerChannelCallback(callback)` / `registerChannelCallback(channel, callback)` | `Task<Void>` | Registers a `ChannelClient.ChannelCallback` for all channel events or for one channel. |
| `unregisterChannelCallback(callback)` / `unregisterChannelCallback(channel, callback)` | `Task<Boolean>` | Removes a previously registered callback. |

Nested types: `ChannelClient.Channel` (created via `openChannel`), `ChannelClient.ChannelCallback` (notified on channel changes), `@interface ChannelClient.CloseReason` (annotation for values passed to `ChannelCallback` methods such as `onChannelClosed(Channel, int, int)`).

## Notes

- Channels are bidirectional: initiator and receiver both read and write, and once established the API is identical on both sides.
- Channels exist only while the nodes are connected. When the remote node disconnects, all channels close, and callbacks registered via `registerChannelCallback` and any installed `WearableListenerService` are notified.
- Use `getInputStream` or `receiveFile` only once per channel, and not both; likewise `getOutputStream` or `sendFile`. Close streams before calling `close`, otherwise the next read/write throws `ChannelIOException`.
- After `receiveFile`, do not close the channel immediately; install a `ChannelCallback` and wait for `onInputClosed(Channel, int, int)` to learn the file is ready.
- `openChannel` must keep the client connected during the round trip or the request is cancelled.
- Source: https://developers.google.com/android/reference/com/google/android/gms/wearable/ChannelClient; https://developers.google.com/android/reference/com/google/android/gms/wearable/ChannelClient.ChannelCallback (fetched 2026-10).

## Related

- [Data Layer API overview](./data-layer-overview.md)
- [DataClient](./dataclient.md)
- [MessageClient](./messageclient.md)
- [NodeClient](./nodeclient.md)
- [WearableListenerService](./wearablelistenerservice.md)
