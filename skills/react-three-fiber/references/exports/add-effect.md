---
source: https://r3f.docs.pmnd.rs/api/additional-exports
---

# addEffect / addAfterEffect / addTail / flushGlobalEffects

Global render-loop callbacks. `addEffect` runs each frame before roots render, `addAfterEffect` runs each frame after, `addTail` runs when rendering stops. `flushGlobalEffects` runs one set manually.

## Signature / Usage

Declarations from `packages/fiber/src/core/loop.ts` (tag v9.8.2):

```ts
export type GlobalRenderCallback = (timestamp: number) => void

export const addEffect = (callback: GlobalRenderCallback) => createSubs(callback, globalEffects)
export const addAfterEffect = (callback: GlobalRenderCallback) => createSubs(callback, globalAfterEffects)
export const addTail = (callback: GlobalRenderCallback) => createSubs(callback, globalTailEffects)

export type GlobalEffectType = 'before' | 'after' | 'tail'

export function flushGlobalEffects(type: GlobalEffectType, timestamp: number): void
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| addEffect | `(callback: GlobalRenderCallback) => () => void` | Adds a global render callback which is called each frame |
| addAfterEffect | `(callback: GlobalRenderCallback) => () => void` | Adds a global after-render callback which is called each frame |
| addTail | `(callback: GlobalRenderCallback) => () => void` | Adds a global callback which is called when rendering stops |
| flushGlobalEffects | `(type: 'before' \| 'after' \| 'tail', timestamp: number) => void` | Flushes global render-effects for when manually driving a loop |

## Notes

- Each `add*` function returns an unsubscribe function (it deletes the subscription from its set).
- In the loop, `before` effects run first, then all roots render, then `after` effects run; when no root requests another frame, `tail` effects run and the loop stops.
- `advance(timestamp, runGlobalEffects = true)` calls `flushGlobalEffects('before' | 'after')` around its update.

## Related

- [invalidate](./invalidate.md)
- [advance](./advance.md)
