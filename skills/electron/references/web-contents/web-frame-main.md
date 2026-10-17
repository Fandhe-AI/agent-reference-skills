---
source: https://www.electronjs.org/docs/latest/api/web-frame-main
---

# webFrameMain

> Control web pages and iframes.

Process: Main

The `webFrameMain` module can be used to lookup frames across existing `WebContents` instances. Navigation events are the common use case.

## Signature / Usage

```js
const { BrowserWindow, webFrameMain } = require('electron')

const win = new BrowserWindow({ width: 800, height: 1500 })
win.loadURL('https://twitter.com')

win.webContents.on(
  'did-frame-navigate',
  (event, url, httpResponseCode, httpStatusText, isMainFrame, frameProcessId, frameRoutingId) => {
    const frame = webFrameMain.fromId(frameProcessId, frameRoutingId)
    if (frame) {
      const code = 'document.body.innerHTML = document.body.innerHTML.replaceAll("heck", "h*ck")'
      frame.executeJavaScript(code)
    }
  }
)
```

You can also access frames of existing pages by using the `mainFrame` property of `WebContents`.

```js
const { BrowserWindow } = require('electron')

async function main() {
  const win = new BrowserWindow({ width: 800, height: 600 })
  await win.loadURL('https://reddit.com')

  const youtubeEmbeds = win.webContents.mainFrame.frames.filter((frame) => {
    try {
      const url = new URL(frame.url)
      return url.host === 'www.youtube.com'
    } catch {
      return false
    }
  })

  console.log(youtubeEmbeds)
}

main()
```

## Methods

### `webFrameMain.fromId(processId, routingId)`

* `processId` Integer - An `Integer` representing the internal ID of the process which owns the frame.
* `routingId` Integer - An `Integer` representing the unique frame ID in the current renderer process. Routing IDs can be retrieved from `WebFrameMain` instances (`frame.routingId`) and are also passed by frame specific `WebContents` navigation events (e.g. `did-frame-navigate`).

Returns `WebFrameMain | undefined` - A frame with the given process and routing IDs, or `undefined` if there is no WebFrameMain associated with the given IDs.

### `webFrameMain.fromFrameToken(processId, frameToken)`

* `processId` Integer - An `Integer` representing the internal ID of the process which owns the frame.
* `frameToken` string - A `string` token identifying the unique frame. Can also be retrieved in the renderer process via `webFrame.frameToken`.

Returns `WebFrameMain | null` - A frame with the given process and frame token, or `null` if there is no WebFrameMain associated with the given IDs.

## Class: WebFrameMain

Process: Main. This class is not exported from the `'electron'` module. It is only available as a return value of other methods in the Electron API.

### Instance Events

#### Event: 'dom-ready'

Emitted when the document is loaded.

### Instance Methods

#### `frame.executeJavaScript(code[, userGesture])`

* `code` string
* `userGesture` boolean (optional) - Default is `false`.

Returns `Promise<unknown>` - A promise that resolves with the result of the executed code or is rejected if execution throws or results in a rejected promise.

Evaluates `code` in page. In the browser window some HTML APIs like `requestFullScreen` can only be invoked by a gesture from the user. Setting `userGesture` to `true` will remove this limitation.

#### `frame.reload()`

Returns `boolean` - Whether the reload was initiated successfully. Only results in `false` when the frame has no history.

#### `frame.isDestroyed()`

Returns `boolean` - Whether the frame is destroyed.

#### `frame.send(channel, ...args)`

* `channel` string
* `...args` any[]

Send an asynchronous message to the renderer process via `channel`, along with arguments. Arguments will be serialized with the Structured Clone Algorithm, just like `postMessage`, so prototype chains will not be included. Sending Functions, Promises, Symbols, WeakMaps, or WeakSets will throw an exception.

The renderer process can handle the message by listening to `channel` with the `ipcRenderer` module.

#### `frame.postMessage(channel, message, [transfer])`

* `channel` string
* `message` any
* `transfer` MessagePortMain[] (optional)

Send a message to the renderer process, optionally transferring ownership of zero or more `MessagePortMain` objects.

The transferred `MessagePortMain` objects will be available in the renderer process by accessing the `ports` property of the emitted event. When they arrive in the renderer, they will be native DOM `MessagePort` objects.

```js
// Main process
const win = new BrowserWindow()
const { port1, port2 } = new MessageChannelMain()
win.webContents.mainFrame.postMessage('port', { message: 'hello' }, [port1])

// Renderer process
ipcRenderer.on('port', (e, msg) => {
  const [port] = e.ports
  // ...
})
```

#### `frame.collectJavaScriptCallStack()` _Experimental_

Returns `Promise<string> | Promise<void>` - A promise that resolves with the currently running JavaScript call stack. If no JavaScript runs in the frame, the promise will never resolve. In cases where the call stack is otherwise unable to be collected, it will return `undefined`.

This can be useful to determine why the frame is unresponsive in cases where there's long-running JavaScript. For more information, see the proposed Crash Reporting API (https://wicg.github.io/crash-reporting/).

```js
const { app } = require('electron')

app.commandLine.appendSwitch('enable-features', 'DocumentPolicyIncludeJSCallStacksInCrashReports')

app.on('web-contents-created', (_, webContents) => {
  webContents.on('unresponsive', async () => {
    // Interrupt execution and collect call stack from unresponsive renderer
    const callStack = await webContents.mainFrame.collectJavaScriptCallStack()
    console.log('Renderer unresponsive\n', callStack)
  })
})
```

