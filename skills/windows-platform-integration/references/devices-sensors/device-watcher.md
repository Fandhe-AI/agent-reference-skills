# DeviceWatcher / DeviceInformationKind / DeviceSelector

`DeviceWatcher` enumerates devices dynamically, notifying the app when devices matching a query are added, removed, or updated after the initial enumeration is complete. `DeviceInformationKind` classifies what a `DeviceInformation` object represents, and the "device selector" is the Advanced Query Syntax (AQS) string used to filter both `DeviceWatcher` and `DeviceInformation.FindAllAsync`.

## Signature / Usage

```csharp
using Windows.Devices.Enumeration;

DeviceWatcher watcher = DeviceInformation.CreateWatcher();
watcher.Added += (sender, info) => { /* new device found */ };
watcher.Updated += (sender, update) => { /* device properties changed */ };
watcher.Removed += (sender, update) => { /* device no longer available */ };
watcher.EnumerationCompleted += (sender, args) => { /* initial enumeration done */ };
watcher.Stopped += (sender, args) => { /* watcher fully stopped */ };

watcher.Start();
// ... later
watcher.Stop();
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Status` | `DeviceWatcherStatus` | Current state: `Created`, `Started`, `EnumerationCompleted`, `Stopping`, `Stopped`, `Aborted`. |

### Methods

| Name | Description |
|------|-------------|
| `Start()` | Begins the search and subscribes to enumeration events. Only valid from `Created`, `Stopped`, or `Aborted` state. |
| `Stop()` | Requests the watcher stop; transitions through `Stopping` to `Stopped`. Must wait for `Stopped` before calling `Start()` again. |
| `GetBackgroundTrigger(IEnumerable<DeviceWatcherEventKind>)` | Returns a `DeviceWatcherTrigger` for monitoring device changes from a background task. |

### Events

| Name | Description |
|------|-------------|
| `Added` | Raised for each device found, including during initial enumeration. |
| `Updated` | Raised when a watched device's properties change; carries a `DeviceInformationUpdate`. |
| `Removed` | Raised when a device is no longer available or no longer matches the filter. |
| `EnumerationCompleted` | Raised once, after the initial enumeration finishes. |
| `Stopped` | Raised when the watcher has fully stopped (after `Stop()` or on abort). |

### DeviceInformationKind values

`Unknown`, `DeviceInterface`, `DeviceContainer`, `Device`, `DeviceInterfaceClass`, `AssociationEndpoint`, `AssociationEndpointContainer`, `AssociationEndpointService`, `DevicePanel`, `DeviceContainerLocationPath` — determines which properties are available in a `DeviceInformation.Properties` property bag.

## Notes

- Namespace: `Windows.Devices.Enumeration` (WinRT/UWP).
- Create instances via `DeviceInformation.CreateWatcher()` overloads (by AQS selector string, `DeviceClass`, or with no filter for all devices) — there is no public `DeviceWatcher` constructor.
- A device selector (AQS filter string) is normally obtained from a specific device API's `GetDeviceSelector`-style helper method (for example `BluetoothLEDevice.GetDeviceSelector()`, `SerialDevice.GetDeviceSelectorFromUsbVidPid`), not written by hand.
- For devices enumerated over a network or wireless protocol (`AssociationEndpoint*` kinds), prefer `DeviceWatcher` over `FindAllAsync`, since enumeration can take 10+ seconds before completing.
- Background enumeration requires calling `GetBackgroundTrigger` instead of `Start()`; not all protocols (e.g. Bluetooth, Wi-Fi Direct) support background scanning.

## Related

- [DeviceInformation](./device-information.md)
