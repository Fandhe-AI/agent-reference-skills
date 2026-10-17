---
source: https://www.electronjs.org/docs/latest/api/ipc-renderer
---

# ipcRenderer

Communicate asynchronously from a renderer process to the main process. Process: Renderer.

The `ipcRenderer` module is an EventEmitter. It lets you send synchronous and asynchronous messages from the renderer (web page) to the main process, and receive replies.

## Signature / Usage

```js
// Renderer process
ipcRenderer.invoke('some-name', someArgument).then((result) => {
  // ...
})

// Main process
ipcMain.handle('some-name', async (event, someArgument) => {
  const result = await doSomeWork(someArgument)
  return result
})
```

## Methods

| Method | Params | Description |
| --- | --- | --- |
| `ipcRenderer.on(channel, listener)` | `listener(event: IpcRendererEvent, ...args: any[])` | Listens to `channel`; called with `listener(event, args...)`. |
| `ipcRenderer.off(channel, listener)` | same | Removes the specified `listener` for `channel`. |
| `ipcRenderer.once(channel, listener)` | same | One-time listener, removed after the next message on `channel`. |
| `ipcRenderer.addListener(channel, listener)` | same | Alias for `ipcRenderer.on`. |
| `ipcRenderer.removeListener(channel, listener)` | same | Alias for `ipcRenderer.off`. |
| `ipcRenderer.removeAllListeners([channel])` | `channel` string (optional) | Removes all listeners from `channel`, or from all channels if none is specified. |
| `ipcRenderer.send(channel, ...args)` | `channel` string, `...args` any[] | Sends an asynchronous message to the main process; handled with `ipcMain`. |
| `ipcRenderer.invoke(channel, ...args)` | `channel` string, `...args` any[] | Returns `Promise<any>` resolving with the response; main side uses `ipcMain.handle()`. |
| `ipcRenderer.sendSync(channel, ...args)` | `channel` string, `...args` any[] | Returns `any`, the value sent back by the `ipcMain` handler (via `event.returnValue`). |
| `ipcRenderer.postMessage(channel, message, [transfer])` | `message` any, `transfer` MessagePort[] (optional) | Sends a message to main, optionally transferring ownership of `MessagePort` objects. |
| `ipcRenderer.sendToHost(channel, ...args)` | `channel` string, `...args` any[] | Like `send` but the event goes to the `<webview>` element in the host page instead of main. |

```js
// Renderer process
const { port1, port2 } = new MessageChannel()
ipcRenderer.postMessage('port', { message: 'hello' }, [port1])

// Main process
ipcMain.on('port', (e, msg) => {
  const [port] = e.ports
  // ...
})
```

## Notes

- With context isolation enabled, call this API from the preload script and expose it with `contextBridge`.
- Do not expose the `event` argument of `ipcRenderer.on` to the renderer. Wrap callbacks: `ipcRenderer.on('my-channel', (event, ...args) => callback(...args))`; otherwise dangerous Electron APIs are exposed (see security guide item 20).
- Arguments are serialized with the Structured Clone Algorithm (like `window.postMessage`): prototype chains are not included; sending Functions, Promises, Symbols, WeakMaps or WeakSets throws. DOM objects (`ImageBitmap`, `File`, `DOMMatrix`, ...) and special Electron objects cannot be sent to main.
- If the main-process handler of `invoke` throws, the returned promise rejects, but the `Error` in the renderer is not the same object as in main.
- `sendSync` blocks the whole renderer process until the reply arrives; use it only as a last resort and prefer `invoke()`.
- To transfer a `MessagePort` to main, use `postMessage`; transferred ports arrive in main as `MessagePortMain` via the event's `ports` property.
- Behavior change: `ipcRenderer` can no longer be sent over the `contextBridge` (PR #40330).
- `ipcRenderer.off` / `addListener` were added in PR #39816; `invoke` in PR #18449; `postMessage` in PR #22404.

## Related

- [ipcMain](./ipc-main.md)
- [IPC event structures](./ipc-event-structures.md)
- [contextBridge](./context-bridge.md)
- [MessagePortMain](./message-port-main.md)
