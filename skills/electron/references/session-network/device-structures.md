---
source: https://www.electronjs.org/docs/latest/api/structures/bluetooth-device
---

# Device structures

Object structures for device selection and permission events: BluetoothDevice, HIDDevice, SerialPort, USBDevice, WebAuthnAccount.

## Signature / Usage

The structure pages contain no code examples. The example below is from the `session` page (https://www.electronjs.org/docs/latest/api/session, `select-hid-device`) and uses `HIDDevice`:

```js
const { app, BrowserWindow } = require('electron')

let win = null

app.whenReady().then(() => {
  win = new BrowserWindow()

  win.webContents.session.on('select-hid-device', (event, details, callback) => {
    event.preventDefault()
    const selectedDevice = details.deviceList.find((device) => {
      return device.vendorId === 9025 && device.productId === 67
    })
    callback(selectedDevice?.deviceId)
  })
})
```

## Options / Props

### BluetoothDevice Object

| Name | Type | Description |
| --- | --- | --- |
| `deviceName` | string | |
| `deviceId` | string | |

### HIDDevice Object

| Name | Type | Description |
| --- | --- | --- |
| `deviceId` | string | Unique identifier for the device. |
| `name` | string | Name of the device. |
| `vendorId` | Integer | The USB vendor ID. |
| `productId` | Integer | The USB product ID. |
| `serialNumber` | string (optional) | The USB device serial number. |
| `guid` | string (optional) | Unique identifier for the HID interface. A device may have multiple HID interfaces. |
| `collections` | Object[] | an array of report formats. See [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/API/HIDDevice/collections) for more. |
| `collections[].usage` | Integer | An integer representing the usage ID component of the HID usage associated with this collection. |
| `collections[].usagePage` | Integer | An integer representing the usage page component of the HID usage associated with this collection. |
| `collections[].type` | Integer | An 8-bit value representing the collection type, which describes a different relationship between the grouped items. |
| `collections[].children` | Object[] | An array of sub-collections which takes the same format as a top-level collection. |
| `collections[].inputReports` | Object[] | An array of inputReport items which represent individual input reports described in this collection. |
| `collections[].outputReports` | Object[] | An array of outputReport items which represent individual output reports described in this collection. |
| `collections[].featureReports` | Object[] | An array of featureReport items which represent individual feature reports described in this collection. |

### SerialPort Object

| Name | Type | Description |
| --- | --- | --- |
| `portId` | string | Unique identifier for the port. |
| `portName` | string | Name of the port. |
| `displayName` | string (optional) | A string suitable for display to the user for describing this device. |
| `vendorId` | string (optional) | The USB vendor ID. |
| `productId` | string (optional) | The USB product ID. |
| `serialNumber` | string (optional) | The USB device serial number. |
| `usbDriverName` | string (optional) _macOS_ | Represents a single serial port on macOS can be enumerated by multiple drivers. |
| `deviceInstanceId` | string (optional) _Windows_ | A stable identifier on Windows that can be used for device permissions. |

### USBDevice Object

| Name | Type | Description |
| --- | --- | --- |
| `configuration` | Object (optional) | A [USBConfiguration](https://developer.mozilla.org/en-US/docs/Web/API/USBConfiguration) object containing information about the currently selected configuration of a USB device. |
| `configuration.configurationValue` | Integer | the configuration value of this configuration. |
| `configuration.configurationName` | string | the name provided by the device to describe this configuration. |
| `configuration.interfaces` | Object[] | An array of [USBInterface](https://developer.mozilla.org/en-US/docs/Web/API/USBInterface) objects containing information about an interface provided by the USB device. |
| `configuration.interfaces[].interfaceNumber` | Integer | the interface number of this interface. |
| `configuration.interfaces[].alternate` | Object | the currently selected alternative configuration of this interface. |
| `...alternate.alternateSetting` | Integer | the alternate setting number of this interface. |
| `...alternate.interfaceClass` | Integer | the class of this interface. See [USB.org](https://www.usb.org/defined-class-codes) for class code descriptions. |
| `...alternate.interfaceSubclass` | Integer | the subclass of this interface. |
| `...alternate.interfaceProtocol` | Integer | the protocol supported by this interface. |
| `...alternate.interfaceName` | string (optional) | the name of the interface, if one is provided by the device. |
| `...alternate.endpoints` | Object[] | an array containing instances of the [USBEndpoint interface](https://developer.mozilla.org/en-US/docs/Web/API/USBEndpoint) describing each of the endpoints that are part of this interface. |
| `...endpoints[].endpointNumber` | Integer | this endpoint's "endpoint number" which is a value from 1 to 15. |
| `...endpoints[].direction` | string | the direction in which this endpoint transfers data - can be either 'in' or 'out'. |
| `...endpoints[].type` | string | the type of this endpoint - can be either 'bulk', 'interrupt', or 'isochronous'. |
| `...endpoints[].packetSize` | Integer | the size of the packets that data sent through this endpoint will be divided into. |
| `configuration.interfaces[].alternates` | Object[] | an array containing instances of the [USBAlternateInterface](https://developer.mozilla.org/en-US/docs/Web/API/USBAlternateInterface) interface describing each of the alternative configurations possible for this interface. |
| `configurations` | Object[] | An array of [USBConfiguration](https://developer.mozilla.org/en-US/docs/Web/API/USBConfiguration) interfaces for controlling a paired USB device. |
| `deviceClass` | Integer | The device class for the communication interface supported by the device. |
| `deviceId` | string | Unique identifier for the device. |
| `deviceProtocol` | Integer | The device protocol for the communication interface supported by the device. |
| `deviceSubclass` | Integer | The device subclass for the communication interface supported by the device. |
| `deviceVersionMajor` | Integer | The major version number of the device as defined by the device manufacturer. |
| `deviceVersionMinor` | Integer | The minor version number of the device as defined by the device manufacturer. |
| `deviceVersionSubminor` | Integer | The subminor version number of the device as defined by the device manufacturer. |
| `manufacturerName` | string (optional) | The manufacturer name of the device. |
| `productId` | Integer | The USB product ID. |
| `productName` | string (optional) | Name of the device. |
| `serialNumber` | string (optional) | The USB device serial number. |
| `usbVersionMajor` | Integer | The USB protocol major version supported by the device. |
| `usbVersionMinor` | Integer | The USB protocol minor version supported by the device. |
| `usbVersionSubminor` | Integer | The USB protocol subminor version supported by the device. |
| `vendorId` | Integer | The USB vendor ID. |

### WebAuthnAccount Object

| Name | Type | Description |
| --- | --- | --- |
| `credentialId` | string | URL-safe base64-encoded (no padding) credential ID of the discoverable credential. Matches `PublicKeyCredential.id` returned by `navigator.credentials.get()` in the renderer. |
| `userHandle` | string (optional) | URL-safe base64-encoded (no padding) user handle (`user.id`) that was provided when the credential was created. |
| `name` | string (optional) | Human-palatable identifier for the account (for example, an email address or username). |
| `displayName` | string (optional) | Human-palatable name for the account, intended for display. |

## Notes

* Source pages (https://www.electronjs.org/docs/latest/api/structures/<name>): bluetooth-device, hid-device, serial-port, usb-device, webauthn-account.
* In the `USBDevice` table, rows prefixed `...` continue the nested path above them (`configuration.interfaces[].alternate`, then `...endpoints[]` under `alternate.endpoints`); the original is a nested bullet list.
* Used by the `select-*` / `*-device-added` / `*-revoked` events ([session-events-devices.md](./session-events-devices.md)) and `ses.setDevicePermissionHandler` ([session-methods-permissions.md](./session-methods-permissions.md)). `BluetoothDevice` is not referenced by a session event on these pages.

## Related

* [session-events-devices](./session-events-devices.md)
* [session-methods-permissions](./session-methods-permissions.md)
