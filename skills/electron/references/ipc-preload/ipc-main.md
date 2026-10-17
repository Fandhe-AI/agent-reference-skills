---
source: https://www.electronjs.org/docs/latest/api/ipc-main
---

# ipcMain

Communicate asynchronously from the main process to renderer processes. Process: Main.

The `ipcMain` module is an Event Emitter. In the main process it handles asynchronous and synchronous messages sent from a renderer process (web page); messages sent from a renderer are emitted to this module.

## Signature / Usage

```js
// Main Process
ipcMain.handle('my-invokable-ipc', async (event, ...args) => {
  const result = await somePromise(...args)
  return result
})

// Renderer Process
async () => {
  const result = await ipcRenderer.invoke('my-invokable-ipc', arg1, arg2)
  // ...
}
```

## Sending messages

- The event name is the `channel`.
- To reply to a synchronous message, set `event.returnValue`.
- To send an asynchronous message back to the sender, use `event.reply(...)`. It automatically handles messages coming from frames that are not the main frame (e.g. iframes), whereas `event.sender.send(...)` always sends to the main frame.
- Messages can also be sent from main to renderer with `webContents.send`.

## Methods

| Method | Listener / Params | Description |
| --- | --- | --- |
| `ipcMain.on(channel, listener)` | `listener(event: IpcMainEvent, ...args: any[])` | Listens to `channel`; `listener` is called with `listener(event, args...)` on each new message. |
| `ipcMain.off(channel, listener)` | `listener(event: IpcMainEvent, ...args: any[])` | Removes the specified `listener` for `channel`. |
| `ipcMain.once(channel, listener)` | `listener(event: IpcMainEvent, ...args: any[])` | One-time listener, removed after the next message on `channel`. |
| `ipcMain.addListener(channel, listener)` | same as `on` | Alias for `ipcMain.on`. |
| `ipcMain.removeListener(channel, listener)` | `listener(...args: any[])` | Alias for `ipcMain.off`. |
| `ipcMain.removeAllListeners([channel])` | `channel` string (optional) | Removes all listeners from `channel`, or from all channels if none is specified. |
| `ipcMain.handle(channel, listener)` | `listener(event: IpcMainInvokeEvent, ...args: any[])` returning `Promise<any> \| any` | Adds a handler for an `invoke`able IPC, called whenever a renderer calls `ipcRenderer.invoke(channel, ...args)`. |
| `ipcMain.handleOnce(channel, listener)` | same as `handle` | Handles a single `invoke`able message, then removes the handler. |
| `ipcMain.removeHandler(channel)` | `channel` string | Removes any handler for `channel`, if present. |

## Notes

- If a `handle` listener returns a Promise, its eventual result is returned as the reply; otherwise the listener's return value is used.
- The `event` passed to a handler includes which `WebContents` is the source of the invoke request.
- Errors thrown through `handle` are serialized and only the `message` property of the original error is provided to the renderer (electron/electron#24427).
- `ipcMain.off` was added in PR #44651; `ipcMain.handle` / `handleOnce` / `removeHandler` in PR #18449.

## Related

- [ipcRenderer](./ipc-renderer.md)
- [IPC event structures](./ipc-event-structures.md)
- [Inter-Process Communication guide](./ipc.md)
- [IpcMainServiceWorker](./ipc-main-service-worker.md)
