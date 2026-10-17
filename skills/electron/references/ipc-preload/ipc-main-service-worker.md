---
source: https://www.electronjs.org/docs/latest/api/ipc-main-service-worker
---

# IpcMainServiceWorker

Communicate asynchronously from the main process to service workers. Process: Main.

A subtle variation of `IpcMain` targeted at service workers. For communicating with web frames, see `ipcMain`.

## Signature / Usage

```js
// Signatures (from the docs; no standalone example in the source)
ipcMainServiceWorker.on(channel, listener)
// listener: (event: IpcMainServiceWorkerEvent, ...args: any[]) => void
ipcMainServiceWorker.handle(channel, listener)
// listener: (event: IpcMainServiceWorkerInvokeEvent, ...args: any[]) => Promise<any> | any
```

## Instance Methods

| Method | Params | Description |
| --- | --- | --- |
| `on(channel, listener)` | `listener(event: IpcMainServiceWorkerEvent, ...args)` | Listens to `channel`; called with `listener(event, args...)`. |
| `once(channel, listener)` | same | One-time listener, removed after the next message. |
| `removeListener(channel, listener)` | `listener(...args)` | Removes the specified `listener` for `channel`. |
| `removeAllListeners([channel])` | `channel` string (optional) | Removes listeners of the specified `channel`. |
| `handle(channel, listener)` | `listener(event: IpcMainServiceWorkerInvokeEvent, ...args)` returning `Promise<any> \| any` | Adds an `invoke`able handler. |
| `handleOnce(channel, listener)` | same | Handles a single `invoke`able message, then removes the listener. |
| `removeHandler(channel)` | `channel` string | Removes any handler for `channel`, if present. |

## Notes

- Electron's built-in classes cannot be subclassed in user code.
- The source page documents this as `Class: IpcMainServiceWorker` and does not state how an instance is obtained.

## Related

- [ipcMain](./ipc-main.md)
- [IPC event structures](./ipc-event-structures.md)
