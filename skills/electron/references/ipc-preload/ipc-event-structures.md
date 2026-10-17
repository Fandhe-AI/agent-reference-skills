---
source: https://www.electronjs.org/docs/latest/api/structures/ipc-main-event
---

# IPC event structures

Event objects passed to IPC listeners and handlers. All extend `Event`.

## Signature / Usage

```js
ipcMain.on('set-title', (event, title) => {
  const webContents = event.sender // IpcMainEvent.sender
  const win = BrowserWindow.fromWebContents(webContents)
  win.setTitle(title)
})
```

## IpcMainEvent

Passed to `ipcMain.on` / `once` listeners.

| Property | Type | Description |
| --- | --- | --- |
| `type` | String | Possible values include `frame` |
| `processId` | Integer | The internal ID of the renderer process that sent this message |
| `frameId` | Integer | The ID of the renderer frame that sent this message |
| `returnValue` | any | Set this to the value to be returned in a synchronous message |
| `sender` | WebContents | Returns the `webContents` that sent the message |
| `senderFrame` | WebFrameMain \| null (Readonly) | The frame that sent this message. May be `null` if accessed after the frame has either navigated or been destroyed. |
| `ports` | MessagePortMain[] | A list of MessagePorts that were transferred with this message |
| `reply` | Function `(channel: string, ...args: any[])` | Sends an IPC message to the renderer frame that sent the original message; use it to "reply" to guarantee the reply goes to the correct process and frame. |

## IpcMainInvokeEvent

Passed to `ipcMain.handle` / `handleOnce` listeners.

| Property | Type | Description |
| --- | --- | --- |
| `type` | String | Possible values include `frame` |
| `processId` | Integer | The internal ID of the renderer process that sent this message |
| `frameId` | Integer | The ID of the renderer frame that sent this message |
| `sender` | WebContents | Returns the `webContents` that sent the message |
| `senderFrame` | WebFrameMain \| null (Readonly) | The frame that sent this message. May be `null` if accessed after the frame has either navigated or been destroyed. |

## IpcRendererEvent

Passed to `ipcRenderer.on` / `once` listeners.

| Property | Type | Description |
| --- | --- | --- |
| `sender` | IpcRenderer | The `IpcRenderer` instance that emitted the event originally |
| `ports` | MessagePort[] | A list of MessagePorts that were transferred with this message |

## IpcMainServiceWorkerEvent

Passed to `ipcMainServiceWorker.on` / `once` listeners.

| Property | Type | Description |
| --- | --- | --- |
| `type` | String | Possible values include `service-worker`. |
| `serviceWorker` | ServiceWorkerMain (Readonly) | The service worker that sent this message |
| `versionId` | Number | The service worker version ID. |
| `session` | Session | The `Session` instance with which the event is associated. |
| `returnValue` | any | Set this to the value to be returned in a synchronous message |
| `ports` | MessagePortMain[] | A list of MessagePorts that were transferred with this message |
| `reply` | Function `(channel: string, ...args: any[])` | Sends an IPC message to the renderer frame that sent the original message; use it to "reply". |

## IpcMainServiceWorkerInvokeEvent

Passed to `ipcMainServiceWorker.handle` / `handleOnce` listeners.

| Property | Type | Description |
| --- | --- | --- |
| `type` | String | Possible values include `service-worker`. |
| `serviceWorker` | ServiceWorkerMain (Readonly) | The service worker that sent this message |
| `versionId` | Number | The service worker version ID. |
| `session` | Session | The `Session` instance with which the event is associated. |

## Notes

- Source structure pages: `/docs/latest/api/structures/ipc-main-event`, `ipc-main-invoke-event`, `ipc-renderer-event`, `ipc-main-service-worker-event`, `ipc-main-service-worker-invoke-event`.
- `event.reply` handles messages from non-main frames (iframes); `event.sender.send` always targets the main frame.

## Related

- [ipcMain](./ipc-main.md)
- [ipcRenderer](./ipc-renderer.md)
- [IpcMainServiceWorker](./ipc-main-service-worker.md)
