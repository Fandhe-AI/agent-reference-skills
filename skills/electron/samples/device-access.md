---
source: https://www.electronjs.org/docs/latest/tutorial/devices
---

# Device Access (Web Bluetooth, WebHID, Web Serial, WebUSB)

Select devices for the web device APIs from the main process by handling the selection events and permission handlers.

Web Bluetooth (main process):

```js
const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')

let bluetoothPinCallback
let selectBluetoothCallback

// Register IPC listeners once, outside createWindow
ipcMain.on('cancel-bluetooth-request', () => {
  if (selectBluetoothCallback) {
    const cb = selectBluetoothCallback
    selectBluetoothCallback = undefined
    cb('')
  }
})

// Listen for a message from the renderer to get the response for the Bluetooth pairing.
ipcMain.on('bluetooth-pairing-response', (event, response) => {
  if (bluetoothPinCallback) {
    const cb = bluetoothPinCallback
    bluetoothPinCallback = undefined
    cb(response)
  }
})

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.webContents.on('select-bluetooth-device', (event, deviceList, callback) => {
    event.preventDefault()
    selectBluetoothCallback = callback
    const result = deviceList.find((device) => {
      return device.deviceName === 'test'
    })
    if (result) {
      callback(result.deviceId)
      selectBluetoothCallback = undefined
    } else {
      // The device wasn't found so we need to either wait longer (eg until the
      // device is turned on) or until the user cancels the request
    }
  })

  mainWindow.webContents.session.setBluetoothPairingHandler((details, callback) => {
    bluetoothPinCallback = callback
    // Send a message to the renderer to prompt the user to confirm the pairing.
    mainWindow.webContents.send('bluetooth-pairing-request', details)
  })

  mainWindow.loadFile('index.html')
}
```

```js
// renderer.js
async function testIt () {
  const device = await navigator.bluetooth.requestDevice({
    acceptAllDevices: true
  })
  document.getElementById('device-name').innerHTML = device.name || `ID: ${device.id}`
}

document.getElementById('clickme').addEventListener('click', testIt)
```

WebHID (session events and handlers):

```js
mainWindow.webContents.session.on('select-hid-device', (event, details, callback) => {
  event.preventDefault()
  if (details.deviceList && details.deviceList.length > 0) {
    callback(details.deviceList[0].deviceId)
  } else {
    callback('') // Could not find any matching devices
  }
})

mainWindow.webContents.session.setPermissionCheckHandler((webContents, permission, requestingOrigin, details) => {
  if (permission === 'hid' && details.securityOrigin === 'file:///') {
    return true
  }
})

mainWindow.webContents.session.setDevicePermissionHandler((details) => {
  if (details.deviceType === 'hid' && details.origin === 'file://') {
    return true
  }
})
```

Web Serial:

```js
mainWindow.webContents.session.on('select-serial-port', (event, portList, webContents, callback) => {
  event.preventDefault()
  if (portList && portList.length > 0) {
    callback(portList[0].portId)
  } else {
    callback('') // Could not find any matching devices
  }
})

mainWindow.webContents.session.setPermissionCheckHandler((webContents, permission, requestingOrigin, details) => {
  if (permission === 'serial' && details.securityOrigin === 'file:///') {
    return true
  }

  return false
})

mainWindow.webContents.session.setDevicePermissionHandler((details) => {
  if (details.deviceType === 'serial' && details.origin === 'file://') {
    return true
  }

  return false
})
```

WebUSB:

```js
mainWindow.webContents.session.on('select-usb-device', (event, details, callback) => {
  event.preventDefault()
  if (details.deviceList && details.deviceList.length > 0) {
    callback(details.deviceList[0].deviceId)
  } else {
    callback('') // Could not find any matching devices
  }
})

mainWindow.webContents.session.setPermissionCheckHandler((webContents, permission, requestingOrigin, details) => {
  if (permission === 'usb' && details.securityOrigin === 'file:///') {
    return true
  }
})

mainWindow.webContents.session.setUSBProtectedClassesHandler((details) => {
  return details.protectedClasses.filter((usbClass) => {
    // Exclude classes except for audio classes
    return usbClass.indexOf('audio') === -1
  })
})
```

## Notes

- Source fiddles: `docs/fiddles/features/web-{bluetooth,hid,serial,usb}`; the HID / Serial / USB blocks are trimmed to the Electron-specific calls (the fiddles also register `*-added` / `*-removed` listeners and a `setDevicePermissionHandler` for USB).
- Changed from the official Bluetooth fiddle: `ipcMain.on` listeners are registered once outside `createWindow`, and each stored callback is checked for existence, cleared, then called at most once.
- Changed from the official HID / USB fiddles: when the device list is empty, `callback('')` ends the request so `requestDevice()` does not stay pending (same as the Serial block).
- `hid-device-added` / `hid-device-removed` on the Session only fire while a `select-hid-device` request is pending (until its callback is called); to use them, defer `callback` (e.g. show a chooser), attach the listeners for that request, and remove them right before calling `callback`.
- In a browser the user picks a device from a popup; in Electron the developer must pick the device or show their own UI from the selection event, and call `event.preventDefault()` plus the callback.
- `*-added` / `*-removed` events only fire until the selection callback is called; they are not generic device listeners.
- Granted device permission is stored for the lifetime of the `WebContents`; persist it yourself and read it back in `setDevicePermissionHandler` for longer storage.
- Chromium's blocklists apply; override with `app.commandLine.appendSwitch('disable-hid-blocklist')` / `'disable-serial-blocklist'` / `'disable-usb-blocklist'`.
- `setBluetoothPairingHandler` is for Windows and Linux.
