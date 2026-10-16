---
source: https://r3f.docs.pmnd.rs/api/additional-exports
---

# invalidate

Forces view global invalidation: requests a frame to be rendered. Used with `frameloop="demand"`.

## Signature / Usage

Declaration from `packages/fiber/src/core/loop.ts` (tag v9.8.2):

```ts
export function invalidate(state?: RootState, frames = 1): void
```

Usage from the performance guide (`docs/advanced/scaling-performance.mdx`):

```jsx
invalidate()
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| state | `RootState` | — | Invalidate only this root; globally invalidates all roots when omitted |
| frames | `number` | `1` | Number of frames to request |

## Notes

- From the docs: calling `invalidate()` will not render immediately, it merely requests a new frame to be rendered out. Calling invalidate multiple times will not render multiple times.
- Source behavior: it returns without effect when `state.gl.xr?.isPresenting`, when the root is not active, or when `state.frameloop === 'never'`.
- Source behavior: `frames > 1` adds to the pending frame count, capped at 60 (legacy support). When called from within a `useFrame`, it requests an additional frame.
- The same function is exposed on root state as `invalidate` (see `useThree`).

## Related

- [advance](./advance.md)
- [add-effect](./add-effect.md)
