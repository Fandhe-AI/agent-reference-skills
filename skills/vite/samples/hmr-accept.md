---
source: https://vite.dev/guide/api-hmr#hot-accept-cb
---

# HMR: accept and dispose

Make a module an HMR boundary and clean up side effects when it is replaced.

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

Accept updates from a dependency and clean up:

```js
import { foo } from './foo.js'

foo()

if (import.meta.hot) {
  import.meta.hot.accept('./foo.js', (newFoo) => {
    // the callback receives the updated './foo.js' module
    newFoo?.foo()
  })

  import.meta.hot.dispose((data) => {
    // cleanup side effect
  })
}
```

## Notes

- The call must appear literally as `import.meta.hot.accept(` (whitespace-sensitive) for Vite's static analysis.
- A self-accepting module is an HMR boundary; importers up the chain are not notified. Re-exports must use `let` and be updated by the boundary itself.
- Mutate `import.meta.hot.data` properties rather than reassigning `data`.
- `hot.invalidate()` forces propagation to importers; `hot.decline()` is currently a noop. This client API is mainly for framework and tooling authors.
