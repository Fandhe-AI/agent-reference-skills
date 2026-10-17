---
source: https://vite.dev/guide/assets#importing-script-as-a-worker
---

# Importing Script as a Worker

Scripts can be imported as web workers with the `?worker` or `?sharedworker` suffix.

## Signature / Usage

```js
// Separate chunk in the production build
import Worker from './shader.js?worker'
const worker = new Worker()
```

```js
// sharedworker
import SharedWorker from './shader.js?sharedworker'
const sharedWorker = new SharedWorker()
```

```js
// Inlined as base64 strings
import InlineWorker from './shader.js?worker&inline'
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `?worker` | import suffix | Worker constructor; separate chunk in the production build |
| `?sharedworker` | import suffix | SharedWorker constructor |
| `?worker&inline` | import suffix | Worker inlined as base64 strings |

## Notes

- These are browser Web Workers. This is unrelated to job workers such as those in bullmq.
- See the Web Worker section of the features guide for more details.

## Related

- [asset-url-imports.md](./asset-url-imports.md)
- ../features/web-workers.md
- [../config-build/worker-options.md](../config-build/worker-options.md)
