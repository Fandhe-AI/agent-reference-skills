---
source: https://vite.dev/guide/api-environment-runtimes#modulerunner
---

# Module Runner

Create a `ModuleRunner` in the target runtime and import an entry through a transport.

```js
import {
  ModuleRunner,
  ESModulesEvaluator,
  createNodeImportMeta,
} from 'vite/module-runner'
import { transport } from './rpc-implementation.js'

const moduleRunner = new ModuleRunner(
  {
    transport,
    createImportMeta: createNodeImportMeta, // if the module runner runs in Node.js
  },
  new ESModulesEvaluator(),
)

await moduleRunner.import('/src/entry-point.js')
```

## Notes

- All module runner APIs are imported from `vite/module-runner`, a deliberately lightweight entry point.
- `transport` (communication with the server, see `ModuleRunnerTransport`) is user-provided; `./rpc-implementation.js` is a placeholder in the docs.
- `ESModulesEvaluator` uses `new AsyncFunction`; provide your own `ModuleEvaluator` if the runtime does not allow unsafe evaluation.
- On a `full-reload` HMR event affected modules re-execute and the `exports` object is overridden, so call `import` again to get the latest exports.
- Part of the Environment API (release candidate phase per the docs).
