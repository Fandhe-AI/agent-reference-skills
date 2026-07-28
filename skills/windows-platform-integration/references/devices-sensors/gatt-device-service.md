# GattDeviceService

Represents a GATT primary service on a Bluetooth LE device. Instantiated from a device service instance path obtained via `Windows.Devices.Enumeration` or `BluetoothLEDevice.GetGattServicesAsync`.

## Signature / Usage

```csharp
using Windows.Devices.Bluetooth.GenericAttributeProfile;

GattDeviceServicesResult servicesResult = await device.GetGattServicesForUuidAsync(serviceUuid);
GattDeviceService service = servicesResult.Services[0];

GattCharacteristicsResult charResult = await service.GetCharacteristicsAsync();
if (charResult.Status == GattCommunicationStatus.Success)
{
    foreach (GattCharacteristic characteristic in charResult.Characteristics)
    {
        // read/write/subscribe to characteristic
    }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Uuid` | `Guid` | GATT service UUID. |
| `Session` | `GattSession` | Session for this service instance. |
| `SharingMode` | `GattSharingMode` | Sharing mode (shared or exclusive) for this instance. |
| `DeviceId` | `string` | Device service instance path used to instantiate the service. |
| `AttributeHandle` | `ushort` | Handle uniquely identifying the service attribute on the device. |
| `Device` | `BluetoothLEDevice` | *(Deprecated)* Owning device; use `Session` instead. |

### Key methods

| Name | Description |
|------|-------------|
| `FromIdAsync(string)` / `FromIdAsync(string, GattSharingMode)` | Instantiates a `GattDeviceService` from a device ID. |
| `GetCharacteristicsAsync()` / `GetCharacteristicsAsync(BluetoothCacheMode)` | Gets all characteristics of the service. |
| `GetCharacteristicsForUuidAsync(Guid)` | Gets characteristics matching a specific UUID. |
| `GetIncludedServicesAsync()` / `GetIncludedServicesForUuidAsync(Guid)` | Gets services included by this service. |
| `OpenAsync(GattSharingMode)` | Opens the service with the specified sharing mode. |
| `RequestAccessAsync()` | Requests access to the service. |
| `GetDeviceSelectorForBluetoothDeviceIdAndUuid(BluetoothDeviceId, Guid)` | Gets an AQS selector scoped to a device + service UUID. |
| `Close()` / `Dispose()` | Releases the service; do not reuse after calling — instantiate a new one via `FromIdAsync`. |

## Notes

- Namespace: `Windows.Devices.Bluetooth.GenericAttributeProfile` (WinRT/UWP). Requires the `bluetooth` app capability (Bluetooth GATT capability for background/broader scenarios). Distinct from Android `BluetoothGattService` and Apple `CoreBluetooth.CBService`.
- `GetAllCharacteristics`, `GetCharacteristics(Guid)`, `GetAllIncludedServices`, and `GetIncludedServices(Guid)` are deprecated; prefer the `*Async` variants.
- Implements `IClosable`/`IDisposable`; once `Close()`/`Dispose()` is called the object must not be reused.

## Related

- [BluetoothLEDevice](./bluetooth-le-device.md)
