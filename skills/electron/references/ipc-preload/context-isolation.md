---
source: https://www.electronjs.org/docs/latest/tutorial/context-isolation
---

# Context Isolation

Context Isolation ensures that both your `preload` scripts and Electron's internal logic run in a separate context from the website loaded in a `webContents`, preventing the website from accessing Electron internals or the powerful APIs the preload script can reach.

The `window` object seen by the preload script is a **different** object from the website's: setting `window.hello = 'wave'` in the preload makes `window.hello` undefined for the website. Context isolation has been enabled by default since Electron 12 and is recommended for _all applications_.

## Signature / Usage

Migration from `window.X = apiObject` to `contextBridge`:

```js
// preload.js - before (contextIsolation disabled)
window.myAPI = {
  doAThing: () => {}
}
```

```js
// preload.js - after (contextIsolation enabled)
const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('myAPI', {
  doAThing: () => {}
})
```

```js
// renderer.js
window.myAPI.doAThing()
```

## Security considerations

Enabling `contextIsolation` and using `contextBridge` is not automatically safe. This is **unsafe** because it exposes a powerful API without argument filtering (any website could send arbitrary IPC messages):

```js
// Bad code
contextBridge.exposeInMainWorld('myAPI', {
  send: ipcRenderer.send
})
```

Provide one method per IPC message instead:

```js
// Good code
contextBridge.exposeInMainWorld('myAPI', {
  loadPreferences: () => ipcRenderer.invoke('load-prefs')
})
```

## Usage with TypeScript

The renderer's `window` has no typings for bridged APIs unless you extend it with a declaration file.

```ts
// preload.ts
contextBridge.exposeInMainWorld('electronAPI', {
  loadPreferences: () => ipcRenderer.invoke('load-prefs')
})
```

```ts
// interface.d.ts
export interface IElectronAPI {
  loadPreferences: () => Promise<void>
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
```

```ts
// renderer.ts
window.electronAPI.loadPreferences()
```

## Notes

- `contextBridge` limitations apply (no custom prototypes or symbols across the bridge).

## Related

- [contextBridge](./context-bridge.md)
- [Inter-Process Communication guide](./ipc.md)
- [ipcRenderer](./ipc-renderer.md)
