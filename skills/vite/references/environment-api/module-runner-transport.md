---
source: https://vite.dev/guide/api-environment-runtimes#modulerunnertransport
---

# ModuleRunnerTransport

The object a module runner uses to talk to its environment, via RPC or by directly calling a function; it must be coupled with a `HotChannel` on the server.

## Signature / Usage

```ts
interface ModuleRunnerTransport {
  connect?(handlers: ModuleRunnerTransportHandlers): Promise<void> | void
  disconnect?(): Promise<void> | void
  send?(data: HotPayload): Promise<void> | void
  invoke?(data: HotPayload): Promise<{ result: any } | { error: any }>
  timeout?: number
}
```

Runner in a worker thread (`worker.js`):

```js
import { fileURLToPath } from 'node:url'
import { parentPort } from 'node:worker_threads'
import {
  ESModulesEvaluator,
  ModuleRunner,
  createNodeImportMeta,
} from 'vite/module-runner'

/** @type {import('vite/module-runner').ModuleRunnerTransport} */
const transport = {
  connect({ onMessage, onDisconnection }) {
    parentPort.on('message', onMessage)
    parentPort.on('close', onDisconnection)
  },
  send(data) {
    parentPort.postMessage(data)
  },
}

const runner = new ModuleRunner(
  {
    transport,
    createImportMeta: createNodeImportMeta,
  },
  new ESModulesEvaluator(),
)
```

Server side (`server.js`):

```js
import { BroadcastChannel } from 'node:worker_threads'
import { createServer, DevEnvironment } from 'vite'

function createWorkerEnvironment(name, config, context) {
  const worker = new Worker('./worker.js')
  const handlerToWorkerListener = new WeakMap()
  const client = {
    send(payload: HotPayload) {
      worker.postMessage(payload)
    },
  }

  const workerHotChannel = {
    // Worker threads post messages are not exposed over the network, skip server.fs checks
    skipFsCheck: true,
    send: (data) => worker.postMessage(data),
    on: (event, handler) => {
      // client is already connected
      if (event === 'vite:client:connect') return
      if (event === 'vite:client:disconnect') {
        const listener = () => {
          handler(undefined, client)
        }
        handlerToWorkerListener.set(handler, listener)
        worker.on('exit', listener)
        return
      }

      const listener = (value) => {
        if (value.type === 'custom' && value.event === event) {
          handler(value.data, client)
        }
      }
      handlerToWorkerListener.set(handler, listener)
      worker.on('message', listener)
    },
    off: (event, handler) => {
      if (event === 'vite:client:connect') return
      if (event === 'vite:client:disconnect') {
        const listener = handlerToWorkerListener.get(handler)
        if (listener) {
          worker.off('exit', listener)
          handlerToWorkerListener.delete(handler)
        }
        return
      }

      const listener = handlerToWorkerListener.get(handler)
      if (listener) {
        worker.off('message', listener)
        handlerToWorkerListener.delete(handler)
      }
    },
  }

  return new DevEnvironment(name, config, {
    transport: workerHotChannel,
  })
}

await createServer({
  environments: {
    worker: {
      dev: {
        createEnvironment: createWorkerEnvironment,
      },
    },
  },
})
```

HTTP-based runner (invoke only):

```ts
import { ESModulesEvaluator, ModuleRunner } from 'vite/module-runner'

export const runner = new ModuleRunner(
  {
    transport: {
      async invoke(data) {
        const response = await fetch(`http://my-vite-server/invoke`, {
          method: 'POST',
          body: JSON.stringify(data),
        })
        return response.json()
      },
    },
    hmr: false, // disable HMR as HMR requires transport.connect
  },
  new ESModulesEvaluator(),
)

await runner.import('/entry.js')
```

Server side of the HTTP example, using `handleInvoke` on the `NormalizedHotChannel`:

```ts
const customEnvironment = new DevEnvironment(name, config, context)

server.onRequest((request: Request) => {
  const url = new URL(request.url)
  if (url.pathname === '/invoke') {
    const payload = (await request.json()) as HotPayload
    const result = customEnvironment.hot.handleInvoke(payload)
    return new Response(JSON.stringify(result))
  }
  return Response.error()
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| connect(handlers) | `Promise<void> \| void` (optional) | Establishes the connection; receives `ModuleRunnerTransportHandlers`. |
| disconnect() | `Promise<void> \| void` (optional) | Closes the connection. |
| send(data) | `Promise<void> \| void` (optional) | Sends a `HotPayload` to the server. |
| invoke(data) | `Promise<{ result: any } \| { error: any }>` (optional) | RPC call to the server. |
| timeout | `number` (optional) | Timeout value. |

## Notes

- When `invoke` is not implemented, both `send` and `connect` are required; Vite constructs `invoke` internally.
- Implement `vite:client:connect` / `vite:client:disconnect` in the `HotChannel` `on` / `off` methods when those methods exist: emit `vite:client:connect` when the connection is established and `vite:client:disconnect` when it closes. The `HotChannelClient` object passed to the handler must be the same reference for the same connection.
- For HMR support, `send` and `connect` are required. `send` is usually called when a custom event is triggered (like `import.meta.hot.send("my-event")`).
- `skipFsCheck: true` on the `HotChannel` bypasses `server.fs` restrictions for transports not exposed over the network.
- The `server.onRequest` and `serialize` style helpers in the examples are illustrative, not Vite APIs.
- Release Candidate: the Environment API is generally in the release candidate phase.

## Related

- [ModuleRunner](./module-runner.md)
- [ModuleRunnerOptions](./module-runner-options.md)
- [Environment Factories](./environment-factories.md)
- [Application-Plugin Communication](./application-plugin-communication.md)
