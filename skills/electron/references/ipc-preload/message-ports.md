---
source: https://www.electronjs.org/docs/latest/tutorial/message-ports
---

# MessagePorts in Electron

`MessagePort`s are a web feature for passing messages between contexts (like `window.postMessage`, but on different channels). This guide describes how Electron extends the Channel Messaging model.

## Signature / Usage

```js
// renderer.js (Renderer Process)
// MessagePorts are created in pairs. A connected pair is called a channel.
const channel = new MessageChannel()
const port1 = channel.port1
const port2 = channel.port2

// Messages are queued until a listener is registered.
port2.postMessage({ answer: 42 })

// Send the other end of the channel to the main process.
ipcRenderer.postMessage('port', null, [port1])
```

```js
// main.js (Main Process)
ipcMain.on('port', (event) => {
  // A MessagePort received in main becomes a MessagePortMain.
  const port = event.ports[0]

  // MessagePortMain uses the Node.js-style events API.
  port.on('message', (event) => {
    // data is { answer: 42 }
    const data = event.data
  })

  // MessagePortMain queues messages until .start() has been called.
  port.start()
})
```

## MessagePorts in the main process

The main process has no Blink integration, so it has no `MessagePort` / `MessageChannel`. Electron adds `MessagePortMain` and `MessageChannelMain`. Ports can be created in either process and passed using `ipcRenderer.postMessage` and `WebContents.postMessage`; the usual `send` and `invoke` cannot transfer `MessagePort`s. Passing ports via main lets you connect two pages that otherwise could not communicate (e.g. due to same-origin restrictions).

## Extension: `close` event

Electron adds a `close` event to `MessagePort`, emitted when the other end of the channel is closed (ports can also be implicitly closed by garbage collection). In the renderer: `port.onclose = ...` or `port.addEventListener('close', ...)`. In main: `port.on('close', ...)`.

## Example: MessageChannel between two renderers

Adapted (not in the official docs): preload paths use path.join(__dirname, ...) instead of bare file names, loadFile calls are added, and an electron-port-ready event is added so renderer.js waits for the port before posting 'ping'.

```js
// main.js (Main Process)
const { BrowserWindow, app, MessageChannelMain } = require('electron')
const path = require('node:path')

app.whenReady().then(async () => {
  const mainWindow = new BrowserWindow({
    show: false,
    webPreferences: {
      contextIsolation: false,
      preload: path.join(__dirname, 'preloadMain.js')
    }
  })
  const secondaryWindow = new BrowserWindow({
    show: false,
    webPreferences: {
      contextIsolation: false,
      preload: path.join(__dirname, 'preloadSecondary.js')
    }
  })

  const { port1, port2 } = new MessageChannelMain()

  mainWindow.once('ready-to-show', () => {
    mainWindow.webContents.postMessage('port', null, [port1])
  })
  secondaryWindow.once('ready-to-show', () => {
    secondaryWindow.webContents.postMessage('port', null, [port2])
  })

  mainWindow.loadFile('main.html')
  secondaryWindow.loadFile('secondary.html')
})
```

```js
// preloadMain.js and preloadSecondary.js (Preload scripts)
const { ipcRenderer } = require('electron')

ipcRenderer.on('port', (e) => {
  window.electronMessagePort = e.ports[0]
  window.electronMessagePort.onmessage = (messageEvent) => {
    // handle message
  }
  window.dispatchEvent(new Event('electron-port-ready'))
})
```

```js
// renderer.js (Renderer Process)
// The port arrives after 'ready-to-show', so wait for it before use.
const sendPing = () => window.electronMessagePort.postMessage('ping')
if (window.electronMessagePort) {
  sendPing()
} else {
  window.addEventListener('electron-port-ready', sendPing, { once: true })
}
```

The example binds the port to `window` directly for simplicity; the docs say it is better to use `contextIsolation` with specific `contextBridge` calls.

## Example: Worker process (hidden window)

The page talks to a worker process implemented as a hidden `BrowserWindow` without relaying through main.

Adapted (not in the official docs): contextIsolation: false is added next to the official nodeIntegration: true so that require('electron') works in the pages (demo-only setting).

```js
// main.js (Main Process)
const { BrowserWindow, app, ipcMain, MessageChannelMain } = require('electron')

app.whenReady().then(async () => {
  const worker = new BrowserWindow({
    show: false,
    webPreferences: { nodeIntegration: true, contextIsolation: false }
  })
  await worker.loadFile('worker.html')

  const mainWindow = new BrowserWindow({
    webPreferences: { nodeIntegration: true, contextIsolation: false }
  })
  mainWindow.loadFile('app.html')

  // ipcMain.handle() can't be used: the reply needs to transfer a MessagePort.
  mainWindow.webContents.mainFrame.ipc.on('request-worker-channel', (event) => {
    const { port1, port2 } = new MessageChannelMain()
    worker.webContents.postMessage('new-client', null, [port1])
    event.senderFrame.postMessage('provide-worker-channel', null, [port2])
  })
})
```

