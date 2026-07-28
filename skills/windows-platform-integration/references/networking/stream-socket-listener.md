# StreamSocketListener

Listens for incoming network connections using a TCP stream socket or Bluetooth RFCOMM.

## Signature / Usage

```csharp
using Windows.Networking.Sockets;

var listener = new StreamSocketListener();
listener.ConnectionReceived += (sender, args) =>
{
    StreamSocket socket = args.Socket;
    // Use socket.InputStream / socket.OutputStream to communicate.
};

await listener.BindServiceNameAsync("1234");
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Control` | `StreamSocketListenerControl` | Control data for the listener (quality of service). |
| `Information` | `StreamSocketListenerInformation` | Local socket information. |
| `BindServiceNameAsync(String)` / `BindServiceNameAsync(String, SocketProtectionLevel)` / `BindServiceNameAsync(String, SocketProtectionLevel, NetworkAdapter)` | method | Binds to a local port number, service name, or Bluetooth Service ID. |
| `BindEndpointAsync(HostName, String)` | method | Binds to a local hostname and service name. |
| `ConnectionReceived` | event | Raised when a connection is accepted; carries the resulting `StreamSocket`. |
| `Close()` / `Dispose()` | method | Stops listening and releases resources; sockets already accepted are unaffected. |

## Notes

- Namespace: `Windows.Networking.Sockets` (WinRT). Requires `internetClientServer` and `privateNetworkClientServer` app capabilities (plus `bluetooth.rfcomm` for Bluetooth).
- Assign the `ConnectionReceived` event handler before calling a bind method.
- Over Bluetooth, the only supported `SocketProtectionLevel` values are `PlainSocket`, `BluetoothEncryptionAllowNullAuthentication`, or `BluetoothEncryptionWithAuthentication`; over non-Bluetooth transports only `PlainSocket` is supported.

## Related

- [StreamSocket](./stream-socket.md)
- [DatagramSocket](./datagram-socket.md)
