# Device capability manifest declarations

Apps must declare the device types they use as `DeviceCapability` elements in the `Capabilities` node of `Package.appxmanifest`. Most capabilities can be added via the Visual Studio Manifest Designer; USB, HID, Bluetooth GATT, and Bluetooth RFCOMM require manually editing the manifest XML because they need child elements (vendor/product IDs, usage pages, service UUIDs).

## Signature / Usage

```xml
<Package ...>
  <Capabilities>
    <!-- Simple, name-only capabilities (also available in Manifest Designer) -->
    <DeviceCapability Name="webcam"/>
    <DeviceCapability Name="microphone"/>
    <DeviceCapability Name="location"/>
    <DeviceCapability Name="proximity"/>
    <DeviceCapability Name="activity"/>

    <!-- Bluetooth LE GATT: scoped to a specific service UUID -->
    <DeviceCapability Name="bluetooth.genericAttributeProfile">
      <Device Id="any">
        <Function Type="name:genericAttributeProfile"/>
      </Device>
    </DeviceCapability>

    <!-- Serial-over-Bluetooth (RFCOMM) -->
    <DeviceCapability Name="bluetooth.rfcomm">
      <Device Id="any">
        <Function Type="serviceId:1101"/>
      </Device>
    </DeviceCapability>

    <!-- Custom USB device, scoped to vendor/product ID -->
    <DeviceCapability Name="usb">
      <Device Id="vidpid:045E 078F">
        <Function Type="classId:FF * *"/>
      </Device>
    </DeviceCapability>

    <!-- Serial communication (e.g. USB-to-serial adapter) -->
    <DeviceCapability Name="serialcommunication">
      <Device Id="any">
        <Function Type="name:serialPort"/>
      </Device>
    </DeviceCapability>

    <!-- Human Interface Device -->
    <DeviceCapability Name="humaninterfacedevice">
      <Device Id="vidpid:045E 07CD">
        <Function Type="usage:000D 000E"/>
      </Device>
    </DeviceCapability>
  </Capabilities>
</Package>
```

## Options / Props

| Capability `Name` | Used by | Notes |
|------|---------|-------|
| `webcam` | camera capture | Simple, Manifest Designer-supported. |
| `microphone` | audio capture | Simple, Manifest Designer-supported. |
| `location` | GPS/location sensors | Simple, Manifest Designer-supported. |
| `proximity` | NFC proximity | Simple, Manifest Designer-supported. |
| `activity` | `ActivitySensor` | Simple, Manifest Designer-supported. |
| `bluetooth` | `BluetoothLEDevice`, `BluetoothLEAdvertisementWatcher` | General Bluetooth access; simple capability. |
| `bluetooth.genericAttributeProfile` | `GattDeviceService` (background/broad GATT scenarios) | Requires manual XML with `Device`/`Function` scoped to a service UUID. |
| `bluetooth.rfcomm` | Serial Port Profile over Bluetooth | Requires manual XML scoped to a service ID. |
| `usb` | `UsbDevice` (custom/WinUSB devices) | Requires manual XML scoped to vendor/product ID and/or class. |
| `serialcommunication` | `SerialDevice` | Requires manual XML, often scoped to a USB VID/PID for USB-to-serial adapters. |
| `humaninterfacedevice` | `HidDevice` | Requires manual XML scoped to vendor/product ID and usage page/ID. |

## Notes

- All `DeviceCapability` elements must appear after any `Capability` elements within `Capabilities` in the manifest.
- For Windows App SDK (WinUI 3) **packaged** apps, capabilities are declared identically to UWP in `Package.appxmanifest`. **Unpackaged** Windows App SDK apps have no manifest; device access instead relies on OS-level runtime permission prompts (e.g. for camera/microphone), with no capability declarations required.
- Printers and scanners generally do not require a `DeviceCapability` declaration.
- USB, HID, and Bluetooth GATT/RFCOMM capabilities must be added by hand-editing the manifest XML (Text) editor in Visual Studio; the graphical Manifest Designer does not support them.

## Related

- [BluetoothLEDevice](./bluetooth-le-device.md)
- [UsbDevice](./usb-device.md)
- [SerialDevice](./serial-device.md)
- [HidDevice](./hid-device.md)
- [ActivitySensor](./activity-sensor.md)
