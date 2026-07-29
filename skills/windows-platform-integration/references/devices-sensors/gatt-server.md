# GattServiceProvider

Lets a Windows app act as a Bluetooth LE GATT **peripheral** (server), publishing local services/characteristics that remote central devices can discover, read, write, and subscribe to. The complementary client-role API (consuming a remote peripheral's services) is `GattDeviceService`.

## Signature / Usage

```csharp
using Windows.Devices.Bluetooth.GenericAttributeProfile;

// Create the primary service.
GattServiceProviderResult result = await GattServiceProvider.CreateAsync(serviceUuid);
if (result.Error != BluetoothError.Success) return;
GattServiceProvider serviceProvider = result.ServiceProvider;

// Add a readable characteristic and handle read requests.
var readParameters = new GattLocalCharacteristicParameters
{
    CharacteristicProperties = GattCharacteristicProperties.Read
};
GattLocalCharacteristicResult charResult =
    await serviceProvider.Service.CreateCharacteristicAsync(characteristicUuid, readParameters);
GattLocalCharacteristic readCharacteristic = charResult.Characteristic;
readCharacteristic.ReadRequested += async (sender, args) =>
{
    Windows.Foundation.Deferral deferral = args.GetDeferral();
    var writer = new Windows.Storage.Streams.DataWriter();
    writer.WriteByte(0x01);
    GattReadRequest request = await args.GetRequestAsync();
    request.RespondWithValue(writer.DetachBuffer());
    deferral.Complete();
};

// Publish the service so it is discoverable/connectable by remote centrals.
serviceProvider.StartAdvertising(new GattServiceProviderAdvertisingParameters
{
    IsDiscoverable = true,
    IsConnectable = true
});
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `GattServiceProviderAdvertisingParameters.IsDiscoverable` | `bool` | Advertises the device's friendly name and includes the service UUID in the advertisement, making the peripheral discoverable. |
| `GattServiceProviderAdvertisingParameters.IsConnectable` | `bool` | Advertises a connectable advertisement so remote centrals can connect. |
| `GattLocalCharacteristicParameters.CharacteristicProperties` | `GattCharacteristicProperties` | Supported operations (Read, Write, Notify, Indicate, etc.) for the characteristic. |
| `GattLocalCharacteristicParameters.StaticValue` | `IBuffer` | Fixed value for a characteristic that never changes, avoiding unnecessary app activation on read. |
| `GattLocalCharacteristic.SubscribedClients` | `IReadOnlyList<GattSubscribedClient>` | Remote centrals currently subscribed for notify/indicate on this characteristic. |

### Key methods

| Name | Description |
|------|-------------|
| `GattServiceProvider.CreateAsync(Guid)` | Creates a provider for a new local primary service with the given UUID. |
| `Service.CreateCharacteristicAsync(Guid, GattLocalCharacteristicParameters)` | Adds a characteristic to the local service; descriptors (CCCD, User Description, Format) are auto-generated as applicable. |
| `GattServiceProvider.StartAdvertising(GattServiceProviderAdvertisingParameters)` / `StopAdvertising()` | Publishes/stops publishing the service for discovery and connection. |
| `GattLocalCharacteristic.NotifyValueAsync(IBuffer)` | Pushes a new value to all (or specific) subscribed clients. |

### Events

| Name | Description |
|------|-------------|
| `GattLocalCharacteristic.ReadRequested` | Raised when a remote central reads a non-constant characteristic; respond via `GattReadRequest.RespondWithValue`. |
| `GattLocalCharacteristic.WriteRequested` | Raised when a remote central writes a value; check `GattWriteRequest.Option` for with/without-response semantics. |
| `GattLocalCharacteristic.SubscribedClientsChanged` | Raised when the set of subscribed clients changes. |

## Notes

- Namespace: `Windows.Devices.Bluetooth.GenericAttributeProfile` (WinRT/UWP). Requires the `bluetooth` app capability. Distinct from `GattDeviceService`, which is the GATT **client** role for consuming a remote peripheral.
- System-reserved services (Device Information, GATT, GAP, Scan Parameters) cannot be published; attempting to do so returns `BluetoothError.DisabledByPolicy` from `CreateAsync`.
- Every request type a characteristic supports must have a registered event handler — an unhandled request type is completed immediately with `UnlikelyError` by the system.
- `Broadcast` is not a supported `GattCharacteristicProperty`; specifying it throws.
- When published in the foreground, the app must call `StopAdvertising()` on suspend.

## Related

- [GattDeviceService](./gatt-device-service.md)
- [BluetoothLEDevice](./bluetooth-le-device.md)
- [Device capability manifest declarations](./device-capabilities-manifest.md)
