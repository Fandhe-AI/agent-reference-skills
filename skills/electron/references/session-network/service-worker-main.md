---
source: https://www.electronjs.org/docs/latest/api/service-worker-main
---

# ServiceWorkerMain

An instance of a Service Worker representing a version of a script for a given scope.

## Signature / Usage

Process: Main

_This class is not exported from the `'electron'` module. It is only available as a return value of other methods in the Electron API._

```js
const { app, session } = require('electron')

const { serviceWorkers } = session.defaultSession

// Collect service workers scopes
const workerScopes = Object.values(serviceWorkers.getAllRunning()).map((info) => info.scope)

app.on('browser-window-created', async (event, window) => {
  for (const scope of workerScopes) {
    try {
      // Ensure worker is started
      const serviceWorker = await serviceWorkers.startWorkerForScope(scope)
      serviceWorker.send('window-created', { windowId: window.id })
    } catch (error) {
      console.error(`Failed to start service worker for ${scope}`)
      console.error(error)
    }
  }
})
```

### Instance Methods

#### `serviceWorker.isDestroyed()` _Experimental_

Returns `boolean` - Whether the service worker has been destroyed.

#### `serviceWorker.send(channel, ...args)` _Experimental_

* `channel` string
* `...args` any[]

Send an asynchronous message to the service worker process via `channel`, along with arguments. Arguments will be serialized with the [Structured Clone Algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm), just like [`postMessage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage), so prototype chains will not be included. Sending Functions, Promises, Symbols, WeakMaps, or WeakSets will throw an exception.

The service worker process can handle the message by listening to `channel` with the [`ipcRenderer`](../ipc-preload/ipc-renderer.md) module.

#### `serviceWorker.startTask()` _Experimental_

Returns `Object`:

* `end` Function - Method to call when the task has ended. If never called, the service won't terminate while otherwise idle.

Initiate a task to keep the service worker alive until ended.

### Instance Properties

#### `serviceWorker.ipc` _Readonly_ _Experimental_

An [`IpcMainServiceWorker`](../ipc-preload/ipc-main-service-worker.md) instance scoped to the service worker.

#### `serviceWorker.scope` _Readonly_ _Experimental_

A `string` representing the scope URL of the service worker.

#### `serviceWorker.scriptURL` _Readonly_ _Experimental_

A `string` representing the script URL of the service worker.

#### `serviceWorker.versionId` _Readonly_ _Experimental_

A `number` representing the ID of the specific version of the service worker script in its scope.

## Notes

* All members are marked _Experimental_ in the source.
* The usage snippet at the top is the example from the [ServiceWorkers](./service-workers.md) source page (https://www.electronjs.org/docs/latest/api/service-workers); the `ServiceWorkerMain` page itself has no code example.

## Related

* [service-workers](./service-workers.md)
* [ipc-main-service-worker](../ipc-preload/ipc-main-service-worker.md)
* [ipc-renderer](../ipc-preload/ipc-renderer.md)
