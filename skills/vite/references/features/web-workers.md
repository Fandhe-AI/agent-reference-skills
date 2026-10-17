---
source: https://vite.dev/guide/features#web-workers
---

# Web Workers

Vite bundles browser Web Worker scripts, imported either with the `new Worker()` constructor (recommended) or with query suffixes.

## Signature / Usage

Import with constructors (`new Worker()` and `new SharedWorker()`):

```ts
const worker = new Worker(new URL('./worker.js', import.meta.url))
```

With options to create "module" workers:

```ts
const worker = new Worker(new URL('./worker.js', import.meta.url), {
  type: 'module',
})
```

Import with query suffixes (`?worker` or `?sharedworker`; the default export is a custom worker constructor):

```js
import MyWorker from './worker?worker'

const worker = new MyWorker()
```

Inline as base64 strings, or retrieve as a URL:

```js
import MyWorker from './worker?worker&inline'
import MyWorkerUrl from './worker?worker&url'
```

## Notes

- This page covers browser Web Workers (Worker / SharedWorker), not server-side job workers such as those of bullmq.
- Worker detection with the constructor only works if `new URL()` is used directly inside the `new Worker()` declaration; otherwise it is handled as a static asset URL. All options parameters must be static values (string literals).
- The worker script can use ESM `import` statements instead of `importScripts()`. During development this relies on browser native support; for the production build it is compiled away.
- By default the worker script is emitted as a separate chunk in the production build.
- See the `worker` config options for bundling of all workers.

## Related

- [Worker options](../config-build/worker-options.md)
- [Static Assets](./static-assets.md)
