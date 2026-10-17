---
source: https://www.electronjs.org/docs/latest/api/message-channel-main
---

# MessageChannelMain

The main-process-side equivalent of the DOM `MessageChannel`. Its singular function is to create a pair of connected `MessagePortMain` objects. Process: Main.

## Signature / Usage

```js
// Main process
const { BrowserWindow, MessageChannelMain } = require('electron')

const w = new BrowserWindow()
const { port1, port2 } = new MessageChannelMain()
w.webContents.postMessage('port', null, [port2])
port1.postMessage({ some: 'message' })

// Renderer process
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

- The Main process part of the snippet is an excerpt from the official docs: run it after app.whenReady() (BrowserWindow can only be created after the app module emits ready).
- Electron's built-in classes cannot be subclassed in user code.

## Related

- [MessagePortMain](./message-port-main.md)
- [MessagePorts in Electron](./message-ports.md)
