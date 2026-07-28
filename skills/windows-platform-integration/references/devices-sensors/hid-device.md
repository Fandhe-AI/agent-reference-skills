# HidDevice / Windows.Devices.HumanInterfaceDevice

Represents a top-level HID collection and its corresponding device, for custom Human Interface Device (HID) access — sending/receiving input, output, and feature reports.

## Signature / Usage

```csharp
using Windows.Devices.Enumeration;
using Windows.Devices.HumanInterfaceDevice;
using Windows.Storage;

ushort vendorId = 0x045E, productId = 0x07CD, usagePage = 0x000D, usageId = 0x000E;
string selector = HidDevice.GetDeviceSelector(usagePage, usageId, vendorId, productId);

var devices = await DeviceInformation.FindAllAsync(selector);
if (devices.Count > 0)
{
    HidDevice device = await HidDevice.FromIdAsync(devices[0].Id, FileAccessMode.ReadWrite);
    device.InputReportReceived += (sender, args) =>
    {
        HidInputReport report = args.Report;
        var buffer = report.Data;
    };

    HidOutputReport outReport = device.CreateOutputReport();
    await device.SendOutputReportAsync(outReport);
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `VendorId` | `ushort` | Vendor identifier for the device. |
| `ProductId` | `ushort` | Product identifier for the device. |
| `UsagePage` | `ushort` | Usage page of the top-level collection. |
| `UsageId` | `ushort` | Usage identifier for the device. |
| `Version` | `ushort` | Device version/revision number. |

### Key methods

| Name | Description |
|------|-------------|
| `GetDeviceSelector(ushort usagePage, ushort usageId)` | Gets an AQS string filtered by usage page/ID. |
| `GetDeviceSelector(ushort usagePage, ushort usageId, ushort vendorId, ushort productId)` | Gets an AQS string filtered by usage page/ID and vendor/product ID. |
| `FromIdAsync(string, FileAccessMode)` | Opens a handle to the device with the specified access mode. |
| `CreateOutputReport()` / `CreateOutputReport(ushort reportId)` | Creates an output report to send to the device. |
| `CreateFeatureReport()` / `CreateFeatureReport(ushort reportId)` | Creates a feature report to send to the device. |
| `GetInputReportAsync()` / `GetInputReportAsync(ushort reportId)` | Retrieves an input report from the device. |
| `SendOutputReportAsync(HidOutputReport)` | Sends an output report to the device. |
| `SendFeatureReportAsync(HidFeatureReport)` | Sends a feature report to the device. |
| `Close()` / `Dispose()` | Closes the connection between the host and the device. |

### Events

| Name | Description |
|------|-------------|
| `InputReportReceived` | Raised when the device issues an input report. |

## Notes

- Namespace: `Windows.Devices.HumanInterfaceDevice` (WinRT/UWP). Requires HID `DeviceCapability` data (usage page/ID, vendor/product ID) declared manually (via the XML editor, not the Manifest Designer) in the app package manifest. Distinct from Android and Apple HID access APIs.

## Related

- [UsbDevice](./usb-device.md)
- [Device capabilities manifest declarations](./device-capabilities-manifest.md)
