---
source: https://vite.dev/guide/api-environment-runtimes#moduleevaluator
---

# ModuleEvaluator

The interface a `ModuleRunner` uses to execute code that Vite transformed, and externalized modules.

## Signature / Usage

```ts
export interface ModuleEvaluator {
  /**
   * Number of prefixed lines in the transformed code.
   */
  startOffset?: number
  /**
   * Evaluate code that was transformed by Vite.
   * @param context Function context
   * @param code Transformed code
   * @param id ID that was used to fetch the module
   */
  runInlinedModule(
    context: ModuleRunnerContext,
    code: string,
    id: string,
  ): Promise<any>
  /**
   * evaluate externalized module.
   * @param file File URL to the external module
   */
  runExternalModule(file: string): Promise<any>
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| startOffset | `number` (optional) | Number of prefixed lines in the transformed code. |
| runInlinedModule(context, code, id) | `Promise<any>` | Evaluates code transformed by Vite. |
| runExternalModule(file) | `Promise<any>` | Evaluates an externalized module given its file URL. |

## Notes

- Vite exports `ESModulesEvaluator` implementing this interface by default. It uses `new AsyncFunction` to evaluate code, so inlined source maps should contain an offset of 2 lines to accommodate the added lines; `ESModulesEvaluator` does this automatically. Custom evaluators do not add additional lines.
- `runExternalModule` is used when the environment returns an `ExternalFetchResult`.
- Release Candidate: the Environment API is generally in the release candidate phase.

## Related

- [ModuleRunner](./module-runner.md)
- [FetchResult](./fetch-result.md)
- [ModuleRunnerOptions](./module-runner-options.md)
