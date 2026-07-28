# StreamSocket

Supports network communication using a stream socket over TCP or Bluetooth RFCOMM.

## Signature / Usage

```csharp
using Windows.Networking;
using Windows.Networking.Sockets;

var socket = new StreamSocket();
await socket.ConnectAsync(new HostName("contoso.com"), "80");

using (var writer = new Windows.Storage.Streams.DataWriter(socket.OutputStream))
{
    writer.WriteString("GET / HTTP/1.1\r\nHost: contoso.com\r\n\r\n");
    await writer.StoreAsync();
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Control` | `StreamSocketControl` | Socket control/quality-of-service settings; set before `ConnectAsync`. |
| `Information` | `StreamSocketInformation` | Connection information (local/remote address, port). |
| `InputStream` / `OutputStream` | `IInputStream` / `IOutputStream` | Streams for reading from / writing to the remote host. |
| `ConnectAsync(HostName, String)` | method | Connect to a remote hostname and service name/port (TCP inferred). |
| `ConnectAsync(EndpointPair)` / `ConnectAsync(EndpointPair, SocketProtectionLevel)` | method | Connect using an explicit local/remote endpoint pair (for example, Wi-Fi Direct). |
| `UpgradeToSslAsync(SocketProtectionLevel, HostName)` | method | Upgrades an established connection to SSL/TLS. |
| `GetEndpointPairsAsync(HostName, String)` | method | Resolves DNS SRV-style endpoint pairs for a service. |
| `Close()` / `Dispose()` | method | Disconnects the socket and releases resources; call explicitly rather than relying on scope exit to avoid abortive (RST) disconnects. |

## Notes

- Namespace: `Windows.Networking.Sockets` (WinRT). Requires the `internetClient` and `privateNetworkClientServer` app capabilities (plus `bluetooth.rfcomm` for Bluetooth RFCOMM use).
- Distinct from the `System.Net.Sockets.Socket` (.NET) API; this is the WinRT socket surface used by UWP/WinUI apps.
- Used together with `StreamSocketListener` on the server/receiving side: a connected `StreamSocket` is delivered via `StreamSocketListenerConnectionReceivedEventArgs.Socket`.
- Supports transparent proxy traversal (including authenticating proxies previously authenticated via Internet Explorer or `HttpClient`); connecting through proxies is disabled when a specific network adapter or local address is specified.
- On Windows Server 2012 / 2012 R2, the Media Foundation feature must be enabled or the sockets namespace fails to load.

## Related

- [StreamSocketListener](./stream-socket-listener.md)
- [DatagramSocket](./datagram-socket.md)
- [MessageWebSocket](./message-web-socket.md)
