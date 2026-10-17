---
source: https://vite.dev/guide/features#web-workers
---

# Web Workers

Import a worker script with the `new Worker(new URL(...))` constructor or a `?worker` query suffix.

```ts
const worker = new Worker(new URL('./worker.js', import.meta.url), {
  type: 'module',
})
```

```js
import MyWorker from './worker?worker'

const worker = new MyWorker()
```

```js
import MyWorker from './worker?worker&inline'
import MyWorkerUrl from './worker?worker&url'
```

## Notes

- The constructor form is the recommended one; detection only works when `new URL()` is used directly inside `new Worker()` and options are static values (string literals).
- By default the worker is a separate chunk in production; `&inline` inlines it as base64, `&url` returns its URL.
- Workers can use ESM `import`; in dev this relies on browser native module worker support.
- These are browser Web Workers, not job workers like bullmq. Bundling of all workers is configured via the worker options.
