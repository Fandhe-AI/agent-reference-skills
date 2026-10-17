---
source: https://vite.dev/guide/api-environment-instances#fetchresult
---

# FetchResult

`environment.fetchModule` returns a `FetchResult` consumed by the module runner: a union of `CachedFetchResult`, `ExternalFetchResult`, and `ViteFetchResult`.

## Signature / Usage

```ts
export interface CachedFetchResult {
  /**
   * If the module is cached in the runner, this confirms
   * it was not invalidated on the server side.
   */
  cache: true
}

export interface ExternalFetchResult {
  /**
   * The path to the externalized module starting with file://.
   * By default this will be imported via a dynamic "import"
   * instead of being transformed by Vite and loaded with the Vite runner.
   */
  externalize: string
  /**
   * Type of the module. Used to determine if the import statement is correct.
   * For example, if Vite needs to throw an error if a variable is not actually exported.
   */
  type: 'module' | 'commonjs' | 'builtin' | 'network'
}

export interface ViteFetchResult {
  /**
   * Code that will be evaluated by the Vite runner.
   * By default this will be wrapped in an async function.
   */
  code: string
  /**
   * File path of the module on disk.
   * This will be resolved as import.meta.url/filename.
   * Will be `null` for virtual modules.
   */
  file: string | null
  /**
   * Module ID in the server module graph.
   */
  id: string
  /**
   * Module URL used in the import.
   */
  url: string
  /**
   * Invalidate module on the client side.
   */
  invalidate: boolean
}
```

## Notes

- `CachedFetchResult` is analogous to the `304` (Not Modified) HTTP status code.
- `ExternalFetchResult` instructs the module runner to import the module using `runExternalModule` on the `ModuleEvaluator`; the default evaluator uses the runtime's native `import` instead of processing the file through Vite.
- `ViteFetchResult.invalidate` tells the runner to invalidate the module before executing it again rather than serving it from cache; usually `true` when an HMR update was triggered.
- Release Candidate: the Environment API is generally in the release candidate phase.

## Related

- [DevEnvironment class](./dev-environment-class.md)
- [ModuleEvaluator](./module-evaluator.md)
- [ModuleRunner](./module-runner.md)
