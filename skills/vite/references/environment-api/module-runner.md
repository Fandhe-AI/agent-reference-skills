---
source: https://vite.dev/guide/api-environment-runtimes#modulerunner
---

# ModuleRunner

A module runner is instantiated in the target runtime and executes code processed by Vite. All APIs here are imported from `vite/module-runner` unless stated otherwise.

## Signature / Usage

```ts
export class ModuleRunner {
  constructor(
    public options: ModuleRunnerOptions,
    public evaluator: ModuleEvaluator = new ESModulesEvaluator(),
    private debug?: ModuleRunnerDebugger,
  ) {}
  /**
   * URL to execute.
   * Accepts file path, server path, or id relative to the root.
   */
  public async import<T = any>(url: string): Promise<T>
  /**
   * Clear all caches including HMR listeners.
   */
  public clearCache(): void
  /**
   * Clear all caches, remove all HMR listeners, reset sourcemap support.
   * This method doesn't stop the HMR connection.
   */
  public async close(): Promise<void>
  /**
   * Returns `true` if the runner has been closed by calling `close()`.
   */
  public isClosed(): boolean
}
```

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

- The `vite/module-runner` entry point is kept as lightweight as possible, exporting only the minimum needed to create module runners.
- The module evaluator executes the code. Vite exports `ESModulesEvaluator` out of the box, which uses `new AsyncFunction`; provide your own if the runtime does not support unsafe evaluation.
- When the Vite server triggers a `full-reload` HMR event, all affected modules are re-executed. The runner does not update the `exports` object when this happens (it overrides it), so call `import` again or get the module from `evaluatedModules` again if you rely on the latest `exports`.
- Replaces `server.ssrLoadModule` for decoupled runner use; see the Environment API for Frameworks `RunnableDevEnvironment` page for the in-process `runner`.
- `createImportMeta` appears in the docs example options (with `createNodeImportMeta` for Node.js); it is not listed in the `ModuleRunnerOptions` interface shown in the docs.
- Release Candidate: the Environment API is generally in the release candidate phase.

## Related

- [ModuleRunnerOptions](./module-runner-options.md)
- [ModuleEvaluator](./module-evaluator.md)
- [ModuleRunnerTransport](./module-runner-transport.md)
- [RunnableDevEnvironment](./runnable-dev-environment.md)
