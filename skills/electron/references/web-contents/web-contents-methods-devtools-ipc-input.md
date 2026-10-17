---
source: https://www.electronjs.org/docs/latest/api/web-contents#contentsaddworkspacepath
---

# WebContents methods: devtools, send, postMessage, device emulation, sendInputEvent

Instance methods of `WebContents` (Process: Main) for DevTools control, sending IPC messages to the renderer, MessagePort transfer, device emulation and synthetic input.

## Signature / Usage

```js
const { app, BrowserWindow } = require('electron')

let win = null
let devtools = null

app.whenReady().then(() => {
  win = new BrowserWindow()
  devtools = new BrowserWindow()
  win.loadURL('https://github.com')
  win.webContents.setDevToolsWebContents(devtools.webContents)
  win.webContents.openDevTools({ mode: 'detach' })
})
```

### Instance Methods

#### `contents.addWorkSpace(path)`

* `path` string

Adds the specified path to DevTools workspace. Must be used after DevTools creation:

```js
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
win.webContents.on('devtools-opened', () => {
  win.webContents.addWorkSpace(__dirname)
})
```

#### `contents.removeWorkSpace(path)`

* `path` string

Removes the specified path from DevTools workspace.

#### `contents.setDevToolsWebContents(devToolsWebContents)`

* `devToolsWebContents` WebContents

Uses the `devToolsWebContents` as the target `WebContents` to show DevTools.

The `devToolsWebContents` must not have done any navigation, and it should not be used for other purposes after the call.

By default, Electron manages the DevTools by creating an internal `WebContents` with native view, which developers have very limited control of. With the `setDevToolsWebContents` method, developers can use any `WebContents` to show the DevTools in it, such as `BrowserWindow` or `WebContentsView`.

Note that closing the DevTools does not destroy the `devToolsWebContents`, it is the caller's responsibility to destroy `devToolsWebContents` manually.

#### `contents.openDevTools([options])`

* `options` Object (optional)
  * `mode` string - Opens the DevTools with specified dock state, can be `left`, `right`, `bottom`, `undocked`, `detach`. Defaults to last used dock state. In `undocked` mode it's possible to dock back. In `detach` mode it's not.
  * `activate` boolean (optional) - Whether to bring the opened DevTools window to the foreground. The default is `true`.
  * `title` string (optional) - A title for the DevTools window (only in `undocked` or `detach` mode).

Opens the DevTools.

When `contents` is a `<webview>` tag, the `mode` would be `detach` by default, explicitly passing an empty `mode` can force using last used dock state.

On Windows, if Window Control Overlay is enabled, DevTools will be opened with `mode: 'detach'`.

#### `contents.closeDevTools()`

Closes the DevTools view.

#### `contents.isDevToolsOpened()`

Returns `boolean` - Whether the DevTools view is opened.

#### `contents.isDevToolsFocused()`

Returns `boolean` - Whether the DevTools view is focused .

#### `contents.getDevToolsTitle()`

Returns `string` - the current title of the DevTools window. This will only be visible if DevTools is opened in `undocked` or `detach` mode.

#### `contents.setDevToolsTitle(title)`

* `title` string

Changes the title of the DevTools window to `title`. This will only be visible if DevTools is opened in `undocked` or `detach` mode.

#### `contents.toggleDevTools()`

Toggles the developer tools.

#### `contents.inspectElement(x, y)`

* `x` Integer
* `y` Integer

Starts inspecting element at position (`x`, `y`).

#### `contents.inspectSharedWorker()`

Opens the developer tools for the shared worker context.

#### `contents.inspectSharedWorkerById(workerId)`

* `workerId` string

Inspects the shared worker based on its ID.

#### `contents.getAllSharedWorkers()`

Returns `SharedWorkerInfo[]` - Information about all Shared Workers.

#### `contents.inspectServiceWorker()`

Opens the developer tools for the service worker context.

#### `contents.send(channel, ...args)`

* `channel` string
* `...args` any[]

