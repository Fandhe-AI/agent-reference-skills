# UsbDevice / Windows.Devices.Usb

Represents a custom USB device (WinUSB). Provides methods and properties to enumerate USB devices and send IN/OUT control transfers.

## Signature / Usage

```csharp
using Windows.Devices.Enumeration;
using Windows.Devices.Usb;

uint vid = 0x045E, pid = 0x078F;
string aqs = UsbDevice.GetDeviceSelector(vid, pid);

DeviceInformationCollection devices = await DeviceInformation.FindAllAsync(aqs, null);
if (devices.Count > 0)
{
    UsbDevice device = await UsbDevice.FromIdAsync(devices[0].Id);

    var setupPacket = new UsbSetupPacket
    {
        RequestType = new UsbControlRequestType
        {
            Recipient = UsbControlRecipient.DefaultInterface,
            ControlTransferType = UsbControlTransferType.Vendor
        }
    };
    await device.SendControlOutTransferAsync(setupPacket);
    device.Close();
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `DeviceDescriptor` | `UsbDeviceDescriptor` | The USB device descriptor. |
| `Configuration` | `UsbConfiguration` | Current USB configuration, including interfaces and endpoints. |
| `DefaultInterface` | `UsbInterface` | Default (first) interface in the configuration. |

### Key methods

| Name | Description |
|------|-------------|
| `GetDeviceSelector(uint vid, uint pid)` | Gets an AQS string filtered by vendor/product ID. |
| `GetDeviceSelector(Guid interfaceGuid)` | Gets an AQS string filtered by device interface GUID. |
| `GetDeviceClassSelector(UsbDeviceClass)` | Gets an AQS string filtered by USB device class. |
| `FromIdAsync(string)` | Creates a `UsbDevice` from a `DeviceInformation.Id`. |
| `SendControlInTransferAsync(UsbSetupPacket, IBuffer?)` | Sends a control transfer that reads from the default control endpoint. |
| `SendControlOutTransferAsync(UsbSetupPacket, IBuffer?)` | Sends a control transfer that writes to the default control endpoint. |
| `Close()` / `Dispose()` | Releases the `UsbDevice` reference obtained via `FromIdAsync`. |

## Notes

- Namespace: `Windows.Devices.Usb` (WinRT/UWP). Requires a `usb` `DeviceCapability` declared in the app manifest, scoped to specific vendor/product/class IDs. Only works with devices exposing a WinUSB-compatible interface (custom/vendor-defined USB devices), not standard device classes (HID, mass storage, etc.). Distinct from Android `UsbManager`/`UsbDevice` and Apple `IOUSBHost`.
- Steps to obtain a `UsbDevice`: build an AQS selector via `GetDeviceSelector`, pass it to `DeviceInformation.FindAllAsync`, then call `FromIdAsync` with the resulting `DeviceInformation.Id`.

## Related

- [SerialDevice](./serial-device.md)
- [HidDevice](./hid-device.md)
- [Device capabilities manifest declarations](./device-capabilities-manifest.md)
