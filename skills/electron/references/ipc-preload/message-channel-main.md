---
source: https://www.electronjs.org/docs/latest/api/message-channel-main
---

# MessageChannelMain

The main-process-side equivalent of the DOM `MessageChannel`. Its singular function is to create a pair of connected `MessagePortMain` objects. Process: Main.

## Signature / Usage

Adapted (not in the official docs): wrapped in app.whenReady(), the receiver is registered in a preload set with path.join(__dirname, 'preload.js'), and the port is posted only after await loadFile('index.html').

```js
// Main process
const path = require('node:path')
const { app, BrowserWindow, MessageChannelMain } = require('electron')

app.whenReady().then(async () => {
  const w = new BrowserWindow({
    webPreferences: { preload: path.join(__dirname, 'preload.js') }
  })
  await w.loadFile('index.html')
  const { port1, port2 } = new MessageChannelMain()
  w.webContents.postMessage('port', null, [port2])
  port1.postMessage({ some: 'message' })
})

// preload.js
const { ipcRenderer } = require('electron')

ipcRenderer.on('port', (e) => {
  // e.ports is a list of ports sent along with this message
  e.ports[0].onmessage = (messageEvent) => {
    console.log(messageEvent.data)
  }
})
```

## Instance Properties

| Name | Type | Description |
| --- | --- | --- |
| `channel.port1` | MessagePortMain | One end of the channel |
| `channel.port2` | MessagePortMain | The other end of the channel |

## Notes

- Electron's built-in classes cannot be subclassed in user code.

## Related

- [MessagePortMain](./message-port-main.md)
- [MessagePorts in Electron](./message-ports.md)
