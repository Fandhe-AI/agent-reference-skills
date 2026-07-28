# BluetoothLEAdvertisementWatcher

An object used to scan for and receive Bluetooth Low Energy (LE) advertisement packets broadcast by nearby devices.

## Signature / Usage

```csharp
using Windows.Devices.Bluetooth.Advertisement;

BluetoothLEAdvertisementWatcher watcher = new BluetoothLEAdvertisementWatcher();
watcher.ScanningMode = BluetoothLEScanningMode.Active;

watcher.Received += (sender, args) =>
{
    ulong address = args.BluetoothAddress;
    short rssi = args.RawSignalStrengthInDBm;
    BluetoothLEAdvertisement advertisement = args.Advertisement;
};
watcher.Stopped += (sender, args) => { /* scan cancelled or aborted */ };

watcher.Start();
// ... later
watcher.Stop();
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `ScanningMode` | `BluetoothLEScanningMode` | `Passive` or `Active` scanning. |
| `Status` | `BluetoothLEAdvertisementWatcherStatus` | Current watcher status (`Created`, `Started`, `Stopping`, `Stopped`, `Aborted`). |
| `AdvertisementFilter` | `BluetoothLEAdvertisementFilter` | Payload-based advertisement filter. |
| `SignalStrengthFilter` | `BluetoothSignalStrengthFilter` | RSSI-based filter, including in/out-of-range thresholds. |
| `AllowExtendedAdvertisements` | `bool` | Enables reception of Extended Advertising format packets. Default `false`. |
| `MinSamplingInterval` / `MaxSamplingInterval` | `TimeSpan` | Supported sampling interval range. |
| `MinOutOfRangeTimeout` / `MaxOutOfRangeTimeout` | `TimeSpan` | Supported out-of-range timeout range. |

### Constructors

| Name | Description |
|------|-------------|
| `BluetoothLEAdvertisementWatcher()` | Creates a watcher with no filter. |
| `BluetoothLEAdvertisementWatcher(BluetoothLEAdvertisementFilter)` | Creates a watcher pre-configured with an advertisement filter. |

### Methods

| Name | Description |
|------|-------------|
| `Start()` | Starts scanning for advertisements. |
| `Stop()` | Stops scanning for advertisements. |

### Events

| Name | Description |
|------|-------------|
| `Received` | Raised for each new advertisement packet received. |
| `Stopped` | Raised when scanning has been cancelled or aborted. |

## Notes

- Namespace: `Windows.Devices.Bluetooth.Advertisement` (WinRT/UWP). Requires the `bluetooth` app capability. Distinct from Android `BluetoothLeScanner`/`ScanCallback` and Apple `CoreBluetooth.CBCentralManager` scanning.
- Set `ScanningMode` and filters before calling `Start()`; changing them while running has no effect until the watcher is restarted.

## Related

- [BluetoothLEDevice](./bluetooth-le-device.md)
