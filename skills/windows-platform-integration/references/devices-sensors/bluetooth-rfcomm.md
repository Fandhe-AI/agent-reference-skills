# RfcommDeviceService / RfcommServiceProvider

Classic Bluetooth (Bluetooth BR/EDR) support via the Serial Port Profile (RFCOMM). `RfcommDeviceService` connects as a client to a remote RFCOMM service; `RfcommServiceProvider` hosts an RFCOMM service so the app acts as a server. Both hand the actual byte transfer off to `StreamSocket`.

## Signature / Usage

```csharp
using Windows.Devices.Bluetooth;
using Windows.Devices.Bluetooth.Rfcomm;
using Windows.Devices.Enumeration;
using Windows.Networking.Sockets;

// --- Client: connect to a paired device's RFCOMM service ---
DeviceInformationCollection services = await DeviceInformation.FindAllAsync(
    RfcommDeviceService.GetDeviceSelector(RfcommServiceId.ObexObjectPush));

RfcommDeviceService service = await RfcommDeviceService.FromIdAsync(services[0].Id);

StreamSocket socket = new StreamSocket();
await socket.ConnectAsync(
    service.ConnectionHostName,
    service.ConnectionServiceName,
    SocketProtectionLevel.BluetoothEncryptionAllowNullAuthentication);
// Read/write service.OutputStream / socket.InputStream as usual.

// --- Server: host an RFCOMM service and accept a connection ---
RfcommServiceProvider provider = await RfcommServiceProvider.CreateAsync(RfcommServiceId.ObexObjectPush);

StreamSocketListener listener = new StreamSocketListener();
listener.ConnectionReceived += (sender, args) =>
{
    provider.StopAdvertising();
    StreamSocket clientSocket = args.Socket;
};
await listener.BindServiceNameAsync(
    provider.ServiceId.AsString(),
    SocketProtectionLevel.BluetoothEncryptionAllowNullAuthentication);

provider.StartAdvertising(listener);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `RfcommDeviceService.ConnectionHostName` | `HostName` | Host name to pass to `StreamSocket.ConnectAsync`. |
| `RfcommDeviceService.ConnectionServiceName` | `string` | Service name (port) to pass to `StreamSocket.ConnectAsync`. |
| `RfcommDeviceService.ProtectionLevel` / `MaxProtectionLevel` | `SocketProtectionLevel` | Current/maximum socket protection (encryption/authentication) level supported by the service. |
| `RfcommServiceProvider.ServiceId` | `RfcommServiceId` | Service identifier being advertised. |
| `RfcommServiceProvider.SdpRawAttributes` | `IMap<uint, IBuffer>` | Raw, unparsed SDP attributes advertised alongside the service; keyed by attribute ID. |

### Key methods

| Name | Description |
|------|-------------|
| `RfcommDeviceService.GetDeviceSelector(RfcommServiceId)` | Builds an AQS selector to enumerate paired devices exposing the given service, for use with `DeviceInformation.FindAllAsync`. |
| `RfcommDeviceService.FromIdAsync(string)` | Instantiates the service from a `DeviceInformation.Id`. |
| `RfcommDeviceService.GetSdpRawAttributesAsync(BluetoothCacheMode)` | Reads the raw (unparsed) SDP attributes of the remote service. |
| `RfcommServiceProvider.CreateAsync(RfcommServiceId)` | Creates a provider that will advertise the given service ID. |
| `RfcommServiceProvider.StartAdvertising(StreamSocketListener)` | Publishes the SDP record and begins accepting incoming connections via the listener. |
| `RfcommServiceProvider.StopAdvertising()` | Stops advertising the service. |

## Notes

- Namespace: `Windows.Devices.Bluetooth.Rfcomm` (WinRT/UWP), built on `Windows.Networking.Sockets.StreamSocket`/`StreamSocketListener`. Requires the `bluetooth` app capability (or a `bluetooth.rfcomm` capability scoped to a service ID) in `Package.appxmanifest`. Distinct from the Bluetooth LE APIs (`BluetoothLEDevice`, `GattDeviceService`) which use GATT, not RFCOMM/SDP.
- Service identifiers (`RfcommServiceId`) are 128-bit UUIDs, but well-known Bluetooth SIG services (e.g. `RfcommServiceId.ObexObjectPush`) can also be constructed from 16-/32-bit short IDs.
- SDP attribute values are exposed as raw, unparsed buffers (via `DataReader`/`DataWriter`) rather than typed objects, because real-world devices often use non-conformant SDP attribute types.
- To keep an RFCOMM connection alive in the background, use `RfcommConnectionTrigger` (server) together with a background task.

## Related

- [BluetoothLEDevice](./bluetooth-le-device.md)
- [GATT server (GattServiceProvider)](./gatt-server.md)
- [Device capability manifest declarations](./device-capabilities-manifest.md)
- [StreamSocket](../networking/stream-socket.md)
- [StreamSocketListener](../networking/stream-socket-listener.md)
