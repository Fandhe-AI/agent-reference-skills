---
source: https://www.electronjs.org/docs/latest/tutorial/multithreading
---

# Multithreading (Web Workers with Node.js)

With Web Workers, it is possible to run JavaScript in OS-level threads. Node.js features can be used in Electron's Web Workers.

## Signature / Usage

Set `nodeIntegrationInWorker` to `true` in `webPreferences`:

Adapted (not in the official docs): the official example sets only nodeIntegrationInWorker; renderers are sandboxed by default since Electron 20, so sandbox: false is added. Disabling the sandbox weakens security; prefer utilityProcess when sandboxing must be kept.

```js
const win = new BrowserWindow({
  webPreferences: {
    nodeIntegrationInWorker: true,
    sandbox: false
  }
})
```

## Notes

- Adapted (not in the official docs): `sandbox: false` is added to the example because renderers are sandboxed by default since Electron 20 (see the sandbox tutorial). If the sandbox must stay enabled, use [utilityProcess](./utility-process.md) instead.
- Workers created by an `<iframe>` only get Node.js integration when the frame itself has it, i.e. when `nodeIntegrationInSubFrames` is also enabled.
- `nodeIntegrationInWorker` can be used independent of `nodeIntegration`, but `sandbox` must not be set to `true`.
- The option is not available in `SharedWorker`s or `Service Worker`s owing to incompatibilities in sandboxing policies.
- Available APIs: all built-in Node.js modules are supported in Web Workers and `asar` archives can still be read with Node.js APIs; none of Electron's built-in modules can be used in a multi-threaded environment.
- Native Node.js modules can be loaded in Web Workers, but this is strongly discouraged: most were written assuming a single thread, and loading them leads to crashes and memory corruption. Even a thread-safe native module is unsafe to load because `process.dlopen` is not thread safe. The only safe way for now is to make sure no native modules are loaded after the Web Workers start:

```js
process.dlopen = () => {
  throw new Error('Load native module is not safe')
}
const worker = new Worker('script.js')
```

## Related

- [utilityProcess](./utility-process.md)
- [MessagePorts in Electron](./message-ports.md)
