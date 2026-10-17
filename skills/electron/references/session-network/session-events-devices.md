---
source: https://www.electronjs.org/docs/latest/api/session#event-select-hid-device
---

# Session events: HID, serial, USB, WebAuthn device selection

Instance events of `Session` for selecting HID, serial and USB devices and WebAuthn accounts requested from the renderer.

## Signature / Usage

Process: Main

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

### Event: 'select-hid-device'

Returns:

* `event` Event
* `details` Object
  * `deviceList` [HIDDevice[]](./device-structures.md)
  * `frame` WebFrameMain | null - The frame initiating this event. May be `null` if accessed after the frame has either navigated or been destroyed.
* `callback` Function
  * `deviceId` string | null (optional)

Emitted when a HID device needs to be selected when a call to `navigator.hid.requestDevice` is made. `callback` should be called with `deviceId` to be selected; passing no arguments to `callback` will cancel the request. Additionally, permissioning on `navigator.hid` can be further managed by using `ses.setPermissionCheckHandler(handler)` and `ses.setDevicePermissionHandler(handler)` (see [session-methods-permissions.md](./session-methods-permissions.md)).

```js
const { app, BrowserWindow } = require('electron')

let win = null

app.whenReady().then(() => {
  win = new BrowserWindow()

  win.webContents.session.setPermissionCheckHandler((webContents, permission, requestingOrigin, details) => {
    if (permission === 'hid') {
      // Add logic here to determine if permission should be given to allow HID selection
      return true
    }
    return false
  })

  // Optionally, retrieve previously persisted devices from a persistent store
  const grantedDevices = fetchGrantedDevices()

  win.webContents.session.setDevicePermissionHandler((details) => {
    if (new URL(details.origin).hostname === 'some-host' && details.deviceType === 'hid') {
      if (details.device.vendorId === 123 && details.device.productId === 345) {
        // Always allow this type of device (this allows skipping the call to `navigator.hid.requestDevice` first)
        return true
      }

      // Search through the list of devices that have previously been granted permission
      return grantedDevices.some((grantedDevice) => {
        return (
          grantedDevice.vendorId === details.device.vendorId &&
          grantedDevice.productId === details.device.productId &&
          grantedDevice.serialNumber &&
          grantedDevice.serialNumber === details.device.serialNumber
        )
      })
    }
    return false
  })

  win.webContents.session.on('select-hid-device', (event, details, callback) => {
    event.preventDefault()
    const selectedDevice = details.deviceList.find((device) => {
      return device.vendorId === 9025 && device.productId === 67
    })
    callback(selectedDevice?.deviceId)
  })
})
```

### Event: 'hid-device-added'

Returns:

* `event` Event
* `details` Object
  * `device` [HIDDevice](./device-structures.md)
  * `frame` WebFrameMain | null - The frame initiating this event. May be `null` if accessed after the frame has either navigated or been destroyed.

Emitted after `navigator.hid.requestDevice` has been called and `select-hid-device` has fired if a new device becomes available before the callback from `select-hid-device` is called. This event is intended for use when using a UI to ask users to pick a device so that the UI can be updated with the newly added device.

### Event: 'hid-device-removed'

Returns:

* `event` Event
* `details` Object
  * `device` [HIDDevice](./device-structures.md)
  * `frame` WebFrameMain | null - The frame initiating this event. May be `null` if accessed after the frame has either navigated or been destroyed.

Emitted after `navigator.hid.requestDevice` has been called and `select-hid-device` has fired if a device has been removed before the callback from `select-hid-device` is called. This event is intended for use when using a UI to ask users to pick a device so that the UI can be updated to remove the specified device.

### Event: 'hid-device-revoked'

Returns:

* `event` Event
* `details` Object
  * `device` [HIDDevice](./device-structures.md)
  * `origin` string (optional) - The origin that the device has been revoked from.

Emitted after `HIDDevice.forget()` has been called. This event can be used to help maintain persistent storage of permissions when `setDevicePermissionHandler` is used.

### Event: 'select-serial-port'

Returns:

* `event` Event
* `portList` [SerialPort[]](./device-structures.md)
* `webContents` WebContents
* `callback` Function
  * `portId` string

Emitted when a serial port needs to be selected when a call to `navigator.serial.requestPort` is made. `callback` should be called with `portId` to be selected, passing an empty string to `callback` will cancel the request. Additionally, permissioning on `navigator.serial` can be managed by using `ses.setPermissionCheckHandler(handler)` with the `serial` permission.

