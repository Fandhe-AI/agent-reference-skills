# DatagramSocket

Supports network communication using a UDP datagram socket, for both client (send/receive to a single endpoint) and server (bind and listen) scenarios, including multicast.

## Signature / Usage

```csharp
using Windows.Networking;
using Windows.Networking.Sockets;

var socket = new DatagramSocket();
socket.MessageReceived += (sender, args) =>
{
    using var reader = args.GetDataReader();
    string message = reader.ReadString(reader.UnconsumedBufferLength);
};

await socket.ConnectAsync(new HostName("contoso.com"), "1234");
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Control` | `DatagramSocketControl` | Advanced socket controls (rarely needed). |
| `Information` | `DatagramSocketInformation` | Local/remote hostname and service name info. |
| `OutputStream` | `IOutputStream` | Stream to write to the remote host once connected. |
| `ConnectAsync(HostName, String)` / `ConnectAsync(EndpointPair)` | method | Binds the socket to a single remote endpoint (client scenario). |
| `BindEndpointAsync(HostName, String)` / `BindServiceNameAsync(String)` / `BindServiceNameAsync(String, NetworkAdapter)` | method | Binds to a local service name/port to receive from any remote endpoint (server scenario). |
| `GetOutputStreamAsync(HostName, String)` / `GetOutputStreamAsync(EndpointPair)` | method | Gets an output stream to a specific destination without a full connect. |
| `JoinMulticastGroup(HostName)` | method | Joins the socket to a multicast group. |
| `MessageReceived` | event | Raised when a UDP message arrives; must be assigned before bind/connect. |

## Notes

- Namespace: `Windows.Networking.Sockets` (WinRT). Requires `internetClient` and `privateNetworkClientServer` app capabilities.
- The `MessageReceived` event handler must be set before calling any bind or connect method, or an error occurs.
- On Windows Server 2012 / 2012 R2, the Media Foundation feature must be enabled or the sockets namespace fails to load.

## Related

- [StreamSocket](./stream-socket.md)
- [StreamSocketListener](./stream-socket-listener.md)
