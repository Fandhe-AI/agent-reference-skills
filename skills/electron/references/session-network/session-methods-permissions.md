---
source: https://www.electronjs.org/docs/latest/api/session#sessetpermissionrequesthandlerhandler
---

# Session methods: permission, display media, device, USB, Bluetooth handlers

Instance methods of `Session` that install handlers for permission requests and checks, display media requests, device permissions, protected USB classes and Bluetooth pairing.

## Signature / Usage

Process: Main

```js
const { session } = require('electron')

const allowedPermissions = ['notifications']

session.fromPartition('some-partition').setPermissionRequestHandler((webContents, permission, callback, details) => {
  const origin = new URL(details.requestingUrl).origin
  if (origin === 'https://example.com' && allowedPermissions.includes(permission)) {
    return callback(true) // granted.
  }

  callback(false) // denied.
})
```

### `ses.setPermissionRequestHandler(handler)`

* `handler` Function | null
  * `webContents` WebContents - WebContents requesting the permission. Please note that if the request comes from a subframe you should use `requestingUrl` to check the request origin.
  * `permission` string - The type of requested permission. Electron forwards every permission type that Chromium requests, so this list mirrors Chromium's permission types and includes some that have no effect on desktop or are only used by specific platforms or features.
    * `ar` - Request access to augmented reality sessions via the [WebXR Device API](https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API).
    * `automatic-fullscreen` - Request to enter fullscreen without a prior user gesture (Chromium's automatic fullscreen content setting).
    * `background-fetch` - Request to download resources in the background via the [Background Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Background_Fetch_API).
    * `background-sync` - Request to defer work until the user has connectivity via the [Background Synchronization API](https://developer.mozilla.org/en-US/docs/Web/API/Background_Synchronization_API).
    * `captured-surface-control` - Request to forward wheel events to, and control the zoom level of, a captured tab via the [Captured Surface Control API](https://developer.mozilla.org/en-US/docs/Web/API/Captured_Surface_Control_API).
    * `clipboard-read` - Request access to read from the clipboard.
    * `clipboard-sanitized-write` - Request access to write to the clipboard.
    * `deprecated-sync-clipboard-read` _Deprecated_ - Request access to run `document.execCommand("paste")`.
    * `display-capture` - Request access to capture the screen via the [Screen Capture API](https://developer.mozilla.org/en-US/docs/Web/API/Screen_Capture_API).
    * `fileSystem` - Request access to read, write, and file management capabilities using the [File System API](https://developer.mozilla.org/en-US/docs/Web/API/File_System_API). As in Chrome, a cross-origin iframe cannot ask for more access than it already has, and grants for an origin are reset shortly after its last top-level document is closed or navigated away.
    * `fullscreen` - Request control of the app's fullscreen state via the [Fullscreen API](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API).
    * `geolocation` - Request access to the user's location via the [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)
    * `geolocation-approximate` - Request access to a coarse approximation of the user's location via the [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API).
    * `hand-tracking` - Request access to hand tracking data in WebXR sessions via the [WebXR Hand Input API](https://developer.mozilla.org/en-US/docs/Web/API/XRHand).
    * `hid` - Request access to HID devices via the [WebHID API](https://developer.mozilla.org/en-US/docs/Web/API/WebHID_API).
    * `idle-detection` - Request access to the user's idle state via the [IdleDetector API](https://developer.mozilla.org/en-US/docs/Web/API/IdleDetector).
    * `keyboardLock` - Request capture of keypresses for any or all of the keys on the physical keyboard via the [Keyboard Lock API](https://developer.mozilla.org/en-US/docs/Web/API/Keyboard/lock).
    * `local-fonts` - Request access to the user's locally installed fonts via the [Local Font Access API](https://developer.mozilla.org/en-US/docs/Web/API/Local_Font_Access_API).
    * `local-network` - Request access to devices on the user's local network via [Local Network Access](https://github.com/explainers-by-googlers/local-network-access).
    * `local-network-access` - Request access to devices on the user's local network via [Local Network Access](https://github.com/explainers-by-googlers/local-network-access). This is the original permission type; newer Chromium versions split it into `local-network` and `loopback-network`.
    * `loopback-network` - Request access to loopback (localhost) addresses via [Local Network Access](https://github.com/explainers-by-googlers/local-network-access).
    * `media` - Request access to media devices such as camera, microphone and speakers.
    * `mediaKeySystem` - Request access to DRM protected content.
    * `midi` - Request MIDI access in the [Web MIDI API](https://developer.mozilla.org/en-US/docs/Web/API/Web_MIDI_API).
    * `midiSysex` - Request the use of system exclusive messages in the [Web MIDI API](https://developer.mozilla.org/en-US/docs/Web/API/Web_MIDI_API).
    * `nfc` - Request access to NFC tags via the [Web NFC API](https://developer.mozilla.org/en-US/docs/Web/API/Web_NFC_API).
    * `notifications` - Request notification creation and the ability to display them in the user's system tray using the [Notifications API](https://developer.mozilla.org/en-US/docs/Web/API/notification)
    * `openExternal` - Request to open links in external applications.
    * `payment-handler` - Request to handle payment requests via the [Payment Handler API](https://developer.mozilla.org/en-US/docs/Web/API/Payment_Handler_API).
    * `periodic-background-sync` - Request to run periodic tasks in the background via the [Web Periodic Background Synchronization API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Periodic_Background_Synchronization_API).
    * `persistent-storage` - Request that the origin's storage is not cleared under storage pressure via [`StorageManager.persist()`](https://developer.mozilla.org/en-US/docs/Web/API/StorageManager/persist).
    * `pointerLock` - Request to directly interpret mouse movements as an input method via the [Pointer Lock API](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_Lock_API).
    * `screen-wake-lock` - Request to keep the screen awake via the [Screen Wake Lock API](https://developer.mozilla.org/en-US/docs/Web/API/Screen_Wake_Lock_API).
    * `sensors` - Request access to device sensors such as the accelerometer and gyroscope via the [Sensor APIs](https://developer.mozilla.org/en-US/docs/Web/API/Sensor_APIs).
    * `serial` - Request access to serial devices via the [Web Serial API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Serial_API).
    * `smart-card` - Request access to smart card readers via the [Web Smart Card API](https://github.com/WICG/web-smart-card).
    * `speaker-selection` - Request to enumerate and select audio output devices via the [speaker-selection permissions policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy/speaker-selection).
    * `storage-access` - Allows content loaded in a third-party context to request access to third-party cookies using the [Storage Access API](https://developer.mozilla.org/en-US/docs/Web/API/Storage_Access_API).
    * `system-wake-lock` - Request to keep the system awake without keeping the screen on (a system wake lock).
    * `top-level-storage-access` - Allow top-level sites to request third-party cookie access on behalf of embedded content originating from another site in the same related website set using the [Storage Access API](https://developer.mozilla.org/en-US/docs/Web/API/Storage_Access_API).
    * `usb` - Request access to USB devices via the [WebUSB API](https://developer.mozilla.org/en-US/docs/Web/API/WebUSB_API).
    * `vr` - Request access to virtual reality sessions via the [WebXR Device API](https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API).
    * `web-app-installation` - Request to install a web app via the [Web Install API](https://github.com/WICG/web-install).
    * `web-printing` - Request access to printers via the [Web Printing API](https://github.com/WICG/web-printing).
    * `window-management` - Request access to enumerate screens using the [`getScreenDetails`](https://developer.chrome.com/en/articles/multi-screen-window-placement/) API.
    * `unknown` - An unrecognized permission request.
  * `callback` Function
    * `permissionGranted` boolean - Allow or deny the permission.
  * `details` [PermissionRequest](./permission-request-structures.md) | [FilesystemPermissionRequest](./permission-request-structures.md) | [MediaAccessPermissionRequest](./permission-request-structures.md) | [OpenExternalPermissionRequest](./permission-request-structures.md) - Additional information about the permission being requested.

Sets the handler which can be used to respond to permission requests for the `session`. Calling `callback(true)` will allow the permission and `callback(false)` will reject it. To clear the handler, call `setPermissionRequestHandler(null)`. Please note that you must also implement `setPermissionCheckHandler` to get complete permission handling. Most web APIs do a permission check and then make a permission request if the check is denied.

### `ses.setPermissionCheckHandler(handler)`

* `handler` Function\<boolean> | null
  * `webContents` (WebContents | null) - WebContents that contains the frame checking the permission. This is `null` when the check is not made on behalf of a document, for example for a service worker or for a `notifications` check. If the check comes from a subframe, `webContents` is the top-level WebContents; use `requestingOrigin`, `requestingUrl` and `isMainFrame` to identify the frame that is asking.
  * `permission` string - Type of permission check. Electron forwards every permission type that Chromium checks, so this list mirrors Chromium's permission types and includes some that have no effect on desktop or are only used by specific platforms or features.
    * `ar` - Access to augmented reality sessions via the [WebXR Device API](https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API).
    * `automatic-fullscreen` - Enter fullscreen without a prior user gesture (Chromium's automatic fullscreen content setting).
    * `background-fetch` - Download resources in the background via the [Background Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Background_Fetch_API).
    * `background-sync` - Defer work until the user has connectivity via the [Background Synchronization API](https://developer.mozilla.org/en-US/docs/Web/API/Background_Synchronization_API).
    * `captured-surface-control` - Forward wheel events to, and control the zoom level of, a captured tab via the [Captured Surface Control API](https://developer.mozilla.org/en-US/docs/Web/API/Captured_Surface_Control_API).
    * `clipboard-read` - Request access to read from the clipboard.
    * `clipboard-sanitized-write` - Request access to write to the clipboard.
    * `deprecated-sync-clipboard-read` _Deprecated_ - Request access to run `document.execCommand("paste")`
    * `display-capture` - Capture the screen via the [Screen Capture API](https://developer.mozilla.org/en-US/docs/Web/API/Screen_Capture_API).
    * `fileSystem` - Access to read, write, and file management capabilities using the [File System API](https://developer.mozilla.org/en-US/docs/Web/API/File_System_API).
    * `fullscreen` - Control of the app's fullscreen state via the [Fullscreen API](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API).
    * `geolocation` - Access the user's geolocation data via the [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)
    * `geolocation-approximate` - Access a coarse approximation of the user's location via the [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API).
    * `hand-tracking` - Access hand tracking data in WebXR sessions via the [WebXR Hand Input API](https://developer.mozilla.org/en-US/docs/Web/API/XRHand).
    * `hid` - Access the HID protocol to manipulate HID devices via the [WebHID API](https://developer.mozilla.org/en-US/docs/Web/API/WebHID_API).
    * `idle-detection` - Access the user's idle state via the [IdleDetector API](https://developer.mozilla.org/en-US/docs/Web/API/IdleDetector).
    * `keyboardLock` - Capture keypresses for any or all of the keys on the physical keyboard via the [Keyboard Lock API](https://developer.mozilla.org/en-US/docs/Web/API/Keyboard/lock).
    * `local-fonts` - Access the user's locally installed fonts via the [Local Font Access API](https://developer.mozilla.org/en-US/docs/Web/API/Local_Font_Access_API).
    * `local-network` - Access devices on the user's local network via [Local Network Access](https://github.com/explainers-by-googlers/local-network-access).
    * `local-network-access` - Access devices on the user's local network via [Local Network Access](https://github.com/explainers-by-googlers/local-network-access). This is the original permission type; newer Chromium versions split it into `local-network` and `loopback-network`.
    * `loopback-network` - Access loopback (localhost) addresses via [Local Network Access](https://github.com/explainers-by-googlers/local-network-access).
    * `media` - Access to media devices such as camera, microphone and speakers.
    * `mediaKeySystem` - Access to DRM protected content.
    * `midi` - Enable MIDI access in the [Web MIDI API](https://developer.mozilla.org/en-US/docs/Web/API/Web_MIDI_API).
    * `midiSysex` - Use system exclusive messages in the [Web MIDI API](https://developer.mozilla.org/en-US/docs/Web/API/Web_MIDI_API).
    * `nfc` - Access NFC tags via the [Web NFC API](https://developer.mozilla.org/en-US/docs/Web/API/Web_NFC_API).
    * `notifications` - Configure and display desktop notifications to the user with the [Notifications API](https://developer.mozilla.org/en-US/docs/Web/API/notification).
    * `openExternal` - Open links in external applications.
    * `payment-handler` - Handle payment requests via the [Payment Handler API](https://developer.mozilla.org/en-US/docs/Web/API/Payment_Handler_API).
    * `periodic-background-sync` - Run periodic tasks in the background via the [Web Periodic Background Synchronization API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Periodic_Background_Synchronization_API).
    * `persistent-storage` - Keep the origin's storage from being cleared under storage pressure via [`StorageManager.persist()`](https://developer.mozilla.org/en-US/docs/Web/API/StorageManager/persist).
    * `pointerLock` - Directly interpret mouse movements as an input method via the [Pointer Lock API](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_Lock_API).
    * `screen-wake-lock` - Keep the screen awake via the [Screen Wake Lock API](https://developer.mozilla.org/en-US/docs/Web/API/Screen_Wake_Lock_API).
    * `sensors` - Access device sensors such as the accelerometer and gyroscope via the [Sensor APIs](https://developer.mozilla.org/en-US/docs/Web/API/Sensor_APIs).
    * `serial` - Read from and write to serial devices with the [Web Serial API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Serial_API).
    * `smart-card` - Access smart card readers via the [Web Smart Card API](https://github.com/WICG/web-smart-card).
    * `speaker-selection` - Enumerate and select audio output devices via the [speaker-selection permissions policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy/speaker-selection).
    * `storage-access` - Allows content loaded in a third-party context to request access to third-party cookies using the [Storage Access API](https://developer.mozilla.org/en-US/docs/Web/API/Storage_Access_API).
    * `system-wake-lock` - Keep the system awake without keeping the screen on (a system wake lock).
    * `top-level-storage-access` - Allow top-level sites to request third-party cookie access on behalf of embedded content originating from another site in the same related website set using the [Storage Access API](https://developer.mozilla.org/en-US/docs/Web/API/Storage_Access_API).
    * `usb` - Expose non-standard Universal Serial Bus (USB) compatible devices services to the web with the [WebUSB API](https://developer.mozilla.org/en-US/docs/Web/API/WebUSB_API).
    * `vr` - Access virtual reality sessions via the [WebXR Device API](https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API).
    * `web-app-installation` - Install a web app via the [Web Install API](https://github.com/WICG/web-install).
    * `web-printing` - Access printers via the [Web Printing API](https://github.com/WICG/web-printing).
    * `window-management` - Enumerate screens using the [`getScreenDetails`](https://developer.chrome.com/en/articles/multi-screen-window-placement/) API.
    * `unknown` - An unrecognized permission check.
  * `requestingOrigin` string - The origin URL of the permission check
  * `details` Object - Some properties are only available on certain permission types.
    * `embeddingOrigin` string (optional) - The origin of the frame embedding the frame that made the permission check. Only set for cross-origin sub frames making permission checks.
    * `securityOrigin` string (optional) - The origin of the requesting frame, for `media`, `hid`, `usb` and `serial` checks.
    * `mediaType` string (optional) - The type of media access being requested, can be `video`, `audio` or `unknown`.
    * `requestingUrl` string (optional) - The last URL the requesting frame loaded. Not provided when the check is not made on behalf of a document (for example for a service worker).
    * `isMainFrame` boolean - Whether the frame making the request is the main frame.
    * `filePath` string (optional) - The path of a `fileSystem` request.
    * `isDirectory` boolean (optional) - Whether a `fileSystem` request is a directory.
    * `fileAccessType` string (optional) - The access type of a `fileSystem` request. Can be `writable` or `readable`.

Sets the handler which can be used to respond to permission checks for the `session`. Returning `true` will allow the permission and `false` will reject it. Please note that you must also implement `setPermissionRequestHandler` to get complete permission handling. Most web APIs do a permission check and then make a permission request if the check is denied. To clear the handler, call `setPermissionCheckHandler(null)`.

```js
const { session } = require('electron')

const url = require('node:url')

session.fromPartition('some-partition').setPermissionCheckHandler((webContents, permission, requestingOrigin) => {
  if (new URL(requestingOrigin).hostname === 'some-host' && permission === 'notifications') {
    return true // granted
  }

  return false // denied
})
```

> NOTE: `isMainFrame` will always be `false` for a `fileSystem` request as a result of Chromium limitations.

### `ses.setDisplayMediaRequestHandler(handler[, opts])`

* `handler` Function | null
  * `request` Object
    * `frame` WebFrameMain | null - Frame that is requesting access to media. May be `null` if accessed after the frame has either navigated or been destroyed.
    * `securityOrigin` String - Origin of the page making the request.
    * `videoRequested` Boolean - true if the web content requested a video stream.
    * `audioRequested` Boolean - true if the web content requested an audio stream.
    * `userGesture` Boolean - Whether a user gesture was active when this request was triggered.
  * `callback` Function
    * `streams` Object | null - Pass `null` to deny the request, which rejects the `getDisplayMedia()` promise with an `AbortError`.
      * `video` Object | WebFrameMain (optional)
        * `id` String - The id of the stream being granted. This will usually come from a DesktopCapturerSource object.
        * `name` String - The name of the stream being granted. This will usually come from a DesktopCapturerSource object.
      * `audio` String | WebFrameMain (optional) - If a string is specified, can be `loopback` or `loopbackWithMute`. Specifying a loopback device will capture system audio, and is currently only supported on Windows. If a WebFrameMain is specified, will capture audio from the `webContents` that contains that frame.
      * `enableLocalEcho` Boolean (optional) - If `audio` is a WebFrameMain and this is set to `true`, then local playback of audio will not be muted (e.g. using `MediaRecorder` to record `WebFrameMain` with this flag set to `true` will allow audio to pass through to the speakers while recording). Default is `false`.
* `opts` Object (optional) _macOS_ _Experimental_
  * `useSystemPicker` Boolean - true if the available native system picker should be used. Default is `false`. _macOS_ _Experimental_

This handler will be called when web content requests access to display media via the `navigator.mediaDevices.getDisplayMedia` API. Use the desktopCapturer API to choose which stream(s) to grant access to.

`useSystemPicker` allows an application to use the system picker instead of providing a specific video source from `getSources`. This option is experimental, and currently available for MacOS 15+ only. If the system picker is available and `useSystemPicker` is set to `true`, the handler will not be invoked.

```js
const { session, desktopCapturer } = require('electron')

session.defaultSession.setDisplayMediaRequestHandler(
  (request, callback) => {
    desktopCapturer.getSources({ types: ['screen'] }).then(
      (sources) => {
        // Grant access to the first screen found.
        callback({ video: sources[0] })
      },
      () => {
        // Deny the request if no sources could be retrieved, for example
        // when the user cancels the PipeWire picker on Linux.
        callback(null)
      }
    )
    // Use the system picker if available.
    // Note: this is currently experimental. If the system picker
    // is available, it will be used and the media request handler
    // will not be invoked.
  },
  { useSystemPicker: true }
)
```

Passing a WebFrameMain object as a video or audio stream captures the whole `webContents` that contains that frame (the tab), not just the frame: `request.frame` from an `<iframe>` therefore grants that iframe a capture of the page that embeds it. Check `request.frame` before using it this way, and note that the callback throws if the frame has been destroyed by the time it is called.

```js
const { session } = require('electron')

session.defaultSession.setDisplayMediaRequestHandler((request, callback) => {
  // Allow a top-level page to capture its own tab.
  if (request.frame && request.frame === request.frame.top) {
    callback({ video: request.frame })
  } else {
    callback(null)
  }
})
```

Passing `null` instead of a function resets the handler to its default state.

### `ses.setDevicePermissionHandler(handler)`

* `handler` Function\<boolean> | null
  * `details` Object
    * `deviceType` string - The type of device that permission is being requested on, can be `hid`, `serial`, or `usb`.
    * `origin` string - The origin URL of the device permission check.
    * `device` [HIDDevice](./device-structures.md) | [SerialPort](./device-structures.md) | [USBDevice](./device-structures.md) - the device that permission is being requested for.

Sets the handler which can be used to respond to device permission checks for the `session`. Returning `true` will allow the device to be permitted and `false` will reject it. To clear the handler, call `setDevicePermissionHandler(null)`. This handler can be used to provide default permissioning to devices without first calling for permission to devices (eg via `navigator.hid.requestDevice`). If this handler is not defined, the default device permissions as granted through device selection (eg via `navigator.hid.requestDevice`) will be used. Additionally, the default behavior of Electron is to store granted device permission in memory. If longer term storage is needed, a developer can store granted device permissions (eg when handling the `select-hid-device` event) and then read from that storage with `setDevicePermissionHandler`.

```js
const { app, BrowserWindow } = require('electron')

let win = null

app.whenReady().then(() => {
  win = new BrowserWindow()

  win.webContents.session.setPermissionCheckHandler((webContents, permission, requestingOrigin, details) => {
    if (permission === 'hid') {
      // Add logic here to determine if permission should be given to allow HID selection
      return true
    } else if (permission === 'serial') {
      // Add logic here to determine if permission should be given to allow serial port selection
    } else if (permission === 'usb') {
      // Add logic here to determine if permission should be given to allow USB device selection
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
    } else if (details.deviceType === 'serial') {
      if (details.device.vendorId === 123 && details.device.productId === 345) {
        // Always allow this type of device (this allows skipping the call to `navigator.hid.requestDevice` first)
        return true
      }
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

### `ses.setUSBProtectedClassesHandler(handler)`

* `handler` Function\<string[]> | null
  * `details` Object
    * `protectedClasses` string[] - The current list of protected USB classes. Possible class values include:
      * `audio`
      * `audio-video`
      * `hid`
      * `mass-storage`
      * `smart-card`
      * `video`
      * `wireless`

Sets the handler which can be used to override which [USB classes are protected](https://wicg.github.io/webusb/#usbinterface-interface). The return value for the handler is a string array of USB classes which should be considered protected (eg not available in the renderer). Valid values for the array are:

* `audio`
* `audio-video`
* `hid`
* `mass-storage`
* `smart-card`
* `video`
* `wireless`

Returning an empty string array from the handler will allow all USB classes; returning the passed in array will maintain the default list of protected USB classes (this is also the default behavior if a handler is not defined). To clear the handler, call `setUSBProtectedClassesHandler(null)`.

```js
const { app, BrowserWindow } = require('electron')

let win = null

app.whenReady().then(() => {
  win = new BrowserWindow()

  win.webContents.session.setUSBProtectedClassesHandler((details) => {
    // Allow all classes:
    // return []
    // Keep the current set of protected classes:
    // return details.protectedClasses
    // Selectively remove classes:
    return details.protectedClasses.filter((usbClass) => {
      // Exclude classes except for audio classes
      return usbClass.indexOf('audio') === -1
    })
  })
})
```

### `ses.setBluetoothPairingHandler(handler)` _Windows_ _Linux_

* `handler` Function | null
  * `details` Object
    * `deviceId` string
    * `pairingKind` string - The type of pairing prompt being requested. One of the following values:
      * `confirm` This prompt is requesting confirmation that the Bluetooth device should be paired.
      * `confirmPin` This prompt is requesting confirmation that the provided PIN matches the pin displayed on the device.
      * `providePin` This prompt is requesting that a pin be provided for the device.
    * `frame` WebFrameMain | null - The frame initiating this handler. May be `null` if accessed after the frame has either navigated or been destroyed.
    * `pin` string (optional) - The pin value to verify if `pairingKind` is `confirmPin`.
  * `callback` Function
    * `response` Object
      * `confirmed` boolean - `false` should be passed in if the dialog is canceled. If the `pairingKind` is `confirm` or `confirmPin`, this value should indicate if the pairing is confirmed. If the `pairingKind` is `providePin` the value should be `true` when a value is provided.
      * `pin` string | null (optional) - When the `pairingKind` is `providePin` this value should be the required pin for the Bluetooth device.

Sets a handler to respond to Bluetooth pairing requests. This handler allows developers to handle devices that require additional validation before pairing. When a handler is not defined, any pairing on Linux or Windows that requires additional validation will be automatically cancelled. macOS does not require a handler because macOS handles the pairing automatically. To clear the handler, call `setBluetoothPairingHandler(null)`.

```js
const { app, BrowserWindow, session } = require('electron')

const path = require('node:path')

function createWindow() {
  let bluetoothPinCallback = null

  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.webContents.session.setBluetoothPairingHandler((details, callback) => {
    bluetoothPinCallback = callback
    // Send an IPC message to the renderer to prompt the user to confirm the pairing.
    // Note that this will require logic in the renderer to handle this message and
    // display a prompt to the user.
    mainWindow.webContents.send('bluetooth-pairing-request', details)
  })

  // Listen for an IPC message from the renderer to get the response for the Bluetooth pairing.
  mainWindow.webContents.ipc.on('bluetooth-pairing-response', (event, response) => {
    bluetoothPinCallback(response)
  })
}

app.whenReady().then(() => {
  createWindow()
})
```

## Notes

* Adapted (not in the official docs): the official example grants every permission except notifications from one host and checks webContents.getURL(), which does not identify subframe requesters; this page checks details.requestingUrl and grants only allowlisted origin/permission pairs, denying everything else.
* Implement both `setPermissionRequestHandler` and `setPermissionCheckHandler` for complete permission handling; most web APIs do a check and then a request if the check is denied.
* Migration: `setDevicePermissionHandler` — the handler is no longer passed a `WebFrameMain` frame but the `origin` checking for device permission ([breaking-changes-v22-v15](../breaking-changes/breaking-changes-v22-v15.md)). `setPermissionCheckHandler` — the first parameter `webContents` can now sometimes be `null`; use `requestingOrigin`, `embeddingOrigin` and `securityOrigin` instead ([breaking-changes-v14-v2](../breaking-changes/breaking-changes-v14-v2.md)). Cross-origin iframes must specify features via the `allow` attribute (Permission Policy, Electron 30.0; [breaking-changes-v30-v29](../breaking-changes/breaking-changes-v30-v29.md)).
* `fetchGrantedDevices()` in the device example is a developer-implemented placeholder, not an Electron API.
* `setDisplayMediaRequestHandler` `opts.useSystemPicker` is _macOS_ _Experimental_ (macOS 15+ only).
* `setBluetoothPairingHandler` is _Windows_ _Linux_ only; macOS handles pairing automatically.
* `deprecated-sync-clipboard-read` is marked _Deprecated_ in the source.
* The `clipboard-*` permission strings here are Chromium web permissions; the main-process `clipboard` module is documented in the system category.

## Related

* [session-events-devices](./session-events-devices.md)
* [permission-request-structures](./permission-request-structures.md)
* [device-structures](./device-structures.md)
* [session-module](./session-module.md)
