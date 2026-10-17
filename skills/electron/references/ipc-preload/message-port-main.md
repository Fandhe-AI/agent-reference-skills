---
source: https://www.electronjs.org/docs/latest/api/message-port-main
---

# MessagePortMain

Port interface for channel messaging in the main process; the main-process-side equivalent of the DOM `MessagePort`. It is an EventEmitter and uses the Node.js event system rather than DOM `EventTarget`: use `port.on('message', ...)` instead of `port.onmessage = ...` or `port.addEventListener('message', ...)`. Process: Main.

## Signature / Usage

```js
ipcMain.on('port', (event) => {
  const port = event.ports[0]
  port.on('message', (event) => {
    const data = event.data
  })
  port.start()
})
```

## Instance Methods

| Method | Params | Description |
| --- | --- | --- |
| `port.postMessage(message, [transfer])` | `message` any, `transfer` MessagePortMain[] (optional) | Sends a message from the port, and optionally transfers ownership of objects to other browsing contexts. |
| `port.start()` | — | Starts the sending of messages queued on the port. Messages are queued until this is called. |
| `port.close()` | — | Disconnects the port, so it is no longer active. |

## Instance Events

| Event | Payload | Description |
| --- | --- | --- |
| `'message'` | `messageEvent` Object: `data` any, `ports` MessagePortMain[] | Emitted when a MessagePortMain object receives a message. |
| `'close'` | — | Emitted when the remote end of a MessagePortMain object becomes disconnected. |

## Notes

- This class is not exported from the `'electron'` module; it is only available as a return value of other methods in the Electron API (e.g. `MessageChannelMain`, the `ports` of IPC events).

## Related

- [MessageChannelMain](./message-channel-main.md)
- [MessagePorts in Electron](./message-ports.md)
- [parentPort](./parent-port.md)
