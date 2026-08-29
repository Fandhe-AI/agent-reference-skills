---
source: https://tanstack.com/virtual/latest/docs/api/virtualizer, https://raw.githubusercontent.com/TanStack/virtual/main/packages/virtual-core/src/index.ts
---

# Utilities

Exported standalone functions used internally by the framework adapters (React, Vue, Solid, Svelte, Angular, Marko) to implement `Virtualizer` options like `rangeExtractor`, `scrollToFn`, `observeElementRect`/`observeElementOffset`, and `measureElement`. Framework adapters wire these up automatically; use them directly only when building a custom adapter or overriding default behavior.

## Signature / Usage

```ts
import {
  defaultRangeExtractor,
  elementScroll,
  windowScroll,
  observeElementRect,
  observeElementOffset,
  observeWindowRect,
  observeWindowOffset,
  measureElement,
} from '@tanstack/virtual-core'
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `defaultRangeExtractor` | `(range: Range) => number[]` | Default `rangeExtractor` implementation. Returns the visible range indexes expanded by `overscan` on both ends. |
| `elementScroll` | `<T extends Element>(offset: number, options: { adjustments?: number; behavior?: ScrollBehavior }, instance: Virtualizer<T, any>) => void` | Default `scrollToFn` implementation for element-based scroll containers. |
| `windowScroll` | `<T extends Window>(offset: number, options: { adjustments?: number; behavior?: ScrollBehavior }, instance: Virtualizer<T, any>) => void` | Default `scrollToFn` implementation for window-based scrolling. |
| `observeElementRect` | `<T extends Element>(instance: Virtualizer<T, any>, cb: (rect: Rect) => void) => void \| (() => void)` | Default `observeElementRect` implementation for element-based scroll containers. |
| `observeElementOffset` | `<T extends Element>(instance: Virtualizer<T, any>, cb: ObserveOffsetCallBack) => void \| (() => void)` | Default `observeElementOffset` implementation for element-based scroll containers. |
| `observeWindowRect` | `(instance: Virtualizer<Window, any>, cb: (rect: Rect) => void) => void \| (() => void)` | Default `observeElementRect`-equivalent implementation for window-based scrolling. |
| `observeWindowOffset` | `(instance: Virtualizer<Window, any>, cb: ObserveOffsetCallBack) => void \| (() => void)` | Default `observeElementOffset`-equivalent implementation for window-based scrolling. |
| `measureElement` | `<TItemElement extends Element>(element: TItemElement, entry: ResizeObserverEntry \| undefined, instance: Virtualizer<any, TItemElement>) => number` | Default `measureElement` implementation, using `getBoundingClientRect()` (or the `ResizeObserverEntry` when available) to measure an item. |

## Notes

- These are the concrete implementations behind the corresponding `Virtualizer` options (`rangeExtractor`, `scrollToFn`, `observeElementRect`, `observeElementOffset`, `measureElement`); see [Virtualizer](./virtualizer.md) for the option descriptions.
- Not documented on a dedicated docs page — signatures were read from the `@tanstack/virtual-core` package source (`packages/virtual-core/src/index.ts`) since the official docs only reference these exports by name.
- `elementScroll` and `windowScroll` both delegate to the same internal `scrollWithAdjustments` implementation.

## Related

- [Virtualizer](./virtualizer.md)
- [VirtualItem](./virtual-item.md)
