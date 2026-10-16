---
source: https://r3f.docs.pmnd.rs/api/additional-exports
---

# act (@react-three/fiber)

`act` for usage with react-testing. In v9 it is a deprecated alias of React's own `act`.

## Signature / Usage

Declaration from `packages/fiber/src/core/utils/react.tsx` (tag v9.8.2):

```ts
export type Act = <T = any>(cb: () => Promise<T>) => Promise<T>

/**
 * Safely flush async effects when testing, simulating a legacy root.
 * @deprecated Import from React instead. import { act } from 'react'
 */
export const act: Act = React[('act' + '') as 'act']
```

From the v9 migration guide:

```tsx
import { act } from 'react'
import { createRoot } from '@react-three/fiber'

const store = await act(async () => createRoot(canvas).render(<App />))
console.log(store.getState())
```

## Notes

- Migration (v8 → v9): `act` is now exported from React itself and can be used for all renderers. It returns the contents of a passed async callback like before and recursively flushes async effects to synchronously test React output. Import it from `react`; the `@react-three/fiber` export is marked `@deprecated`.
- The `@react-three/test-renderer` package has its own `act`; see the testing-tooling category. It is not a test runner (use the vitest or playwright skills for those).

## Related

- [other-exports](./other-exports.md)