```html
<!-- worker.html -->
<script>
const { ipcRenderer } = require('electron')

const doWork = (input) => {
  return input * 2
}

ipcRenderer.on('new-client', (event) => {
  const [ port ] = event.ports
  port.onmessage = (event) => {
    const result = doWork(event.data)
    port.postMessage(result)
  }
})
</script>
```

```html
<!-- app.html -->
<script>
const { ipcRenderer } = require('electron')

ipcRenderer.send('request-worker-channel')

ipcRenderer.once('provide-worker-channel', (event) => {
  const [ port ] = event.ports
  port.onmessage = (event) => {
    console.log('received result:', event.data)
  }
  port.postMessage(21)
})
</script>
```

## Example: Reply streams

Built-in IPC supports only fire-and-forget (`send`) and request-response (`invoke`). With MessageChannels a single request can receive a stream of responses.

```js
// renderer.js (Renderer Process)
const makeStreamingRequest = (element, callback) => {
  const { port1, port2 } = new MessageChannel()

  ipcRenderer.postMessage('give-me-a-stream', { element, count: 10 }, [port2])

  port1.onmessage = (event) => {
    callback(event.data)
  }
  port1.onclose = () => {
    console.log('stream ended')
  }
}

makeStreamingRequest(42, (data) => {
  console.log('got response data:', data)
})
```

```js
// main.js (Main Process)
ipcMain.on('give-me-a-stream', (event, msg) => {
  const [replyPort] = event.ports

  for (let i = 0; i < msg.count; i++) {
    replyPort.postMessage(msg.element)
  }

  // Closing signals the other end; if omitted, GC would eventually trigger 'close' in the renderer.
  replyPort.close()
})
```

## Example: Main process to the main world of a context-isolated page

With context isolation enabled, IPC messages from main are delivered to the isolated world, not the main world. To reach the main world directly, transfer a port through the preload script with `window.postMessage`.

Adapted (not in the official docs): loadURL('index.html') is replaced by await loadFile('index.html'), and the port is posted only after the page has loaded.

```js
// main.js (Main Process)
const { BrowserWindow, app, MessageChannelMain } = require('electron')
const path = require('node:path')

app.whenReady().then(async () => {
  const bw = new BrowserWindow({
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })
  await bw.loadFile('index.html')

  const { port1, port2 } = new MessageChannelMain()

  port2.postMessage({ test: 21 })
  port2.on('message', (event) => {
    console.log('from renderer main world:', event.data)
  })
  port2.start()

  bw.webContents.postMessage('main-world-port', null, [port1])
})
```

```js
// preload.js (Preload Script)
const { ipcRenderer } = require('electron')

// Wait until the main world is ready to receive the message before sending the port.
const windowLoaded = new Promise((resolve) => {
  window.onload = resolve
})

ipcRenderer.on('main-world-port', async (event) => {
  await windowLoaded
  window.postMessage('main-world-port', '*', event.ports)
})
```

```html
<!-- index.html -->
<script>
window.onmessage = (event) => {
  // event.source === window means the message is coming from the preload script
  if (event.source === window && event.data === 'main-world-port') {
    const [ port ] = event.ports
    port.onmessage = (event) => {
      console.log('from main process:', event.data)
      port.postMessage(event.data.test * 2)
    }
  }
}
</script>
```

## Notes

- `webPreferences.preload` requires an absolute path; the original page writes bare file names (`preloadMain.js`) as shorthand, so this page uses `path.join(__dirname, ...)`.
- Corrections to the original excerpts: the two-renderer example adds `loadFile` calls (the original omits page loading) and has `renderer.js` wait for the port (via a preload-dispatched `electron-port-ready` event) before calling `postMessage`, since the port arrives only after `ready-to-show`.
- The hidden-window worker example uses `nodeIntegration: true, contextIsolation: false` so that `require('electron')` works in the page (the original sets only `nodeIntegration: true`, and `contextIsolation` defaults to `true`). This is a demo-only, discouraged setting; production code should use a preload script with `contextBridge` to expose limited APIs.
- In the main-world example, `bw.loadURL('index.html')` in the original is replaced by `await bw.loadFile('index.html')`, and the port is posted only after the page has loaded, so the preload listener is registered.
- Only `postMessage` methods (`ipcRenderer.postMessage`, `WebContents.postMessage`) can transfer `MessagePort`s.
- `MessagePortMain` uses `port.on('message', ...)` and requires `port.start()`; renderer ports use the web `onmessage` API.

## Related

- [MessageChannelMain](./message-channel-main.md)
- [MessagePortMain](./message-port-main.md)
- [ipcRenderer](./ipc-renderer.md)
- [Context Isolation](./context-isolation.md)