```js
const { app, BrowserWindow } = require('electron')

let win = null

app.whenReady().then(() => {
  win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.webContents.session.setPermissionCheckHandler((webContents, permission, requestingOrigin, details) => {
    if (permission === 'serial') {
      // Add logic here to determine if permission should be given to allow serial selection
      return true
    }
    return false
  })

  // Optionally, retrieve previously persisted devices from a persistent store
  const grantedDevices = fetchGrantedDevices()

  win.webContents.session.setDevicePermissionHandler((details) => {
    if (new URL(details.origin).hostname === 'some-host' && details.deviceType === 'serial') {
      if (details.device.vendorId === '123' && details.device.productId === '345') {
        // Always allow this type of device (this allows skipping the call to `navigator.serial.requestPort` first)
        return true
      }

      // Search through the list of devices that have previously been granted permission
      return grantedDevices.some((grantedDevice) => {
        return (
          grantedDevice.vendorId === details.device.vendorId &&
          grantedDevice.productId === details.device.productId &&
          grantedDevice.serialNumber &&
          grantedDevice.serialNumber === details.device.serialNumber
        )
      })
    }
    return false
  })

  win.webContents.session.on('select-serial-port', (event, portList, webContents, callback) => {
    event.preventDefault()
    const selectedPort = portList.find((device) => {
      return device.vendorId === '9025' && device.productId === '67'
    })
    if (!selectedPort) {
      callback('')
    } else {
      callback(selectedPort.portId)
    }
  })
})
```

### Event: 'serial-port-added'

Returns:

* `event` Event
* `port` [SerialPort](./device-structures.md)
* `webContents` WebContents

Emitted after `navigator.serial.requestPort` has been called and `select-serial-port` has fired if a new serial port becomes available before the callback from `select-serial-port` is called. This event is intended for use when using a UI to ask users to pick a port so that the UI can be updated with the newly added port.

### Event: 'serial-port-removed'

Returns:

* `event` Event
* `port` [SerialPort](./device-structures.md)
* `webContents` WebContents

Emitted after `navigator.serial.requestPort` has been called and `select-serial-port` has fired if a serial port has been removed before the callback from `select-serial-port` is called. This event is intended for use when using a UI to ask users to pick a port so that the UI can be updated to remove the specified port.

### Event: 'serial-port-revoked'

Returns:

* `event` Event
* `details` Object
  * `port` [SerialPort](./device-structures.md)
  * `frame` WebFrameMain | null - The frame initiating this event. May be `null` if accessed after the frame has either navigated or been destroyed.
  * `origin` string - The origin that the device has been revoked from.

Emitted after `SerialPort.forget()` has been called. This event can be used to help maintain persistent storage of permissions when `setDevicePermissionHandler` is used.

```js
// Browser Process
const { app, BrowserWindow } = require('electron')

app.whenReady().then(() => {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.webContents.session.on('serial-port-revoked', (event, details) => {
    console.log(`Access revoked for serial device from origin ${details.origin}`)
  })
})
```

```js
// Renderer Process

const portConnect = async () => {
  // Request a port.
  const port = await navigator.serial.requestPort()

  // Wait for the serial port to open.
  await port.open({ baudRate: 9600 })

  // ...later, revoke access to the serial port.
  await port.forget()
}
```

### Event: 'select-usb-device'

Returns:

* `event` Event
* `details` Object
  * `deviceList` [USBDevice[]](./device-structures.md)
  * `frame` WebFrameMain | null - The frame initiating this event. May be `null` if accessed after the frame has either navigated or been destroyed.
* `callback` Function
  * `deviceId` string (optional)

Emitted when a USB device needs to be selected when a call to `navigator.usb.requestDevice` is made. `callback` should be called with `deviceId` to be selected; passing no arguments to `callback` will cancel the request. Additionally, permissioning on `navigator.usb` can be further managed by using `ses.setPermissionCheckHandler(handler)` and `ses.setDevicePermissionHandler(handler)`.

```js
const { app, BrowserWindow } = require('electron')

let win = null

app.whenReady().then(() => {
  win = new BrowserWindow()

  win.webContents.session.setPermissionCheckHandler((webContents, permission, requestingOrigin, details) => {
    if (permission === 'usb') {
      // Add logic here to determine if permission should be given to allow USB selection
      return true
    }
    return false
  })

  // Optionally, retrieve previously persisted devices from a persistent store (fetchGrantedDevices needs to be implemented by developer to fetch persisted permissions)
  const grantedDevices = fetchGrantedDevices()

  win.webContents.session.setDevicePermissionHandler((details) => {
    if (new URL(details.origin).hostname === 'some-host' && details.deviceType === 'usb') {
      if (details.device.vendorId === 123 && details.device.productId === 345) {
        // Always allow this type of device (this allows skipping the call to `navigator.usb.requestDevice` first)
        return true
      }

      // Search through the list of devices that have previously been granted permission
      return grantedDevices.some((grantedDevice) => {
        return (
          grantedDevice.vendorId === details.device.vendorId &&
          grantedDevice.productId === details.device.productId &&
          grantedDevice.serialNumber &&
          grantedDevice.serialNumber === details.device.serialNumber
        )
      })
    }
    return false
  })

  win.webContents.session.on('select-usb-device', (event, details, callback) => {
    event.preventDefault()
    const selectedDevice = details.deviceList.find((device) => {
      return device.vendorId === 9025 && device.productId === 67
    })
    if (selectedDevice) {
      // Optionally, add this to the persisted devices (updateGrantedDevices needs to be implemented by developer to persist permissions)
      grantedDevices.push(selectedDevice)
      updateGrantedDevices(grantedDevices)
    }
    callback(selectedDevice?.deviceId)
  })
})
```