#### `frame.copyVideoFrameAt(x, y)`

* `x` Integer
* `y` Integer

When executed on a video media element, copies the frame at (x, y) to the clipboard.

#### `frame.saveVideoFrameAs(x, y)`

* `x` Integer
* `y` Integer

When executed on a video media element, shows a save dialog and saves the frame at (x, y) to disk.

#### `frame.printToPDF(options)`

* `options` PrintToPDFOptions

Returns `Promise<Buffer>` - Resolves with the generated PDF data.

Prints the frame's web page as PDF.

Unlike `webContents.printToPDF`, this method prints only the contents of the frame it is called on. This can be used to print an individual `<iframe>` from the main process.

The `landscape` will be ignored if `@page` CSS at-rule is used in the web page.

```js
const { app, BrowserWindow } = require('electron')

const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')

app.whenReady().then(() => {
  const win = new BrowserWindow()
  win.loadFile('page-with-iframe.html')

  win.webContents.on('did-finish-load', () => {
    const pdfPath = path.join(os.homedir(), 'Desktop', 'iframe.pdf')
    const iframe = win.webContents.mainFrame.frames[0]
    iframe
      .printToPDF({})
      .then((data) => {
        fs.writeFile(pdfPath, data, (error) => {
          if (error) throw error
          console.log(`Wrote PDF successfully to ${pdfPath}`)
        })
      })
      .catch((error) => {
        console.log(`Failed to write PDF to ${pdfPath}: `, error)
      })
  })
})
```

See Chrome DevTools Protocol `Page.printToPDF` for more information.

### Instance Properties

#### `frame.ipc` _Readonly_

An `IpcMain` instance scoped to the frame.

IPC messages sent with `ipcRenderer.send`, `ipcRenderer.sendSync` or `ipcRenderer.postMessage` will be delivered in the following order:

1. `contents.on('ipc-message')`
2. `contents.mainFrame.on(channel)`
3. `contents.ipc.on(channel)`
4. `ipcMain.on(channel)`

Handlers registered with `invoke` will be checked in the following order. The first one that is defined will be called, the rest will be ignored.

1. `contents.mainFrame.handle(channel)`
2. `contents.handle(channel)`
3. `ipcMain.handle(channel)`

In most cases, only the main frame of a WebContents can send or receive IPC messages. However, if the `nodeIntegrationInSubFrames` option is enabled, it is possible for child frames to send and receive IPC messages also. The `WebContents.ipc` interface may be more convenient when `nodeIntegrationInSubFrames` is not enabled.

| Property | Type | Description |
| --- | --- | --- |
| `frame.url` _Readonly_ | string | The current URL of the frame. |
| `frame.origin` _Readonly_ | string | The current origin of the frame, serialized according to RFC 6454. May be different from the URL. For a child window opened to `about:blank`, `frame.origin` returns the parent frame's origin while `frame.url` returns the empty string. Pages without a scheme/host/port triple origin have the serialized origin `"null"`. |
| `frame.top` _Readonly_ | WebFrameMain \| null | Top frame in the frame hierarchy to which `frame` belongs. |
| `frame.parent` _Readonly_ | WebFrameMain \| null | Parent frame of `frame`; `null` if `frame` is the top frame in the frame hierarchy. |
| `frame.frames` _Readonly_ | WebFrameMain[] | The direct descendents of `frame`. |
| `frame.framesInSubtree` _Readonly_ | WebFrameMain[] | Every frame in the subtree of `frame`, including itself. Useful when traversing through all frames. |
| `frame.frameTreeNodeId` _Readonly_ | Integer | The id of the frame's internal FrameTreeNode instance. Browser-global; uniquely identifies a frame that hosts content. Fixed at creation and constant for the lifetime of the frame. When the frame is removed, the id is not used again. |
| `frame.name` _Readonly_ | string | The frame name. |
| `frame.frameToken` _Readonly_ | string | Uniquely identifies the frame within its associated renderer process. Equivalent to `webFrame.frameToken`. |
| `frame.osProcessId` _Readonly_ | Integer | The operating system `pid` of the process which owns this frame. |
| `frame.processId` _Readonly_ | Integer | The Chromium internal `pid` of the process which owns this frame. Not the same as the OS process ID; use `frame.osProcessId`. |
| `frame.routingId` _Readonly_ | Integer | The unique frame id in the current renderer process. Distinct `WebFrameMain` instances that refer to the same underlying frame have the same `routingId`. |
| `frame.visibilityState` _Readonly_ | string | The visibility state (MDN `Document.visibilityState`) of the frame. |
| `frame.detached` _Readonly_ | Boolean | Whether the frame is detached from the frame tree. If a frame is accessed while the corresponding page is running any unload listeners, it may become detached as the newly navigated page replaced it in the frame tree. |

## Notes

* `frame.collectJavaScriptCallStack()` is _Experimental_.
* `frame.printToPDF()` prints only the frame it is called on, unlike `webContents.printToPDF`.

## Related

* [webFrame (renderer)](./web-frame.md)
* [WebContents properties](./web-contents-properties.md)
* [Printing structures](./printing-structures.md)
