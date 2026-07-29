# LampArray (Windows.Devices.Lights)

Represents an HID Dynamic Lighting device (`LampArray`) attached to the system — a keyboard, mouse, headset, game controller, or other peripheral with one or more individually addressable lamps (LEDs/bulbs). Lets a Windows app read a lamp array's geometry/capabilities and drive per-lamp colors, either while in the foreground or, on Windows 11, as a background ("ambient") controller.

## Signature / Usage

```csharp
using Windows.Devices.Enumeration;
using Windows.Devices.Lights;
using Windows.UI;

DeviceWatcher watcher = DeviceInformation.CreateWatcher(LampArray.GetDeviceSelector());

watcher.Added += async (sender, info) =>
{
    LampArray lampArray = await LampArray.FromIdAsync(info.Id);
    if (lampArray == null) return;

    if (ApiInformation.IsPropertyPresent("Windows.Devices.Lights.LampArray", "IsAvailable"))
    {
        lampArray.AvailabilityChanged += (LampArray sender2, object args) =>
        {
            if (sender2.IsAvailable)
            {
                // Regained control (e.g. no higher-priority app/foreground app is using it).
                sender2.SetColor(Colors.Red);
            }
        };
    }

    if (lampArray.IsAvailable)
    {
        var indices = Enumerable.Range(0, lampArray.LampCount).ToArray();
        lampArray.SetSingleColorForIndices(Colors.Blue, indices);
    }
};

watcher.Start();
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `IsAvailable` | `bool` | Whether the lamp array is currently available for control by this process (foreground apps always win by default; ambient/background apps depend on user priority settings). |
| `IsConnected` | `bool` | Whether the underlying LampArray device is still connected to the system. |
| `IsEnabled` | `bool` | Gets or sets the enabled state of the lamp array. |
| `BrightnessLevel` | `double` | Overall brightness, `0.0` (off) to `1.0` (max); scales every lamp equally. |
| `LampCount` | `int` | Number of lamps in this LampArray. |
| `LampArrayKind` | `LampArrayKind` | Device kind (`Keyboard`, `Mouse`, `GameController`, `Peripheral`, `Scene`, `Notification`, `Chassis`, `Wearable`, `Furniture`, `Art`, `Headset`, etc.). |
| `BoundingBox` | `Vector3` | Logical bounding box encompassing the whole LampArray. |
| `MinUpdateInterval` | `TimeSpan` | Minimum interval the device requires between updates to any one lamp (effective refresh rate). |
| `SupportsVirtualKeys` | `bool` | Whether any lamp is mapped to a virtual key (e.g. keyboard keys). |
| `DeviceId` | `string` | Plug-and-play device identifier of the underlying device. |
| `HardwareProductId` / `HardwareVendorId` / `HardwareVersion` | `ushort` | Hardware IDs of the underlying device. |

### Key methods

| Name | Description |
|------|-------------|
| `LampArray.GetDeviceSelector()` | AQS selector matching all LampArray devices, for use with `DeviceInformation.CreateWatcher`/`FindAllAsync`. |
| `LampArray.FromIdAsync(string)` | Retrieves the LampArray for a given device ID. |
| `GetLampInfo(int)` | Gets the static `LampInfo` (position, purposes, supported color capabilities) for a lamp index. |
| `GetIndicesForKey(VirtualKey)` / `GetIndicesForPurposes(LampPurposes)` | Finds lamp indices bound to a virtual key or a `LampPurposes` value. |
| `SetColor(Color)` | Sets every lamp to the given color. |
| `SetColorForIndex(int, Color)` / `SetColorsForIndices(Color[], int[])` / `SetSingleColorForIndices(Color, int[])` | Sets one lamp, many lamps to matching colors, or many lamps to one color, by index. |
| `SetColorsForKey(Color, VirtualKey)` / `SetColorsForKeys(Color[], VirtualKey[])` | Sets lamps mapped to a virtual key (or keys) to a color. |
| `SetColorsForPurposes(Color, LampPurposes)` | Sets lamps matching a `LampPurposes` to a color. |
| `RequestMessageAsync(int)` / `SendMessageAsync(int, IBuffer)` | Reads/writes a raw vendor-defined HID message by ID. |

### Events

| Name | Description |
|------|-------------|
| `AvailabilityChanged` | Raised when `IsAvailable` changes — e.g. the user reassigns foreground/background control priority in Settings. Handler signature is `(LampArray sender, object args)`; `args` is always `null`. Delivered to both foreground and ambient (background) apps. |

## Notes

- Namespace: `Windows.Devices.Lights` (WinRT/UWP), introduced Windows 10 version 1809 (10.0.17763.0). `AvailabilityChanged` requires 10.0.23504.0+ (Windows 11) and is marked `[Experimental]` in the WinRT metadata. Enumerate with `DeviceWatcher`/`DeviceInformation` (same pattern as `device-watcher.md`) plus `LampArray.GetDeviceSelector()`, then materialize with `FromIdAsync`.
- Foreground control works from Windows 10 1809 onward for both UWP and Win32 apps. Background ("ambient") control — driving lamps while a different app is in the foreground — requires Windows 11 (build 23466+) and is a distinct capability from foreground control.
- A foreground app is always given control of a LampArray by default, unless the user overrides this in **Settings > Personalization > Dynamic lighting**; among competing ambient/background apps, the user's prioritized order in that same Settings page decides. Losing/gaining control surfaces as `IsAvailable`/`AvailabilityChanged` changes, not as an exception.
- Ambient (background) control additionally requires declaring the `com.microsoft.windows.lighting` `AppExtension` in the app package manifest (`Package.appxmanifest`), which in turn requires the app to have package identity (MSIX, or Sparse Packaging with External Location for unpackaged apps).
- The higher-level `Windows.Devices.Lights.Effects` namespace (`LampArraySolidEffect`, `LampArrayEffectPlaylist`, etc.) builds timed/looping effects on top of the raw per-lamp color APIs documented here.
- `Windows.Devices.Lights.Lamp` (singular, non-HID) is a distinct, unrelated legacy API and does not apply to LampArray/HID lighting.

## Related

- [DeviceWatcher / DeviceInformationKind / DeviceSelector](./device-watcher.md)
- [HidDevice / Windows.Devices.HumanInterfaceDevice](./hid-device.md)
- [UsbDevice / Windows.Devices.Usb](./usb-device.md)
