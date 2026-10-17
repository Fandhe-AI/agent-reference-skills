---
source: https://vite.dev/guide/api-hmr#hot-accept-cb
---

# hot.accept

Declares a module as accepting hot updates (an HMR boundary), either for itself (`hot.accept(cb)`) or for direct dependencies (`hot.accept(deps, cb)`).

## Signature / Usage

```ts
accept(): void
accept(cb: (mod: ModuleNamespace | undefined) => void): void
accept(dep: string, cb: (mod: ModuleNamespace | undefined) => void): void
accept(
  deps: readonly string[],
  cb: (mods: Array<ModuleNamespace | undefined>) => void,
): void
```

```js
export const count = 1

if (import.meta.hot) {
  import.meta.hot.accept((newModule) => {
    if (newModule) {
      // newModule is undefined when SyntaxError happened
      console.log('updated: count is now ', newModule.count)
    }
  })
}
```

Accepting direct dependencies:

```js
import { foo } from './foo.js'

foo()

if (import.meta.hot) {
  import.meta.hot.accept('./foo.js', (newFoo) => {
    // the callback receives the updated './foo.js' module
    newFoo?.foo()
  })

  // Can also accept an array of dep modules:
  import.meta.hot.accept(
    ['./foo.js', './bar.js'],
    ([newFooModule, newBarModule]) => {
      // The callback receives an array where only the updated module is
      // non null. If the update was not successful (syntax error for ex.),
      // the array is empty
    },
  )
}
```

## Notes

- A module that "accepts" hot updates is considered an HMR boundary.
- Vite's HMR does not swap the originally imported module: if a boundary module re-exports imports from a dep, it is responsible for updating those re-exports (and these exports must use `let`). Importers up the chain from the boundary are not notified. This simplified implementation skips generating proxy modules.
- The call must appear as `import.meta.hot.accept(` (whitespace-sensitive) in the source, because of the static analysis Vite does to enable HMR support for a module.

## Related

- [hot.dispose / hot.prune / hot.data](./hot-dispose-prune-data.md)
- [hot.decline / hot.invalidate](./hot-decline-invalidate.md)
