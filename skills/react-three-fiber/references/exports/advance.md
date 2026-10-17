---
source: https://r3f.docs.pmnd.rs/api/additional-exports
---

# advance

Advances the frameloop (given that it's set to `'never'`).

## Signature / Usage

Declaration from `packages/fiber/src/core/loop.ts` (tag v9.8.2):

```ts
export function advance(timestamp: number, runGlobalEffects: boolean = true, state?: RootState, frame?: XRFrame): void
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| timestamp | `number` | — | Timestamp for this tick |
| runGlobalEffects | `boolean` | `true` | Run global `before` / `after` effects around the update |
| state | `RootState` | — | Update only this root; all roots are updated when omitted |
| frame | `XRFrame` | — | Optional XR frame passed to `useFrame` callbacks |

## Notes

- In `frameloop="never"` mode, the clock is driven by the provided timestamp: `delta = timestamp - state.clock.elapsedTime`, and `elapsedTime` is set to `timestamp`.
- Root state exposes `advance` as `(timestamp: number, runGlobalEffects?: boolean) => void` (hooks docs).

## Related

- [invalidate](./invalidate.md)
- [add-effect](./add-effect.md)
