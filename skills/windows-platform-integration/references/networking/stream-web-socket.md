# StreamWebSocket

Provides a stream-based abstraction of the WebSocket protocol, allowing sections of a message to be read per read operation instead of requiring the whole message at once; useful for large transfers such as photos or video.

## Signature / Usage

```csharp
using Windows.Networking.Sockets;
using Windows.Storage.Streams;

var streamWebSocket = new StreamWebSocket();
await streamWebSocket.ConnectAsync(new Uri("wss://media.contoso.com"));

var reader = new DataReader(streamWebSocket.InputStream);
await reader.LoadAsync(1024);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `InputStream` / `OutputStream` | `IInputStream` / `IOutputStream` | Streams for reading from / writing to the remote destination. |
| `Control` | `WebSocketControl` | Configuration before connecting. |
| `ConnectAsync(Uri)` | method | Connects to `ws://` or `wss://` endpoint. |
| `SetRequestHeader(String, String)` | method | Adds a header to the WebSocket handshake HTTP request. |
| `Close()` / `Close(UInt16, String)` | method | Closes the socket, optionally with a close code and reason. |
| `Closed` | event | Raised when a close frame is received. |
| `ServerCustomValidationRequested` | event | Raised to allow custom validation of the server SSL certificate for `wss:` connections. |

## Notes

- Namespace: `Windows.Networking.Sockets` (WinRT). Requires `internetClient` and `privateNetworkClientServer` app capabilities.
- Only supports binary messages; use `MessageWebSocket` for UTF-8 text messages.
- On Windows Server 2012 / 2012 R2, the Media Foundation feature must be enabled or the sockets namespace fails to load.

## Related

- [MessageWebSocket](./message-web-socket.md)
- [StreamSocket](./stream-socket.md)
