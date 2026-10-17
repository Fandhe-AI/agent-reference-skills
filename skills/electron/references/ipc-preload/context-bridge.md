---
source: https://www.electronjs.org/docs/latest/api/context-bridge
---

# contextBridge

Create a safe, bi-directional, synchronous bridge across isolated contexts. Process: Renderer.

## Signature / Usage

```js
// Preload (Isolated World)
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electron', {
  doThing: () => ipcRenderer.send('do-a-thing')
})
```

```js
// Renderer (Main World)
window.electron.doThing()
```

## Methods

| Method | Params | Description |
| --- | --- | --- |
| `contextBridge.exposeInMainWorld(apiKey, api)` | `apiKey` string (API available at `window[apiKey]`), `api` any | Exposes an API to the main world. |
| `contextBridge.exposeInIsolatedWorld(worldId, apiKey, api)` | `worldId` Integer, `apiKey` string, `api` any | Exposes an API to the given isolated world. `0` is the default world, `999` is the world used by Electron's `contextIsolation` feature (would expose the object to the preload context); 1000+ is recommended for custom isolated worlds. |
| `contextBridge.executeInMainWorld(executionScript)` _Experimental_ | `executionScript` Object: `func` `(...args: any[]) => any` (serialized; bound parameters and execution context are lost), `args` any[] (optional; copied between worlds per the type table) | Returns `any`, a copy of the result of executing the function in the main world. |

## Glossary

- **Main World**: the JavaScript context your main renderer code runs in; the page you load executes here by default.
- **Isolated World**: when `contextIsolation` is enabled in `webPreferences` (default since Electron 12.0.0), `preload` scripts run in an Isolated World.

## API rules

`api` must be a `Function`, `string`, `number`, `Array`, `boolean`, or an object whose keys are strings and values meet the same conditions (nested). `Function` values are proxied to the other context; all other values are **copied** and **frozen** (updates on either side do not propagate).

```js
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electron', {
  doThing: () => ipcRenderer.send('do-a-thing'),
  myPromises: [Promise.resolve(), Promise.reject(new Error('whoops'))],
  anAsyncFunction: async () => 123,
  data: {
    myFlags: ['a', 'b', 'c'],
    bootTime: 1234
  },
  nestedAPI: {
    evenDeeper: {
      youCanDoThisAsMuchAsYouWant: {
        fn: () => ({
          returnData: 123
        })
      }
    }
  }
})
```

```js
contextBridge.exposeInIsolatedWorld(1004, 'electron', {
  doThing: () => ipcRenderer.send('do-a-thing')
})
// Renderer (In isolated world id1004): window.electron.doThing()
```

## Parameter / Error / Return Type support

Function parameters, errors and return values are copied across the bridge; if a type can be serialized and deserialized into the same object it works.

| Type | Complexity | Parameter Support | Return Value Support | Limitations |
| --- | --- | --- | --- | --- |
| `string` | Simple | Yes | Yes | N/A |
| `number` | Simple | Yes | Yes | N/A |
| `boolean` | Simple | Yes | Yes | N/A |
| `Object` | Complex | Yes | Yes | Keys must be Simple types; values must be supported. Prototype modifications are dropped. Custom classes copy values but not the prototype. |
| `Array` | Complex | Yes | Yes | Same limitations as `Object` |
| `Error` | Complex | Yes | Yes | Thrown errors are copied; message and stack may change slightly; custom properties on the Error object will be lost (electron/electron#25596) |
| `Promise` | Complex | Yes | Yes | N/A |
| `Function` | Complex | Yes | Yes | Prototype modifications are dropped. Sending classes or constructors will not work. |
| Cloneable Types (Structured Clone) | Simple | Yes | Yes | See the MDN document on cloneable types |
| `Element` | Complex | Yes | Yes | Prototype modifications are dropped. Custom elements will not work. |
| `Blob` | Complex | Yes | Yes | N/A |
| `VideoFrame` | Complex | Yes | Yes | N/A |
| `Symbol` | N/A | No | No | Symbols cannot be copied across contexts so they are dropped |

If a type is not in the table, it is probably not supported.

## Exposing ipcRenderer

Sending the entire `ipcRenderer` module over the bridge results in an empty object on the receiving side (any code could send any message). Provide a safe wrapper:

```js
// Preload (Isolated World)
contextBridge.exposeInMainWorld('electron', {
  onMyEventName: (callback) => ipcRenderer.on('MyEventName', (e, ...args) => callback(args))
})
```

```js
// Renderer (Main World)
window.electron.onMyEventName((data) => {
  /* ... */
})
```

## Exposing Node Global Symbols

The preload script can use `contextBridge` to give the renderer access to Node APIs; the type table applies. Many Node APIs grant access to local system resources, so be cautious about what is exposed to untrusted remote content.

```js
const { contextBridge } = require('electron')
const crypto = require('node:crypto')

contextBridge.exposeInMainWorld('nodeCrypto', {
  sha256sum(data) {
    const hash = crypto.createHash('sha256')
    hash.update(data)
    return hash.digest('hex')
  }
})
```

## Notes

- The `node:crypto` example above assumes an unsandboxed preload (`webPreferences.sandbox: false`); in the default sandboxed preload (sandbox is on by default since Electron 20) `require` is limited and `node:crypto` cannot be loaded. If you keep the sandbox, run the hashing in the main process and call it through `ipcRenderer.invoke`.
- Behavior change: `ipcRenderer` can no longer be sent over the `contextBridge` (PR #40330).
- `executeInMainWorld` is marked _Experimental_.

## Related

- [Context Isolation](./context-isolation.md)
- [ipcRenderer](./ipc-renderer.md)
- [Inter-Process Communication guide](./ipc.md)
