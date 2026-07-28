# MessageWebSocket

Provides a message-based abstraction of the WebSocket protocol; the entire message is read or written in a single operation.

## Signature / Usage

```csharp
using Windows.Networking.Sockets;
using Windows.Storage.Streams;

var messageWebSocket = new MessageWebSocket();
messageWebSocket.Control.MessageType = SocketMessageType.Utf8;
messageWebSocket.MessageReceived += (sender, args) =>
{
    using var reader = args.GetDataReader();
    string message = reader.ReadString(reader.UnconsumedBufferLength);
};

await messageWebSocket.ConnectAsync(new Uri("wss://echo.contoso.com"));

using (var writer = new DataWriter(messageWebSocket.OutputStream))
{
    writer.WriteString("hello");
    await writer.StoreAsync();
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Control` | `MessageWebSocketControl` | Configures message type (UTF-8 or binary) and other settings before connecting. |
| `OutputStream` | `IOutputStream` | Stream used to write outgoing messages. |
| `ConnectAsync(Uri)` | method | Connects to `ws://` or `wss://` endpoint. |
| `SetRequestHeader(String, String)` | method | Adds a header to the WebSocket handshake HTTP request. |
| `SendFinalFrameAsync(IBuffer)` / `SendNonfinalFrameAsync(IBuffer)` | method | Sends an individual WebSocket frame with FIN bit set/unset, for streaming a message across multiple frames. |
| `Close()` / `Close(UInt16, String)` | method | Closes the socket, optionally with a close code and reason. |
| `MessageReceived` | event | Raised when a full message arrives. |
| `Closed` | event | Raised when a close frame is received. |
| `ServerCustomValidationRequested` | event | Raised to allow custom validation of the server SSL certificate for `wss:` connections. |

## Notes

- Namespace: `Windows.Networking.Sockets` (WinRT). Requires `internetClient` and `privateNetworkClientServer` app capabilities.
- Use `MessageWebSocket` for UTF-8 text messages; `StreamWebSocket` only supports binary and does not support UTF-8 messages.
- On Windows Server 2012 / 2012 R2, the Media Foundation feature must be enabled or the sockets namespace fails to load.

## Related

- [StreamWebSocket](./stream-web-socket.md)
- [StreamSocket](./stream-socket.md)
