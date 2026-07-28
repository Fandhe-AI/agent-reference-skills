# DeviceInformation / DeviceInformation.FindAllAsync

Represents a device. `DeviceInformation` gives access to well-known device properties (`Id`, `Kind`, `Name`) plus additional properties specified during device enumeration, via the `Windows.Devices.Enumeration` namespace.

## Signature / Usage

```csharp
using Windows.Devices.Enumeration;

// One-shot snapshot enumeration of all devices.
DeviceInformationCollection devices = await DeviceInformation.FindAllAsync();

// Filtered enumeration using an Advanced Query Syntax (AQS) selector string.
string aqs = "System.Devices.InterfaceEnabled:System.StructuredQueryType.Boolean#True";
DeviceInformationCollection filtered = await DeviceInformation.FindAllAsync(aqs);

foreach (DeviceInformation d in devices)
{
    string id = d.Id;
    string name = d.Name;
    bool enabled = d.IsEnabled;
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Id` | `string` | Unique identity string for the device; use for lookups, not display. |
| `Name` | `string` | Localized display name; may change, do not use as an identifier. |
| `Kind` | `DeviceInformationKind` | Kind of `DeviceInformation` object represented (device, device interface, association endpoint, etc.). |
| `IsEnabled` | `bool` | Whether the device is enabled. |
| `IsDefault` | `bool` | Whether this is the default device for its class. |
| `EnclosureLocation` | `EnclosureLocation` | Physical location of the device within its enclosure. |
| `Properties` | `IMapView<string, object>` | Property bag with well-known and additionally requested properties. |
| `Pairing` | `DeviceInformationPairing` | Pairing capability information for the device. |

### Key methods

| Name | Description |
|------|-------------|
| `FindAllAsync()` | Enumerates all `DeviceInformation` objects (snapshot). |
| `FindAllAsync(string aqsFilter)` | Enumerates devices matching an AQS device interface selector string. |
| `FindAllAsync(string aqsFilter, IEnumerable<string> additionalProperties)` | Enumerates matching devices, including the specified additional properties. |
| `FindAllAsync(string aqsFilter, IEnumerable<string> additionalProperties, DeviceInformationKind kind)` | Enumerates matching devices of a specific `DeviceInformationKind`. |
| `FindAllAsync(DeviceClass deviceClass)` | Enumerates devices of the specified `DeviceClass`. |
| `CreateWatcher(...)` overloads | Creates a `DeviceWatcher` for the same selector/class combinations, for live enumeration. |
| `CreateFromIdAsync(string id, ...)` | Creates a `DeviceInformation` object from a previously-saved `Id`. |
| `Update(DeviceInformationUpdate)` | Applies an update delta (from `DeviceWatcher.Updated`/`Removed`) to this object. |

## Notes

- Namespace: `Windows.Devices.Enumeration` (WinRT/UWP). Not related to `android.hardware.usb` or Apple `IOKit` device discovery.
- `FindAllAsync` returns a snapshot; it does not notify about devices added/removed/updated after the call completes. Use `DeviceWatcher` for live updates.
- Filter strings passed to `FindAllAsync`/`CreateWatcher` are Advanced Query Syntax (AQS) strings, typically obtained from a specific device API's `GetDeviceSelector` helper (e.g. `SerialDevice.GetDeviceSelector()`) rather than hand-written.
- `Name` is for display purposes only; it can change due to localization or user renaming, so do not use it to identify a device across sessions — use `Id` + `Kind` instead.

## Related

- [DeviceWatcher](./device-watcher.md)
