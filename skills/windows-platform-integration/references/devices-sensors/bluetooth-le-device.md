# BluetoothLEDevice

Represents a Bluetooth Low Energy (LE) device. Provides access to GATT services and connection status for a paired or discovered peer device.

## Signature / Usage

```csharp
using Windows.Devices.Bluetooth;
using Windows.Devices.Bluetooth.GenericAttributeProfile;

BluetoothLEDevice device = await BluetoothLEDevice.FromIdAsync(deviceInfo.Id);
// or: await BluetoothLEDevice.FromBluetoothAddressAsync(bluetoothAddress);

device.ConnectionStatusChanged += (sender, args) =>
{
    BluetoothConnectionStatus status = sender.ConnectionStatus;
};

GattDeviceServicesResult result = await device.GetGattServicesAsync(BluetoothCacheMode.Uncached);
if (result.Status == GattCommunicationStatus.Success)
{
    IReadOnlyList<GattDeviceService> services = result.Services;
}

device.Dispose();
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `ConnectionStatus` | `BluetoothConnectionStatus` | Current connection status of the device. |
| `Name` | `string` | Name of the Bluetooth LE device. |
| `BluetoothAddress` | `ulong` | Device's Bluetooth address. |
| `BluetoothAddressType` | `BluetoothAddressType` | Address type (public or random). |
| `BluetoothDeviceId` | `BluetoothDeviceId` | Bluetooth device ID. |
| `DeviceInformation` | `DeviceInformation` | Associated `DeviceInformation` object. |
| `Appearance` | `BluetoothLEAppearance` | Declared appearance of the device. |
| `WasSecureConnectionUsedForPairing` | `bool` | Whether pairing used a secure connection. |

### Key methods

| Name | Description |
|------|-------------|
| `FromIdAsync(string)` | Returns a `BluetoothLEDevice` for the given `DeviceInformation.Id`. |
| `FromBluetoothAddressAsync(ulong)` / `FromBluetoothAddressAsync(ulong, BluetoothAddressType)` | Returns a `BluetoothLEDevice` for the given Bluetooth address. |
| `GetGattServicesAsync()` / `GetGattServicesAsync(BluetoothCacheMode)` | Gets all GATT services on the device. |
| `GetGattServicesForUuidAsync(Guid)` | Gets GATT services matching a specific service UUID. |
| `GetDeviceSelector()` | Gets an AQS string for `FindAllAsync`/`CreateWatcher` to enumerate Bluetooth LE devices. |
| `RequestAccessAsync()` | Requests access to the device. |
| `GetConnectionParameters()` / `GetConnectionPhy()` | Retrieves connection parameters/PHY info; only valid while connected. |
| `Close()` / `Dispose()` | Releases the device connection; call when finished. |

### Events

| Name | Description |
|------|-------------|
| `ConnectionStatusChanged` | Raised when `ConnectionStatus` changes. |
| `GattServicesChanged` | Raised when the list of GATT services changes. |
| `NameChanged` | Raised when the device name changes. |
| `ConnectionParametersChanged` | Raised when connection parameters change (only while connected). |
| `ConnectionPhyChanged` | Raised when the connection PHY changes (only while connected). |

## Notes

- Namespace: `Windows.Devices.Bluetooth` (WinRT/UWP). Requires the `bluetooth` app capability. Distinct from Android `BluetoothLeScanner`/`BluetoothGatt` and Apple `CoreBluetooth.CBPeripheral`.
- `GattServices` and `GetGattService(Guid)` are deprecated; use `GetGattServicesAsync`/`GetGattServicesForUuidAsync` instead.
- Implements `IClosable`/`IDisposable`; dispose the device when done to release the underlying connection.

## Related

- [GattDeviceService](./gatt-device-service.md)
- [BluetoothLEAdvertisementWatcher](./bluetooth-le-advertisement-watcher.md)
- [Device capabilities manifest declarations](./device-capabilities-manifest.md)