### Event: 'usb-device-added'

Returns:

* `event` Event
* `device` [USBDevice](./device-structures.md)
* `webContents` WebContents

Emitted after `navigator.usb.requestDevice` has been called and `select-usb-device` has fired if a new device becomes available before the callback from `select-usb-device` is called. This event is intended for use when using a UI to ask users to pick a device so that the UI can be updated with the newly added device.

### Event: 'usb-device-removed'

Returns:

* `event` Event
* `device` [USBDevice](./device-structures.md)
* `webContents` WebContents

Emitted after `navigator.usb.requestDevice` has been called and `select-usb-device` has fired if a device has been removed before the callback from `select-usb-device` is called. This event is intended for use when using a UI to ask users to pick a device so that the UI can be updated to remove the specified device.

### Event: 'usb-device-revoked'

Returns:

* `event` Event
* `details` Object
  * `device` [USBDevice](./device-structures.md)
  * `origin` string (optional) - The origin that the device has been revoked from.

Emitted after `USBDevice.forget()` has been called. This event can be used to help maintain persistent storage of permissions when `setDevicePermissionHandler` is used.

### Event: 'select-webauthn-account'

Returns:

* `event` Event
* `details` Object
  * `relyingPartyId` string - The relying party identifier from the WebAuthn request.
  * `accounts` [WebAuthnAccount[]](./device-structures.md)
  * `frame` WebFrameMain | null - The frame initiating this event. May be `null` if accessed after the frame has either navigated or been destroyed.
* `callback` Function
  * `credentialId` string | null (optional)

Emitted when a call to `navigator.credentials.get()` resolves multiple discoverable WebAuthn credentials and the user must choose one. `callback` should be called with the `credentialId` of the selected account; passing no arguments — or a `credentialId` that does not match one of the provided accounts — will cancel the request and the page will receive a `NotAllowedError`. If no listener is registered for this event, the request is cancelled with the same error. The credential request remains pending until the listener invokes the callback, so always invoke it exactly once — typically from a `try { … } finally { callback(…) }` block.

On macOS, the Touch ID platform authenticator surfaces accounts via this event once it has been configured with `app.configureWebAuthn` (https://www.electronjs.org/docs/latest/api/app#appconfigurewebauthnoptions-macos). The event may also fire on other platforms when a roaming FIDO2 authenticator returns multiple discoverable credentials.

```js
const { app, BrowserWindow } = require('electron')

let win = null

app.whenReady().then(() => {
  app.configureWebAuthn({
    touchID: { keychainAccessGroup: 'A1B2C3D4E5.com.example.app.webauthn' }
  })

  win = new BrowserWindow()

  win.webContents.session.on('select-webauthn-account', (event, details, callback) => {
    const selected = details.accounts.find((a) => a.name === 'alice@example.com')
    callback(selected?.credentialId)
  })
})
```

## Notes

* The examples call `fetchGrantedDevices()` and `updateGrantedDevices()`, which the source states "needs to be implemented by developer" to fetch/persist permissions; they are not Electron APIs.
* Behavior changed (Electron 37.0): WebUSB and Web Serial now support the WebUSB Blocklist and Web Serial Blocklist used by Chromium; pass `disable-usb-blocklist` and `disable-serial-blocklist` command line flags to disable them ([breaking-changes-v37](../breaking-changes/breaking-changes-v37.md)).
* Adapted (not in the official docs): the official example compares `vendorId` / `productId` to number literals in the serial branch, but `SerialPort.vendorId` / `productId` are strings, so it is changed to string comparison.
* Device structures (`HIDDevice`, `SerialPort`, `USBDevice`, `WebAuthnAccount`) are in [device-structures.md](./device-structures.md).

## Related

* [session-methods-permissions](./session-methods-permissions.md)
* [device-structures](./device-structures.md)
* [session-module](./session-module.md)
