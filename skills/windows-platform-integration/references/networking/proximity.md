# Windows.Networking.Proximity

Supports near-field, tap-based peer discovery and data exchange between devices running the same app. `PeerFinder` advertises/browses for peer apps and creates a `StreamSocket` connection (via tap, Wi-Fi Direct, Bluetooth, or infrastructure Wi-Fi); `ProximityDevice` publishes/subscribes short messages over NFC tap without establishing a socket.

## Signature / Usage

```csharp
using Windows.Networking.Proximity;

// PeerFinder: advertise for a tap or browse connection, then accept it as a StreamSocket.
PeerFinder.DisplayName = "MyApp";
PeerFinder.ConnectionRequested += async (s, e) =>
{
    Windows.Networking.Sockets.StreamSocket socket = await PeerFinder.ConnectAsync(e.PeerInformation);
};
PeerFinder.Start();

// ProximityDevice: publish a short message that another device can subscribe to via tap.
ProximityDevice device = ProximityDevice.GetDefault();
if (device != null)
{
    long subscriptionId = device.PublishMessage("Windows.SmartTag", "hello from tap");
}
```

## Options / Props

### PeerFinder (key members)

| Name | Type | Description |
|------|------|-------------|
| `DisplayName` | `string` | Name shown to remote peers during discovery. |
| `SupportedDiscoveryTypes` | `PeerDiscoveryTypes` | Which discovery mechanisms (`Triggered` tap / `Browse`) are available on this device. |
| `Start()` / `Stop()` | method | Makes the app discoverable to / stops advertising for remote peers. |
| `FindAllPeersAsync()` | method | Asynchronously browses for peer apps within wireless range. |
| `ConnectAsync(PeerInformation)` | method | Connects to a peer discovered via `FindAllPeersAsync` or a tap, returning a `StreamSocket`. |
| `ConnectionRequested` | event | Raised when a remote peer requests a connection. |
| `TriggeredConnectionStateChanged` | event | Raised as a tap-initiated connection progresses (`PeerFound`, `Completed`, etc.). |

### ProximityDevice (key members)

| Name | Type | Description |
|------|------|-------------|
| `GetDefault()` | static method | Returns the default proximity device, or `null` if none is available. |
| `PublishMessage(string, string)` | method | Publishes a message under a type name; delivered to a subscriber on tap. Returns a subscription ID. |
| `SubscribeForMessage(string, ...)` | method | Subscribes to receive messages of a given type from a tapped device. |
| `StopPublishingMessage(long)` / `StopSubscribingForMessage(long)` | method | Cancels a prior publish/subscribe using its ID. |

## Notes

- Namespace: `Windows.Networking.Proximity` (WinRT/UWP). Requires the `proximity` app capability. Distinct from `Windows.Devices.Sensors.ProximitySensor` (see ProximitySensor in devices-sensors), which reports physical object-detection distance rather than doing peer discovery or data exchange.
- The Proximity APIs do not provide authentication or encryption; avoid exchanging sensitive data over them.
- For Bluetooth socket connections on Windows 8.1 and later, prefer `Windows.Devices.Bluetooth.Rfcomm` over `PeerFinder`'s Bluetooth transport.

## Related

- [StreamSocket](./stream-socket.md)