Send an asynchronous message to the renderer process via `channel`, along with arguments. Arguments will be serialized with the Structured Clone Algorithm, just like `postMessage`, so prototype chains will not be included. Sending Functions, Promises, Symbols, WeakMaps, or WeakSets will throw an exception.

Warning: Sending non-standard JavaScript types such as DOM objects or special Electron objects will throw an exception.

For additional reading, refer to Electron's IPC guide.

#### `contents.sendToFrame(frameId, channel, ...args)`

* `frameId` Integer | \[number, number] - the ID of the frame to send to, or a pair of `[processId, frameId]` if the frame is in a different process to the main frame.
* `channel` string
* `...args` any[]

Send an asynchronous message to a specific frame in a renderer process via `channel`, along with arguments. Arguments will be serialized with the Structured Clone Algorithm, just like `postMessage`, so prototype chains will not be included. Sending Functions, Promises, Symbols, WeakMaps, or WeakSets will throw an exception.

NOTE: Sending non-standard JavaScript types such as DOM objects or special Electron objects will throw an exception.

The renderer process can handle the message by listening to `channel` with the `ipcRenderer` module.

If you want to get the `frameId` of a given renderer context you should use the `webFrame.routingId` value. E.g.

```js
// In a renderer process
console.log('My frameId is:', require('electron').webFrame.routingId)
```

You can also read `frameId` from all incoming IPC messages in the main process.

```js
// In the main process
ipcMain.on('ping', (event) => {
  console.info('Message came from frameId:', event.frameId)
})
```

#### `contents.postMessage(channel, message, [transfer])`

* `channel` string
* `message` any
* `transfer` MessagePortMain[] (optional)

Send a message to the renderer process, optionally transferring ownership of zero or more `MessagePortMain` objects.

The transferred `MessagePortMain` objects will be available in the renderer process by accessing the `ports` property of the emitted event. When they arrive in the renderer, they will be native DOM `MessagePort` objects.

```js
// Main process
const win = new BrowserWindow()
const { port1, port2 } = new MessageChannelMain()
win.webContents.postMessage('port', { message: 'hello' }, [port1])

// Renderer process
ipcRenderer.on('port', (e, msg) => {
  const [port] = e.ports
  // ...
})
```

#### `contents.enableDeviceEmulation(parameters)`

* `parameters` Object
  * `screenPosition` string - Specify the screen type to emulate (default: `desktop`):
    * `desktop` - Desktop screen type.
    * `mobile` - Mobile screen type.
  * `screenSize` Size - Set the emulated screen size (screenPosition == mobile).
  * `viewPosition` Point - Position the view on the screen (screenPosition == mobile) (default: `{ x: 0, y: 0 }`).
  * `deviceScaleFactor` Integer - Set the device scale factor (if zero defaults to original device scale factor) (default: `0`).
  * `viewSize` Size - Set the emulated view size (empty means no override)
  * `scale` Float - Scale of emulated view inside available space (not in fit to view mode) (default: `1`).

Enable device emulation with the given parameters.

#### `contents.disableDeviceEmulation()`

Disable device emulation enabled by `webContents.enableDeviceEmulation`.

#### `contents.sendInputEvent(inputEvent)`

* `inputEvent` MouseInputEvent | MouseWheelInputEvent | KeyboardInputEvent

Sends an input `event` to the page.

Note: The `BrowserWindow` containing the contents needs to be focused for `sendInputEvent()` to work.

## Notes

* `contents.send` / `sendToFrame` serialize with the Structured Clone Algorithm; sending functions, promises, symbols, WeakMaps, WeakSets, DOM objects or special Electron objects throws.
* The DevTools-related methods here operate on Chromium DevTools windows; the Chrome DevTools Protocol client is the separate `debugger` class.

## Related

* [Debugger](./debugger.md)
* [Input event structures](./input-event-structures.md)
* [Events: input, devtools, ipc](./web-contents-events-input-devtools-ipc.md)
* [Structures: SharedWorkerInfo](./web-contents-structures.md)
